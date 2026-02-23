#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PKG_SPEC="${PKG_SPEC:-file:$ROOT}"
PKG_NAME="${EXPECTED_PACKAGE_NAME:-$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); process.stdout.write(p.name);" "$ROOT/package.json")}" 

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

cat > "$TMP_DIR/package.json" <<JSON
{
  "name": "cli-runtime-smoke",
  "private": true,
  "type": "module",
  "dependencies": {
    "$PKG_NAME": "$PKG_SPEC"
  }
}
JSON

pushd "$TMP_DIR" >/dev/null
env -u NPM_CONFIG_GLOBALCONFIG \
  NODE_AUTH_TOKEN= NPM_TOKEN= \
  NPM_CONFIG_USERCONFIG=/dev/null \
  NPM_CONFIG_REGISTRY=https://registry.npmjs.org \
  npm install >/dev/null

node --input-type=module -e "import * as m from '${PKG_NAME}'; if (!('startInteractiveCli' in m)) { throw new Error('Missing startInteractiveCli'); } if (!('builtinCommands' in m)) { throw new Error('Missing builtinCommands'); } console.log('CLI runtime smoke passed.');"
popd >/dev/null
