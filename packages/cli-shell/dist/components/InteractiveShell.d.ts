import React, { type ReactNode } from 'react';
import { type AppConfig } from '@devalbo-cli/shared';
import { type DevalboStore } from '@devalbo-cli/state';
import type { IFilesystemDriver } from '@devalbo-cli/filesystem';
import type { CommandHandler } from '../commands/_util';
import type { ProgramLike } from '../types/program';
export declare const InteractiveShell: React.FC<{
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
}>;
//# sourceMappingURL=InteractiveShell.d.ts.map