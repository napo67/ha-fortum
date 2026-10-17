#!/usr/bin/env bash
#
# Standalone Custom Component / HACS Development Bootstrap Script
# Symlinks custom_components/<domain> into config/custom_components/
# and initializes a minimal config/configuration.yaml if missing.
#
# Copyright 2026 Hannu Napari <napo@iki.fi>
#
set -euo pipefail

show_help() {
    cat << 'EOF'
Usage: bootstrap.sh [OPTIONS]

Bootstrap a Home Assistant standalone custom component development workspace.
Symlinks custom_components/* into config/custom_components/ and scaffolds
a default config/configuration.yaml for running 'hass -c config'.

Options:
  -h, --help       Show this help message and exit
  -w, --workspace  Root workspace directory (default: current working directory)
EOF
}

WORKSPACE="$(pwd)"

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        -w|--workspace)
            if [[ $# -lt 2 ]]; then
                echo "Error: -w/--workspace requires an argument." >&2
                exit 1
            fi
            WORKSPACE="$2"
            shift 2
            ;;
        *)
            echo "Error: Unknown option '$1'" >&2
            show_help >&2
            exit 1
            ;;
    esac
done

cd "$WORKSPACE"

CONFIG_DIR="config"
CONFIG_CC_DIR="${CONFIG_DIR}/custom_components"

mkdir -p "$CONFIG_CC_DIR"

# 1. Symlink custom_components/* into config/custom_components/
shopt -s nullglob
components=(custom_components/*)
shopt -u nullglob

if [[ ${#components[@]} -eq 0 ]]; then
    echo "Warning: No directories found under custom_components/ to symlink." >&2
else
    for comp in "${components[@]}"; do
        if [[ -d "$comp" ]]; then
            domain="$(basename "$comp")"
            target="${CONFIG_CC_DIR}/${domain}"
            if [[ -L "$target" || -d "$target" ]]; then
                rm -rf "$target"
            fi
            ln -sf "../../${comp}" "$target"
            echo "Symlinked ${comp} -> ${target}"
        fi
    done
fi

# 2. Initialize minimal config/configuration.yaml if missing
CONFIG_FILE="${CONFIG_DIR}/configuration.yaml"
if [[ ! -f "$CONFIG_FILE" ]]; then
    cat << 'EOF' > "$CONFIG_FILE"
# Minimal Home Assistant configuration for custom component development
default_config:

logger:
  default: info
  logs:
    custom_components: debug
EOF
    echo "Initialized minimal configuration at ${CONFIG_FILE}"
else
    echo "Existing configuration found at ${CONFIG_FILE} (skipping initialization)"
fi

echo "Bootstrap completed successfully."
