import React from 'react';
import { createDevalboStore } from '@devalbo-cli/state';
import { createFilesystemDriver } from '@devalbo-cli/filesystem';
import { registerMimeTypeHandler } from '@devalbo-cli/ui';
import type { CommandHandler } from './commands/_util';
import type { CommandMeta } from './lib/command-registry';
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
    App: React.FC<{
        welcomeMessage?: string | ReactNode;
        children?: ReactNode;
    }>;
};
/**
 * One-step bootstrap for a devalbo-cli app: creates store, driver, command registry,
 * and an App component that wraps InteractiveShell with all providers. InteractiveShell
 * reads runtime from context, so you don't need to pass commands/store/driver/cwd or
 * call bindCliRuntimeSource. window.cli is bound automatically for dev console.
 */
export declare function createApp(options: CreateAppOptions): Promise<CreateAppResult>;
//# sourceMappingURL=create-app.d.ts.map