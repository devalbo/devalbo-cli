
# GOAL: Move Naveditor into its own project that depends on/consumes devalbo-cli. This should include the major Solid components in this repo as well.

## Steps:
* Move/rearrange all editor and solid-focused packages into a second project folder structure within this repo called devalbo-editor.
* Devalbo-editor will eventually be moved into a separate folder entirely, but it should have logical independence before we do that.

## Major code areas I am expecting to see moved

### Naveditor
Figure out if there are better ways to organize things... folders of note seem to be...
* editor-lib
* naveditor
* naveditor-desktop
* naveditor-terminal
* naveditor-web

There should end up being 3 applications:
* naveditor-desktop
* naveditor-terminal
* naveditor-web


### Solid code
  packages/solid-client/src/ — Core Solid Protocol logic:
  - session.ts, session-context.tsx — authentication/session
  - ldp-persister.ts, ldp-file-persister.ts — LDP file persistence
  - ldp-synchronizer.ts, ldp-file-synchronizer.ts, ldp-file-sync-ops.ts — sync logic
  - activitypub-delivery.ts — ActivityPub
  - pod-sync.ts, sync-root-resolver.ts, fetch-profile.ts

  editor-lib/src/ — The main app layer with the most files:
  - components/social/ — SocialPanel, PersonaSwitcher, SolidSyncBar, card exchange panels (d1/d2/d3
  subdirs)
  - commands/solid.ts — CLI commands for Solid
  - hooks/useSolidProfileSync.ts, lib/pod-sync.ts
  - components/social/output/ — output renderers for contacts, groups, personas, profiles

  packages/ui/src/social/ — Reusable UI components (contact-card, persona-card, group-card, etc.)

---

# Plan: Separate Naveditor into devalbo-editor

## Context

The naveditor apps (CLI, web, desktop, terminal) and Solid Protocol integration code currently live inside the `devalbo-cli` monorepo alongside the core CLI framework packages. The goal is to move all editor and Solid-focused code into a new `devalbo-editor/` directory, giving it logical independence before eventually moving it to a separate repo.

## Key Decisions

### Single pnpm workspace
The repo stays as **one pnpm workspace**. The root `pnpm-workspace.yaml` adds `devalbo-editor/packages/*` and `devalbo-editor/apps/*`. All cross-references use `workspace:*` by `@devalbo-cli/` package name — no `file:../../../` paths. When devalbo-editor eventually moves to its own repo, `workspace:*` gets swapped to published version ranges.

### Social code split
`packages/ui` and `packages/state` contain both core code (primitives, file-tree schemas) AND social/Solid code (contact-card, persona-card, social schemas). These will be **split into core + social** packages. The social parts become new packages that move to devalbo-editor. Core parts stay in devalbo-cli.

### 4 items in apps/
`naveditor/` (vite-built CLI + all tests) moves as-is alongside the 3 application targets. Consolidation with `naveditor-terminal` deferred to a later effort.

### Why tsconfig/vite still use relative paths
`workspace:*` in `package.json` handles runtime dependency resolution. But TypeScript `paths` and Vite `resolve.alias` point to **source files on disk** for dev-time compilation — they must use relative filesystem paths. This is unavoidable in any monorepo.

## Target Structure

```
devalbo-cli/                          (repo root — single pnpm workspace)
  pnpm-workspace.yaml                (includes packages/*, devalbo-editor/packages/*, devalbo-editor/apps/*)
  packages/
    branded-types/                    (stays)
    shared/                           (stays)
    filesystem/                       (stays)
    commands/                         (stays)
    state/                            (stays — core tables only after split)
    ui/                               (stays — core primitives only after split)
    cli-shell/                        (stays)
    worker-bridge/                    (stays)
    devalbo-cli/                      (stays)
  src/                                (stays — top-level exports)
  dist/                               (stays — tsup bundle)

  devalbo-editor/                     (logical grouping, NOT a separate workspace)
    packages/
      editor-lib/                     (from editor-lib/)
      solid-client/                   (from packages/solid-client/)
      social-ui/                      (NEW — extracted from packages/ui/src/social/)
      social-state/                   (NEW — extracted from packages/state social code)
    apps/
      naveditor/                      (from naveditor/)
      naveditor-web/                  (from naveditor-web/)
      naveditor-desktop/              (from naveditor-desktop/)
      naveditor-terminal/             (from naveditor-terminal/)
```

## Steps

### Phase 1: Extract social code into new packages (before moving anything)

This is done first while paths are still short and simple.

#### 1a. Create `packages/social-ui` (new package)

Extract `packages/ui/src/social/` into a standalone package.

**Files to move** (9 files):
- `packages/ui/src/social/*.tsx` → `packages/social-ui/src/`
- `packages/ui/src/social/index.ts` → `packages/social-ui/src/index.ts`

**Create** `packages/social-ui/package.json`:
- Name: `@devalbo-cli/social-ui`
- Dependencies: `@devalbo-cli/shared`, react (peer)

**Update** `packages/ui/src/index.ts`: Remove `export * from './social'`

**Update** consumers of social-ui imports: `editor-lib` components that import from `@devalbo-cli/ui` social exports will need to import from `@devalbo-cli/social-ui` instead. Key files:
- `editor-lib/src/components/social/output/*.tsx`
- `editor-lib/src/components/social/d3/*.tsx`

#### 1b. Create `packages/social-state` (new package)

Extract social schemas, accessors, hooks, and mappers from `packages/state/`.

**Files to move:**
- `packages/state/src/schemas/social.ts` → `packages/social-state/src/schemas/social.ts`
- `packages/state/src/accessors/{personas,contacts,groups,memberships,activities}.ts` → `packages/social-state/src/accessors/`
- `packages/state/src/hooks/use-{personas,contacts,groups,memberships,social-entity,activities}.ts` → `packages/social-state/src/hooks/`
- `packages/state/src/mappers/*-jsonld.ts` → `packages/social-state/src/mappers/`

**Create** `packages/social-state/package.json`:
- Name: `@devalbo-cli/social-state`
- Dependencies: `@devalbo-cli/shared`, `@devalbo-cli/state` (for Store type, generic hooks), tinybase, zod, react (peer)

**Refactor `packages/state/src/store.ts`** — composable store pattern:
- `createDevalboStore()` creates core-only store (entries, buffers, sync_roots, file_sync_state)
- Export new `addSocialTablesToStore(store)` from `social-state` that adds personas, contacts, groups, memberships, activities tables + default_persona_id value

**Update** `packages/state/src/index.ts`: Remove social re-exports.

**Update** consumers: `editor-lib`, `naveditor-web/App.tsx`, `naveditor-desktop/App.tsx` need to:
- Import social accessors/hooks/mappers from `@devalbo-cli/social-state`
- Call `addSocialTablesToStore(store)` after `createDevalboStore()`

### Phase 2: Create devalbo-editor directory and move with `git mv`

#### 2a. Create directory structure
```bash
mkdir -p devalbo-editor/packages devalbo-editor/apps
```

#### 2b. Move directories (clean node_modules symlinks first)
```bash
rm -rf editor-lib/node_modules packages/solid-client/node_modules \
       naveditor/node_modules naveditor-web/node_modules \
       naveditor-desktop/node_modules naveditor-terminal/node_modules \
       packages/social-ui/node_modules packages/social-state/node_modules

# Move packages
git mv editor-lib devalbo-editor/packages/editor-lib
git mv packages/solid-client devalbo-editor/packages/solid-client
git mv packages/social-ui devalbo-editor/packages/social-ui
git mv packages/social-state devalbo-editor/packages/social-state

# Move apps
git mv naveditor devalbo-editor/apps/naveditor
git mv naveditor-web devalbo-editor/apps/naveditor-web
git mv naveditor-desktop devalbo-editor/apps/naveditor-desktop
git mv naveditor-terminal devalbo-editor/apps/naveditor-terminal
```

### Phase 3: Update workspace config

#### 3a. `pnpm-workspace.yaml` — add devalbo-editor entries, remove old ones
```yaml
packages:
  - 'packages/*'
  - 'examples/*'
  - 'devalbo-editor/packages/*'
  - 'devalbo-editor/apps/*'
```

#### 3b. Convert all `file:` deps to `workspace:*` in moved packages
All `package.json` files in `devalbo-editor/` that reference `@devalbo-cli/*` via `file:` paths should switch to `workspace:*`. This applies to:
- `devalbo-editor/packages/editor-lib/package.json`
- `devalbo-editor/packages/solid-client/package.json`
- `devalbo-editor/packages/social-ui/package.json` (new)
- `devalbo-editor/packages/social-state/package.json` (new)
- `devalbo-editor/apps/naveditor/package.json`
- `devalbo-editor/apps/naveditor-web/package.json`
- `devalbo-editor/apps/naveditor-desktop/package.json`
- `devalbo-editor/apps/naveditor-terminal/package.json`

Example: `"@devalbo-cli/shared": "file:../shared"` → `"@devalbo-cli/shared": "workspace:*"`

#### 3c. Root `package.json` — move editor scripts
Move web:dev, web:build, terminal, desktop:dev/build scripts to use `--filter` with the new locations, or remove them (they can be run directly in devalbo-editor/apps/).

#### 3d. `vitest.workspace.ts` — update naveditor project path
Update the naveditor test root from `naveditor/` to `devalbo-editor/apps/naveditor/`.

#### 3e. `scripts/build-packages.cjs` — remove solid-client entry (it moved)

### Phase 4: Update tsconfig.json path aliases

Moved packages/apps need updated `extends` and `paths` to reflect new depth:
- `extends`: point to root `tsconfig.base.json` (e.g. `../../../tsconfig.base.json` from `devalbo-editor/apps/X/`)
- `@devalbo-cli/X` paths: update relative paths to `../../../packages/X/src/...` for core pkgs, `../../packages/X/src/...` for intra-editor pkgs
- `@/*` in apps: `../../packages/editor-lib/src/*`

Key files to update:
- `devalbo-editor/packages/editor-lib/tsconfig.json`
- `devalbo-editor/packages/solid-client/tsconfig.json`
- `devalbo-editor/apps/naveditor/tsconfig.json`
- `devalbo-editor/apps/naveditor-web/tsconfig.json`
- `devalbo-editor/apps/naveditor-desktop/tsconfig.json`
- `devalbo-editor/apps/naveditor-terminal/tsconfig.json`

### Phase 5: Update vite.config.ts resolve aliases

Vite alias `resolve()` paths need the same depth adjustments as tsconfig. Core packages go from `../packages/X/src/` to `../../../packages/X/src/`. Editor-lib goes from `../editor-lib/src` to `../../packages/editor-lib/src`.

Key files:
- `devalbo-editor/apps/naveditor/vite.config.ts` — entry point + aliases
- `devalbo-editor/apps/naveditor-web/vite.config.ts` — most complex (all aliases + ink→ink-web)
- `devalbo-editor/apps/naveditor-desktop/vite.config.ts` — same pattern as web

Also update `naveditor-terminal` package.json scripts that reference `../editor-lib/src/cli-node.tsx` → `../../packages/editor-lib/src/cli-node.tsx`

### Phase 6: Update vitest config and test scripts

- `devalbo-editor/apps/naveditor/vitest.config.ts` — update module aliases to new paths
- `devalbo-editor/apps/naveditor/tests/scripts/*.mjs` — check for hardcoded relative paths
- BDD browser tests may reference naveditor-web location — verify paths

### Phase 7: Verification

1. `pnpm install` — dependencies resolve across the unified workspace
2. `pnpm run type-check` — all packages compile (core + editor)
3. `pnpm run --filter naveditor test` — naveditor unit tests pass
4. `pnpm run --filter naveditor build` — CLI builds
5. `pnpm run --filter naveditor-web dev` — web dev server starts
6. `pnpm run --filter naveditor-terminal terminal` — terminal runs
7. `git log --follow -- devalbo-editor/packages/editor-lib/src/cli-node.tsx` — history preserved

## Notes

### `packages/devalbo-cli` (dev wrapper)
This re-exports from cli-shell, state, filesystem, shared. After the split, state no longer exports social accessors/hooks/mappers. This is intentional — the wrapper becomes core-only. No changes needed beyond what the state split already does.

### Phase 1 package creation uses `workspace:*` from the start
Since `packages/social-ui` and `packages/social-state` are created under `packages/*` (already in the workspace), they can use `workspace:*` immediately — no temporary `file:` paths needed.

## Key Risk: Store composition

The tightest coupling is in `packages/state/src/store.ts` where `createDevalboStore()` creates a single TinyBase store with both core and social tables merged. The refactor to `addSocialTablesToStore(store)` is the most delicate part — it must maintain the same runtime store shape so all existing code continues to work.

TinyBase's `Store.setTablesSchema()` merges into the existing schema, so calling it twice (once for core, once for social) should work. Verify this with a quick test before committing to the pattern.

## Independence Test Plan

After completing the workspace restructure, validate that devalbo-editor can function as a fully independent project by copying it to a separate directory and depending on devalbo-cli via git.

### Setup

1. **Copy devalbo-editor to an independent directory:**
   ```bash
   cp -r devalbo-editor /tmp/devalbo-editor-standalone
   cd /tmp/devalbo-editor-standalone
   ```

2. **Create a root `package.json` and `pnpm-workspace.yaml`:**
   ```json
   {
     "name": "devalbo-editor",
     "private": true,
     "version": "0.1.0",
     "type": "module"
   }
   ```
   ```yaml
   packages:
     - 'packages/*'
     - 'apps/*'
   ```

3. **Switch all `workspace:*` refs for `@devalbo-cli/*` core packages to git deps:**
   In every `package.json` under `packages/` and `apps/`, replace:
   ```
   "@devalbo-cli/shared": "workspace:*"
   ```
   with:
   ```
   "@devalbo-cli/shared": "git+https://github.com/<org>/devalbo-cli.git#main"
   ```
   (Or use a local path for initial testing: `"file:/Users/ajb/Projects/devalbo-cli"`)

   Note: Only core packages get this treatment (`shared`, `state`, `ui`, `cli-shell`, `commands`, `filesystem`, `branded-types`). Intra-editor packages (`editor-lib`, `solid-client`, `social-ui`, `social-state`) stay as `workspace:*`.

4. **Add a `tsconfig.base.json`** (copy from devalbo-cli root or create standalone).

5. **Install dependencies:**
   ```bash
   pnpm install
   ```

### Test Matrix

| Test | Command | What it validates |
|------|---------|-------------------|
| **Deps resolve** | `pnpm install` (exit 0) | All @devalbo-cli/* core packages install from git/file ref |
| **Type-check editor-lib** | `pnpm --filter @devalbo-cli/editor-lib run type-check` | editor-lib compiles against installed (not source-linked) core packages |
| **Type-check solid-client** | `pnpm --filter @devalbo-cli/solid-client run type-check` | solid-client compiles independently |
| **Type-check social-ui** | `pnpm --filter @devalbo-cli/social-ui run type-check` | social-ui compiles independently |
| **Type-check social-state** | `pnpm --filter @devalbo-cli/social-state run type-check` | social-state compiles independently |
| **Build naveditor CLI** | `pnpm --filter naveditor run build` | Vite bundles editor-lib + deps into dist/cli.js |
| **Run naveditor CLI** | `node apps/naveditor/dist/cli.js --help` | Built CLI executes, prints help |
| **Build naveditor-web** | `pnpm --filter naveditor-web run build` | Vite builds browser bundle |
| **Dev naveditor-web** | `pnpm --filter naveditor-web run dev` | Dev server starts, page loads at localhost |
| **Run naveditor-terminal** | `pnpm --filter naveditor-terminal run terminal -- --help` | tsx runner works with installed deps |
| **Unit tests** | `pnpm --filter naveditor run test:unit` | All unit tests pass against installed core packages |
| **Desktop type-check** | `pnpm --filter naveditor-desktop run type-check` | Tauri frontend compiles (Rust build not required for this test) |

### Key things that will break (and need fixing)

1. **tsconfig `paths` pointing to `../../../packages/X/src/`** — These resolve source files in the monorepo. In standalone mode, core packages are installed in `node_modules/@devalbo-cli/X`. TypeScript will resolve them via `node_modules` automatically, so **remove the core package entries from `paths`** (keep only intra-editor paths like `@devalbo-cli/editor-lib` → `../editor-lib/src/`).

2. **Vite `resolve.alias` pointing to core package source** — Same issue. In standalone mode, Vite resolves `@devalbo-cli/shared` from `node_modules`. **Remove core package aliases** from vite configs; keep only intra-editor aliases and special cases (like `ink` → `ink-web`).

3. **`extends` in tsconfig** — If pointing to `../../../tsconfig.base.json`, this won't exist. Need own `tsconfig.base.json` at editor root.

4. **Catalog entries** — The standalone workspace needs its own catalog in `pnpm-workspace.yaml` for third-party dep versions.

### Success Criteria

All items in the test matrix pass. This confirms that:
- devalbo-editor has no hidden dependencies on the monorepo layout
- Core packages are consumed as proper dependencies (not source-linked)
- Build tooling works with installed packages, not just workspace source aliases
- The `workspace:*` → git/version swap is the only change needed for full independence
