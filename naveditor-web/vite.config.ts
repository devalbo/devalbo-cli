import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  preview: {
    host: '127.0.0.1',
    port: 4173,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  },
  optimizeDeps: {
    exclude: ['@sqlite.org/sqlite-wasm']
  },
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: [
      { find: '@/lib/validate-args', replacement: resolve(__dirname, '../packages/cli-shell/src/lib/validate-args.ts') },
      { find: /^@devalbo\/cli-shell\/(.*)$/, replacement: resolve(__dirname, '../packages/cli-shell/src/$1') },
      { find: '@devalbo-cli/cli-shell', replacement: resolve(__dirname, '../packages/cli-shell/src/index.ts') },
      { find: '@devalbo-cli/commands', replacement: resolve(__dirname, '../packages/commands/src/index.ts') },
      { find: '@devalbo-cli/shared', replacement: resolve(__dirname, '../packages/shared/src/index.ts') },
      { find: '@devalbo-cli/solid-client', replacement: resolve(__dirname, '../packages/solid-client/src/index.ts') },
      { find: '@devalbo-cli/state', replacement: resolve(__dirname, '../packages/state/src/index.ts') },
      { find: '@devalbo-cli/ui', replacement: resolve(__dirname, '../packages/ui/src/index.ts') },
      { find: '@', replacement: resolve(__dirname, '../editor-lib/src') },
      { find: 'ink', replacement: 'ink-web' }
    ]
  }
});
