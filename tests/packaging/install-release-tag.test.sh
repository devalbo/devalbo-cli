#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

repo_url_raw="${GIT_REPO_URL:-$(git -C "$REPO_ROOT" remote get-url origin 2>/dev/null || true)}"
if [[ -z "$repo_url_raw" ]]; then
  echo "[install-release-tag] Missing GIT_REPO_URL and no git origin found; skipping."
  exit 0
fi
if [[ "$repo_url_raw" == git@github.com:* ]]; then
  repo_url="https://github.com/${repo_url_raw#git@github.com:}"
else
  repo_url="$repo_url_raw"
fi
repo_url="${repo_url%.git}.git"

release_tag="${RELEASE_TAG:-}"
if [[ -z "$release_tag" ]]; then
  release_tag="$(git ls-remote --tags "$repo_url" 'v*' 2>/dev/null | awk '{print $2}' | sed 's#refs/tags/##' | grep -v '\^{}' | sort -V | tail -n 1 || true)"
fi
if [[ -z "$release_tag" ]]; then
  echo "[install-release-tag] No v* tag found on $repo_url; skipping tag check."
  exit 0
fi

pkg_name="${EXPECTED_PACKAGE_NAME:-$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); process.stdout.write(p.name);" "$REPO_ROOT/package.json")}" 
required_exports="${REQUIRED_EXPORTS:-startInteractiveCli,InteractiveShell,bindCliRuntimeSource,unbindCliRuntimeSource,cli,builtinCommands,registerBuiltinCommands,mergeCommands,createCliAppConfig,defaultWelcomeMessage}"

spec="git+${repo_url}#${release_tag}"
tmp_dir="$(mktemp -d)"
trap 'rm -rf "$tmp_dir"' EXIT

pushd "$tmp_dir" >/dev/null
npm init -y >/dev/null
env -u NPM_CONFIG_GLOBALCONFIG \
  NODE_AUTH_TOKEN= NPM_TOKEN= \
  NPM_CONFIG_USERCONFIG=/dev/null \
  NPM_CONFIG_REGISTRY=https://registry.npmjs.org \
  npm install "$spec" >/dev/null

node --input-type=module -e "import * as m from '${pkg_name}'; const required='${required_exports}'.split(','); const missing=required.filter((k)=>!(k in m)); if(missing.length){console.error('Missing exports:', missing.join(',')); process.exit(1);} console.log('Release tag install/import check passed.');"
popd >/dev/null
