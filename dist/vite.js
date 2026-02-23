// src/vite-plugin.ts
import { nodePolyfills as baseNodePolyfills } from "vite-plugin-node-polyfills";
function nodePolyfills(opts) {
  const baseOpts = {
    ...opts,
    exclude: [...opts?.exclude ?? [], "module"]
  };
  return [
    {
      name: "devalbo-node-module-shim",
      enforce: "pre",
      resolveId(id) {
        if (id === "node:module" || id === "module") {
          return "\0devalbo:node-module-shim";
        }
      },
      load(id) {
        if (id === "\0devalbo:node-module-shim") {
          return "export function createRequire() { return () => {}; }";
        }
      }
    },
    baseNodePolyfills(baseOpts)
  ];
}
export {
  nodePolyfills
};
