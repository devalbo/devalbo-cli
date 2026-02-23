/**
 * Node polyfills plugin for Vite browser builds.
 * Use in your app's vite.config: plugins: [react(), nodePolyfills()]
 * so devalbo-cli and ink-web work in the browser.
 *
 * Wraps vite-plugin-node-polyfills with an additional shim for node:module.
 * The devalbo-cli dist includes a createRequire banner (injected by tsup for
 * CJS interop). The base polyfills plugin maps node:module to an empty mock
 * that doesn't export createRequire, breaking the build. This wrapper adds a
 * shim that provides a stub createRequire for the browser.
 */
import { nodePolyfills as baseNodePolyfills } from 'vite-plugin-node-polyfills';

// Minimal type to avoid direct import of PolyfillOptions (pnpm resolution
// prevents tsup DTS builder from finding the type export).
interface NodePolyfillsOpts {
  exclude?: string[];
  include?: string[];
  globals?: Record<string, unknown>;
  overrides?: Record<string, string>;
  protocolImports?: boolean;
}

export function nodePolyfills(opts?: NodePolyfillsOpts): any[] {
  // Exclude 'module' from the base polyfills so it doesn't get aliased to an
  // empty mock (which lacks the createRequire export). Our shim below provides
  // a stub instead. The alias set by the base plugin runs before resolveId
  // hooks, so excluding is the only way to intercept it.
  const baseOpts = {
    ...opts,
    exclude: [...(opts?.exclude ?? []), 'module'],
  };

  return [
    {
      name: 'devalbo-node-module-shim',
      enforce: 'pre' as const,
      resolveId(id: string) {
        if (id === 'node:module' || id === 'module') {
          return '\0devalbo:node-module-shim';
        }
      },
      load(id: string) {
        if (id === '\0devalbo:node-module-shim') {
          return 'export function createRequire() { return () => {}; }';
        }
      },
    },
    baseNodePolyfills(baseOpts as Parameters<typeof baseNodePolyfills>[0]),
  ];
}
