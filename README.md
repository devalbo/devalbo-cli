# devalbo-core-v2

Monorepo for the foundational `@devalbo-cli/*` packages and the `naveditor` PoC.

## Workspace Packages

- `@devalbo-cli/shared`: shared types, environment detection, validation errors
- `@devalbo-cli/filesystem`: filesystem drivers and watcher services
- `@devalbo-cli/state`: TinyBase-backed state and persister wrappers
- `@devalbo-cli/ui`: isomorphic UI primitives and shell providers
- `@devalbo-cli/commands`: command registry, parsing, validation, console bridge
- `@devalbo-cli/worker-bridge`: worker messaging and shared-buffer helpers
- `naveditor`: terminal/browser navigator-editor app built on these packages

## Quick Start

```bash
pnpm install
pnpm -r --filter "@devalbo-cli/*" build
pnpm -r --filter "@devalbo-cli/*" type-check
pnpm test:packages
```

## All Workspace Commands

```bash
pnpm build
pnpm type-check
pnpm test
```

## Examples

See `examples/` for package-level usage snippets.
