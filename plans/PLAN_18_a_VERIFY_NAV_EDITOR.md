# Verifying naveditor depends on devalbo-cli and works after npm install

Each `@devalbo-cli/*` sub-package has a `prepare` script, so `npm install` in a
consuming project automatically builds them. No manual build step is needed first.

## 1. Clone and install

```bash
git clone git@github.com:devalbo/devalbo-cli.git
cd devalbo-cli/devalbo-editor
npm install
```

npm will automatically run `prepare` on each `@devalbo-cli/*` `file:` dependency,
building them in dependency-graph order.

## 2. Verify symlinks and dist

```bash
# Should list @devalbo-cli/* packages
ls -la node_modules/@devalbo-cli/

# Spot-check symlink targets
readlink node_modules/@devalbo-cli/cli-shell
# → ../../../packages/cli-shell  (root devalbo-cli package)

readlink node_modules/@devalbo-cli/editor-lib
# → ../../packages/editor-lib  (intra-editor package)

# Verify dist/ was built
ls node_modules/@devalbo-cli/cli-shell/dist/
ls node_modules/@devalbo-cli/state/dist/
```

## 3. Type-check

```bash
npm run type-check --workspace=naveditor
```

## 4. CLI (terminal)

Build and run naveditor as a CLI tool:

```bash
cd apps/naveditor
npm run build       # vite build --mode node → dist/cli.js
npm run cli         # node dist/cli.js
```

Or run directly from source without building via naveditor-terminal:

```bash
cd apps/naveditor-terminal
npm run terminal    # node --import tsx ../../packages/editor-lib/src/cli-node.tsx
npm run interactive # same, with interactive flag
```

## 5. Browser

Run the web app in dev mode:

```bash
cd apps/naveditor-web
npm run dev         # vite dev server
```

Or build and preview:

```bash
npm run build
npm run preview     # serves on http://127.0.0.1:4173
```

## 6. Desktop (Tauri)

Requires Rust and the Tauri CLI to be installed.

```bash
cd apps/naveditor-desktop
npm run dev         # tauri dev (starts vite + wraps in native window)
npm run build       # tauri build (produces native app bundle)
```

---

## Common failure modes

- `dist/` missing → `prepare` script didn't run or failed; check for tsc errors
- Symlink points to wrong location → mistyped `file:` path in package.json
- Type errors on `@devalbo-cli/*` imports → `dist/index.d.ts` missing or types don't match
- Desktop `dev`/`build` fails → Rust toolchain or Tauri CLI not installed
