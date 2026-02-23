// src/vite-plugin.ts
import { nodePolyfills as baseNodePolyfills } from "vite-plugin-node-polyfills";
function nodePolyfills(opts) {
  const baseOpts = {
    ...opts,
    exclude: [...opts?.exclude ?? [], "module", "process", "child_process", "fs", "tty"]
  };
  return [
    {
      name: "devalbo-node-shims",
      enforce: "pre",
      resolveId(id) {
        if (id === "node:module" || id === "module") {
          return "\0devalbo:node-module-shim";
        }
        if (id === "node:process" || id === "process") {
          return "\0devalbo:node-process-shim";
        }
        if (id === "node:child_process" || id === "child_process") {
          return "\0devalbo:node-child-process-shim";
        }
        if (id === "node:fs" || id === "fs") {
          return "\0devalbo:node-fs-shim";
        }
        if (id === "node:tty" || id === "tty") {
          return "\0devalbo:node-tty-shim";
        }
      },
      load(id) {
        if (id === "\0devalbo:node-module-shim") {
          return "export function createRequire() { return () => {}; }";
        }
        if (id === "\0devalbo:node-process-shim") {
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
        if (id === "\0devalbo:node-child-process-shim") {
          return `
export const execFileSync = () => '';
export const execSync = () => '';
export const spawn = () => ({ on: () => undefined });
export default { execFileSync, execSync, spawn };
`;
        }
        if (id === "\0devalbo:node-fs-shim") {
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
        if (id === "\0devalbo:node-tty-shim") {
          return `
export const isatty = () => false;
export default { isatty };
`;
        }
      }
    },
    baseNodePolyfills(baseOpts)
  ];
}
export {
  nodePolyfills
};
