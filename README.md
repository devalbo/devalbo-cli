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

### 1. Bump versions and rebuild

Update the version in `package.json` and all `packages/*/package.json`, then rebuild:

```bash
npm run build:dist
```

Commit and push to `main`:

```bash
git add dist/ packages/*/dist/ package.json packages/*/package.json pnpm-lock.yaml
git commit -m "chore(release): bump to vX.Y.Z"
git push
```

### 2. Trigger the release workflow

The `release-promote` workflow runs packaging gates, prepares the release tree, force-pushes it to the `release` branch, and optionally creates a version tag. Trigger it via the GitHub API using a [personal access token](https://github.com/settings/tokens) with `repo` scope:

```bash
export GITHUB_TOKEN=<your-token>

curl -X POST \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/devalbo/devalbo-cli/actions/workflows/release-promote.yml/dispatches \
  -d '{
    "ref": "main",
    "inputs": {
      "source_sha": "'$(git rev-parse HEAD)'",
      "release_branch": "release",
      "create_tag": "true",
      "release_tag": "vX.Y.Z"
    }
  }'
```

Set `"create_tag": "false"` to promote to the `release` branch without creating a tag (e.g. for a patch that doesn't warrant a new version).

Monitor the run:

```bash
curl -H "Authorization: Bearer $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/devalbo/devalbo-cli/actions/runs?branch=main&per_page=5" \
  | node -e "const d=require('fs').readFileSync('/dev/stdin','utf8'); JSON.parse(d).workflow_runs.forEach(r => console.log(r.status, r.conclusion ?? '(running)', r.name, r.html_url))"
```

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

