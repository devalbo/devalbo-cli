# Starting a New devalbo-cli App

This guide walks through creating a minimal app with a custom `hello` command plus
built-in filesystem commands (`ls`, `pwd`, `cat`, etc.). It runs in the browser
and as a terminal CLI.

## 1. Create your project

```bash
mkdir myapp && cd myapp
npm init -y
```

## 2. Install devalbo-cli

```bash
npm install devalbo-cli
```

> Or from GitHub before the package is published:
> `npm install github:devalbo/devalbo-cli`

npm 7+ automatically installs peer dependencies, so `ink`, `ink-web`, `react`,
`react-dom`, and `commander` are pulled in automatically.

Install dev tooling:

```bash
npm install --save-dev typescript tsx vite @vitejs/plugin-react @types/node @types/react @types/react-dom
```

## 3. Project structure

```
myapp/
  package.json
  tsconfig.json
  index.html
  vite.config.ts
  src/
    commands/
      hello.tsx         # custom command (.tsx for JSX)
    web/
      main.tsx          # browser entry point
    cli-node.tsx        # terminal entry point (optional)
    program.ts          # commander definitions (only needed for terminal)
```

Add `"type": "module"` and scripts to `package.json`. The `dev:web` / `build:web`
names leave `dev` and `build` free for Tauri if you add desktop support later:

```json
"type": "module",
"scripts": {
  "dev:cli":     "node --import tsx src/cli-node.tsx",
  "dev:web":     "vite",
  "build:web":   "vite build",
  "preview:web": "vite preview"
}
```

## 4. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## 5. Custom command — src/commands/hello.tsx

A command handler receives the parsed CLI args and returns an Ink component to render.
Use `.tsx` extension since the file contains JSX:

```tsx
import { Text } from 'ink';
import type { CommandHandler } from 'devalbo-cli';

export const helloCommand: CommandHandler = async (args) => {
  const name = args[0] ?? 'world';
  return {
    component: <Text color="green">Hello, {name}!</Text>
  };
};
```

## 6. Browser app — src/web/main.tsx

`createApp()` sets up the store, filesystem driver, command registry, and an
`App` component that wraps `InteractiveShell` with all providers. You register
commands in `onReady` with optional metadata — the framework builds the Commander
program from the registry so `help` stays in sync automatically. No separate
command map, program file, or `bindCliRuntimeSource` call is needed.

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'ink-web/css';
import { createApp, makeOutput, cli } from 'devalbo-cli';
import { helloCommand } from '@/commands/hello';

declare global {
  interface Window { cli: typeof cli; }
}
window.cli = cli;

async function main() {
  const { App } = await createApp({
    appId: 'myapp',
    appName: 'myapp',
    storageKey: 'myapp-store',
    version: '0.1.0',
    onReady: ({ registerCommand }) => {
      registerCommand('hello', helloCommand, {
        description: 'Say hello',
        args: [{ name: 'name', required: false }]
      });
      registerCommand('echo', async (args) => makeOutput(args.join(' ')), {
        description: 'Echo arguments',
        args: [{ name: 'words', required: true }]
      });
    }
  });

  const root = document.getElementById('root');
  if (root) {
    const { InkTerminalBox } = await import('ink-web');
    createRoot(root).render(
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 16px' }}>
        <h1 style={{ fontSize: '18px', marginBottom: '12px' }}>myapp</h1>
        <div style={{ border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden', background: '#020617' }}>
          <InkTerminalBox rows={24} focus>
            <App welcomeMessage="Try: hello, hello Alice, ls, pwd" />
          </InkTerminalBox>
        </div>
      </div>
    );
  }
}

main();
```

That's the entire browser app. `<App>` renders `InteractiveShell` inside
`StoreContext`, `AppConfigProvider`, and `ShellRuntimeProvider`. The shell reads
commands, store, driver, and cwd from context. `window.cli` is bound to the same
runtime automatically.

## 7. index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>myapp</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/web/main.tsx"></script>
  </body>
</html>
```

## 8. vite.config.ts

`devalbo-cli/vite` exports the `nodePolyfills` plugin with all necessary browser
shims pre-configured:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';
import { resolve } from 'node:path';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  optimizeDeps: {
    exclude: ['@sqlite.org/sqlite-wasm']
  },
  plugins: [react(), ...nodePolyfills()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: 'ink', replacement: 'ink-web' }
    ]
  }
});
```

## Running the browser app

```bash
npm run dev:web      # dev server at http://localhost:3000
npm run build:web    # production build
npm run preview:web  # preview the production build locally
```

### Browser dev console

`window.cli` is available in the browser DevTools console in both dev and
production builds. It shares the same live store, driver, and cwd as the terminal UI.

```js
cli.status()                            // { ready: true, missing: [] }
await cli.ls()                          // list directory
await cli.pwd()                         // print working directory
await cli.exec('hello', ['Alice'])      // run any command by name
await cli.execRaw('hello Bob')          // parse a raw command string
const { text } = await cli.execText('hello', ['world'])
console.log(text)                       // "Hello, world!"
```

---

## 9. Terminal CLI — src/cli-node.tsx

The terminal entry uses `startInteractiveCli`, which handles its own store,
driver, and render loop. It needs a command map and a `createProgram` function
because it does not use React context.

### Command map — src/commands/index.ts

```ts
import { builtinCommands } from 'devalbo-cli';
import { helloCommand } from './hello';

export const commands = {
  ...builtinCommands,
  hello: helloCommand
};
```

### Program — src/program.ts

```ts
import { Command } from 'commander';
import { registerBuiltinCommands } from 'devalbo-cli';

export function createProgram() {
  const program = new Command()
    .name('myapp')
    .description('My devalbo-cli app')
    .version('0.1.0');

  program
    .command('hello')
    .description('Say hello')
    .argument('[name]', 'Name to greet', 'world');

  registerBuiltinCommands(program);

  return program;
}
```

### Entry point — src/cli-node.tsx

```tsx
import { startInteractiveCli, createCliAppConfig } from 'devalbo-cli';
import { commands } from './commands';
import { createProgram } from './program';

startInteractiveCli({
  commands,
  createProgram,
  config: createCliAppConfig({ appId: 'myapp', appName: 'myapp', storageKey: 'myapp-store' }),
  welcomeMessage: 'Try: hello, hello Alice, ls, pwd'
}).catch(err => {
  console.error(err);
  process.exit(1);
});
```

### Running the terminal app

Run in a real terminal (requires TTY for interactive input):

```bash
npm run dev:cli
```

> **Sharing commands between browser and terminal:** The browser `createApp()` and
> the terminal `startInteractiveCli` register commands differently — `onReady` vs
> a flat record. But the handler functions themselves are the same. Write each
> handler once (like `helloCommand` in `src/commands/hello.tsx`) and import it in
> both places: the browser `onReady` callback and the terminal command map.

---

## Types and utilities

Useful exports for building custom commands and MIME type handlers:

| Export | Purpose |
|--------|---------|
| `PreviewProps`, `EditProps` | Prop types for MIME preview/edit components |
| `MimeTypeHandler` | Shape for registering handlers via `registerMimeTypeHandler` |
| `useValidParse(source, parseFn)` | Tracks last valid parse result + current error for viewEdit handlers |
| `withValidation` | Wraps a command handler with Effect-based arg validation |
| `validateEditArgs`, `validateNavigateArgs` | Built-in validators for file/path args |
| `CommandHandler`, `AsyncCommandHandler` | Handler function types |
| `makeOutput(text)`, `makeError(msg)` | Helpers to build `CommandResult` objects |

```ts
import type { PreviewProps, EditProps, MimeTypeHandler } from 'devalbo-cli';
import { useValidParse, withValidation, makeOutput } from 'devalbo-cli';
```

---

## Desktop app (Tauri)

The desktop app wraps the same browser `main.tsx` in a native window using Tauri.
No changes to the app code are needed.

### Prerequisites

Install the [Rust toolchain](https://rustup.rs) and Tauri CLI:

```bash
npm install --save-dev @tauri-apps/cli
npm install @tauri-apps/api
```

### Initialize Tauri

Run this once from your project root to generate the `src-tauri/` scaffold:

```bash
npx tauri init
```

When prompted:
- **App name**: `myapp`
- **Window title**: `myapp`
- **Where are your web assets?**: `../dist`
- **URL of your dev server**: `http://127.0.0.1:1420`
- **Frontend dev command**: `npm run dev:web`
- **Frontend build command**: `npm run build:web`

### Add desktop scripts to package.json

```json
"scripts": {
  "dev:cli":       "node --import tsx src/cli-node.tsx",
  "dev:web":       "vite --port 1420 --strictPort",
  "build:web":     "vite build",
  "dev:desktop":   "tauri dev",
  "build:desktop": "tauri build",
  "preview:web":   "vite preview"
}
```

### Desktop vite.config.ts

The desktop vite config differs from the browser one: it uses port 1420, disables
`clearScreen`, and adds Tauri-specific HMR settings:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';
import { resolve } from 'node:path';

const tauriDevHost = process.env.TAURI_DEV_HOST;

export default defineConfig({
  plugins: [react(), ...nodePolyfills()],
  clearScreen: false,
  server: {
    host: tauriDevHost || '127.0.0.1',
    port: 1420,
    strictPort: true,
    hmr: tauriDevHost
      ? { protocol: 'ws', host: tauriDevHost, port: 1421 }
      : undefined,
    watch: { ignored: ['**/src-tauri/**'] },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  optimizeDeps: {
    exclude: ['@sqlite.org/sqlite-wasm']
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: 'ink', replacement: 'ink-web' }
    ]
  }
});
```

### Running the desktop app

```bash
npm run dev:desktop    # starts vite dev server + Tauri native window
npm run build:desktop  # produces a native app bundle in src-tauri/target/release/bundle/
```

---

## Advanced: manual browser setup

If you need full control over the store, driver, and shell lifecycle — for
example to integrate with an existing React app or manage cwd from an external
source — you can skip `createApp()` and wire `InteractiveShell` with props
directly. You must call `bindCliRuntimeSource` so `window.cli` shares the same
context (using refs to avoid stale closures):

```tsx
import { useState, useEffect, useRef } from 'react';
import { InkTerminalBox } from 'ink-web';
import {
  InteractiveShell,
  createDevalboStore,
  createFilesystemDriver,
  createCliAppConfig,
  bindCliRuntimeSource,
  unbindCliRuntimeSource,
  cli
} from 'devalbo-cli';
import type { IFilesystemDriver } from 'devalbo-cli';
import { commands } from '@/commands';
import { createProgram } from '@/program';

const config = createCliAppConfig({ appId: 'myapp', appName: 'myapp', storageKey: 'myapp-store' });

export const App = () => {
  const [store] = useState(() => createDevalboStore());
  const [driver, setDriver] = useState<IFilesystemDriver | null>(null);
  const [cwd, setCwd] = useState('/');
  const cwdRef = useRef(cwd);
  const driverRef = useRef(driver);
  cwdRef.current = cwd;
  driverRef.current = driver;

  useEffect(() => {
    createFilesystemDriver().then(setDriver);
  }, []);

  useEffect(() => {
    bindCliRuntimeSource({
      getContext: () => {
        if (!driverRef.current) return null;
        return { commands, createProgram, store, config, driver: driverRef.current, cwd: cwdRef.current, setCwd };
      }
    });
    return () => unbindCliRuntimeSource();
  }, [store]);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '18px', marginBottom: '12px' }}>myapp</h1>
      <div style={{ border: '1px solid #334155', borderRadius: '8px', overflow: 'hidden', background: '#020617' }}>
        <InkTerminalBox rows={24} focus>
          <InteractiveShell
            commands={commands}
            createProgram={createProgram}
            store={store}
            config={config}
            driver={driver}
            cwd={cwd}
            setCwd={setCwd}
            welcomeMessage="Try: hello, hello Alice, ls, pwd"
          />
        </InkTerminalBox>
      </div>
    </div>
  );
};
```

This approach requires the command map (`src/commands/index.ts`) and program file
(`src/program.ts`) from the terminal CLI section, plus the `main.tsx` entry that
sets `window.cli = cli` and renders `<App />`.

---

## Quick reference — all run commands

| Platform | Command | Description |
|----------|---------|-------------|
| Browser (dev) | `npm run dev:web` | Vite dev server at http://localhost:3000 |
| Browser (prod) | `npm run build:web && npm run preview:web` | Production build + local preview |
| Browser console | `window.cli` | `cli.exec()`, `cli.ls()`, etc. in DevTools |
| Terminal | `npm run dev:cli` | Interactive shell in a real TTY |
| Desktop (dev) | `npm run dev:desktop` | Vite + Tauri native window |
| Desktop (prod) | `npm run build:desktop` | Native app bundle |
