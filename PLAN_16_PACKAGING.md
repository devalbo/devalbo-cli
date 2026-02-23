# Plan 16: Multi-package publishing (drop tsup, use tsc)

**After a fresh checkout**, before running the smoke script, run:
```sh
pnpm install
pnpm run build:dist
```
Then run the smoke script with the local package, e.g.:
```sh
bash scripts/smoke-create-app.sh --force --app-dir /tmp/app-cli-test-1 --devalbo-spec "file:$(pwd)"
```

---

## Package naming

**Use scope `@devalbo-cli` with subpackage names.** All published packages live under the same scope: **`@devalbo-cli/cli`** (main app-facing entry), **`@devalbo-cli/filesystem`**, **`@devalbo-cli/shared`**, **`@devalbo-cli/state`**, **`@devalbo-cli/cli-shell`**, etc. Apps install the main package (e.g. `npm install @devalbo-cli/cli`) and get the rest as transitive deps. No unscoped root package and no separate `@devalbo` scope.

---

## Goal

Publish the workspace packages so that apps install `@devalbo-cli/cli` plus its `@devalbo-cli/*` dependencies from the registry. Build the root and all packages with **tsc only** (no tsup). Let existing `"browser"` exports (e.g. `@devalbo-cli/filesystem`’s `./node` → `node.browser.js`) be resolved by the app’s bundler so we no longer need the single-bundle hacks (banner removal, fs stub in the smoke app).

---

## Why change

- **Current:** One published package (root named `devalbo-cli`, unscoped). tsup bundles all workspace code into a single `dist/`, so the app only ever sees one artifact. The native Node driver (and its `fs` import) is inlined; the app’s Vite build then hits polyfill/empty mocks and we paper over it with an fs stub and banner removal.
- **Target:** Publish `@devalbo-cli/*` packages. The main package **`@devalbo-cli/cli`** (root) depends on them and is built with tsc (no bundling). When an app installs `@devalbo-cli/cli`, it gets `@devalbo-cli/filesystem` etc. in `node_modules`. The app’s Vite build resolves `@devalbo-cli/filesystem` and uses its `"browser": "./dist/node.browser.js"` for `./node` — no Node driver, no `fs`, no stubs.

---

## Current layout assessment

### Already publish-ready (build → dist, exports → dist)

| Package                    | Build   | main/exports | Notes                          |
|----------------------------|--------|--------------|---------------------------------|
| @devalbo-cli/commands      | tsc    | dist         |                                 |
| @devalbo-cli/shared        | tsc    | dist         |                                 |
| @devalbo-cli/filesystem    | tsc    | dist         | Has `"browser"` for `./node`   |
| @devalbo-cli/state         | tsc    | dist         |                                 |
| @devalbo-cli/ui            | tsc    | dist         |                                 |
| @devalbo-cli/solid-client  | tsc    | dist         | Optional for core CLI          |
| worker-bridge              | tsc    | dist         |                                 |

### Needs small fixes

| Package                    | Issue | Change |
|----------------------------|-------|--------|
| @devalbo-cli/branded-types | Builds to `dist` but main/exports point to `src` | Point main and exports at `dist/` for publish. |
| @devalbo-cli/cli-shell    | `private: true`, no build, main→src, path aliases to sibling src | Remove private (if publishing). Add `build` (tsc, outDir dist). Set main/exports → dist. Resolve `@devalbo-cli/*` to sibling `dist/` in tsconfig for build, or publish in dependency order and depend on published versions. |

### Internal / thin layer

| Package                    | Role | Option |
|----------------------------|------|--------|
| packages/devalbo-cli (current @devalbo/devalbo-cli-dev) | Re-exports from cli-shell, filesystem, shared, state | Publish as the root entry **@devalbo-cli/cli** with deps on the other @devalbo-cli/* packages, or keep internal and have root build produce the same re-exports from root entry. |

---

## Root package (@devalbo-cli/cli)

- **Name:** `@devalbo-cli/cli` — the main app-facing entry, under the same scope as the rest (`@devalbo-cli/*`).
- **Dependencies:** List @devalbo-cli/cli-shell, @devalbo-cli/filesystem, @devalbo-cli/shared, @devalbo-cli/state (and any others the root re-exports) with version ranges (e.g. `^0.1.0`). At publish time, `workspace:*` must be replaced with those ranges (pnpm or a version/publish tool).
- **Build:** Remove tsup. Build = (1) build all workspace packages (`pnpm -r build`), (2) build root with **tsc**: compile the root entry points (e.g. `src/devalbo-cli.ts`, `src/vite-plugin.ts`) into `dist/`, with path mappings (or project references) so that `@devalbo-cli/*` resolve to `packages/*/dist` (or to the published package names). Output: `dist/index.js`, `dist/vite.js`, and `.d.ts`, with imports like `from '@devalbo-cli/cli-shell'` left as-is (not bundled).
- **Publish:** Include `dist/` and README. Consumers get `@devalbo-cli/cli` + transitive `@devalbo-cli/*` from the registry.

---

## Tauri packaging

**Tauri desktop apps must remain supported.** Apps like naveditor-desktop depend on the same packages (e.g. @devalbo-cli/cli-shell, @devalbo-cli/filesystem) and use Vite to build the webview bundle. The multi-package layout and tsc-only builds must work for Tauri: the desktop app installs `@devalbo-cli/cli` (or the relevant @devalbo-cli/* packages), and the Tauri/Vite build resolves and bundles them as it does for the browser. No separate Tauri-specific packaging is required so long as the published packages are consumable by a standard Vite (or Tauri-capable) build. Verify that the existing Tauri app (e.g. naveditor-desktop) still builds and runs after the switch to @devalbo-cli/* and tsc-only.

---

## Smoke script and CREATE_AN_APP

**One install flow for terminal, browser, and Tauri.** The smoke script should mirror the install and setup described in CREATE_AN_APP.md: same package.json shape, same install commands, so that one scaffold supports running the terminal app (`npm run start`), the browser app (`npm run start:browser` / `npm run build`), and a Tauri desktop app when the app adds a minimal `src-tauri` (as in the doc). No separate “CLI-only” vs “browser” scaffolds — one app that can run in all three environments from the same install.

**Current smoke workarounds are temporary.** The fs stub (`src/lib/node-fs-stub.js`) and the `resolve.alias` for `fs` / `node:fs` in the generated vite.config exist only because the current single-bundle build inlines the Node filesystem driver into the browser bundle. After PLAN_16 (multi-package, tsc-only), the app’s bundler will resolve `@devalbo-cli/filesystem`’s `"browser"` export for `./node`, so the Node driver and `fs` will not be in the browser bundle. **Then the smoke script can drop the fs stub and the fs alias** and generate a vite.config that matches CREATE_AN_APP (e.g. just `nodePolyfills` from `@devalbo-cli/cli/vite` if the doc keeps that). Align CREATE_AN_APP so its “full app” quickstart (terminal + browser, and Tauri where documented) uses the same setup the smoke script generates.

**Smoke checks.** Run the same steps as the doc (install, type-check, build). Optionally run a Tauri build when the scaffold includes a minimal Tauri setup and the environment has the Tauri CLI; otherwise document Tauri as a manual check after `npm run build` passes.

---

## Publish order and workflow

Dependency order (publish in this order so versions exist):

1. @devalbo-cli/branded-types  
2. @devalbo-cli/shared  
3. @devalbo-cli/commands, @devalbo-cli/state, @devalbo-cli/ui, @devalbo-cli/filesystem (and any others that only depend on shared/branded-types)  
4. @devalbo-cli/cli-shell  
5. @devalbo-cli/cli (root)

Use pnpm’s publish workflow or a tool (e.g. changesets) to:

- Bump versions and replace `workspace:*` with the chosen version range for each published dependency before `npm publish`.

---

## Deliverables

- All publishable packages build with tsc and ship `dist/` with correct main/exports.
- Root builds with tsc only (no tsup); dist contains re-exports that import from `@devalbo-cli/*`.
- Publish pipeline (order + workspace→version rewrite) documented or automated.
- Smoke script and CREATE_AN_APP apps install `@devalbo-cli/cli` from registry (or git) and run; **no fs stub and no banner removal** in the app or in the root bundle.
- **Tauri packaging:** Desktop app (e.g. naveditor-desktop) still builds and runs using the same @devalbo-cli/* packages and Vite.
- PLAN_16 done when: smoke passes with a multi-package install, app Vite build succeeds without any Node `fs` / `createRequire` hacks, and Tauri desktop build is verified.

---

## Out of scope (for this plan)

- Deciding registry (npm vs other) or actual publishing automation.
- Changing public API surface of @devalbo-cli/cli or other @devalbo-cli/* packages.
- Solid-specific packaging or onboarding.
