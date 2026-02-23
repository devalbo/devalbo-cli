#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
STRICT="${STRICT_PUBLIC_REFS:-0}"

# Public-facing files only. Internal package manifests are intentionally excluded.
files=()
while IFS= read -r f; do
  files+=("$f")
done < <(
  {
    find "$ROOT" -maxdepth 1 -type f -name "CREATE_AN_APP.md";
    find "$ROOT/scripts" -type f;
    find "$ROOT/.github/workflows" -type f;
  } | sort -u
)

if [[ "${#files[@]}" -eq 0 ]]; then
  echo "[public-reference-guard] No public files found; skipping."
  exit 0
fi

hits="$(rg -n "@devalbo-cli/cli" "${files[@]}" || true)"
if [[ -n "$hits" ]]; then
  if [[ "$STRICT" == "1" ]]; then
    echo "[public-reference-guard] Forbidden public reference found: @devalbo-cli/cli" >&2
    echo "$hits" >&2
    exit 1
  fi
  echo "[public-reference-guard] Non-strict warning: scoped public references detected:"
  echo "$hits"
else
  echo "[public-reference-guard] Passed: no scoped public references found."
fi
