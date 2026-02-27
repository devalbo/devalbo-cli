import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'react'
  },
  build: {
    lib: {
      entry: resolve(__dirname, '../editor-lib/src/cli-node.tsx'),
      name: 'naveditor',
      fileName: () => 'cli.js',
      formats: ['es']
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: [
        'commander',
        'ink',
        'react',
        'react/jsx-runtime',
        '@devalbo-cli/commands',
        '@devalbo-cli/cli-shell',
        '@devalbo-cli/filesystem',
        '@devalbo-cli/filesystem/node',
        '@devalbo-cli/shared',
        '@devalbo-cli/solid-client',
        '@devalbo-cli/state',
        '@devalbo-cli/ui'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../editor-lib/src'),
      '@/lib/validate-args': resolve(__dirname, '../packages/cli-shell/src/lib/validate-args.node.ts')
    }
  }
});
