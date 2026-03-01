import React, { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import type { CommandRuntimeContext } from '../lib/command-runtime';
import { bindCliRuntimeSource, unbindCliRuntimeSource } from '../web/console-helpers';

export type ShellRuntimeContextValue = CommandRuntimeContext | null;

const ShellRuntimeContext = createContext<ShellRuntimeContextValue>(null);

export function useShellRuntime(): ShellRuntimeContextValue {
  return useContext(ShellRuntimeContext);
}

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
export function ShellRuntimeProvider({
  value,
  bindToCli = true,
  children
}: ShellRuntimeProviderProps): React.ReactElement {
  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (!bindToCli) return;
    bindCliRuntimeSource({
      getContext: () => valueRef.current
    });
    return () => unbindCliRuntimeSource();
  }, [bindToCli]);

  return (
    <ShellRuntimeContext.Provider value={value}>
      {children}
    </ShellRuntimeContext.Provider>
  );
}

export { ShellRuntimeContext };
