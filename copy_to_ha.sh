#!/usr/bin/env bash
# Script to copy changed Fortum integration files to Home Assistant OS with safety backups
set -e

HOST="homeassistant.gearloose.me"
USER="root"
TARGET_DIR="/config/custom_components/fortum"

# Help function
show_help() {
    echo "Script to copy changed Fortum integration files to Home Assistant OS with safety backups"
    echo
    echo "Usage: $0 [options] [git-ref]"
    echo
    echo "Options:"
    echo "  -a, --all      Copy all integration files (excluding node_modules, src, __pycache__, etc.)"
    echo "  -r, --ref REF  Copy files changed in the specified git reference/commit (e.g. HEAD~1, a1b2c3d)"
    echo "  -t, --test     Show operations that would be executed without performing them"
    echo "  -h, --help     Show this help message"
    echo
    echo "If no options are provided, the script copies files modified in git status,"
    echo "falling back to the last commit if git status is clean."
}

MODE="default"
GIT_REF=""
TEST_MODE=false

# Parse options using GNU getopt
TEMP=$(getopt -o ahtr: --long all,help,ref:,test -n "$(basename "$0")" -- "$@")
if [ $? != 0 ] ; then echo "Terminating..." >&2 ; exit 1 ; fi

eval set -- "$TEMP"

while true ; do
    case "$1" in
        -a|--all)
            MODE="all"
            shift
            ;;
        -r|--ref)
            MODE="git-ref"
            GIT_REF="$2"
            shift 2
            ;;
        -t|--test)
            TEST_MODE=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        --)
            shift
            break
            ;;
        *)
            echo "Internal error!"
            exit 1
            ;;
    esac
done

# Handle legacy/ease-of-use direct positional git-ref if -r is not set
if [ -n "$1" ]; then
    if [ "$MODE" = "default" ] && git rev-parse --verify "$1" >/dev/null 2>&1; then
        MODE="git-ref"
        GIT_REF="$1"
    else
        echo "Error: Invalid argument '$1'"
        show_help
        exit 1
    fi
fi

if [ "$MODE" = "all" ]; then
    echo "Finding all integration files in custom_components/fortum..."
    PARSED_FILES=$(find custom_components/fortum -type f | grep -v -E "(__pycache__|/\.|\.pyc|frontend/node_modules|frontend/src)" || true)
elif [ "$MODE" = "git-ref" ]; then
    echo "Checking files changed in git reference '$GIT_REF'..."
    PARSED_FILES=$(git show --name-only --pretty="" "$GIT_REF" | grep "^custom_components/fortum/" || true)
else
    echo "Detecting modified files using git status..."
    # Retrieve all modified/added/renamed files, excluding untracked (??) or ignored (!!) files
    # Filter only for files under custom_components/fortum/
    FILES=$(git status --porcelain | grep -v -E "^(\?\?|\!\!)" | grep "custom_components/fortum/" || true)

    # Fallback: If no modifications in git status, check files in the last commit
    if [ -z "$FILES" ]; then
        echo "No modifications found in git status. Checking files in the last commit..."
        FILES=$(git show --name-only --pretty="" HEAD | grep "^custom_components/fortum/" || true)
        
        # In this fallback case, the output from git show is already a list of raw filenames
        PARSED_FILES="$FILES"
    else
        # Parse git status --porcelain output to get clean filenames (handling renames '->' if any)
        # Strip the status prefix (first 3 characters) using sed
        PARSED_FILES=$(echo "$FILES" | sed -E 's/^.{3}//' | while read -r file; do
            # If it's a rename, get the target file path
            if [[ "$file" == *" -> "* ]]; then
                file=${file#* -> }
            fi
            echo "$file"
        done)
    fi
fi

if [ -z "$PARSED_FILES" ]; then
    echo "No changed/matching files detected under custom_components/fortum/."
    exit 0
fi

echo "Found the following changed files to copy:"
echo "$PARSED_FILES"
echo "----------------------------------------"

# Loop through and copy each file
for FILE in $PARSED_FILES; do
    # Skip directories
    if [ -d "$FILE" ]; then
        continue
    fi

    # Extract target relative path (e.g. custom_components/fortum/sensors/price.py -> sensors/price.py)
    REL_PATH=${FILE#custom_components/fortum/}
    
    # Define remote paths
    REMOTE_FILE="${TARGET_DIR}/${REL_PATH}"
    REMOTE_DIR=$(dirname "${REMOTE_FILE}")
    
    # Calculate local SHA-256 hash
    LOCAL_SHA=$(sha256sum "${FILE}" | cut -d' ' -f1)

    # Get remote file existence, remote hash, and .orig presence in one SSH command
    echo "Checking remote status for ${REL_PATH} on Home Assistant..."
    REMOTE_STATE=$(ssh "${USER}@${HOST}" "
        if [ -f '${REMOTE_FILE}' ]; then
            echo -n 'EXISTS '
            sha256sum '${REMOTE_FILE}' 2>/dev/null | cut -d' ' -f1 || echo 'HASH_ERROR'
        else
            echo 'NOT_EXISTS'
        fi
        if [ -f '${REMOTE_FILE}.orig' ]; then
            echo 'ORIG_EXISTS'
        else
            echo 'ORIG_NOT_EXISTS'
        fi
    " 2>/dev/null || echo "SSH_FAILED")

    if [ "$REMOTE_STATE" = "SSH_FAILED" ] || [ -z "$REMOTE_STATE" ]; then
        echo "Error: Failed to connect to Home Assistant or retrieve remote status for ${REL_PATH}." >&2
        exit 1
    fi

    # Parse remote state
    REMOTE_INFO=$(echo "$REMOTE_STATE" | head -n 1)
    ORIG_STATUS=$(echo "$REMOTE_STATE" | tail -n 1)
    REMOTE_STATUS=$(echo "$REMOTE_INFO" | cut -d' ' -f1)
    REMOTE_SHA=$(echo "$REMOTE_INFO" | cut -d' ' -f2)

    # Check if we need to copy
    NEEDS_COPY=false
    if [ "$REMOTE_STATUS" != "EXISTS" ]; then
        echo "${REL_PATH} does not exist on target."
        NEEDS_COPY=true
    elif [ "$LOCAL_SHA" != "$REMOTE_SHA" ]; then
        echo "${REL_PATH} is different (local: ${LOCAL_SHA:0:8}, remote: ${REMOTE_SHA:0:8})."
        NEEDS_COPY=true
    else
        echo "${REL_PATH} is identical. Skipping copy."
    fi

    if [ "$NEEDS_COPY" = "true" ]; then
        # Check if we need to backup
        if [ "$REMOTE_STATUS" = "EXISTS" ] && [ "$ORIG_STATUS" = "ORIG_NOT_EXISTS" ]; then
            if [ "$TEST_MODE" = "true" ]; then
                echo "[TEST] Would backup original file: ${REMOTE_FILE} -> ${REMOTE_FILE}.orig"
            else
                echo "Backing up original file on target: ${REMOTE_FILE} -> ${REMOTE_FILE}.orig"
                ssh "${USER}@${HOST}" "cp '${REMOTE_FILE}' '${REMOTE_FILE}.orig'"
            fi
        fi

        # Transfer the file
        if [ "$TEST_MODE" = "true" ]; then
            echo "[TEST] Would ensure directory exists: ${REMOTE_DIR}"
            echo "[TEST] Would transfer: ${FILE} -> ${REMOTE_FILE}"
        else
            echo "Transferring: ${FILE} -> ${REMOTE_FILE}"
            ssh "${USER}@${HOST}" "mkdir -p '${REMOTE_DIR}'"
            scp "${FILE}" "${USER}@${HOST}:${REMOTE_FILE}"
        fi
    fi
done

echo "----------------------------------------"
if [ "$TEST_MODE" = "true" ]; then
    echo "Test run complete! The operations above show what would be done."
else
    echo "Copy complete! Remember to restart Home Assistant and clear your browser cache."
fi
