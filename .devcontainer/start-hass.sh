#!/usr/bin/env bash
#
# Start Home Assistant development server
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONFIG_DIR="${WORKSPACE_DIR}/config"

echo "🏠 Preparing Home Assistant environment..."

# Run bootstrap to ensure custom_components are symlinked and config exists
"${SCRIPT_DIR}/bootstrap.sh" -w "${WORKSPACE_DIR}"

echo "🚀 Starting Home Assistant..."
echo "📍 Config directory: ${CONFIG_DIR}"
echo "🌐 Web interface:    http://localhost:8123"
echo ""

cd "${WORKSPACE_DIR}"
exec uv run hass --config "${CONFIG_DIR}" --debug
