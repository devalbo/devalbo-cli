import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // Packages project: explicit include so it doesn't accidentally glob elsewhere
  {
    test: {
      name: 'packages',
      globals: true,
      environment: 'node',
      include: ['packages/*/tests/**/*.{test,spec}.{ts,tsx}'],
      setupFiles: ['packages/state/tests/setup-vitest.ts']
    }
  }
]);
