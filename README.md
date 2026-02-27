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

The root `dist/` is tracked by git (`.gitignore` excludes `**/dist` but explicitly
allows `/dist/`). Run `build:dist` and commit the output before pushing so that
`npm install github:devalbo/devalbo-cli` picks up the built bundle:

```bash
npm run build:dist
git add dist/
git commit -m "release: build dist for vX.Y.Z"
git push
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

## Examples

See `examples/` for package-level usage snippets.
