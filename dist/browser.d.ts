import * as commander from 'commander';
import { Command } from 'commander';
import React$1, { Context, ReactNode } from 'react';
import { Store } from 'tinybase';

declare const __brand: unique symbol;
type Brand<B> = {
    [__brand]: B;
};
type Branded<T, B> = T & Brand<B>;

type BrandedNumber<B extends string> = Branded<number, ['BrandedNumber', B]>;

type FilePath = Branded<string, 'FilePath'>;
type DirectoryPath = Branded<string, 'DirectoryPath'>;
type Milliseconds = BrandedNumber<'Milliseconds'>;
type ByteCount = BrandedNumber<'ByteCount'>;

interface IConnectivityService {
    isOnline(): boolean;
    onOnline(callback: () => void): () => void;
}
declare class BrowserConnectivityService implements IConnectivityService {
    isOnline(): boolean;
    onOnline(callback: () => void): () => void;
}

interface FileEntry {
    name: string;
    path: FilePath;
    isDirectory: boolean;
    size?: number;
    mtime?: Date;
}

interface CommandResult {
    component: React$1.ReactNode;
    error?: string;
    data?: unknown;
    status?: 'ok' | 'error';
}
interface CommandOptions {
    interactive?: boolean;
    onComplete?: () => void;
}

type AppConfig = {
    appId: string;
    appName: string;
    storageKey: string;
    podNamespace: string;
    socialLocalPath: string;
    sync: {
        social: {
            pollIntervalMs: Milliseconds;
            outboundDebounceMs: Milliseconds;
        };
        files: {
            pollIntervalMs: Milliseconds;
            outboundDebounceMs: Milliseconds;
            maxFileSizeBytes: ByteCount;
        };
    };
    features: {
        socialSync: boolean;
        fileSync: boolean;
        fileSharing: boolean;
    };
};
type AppIdentity = {
    appId: string;
    appName: string;
    storageKey: string;
};
/** CLI-only app: all sync and social features disabled. */
declare const createCliAppConfig: (identity: AppIdentity) => AppConfig;

interface IFilesystemDriver {
    readFile(path: FilePath): Promise<Uint8Array>;
    writeFile(path: FilePath, data: Uint8Array): Promise<void>;
    readdir(path: DirectoryPath): Promise<FileEntry[]>;
    stat(path: FilePath): Promise<FileEntry>;
    mkdir(path: DirectoryPath): Promise<void>;
    rm(path: FilePath): Promise<void>;
    exists(path: FilePath): Promise<boolean>;
}

declare const createFilesystemDriver: () => Promise<IFilesystemDriver>;

type CommandOptionsBase = CommandOptions & {
    cwd?: string;
    setCwd?: (nextCwd: string) => void;
    clearScreen?: () => void;
    exit?: () => void;
    session?: unknown | null;
    config?: AppConfig;
    driver?: IFilesystemDriver;
    connectivity?: IConnectivityService;
    createProgram?: () => commander.Command;
};
type ExtendedCommandOptions = CommandOptionsBase | (CommandOptionsBase & {
    store: Store;
});
type ExtendedCommandOptionsWithStore = CommandOptionsBase & {
    store: Store;
};
type AsyncCommandHandler = (args: string[], options?: ExtendedCommandOptions) => Promise<CommandResult>;
type StoreCommandHandler = (args: string[], options: ExtendedCommandOptionsWithStore) => Promise<CommandResult>;
type CommandHandler = AsyncCommandHandler | StoreCommandHandler;
declare const makeOutput: (text: string) => CommandResult;
declare const makeError: (message: string) => CommandResult;
declare const makeResult: (text: string, data: unknown) => CommandResult;
declare const makeResultError: (message: string, data?: unknown) => CommandResult;
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
declare const mergeCommands: (...groups: Record<string, CommandHandler>[]) => Record<string, CommandHandler>;

declare const filesystemCommands: Record<'pwd' | 'cd' | 'ls' | 'tree' | 'stat' | 'cat' | 'touch' | 'mkdir' | 'cp' | 'mv' | 'rm', AsyncCommandHandler>;

declare const appCommands: Record<'app-config', AsyncCommandHandler>;

declare const createDevalboStore: () => Store;
type DevalboStore = Store;

declare const StoreContext: Context<DevalboStore | null>;

declare const AppConfigProvider: React.FC<{
    config: AppConfig;
    children: ReactNode;
}>;
declare const useAppConfig: () => AppConfig;

declare const InteractiveShell: React$1.FC<{
    commands: Record<string, CommandHandler>;
    createProgram?: () => commander.Command;
    runtime?: 'browser' | 'terminal';
    store?: DevalboStore;
    config?: AppConfig;
    driver?: IFilesystemDriver | null;
    cwd?: string;
    setCwd?: (next: string) => void;
    session?: unknown | null;
    welcomeMessage: string | ReactNode;
}>;

type CommandRuntimeContext = {
    commands: Record<string, CommandHandler>;
    store: DevalboStore;
    session?: unknown | null;
    config?: AppConfig;
    driver?: IFilesystemDriver | null;
    connectivity?: IConnectivityService;
    cwd: string;
    setCwd: (next: string) => void;
    createProgram?: () => commander.Command;
    clearScreen?: () => void;
    exit?: () => void;
};

type CliRuntimeSource = {
    getContext: () => CommandRuntimeContext | null;
};
declare const bindCliRuntimeSource: (source: CliRuntimeSource) => void;
declare const unbindCliRuntimeSource: () => void;
declare const getCliRuntimeStatus: () => {
    ready: boolean;
    missing: string[];
};
declare function exec(commandName: string, args?: string[], cwdOverride?: string): Promise<CommandResult>;
declare function execRaw(raw: string, cwdOverride?: string): Promise<CommandResult>;
declare function execText(commandName: string, args?: string[], cwdOverride?: string): Promise<{
    text: string;
    error: string | null;
}>;
declare const cli: {
    exec: typeof exec;
    execRaw: typeof execRaw;
    execText: typeof execText;
    status: () => {
        ready: boolean;
        missing: string[];
    };
    pwd: () => Promise<CommandResult>;
    cd: (target: string) => Promise<CommandResult>;
    ls: (target?: string) => Promise<CommandResult>;
    tree: (target?: string) => Promise<CommandResult>;
    stat: (target: string) => Promise<CommandResult>;
    clear: () => Promise<CommandResult>;
    cat: (target: string) => Promise<CommandResult>;
    touch: (target: string) => Promise<CommandResult>;
    mkdir: (target: string) => Promise<CommandResult>;
    cp: (source: string, dest: string) => Promise<CommandResult>;
    mv: (source: string, dest: string) => Promise<CommandResult>;
    rm: (target: string) => Promise<CommandResult>;
    backend: () => Promise<CommandResult>;
    export: (target?: string, output?: string) => Promise<CommandResult>;
    import: (locationOrBftFile?: string, location?: string) => Promise<CommandResult>;
    exit: () => Promise<CommandResult>;
    help: () => Promise<CommandResult>;
    helpText: () => Promise<string>;
};

/**
 * Register all built-in cli-shell commands on a commander program.
 *
 * Call this after registering your own app-specific commands so that
 * `help` displays everything. Built-in commands include filesystem
 * operations, system commands, and app-config.
 */
declare const registerBuiltinCommands: (program: Command) => void;
/**
 * Generate a default shell welcome message from AppConfig.
 *
 * Output format: `Welcome to <name>. Type "help" for available commands.`
 */
declare const defaultWelcomeMessage: (config?: Pick<AppConfig, "appName" | "appId">) => string;

/** Browser-safe built-ins avoid the Node-backed backend command source. */
declare const builtinCommands: {
    readonly "app-config": AsyncCommandHandler;
    readonly clear: AsyncCommandHandler;
    readonly backend: AsyncCommandHandler;
    readonly exit: AsyncCommandHandler;
    readonly help: AsyncCommandHandler;
    readonly pwd: AsyncCommandHandler;
    readonly cd: AsyncCommandHandler;
    readonly ls: AsyncCommandHandler;
    readonly tree: AsyncCommandHandler;
    readonly stat: AsyncCommandHandler;
    readonly cat: AsyncCommandHandler;
    readonly touch: AsyncCommandHandler;
    readonly mkdir: AsyncCommandHandler;
    readonly cp: AsyncCommandHandler;
    readonly mv: AsyncCommandHandler;
    readonly rm: AsyncCommandHandler;
};

export { AppConfigProvider, type AsyncCommandHandler, BrowserConnectivityService, type CliRuntimeSource, type CommandHandler, type ExtendedCommandOptions, type ExtendedCommandOptionsWithStore, InteractiveShell, type StoreCommandHandler, StoreContext, appCommands, bindCliRuntimeSource, builtinCommands, cli, createCliAppConfig, createDevalboStore, createFilesystemDriver, defaultWelcomeMessage, filesystemCommands, getCliRuntimeStatus, makeError, makeOutput, makeResult, makeResultError, mergeCommands, registerBuiltinCommands, unbindCliRuntimeSource, useAppConfig };
