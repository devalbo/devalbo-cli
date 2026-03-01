import React, { useMemo, useState } from 'react';
import { createDevalboStore } from '@devalbo-cli/state';
import { createFilesystemDriver } from '@devalbo-cli/filesystem';
import { BrowserConnectivityService } from '@devalbo-cli/shared';
import { StoreContext } from '@devalbo-cli/state';
import { AppConfigProvider } from '@devalbo-cli/state';
import { registerMimeTypeHandler } from '@devalbo-cli/ui';
import type { CommandHandler } from './commands/_util';
import type { CommandMeta } from './lib/command-registry';
import { createCommandRegistry } from './lib/command-registry';
import { registerBuiltinCommandsToRegistry, defaultWelcomeMessage } from './program-helpers';
import { createCliAppConfig } from '@devalbo-cli/shared';
import { ShellRuntimeProvider } from './context/ShellRuntimeContext';
import { InteractiveShell } from './components/InteractiveShell';
import type { CommandRuntimeContext } from './lib/command-runtime';
import type { ReactNode } from 'react';

export type CreateAppOptions = {
  appId: string;
  appName?: string;
  storageKey: string;
  version?: string;
  description?: string;
  onReady?: (api: {
    registerCommand: (name: string, handler: CommandHandler, meta?: CommandMeta) => void;
    registerMimeTypeHandler: typeof registerMimeTypeHandler;
  }) => void;
};

export type CreateAppResult = {
  store: ReturnType<typeof createDevalboStore>;
  driver: Awaited<ReturnType<typeof createFilesystemDriver>>;
  App: React.FC<{ welcomeMessage?: string | ReactNode; children?: ReactNode }>;
};

/**
 * One-step bootstrap for a devalbo-cli app: creates store, driver, command registry,
 * and an App component that wraps InteractiveShell with all providers. InteractiveShell
 * reads runtime from context, so you don't need to pass commands/store/driver/cwd or
 * call bindCliRuntimeSource. window.cli is bound automatically for dev console.
 */
export async function createApp(options: CreateAppOptions): Promise<CreateAppResult> {
  const {
    appId,
    appName = appId,
    storageKey,
    version = '0.0.0',
    description = '',
    onReady
  } = options;

  const store = createDevalboStore();
  const config = createCliAppConfig({ appId, appName, storageKey });
  const registry = createCommandRegistry();

  const registerCommand = (name: string, handler: CommandHandler, meta?: CommandMeta): void => {
    registry.register(name, handler, meta);
  };

  onReady?.({ registerCommand, registerMimeTypeHandler });

  registerBuiltinCommandsToRegistry(registry);
  registry.freeze();

  const driver = await createFilesystemDriver();
  const createProgram = (): ReturnType<typeof registry.createProgram> =>
    registry.createProgram(appId, version, description);

  const commands = registry.getCommandMap();

  function App({
    welcomeMessage = defaultWelcomeMessage(config),
    children
  }: { welcomeMessage?: string | ReactNode; children?: ReactNode } = {}): React.ReactElement {
    const [cwd, setCwd] = useState('/');
    const [connectivity] = useState(() => new BrowserConnectivityService());

    const runtimeValue = useMemo<CommandRuntimeContext>(
      () => ({ commands, createProgram, store, config, driver, cwd, setCwd, connectivity }),
      [cwd, setCwd, connectivity]
    );

    return (
      <StoreContext.Provider value={store}>
        <AppConfigProvider config={config}>
          <ShellRuntimeProvider value={runtimeValue} bindToCli={true}>
            {children ?? (
              <InteractiveShell welcomeMessage={welcomeMessage} />
            )}
          </ShellRuntimeProvider>
        </AppConfigProvider>
      </StoreContext.Provider>
    );
  }

  return { store, driver, App };
}
