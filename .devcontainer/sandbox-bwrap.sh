#!/usr/bin/env bash
#
# Unprivileged Linux Kernel Sandbox Wrapper using Bubblewrap (bwrap)
# Provides isolated filesystem and PID/IPC/UTS namespaces for AI Agent execution.
# Supports dual network profiles (online hydration vs loopback test) and REV-01 compliant secret masking.
#
# Copyright 2026 Hannu Napari <napo@iki.fi>
#
set -euo pipefail

show_help() {
    cat << 'EOF'
Usage: sandbox-bwrap.sh [OPTIONS] [--] [COMMAND [ARGS...]]

Run commands inside an unprivileged Linux kernel sandbox using Bubblewrap (bwrap).
Ensures the AI agent process cannot access host secrets (~/.ssh, ~/.gemini, ~/.gnupg),
masks workspace secrets (.env, secrets.yaml), and enforces dual-profile network isolation.

Options:
  -h, --help            Show this help message and exit
  -w, --workspace DIR   Specify workspace directory (default: current working directory)
  -n, --allow-net       Allow outbound network access (Profile 1: hydration/build)
                        Default: Network isolation via --unshare-net --loopback (Profile 2: test/offline)
  --                    Demarcates the end of options

Examples:
  sandbox-bwrap.sh --allow-net uv sync
  sandbox-bwrap.sh pytest tests/
  sandbox-bwrap.sh prek run --all-files
  sandbox-bwrap.sh python3 -m script.hassfest
EOF
}

WORKSPACE="$(pwd)"
ALLOW_NET=false

while [[ $# -gt 0 ]]; do
    case "$1" in
        -h|--help)
            show_help
            exit 0
            ;;
        -w|--workspace)
            if [[ $# -lt 2 ]]; then
                echo "🔴 Error: -w/--workspace requires a directory argument." >&2
                exit 1
            fi
            WORKSPACE="$2"
            shift 2
            ;;
        -n|--allow-net)
            ALLOW_NET=true
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            break
            ;;
    esac
done

# 1. Verify Bubblewrap availability
if ! command -v bwrap >/dev/null 2>&1; then
    echo "🔴 Error: 'bwrap' (Bubblewrap) is not installed on this system." >&2
    echo "" >&2
    echo "Bubblewrap is required for unprivileged Linux kernel sandboxing." >&2
    echo "To install Bubblewrap on your platform:" >&2
    echo "  - Debian/Ubuntu: sudo apt-get update && sudo apt-get install -y bubblewrap" >&2
    echo "  - Fedora/RHEL:   sudo dnf install -y bubblewrap" >&2
    echo "  - Arch Linux:    sudo pacman -S --noconfirm bubblewrap" >&2
    echo "  - Alpine Linux:  apk add bubblewrap" >&2
    exit 1
fi

WORKSPACE_ABS="$(cd "$WORKSPACE" && pwd)"

# 2. Allocate isolated temporary directories on the host
SANDBOX_STATE_DIR="$(mktemp -d -t sandbox-bwrap-XXXXXX)"
SANDBOX_HOME="$SANDBOX_STATE_DIR/home"
SANDBOX_TMP="$SANDBOX_STATE_DIR/tmp"
mkdir -p "$SANDBOX_HOME" "$SANDBOX_TMP"

cleanup() {
    rm -rf "$SANDBOX_STATE_DIR"
}
trap cleanup EXIT

# 3. Assemble Bubblewrap invocation parameters
# Notes on Security & Boundary Enforcements:
# - System libraries and binaries are mounted Read-Only (--ro-bind)
# - The target project workspace is mounted Read-Write (--bind)
# - Ephemeral empty home directory masks host credentials (~/.ssh, ~/.gemini, ~/.gnupg)
# - Network namespace is isolated by default (--unshare-net --loopback) unless -n/--allow-net is passed
BWRAP_ARGS=(
    # Namespace isolation
    "--unshare-pid"
    "--unshare-ipc"
    "--unshare-uts"
    "--die-with-parent"
    "--new-session"

    # Core system directories (Read-Only)
    "--ro-bind" "/usr" "/usr"
    "--ro-bind" "/lib" "/lib"
    "--ro-bind-try" "/lib64" "/lib64"
    "--ro-bind" "/bin" "/bin"
    "--ro-bind-try" "/sbin" "/sbin"
    "--ro-bind" "/etc" "/etc"
    "--proc" "/proc"
    "--dev" "/dev"

    # Isolated ephemeral storage
    "--tmpfs" "/tmp"
    "--dir" "/tmp"

    # Isolated Home Directory (Blocks host credentials ~/.gemini, ~/.ssh, ~/.gnupg)
    "--bind" "$SANDBOX_HOME" "$HOME"
    "--setenv" "HOME" "$HOME"
    "--setenv" "USER" "sandbox"
    "--setenv" "LOGNAME" "sandbox"

    # Workspace mount (Read-Write)
    "--bind" "$WORKSPACE_ABS" "$WORKSPACE_ABS"
    "--chdir" "$WORKSPACE_ABS"
)

# Optional toolchain cache and local binaries preservation (if present in host home)
if [[ -d "$HOME/.cache" ]]; then
    BWRAP_ARGS+=("--bind-try" "$HOME/.cache" "$HOME/.cache")
fi
if [[ -d "$HOME/.local/bin" ]]; then
    BWRAP_ARGS+=("--ro-bind-try" "$HOME/.local/bin" "$HOME/.local/bin")
fi

# 4. Dual Network Profiles
# Profile 1 (Hydration / Online): When -n/--allow-net is specified, omit --unshare-net to allow outbound internet
# Profile 2 (Test / Offline Loopback): When -n/--allow-net is omitted, enforce strict network namespace isolation
if [[ "$ALLOW_NET" == false ]]; then
    BWRAP_ARGS+=(
        "--unshare-net"
        "--loopback"
    )
fi

# 5. Mask workspace-level secrets if present (REV-01 compliant)
# Strictly use "shopt -s nullglob" and explicit "[ -f "$secret_file" ]" checks
# to safely handle present and absent secret file conditions without unbound errors.
shopt -s nullglob
SECRET_PATTERNS=(
    ".env"
    ".env.*"
    "*.key"
    "*.pem"
    "secrets.yaml"
    "config/secrets.yaml"
    "*/secrets.yaml"
)

declare -A MASKED_SECRETS=()
for pattern in "${SECRET_PATTERNS[@]}"; do
    for secret_file in "$WORKSPACE_ABS"/$pattern; do
        if [ -f "$secret_file" ] && [[ -z "${MASKED_SECRETS["$secret_file"]:-}" ]]; then
            BWRAP_ARGS+=("--tmpfs" "$secret_file")
            MASKED_SECRETS["$secret_file"]=1
        fi
    done
done
shopt -u nullglob

# 6. Execute command inside the sandbox boundary
if [[ $# -eq 0 ]]; then
    exec bwrap "${BWRAP_ARGS[@]}" /bin/bash
else
    exec bwrap "${BWRAP_ARGS[@]}" "$@"
fi
