/**
 * Tracks the last successful parse result and the current parse error.
 * Use in viewEdit handlers: parse source with your parser; validDoc updates only
 * when parsing succeeds, parseError is set when it fails.
 *
 * The parse function can be an inline arrow — it is captured by ref and does not
 * trigger re-parsing. Only changes to `source` trigger re-parsing.
 *
 * @param source - Raw input (e.g. file content string)
 * @param parse - Parser function. Return the parsed value; throw or reject on invalid input.
 * @returns { validDoc, parseError } - validDoc is the last successful result; parseError is the current error message or null.
 */
export declare function useValidParse<T>(source: string | Uint8Array, parse: (src: string | Uint8Array) => T | Promise<T>): {
    validDoc: T | null;
    parseError: string | null;
};
//# sourceMappingURL=use-valid-parse.d.ts.map