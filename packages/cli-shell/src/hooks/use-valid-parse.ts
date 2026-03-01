import { useState, useEffect, useRef } from 'react';

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
export function useValidParse<T>(
  source: string | Uint8Array,
  parse: (src: string | Uint8Array) => T | Promise<T>
): { validDoc: T | null; parseError: string | null } {
  const [validDoc, setValidDoc] = useState<T | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const parseRef = useRef(parse);
  parseRef.current = parse;

  useEffect(() => {
    let cancelled = false;

    const run = async (): Promise<void> => {
      try {
        const result = await Promise.resolve(parseRef.current(source));
        if (!cancelled) {
          setValidDoc(result);
          setParseError(null);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : String(err);
          setParseError(message);
        }
      }
    };

    void run();
    return () => { cancelled = true; };
  }, [source]);

  return { validDoc, parseError };
}
