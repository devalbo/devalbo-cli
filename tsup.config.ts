import { defineConfig } from 'tsup';

// Node built-ins must be external so the bundle doesn't inject a fake require() that fails on "assert", "fs", etc.
const nodeBuiltins = [
  'assert', 'buffer', 'child_process', 'crypto', 'events', 'fs', 'http', 'https',
  'module', 'net', 'os', 'path', 'process', 'querystring', 'stream', 'string_decoder',
  'timers', 'tty', 'url', 'util', 'zlib',
  'node:assert', 'node:buffer', 'node:child_process', 'node:crypto', 'node:events',
  'node:fs', 'node:http', 'node:https', 'node:module', 'node:net', 'node:os', 'node:path',
  'node:process', 'node:querystring', 'node:stream', 'node:string_decoder',
  'node:timers', 'node:tty', 'node:url', 'node:util', 'node:zlib'
];

export default defineConfig([
  // Node CLI entry — needs createRequire banner so bundled CJS deps (signal-exit etc.)
  // can call require("assert") and other Node built-ins in ESM mode.
  {
    entry: { index: 'src/index.node.ts' },
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    clean: false, // keep dist/node.js and dist/node.browser.js (copied before tsup) so external resolves
    tsconfig: 'tsconfig.npm.json',
    banner: {
      js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);"
    },
    external: [
      'react-devtools-core',
      'vite-plugin-node-polyfills',
      'devalbo-cli/node', // not bundled; resolved to dist/node.js (Node) or dist/node.browser.js (browser)
      ...nodeBuiltins
    ],
    esbuildOptions(options) {
      options.alias = options.alias || {};
      options.alias['@devalbo-cli/filesystem/node'] = 'devalbo-cli/node';
    },
    noExternal: [
      '@devalbo-cli/cli-shell',
      '@devalbo-cli/shared',
      '@devalbo-cli/state',
      '@devalbo-cli/filesystem',
      '@devalbo-cli/commands',
      '@devalbo-cli/ui',
      '@devalbo-cli/branded-types',
      'react',
      'react-dom'
    ]
  },
  // Browser entry — no Node banner and no Node-only alias remap.
  {
    entry: { browser: 'src/index.browser.ts' },
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    clean: false,
    tsconfig: 'tsconfig.npm.json',
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-devtools-core',
      'vite-plugin-node-polyfills',
      ...nodeBuiltins
    ],
    esbuildOptions(options) {
      options.alias = options.alias || {};
      options.alias['@devalbo-cli/filesystem'] = '@devalbo-cli/filesystem/browser';
      options.alias['ink'] = 'ink-web';
    },
    noExternal: [
      '@devalbo-cli/cli-shell',
      '@devalbo-cli/shared',
      '@devalbo-cli/state',
      '@devalbo-cli/filesystem',
      '@devalbo-cli/commands',
      '@devalbo-cli/ui',
      '@devalbo-cli/branded-types'
    ]
  },
  // Vite plugin entry — NO banner (node:module's createRequire breaks browser builds).
  {
    entry: { vite: 'src/vite-plugin.ts' },
    format: ['esm'],
    dts: true,
    outDir: 'dist',
    clean: false,
    tsconfig: 'tsconfig.npm.json',
    external: ['react-devtools-core', 'vite-plugin-node-polyfills', ...nodeBuiltins],
  }
]);
