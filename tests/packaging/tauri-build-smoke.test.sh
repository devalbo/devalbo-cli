#!/usr/bin/env bash
set -euo pipefail

if ! command -v cargo >/dev/null 2>&1; then
  echo "[tauri-build-smoke] cargo not found; skipping."
  exit 0
fi

echo "[tauri-build-smoke] TODO: wire minimal Tauri compile/build check in this environment."
