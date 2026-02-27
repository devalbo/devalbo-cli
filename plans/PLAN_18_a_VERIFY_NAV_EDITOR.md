  1. Build the devalbo-cli packages first

  The core packages export from dist/ (compiled output), so they must be built before being
  consumed:

  cd /Users/ajb/Projects/devalbo-cli
  pnpm run build  # or build individual packages: pnpm --filter @devalbo-cli/state build

  Check that dist/ exists for each package naveditor depends on:
  ls packages/cli-shell/dist/
  ls packages/state/dist/
  ls packages/commands/dist/
  ls packages/filesystem/dist/
  ls packages/shared/dist/
  ls packages/ui/dist/

  2. Run npm install in devalbo-editor

  cd devalbo-editor
  npm install

  3. Verify the symlinks resolved correctly

  npm workspace file: references become symlinks in node_modules. Check them:

  # Should exist and be symlinks
  ls -la devalbo-editor/node_modules/@devalbo-cli/

  # Spot-check a few — should point to the right source
  readlink devalbo-editor/node_modules/@devalbo-cli/cli-shell
  # → ../../../packages/cli-shell  (root devalbo-cli package)

  readlink devalbo-editor/node_modules/@devalbo-cli/editor-lib
  # → ../../packages/editor-lib  (intra-editor package)

  4. Verify the dist/ is accessible through the symlink

  ls devalbo-editor/node_modules/@devalbo-cli/cli-shell/dist/
  ls devalbo-editor/node_modules/@devalbo-cli/state/dist/

  If these are empty or missing, the packages weren't built — that's the failure point.

  5. Run the type-check in naveditor

  cd devalbo-editor/apps/naveditor
  npm run type-check

  This exercises all imports end-to-end through TypeScript's resolver. If any file: dep is
  missing its dist/ or has wrong exports in its package.json, you'll see errors here.

  6. Optionally do a build

  npm run build  # from naveditor dir

  This confirms the actual bundler (Vite) can also resolve everything at runtime.

  ---
  Common failure modes to watch for:
  - dist/ missing → package wasn't built yet (fix: build devalbo-cli packages first)
  - Symlink points to wrong location → mistyped file: path in package.json
  - Type errors on @devalbo-cli/* imports → dist/index.d.ts missing or types don't match
