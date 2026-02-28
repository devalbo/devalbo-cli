# Suggested Improvements for devalbo-cli

Feedback from building devalbo-editor and documenting the "create your own editor" workflow. Ordered by impact.

## 1. `createApp()` bootstrap + eliminate `bindCliRuntimeSource` (highest impact)

These two changes are related and together would eliminate the bulk of consumer boilerplate.

**The problem:** Every app repeats the same 10-step init sequence (create store, add social tables, create driver, create watcher, register defaults, bind runtime source, set up persister, start sync, render with providers). On top of that, `bindCliRuntimeSource` forces every app to duplicate a `useRef`-juggling pattern to keep the shell context fresh:

```ts
const cwdRef = useRef(cwd);
const sessionRef = useRef(session);
const driverRef = useRef(driver);
const configRef = useRef(config);
cwdRef.current = cwd;
sessionRef.current = session;
driverRef.current = driver;
configRef.current = config;

useEffect(() => {
  bindCliRuntimeSource({
    getContext: () => ({
      commands: getCommandMap(),
      createProgram,
      store,
      session: sessionRef.current,
      config: configRef.current,
      driver: driverRef.current,
      connectivity,
      cwd: cwdRef.current,
      setCwd
    })
  });
  return () => unbindCliRuntimeSource();
}, [store, connectivity, setCwd]);
```

**The fix:** A `createApp()` function that collapses all init steps, and an `InteractiveShell` that resolves its own context from React context providers (which are already in the component tree — `StoreContext`, `AppConfigProvider`, `SolidSessionProvider`) instead of requiring the global `bindCliRuntimeSource` side-effect.

```ts
import { createApp } from 'devalbo-cli';

const { store, driver, App } = await createApp({
  appId: 'svg-studio',
  storageKey: 'svg-studio-store',
  onReady: ({ registerCommand, registerMimeTypeHandler }) => {
    registerMimeTypeHandler('image/svg+xml', { viewEdit: SvgViewEdit });
    registerCommand('add-circle', addCircle);
  }
});
```

`createApp()` would set up the context providers that `InteractiveShell` reads from, so both changes land together cleanly.

## 2. `createProgram()` should derive from the command registry

Commands and the Commander.js program are maintained separately today. When a consumer calls `registerCommand('add-circle', handler)`, it doesn't show up in `help` output because the program definition doesn't know about it.

If `createProgram()` read from the command registry, new commands would get help text automatically. `registerCommand` could accept optional metadata:

```ts
registerCommand('add-circle', addCircle, {
  description: 'Add a circle to an SVG file',
  args: [{ name: 'file', description: 'SVG file path' }]
});
```

**Dependency:** This requires the command registration API to exist before the program is built. The current flow is the other way around (program is created first, then passed to the shell). Needs the registry from #1's `createApp()` to land first.

## 3. Export handler prop types

`PreviewProps` and `EditProps` (the component prop shapes for MIME handlers) aren't exported as named types from `devalbo-cli`. Every consumer reverse-engineers the interface from existing handler source or documentation examples.

These should be named exports:

```ts
import type { PreviewProps, EditProps, MimeTypeHandler } from 'devalbo-cli';
```

Straightforward win — just adding `export type` statements.

## 4. Deep import paths should be public API or not exist

Internal consumers (like naveditor) currently import from internal paths:

```ts
import { withValidation } from '@devalbo-cli/cli-shell/commands/with-validation';
import { validateEditArgs } from '@devalbo-cli/cli-shell/lib/validate-args';
```

These either need to be in the package's `exports` map or re-exported from the main entry point. Reaching into `src/` internals will break if the package ever builds to `dist/`. Not a problem for external consumers today (they go through the root import), but will bite anyone who upgrades.

## 5. `useValidParse` hook

Every `viewEdit` handler will reimplement the same pattern: track the last successful parse result, update it only when parsing succeeds, show the error when it fails. A framework-provided hook would reduce boilerplate and ensure consistent behavior:

```ts
import { useValidParse } from 'devalbo-cli';

const { validDoc, parseError } = useValidParse(source, (src) => {
  const doc = new DOMParser().parseFromString(src, 'image/svg+xml');
  const err = doc.querySelector('parsererror');
  if (err) throw new Error('Invalid SVG');
  return src;
});
```

Not urgent, but signals that the framework understands its primary use case — the editor/preview split where the preview must always show a valid document.

---

*Note: The single-package-boundary idea (consolidating cli-shell, commands, filesystem, shared, state, ui into one import) is already solved for external consumers — the root `devalbo-cli` package re-exports everything. This is only a pain point for internal consumers like naveditor that import from `@devalbo-cli/*` directly.*
