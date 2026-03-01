import React, { useMemo, useState, type ReactNode } from 'react';
import { Box, Text } from 'ink';
import { TextInput } from '@devalbo-cli/ui';
import { BrowserShellProvider } from './BrowserShellProvider';
import { TerminalShellProvider } from './TerminalShellProvider';
import {
  BrowserConnectivityService,
  type AppConfig,
  detectPlatform,
  RuntimePlatform,
  type IConnectivityService
} from '@devalbo-cli/shared';
import { createDevalboStore, type DevalboStore } from '@devalbo-cli/state';
import type { IFilesystemDriver } from '@devalbo-cli/filesystem';
import type { CommandHandler } from '../commands/_util';
import { executeCommandRaw, parseCommandLine } from '../lib/command-runtime';
import type { ProgramLike } from '../types/program';
import { useShellRuntime } from '../context/ShellRuntimeContext';

interface CommandOutput {
  command?: string;
  component?: ReactNode;
}

function ShellContent({
  commands,
  createProgram,
  runtime,
  store,
  config,
  driver,
  cwd,
  setCwd,
  session,
  connectivity: connectivityProp,
  welcomeMessage
}: {
  commands: Record<string, CommandHandler>;
  createProgram?: () => ProgramLike;
  runtime: 'browser' | 'terminal';
  store: DevalboStore;
  config?: AppConfig;
  driver?: IFilesystemDriver | null;
  cwd: string;
  setCwd: (next: string) => void;
  session?: unknown | null;
  connectivity?: IConnectivityService | null;
  welcomeMessage: string | ReactNode;
}) {
  const [connectivityFallback] = useState<IConnectivityService>(() => new BrowserConnectivityService());
  const connectivity = connectivityProp ?? connectivityFallback;
  const [input, setInput] = useState('');
  const [inputKey, setInputKey] = useState(0);
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      component: typeof welcomeMessage === 'string'
        ? <Text color="cyan">{welcomeMessage}</Text>
        : welcomeMessage
    }
  ]);

  const executeCommand = async (raw: string) => {
    const { commandName } = parseCommandLine(raw);
    if (!commandName) return;

    const result = await executeCommandRaw(raw, {
      commands,
      store,
      cwd,
      setCwd,
      ...(createProgram ? { createProgram } : {}),
      ...(session !== undefined ? { session } : {}),
      ...(config !== undefined ? { config } : {}),
      ...(driver ? { driver } : {}),
      ...(connectivity ? { connectivity } : {}),
      clearScreen: () => setHistory([]),
      ...(runtime === 'terminal'
        ? {
          exit: () => {
            const nodeProcess = (globalThis as { process?: { exit?: (code?: number) => never } }).process;
            nodeProcess?.exit?.(0);
          }
        }
        : {})
    });

    if (commandName !== 'clear') {
      setHistory((prev) => [...prev, { command: `$ ${raw}`, component: result.component }]);
    }

    setInput('');
    setInputKey((prev) => prev + 1);
  };

  return (
    <Box flexDirection="column" padding={1}>
      {history.map((item, idx) => (
        <Box key={idx} flexDirection="column" marginBottom={1}>
          {item.command ? <Text dimColor>{item.command}</Text> : null}
          {item.component && <Box marginLeft={2}>{item.component}</Box>}
        </Box>
      ))}
      <Box>
        <Text color="green">$ </Text>
        <TextInput
          key={inputKey}
          defaultValue={input}
          onChange={setInput}
          onSubmit={executeCommand}
          placeholder="Type command"
        />
      </Box>
    </Box>
  );
}

export const InteractiveShell: React.FC<{
  commands?: Record<string, CommandHandler>;
  createProgram?: () => ProgramLike;
  runtime?: 'browser' | 'terminal';
  store?: DevalboStore;
  config?: AppConfig;
  driver?: IFilesystemDriver | null;
  cwd?: string;
  setCwd?: (next: string) => void;
  session?: unknown | null;
  welcomeMessage: string | ReactNode;
}> = ({
  commands: commandsProp,
  createProgram: createProgramProp,
  runtime = 'browser',
  store: storeProp,
  config: configProp,
  driver: driverProp = null,
  cwd: cwdProp,
  setCwd: setCwdProp,
  session: sessionProp,
  welcomeMessage
}) => {
  const runtimeContext = useShellRuntime();
  const fromContext = runtimeContext ?? undefined;

  const commands = commandsProp ?? fromContext?.commands;
  const createProgram = createProgramProp ?? (fromContext?.createProgram ? () => fromContext.createProgram!() : undefined);
  const store = storeProp ?? fromContext?.store;
  const config = configProp ?? fromContext?.config;
  const driver = driverProp ?? fromContext?.driver ?? null;
  const cwd = cwdProp ?? fromContext?.cwd;
  const setCwd = setCwdProp ?? fromContext?.setCwd;
  const session = sessionProp !== undefined ? sessionProp : fromContext?.session;
  const connectivity = fromContext?.connectivity ?? null;

  const shellStore = useMemo(() => store ?? createDevalboStore(), [store]);
  const fallbackCwd = useMemo(() => {
    if (detectPlatform().platform !== RuntimePlatform.NodeJS) return '/';
    const nodeProcess = (globalThis as { process?: { cwd?: () => string } }).process;
    return nodeProcess?.cwd?.() ?? '/';
  }, []);
  const resolvedCwd = cwd ?? fallbackCwd;
  const resolvedSetCwd = setCwd ?? (() => undefined);

  if (commands == null) {
    throw new Error('InteractiveShell: commands are required. Pass commands as a prop or render inside ShellRuntimeProvider (e.g. createApp().App).');
  }

  const shellContentProps = {
    commands,
    ...(createProgram ? { createProgram } : {}),
    store: shellStore,
    ...(config ? { config } : {}),
    driver,
    cwd: resolvedCwd,
    setCwd: resolvedSetCwd,
    ...(session !== undefined ? { session } : {}),
    ...(connectivity ? { connectivity } : {}),
    welcomeMessage
  };

  if (runtime === 'terminal') {
    return (
      <TerminalShellProvider>
        <ShellContent {...shellContentProps} runtime="terminal" />
      </TerminalShellProvider>
    );
  }

  return (
    <BrowserShellProvider>
      <ShellContent {...shellContentProps} runtime="browser" />
    </BrowserShellProvider>
  );
};
