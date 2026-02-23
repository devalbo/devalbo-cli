#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
STRICT="${STRICT_METADATA_SYNC:-0}"

canonical="$ROOT/packages/devalbo-cli/package.json"
root_pkg="$ROOT/package.json"

if [[ ! -f "$canonical" || ! -f "$root_pkg" ]]; then
  echo "[metadata-sync] Missing package.json inputs; skipping."
  exit 0
fi

canonical_name="$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); process.stdout.write(p.name||'');" "$canonical")"
root_name="$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); process.stdout.write(p.name||'');" "$root_pkg")"

if [[ "$STRICT" == "1" ]]; then
  if [[ "$canonical_name" != "devalbo-cli" ]]; then
    echo "[metadata-sync] Canonical package name must be devalbo-cli, got: $canonical_name" >&2
    exit 1
  fi
  if [[ "$root_name" != "devalbo-cli" ]]; then
    echo "[metadata-sync] Root/install-target package name must be devalbo-cli, got: $root_name" >&2
    exit 1
  fi
else
  echo "[metadata-sync] Current names (non-strict): canonical=$canonical_name root=$root_name"
fi

echo "Metadata sync check completed."
