#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

bash "$ROOT/scripts/prepare-release-tree.sh" "$TMP_DIR/tree"

for f in package.json README.md dist/index.js dist/node.js dist/vite.js; do
  if [[ ! -f "$TMP_DIR/tree/$f" ]]; then
    echo "[release-tree-smoke] Missing required file: $f" >&2
    exit 1
  fi
done

node -e "
  const fs = require('fs');
  const p = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  if (p.name !== 'devalbo-cli') throw new Error('name must be devalbo-cli');
  if (p.private) throw new Error('package must not be private');
  if (p.workspaces) throw new Error('package must not have workspaces');
  const bad = Object.entries({ ...(p.dependencies||{}), ...(p.devDependencies||{}) })
    .filter(([,v]) => String(v).startsWith('file:'));
  if (bad.length) throw new Error('file: dependencies found: ' + bad.map(([k,v]) => k + '=' + v).join(','));
" "$TMP_DIR/tree/package.json"

echo "Release tree smoke passed."
