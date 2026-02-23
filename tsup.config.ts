import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/devalbo-cli.ts',
    vite: 'src/vite-plugin.ts'
  },
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  tsconfig: 'tsconfig.npm.json',
  banner: {
    js: "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);"
  },
  external: ['react-devtools-core', 'vite-plugin-node-polyfills'],
  noExternal: [
    '@devalbo/cli-shell',
    '@devalbo/shared',
    '@devalbo/state',
    '@devalbo/filesystem',
    '@devalbo/commands',
    '@devalbo/ui',
    '@devalbo/branded-types',
    'react',
    'react-dom'
  ]
});
