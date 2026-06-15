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
    echo "  -h, --help     Show this help message"
    echo
    echo "If no options are provided, the script copies files modified in git status,"
    echo "falling back to the last commit if git status is clean."
}

MODE="default"
GIT_REF=""

# Parse options using GNU getopt
TEMP=$(getopt -o ahr: --long all,help,ref: -n 'copy_to_ha.sh' -- "$@")
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
    
    # 1. Ensure remote directory exists
    # shellcheck disable=SC2029
    ssh "${USER}@${HOST}" "mkdir -p '${REMOTE_DIR}'"
    
    # 2. Check if a backup (.orig) exists. If not, copy the existing file to .orig on the remote host
    echo "Checking backup for ${REL_PATH} on Home Assistant..."
    # shellcheck disable=SC2029
    ssh "${USER}@${HOST}" "[ ! -f '${REMOTE_FILE}.orig' ] && [ -f '${REMOTE_FILE}' ] && cp '${REMOTE_FILE}' '${REMOTE_FILE}.orig' || true"
    
    # 3. Transfer the file
    echo "Transferring: ${FILE} -> ${REMOTE_FILE}"
    scp "${FILE}" "${USER}@${HOST}:${REMOTE_FILE}"
done

echo "----------------------------------------"
echo "Copy complete! Remember to restart Home Assistant and clear your browser cache."
