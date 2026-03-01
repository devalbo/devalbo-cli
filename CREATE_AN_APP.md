# Creating a devalbo-cli App

devalbo-cli is a shell framework that provides:

- A **command system** shared across CLI, browser shell, and browser dev console
- A **reactive store** (TinyBase) for application data
- A **filesystem abstraction** that works in Node.js, browser, and Tauri
- **Ink-based UI rendering** for command output

This guide walks through creating an app from scratch — writing commands and running the shell in the terminal and browser.

---

## Prerequisites

- Node.js 20+ and npm

---

## Step 1 — Initialize the project

```sh
mkdir my-app
cd my-app
npm init -y
mkdir -p src/commands
```

---

## Step 2 — Install dependencies

```sh
npm install github:devalbo/devalbo-cli#v0.2.0
npm install commander react
npm install --save-dev typescript tsx @types/node @types/react
```

`devalbo-cli` is installed directly from GitHub — no registry publish required.

Then edit `package.json` to add `"type": "module"` and the `scripts` block:

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev:cli":  "node --import tsx src/cli.ts",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "devalbo-cli": "github:devalbo/devalbo-cli#v0.2.0",
    "commander": "^14.0.0",
    "react": "^19.1.1"
  },
  "devDependencies": {
    "@types/node": "^24.0.0",
    "@types/react": "^19.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## Step 3 — `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "types": ["node"]
  },
  "include": ["src"]
}
```

---

## Step 4 — Write a command

Commands contain JSX, so use `.tsx`:

**`src/commands/hello.tsx`**

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

**`src/commands/index.ts`**

```ts
import type { CommandHandler } from 'devalbo-cli';
import { builtinCommands } from 'devalbo-cli';
import { helloCommand } from './hello';

export const commands: Record<string, CommandHandler> = {
  ...builtinCommands,
  hello: helloCommand,
};
```

`builtinCommands` includes: `pwd`, `cd`, `ls`, `tree`, `cat`, `touch`, `mkdir`, `cp`, `mv`, `rm`, `stat`, `clear`, `backend`, `exit`, `help`, and `app-config`.

---

## Step 5 — Define the program (for `help` text)

**`src/program.ts`**

```ts
import { Command } from 'commander';
import { registerBuiltinCommands } from 'devalbo-cli';

export const createProgram = (): Command => {
  const program = new Command('my-app')
    .description('A minimal devalbo CLI app')
    .version('0.1.0');

  program.command('hello [name]').description('Say hello');

  registerBuiltinCommands(program);

  return program;
};
```

---

## Step 6 — Wire up the CLI entry point

**`src/cli.ts`**

```ts
import { startInteractiveCli, createCliAppConfig } from 'devalbo-cli';
import { commands } from './commands/index';
import { createProgram } from './program';

await startInteractiveCli({
  commands,
  createProgram,
  config: createCliAppConfig({ appId: 'my-app', appName: 'My App', storageKey: 'my-app-store' }),
  welcomeMessage: 'Welcome to My App. Type "help" for available commands.',
});
```

---

## Step 7 — Run the CLI

```sh
npm run dev:cli
```

You'll see: `Welcome to My App. Type "help" for available commands.`

Try: `hello`, `hello Alice`, `help`, `pwd`, `ls`.

> `npm run dev:cli` requires a real TTY (interactive terminal). It will not work in CI or piped shells.

---

## Step 8 — Install browser dependencies

```sh
npm install react@19.2.4 react-dom@19.2.4 ink-web@0.1.11 @xterm/xterm@5.5.0
npm install --save-dev vite@7.3.1 @vitejs/plugin-react@5.0.0 @types/react-dom@19
```

Add browser scripts to `package.json`:

```json
"dev:web":     "vite",
"build:web":   "vite build",
"preview:web": "vite preview"
```

Also add this `overrides` block to keep a single React runtime across the dep graph:

```json
"overrides": {
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-reconciler": "0.33.0"
}
```

---

## Step 9 — Browser entry point

`createApp()` sets up the store, filesystem driver, command registry, and an `App` component with all providers. Register commands in `onReady` — the framework builds the Commander program from the registry, so `help` stays in sync automatically.

**`src/web/main.tsx`**

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'ink-web/css';
import '@xterm/xterm/css/xterm.css';
import { createApp, cli } from 'devalbo-cli';
import { helloCommand } from '../commands/hello';

declare global {
  interface Window { cli: typeof cli; }
}
window.cli = cli;

async function main() {
  const { App } = await createApp({
    appId: 'my-app',
    appName: 'My App',
    storageKey: 'my-app-store',
    version: '0.1.0',
    onReady: ({ registerCommand }) => {
      registerCommand('hello', helloCommand, {
        description: 'Say hello',
        args: [{ name: 'name', required: false }],
      });
    },
  });

  const root = document.getElementById('root');
  if (root) {
    const { InkTerminalBox } = await import('ink-web');
    createRoot(root).render(
      <div style={{ maxWidth: '960px', margin: '24px auto', padding: '0 16px' }}>
        <h1>My App</h1>
        <InkTerminalBox rows={24} focus>
          <App welcomeMessage='Welcome to My App. Type "help" for available commands.' />
        </InkTerminalBox>
      </div>
    );
  }
}

main();
```

**`index.html`** (project root)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/web/main.tsx"></script>
  </body>
</html>
```

**`vite.config.ts`** (project root)

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';

export default defineConfig({
  plugins: [react(), ...nodePolyfills()],
  resolve: {
    alias: { ink: 'ink-web' },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['devalbo-cli', 'react-devtools-core', 'is-in-ci'],
  },
});
```

`nodePolyfills()` is required for Node builtin shims in the browser. `alias: { ink: 'ink-web' }` is required for browser runtime compatibility.

---

## Step 10 — Run the browser app

```sh
npm run dev:web
```

Open `http://localhost:5173`. You'll see the same interactive shell running in the browser.

```sh
npm run build:web    # production build
npm run preview:web  # preview production build locally
```

### Browser developer console

`window.cli` is available in DevTools in both dev and production builds:

```js
await cli.exec('hello', ['Alice'])     // run any registered command
await cli.execRaw('hello Bob')         // parse a raw command string
const { text } = await cli.execText('hello', ['world'])
console.log(text)
```

---

## Adding more commands

Define a handler and register it:

**`src/commands/greet.tsx`**

```tsx
import { Text } from 'ink';
import type { AsyncCommandHandler } from 'devalbo-cli';
import { makeError } from 'devalbo-cli';

export const greet: AsyncCommandHandler = async (args) => {
  const name = args[0];
  if (!name) return makeError('Usage: greet <name>');
  return { component: <Text color="cyan">Greetings, {name}!</Text> };
};
```

Register it in `src/commands/index.ts`:

```ts
import { greet } from './greet';

export const commands: Record<string, CommandHandler> = {
  ...builtinCommands,
  hello: helloCommand,
  greet,
};
```

For the browser, add it in `onReady`:

```ts
registerCommand('greet', greet, {
  description: 'Greet someone',
  args: [{ name: 'name', required: true }],
});
```

For the terminal, add it to `src/program.ts`:

```ts
program.command('greet <name>').description('Greet someone');
```

---

## Command patterns reference

### `AsyncCommandHandler`

```ts
type AsyncCommandHandler = (
  args: string[],
  options?: ExtendedCommandOptions
) => Promise<CommandResult>;
```

`ExtendedCommandOptions` gives you:

| Field | Type | Notes |
|-------|------|-------|
| `store` | `DevalboStore` | TinyBase store |
| `cwd` | `string` | Current working directory |
| `setCwd` | `(next: string) => void` | Change the cwd |
| `config` | `AppConfig` | App configuration |
| `driver` | `IFilesystemDriver` | Available after async init |
| `clearScreen` | `() => void` | CLI only |
| `exit` | `() => void` | CLI only |

### Output helpers

```ts
import { makeOutput, makeError, makeResult, makeResultError } from 'devalbo-cli';

makeOutput('Hello world')                    // plain text
makeError('Something went wrong')            // error (red text)
makeResult('Done', { count: 3 })             // success + structured data
makeResultError('Failed', { reason: 'x' })   // error + structured data
```

### Rich output (Ink components)

```tsx
import { createElement } from 'react';
import { MyOutputComponent } from '../components/MyOutputComponent';

return {
  ...makeResult('Loaded item', data),
  component: createElement(MyOutputComponent, { item: data }),
};
```

### `StoreCommandHandler` (when store access is required)

```ts
import type { StoreCommandHandler } from 'devalbo-cli';

const myStoreCommand: StoreCommandHandler = async (args, options) => {
  // options.store is guaranteed — no null check needed
  const count = options.store.getCell('my-table', 'stats', 'count') ?? 0;
  return makeOutput(`Count: ${count}`);
};
```

### Reading from the filesystem

```ts
const myRead: AsyncCommandHandler = async (args, options) => {
  if (!options?.driver) return makeError('Filesystem not ready');
  const path = args[0];
  if (!path) return makeError('Usage: my-read <path>');
  try {
    const content = await options.driver.readTextFile(options.cwd ?? '/', path);
    return makeOutput(content);
  } catch {
    return makeError(`Cannot read: ${path}`);
  }
};
```

---

## Types and utilities

| Export | Purpose |
|--------|---------|
| `PreviewProps`, `EditProps` | Prop types for MIME preview/edit components |
| `MimeTypeHandler` | Shape for registering handlers via `registerMimeTypeHandler` |
| `useValidParse(source, parseFn)` | Tracks last valid parse result + current error |
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

The desktop app wraps the same browser entry point in a native window using Tauri. No changes to app code are needed — `createFilesystemDriver()` automatically selects the Tauri FS backend when running inside a Tauri window.

### Prerequisites

Install the [Rust toolchain](https://rustup.rs) and Tauri CLI:

```sh
npm install --save-dev @tauri-apps/cli
npm install @tauri-apps/api
```

### Initialize Tauri

Run once from your project root:

```sh
npx tauri init
```

When prompted:
- **App name**: `my-app`
- **Window title**: `My App`
- **Where are your web assets?**: `../dist`
- **URL of your dev server**: `http://127.0.0.1:1420`
- **Frontend dev command**: `npm run dev:desktop-web`
- **Frontend build command**: `npm run build:web`

### Add desktop scripts to `package.json`

```json
"dev:desktop-web": "vite --port 1420 --strictPort",
"dev:desktop":     "tauri dev",
"build:desktop":   "tauri build"
```

### Desktop `vite.config.ts`

The desktop config uses port 1420, disables `clearScreen`, and adds Tauri HMR settings:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';

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
  },
  resolve: {
    alias: { ink: 'ink-web' },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['devalbo-cli', 'react-devtools-core', 'is-in-ci'],
  },
});
```

### Running the desktop app

```sh
npm run dev:desktop    # starts vite dev server + Tauri native window
npm run build:desktop  # produces a native app bundle
```

---

## Advanced: manual browser setup

If you need full control over the store, driver, and shell lifecycle — for example to integrate with an existing React app — you can skip `createApp()` and wire `InteractiveShell` with props directly. Call `bindCliRuntimeSource` with refs so `window.cli` shares the live context:

```tsx
import { useState, useEffect, useRef } from 'react';
import { InkTerminalBox } from 'ink-web';
import {
  InteractiveShell, AppConfigProvider,
  createDevalboStore, createFilesystemDriver, createCliAppConfig,
  bindCliRuntimeSource, unbindCliRuntimeSource,
  BrowserConnectivityService, cli,
} from 'devalbo-cli';
import { commands } from './commands/index';
import { createProgram } from './program';

const appConfig = createCliAppConfig({ appId: 'my-app', appName: 'My App', storageKey: 'my-app-store' });

const AppContent = ({ store }) => {
  const [driver, setDriver] = useState(null);
  const [cwd, setCwd] = useState('/');
  const [connectivity] = useState(() => new BrowserConnectivityService());
  const driverRef = useRef(driver);
  const cwdRef = useRef(cwd);
  driverRef.current = driver;
  cwdRef.current = cwd;

  useEffect(() => {
    createFilesystemDriver().then(setDriver);
  }, []);

  useEffect(() => {
    bindCliRuntimeSource({
      getContext: () => {
        if (!driverRef.current) return null;
        return { commands, createProgram, store, config: appConfig, driver: driverRef.current, connectivity, cwd: cwdRef.current, setCwd };
      }
    });
    window.cli = cli;
    return () => { unbindCliRuntimeSource(); delete window.cli; };
  }, [store, connectivity]);

  return (
    <InkTerminalBox rows={24} focus>
      <InteractiveShell
        commands={commands} createProgram={createProgram}
        store={store} config={appConfig}
        driver={driver} cwd={cwd} setCwd={setCwd}
        welcomeMessage='Welcome to My App.'
      />
    </InkTerminalBox>
  );
};

export const App = () => {
  const [store] = useState(() => createDevalboStore());
  return (
    <AppConfigProvider config={appConfig}>
      <AppContent store={store} />
    </AppConfigProvider>
  );
};
```

---

## Package map

| Package | What it provides | Direct use? |
|---------|-----------------|-------------|
| `devalbo-cli` | Shell framework, built-in commands, entry points | Yes — primary dependency |
| `@devalbo-cli/shared` | Core types (`AppConfig`, `CommandResult`) | No — re-exported via `devalbo-cli` |
| `@devalbo-cli/state` | TinyBase store, schemas, persisters | Re-exported via `devalbo-cli` |
| `@devalbo-cli/filesystem` | Filesystem driver abstraction | Re-exported via `devalbo-cli` |
| `@devalbo-cli/ui` | Ink primitives (TextInput, Spinner, etc.) | Advanced custom UI only |

---

## Quick reference — run commands

| Platform | Command | Description |
|----------|---------|-------------|
| Terminal | `npm run dev:cli` | Interactive shell in a real TTY |
| Browser (dev) | `npm run dev:web` | Vite dev server at http://localhost:5173 |
| Browser (prod) | `npm run build:web && npm run preview:web` | Production build + local preview |
| Browser console | `window.cli` | `cli.exec()`, `cli.execRaw()`, etc. in DevTools |
| Desktop (dev) | `npm run dev:desktop` | Vite + Tauri native window |
| Desktop (prod) | `npm run build:desktop` | Native app bundle |
