# PLAN 17a: Repackaging via external test project

**Parent:** PLAN_17_REPACKAGING.md
**Supersedes:** PLAN_16_a_PACKAGING.md (attempt 1 workarounds)
**Executable by:** Coding agent (no GitHub access required for Phases 0-4)

---

## Problem statement

Attempts to get the browser/node split working inside the monorepo have produced a cascade of fix-on-fix commits. The root cause: we're changing the library and testing it in the same repo simultaneously, so packaging bugs are invisible until the smoke script (which runs late and slowly) catches them.

`dist/browser.js` is now structurally clean (no `createRequire`, no `node:` imports, no `fs`), but the app-level vite config still needs `shimMissingExports: true` — meaning something is still leaking through transitive imports at build time. Diagnosing this inside the monorepo is hard because pnpm's symlink-based resolution masks problems that real npm consumers hit.

## Strategy: external test project as the source of truth

Create a **separate local directory** (`devalbo-cli-test-app`) that is a real consuming project — exactly what a user following CREATE_AN_APP.md would create. It installs `devalbo-cli` from a tarball (via `npm pack`), builds both CLI and browser targets, and fails fast on any packaging issue.

This inverts the feedback loop: instead of making library changes and hoping the smoke script catches problems 5 minutes later, every packaging change starts from "does the consumer project build?" and works backward.

## Concrete paths

- **Library repo:** `/Users/ajb/Projects/devalbo-cli`
- **Test project:** `/Users/ajb/Projects/devalbo-cli-test-app`
- **Tarball:** `/Users/ajb/Projects/devalbo-cli/devalbo-cli-0.1.0.tgz` (produced by `npm pack`)

---

## What exists today (current state on `main`)

### Working
- `dist/browser.js` is clean: no `createRequire`, no `node:` imports, no `fs` references
- `dist/index.js` is the Node entry with `createRequire` banner
- `package.json` has `browser` condition in exports (`.` → `./dist/browser.js`)
- `./node` subpath export with browser/node conditions
- `src/index.browser.ts` exists with browser-safe API surface
- `src/system-commands.browser.ts` provides browser-safe builtins
- `tsup.config.ts` has 3-entry build (node, browser, vite)
- `tests/packaging/artifact-scan.test.sh` exists (checks browser.js for forbidden markers)
- Package renamed from `@devalbo-cli/cli` to `devalbo-cli`
- `peerDependencies` for `ink`, `ink-web`, `react`, `react-dom`

### Still broken
- App vite config still needs `shimMissingExports: true` (something leaks through transitive deps)
- `vite-plugin.ts` still has the `node:module` shim wrapper (should be plain re-export)
- Smoke script hasn't been validated end-to-end with the current `main`
- No CI gates running

### Structural work worth keeping
- `src/index.browser.ts` — correct API surface selection
- `src/system-commands.browser.ts` — browser-safe help/clear/exit/backend
- `tsup.config.ts` 3-entry structure
- `artifact-scan.test.sh` approach
- `package.json` exports map shape

---

## Phase 0: Create external test project

**Agent instructions:** Execute steps 0.1–0.6 sequentially. Each step has exact commands and file contents. Do not skip ahead. After 0.6, report the baseline results before proceeding.

### 0.1 Build library and pack tarball

```sh
cd /Users/ajb/Projects/devalbo-cli
npm run build:dist
npm pack
# Produces: /Users/ajb/Projects/devalbo-cli/devalbo-cli-0.1.0.tgz
```

**Check:** File `devalbo-cli-0.1.0.tgz` exists in the library repo root.

### 0.2 Create the test project directory

```sh
mkdir -p /Users/ajb/Projects/devalbo-cli-test-app
cd /Users/ajb/Projects/devalbo-cli-test-app
git init
npm init -y
mkdir -p src/commands scripts
```

**Not** a workspace member. **Not** a subdirectory of the library repo.

### 0.3 Install dependencies from tarball (pinned versions)

**Always install from `npm pack` tarball.** Never use `file:` for validation — it creates symlinks and masks real resolution issues. `file:` is only acceptable as a secondary debug tool when tracing a specific problem.

```sh
cd /Users/ajb/Projects/devalbo-cli-test-app

# Library from tarball
npm install /Users/ajb/Projects/devalbo-cli/devalbo-cli-0.1.0.tgz

# Runtime deps — pinned to reduce noise
npm install commander@13 react@19.1.0 react-dom@19.1.0 ink-web@0.1.11 @xterm/xterm@5.5.0

# Dev deps — pinned
npm install --save-dev typescript@5.8 tsx@4 @types/node@22 @types/react@19 @types/react-dom@19
npm install --save-dev vite@6.3 @vitejs/plugin-react@4.5
```

**Why pinned versions:** Floating ranges introduce noise — a React patch or Vite minor can cause unrelated failures that obscure packaging bugs. Pin to known-good versions; bump intentionally.

**Check:** `node_modules/devalbo-cli/dist/browser.js` exists. `node_modules/devalbo-cli/dist/vite.js` exists.

### 0.4 Write all source files

Write the following files with exact contents. All paths relative to `/Users/ajb/Projects/devalbo-cli-test-app/`.

**`tsconfig.json`:**
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

**`package.json` edits** — add to the generated package.json:
```json
{
  "type": "module",
  "scripts": {
    "start": "node --import tsx src/cli.ts",
    "type-check": "tsc --noEmit",
    "start:browser": "vite",
    "build:browser": "vite build"
  }
}
```

**`src/commands/index.ts`:**
```ts
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
```

**`src/program.ts`:**
```ts
import { Command } from 'commander';
import { registerBuiltinCommands } from 'devalbo-cli';

export const createProgram = (): Command => {
  const program = new Command('my-app')
    .description('A minimal devalbo CLI app')
    .version('0.1.0');

  program.command('hello [name]').description('Say hello');
  program.command('echo <words...>').description('Echo arguments back');

  registerBuiltinCommands(program);

  return program;
};
```

**`src/config.ts`:**
```ts
import { createCliAppConfig } from 'devalbo-cli';

export const appConfig = createCliAppConfig({
  appId: 'my-app',
  appName: 'My App',
  storageKey: 'my-app-store',
});

export const welcomeMessage = 'Welcome to My App. Type "help" for available commands.';
```

**`src/cli.ts`:**
```ts
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
```

**`src/App.tsx`:**
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
```

**`src/main.tsx`:**
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

**`index.html`:**
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

### 0.5 Write two vite configs and test scripts

**`vite.config.target.ts`** — the goal (no workarounds):
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: { exclude: ['react-devtools-core'] },
});
```

**`vite.config.workaround.ts`** — the current reality:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'devalbo-cli/vite';

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: { ink: 'ink-web' },
    dedupe: ['react', 'react-dom']
  },
  optimizeDeps: { exclude: ['devalbo-cli', 'react-devtools-core'] },
  build: {
    rollupOptions: {
      shimMissingExports: true,
      external: ['react-devtools-core']
    }
  }
});
```

**Start with workaround as default:**
```sh
cp vite.config.workaround.ts vite.config.ts
```

**`scripts/test-cli.sh`:**
```sh
#!/usr/bin/env bash
set -euo pipefail

echo "=== CLI type-check ==="
npx tsc --noEmit
echo "CLI type-check passed"

echo "=== CLI runtime smoke ==="
# Verify the CLI module loads and commander --help works.
# Run in a subshell with a background watchdog instead of `timeout`
# (macOS doesn't ship GNU timeout; gtimeout requires coreutils).
node --import tsx src/cli.ts --help &
CLI_PID=$!
( sleep 10 && kill $CLI_PID 2>/dev/null && echo "CLI hung (killed after 10s)" >&2 && exit 1 ) &
WATCHDOG_PID=$!
wait $CLI_PID 2>/dev/null
CLI_EXIT=$?
kill $WATCHDOG_PID 2>/dev/null || true
wait $WATCHDOG_PID 2>/dev/null || true
if [[ $CLI_EXIT -ne 0 ]]; then
  echo "FAIL: CLI exited with code $CLI_EXIT"
  exit 1
fi
echo "CLI runtime smoke passed"
```

**`scripts/test-browser.sh`:**
```sh
#!/usr/bin/env bash
set -euo pipefail

echo "=== Browser build ==="
npx vite build
echo "Browser build passed"

echo "=== Browser bundle checks ==="
# Verify no duplicate React runtime in browser output
REACT_DUPES=$(grep -c 'react/cjs/react.production' dist/assets/*.js 2>/dev/null || echo "0")
if [[ "$REACT_DUPES" -gt 1 ]]; then
  echo "FAIL: Multiple React runtimes found in browser bundle ($REACT_DUPES)"
  exit 1
fi
echo "Browser bundle checks passed"
```

**`scripts/test-react-dedup.sh`:**
```sh
#!/usr/bin/env bash
set -euo pipefail
echo "=== React dedup check (dist) ==="

DIST_DIR="node_modules/devalbo-cli/dist"

# 1. browser.js MUST have an external React import (not inlined)
if ! grep -qE 'from\s+"react"' "$DIST_DIR/browser.js" 2>/dev/null; then
  echo "WARN: browser.js has no 'from \"react\"' import — React may be inlined or missing"
fi

# 2. Neither entry should contain inlined React CJS runtime signatures.
#    These markers survive minification and indicate React was bundled rather than externalized.
for entry in browser.js index.js; do
  for marker in "react.production" "react.development" "react-dom.production" "react-dom.development"; do
    if grep -q "$marker" "$DIST_DIR/$entry" 2>/dev/null; then
      echo "FAIL: $entry contains '$marker' — React runtime is inlined instead of externalized"
      exit 1
    fi
  done
done

echo "React dedup check passed"
```

**`scripts/test-all.sh`** (Phase 0 baseline — build + static checks only):
```sh
#!/usr/bin/env bash
set -euo pipefail
bash scripts/test-cli.sh
bash scripts/test-browser.sh
bash scripts/test-react-dedup.sh
echo "=== All tests passed ==="
```

**`scripts/test-browser-runtime.sh`** (Phase 3+ only — requires built output + curl):

Not included in `test-all.sh` for Phase 0. Add it to `test-all.sh` after Phase 2 target config passes. This script verifies the built page actually loads and has no console errors.

```sh
#!/usr/bin/env bash
set -euo pipefail
echo "=== Browser runtime smoke ==="

# Requires: vite build output in dist/
if [[ ! -d dist ]]; then
  echo "FAIL: dist/ not found — run 'npx vite build' first"
  exit 1
fi

# Start vite preview in background
npx vite preview --port 4174 &
PREVIEW_PID=$!
cleanup() { kill $PREVIEW_PID 2>/dev/null || true; }
trap cleanup EXIT

# Wait for server
for i in {1..20}; do
  curl -s http://localhost:4174 > /dev/null 2>&1 && break
  sleep 0.5
done

# Fetch page
PAGE_HTML=$(curl -s http://localhost:4174)
if [[ -z "$PAGE_HTML" ]]; then
  echo "FAIL: vite preview returned empty response"
  exit 1
fi

# Check root element exists
if ! echo "$PAGE_HTML" | grep -q 'id="root"'; then
  echo "FAIL: page missing root element"
  exit 1
fi

# Check that built JS assets are referenced
if ! echo "$PAGE_HTML" | grep -q '/assets/'; then
  echo "FAIL: page missing asset references — vite build may have failed silently"
  exit 1
fi

# Optional: headless console error check (playwright)
if command -v npx > /dev/null && npx playwright --version > /dev/null 2>&1; then
  echo "Playwright available — checking for console errors"
  node -e "
    const { chromium } = require('playwright');
    (async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();
      const errors = [];
      page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
      page.on('pageerror', err => errors.push(err.message));
      await page.goto('http://localhost:4174');
      await page.waitForTimeout(3000);
      await browser.close();
      if (errors.length > 0) {
        console.error('Browser console errors:', errors);
        process.exit(1);
      }
      console.log('No browser console errors');
    })();
  "
else
  echo "Playwright not available — skipping headless console error check"
fi

echo "Browser runtime smoke passed"
```

**After Phase 2 passes**, update `test-all.sh` to include it:
```sh
bash scripts/test-browser-runtime.sh
```

```sh
chmod +x scripts/*.sh
```

### 0.6 Establish baseline

Run both configs and record results.

```sh
cd /Users/ajb/Projects/devalbo-cli-test-app

# Test 1: workaround config (should pass)
cp vite.config.workaround.ts vite.config.ts
bash scripts/test-all.sh 2>&1 | tee /tmp/baseline-workaround.txt
echo "EXIT CODE: $?" >> /tmp/baseline-workaround.txt

# Test 2: target config (expected to fail — captures the exact error)
cp vite.config.target.ts vite.config.ts
bash scripts/test-all.sh 2>&1 | tee /tmp/baseline-target.txt || true
echo "EXIT CODE: $?" >> /tmp/baseline-target.txt

# Restore workaround as default
cp vite.config.workaround.ts vite.config.ts
```

**Decision point:** Report both results to the user before continuing. The error from the target config is the input to Phase 1.

### 0.7 Commit locally

```sh
cd /Users/ajb/Projects/devalbo-cli-test-app
git add -A
git commit -m "Initial scaffold with workaround vite config"
```

No GitHub push needed. This stays local.

---

## Phase 1: Diagnose the remaining browser leakage

**Agent instructions:** This phase is diagnostic. Do NOT make library changes yet. Collect evidence, then report findings before moving to Phase 2.

### Goal
Identify exactly what named export is missing when `shimMissingExports` is removed.

### Step 1.1: Capture the target config error

```sh
cd /Users/ajb/Projects/devalbo-cli-test-app
cp vite.config.target.ts vite.config.ts
npx vite build 2>&1 | tee /tmp/target-build-errors.txt
# Restore workaround
cp vite.config.workaround.ts vite.config.ts
```

Read `/tmp/target-build-errors.txt`. Look for errors like:
```
"X" is not exported by "node_modules/node-stdlib-browser/esm/mock/empty.js",
imported by "node_modules/devalbo-cli/dist/CHUNK.js"
```

Record: **what export name** and **which chunk file**.

### Step 1.2: Check for shared chunks

```sh
cd /Users/ajb/Projects/devalbo-cli-test-app

# List chunks imported by browser.js
grep '^import.*from "\./.*\.js"' node_modules/devalbo-cli/dist/browser.js > /tmp/browser-imports.txt

# List chunks imported by index.js (node entry)
grep '^import.*from "\./.*\.js"' node_modules/devalbo-cli/dist/index.js > /tmp/node-imports.txt

# Find overlapping chunk filenames
comm -12 <(grep -oP 'chunk-\w+\.js' /tmp/browser-imports.txt | sort) \
         <(grep -oP 'chunk-\w+\.js' /tmp/node-imports.txt | sort)
```

If there are shared chunks, those are the prime suspects.

### Step 1.3: Inspect the offending chunk

Open the chunk file identified in 1.1 (e.g., `node_modules/devalbo-cli/dist/chunk-XXXX.js`). Look for:
- `import ... from 'fs'` or `import ... from 'node:fs'`
- `import ... from 'child_process'`
- `import ... from 'module'` or `import ... from 'node:module'`
- `createRequire`
- `process.cwd()`, `process.env`

### Step 1.4: Trace the import chain

Starting from `dist/browser.js`, follow the import chain to the problematic chunk:
```
browser.js → chunk-A.js → chunk-B.js → imports 'fs'
```

Document the full chain.

### Step 1.5: Check the source mapping

The chunk names map back to source modules. Check which `src/` files contribute to the offending chunk by searching for distinctive function/variable names from the chunk in the library source:

```sh
cd /Users/ajb/Projects/devalbo-cli
# Search for a distinctive identifier found in the chunk
grep -r "IDENTIFIER_FROM_CHUNK" src/ packages/
```

### Decision point
Report findings to user. The answer determines which Phase 2 option to use:
- **Shared chunks between node/browser entries** → Phase 2 Option A (`splitting: false`)
- **Barrel export leaking Node code** → Phase 2 Option B (explicit named exports)
- **External dependency issue** → Phase 2 Option C (add to externals)

---

## Phase 2: Fix the leakage in the library

**Agent instructions:** Based on Phase 1 findings, pick the matching option below. After each change, run the full verification loop. Do NOT commit to the library repo until the target vite config passes in the test project.

### Verification loop (run after every library change)

**Always use tarball install.** Never `file:` for verification.

```sh
# 1. Build and pack in library repo
cd /Users/ajb/Projects/devalbo-cli
npm run build:dist && npm pack

# 2. Install fresh tarball in test project
cd /Users/ajb/Projects/devalbo-cli-test-app
npm install /Users/ajb/Projects/devalbo-cli/devalbo-cli-0.1.0.tgz

# 3. Test with target vite config (includes CLI smoke, browser build, React dedup, browser runtime)
cp vite.config.target.ts vite.config.ts
bash scripts/test-all.sh 2>&1 | tee /tmp/verification-result.txt

# 4. Check result
# Pass → proceed to next step or Phase 3
# Fail → read error, fix in library, go to step 1
```

### Option A: Shared chunk issue (most likely)

**Symptom from Phase 1:** `browser.js` and `index.js` share chunk files containing Node-only imports.

**Fix:** In `/Users/ajb/Projects/devalbo-cli/tsup.config.ts`, add `splitting: false` to the browser entry:

```ts
// Browser entry — change this one field:
{
  entry: { browser: 'src/index.browser.ts' },
  format: ['esm'],
  splitting: false,  // ← ADD THIS: inlines everything, no shared chunks
  dts: true,
  outDir: 'dist',
  clean: false,
  // ... rest stays the same
}
```

This inlines all code into `dist/browser.js` — no chunks at all. The file gets larger but is guaranteed to contain only browser-safe code (since `index.browser.ts` only imports browser-safe modules).

**IMPORTANT: `splitting: false` is an emergency lever, not a permanent fix.** It works by inlining everything, which masks boundary problems (e.g., a barrel export that shouldn't be pulling in Node code). Use it to unblock, but if the test passes, also investigate *why* chunks were shared — the underlying import chain may need cleanup (Option B) to prevent the problem from recurring when splitting is re-enabled.

**Run verification loop.** If it passes, move to Phase 3.

### Option B: Transitive barrel import

**Symptom from Phase 1:** No shared chunks, but `browser.js` itself contains Node-only code because a barrel `export *` pulls it in.

**Fix:** Find the barrel file (likely in `packages/cli-shell/src/index.ts` or similar) and replace `export *` with explicit named exports that exclude Node-only APIs.

```sh
# Find barrel exports in the import chain
cd /Users/ajb/Projects/devalbo-cli
grep -r 'export \*' src/ packages/*/src/index.ts
```

Edit the offending file to use explicit exports instead of `export *`.

**Run verification loop.**

### Option C: External dependency issue

**Symptom from Phase 1:** The leaking import comes from a third-party package, not our code.

**Fix:** Add the specific package to the `external` array in the browser tsup entry AND to `build.rollupOptions.external` in the target vite config:

```ts
// In tsup.config.ts browser entry, add to external:
external: [...existing, 'PROBLEM_PACKAGE'],

// In vite.config.target.ts, add:
build: {
  rollupOptions: {
    external: ['react-devtools-core', 'PROBLEM_PACKAGE']
  }
}
```

This is acceptable if the dependency is at fault (not our code). Document which package and why.

**Run verification loop.**

---

## Phase 3: Clean up workarounds

**Agent instructions:** Run each step and verify after each change. If any step breaks the build, stop and report — the Phase 2 fix may be incomplete.

### Step 3.1: Try simplifying vite-plugin.ts (conditional)

**Prerequisite:** Phase 2 target config passes cleanly (no `shimMissingExports`). Only attempt this step if that's true.

Try replacing `/Users/ajb/Projects/devalbo-cli/src/vite-plugin.ts` with:
```ts
export { nodePolyfills } from 'vite-plugin-node-polyfills';
```

### Step 3.2: Rebuild, repack, and test

```sh
cd /Users/ajb/Projects/devalbo-cli
npm run build:dist && npm pack

cd /Users/ajb/Projects/devalbo-cli-test-app
npm install /Users/ajb/Projects/devalbo-cli/devalbo-cli-0.1.0.tgz
cp vite.config.target.ts vite.config.ts
bash scripts/test-all.sh
```

**If this fails** with a `createRequire` / `node:module` error: the `node:module` shim is still needed. **Revert vite-plugin.ts immediately** and keep the shim version. Report to user — this means the browser entry still reaches a chunk with the `createRequire` banner, and Phase 2 didn't fully isolate it. The shim stays until that's resolved; do NOT treat this as a blocker for the rest of Phase 3.

### Step 3.3: Run artifact scan

```sh
cd /Users/ajb/Projects/devalbo-cli
bash tests/packaging/artifact-scan.test.sh
```

### Step 3.4: Finalize test project

```sh
cd /Users/ajb/Projects/devalbo-cli-test-app

# Use target config permanently
cp vite.config.target.ts vite.config.ts

# Delete workaround
rm vite.config.workaround.ts

# Final verification
bash scripts/test-all.sh

# Commit
git add -A
git commit -m "Switch to target vite config — no workarounds needed"
```

**Check:** Both CLI type-check and browser build pass with the clean vite config.

---

## Phase 4: Update docs and smoke script

**Agent instructions:** The working `vite.config.ts` from the test project is the source of truth. Copy it into the guide and smoke script.

### Step 4.1: Update CREATE_AN_APP.md

In `/Users/ajb/Projects/devalbo-cli/CREATE_AN_APP.md`, find the `vite.config.ts` code block in the browser steps and replace it with the target config (no `shimMissingExports`, no `node:module` shim workaround).

### Step 4.2: Update smoke script

In `/Users/ajb/Projects/devalbo-cli/scripts/smoke-create-app.sh`, find the `cat > vite.config.ts` heredoc and replace it with the target config.

### Step 4.3: Run smoke script end-to-end

```sh
cd /Users/ajb/Projects/devalbo-cli
bash scripts/smoke-create-app.sh --devalbo-spec "file:$(pwd)" --dir /tmp/smoke-test --force
```

**Check:** All steps pass including `vite build`.

### Step 4.4: Report results

Do NOT commit. Report to user that Phase 4 is complete and what changed.

---

## Phase 5: Distribution hardening (requires GitHub access)

**Agent instructions:** This phase requires pushing to GitHub. Confirm with user before proceeding.

1. Set up the `release` branch publish-root generation.
2. In the test project, test git install:
   ```sh
   cd /Users/ajb/Projects/devalbo-cli-test-app
   npm install git+https://github.com/devalbo/devalbo-cli.git#release
   bash scripts/test-all.sh
   ```
3. Tag `v0.1.0` on the release branch.
4. Test tagged install:
   ```sh
   npm install git+https://github.com/devalbo/devalbo-cli.git#v0.1.0
   bash scripts/test-all.sh
   ```
5. Update CREATE_AN_APP.md install step to use `#release` (or tagged ref).

---

## The development loop (for every library packaging change)

```
┌──────────────────────────────────────────────────┐
│  1. Edit in /Users/ajb/Projects/devalbo-cli      │
│  2. npm run build:dist                             │
│  3. npm pack                                     │
└───────────────┬──────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────────────────────┐
│  4. cd /Users/ajb/Projects/devalbo-cli-test-app  │
│  5. npm install ../devalbo-cli/                  │
│     devalbo-cli-0.1.0.tgz                       │
│  6. cp vite.config.target.ts vite.config.ts      │
│  7. bash scripts/test-all.sh                     │
└───────────────┬──────────────────────────────────┘
                │
           Pass? ──No──► Read error, fix in library, go to step 1
                │
               Yes
                │
                ▼
┌──────────────────────────────────────────────────┐
│  8. Report results to user                       │
│  9. Commit only when user confirms               │
└──────────────────────────────────────────────────┘
```

Never commit a library change without step 7 passing. All local — no GitHub needed until Phase 5.

---

## Why a separate directory (not a workspace member)

| Concern | Workspace member | Separate directory + tarball |
|---------|-----------------|------|
| npm resolution | pnpm symlinks mask real issues | Real npm resolution, same as users |
| Install speed | Instant (symlink) | ~10s (tarball), catches missing `files` |
| Catches `exports` bugs | No — pnpm resolves differently | Yes — same path as consumers |
| Catches missing deps | No — hoisted deps available | Yes — only declared deps |
| `files` field tested | No | Yes — tarball only includes listed files |
| Commit independence | Coupled to library | Can pin known-good tarball |
| Peer dep resolution | pnpm auto-installs | Must be explicitly installed (like users) |
| GitHub required | No | No — tarball install is fully local |

**If it works in the test project, it works for users. If it doesn't, users would hit the same problem.**

---

## Quality gates

### Gate: No duplicate React runtime

This must pass at every phase, not just at the end. A duplicate React runtime causes hooks to fail silently at runtime even when builds succeed.

**In library dist — React must be externalized, not inlined:**
```sh
# browser.js should have `from "react"` (external import), NOT inlined CJS runtime
grep -qE 'from\s+"react"' /Users/ajb/Projects/devalbo-cli/dist/browser.js  # expect match

# Neither entry should contain React CJS runtime signatures (survives minification)
grep -q 'react.production' /Users/ajb/Projects/devalbo-cli/dist/browser.js  # expect NO match
grep -q 'react.production' /Users/ajb/Projects/devalbo-cli/dist/index.js    # expect NO match
```

**In browser build output:**
```sh
# After vite build in test project — no duplicate React CJS signatures
grep -c 'react.production' /Users/ajb/Projects/devalbo-cli-test-app/dist/assets/*.js  # expect ≤ 1
```

**In CLI runtime:**
```sh
# CLI --help should work without hanging (uses background watchdog, not GNU timeout)
cd /Users/ajb/Projects/devalbo-cli-test-app
node --import tsx src/cli.ts --help
```

These checks are built into `scripts/test-all.sh` (via `test-react-dedup.sh`, `test-cli.sh`, `test-browser.sh`).

---

## Acceptance criteria (plan complete)

1. `devalbo-cli-test-app/scripts/test-all.sh` passes with target vite config (no `shimMissingExports`)
2. `src/vite-plugin.ts` is a plain re-export of `nodePolyfills` **OR** documented reason why the shim is still needed
3. `tests/packaging/artifact-scan.test.sh` passes on `dist/browser.js`
4. No duplicate React runtime in CLI or browser (gate above passes)
5. `npm install git+https://...#release` works in the test project
6. CREATE_AN_APP.md and smoke script match the test project's vite.config.ts
7. No workarounds in any consumer-facing config

---

## What to salvage from current work

**Keep as-is:**
- `src/index.browser.ts` — correct browser API surface
- `src/system-commands.browser.ts` — browser-safe builtins
- `package.json` exports map with `browser` condition
- `./node` subpath with browser/node conditions
- `tests/packaging/artifact-scan.test.sh`
- `peerDependencies` for renderer libs

**Likely needs rework:**
- `tsup.config.ts` — may need `splitting: false` on browser entry (Phase 2)
- Barrel exports in internal packages — may need explicit named exports (Phase 2)

**Revert once leakage is fixed:**
- `src/vite-plugin.ts` — back to plain re-export (Phase 3)
- `shimMissingExports` in any consumer config (Phase 3)
- `node:module` shim (Phase 3)
