# devalbo-core-v2

Monorepo for the foundational `@devalbo-cli/*` packages.

## Workspace Packages

- `@devalbo-cli/branded-types`: branded primitive types
- `@devalbo-cli/shared`: shared types, environment detection, validation errors
- `@devalbo-cli/filesystem`: filesystem drivers and watcher services
- `@devalbo-cli/state`: TinyBase-backed state and persister wrappers (core only)
- `@devalbo-cli/ui`: isomorphic UI primitives and shell providers
- `@devalbo-cli/commands`: command registry, parsing, validation, console bridge
- `@devalbo-cli/worker-bridge`: worker messaging and shared-buffer helpers
- `@devalbo-cli/cli-shell`: Ink-based interactive shell

## Quick Start

```bash
pnpm install
npm run build:dist
```

`build:dist` builds all `@devalbo-cli/*` sub-packages in dependency order, then
builds the root bundle.

## Release Build

```bash
npm run build:packages   # build sub-packages only (skips root bundle)
npm run build:dist       # build sub-packages + root bundle
pnpm type-check          # type-check all packages
pnpm test                # test all packages
```

## Publishing a release

This repo uses [Changesets](https://github.com/changesets/changesets) for version
management. All workspace packages are versioned together (fixed versioning).

### 1. Configure token for release workflow dispatch

Set a GitHub token with `repo` scope (classic PAT):

```bash
# .env (recommended)
GITHUB_TOKEN=<your-token>
```

The release script auto-loads `.env` from repo root. `GH_TOKEN` is also accepted.

### 2. Run the release wizard

```bash
# Dry run (default)
bash scripts/run-release-workflow.sh

# Execute (actually dispatches the workflow)
bash scripts/run-release-workflow.sh --execute
```

In the wizard:

- choose **tagged release** — if no `v*` tag is on `HEAD`, the wizard creates a
  changeset, runs `pnpm changeset version`, commits, and tags automatically
- choose **non-tagged release** to promote only the `release` branch
- use **review commit history** for major/minor/maintenance/all history views
- select the **source commit** from a paged list of recent `main` commits

Optional dirty-tree override:

```bash
bash scripts/run-release-workflow.sh --execute --allow-dirty
```

### How the tagged release flow works

1. Wizard detects no `v*` tag on `HEAD`
2. You pick a bump type (patch / minor / major)
3. Wizard writes a changeset file, runs `pnpm changeset version`, commits all
   updated `package.json` files, and creates a `vX.Y.Z` tag
4. You push: `git push origin main --follow-tags`
5. Rerun the wizard and choose **tagged release** to dispatch `release-promote`

### Strict tagged-release rules

- `release_tag` must equal `v<package.json version>` at the source commit
- tagged releases must come from a version-bump commit
- all workspace package versions must be in sync
- source commit must be on `origin/main`

### Manual changeset workflow

You can also create changesets outside the wizard:

```bash
pnpm changeset              # interactive: describe changes and pick bump type
pnpm changeset version      # apply: bump versions and consume changesets
git add . && git commit -m "0.X.Y"
git tag -a v0.X.Y -m "0.X.Y"
git push origin main --follow-tags
```

It dispatches `.github/workflows/release-promote.yml`, which publishes the
`release` branch and creates the source tag when tagging is enabled.

## Consuming this package

Projects that depend on `@devalbo-cli/*` packages via `file:` references will have
them built automatically. Each sub-package has a `prepare` script, which npm runs
automatically for `file:` dependencies during `npm install`.

```bash
git clone git@github.com:devalbo/devalbo-cli.git
```

Then in the consuming project:

```bash
npm install    # automatically builds all @devalbo-cli/* file: dependencies
```

## Creating an app

See [`CREATE_AN_APP.md`](./CREATE_AN_APP.md) for a step-by-step guide to building
a new app with terminal, browser, and desktop (Tauri) support.

