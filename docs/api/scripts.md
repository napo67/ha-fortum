# Repository Scripts & CLI Contracts

This document specifies the CLI contracts, flags, arguments, dependencies, and exit codes for all executable scripts in the repository.

---

## 1. `copy_to_ha.sh`

Deploys changed (or all) integration files from the local workspace to a remote Home Assistant OS instance over SSH with safety backups.

* **Path**: `./copy_to_ha.sh`
* **Dependencies**: `bash`, `getopt` (GNU), `git`, `ssh`, `scp` (or `rsync` depending on host setup)
* **Default Target**: `root@homeassistant.gearloose.me:/config/custom_components/fortum`

### Usage
```bash
./copy_to_ha.sh [options] [git-ref]
```

### Flags & Arguments
| Flag / Argument | Description |
| :--- | :--- |
| `-a`, `--all` | Copy all integration files (excluding `node_modules`, `src`, `__pycache__`, etc.). |
| `-r`, `--ref REF` | Copy files changed in the specified git reference/commit (e.g., `HEAD~1`, `a1b2c3d`). |
| `-t`, `--test` | Dry-run mode; prints operations without executing them. |
| `-h`, `--help` | Show help message and exit. |
| `[git-ref]` | Optional positional git reference (used if `-r` is not set and `git status` is clean). |

### Exit Codes
* `0`: Success (or `-h`/`--help` displayed).
* `1`: Invalid CLI options or `getopt` failure.
* Non-zero: SSH/file transfer or git command failure (`set -e`).

---

## 2. `scripts/sync-ha-frontend.sh`

Clones or updates a local shallow/tagged checkout of `home-assistant/frontend` at `ha-frontend/home-assistant-frontend` to the latest release tag and updates `ha-frontend-release.json`.

* **Path**: `./scripts/sync-ha-frontend.sh`
* **Flags / Arguments**: None.
* **Dependencies**: `bash`, `git`, network access to `https://github.com/home-assistant/frontend.git`.

### Exit Codes
* `0`: Frontend checkout and `ha-frontend-release.json` are up to date.
* `1`: Local `ha-frontend` cache has uncommitted changes, or latest release tag could not be determined.

---

## 3. `scripts/test-ha-frontend-compat.sh`

Runs the Home Assistant frontend compatibility canary test (`tests/frontend/test_ha_frontend_compat.cjs`) against the local `ha-frontend` cache.

* **Path**: `./scripts/test-ha-frontend-compat.sh`
* **Flags / Arguments**: None.
* **Dependencies**: `bash`, `node`, `./scripts/sync-ha-frontend.sh`.

### Behavior & Exit Codes
* `0`: Canary passed, or skipped gracefully if `ha-frontend/home-assistant-frontend/.git` is not present.
* Non-zero: Sync or `node --test` failure (`set -euo pipefail`).

---

## 4. `scripts/release-trigger-checks.sh`

Runs the full pre-release verification suite: syncs HA frontend, runs Python `pytest` suite via `uv`, and runs Node.js frontend tests.

* **Path**: `./scripts/release-trigger-checks.sh`
* **Flags / Arguments**: None.
* **Dependencies**: `bash`, `uv`, `pytest`, `node`, `./scripts/sync-ha-frontend.sh`.

### Exit Codes
* `0`: All sync, Python, and Node.js checks passed.
* Non-zero: Any step failed (`set -euo pipefail`).
