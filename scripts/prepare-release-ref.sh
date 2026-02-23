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

RELEASE_BRANCH="${1:-release}"
echo "Preparing branch: $RELEASE_BRANCH"

TMP_TREE="$(mktemp -d "${TMPDIR:-/tmp}/devalbo-release-tree.XXXXXX")"
cleanup() {
  rm -rf "$TMP_TREE"
}
trap cleanup EXIT

bash "$REPO_ROOT/scripts/prepare-release-tree.sh" "$TMP_TREE"

# Replace root package.json + README + dist with generated release tree.
git checkout -B "$RELEASE_BRANCH" 2>/dev/null || git checkout "$RELEASE_BRANCH"
cp "$TMP_TREE/package.json" "$REPO_ROOT/package.json"
cp "$TMP_TREE/README.md" "$REPO_ROOT/README.md"
rm -rf "$REPO_ROOT/dist"
cp -R "$TMP_TREE/dist" "$REPO_ROOT/dist"
if [[ -f "$TMP_TREE/LICENSE" ]]; then
  cp "$TMP_TREE/LICENSE" "$REPO_ROOT/LICENSE"
fi

git add package.json README.md dist/
if [[ -f LICENSE ]]; then
  git add LICENSE
fi
git status
git commit -m "Release: publish-root layout for install-from-git" || true

# Back to main (restores dev package.json from branch)
git checkout main 2>/dev/null || git checkout master 2>/dev/null || true

echo ""
echo "Done. Push with: git push origin $RELEASE_BRANCH"
echo "Then test: bash scripts/smoke-create-app.sh --force --dir /tmp/e2e-test --devalbo-spec 'git+https://github.com/devalbo/devalbo-cli.git#$RELEASE_BRANCH'"
