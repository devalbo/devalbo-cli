#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${1:-$REPO_ROOT/.release-tree}"

if [[ ! -f "$REPO_ROOT/dist/index.js" || ! -f "$REPO_ROOT/dist/node.js" ]]; then
  echo "Run build first: npm run build:dist" >&2
  exit 1
fi

if [[ ! -f "$REPO_ROOT/scripts/package.release.json" ]]; then
  echo "Missing scripts/package.release.json" >&2
  exit 1
fi

if [[ ! -f "$REPO_ROOT/README.md" ]]; then
  echo "Missing README.md" >&2
  exit 1
fi

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

cp "$REPO_ROOT/scripts/package.release.json" "$OUT_DIR/package.json"
cp "$REPO_ROOT/README.md" "$OUT_DIR/README.md"
cp -R "$REPO_ROOT/dist" "$OUT_DIR/dist"

if [[ -f "$REPO_ROOT/LICENSE" ]]; then
  cp "$REPO_ROOT/LICENSE" "$OUT_DIR/LICENSE"
fi

node -e "
  const fs = require('fs');
  const p = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  const badDeps = Object.entries({ ...(p.dependencies||{}), ...(p.devDependencies||{}) })
    .filter(([,v]) => String(v).startsWith('file:'));
  if (p.private) throw new Error('release package.json must not be private');
  if (p.workspaces) throw new Error('release package.json must not contain workspaces');
  if (badDeps.length) throw new Error('release package.json has file: deps: ' + badDeps.map(([k,v]) => k + '=' + v).join(','));
" "$OUT_DIR/package.json"

echo "Prepared release tree: $OUT_DIR"
