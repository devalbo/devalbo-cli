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

if grep -q "createRequire" "$target"; then
  echo "[artifact-scan] Forbidden marker 'createRequire' found in $target" >&2
  exit 1
fi

if rg -n '^import .*from "(node:[^"]+|fs|child_process|module)"' "$target" >/dev/null; then
  echo "[artifact-scan] Forbidden Node import found in $target" >&2
  rg -n '^import .*from "(node:[^"]+|fs|child_process|module)"' "$target" >&2
  exit 1
fi

if rg -n '^import \{[^}]+\} from "process"' "$target" >/dev/null; then
  echo "[artifact-scan] Forbidden named process import found in $target" >&2
  rg -n '^import \{[^}]+\} from "process"' "$target" >&2
  exit 1
fi

if rg -n '^import .*from "\./node-[^"]+\.js"' "$target" >/dev/null; then
  echo "[artifact-scan] Forbidden browser -> node chunk import found in $target" >&2
  rg -n '^import .*from "\./node-[^"]+\.js"' "$target" >&2
  exit 1
fi

echo "Artifact scan passed on $target"
