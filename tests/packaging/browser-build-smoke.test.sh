#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PKG_SPEC="${PKG_SPEC:-file:$ROOT}"
PKG_NAME="${EXPECTED_PACKAGE_NAME:-$(node -e "const fs=require('fs'); const p=JSON.parse(fs.readFileSync(process.argv[1],'utf8')); process.stdout.write(p.name);" "$ROOT/package.json")}"

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

cat > "$TMP_DIR/package.json" <<JSON
{
  "name": "browser-build-smoke",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "$PKG_NAME": "$PKG_SPEC",
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.2",
    "vite": "^7.1.3"
  }
}
JSON

cat > "$TMP_DIR/index.html" <<'HTML'
<!doctype html>
<html>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

mkdir -p "$TMP_DIR/src"
cat > "$TMP_DIR/src/main.tsx" <<EOF2
import React from 'react';
import { createRoot } from 'react-dom/client';
import { defaultWelcomeMessage } from '${PKG_NAME}';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(React.createElement('pre', null, String(defaultWelcomeMessage ?? 'ok')));
}
EOF2

cat > "$TMP_DIR/vite.config.ts" <<'EOF2'
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
EOF2

pushd "$TMP_DIR" >/dev/null
env -u NPM_CONFIG_GLOBALCONFIG \
  NODE_AUTH_TOKEN= NPM_TOKEN= \
  NPM_CONFIG_USERCONFIG=/dev/null \
  NPM_CONFIG_REGISTRY=https://registry.npmjs.org \
  npm install >/dev/null
npm run build >/dev/null
echo "Browser build smoke passed."
popd >/dev/null
