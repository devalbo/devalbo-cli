# Plan 16a: Proper browser/node exports split (attempt 2)

**Parent plan:** PLAN_16_PACKAGING.md
**Context:** PLAN_16 described the right end state. This plan documents what we learned from attempt 1 (the `CREATE_AN_APP` browser guide + smoke script work) and defines the concrete steps to do it properly.

---

## What attempt 1 did (and why it's a workaround)

We added browser support to CREATE_AN_APP by working around the packaging issues at the app level:

- **`nodePolyfills()` wrapper** (`src/vite-plugin.ts`): excludes `module` from base polyfills, adds a shim that provides a stub `createRequire`. Needed because tsup's `createRequire` banner is in `dist/chunk-WPQ5MXLX.js`, which gets pulled into browser builds via static imports in `dist/index.js`.
- **`shimMissingExports: true`** in `vite.config.ts`: stubs out all Node-only named exports (`fs.promises`, `process.env`, `process.cwd`, etc.) that come from the native filesystem driver and other Node-only chunks. Required because those chunks are *statically imported* from `dist/index.js`.

Both are band-aids on the same root cause: **`dist/index.js` is a Node.js bundle masquerading as a universal bundle.** It includes:
- The `createRequire` banner on all its chunks
- Static imports of the native `fs` driver (`dist/node-4CCLYT3S.js`)
- Static imports of process/env utilities that have no browser equivalent

The app-level workarounds work (the smoke script passes), but they're fragile and require users to understand why they need these specific vite options.

---

## Root cause: no `browser` exports condition

The `package.json` exports today:

```json
"exports": {
  ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./vite": { "types": "./dist/vite.d.ts", "import": "./dist/vite.js" }
}
```

`dist/index.js` is the Node.js build with the `createRequire` banner. When Vite builds a browser app that imports `@devalbo-cli/cli`, it gets `dist/index.js` — the Node build — because there is no `browser` condition to pick instead.

PLAN_16 already identified the right fix: a `dist/node.js` / `dist/node.browser.js` split with a `browser` exports condition. This plan makes that concrete.

---

## What a proper browser entry needs to exclude

The browser entry (`dist/browser.js`) must not include:

| What | Why |
|------|-----|
| `createRequire` banner | Node ESM/CJS interop — meaningless in browsers |
| Native fs driver (`packages/filesystem/src/drivers/native.ts`) | Uses `fs.promises`, `path`, `child_process` |
| `startInteractiveCli` | Node-only: uses `ink`, stdin/stdout, TTY detection |
| Direct ink imports | ink has Node deps; browser uses ink-web |
| Tauri driver | Tauri-specific; unnecessary in browser bundle |

The browser entry **can and should** include:

- Command system, store, types (`AppConfig`, `CommandResult`, etc.)
- `InteractiveShell`, `AppConfigProvider`, `useAppConfig`, `bindCliRuntimeSource`
- `createDevalboStore`, `createDevalboStorePersister`
- `createFilesystemDriver` — browser-dispatch version only (no static import of native driver)
- `BrowserConnectivityService`
- `builtinCommands`, `makeOutput`, `makeError`, etc.

---

## The two changes required

### 1. Dynamic import for the native fs driver

Currently `createFilesystemDriver` statically imports the native driver, pulling `fs.promises` into the bundle graph unconditionally:

```ts
// current (static import — native driver always in bundle graph)
import { NativeFilesystemDriver } from './drivers/native';

export async function createFilesystemDriver() {
  if (typeof window !== 'undefined') return new BrowserDriver();
  return new NativeFilesystemDriver();  // dead code in browser but still bundled
}
```

Fix — dynamic import so bundlers can tree-shake/split:

```ts
export async function createFilesystemDriver() {
  if (typeof window !== 'undefined') {
    const { BrowserFilesystemDriver } = await import('./drivers/browser.js');
    return new BrowserFilesystemDriver();
  }
  const { NativeFilesystemDriver } = await import('./drivers/native.js');
  return new NativeFilesystemDriver();
}
```

OR use the `exports` browser condition on the filesystem subpath (as PLAN_16 outlined), with a dynamic `import('@devalbo-cli/filesystem/node')` in the driver factory. Either way, the native driver must not appear as a static import reachable from the browser entry.

### 2. Add a `browser` exports condition for the main entry

```json
"exports": {
  ".": {
    "browser": { "types": "./dist/browser.d.ts", "import": "./dist/browser.js" },
    "types":   "./dist/index.d.ts",
    "import":  "./dist/index.js"
  },
  "./vite": { "types": "./dist/vite.d.ts", "import": "./dist/vite.js" }
}
```

`dist/browser.js` is built from a new `src/browser.ts` entry:
- No `banner` (no `createRequire`)
- No static import of native fs driver
- No `startInteractiveCli`
- Externals: same as today plus `ink`

Add a third entry to `tsup.config.ts`:

```ts
// 2. Browser entry (new) — no banner, no Node builtins in bundle
{
  entry: { browser: 'src/browser.ts' },
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: false,
  tsconfig: 'tsconfig.npm.json',
  external: [...nodeBuiltins, 'react-devtools-core', 'vite-plugin-node-polyfills', 'ink'],
  // no banner
},
```

---

## What app developers get after this change

The `vite.config.ts` in CREATE_AN_APP simplifies to:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from '@devalbo-cli/cli/vite';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: { exclude: ['react-devtools-core'] },
});
```

No `shimMissingExports`. No `external` in `build.rollupOptions`. Vite picks `dist/browser.js` via the `browser` condition — that bundle has no Node-only imports for the polyfills plugin to trip over.

`nodePolyfills()` in `src/vite-plugin.ts` should revert to a plain re-export:

```ts
export { nodePolyfills } from 'vite-plugin-node-polyfills';
```

No more `node:module` shim or `exclude: ['module']` hack.

---

## Acceptance criterion

The smoke script must pass with this `vite.config.ts` — no `shimMissingExports`:

```ts
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: { exclude: ['react-devtools-core'] },
});
```

If `shimMissingExports` is still needed, the browser entry still contains Node-only code.

---

## What to keep from attempt 1

- CREATE_AN_APP.md step structure (Steps 6–11, shared config, etc.) — correct, keep it.
- Smoke script step structure (Steps 8–11) — correct, keep it.
- `#release` branch for git installs — correct, keep it.
- `optimizeDeps: { exclude: ['react-devtools-core'] }` — legitimate Vite hint, keep it.

What to remove once this plan is complete:
- `shimMissingExports: true` from the generated `vite.config.ts`
- `node:module` shim + `exclude: ['module']` in `src/vite-plugin.ts`
- `external: ['react-devtools-core']` from `build.rollupOptions` (only in `optimizeDeps`)

---

## Open questions

1. **What exactly goes in `src/browser.ts`?** Need to audit `src/index.ts` and identify every export that is safe in the browser. Likely everything except `startInteractiveCli`, ink primitives, and Node filesystem utilities.

2. **Does ink-web have Node deps that also need polyfilling?** ink-web wraps xterm.js which is browser-only — but check if it has any Node-only static imports that would require the polyfills plugin regardless.

3. **`createFilesystemDriver` in `src/browser.ts`** — export a browser-only version that never imports the native driver, or keep platform-detecting with dynamic imports? Simpler to make it browser-only in the browser entry (always returns browser driver, no dynamic import needed).

4. **DTS for browser entry** — `browser.d.ts` should omit `startInteractiveCli` and other Node-only APIs. Users in a browser context should get a compile error if they try to use CLI-only APIs. Worth thinking through whether the type split is worth the maintenance cost vs just using `@deprecated` or runtime throws.
