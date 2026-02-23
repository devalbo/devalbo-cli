interface NodePolyfillsOpts {
    exclude?: string[];
    include?: string[];
    globals?: Record<string, unknown>;
    overrides?: Record<string, string>;
    protocolImports?: boolean;
}
declare function nodePolyfills(opts?: NodePolyfillsOpts): any[];

export { nodePolyfills };
