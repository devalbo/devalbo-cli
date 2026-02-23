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
  // a stub instead.
  //
  // Exclude 'process' too: vite-plugin-node-polyfills maps it to a shim that
  // only exports default/process, while some dependencies import named members
  // (e.g. `import { env } from 'node:process'` via is-in-ci).
  // We provide a shim with those named exports below.
  //
  // Exclude child_process/fs/tty for the same reason: browser builds can pull
  // transitive Node-only modules (e.g. terminal-size via ink deps) that import
  // named exports our current polyfill chain does not provide.
  //
  // The alias set by the base plugin runs before resolveId hooks, so excluding
  // is the only way to intercept these ids reliably.
  const baseOpts = {
    ...opts,
    exclude: [...(opts?.exclude ?? []), 'module', 'process', 'child_process', 'fs', 'tty'],
  };

  return [
    {
      name: 'devalbo-node-shims',
      enforce: 'pre' as const,
      resolveId(id: string) {
        if (id === 'node:module' || id === 'module') {
          return '\0devalbo:node-module-shim';
        }
        if (id === 'node:process' || id === 'process') {
          return '\0devalbo:node-process-shim';
        }
        // Some Vite dependency optimization paths rewrite node:process to this
        // internal shim id directly; intercept it too so named exports like
        // `env` are always present.
        if (
          id === 'vite-plugin-node-polyfills/shims/process' ||
          id.includes('vite-plugin-node-polyfills/shims/process')
        ) {
          return '\0devalbo:node-process-shim';
        }
        if (id === 'node:child_process' || id === 'child_process') {
          return '\0devalbo:node-child-process-shim';
        }
        if (id === 'node:fs' || id === 'fs') {
          return '\0devalbo:node-fs-shim';
        }
        if (id === 'node:tty' || id === 'tty') {
          return '\0devalbo:node-tty-shim';
        }
      },
      load(id: string) {
        if (id === '\0devalbo:node-module-shim') {
          return 'export function createRequire() { return () => {}; }';
        }
        if (id === '\0devalbo:node-process-shim') {
          return `
const processShim = {
  env: {},
  argv: [],
  versions: {},
  cwd: () => '/',
  chdir: () => { throw new Error('process.chdir is not supported'); },
  nextTick: (fn, ...args) => Promise.resolve().then(() => fn(...args)),
};
if (!globalThis.process) globalThis.process = processShim;
export const env = processShim.env;
export const argv = processShim.argv;
export const versions = processShim.versions;
export const cwd = processShim.cwd;
export const chdir = processShim.chdir;
export const nextTick = processShim.nextTick;
export default processShim;
export const process = processShim;
`;
        }
        if (id === '\0devalbo:node-child-process-shim') {
          return `
export const execFileSync = () => '';
export const execSync = () => '';
export const spawn = () => ({ on: () => undefined });
export default { execFileSync, execSync, spawn };
`;
        }
        if (id === '\0devalbo:node-fs-shim') {
          return `
export const promises = {
  access: async () => undefined,
  stat: async () => ({ isDirectory: () => false, isFile: () => false }),
  readdir: async () => [],
};
export const existsSync = () => false;
export const readFileSync = () => '';
export const watch = () => ({ close: () => undefined });
export default { promises, existsSync, readFileSync, watch };
`;
        }
        if (id === '\0devalbo:node-tty-shim') {
          return `
export const isatty = () => false;
export default { isatty };
`;
        }
      },
    },
    baseNodePolyfills(baseOpts as Parameters<typeof baseNodePolyfills>[0]),
  ];
}
