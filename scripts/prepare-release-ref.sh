#!/usr/bin/env bash
# Prepare a 'release' branch with single-package layout (no file: deps, committed dist/)
# so that: npm install git+https://github.com/devalbo/devalbo-cli.git#release
# works without the "null parent" resolver bug.
#
# Usage: from repo root, after a successful build:
#   bash scripts/prepare-release-ref.sh
# Then: git push origin release
#
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

if [[ ! -f dist/index.js || ! -f dist/node.js ]]; then
  echo "Run build first: npm run build:dist" >&2
  exit 1
fi

RELEASE_BRANCH="${1:-release}"
echo "Preparing branch: $RELEASE_BRANCH"

# Replace root package.json with release layout (no workspaces, no file: deps)
cp package.json package.json.bak
cp scripts/package.release.json package.json

# Commit only root package.json and dist/ on the release branch
git checkout -B "$RELEASE_BRANCH" 2>/dev/null || git checkout "$RELEASE_BRANCH"
git add package.json dist/
git status
git commit -m "Release: single-package layout for install-from-git (no file: deps)" || true

# Back to main (restores dev package.json from branch)
git checkout main 2>/dev/null || git checkout master 2>/dev/null || true
rm -f package.json.bak

echo ""
echo "Done. Push with: git push origin $RELEASE_BRANCH"
echo "Then test: bash scripts/smoke-create-app.sh --force --dir /tmp/e2e-test --devalbo-spec 'git+https://github.com/devalbo/devalbo-cli.git#$RELEASE_BRANCH'"
