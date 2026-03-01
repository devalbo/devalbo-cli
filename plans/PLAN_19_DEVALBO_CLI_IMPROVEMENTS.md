# Suggested Improvements for devalbo-cli

Feedback from building devalbo-editor and documenting the "create your own editor" workflow. Ordered by impact.

## 1. `createApp()` bootstrap + eliminate `bindCliRuntimeSource` ✅ DONE (v0.2.0)

These two changes are related and together would eliminate the bulk of consumer boilerplate.

**The problem:** Every app repeats the same 10-step init sequence (create store, add social tables, create driver, create watcher, register defaults, bind runtime source, set up persister, start sync, render with providers). On top of that, `bindCliRuntimeSource` forces every app to duplicate a `useRef`-juggling pattern to keep the shell context fresh.

**Implemented:** `createApp()` in `packages/cli-shell/src/create-app.tsx` collapses all init steps and returns `{ store, driver, App }`. `InteractiveShell` resolves its own context from `ShellRuntimeContext` (set up by `createApp()`), eliminating the `bindCliRuntimeSource` side-effect.

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

## 2. `createProgram()` derives from the command registry ✅ DONE (v0.2.0)

Commands and the Commander.js program are maintained separately today. When a consumer calls `registerCommand('add-circle', handler)`, it doesn't show up in `help` output because the program definition doesn't know about it.

**Implemented:** `createCommandRegistry()` in `packages/cli-shell/src/lib/command-registry.ts` — registry tracks commands with optional metadata, and `registry.createProgram()` builds a Commander program from the registry so all registered commands appear in `help` output automatically.

```ts
registerCommand('add-circle', addCircle, {
  description: 'Add a circle to an SVG file',
  args: [{ name: 'file', description: 'SVG file path' }]
});
```

## 3. Export handler prop types ✅ DONE (v0.2.0)

`PreviewProps`, `EditProps`, and `MimeTypeHandler` are now named exports from the root `devalbo-cli` package (both node and browser entry points).

```ts
import type { PreviewProps, EditProps, MimeTypeHandler } from 'devalbo-cli';
```

## 4. Deep import paths should be public API or not exist ✅ DONE (v0.2.0)

`withValidation`, `validateEditArgs`, `validateNavigateArgs`, `EditArgs`, and `NavigateArgs` are now re-exported from `packages/cli-shell/src/index.ts` and the root `devalbo-cli` entry points. No consumers in `devalbo-editor` use deep subpath imports.

## 5. `useValidParse` hook ✅ DONE (v0.2.0)

**Implemented:** `useValidParse` in `packages/cli-shell/src/hooks/use-valid-parse.ts`, exported from the root `devalbo-cli` package.

```ts
import { useValidParse } from 'devalbo-cli';

const { validDoc, parseError } = useValidParse(source, (src) => {
  const doc = new DOMParser().parseFromString(src, 'image/svg+xml');
  const err = doc.querySelector('parsererror');
  if (err) throw new Error('Invalid SVG');
  return src;
});
```

---

*Note: The single-package-boundary idea (consolidating cli-shell, commands, filesystem, shared, state, ui into one import) is already solved for external consumers — the root `devalbo-cli` package re-exports everything. This is only a pain point for internal consumers like naveditor that import from `@devalbo-cli/*` directly.*
