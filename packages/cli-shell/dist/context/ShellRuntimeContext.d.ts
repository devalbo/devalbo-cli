import React, { type ReactNode } from 'react';
import type { CommandRuntimeContext } from '../lib/command-runtime';
export type ShellRuntimeContextValue = CommandRuntimeContext | null;
declare const ShellRuntimeContext: React.Context<ShellRuntimeContextValue>;
export declare function useShellRuntime(): ShellRuntimeContextValue;
export type ShellRuntimeProviderProps = {
    value: CommandRuntimeContext | null;
    /** When true, also bind this context to window.cli (dev console). Default true in browser. */
    bindToCli?: boolean;
    children: ReactNode;
};
/**
 * Provides shell runtime (commands, store, driver, cwd, etc.) to InteractiveShell
 * and optionally to window.cli for dev console. Use this when using createApp() or
 * when you want InteractiveShell to read from context instead of props.
 */
export declare function ShellRuntimeProvider({ value, bindToCli, children }: ShellRuntimeProviderProps): React.ReactElement;
export { ShellRuntimeContext };
//# sourceMappingURL=ShellRuntimeContext.d.ts.map