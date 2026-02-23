#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

repo_url_raw="${GIT_REPO_URL:-$(git -C "$REPO_ROOT" remote get-url origin 2>/dev/null || true)}"
if [[ -z "$repo_url_raw" ]]; then
  echo "[main-install-monitor] Missing GIT_REPO_URL and no git origin found; skipping."
  exit 0
fi
if [[ "$repo_url_raw" == git@github.com:* ]]; then
  repo_url="https://github.com/${repo_url_raw#git@github.com:}"
else
  repo_url="$repo_url_raw"
fi
repo_url="${repo_url%.git}.git"

if ! git ls-remote --heads "$repo_url" main 2>/dev/null | grep -q .; then
  echo "[main-install-monitor] Ref 'main' not reachable on $repo_url; skipping monitor."
  exit 0
fi

pkg_name="${EXPECTED_PACKAGE_NAME:-$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); process.stdout.write(p.name);" "$REPO_ROOT/package.json")}"
spec="git+${repo_url}#main"

tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

pushd "$tmp_dir" >/dev/null
npm init -y >/dev/null
env -u NPM_CONFIG_GLOBALCONFIG \
  NODE_AUTH_TOKEN= NPM_TOKEN= \
  NPM_CONFIG_USERCONFIG=/dev/null \
  NPM_CONFIG_REGISTRY=https://registry.npmjs.org \
  npm install "$spec" >/dev/null

node --input-type=module -e "import * as m from '${pkg_name}'; if (!('startInteractiveCli' in m)) { console.error('Missing startInteractiveCli export'); process.exit(1); } console.log('Main install monitor passed.');"
popd >/dev/null
