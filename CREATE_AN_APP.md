# Creating a devalbo-cli App

devalbo-cli is a shell framework that provides:

- A **command system** shared across CLI, browser shell, and browser dev console
- A **reactive store** (TinyBase) for application data
- A **filesystem abstraction** that works in Node.js, browser, and Tauri
- **Ink-based UI rendering** for command output

This guide walks through creating a CLI app from scratch — picking up dependencies from GitHub, writing commands, and running the shell.

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

`npm init -y` creates a baseline `package.json`. You'll update it in the next step.

---

## Step 2 — Install dependencies

Install `@devalbo-cli/cli` directly from GitHub, plus the other required packages:

```sh
npm install git+https://github.com/devalbo/devalbo-cli.git commander react
npm install --save-dev typescript tsx @types/node @types/react
```

`@devalbo-cli/cli` is installed directly from GitHub — no registry publish required.

Then edit `package.json` to add `"type": "module"` and the `scripts` block:

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "start": "node --import tsx src/cli.ts",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@devalbo-cli/cli": "git+https://github.com/devalbo/devalbo-cli.git",
    "commander": "^14.0.0",
    "react": "^19.1.1"
  },
  "devDependencies": {
    "@types/node": "^24.3.0",
    "@types/react": "^19.1.10",
    "tsx": "^4.20.4",
    "typescript": "^5.9.2"
  }
}
```

---

## Step 3 — `tsconfig.json`

Create `tsconfig.json`:

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

## Step 4 — Write commands

**`src/commands/index.ts`**

```ts
import type { AsyncCommandHandler, CommandHandler } from '@devalbo-cli/cli';
import { builtinCommands, makeOutput } from '@devalbo-cli/cli';

const hello: AsyncCommandHandler = async (args) => {
  const name = args[0] ?? 'world';
  return makeOutput(`Hello, ${name}!`);
};

const echo: AsyncCommandHandler = async (args) => {
  return makeOutput(args.join(' '));
};

export const commands: Record<string, CommandHandler> = {
  ...builtinCommands,
  hello,
  echo,
};
```

`builtinCommands` is a single-import aggregate that includes: `pwd`, `cd`, `ls`, `tree`, `cat`, `touch`, `mkdir`, `cp`, `mv`, `rm`, `stat`, `clear`, `backend`, `exit`, `help`, and `app-config`. Spread it into your registry to get all of them.

---

## Step 5 — Define the program (for `help` text)

**`src/program.ts`**

```ts
import { Command } from 'commander';
import { registerBuiltinCommands } from '@devalbo-cli/cli';

export const createProgram = (): Command => {
  const program = new Command('my-app')
    .description('A minimal devalbo CLI app')
    .version('0.1.0');

  // App-specific commands — register these first
  program.command('hello [name]').description('Say hello');
  program.command('echo <words...>').description('Echo arguments back');

  // Built-in commands (pwd, ls, cd, help, app-config, etc.)
  registerBuiltinCommands(program);

  return program;
};
```

`createProgram` is only used by the `help` command to display usage text. Register your app commands first, then call `registerBuiltinCommands`.

---

## Step 6 — Wire up the CLI entry point

**`src/cli.ts`**

```ts
import { startInteractiveCli, createCliAppConfig } from '@devalbo-cli/cli';
import { commands } from './commands/index';
import { createProgram } from './program';

await startInteractiveCli({
  commands,
  createProgram,
  config: createCliAppConfig({
    appId: 'my-app',
    appName: 'My App',
    storageKey: 'my-app-store',
  }),
  welcomeMessage: 'Welcome to My App. Type "help" for available commands.',
});
```

`createCliAppConfig` creates an `AppConfig` appropriate for CLI-only apps (Solid features disabled). `welcomeMessage` is required — provide a string or ReactNode.

---

## Step 7 — Run it

```sh
npm run start
```

You'll see: `Welcome to My App. Type "help" for available commands.`

Try: `hello Alice`, `echo foo bar`, `help`, `pwd`, `ls`, `app-config`.

> `npm run start` requires a real TTY (interactive terminal). It will not work in CI or piped shells.

---

## Adding more commands

To add a new command, define a handler and register it in the commands map:

**`src/commands/greet.ts`**

```ts
import type { AsyncCommandHandler } from '@devalbo-cli/cli';
import { makeOutput, makeError } from '@devalbo-cli/cli';

export const greet: AsyncCommandHandler = async (args) => {
  const name = args[0];
  if (!name) return makeError('Usage: greet <name>');
  return makeOutput(`Greetings, ${name}! Welcome aboard.`);
};
```

Then add it to **`src/commands/index.ts`**:

```ts
import { greet } from './greet';

export const commands: Record<string, CommandHandler> = {
  ...builtinCommands,
  hello,
  echo,
  greet,           // ← add here
};
```

And add it to **`src/program.ts`** so it shows in `help`:

```ts
program.command('greet <name>').description('Greet someone');
```

Restart (`npm run start`) and try `greet Alice`.

### Grouping commands into modules

For apps with many commands, split them into separate files and compose:

**`src/commands/myCommands.ts`**

```ts
import type { AsyncCommandHandler } from '@devalbo-cli/cli';
import { makeOutput } from '@devalbo-cli/cli';

const greet: AsyncCommandHandler = async (args) => { /* ... */ };
const farewell: AsyncCommandHandler = async (args) => { /* ... */ };

export const myCommands = { greet, farewell };
```

**`src/commands/index.ts`**

```ts
import { builtinCommands } from '@devalbo-cli/cli';
import { myCommands } from './myCommands';

export const commands = {
  ...builtinCommands,
  ...myCommands,
};
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
import { makeOutput, makeError, makeResult, makeResultError } from '@devalbo-cli/cli';

makeOutput('Hello world')                    // plain text
makeError('Something went wrong')            // error (red text)
makeResult('Done', { count: 3 })             // success + structured data
makeResultError('Failed', { reason: 'x' })   // error + structured data
```

### Rich output (Ink components)

```ts
import { createElement } from 'react';
import { MyOutputComponent } from '../components/MyOutputComponent';

return {
  ...makeResult('Loaded item', data),
  component: createElement(MyOutputComponent, { item: data })
};
```

### `StoreCommandHandler` (when store access is required)

```ts
import type { StoreCommandHandler } from '@devalbo-cli/cli';
import { makeOutput } from '@devalbo-cli/cli';

const myStoreCommand: StoreCommandHandler = async (args, options) => {
  // options.store is guaranteed — no null check needed
  const count = options.store.getCell('my-table', 'stats', 'count') ?? 0;
  return makeOutput(`Count: ${count}`);
};
```

Use `StoreCommandHandler` when your command reads or writes TinyBase data and should not run without a store.

### Reading from the store

```ts
const myList: AsyncCommandHandler = async (_args, options) => {
  if (!options?.store) return makeError('No store');
  const rows = options.store.getTable('my-items');
  const lines = Object.entries(rows).map(([id, row]) => `${id}: ${row.name}`);
  return makeOutput(lines.join('\n') || '(empty)');
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

## Going further

### Browser app

To add a browser shell alongside the CLI, install additional dependencies:

```sh
npm install react-dom ink-web @xterm/xterm
npm install --save-dev vite @vitejs/plugin-react @types/react-dom
```

Then add `src/App.tsx`, `src/main.tsx`, `src/config.ts`, `index.html`, and `vite.config.ts`. The `InteractiveShell` component and `bindCliRuntimeSource` (for `window.cli` devtools access) are both exported from `@devalbo-cli/cli`. See the `Browser app` section below for the full component pattern.

### Desktop app (Tauri)

Same structure as the browser app. `createFilesystemDriver()` automatically selects the Tauri FS backend when running inside a Tauri window.

### Store integration

The store is a TinyBase `Store`. In a React app, create it once with a lazy initializer:

```ts
import { createDevalboStore } from '@devalbo-cli/cli';

const [store] = useState(() => createDevalboStore());
```

Apps can define custom tables alongside built-in ones:

```ts
const [store] = useState(() => {
  const s = createDevalboStore();
  s.setTablesSchema({
    'my-items': {
      name: { type: 'string' },
      count: { type: 'number', default: 0 }
    }
  });
  return s;
});
```

---

## Package map

| Package | What it provides | Direct use? |
|---------|-----------------|-------------|
| `@devalbo-cli/cli` | Shell framework, built-in commands, entry points | Yes — primary dependency |
| `@devalbo/shared` | Core types (`AppConfig`, `CommandResult`) | No — re-exported via `@devalbo-cli/cli` |
| `@devalbo/state` | TinyBase store, schemas, persisters | Re-exported via `devalbo-cli` |
| `@devalbo/filesystem` | Filesystem driver abstraction | Re-exported via `devalbo-cli` |
| `@devalbo/ui` | Ink primitives (TextInput, Spinner, etc.) | Advanced custom UI only |
| `@devalbo/solid-client` | Solid pod auth and sync | Optional, explicit opt-in |

---

## Browser app (full pattern)

**`src/config.ts`**

```ts
import { createCliAppConfig } from '@devalbo-cli/cli';

export const appConfig = createCliAppConfig({
  appId: 'my-app',
  appName: 'My App',
  storageKey: 'my-app-store',
});

export const welcomeMessage = 'Welcome to My App. Type "help" for available commands.';
```

**`src/App.tsx`**

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { InkTerminalBox } from 'ink-web';
import {
  AppConfigProvider,
  BrowserConnectivityService,
  InteractiveShell,
  bindCliRuntimeSource,
  createDevalboStore,
  createFilesystemDriver,
  unbindCliRuntimeSource,
  useAppConfig
} from '@devalbo-cli/cli';
import { commands } from './commands/index';
import { createProgram } from './program';
import { appConfig, welcomeMessage } from './config';

type StoreInstance = ReturnType<typeof createDevalboStore>;
type DriverInstance = Awaited<ReturnType<typeof createFilesystemDriver>>;

const AppContent: React.FC<{ store: StoreInstance }> = ({ store }) => {
  const [driver, setDriver] = useState<DriverInstance | null>(null);
  const [cwd, setCwd] = useState('/');
  const [connectivity] = useState(() => new BrowserConnectivityService());
  const config = useAppConfig();

  const cwdRef = useRef(cwd);
  const driverRef = useRef(driver);
  const configRef = useRef(config);
  cwdRef.current = cwd;
  driverRef.current = driver;
  configRef.current = config;

  useEffect(() => {
    let cancelled = false;
    void createFilesystemDriver().then((d) => {
      if (!cancelled) setDriver(d);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    bindCliRuntimeSource({
      getContext: () => {
        if (!driverRef.current) return null;
        return {
          commands,
          createProgram,
          store,
          config: configRef.current,
          driver: driverRef.current,
          connectivity,
          cwd: cwdRef.current,
          setCwd
        };
      }
    });
    return () => unbindCliRuntimeSource();
  }, [store, connectivity]);

  return (
    <div style={{ maxWidth: '960px', margin: '24px auto', padding: '0 16px' }}>
      <h1>My App</h1>
      <InkTerminalBox rows={24} focus>
        <InteractiveShell
          commands={commands}
          createProgram={createProgram}
          store={store}
          config={config}
          driver={driver}
          cwd={cwd}
          setCwd={setCwd}
          welcomeMessage={welcomeMessage}
        />
      </InkTerminalBox>
    </div>
  );
};

export const App: React.FC = () => {
  const [store] = useState(() => createDevalboStore());

  return (
    <AppConfigProvider config={appConfig}>
      <AppContent store={store} />
    </AppConfigProvider>
  );
};
```

**`src/main.tsx`**

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'ink-web/css';
import '@xterm/xterm/css/xterm.css';
import { App } from './App';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
```

**`index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>my-app</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**`vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-devtools-core']
    }
  }
});
```

Add browser scripts to `package.json`:

```json
"start:browser": "vite",
"build": "vite build"
```

Run with `npm run start:browser`.

### Browser developer console (`window.cli`)

Once `bindCliRuntimeSource` is wired up (it is, in the `App.tsx` above), use the browser devtools console:

```ts
await cli.exec('hello', ['Alice'])   // run any registered command
await cli.ls('/')                     // filesystem shortcut
await cli.helpText()                  // get help as string
```

| API | Throws? |
|-----|---------|
| `cli.exec(name, args)` | Yes, on error |
| `cli.execRaw(raw)` | Yes, on error |
| `cli.execText(name, args)` | Never — returns `{ text, error }` |
