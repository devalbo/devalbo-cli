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

Walks through the CREATE_AN_APP.md quickstart exactly as a user would:
  npm init -y, npm install from GitHub, edit package.json, write source files,
  npm run type-check.

Options:
  --dir <path>           Target directory (default: /tmp/devalbo-create-app-smoke)
  --app-dir <path>       Alias for --dir
  --devalbo-spec <spec>  npm dependency spec for devalbo-cli
                         (default: git+https://github.com/devalbo/devalbo-cli.git#release)
  --force                Remove target directory if it already exists
  --help                 Show this help
EOF
}

TARGET_DIR="/tmp/devalbo-create-app-smoke"
# Use #release so npm sees single-package layout (no file: deps); run scripts/prepare-release-ref.sh and push first.
DEVALBO_SPEC="git+https://github.com/devalbo/devalbo-cli.git#release"
FORCE=0
NPM_CACHE_DIR=""
NPM_USERCONFIG=""
PACK_TMP_DIR=""
RESOLVED_DEVALBO_SPEC=""

run_npm() {
  run_cmd env -u NPM_CONFIG_GLOBALCONFIG \
    NODE_AUTH_TOKEN= NPM_TOKEN= \
    NPM_CONFIG_USERCONFIG="$NPM_USERCONFIG" \
    NPM_CONFIG_REGISTRY=https://registry.npmjs.org \
    npm "$@"
}

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
      echo "Use --dir <path> instead." >&2
      usage
      exit 1
      ;;
  esac
done

# Always run with a fresh npm cache to emulate first-time installs.
NPM_CACHE_DIR="$(mktemp -d "${TMPDIR:-/tmp}/devalbo-create-app-npm-cache.XXXXXX")"
export NPM_CONFIG_CACHE="$NPM_CACHE_DIR"
NPM_USERCONFIG="$NPM_CACHE_DIR/.npmrc"
touch "$NPM_USERCONFIG"
cleanup() {
  log "Cleaning npm cache dir: $NPM_CACHE_DIR"
  rm -rf "$NPM_CACHE_DIR"
  if [[ -n "$PACK_TMP_DIR" ]]; then
    log "Cleaning pack temp dir: $PACK_TMP_DIR"
    rm -rf "$PACK_TMP_DIR"
  fi
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

# ── Step 1: Initialize project ───────────────────────────────────────────────
# Mirrors: mkdir my-app && cd my-app && npm init -y && mkdir -p src/commands

log "Step 1: Initialize project in $TARGET_DIR"
mkdir -p "$TARGET_DIR"
pushd "$TARGET_DIR" >/dev/null

run_npm init -y
mkdir -p src/commands

# ── Step 2: Install dependencies ─────────────────────────────────────────────
# Mirrors:
#   npm install git+https://... commander react
#   npm install --save-dev typescript tsx @types/node @types/react
# Then edit package.json to add "type": "module" and scripts.

log "Step 2: Install dependencies"
log "devalbo-cli dependency spec: $DEVALBO_SPEC"
RESOLVED_DEVALBO_SPEC="$DEVALBO_SPEC"
if [[ "$DEVALBO_SPEC" == file:* ]]; then
  LOCAL_REPO_PATH="${DEVALBO_SPEC#file:}"
  if [[ ! -d "$LOCAL_REPO_PATH" ]]; then
    echo "Local file: path does not exist: $LOCAL_REPO_PATH" >&2
    exit 1
  fi
  PACK_TMP_DIR="$(mktemp -d "${TMPDIR:-/tmp}/devalbo-create-app-pack.XXXXXX")"
  log "Packing local devalbo-cli from: $LOCAL_REPO_PATH"
  PKG_TGZ="$(cd "$LOCAL_REPO_PATH" && npm pack --ignore-scripts --silent | tail -n 1)"
  cp "$LOCAL_REPO_PATH/$PKG_TGZ" "$PACK_TMP_DIR/"
  RESOLVED_DEVALBO_SPEC="$PACK_TMP_DIR/$PKG_TGZ"
  log "Using packed artifact: $RESOLVED_DEVALBO_SPEC"
fi
run_npm install "$RESOLVED_DEVALBO_SPEC" commander react
run_npm install --save-dev typescript tsx @types/node @types/react

log "Updating package.json (type: module, scripts)"
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.type = 'module';
  pkg.scripts = {
    start: 'node --import tsx src/cli.ts',
    'type-check': 'tsc --noEmit'
  };
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# ── Step 3: tsconfig.json ────────────────────────────────────────────────────

log "Step 3: Create tsconfig.json"
cat > tsconfig.json <<'EOF'
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
EOF

# ── Step 4: src/commands/index.ts ────────────────────────────────────────────

log "Step 4: Create src/commands/index.ts"
cat > src/commands/index.ts <<'EOF'
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

# ── Step 5: src/program.ts ───────────────────────────────────────────────────

log "Step 5: Create src/program.ts"
cat > src/program.ts <<'EOF'
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

# ── Step 6: src/config.ts ─────────────────────────────────────────────────────

log "Step 6: Create src/config.ts"
cat > src/config.ts <<'EOF'
import { createCliAppConfig } from 'devalbo-cli';

export const appConfig = createCliAppConfig({
  appId: 'my-app',
  appName: 'My App',
  storageKey: 'my-app-store',
});

export const welcomeMessage = 'Welcome to My App. Type "help" for available commands.';
EOF

# ── Step 7: src/cli.ts ───────────────────────────────────────────────────────

log "Step 7: Create src/cli.ts"
cat > src/cli.ts <<'EOF'
import { startInteractiveCli } from 'devalbo-cli';
import { commands } from './commands/index';
import { createProgram } from './program';
import { appConfig, welcomeMessage } from './config';

await startInteractiveCli({
  commands,
  createProgram,
  config: appConfig,
  welcomeMessage,
});
EOF

log "Created scaffold in: $TARGET_DIR"

# ── Step 8: Verify CLI ───────────────────────────────────────────────────────
# Mirrors: npm run type-check
# (npm run start requires a TTY so it stays a manual step)

log "Step 8: Verify CLI (type-check)"
run_npm run type-check

# ── Step 9: Install browser dependencies ─────────────────────────────────────

log "Step 9: Install browser dependencies"
run_npm install react-dom ink-web @xterm/xterm
run_npm install --save-dev vite @vitejs/plugin-react @types/react-dom

log "Updating package.json (browser scripts)"
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.scripts['start:browser'] = 'vite';
  pkg.scripts['build:browser'] = 'vite build';
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

# ── Step 10: Create browser files ────────────────────────────────────────────

log "Step 10: Create browser files"

cat > src/App.tsx <<'EOF'
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
EOF

cat > src/main.tsx <<'EOF'
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

cat > index.html <<'EOF'
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

cat > vite.config.ts <<'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: { exclude: ['react-devtools-core'] },
});
EOF

# ── Step 11: Verify browser build ────────────────────────────────────────────
# vite build is headless — no browser needed. Verifies the full pipeline.

log "Step 11: Verify browser build"
run_npm run build:browser

popd >/dev/null

cat <<EOF

All automated checks passed for $TARGET_DIR

Manual checks (require a TTY / browser):
  cd $TARGET_DIR
  npm run start            # CLI (needs interactive terminal)
  npm run start:browser    # Browser (open http://localhost:5173)
EOF
