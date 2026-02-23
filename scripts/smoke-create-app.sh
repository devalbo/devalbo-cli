#!/usr/bin/env bash
set -euo pipefail

log() {
  printf '[smoke-create-app] %s\n' "$*"
}

run_cmd() {
  log "RUN: $*"
  "$@"
}

usage() {
  cat <<'EOF'
Usage: scripts/smoke-create-app.sh [options]

Creates a fresh app directory using the CREATE_AN_APP.md CLI quickstart steps,
installs dependencies, and runs verification checks for CLI + browser.

Options:
  --dir <path>           Target directory (default: /tmp/devalbo-create-app-smoke)
  --app-dir <path>       Alias for --dir
  --devalbo-spec <spec>  npm dependency spec for devalbo-cli
                         (default: git+https://github.com/devalbo/devalbo-cli.git)
  --force                Remove target directory if it already exists
  --skip-install         Do not run npm install
  --skip-checks          Do not run verification checks
  --help                 Show this help
EOF
}

TARGET_DIR="/tmp/devalbo-create-app-smoke"
DEVALBO_SPEC="git+https://github.com/devalbo/devalbo-cli.git"
FORCE=0
SKIP_INSTALL=0
SKIP_CHECKS=0
NPM_CACHE_DIR=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir)
      TARGET_DIR="$2"
      shift 2
      ;;
    --app-dir)
      TARGET_DIR="$2"
      shift 2
      ;;
    --devalbo-spec)
      DEVALBO_SPEC="$2"
      shift 2
      ;;
    --force)
      FORCE=1
      shift
      ;;
    --skip-install)
      SKIP_INSTALL=1
      shift
      ;;
    --skip-checks)
      SKIP_CHECKS=1
      shift
      ;;
    --help)
      usage
      exit 0
      ;;
    -*)
      echo "Unknown option: $1" >&2
      usage
      exit 1
      ;;
    *)
      echo "Unexpected positional argument: $1" >&2
      echo "Use --dir <path> (or --app-dir <path>) instead." >&2
      usage
      exit 1
      ;;
  esac
done

# Always run with a fresh npm cache to emulate first-time installs.
NPM_CACHE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/devalbo-create-app-npm-cache.XXXXXX")"
export NPM_CONFIG_CACHE="$NPM_CACHE_DIR"
cleanup() {
  log "Cleaning npm cache dir: $NPM_CACHE_DIR"
  rm -rf "$NPM_CACHE_DIR"
}
trap cleanup EXIT
log "Using fresh npm cache: $NPM_CACHE_DIR"

if [[ -e "$TARGET_DIR" ]]; then
  if [[ "$FORCE" -eq 1 ]]; then
    rm -rf "$TARGET_DIR"
  else
    echo "Target directory exists: $TARGET_DIR" >&2
    echo "Use --force to replace it." >&2
    exit 1
  fi
fi

mkdir -p "$TARGET_DIR/src/commands"

log "devalbo-cli dependency spec: $DEVALBO_SPEC"

cat > "$TARGET_DIR/package.json" <<EOF
{
  "name": "my-app",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "start": "node --import tsx src/cli.ts",
    "start:browser": "vite",
    "build": "vite build",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "devalbo-cli": "$DEVALBO_SPEC",
    "commander": "^14.0.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "ink-web": "^0.1.9",
    "@xterm/xterm": "^5.5.0"
  },
  "devDependencies": {
    "@types/node": "^24.3.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "@vitejs/plugin-react": "^5.0.2",
    "tsx": "^4.20.4",
    "typescript": "^5.9.2",
    "vite": "^7.1.3"
  }
}
EOF

cat > "$TARGET_DIR/tsconfig.json" <<'EOF'
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
  "include": ["src", "vite.config.ts"]
}
EOF

cat > "$TARGET_DIR/vite.config.ts" <<'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    rollupOptions: {
      external: ['react-devtools-core']
    }
  }
});
EOF

cat > "$TARGET_DIR/index.html" <<'EOF'
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
EOF

cat > "$TARGET_DIR/src/commands/index.ts" <<'EOF'
import type { AsyncCommandHandler, CommandHandler } from 'devalbo-cli';
import { builtinCommands, makeOutput } from 'devalbo-cli';

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
EOF

cat > "$TARGET_DIR/src/program.ts" <<'EOF'
import { Command } from 'commander';
import { registerBuiltinCommands } from 'devalbo-cli';

export const createProgram = (): Command => {
  const program = new Command('my-app')
    .description('A minimal devalbo CLI app')
    .version('0.1.0');

  // App-specific commands
  program.command('hello [name]').description('Say hello');
  program.command('echo <words...>').description('Echo arguments back');

  // All built-in commands (pwd, ls, cd, help, app-config, etc.)
  registerBuiltinCommands(program);

  return program;
};
EOF

cat > "$TARGET_DIR/src/cli.ts" <<'EOF'
import { startInteractiveCli, createCliAppConfig } from 'devalbo-cli';
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
  welcomeMessage: 'Welcome to My App. Type \"help\" for available commands.',
});
EOF

cat > "$TARGET_DIR/src/config.ts" <<'EOF'
import { createCliAppConfig } from 'devalbo-cli';

export const appConfig = createCliAppConfig({
  appId: 'my-app',
  appName: 'My App',
  storageKey: 'my-app-store',
});

export const welcomeMessage = 'Welcome to My App. Type "help" for available commands.';
EOF

cat > "$TARGET_DIR/src/App.tsx" <<'EOF'
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
} from 'devalbo-cli';
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
    void createFilesystemDriver().then((nextDriver) => {
      if (!cancelled) setDriver(nextDriver);
    });
    return () => {
      cancelled = true;
    };
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
EOF

cat > "$TARGET_DIR/src/main.tsx" <<'EOF'
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'ink-web/css';
import '@xterm/xterm/css/xterm.css';
import { App } from './App';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<App />);
}
EOF

log "Created scaffold in: $TARGET_DIR"

if [[ "$SKIP_INSTALL" -eq 1 ]]; then
  log "Skipping npm install (--skip-install)."
  exit 0
fi

pushd "$TARGET_DIR" >/dev/null
log "Installing dependencies in: $TARGET_DIR"
run_cmd npm install

if [[ "$SKIP_CHECKS" -eq 1 ]]; then
  log "Install complete. Skipping checks (--skip-checks)."
  popd >/dev/null
  exit 0
fi

run_cmd npm run type-check
run_cmd npm run build
popd >/dev/null

cat <<EOF

All automated checks passed for $TARGET_DIR

Optional manual checks:
  cd $TARGET_DIR
  npm run start
  npm run start:browser
EOF
