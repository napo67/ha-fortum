#!/usr/bin/env bash
# Script to copy changed Fortum integration files to Home Assistant OS with safety backups
set -e

HOST="homeassistant.gearloose.me"
USER="root"
TARGET_DIR="/config/custom_components/fortum"

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

if [ -z "$PARSED_FILES" ]; then
    echo "No changed files detected under custom_components/fortum/."
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
