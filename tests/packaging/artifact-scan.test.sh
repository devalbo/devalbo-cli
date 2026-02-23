#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
STRICT="${STRICT_ARTIFACT_SCAN:-0}"

browser_candidates=(
  "$ROOT/dist/browser.js"
  "$ROOT/dist/index.js"
)

target=""
for f in "${browser_candidates[@]}"; do
  if [[ -f "$f" ]]; then
    target="$f"
    break
  fi
done

if [[ -z "$target" ]]; then
  if [[ "$STRICT" == "1" ]]; then
    echo "[artifact-scan] No browser candidate artifact found under dist/." >&2
    exit 1
  fi
  echo "[artifact-scan] No browser candidate artifact found; skipping (STRICT_ARTIFACT_SCAN=0)."
  exit 0
fi

forbidden=("createRequire" "node:" " from 'fs'" " from \"fs\"" " from 'path'" " from \"path\"")
for pat in "${forbidden[@]}"; do
  if grep -q "$pat" "$target"; then
    echo "[artifact-scan] Forbidden marker '$pat' found in $target" >&2
    exit 1
  fi
done

echo "Artifact scan passed on $target"
