import type { AppConfig, CommandResult, IConnectivityService } from '@devalbo-cli/shared';
import type { DevalboStore } from '@devalbo-cli/state';
import type { IFilesystemDriver } from '@devalbo-cli/filesystem';
import { type CommandHandler, type ExtendedCommandOptions } from '../commands/_util';
import type { ProgramLike } from '../types/program';
export type CommandRuntimeContext = {
    commands: Record<string, CommandHandler>;
    store: DevalboStore;
    session?: unknown | null;
    config?: AppConfig;
    driver?: IFilesystemDriver | null;
    connectivity?: IConnectivityService;
    cwd: string;
    setCwd: (next: string) => void;
    createProgram?: () => ProgramLike;
    clearScreen?: () => void;
    exit?: () => void;
};
export declare const parseCommandLine: (raw: string) => {
    commandName: string;
    args: string[];
};
export declare const buildCommandOptions: (ctx: CommandRuntimeContext) => ExtendedCommandOptions;
export declare const executeCommand: (commandName: string, args: string[], ctx: CommandRuntimeContext | null) => Promise<CommandResult>;
export declare const executeCommandRaw: (raw: string, ctx: CommandRuntimeContext | null) => Promise<CommandResult>;
//# sourceMappingURL=command-runtime.d.ts.map