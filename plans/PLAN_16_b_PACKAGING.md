# PLAN 16.b: Packaging Reset for Reliable Git Install Distribution

## Goal
Make `devalbo-cli` installable from git via npm with zero special flags, predictable browser builds, and no dependency on private npm auth or workspace `file:` resolution behavior.

## Why this plan exists
Recent failures were caused by a combination of issues that should not leak to app developers:
- Workspace-style dependency graphs leaking into consumer install paths.
- Single output bundles mixing Node-only and browser-safe code.
- Install docs/scripts drifting between package names (`devalbo-cli` vs `@devalbo-cli/cli`).
- Git install paths relying on build-time lifecycle behavior (`prepare`) that is brittle in cloned temp dirs.
- Local npm auth config unexpectedly interfering with public installs.

The fix is not one toggle; it is a distribution architecture decision.

---

## Design principles
1. Consumer install path must never rely on monorepo internals.
2. Browser bundlers must resolve browser-safe entry points by default.
3. Git install must work without `npm login`, `legacy-peer-deps`, or custom npm versions.
4. Release artifact shape must be CI-verified and reproducible.
5. Changes should be rolled out incrementally with test gates and rollback points.

---

## Recommended end-state architecture

### 1) Dual runtime exports with explicit conditions
Use export conditions so browser toolchains never walk Node-only code.

```json
{
  "exports": {
    ".": {
      "browser": "./dist/browser.js",
      "node": "./dist/node.js",
      "default": "./dist/node.js",
      "types": "./dist/index.d.ts"
    },
    "./vite": {
      "import": "./dist/vite.js",
      "types": "./dist/vite.d.ts"
    }
  }
}
```

Notes:
- `browser` entry must avoid Node builtins and `createRequire` banner contamination.
- `node` entry may include Node-only plumbing.

### 2) Platform-specific dynamic imports for drivers
Driver selection should be runtime-branch dynamic imports so browser bundles do not include native driver code in their graph.

```ts
if (isBrowser) {
  const { createBrowserDriver } = await import('./drivers/browser.js');
  return createBrowserDriver();
}
const { createNodeDriver } = await import('./drivers/node.js');
return createNodeDriver();
```

### 3) Node-only banner applied only to Node build
If `createRequire` banner is needed, scope it to the Node build config only. Never apply it to shared/browser chunks.

### 4) Release channel for git installs
Use a dedicated install target ref (`release` branch or immutable tags) that contains:
- prebuilt `dist/`
- install-safe `package.json` metadata
- no workspace-only resolution assumptions

App docs point to that ref, e.g.:
`git+https://github.com/devalbo/devalbo-cli.git#release`

### 5) Single package name consistency
Consumer package name is `devalbo-cli` everywhere in docs/scripts/workflows.
No scoped alias in external quickstart paths.

---

## Distribution strategy options

### Option A (recommended now): Release ref with committed `dist/`
- `main`: normal development.
- `release`: CI-updated install artifact branch.
- Pros: fastest/most reliable git installs, no install-time build.
- Cons: artifact branch maintenance discipline required.

### Option B: Build on git install (`prepare`)
- Keep `prepare` build path and require build toolchain in git temp clone.
- Pros: no committed build artifacts.
- Cons: slower and historically fragile in monorepo/workspace installs.

Decision: adopt Option A now; revisit B only if release-branch maintenance becomes painful.

---

## Incremental execution plan

### Phase 0: Freeze and baseline (1 day)
- Stop changing install docs/scripts except for break-fix.
- Capture current smoke matrix and failures.

Acceptance checks:
- Baseline script results recorded for:
  - CLI type-check
  - browser build
  - git install

Rollback:
- none (observation only).

### Phase 1: Export/runtime split (1-2 days)
- Introduce explicit `browser` and `node` entry points.
- Move any Node-only imports behind node-only modules.
- Ensure filesystem/runtime driver selection uses dynamic imports.
- Ensure `./vite` export remains browser-safe.

Acceptance checks:
- `vite build` in external scaffold passes without fs stubs/aliases.
- `node` CLI entry still works.
- No `node:*` warnings in browser bundle for public entrypoints.

Rollback:
- Keep old entry as hidden compatibility export during migration.

### Phase 2: Build pipeline separation (1 day)
- Split build config into separate targets:
  - `dist/node.js`
  - `dist/browser.js`
  - `dist/vite.js`
  - `dist/*.d.ts`
- Apply node banner only to node target.

Acceptance checks:
- bundle inspection confirms browser output has no Node builtins/createRequire.

Rollback:
- keep previous build script behind fallback task.

### Phase 3: Release ref automation (1-2 days)
- Add CI workflow to create/update `release` ref:
  - checkout main
  - install
  - build dist
  - verify clean artifact shape
  - push to `release`
- Add guard workflow that fails if source changed but release artifact not refreshed (or if local dist drift policy is violated).

Acceptance checks:
- `npm install git+...#release` works in fresh temp dir.
- import/export smoke test passes from packed artifact and git install.

Rollback:
- disable release ref update job; keep manual script path.

### Phase 4: Docs/script convergence (1 day)
- Update `CREATE_AN_APP.md` and `scripts/smoke-create-app.sh` to use one install target (`#release`).
- Remove all scoped/legacy package references.
- Ensure smoke script verifies:
  - `npm install`
  - `npm run type-check`
  - `npm run build` (browser)

Acceptance checks:
- docs command copied verbatim works.
- smoke script succeeds from clean machine profile.

Rollback:
- keep prior documented fallback command in appendix.

### Phase 5: Hardening and observability (ongoing)
- Add weekly scheduled workflow for external install smoke.
- Add check that `package.json` name in repo matches documented install package.
- Add lint rule for forbidden string references (`@devalbo-cli/cli` in public docs/scripts).

Acceptance checks:
- no regressions for 2+ weeks.

---

## Better repo organization if building this from scratch

If starting over, use a two-layer layout:

1. `packages/core-*` for internal modules (workspace only).
2. `packages/devalbo-cli` as the sole public distribution package.

Rules:
- Public package has its own explicit browser/node entries and tests.
- Internal packages can change freely; only public package contract is stable.
- External docs/scripts never reference internal package names.
- Git install points to a release artifact ref/tag for public package only.

Optional stronger model:
- Use a dedicated `publish/` directory generated by CI with only:
  - `package.json`
  - `README.md`
  - `dist/`
- Push that directory as the `release` branch root.

This eliminates accidental monorepo leakage in consumer installs.

---

## CI/Test matrix (must pass)

### Install-path tests
1. Git install from release ref in clean temp directory.
2. Pack/install local tarball import smoke.
3. Scripted create-app flow from docs.

### Runtime tests
1. CLI startup and simple command exec.
2. Browser production build via Vite.
3. Browser runtime smoke (`InteractiveShell` mounts).

### Consistency tests
1. No forbidden package names in docs/scripts/workflows.
2. Export map sanity (`browser`, `node`, `default`, `types`).
3. Dist artifact completeness check.

---

## Risks and mitigations

Risk: Browser entry accidentally re-imports node code.
- Mitigation: static check + bundle analyzer gate.

Risk: Release ref drifts from main.
- Mitigation: CI-owned update job + status badge + scheduled verify.

Risk: Developers edit docs with stale install examples.
- Mitigation: regex-based CI guard on docs/scripts.

Risk: GitHub tarball / git install behavior differences.
- Mitigation: test both `git+...#release` and `npm pack` paths in CI.

---

## Success criteria
- New external app can follow docs and complete:
  - `npm install`
  - `npm run type-check`
  - `npm run build`
  without local hacks.
- No npm auth required for public install path.
- No Node builtin resolution errors in browser builds for standard scaffold.
- No references to legacy package name in public guidance.

---

## Immediate next actions
1. Finalize package-name cleanup (`devalbo-cli` only in public paths).
2. Implement export split and dynamic driver imports.
3. Add release ref automation workflow.
4. Update smoke script/docs to target `#release`.
5. Run full clean-room validation and lock the flow.
