import type { AppConfig, CommandOptions, CommandResult, IConnectivityService } from '@devalbo-cli/shared';
import type { Store } from 'tinybase';
import type { IFilesystemDriver } from '@devalbo-cli/filesystem';
import type { ProgramLike } from '../types/program';
type CommandOptionsBase = CommandOptions & {
    cwd?: string;
    setCwd?: (nextCwd: string) => void;
    clearScreen?: () => void;
    exit?: () => void;
    session?: unknown | null;
    config?: AppConfig;
    driver?: IFilesystemDriver;
    connectivity?: IConnectivityService;
    createProgram?: () => ProgramLike;
};
export type ExtendedCommandOptions = CommandOptionsBase | (CommandOptionsBase & {
    store: Store;
});
export type ExtendedCommandOptionsWithStore = CommandOptionsBase & {
    store: Store;
};
export type AsyncCommandHandler = (args: string[], options?: ExtendedCommandOptions) => Promise<CommandResult>;
export type StoreCommandHandler = (args: string[], options: ExtendedCommandOptionsWithStore) => Promise<CommandResult>;
export type CommandHandler = AsyncCommandHandler | StoreCommandHandler;
export declare const makeOutput: (text: string) => CommandResult;
export declare const makeError: (message: string) => CommandResult;
export declare const makeResult: (text: string, data: unknown) => CommandResult;
export declare const makeResultError: (message: string, data?: unknown) => CommandResult;
/**
 * Merge multiple command groups into a single record, throwing on duplicates.
 *
 * Use this instead of object spread (`{ ...groupA, ...groupB }`) to catch
 * accidental command name collisions at startup rather than silently
 * shadowing one handler with another.
 *
 * @throws {Error} if any command name appears in more than one group
 *
 * @example
 * ```ts
 * import { mergeCommands, builtinCommands } from '@devalbo-cli/cli-shell';
 *
 * export const commands = mergeCommands(builtinCommands, myAppCommands);
 * ```
 */
export declare const mergeCommands: (...groups: Record<string, CommandHandler>[]) => Record<string, CommandHandler>;
export {};
//# sourceMappingURL=_util.d.ts.map