# Plan 16: Single-bundle release for simple app installs

**Goal:** App developers install one package (from git or registry) and get a working CLI + browser + Tauri app without npm resolution bugs or multi-package wiring.

---

## The problem today

- Installing `@devalbo-cli/cli` from **git** pulls the whole monorepo. The root and workspace packages use `file:` deps, and npm’s resolver hits bugs (“null parent”, “node.target”) when building that tree. We work around with `npx npm@11.10.1 install --legacy-peer-deps`, but it’s fragile.
- **Multi-package** (publish each workspace to the registry) would fix resolution but adds publish order, version bumps, and more moving parts for app devs.

---

## Approach: one installable artifact with committed `dist/`

**For app developers:** One ref (e.g. `main` or a `release` branch / tag) looks like a **single package** with a prebuilt `dist/` and **no** `file:` or workspace dependencies. Installing from git (or registry) only sees that one package and normal registry deps → no resolver bugs.

**How we get there:**

1. **Bundle the root** so `dist/` is self-contained: one main bundle (cli-shell, shared, state, filesystem main entry, etc.) plus the existing **node vs browser** split for the filesystem driver only.
2. **Node vs browser** stays as two small files (already in place):
   - `dist/node.js` — Node implementation (uses `fs`).
   - `dist/node.browser.js` — browser stub.
   - Package `exports` keep `"./node": { "browser": "./dist/node.browser.js", "import": "./dist/node.js" }`. The main bundle does a dynamic `import('./node')`; in the browser the app’s bundler resolves that to the stub. No single-file-for-both; one main bundle + these two files is enough.
3. **Release ref:** On the ref that apps install from (e.g. `main` or `release`):
   - Root `package.json` has **no** `@devalbo-cli/*` or `file:` deps — only external deps (e.g. `vite-plugin-node-polyfills`, etc.).
   - `dist/` is **committed** (or produced by CI and committed): `dist/index.js`, `dist/vite.js`, `dist/node.js`, `dist/node.browser.js`, and `.d.ts`.
   - So `npm install git+https://github.com/devalbo/devalbo-cli.git` (or `#release`) installs one package with a simple dependency tree.

**Repo layout:**

- **Development (main today):** Monorepo with workspaces, `file:` deps, tsc (or tsup) per package. No committed `dist/` at root for release; that’s built only for the release artifact.
- **Release:** Either a dedicated branch/tag with the simplified root `package.json` + committed `dist/`, or CI that builds the bundle and commits/pushes to that ref. App developers only ever see the release layout.

---

## Build: single bundle for the root

- **Input:** Root entry points (`src/index.ts`, `src/vite-plugin.ts`) and their dependency graph (cli-shell, shared, state, filesystem main, etc.). **Exclude** the subpath `@devalbo-cli/filesystem/node` from the bundle; it stays as separate files.
- **Output:**
  - `dist/index.js` (and `.d.ts`) — main bundle; contains dynamic `import(...)` for the filesystem node driver.
  - `dist/vite.js` (and `.d.ts`) — Vite plugin bundle if separate.
  - `dist/node.js` / `dist/node.browser.js` (and `.d.ts`) — copy or build from `packages/filesystem` (Node impl and browser stub only).
- **Tool:** tsup, Rollup, or esbuild. Config: bundle everything except `filesystem/node`; emit node and node.browser as separate entry points or copy from filesystem package.
- **Root package.json (release ref):** Only lists non-workspace deps. No `@devalbo-cli/cli-shell`, etc.

---

## What app developers do

- **From git:**  
  `npm install git+https://github.com/devalbo/devalbo-cli.git`  
  or with a tag: `git+https://github.com/devalbo/devalbo-cli.git#v0.1.0`  
  No need for `npx npm@11.10.1` or `--legacy-peer-deps` once the installable ref has the single-package layout.

- **From registry (later):**  
  `npm install @devalbo-cli/cli`  
  Same artifact shape.

- **Terminal, browser, Tauri:** One install; same package. The app’s bundler (Vite) resolves the filesystem `./node` export to `node.browser.js` in the browser; Node uses `node.js`. No fs stub or alias in the app.

---

## Smoke script and CREATE_AN_APP

- **Smoke:** Can use default git spec again; no need to special-case install flags if the default ref is the release layout. Optionally keep `npx npm@11.10.1 ... --legacy-peer-deps` until the release ref is the default.
- **CREATE_AN_APP:** Document install from git (and later from registry). Drop any fs stub / node:fs alias from the generated app; the package’s export conditions handle node vs browser.
- **One scaffold** for terminal, browser, and Tauri from the same install.

---

## Tauri

Unchanged. The single-bundle package still exposes the same exports; desktop apps (e.g. naveditor-desktop) depend on `@devalbo-cli/cli` (or the release ref) and build with Vite. No Tauri-specific packaging.

---

## Repo developer workflow (after plan)

- **main:** Monorepo with workspaces, `file:` deps, tsc builds per package. Root may still have a “bundle for release” script that produces the artifact.
- **Release ref:** Updated by CI or manually: simplified root `package.json` + committed `dist/` (single bundle + node / node.browser files). No workspace deps on that ref.
- **Fresh checkout (for repo dev):**  
  `npm install`  
  `npm run build:dist`  
  Smoke with local ref:  
  `bash scripts/smoke-create-app.sh --devalbo-spec "file:$(pwd)"`  
  (or point at a release ref to test the install path.)

---

## Deliverables

- Root build produces a **single bundle** (index + vite) plus `node.js` / `node.browser.js`, with no runtime dependency on other `@devalbo-cli/*` packages.
- A **release ref** (branch or tag) contains only that root package: simplified `package.json` (no file:/workspace deps) and committed `dist/`.
- **Install from git** (that ref) works with plain `npm install`; no resolver workarounds required for app developers.
- **Smoke script** and **CREATE_AN_APP** document and use the simple install; app has no fs stub or node:fs alias.
- **Tauri** desktop app still builds and runs with the same package.

---

## Out of scope

- Deciding registry or full publish automation.
- Changing public API of `@devalbo-cli/cli`.
- Solid-specific packaging.
- Publishing individual workspace packages to the registry (optional later; not required for simple app installs).
