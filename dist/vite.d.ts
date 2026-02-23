import * as vite from 'vite';

interface NodePolyfillsOpts {
    exclude?: string[];
    include?: string[];
    globals?: Record<string, unknown>;
    overrides?: Record<string, string>;
    protocolImports?: boolean;
}
declare function nodePolyfills(opts?: NodePolyfillsOpts): vite.Plugin<any>[];

export { nodePolyfills };
