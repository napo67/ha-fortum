#!/usr/bin/env bash
#
# Antigravity (AGY) Lifecycle Hook Safety Gate
# Enforces tool permission allowlists and blocks credential/privilege escalations.
#
# Copyright 2026 Hannu Napari <napo@iki.fi>
#
set -euo pipefail

# Read hook payload from stdin
python3 -c '
import sys
import json
import re

try:
    data = json.load(sys.stdin)
except Exception:
    # If unparseable, default allow to prevent blocking
    print(json.dumps({"decision": "allow"}))
    sys.exit(0)

tool_call = data.get("toolCall", {})
tool_name = tool_call.get("name", "")
args = tool_call.get("args", {})

# 1. Inspect command execution (run_command)
if tool_name == "run_command":
    cmd = args.get("CommandLine", "")

    # Prohibit privilege escalation
    if re.search(r"\b(sudo|su)\b", cmd):
        print(json.dumps({
            "decision": "deny",
            "reason": "Security Policy: Autonomous sudo and su privilege escalations are prohibited."
        }))
        sys.exit(0)

    # Prohibit cloud metadata and internal probe targets
    if "169.254.169.254" in cmd:
        print(json.dumps({
            "decision": "deny",
            "reason": "Security Policy: Access to cloud instance metadata (169.254.169.254) is prohibited."
        }))
        sys.exit(0)

# 2. Inspect file access (view_file, write_to_file, replace_file_content)
if tool_name in ["view_file", "write_to_file", "replace_file_content", "multi_replace_file_content"]:
    target_path = args.get("AbsolutePath") or args.get("TargetFile") or ""

    # Prohibit sensitive credential vaults and keys
    sensitive_patterns = [
        r"/\.ssh(/|$)",
        r"/\.aws(/|$)",
        r"/\.gnupg(/|$)",
        r"/\.config/gcloud(/|$)",
        r"/\.azure(/|$)",
        r"/\.kube(/|$)",
        r"/\.env(\.|$)",
        r"\.key$",
        r"\.pem$",
        r"\.p12$"
    ]

    for pattern in sensitive_patterns:
        if re.search(pattern, target_path):
            print(json.dumps({
                "decision": "deny",
                "reason": f"Security Policy: Direct access to credentials or secret file ({target_path}) is prohibited."
            }))
            sys.exit(0)

# Default allow for standard operations
print(json.dumps({"decision": "allow"}))
'
