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
  --devalbo-spec <spec>  npm dependency spec for @devalbo-cli/cli
                         (default: git+https://github.com/devalbo/devalbo-cli.git)
  --force                Remove target directory if it already exists
  --help                 Show this help
EOF
}

TARGET_DIR="/tmp/devalbo-create-app-smoke"
DEVALBO_SPEC="git+https://github.com/devalbo/devalbo-cli.git"
FORCE=0
NPM_CACHE_DIR=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dir)
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

# ── Step 1: Initialize project ───────────────────────────────────────────────
# Mirrors: mkdir my-app && cd my-app && npm init -y && mkdir -p src/commands

log "Step 1: Initialize project in $TARGET_DIR"
mkdir -p "$TARGET_DIR"
pushd "$TARGET_DIR" >/dev/null

run_cmd npm init -y
mkdir -p src/commands

# ── Step 2: Install dependencies ─────────────────────────────────────────────
# Mirrors:
#   npm install git+https://... commander react
#   npm install --save-dev typescript tsx @types/node @types/react
# Then edit package.json to add "type": "module" and scripts.

log "Step 2: Install dependencies"
log "@devalbo-cli/cli dependency spec: $DEVALBO_SPEC"
run_cmd npm install "$DEVALBO_SPEC" commander react
run_cmd npm install --save-dev typescript tsx @types/node @types/react

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
EOF

# ── Step 5: src/program.ts ───────────────────────────────────────────────────

log "Step 5: Create src/program.ts"
cat > src/program.ts <<'EOF'
import { Command } from 'commander';
import { registerBuiltinCommands } from '@devalbo-cli/cli';

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

# ── Step 6: src/cli.ts ───────────────────────────────────────────────────────

log "Step 6: Create src/cli.ts"
cat > src/cli.ts <<'EOF'
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
EOF

log "Created scaffold in: $TARGET_DIR"

# ── Step 7: Verify ───────────────────────────────────────────────────────────
# Mirrors: npm run type-check
# (npm run start requires a TTY so it stays a manual step)

log "Step 7: Verify"
run_cmd npm run type-check
popd >/dev/null

cat <<EOF

All automated checks passed for $TARGET_DIR

Manual check (requires a TTY):
  cd $TARGET_DIR
  npm run start
EOF
