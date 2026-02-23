import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      'devalbo-cli': path.resolve(__dirname, './tests/devalbo-cli-test-shim.ts'),
      '@devalbo-cli/cli-shell': path.resolve(__dirname, '../../packages/cli-shell/src/index.ts'),
      '@devalbo-cli/commands': path.resolve(__dirname, '../../packages/commands/src/index.ts'),
      '@devalbo-cli/filesystem': path.resolve(__dirname, '../../packages/filesystem/src/index.ts'),
      '@devalbo-cli/shared': path.resolve(__dirname, '../../packages/shared/src/index.ts'),
      '@devalbo-cli/state': path.resolve(__dirname, '../../packages/state/src/index.ts'),
      '@devalbo-cli/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      ink: 'ink-web'
    }
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts']
  }
});
