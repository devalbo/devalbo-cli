# Starting a New devalbo-cli App

This guide walks through creating a minimal app with a custom `hello` command plus
built-in filesystem commands (`ls`, `pwd`, `cat`, etc.). It runs as a terminal CLI
and in the browser.

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
    cli-node.tsx        # terminal entry point
    program.ts          # commander command definitions
    commands/
      index.ts          # command map
      hello.tsx         # custom command (note: .tsx for JSX)
    web/
      main.tsx          # browser entry point
      App.tsx           # browser app component
```

Add `"type": "module"` and scripts to `package.json`. The `dev:web` / `build:web`
names leave `dev` and `build` free for Tauri if you add desktop support later:

```json
"type": "module",
"scripts": {
  "dev:cli":   "node --import tsx src/cli-node.tsx",
  "dev:web":   "vite",
  "build:web": "vite build",
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

## 6. Command map — src/commands/index.ts

Spread the built-in commands and add your own:

```ts
import { builtinCommands } from 'devalbo-cli';
import { helloCommand } from './hello';

export const commands = {
  ...builtinCommands,
  hello: helloCommand
};
```

## 7. Program — src/program.ts

Define your CLI commands with commander, then register the devalbo built-ins:

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

  program.command('interactive').description('Start interactive session');

  registerBuiltinCommands(program);

  return program;
}
```

## 8. Terminal entry point — src/cli-node.tsx

`startInteractiveCli` handles store, filesystem driver, and render setup:

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

## Running the terminal app

Run in a real terminal (requires TTY for interactive input):

```bash
npm run dev:cli
```

This starts an interactive shell. Type commands at the prompt:

```
$ hello
$ hello Alice
$ ls
$ pwd
```

---

## 9. Browser app — src/web/App.tsx

`bindCliRuntimeSource` wires the live app context (store, driver, cwd) to the
`cli` object so it can be used from the browser dev console.

```tsx
import { useState, useEffect, useRef } from 'react';
import { InkTerminalBox } from 'ink-web';
import {
  InteractiveShell,
  createDevalboStore,
  createFilesystemDriver,
  createCliAppConfig,
  bindCliRuntimeSource,
  unbindCliRuntimeSource
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

## 10. Browser entry — src/web/main.tsx

Expose `window.cli` so it's available in the browser console:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'ink-web/css';
import { cli } from 'devalbo-cli';
import { App } from './App';

declare global {
  interface Window { cli: typeof cli; }
}

window.cli = cli;

const root = document.getElementById('root');
if (root) createRoot(root).render(<App />);
```

## 11. index.html

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

## 12. vite.config.ts

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
// Check that the runtime is ready
cli.status()
// → { ready: true, missing: [] }

// Run built-in commands
await cli.ls()
await cli.pwd()
await cli.cd('/tmp')
await cli.ls()

// Run any command by name
await cli.exec('hello', ['Alice'])
// → logs "Hello, Alice!" and returns the result

// Run a raw command string (parsed the same way as the terminal input)
await cli.execRaw('hello Bob')

// Get output as plain text instead of rendering it
const { text } = await cli.execText('hello', ['world'])
console.log(text)  // "Hello, world!"
```

Custom commands registered in your app are available the same way:

```js
await cli.exec('hello', ['from the console'])
```

---

## Desktop app (Tauri)

The desktop app wraps the same browser `App.tsx` in a native window using Tauri.
No changes to `App.tsx` are needed.

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

## Running the desktop app

```bash
npm run dev:desktop    # starts vite dev server + Tauri native window
npm run build:desktop  # produces a native app bundle in src-tauri/target/release/bundle/
```

---

## Quick reference — all run commands

| Platform | Command | Description |
|----------|---------|-------------|
| Terminal | `npm run dev:cli` | Interactive shell in a real TTY — [details](#running-the-terminal-app) |
| Browser (dev) | `npm run dev:web` | Vite dev server at http://localhost:3000 — [details](#running-the-browser-app) |
| Browser (prod) | `npm run build:web && npm run preview:web` | Production build + local preview — [details](#running-the-browser-app) |
| Browser console | `window.cli` | `cli.exec()`, `cli.ls()`, etc. in DevTools — [details](#browser-dev-console) |
| Desktop (dev) | `npm run dev:desktop` | Vite + Tauri native window — [details](#running-the-desktop-app) |
| Desktop (prod) | `npm run build:desktop` | Native app bundle — [details](#running-the-desktop-app) |
