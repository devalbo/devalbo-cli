import { Effect } from 'effect';
import { M as MissingArgument, a as CommandResult, C as CommandOptions } from './errors-Jkwy0AU7.js';
import * as React from 'react';
import React__default, { ReactNode } from 'react';
import { A as AppConfig } from './app-config-MGBUKfI7.js';
import { D as DevalboStore, c as createDevalboStore } from './store-Doi5pYJL.js';
import { I as IFilesystemDriver, c as createFilesystemDriver, a as IWatcherService } from './index-CzSam8TC.js';
import { I as IConnectivityService, F as FileEntry } from './filesystem-BbmJFc5d.js';
import { Store } from 'tinybase';

declare const withValidation: <A>(validate: Effect.Effect<A, MissingArgument>, onSuccess: (value: A) => ReactNode, onMissingArg: (error: MissingArgument) => ReactNode) => CommandResult;

type ProgramArgumentLike = {
    required?: boolean;
    name: () => string;
};
type ProgramCommandLike = {
    name: () => string;
    description: () => string;
    registeredArguments?: readonly ProgramArgumentLike[];
};
type ProgramLike = {
    command: (spec: string) => {
        description: (text: string) => unknown;
    };
    name: () => string;
    description: () => string;
    commands: readonly ProgramCommandLike[];
};

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

declare const InteractiveShell: React__default.FC<{
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

interface ShellContextValue {
    isCommandRunning: boolean;
    startCommand: () => void;
    endCommand: () => void;
}
declare const ShellContext: React.Context<ShellContextValue | null>;
declare const useShell: () => ShellContextValue;

declare const BrowserShellProvider: React__default.FC<{
    children: React__default.ReactNode;
}>;

declare const TerminalShellProvider: React__default.FC<{
    children: React__default.ReactNode;
}>;

type FileContent = string | Uint8Array;
interface FileHandlerBaseProps {
    path: string;
    mimeType: string;
}
interface FilePreviewProps extends FileHandlerBaseProps {
    content: FileContent;
}
interface FileEditProps extends FileHandlerBaseProps {
    content: FileContent;
    onSave: (nextContent: FileContent) => Promise<void> | void;
    onChange?: (nextContent: FileContent) => void;
}
type FilePreviewHandler = React__default.ComponentType<FilePreviewProps>;
type FileEditHandler = React__default.ComponentType<FileEditProps>;
interface MimeTypeHandler {
    preview?: FilePreviewHandler;
    edit?: FileEditHandler;
    viewEdit?: FileEditHandler;
}
interface ResolvedMimeTypeHandler extends MimeTypeHandler {
    pattern: string;
}

declare const registerMimeTypeHandler: (pattern: string, handler: MimeTypeHandler) => void;
declare const resolveMimeTypeHandler: (mimeType: string) => ResolvedMimeTypeHandler | null;
declare const listMimeTypeHandlers: () => Array<ResolvedMimeTypeHandler>;

declare const filesystemCommands: Record<'pwd' | 'cd' | 'ls' | 'tree' | 'stat' | 'cat' | 'touch' | 'mkdir' | 'cp' | 'mv' | 'rm', AsyncCommandHandler>;

declare const systemCommands: Record<'clear' | 'backend' | 'exit' | 'help', AsyncCommandHandler>;

declare const appCommands: Record<'app-config', AsyncCommandHandler>;

type CommandMeta = {
    description?: string;
    args?: Array<{
        name: string;
        description?: string;
        required?: boolean;
    }>;
};
type CommandRegistryEntry = {
    name: string;
    handler: CommandHandler;
    meta?: CommandMeta;
};
type CommandRegistry = {
    /** Check whether a command name is already registered. */
    has: (name: string) => boolean;
    register: (name: string, handler: CommandHandler, meta?: CommandMeta) => void;
    getCommandMap: () => Record<string, CommandHandler>;
    createProgram: (appName: string, version?: string, description?: string) => ProgramLike;
    /** Prevent further registrations. Subsequent register() calls throw. */
    freeze: () => void;
};
/**
 * Creates a command registry. Use register() to add commands, getCommandMap() for
 * the shell, and createProgram() to build a Commander program for help output.
 */
declare function createCommandRegistry(): CommandRegistry;

/**
 * Register all built-in commands into a command registry.
 * When `skipExisting` is true (default), commands already in the registry are
 * not overwritten — this lets app commands registered in `onReady` take
 * precedence over builtins.
 */
declare function registerBuiltinCommandsToRegistry(registry: CommandRegistry, skipExisting?: boolean): void;
/**
 * Register all built-in cli-shell commands on a commander program.
 *
 * Call this after registering your own app-specific commands so that
 * `help` displays everything. Built-in commands include filesystem
 * operations, system commands, and app-config.
 */
declare const registerBuiltinCommands: (program: ProgramLike) => void;
/**
 * Generate a default shell welcome message from AppConfig.
 *
 * Output format: `Welcome to <name>. Type "help" for available commands.`
 */
declare const defaultWelcomeMessage: (config?: Pick<AppConfig, "appName" | "appId">) => string;

type CommandRuntimeContext = {
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
declare const parseCommandLine: (raw: string) => {
    commandName: string;
    args: string[];
};
declare const buildCommandOptions: (ctx: CommandRuntimeContext) => ExtendedCommandOptions;
declare const executeCommand: (commandName: string, args: string[], ctx: CommandRuntimeContext | null) => Promise<CommandResult>;
declare const executeCommandRaw: (raw: string, ctx: CommandRuntimeContext | null) => Promise<CommandResult>;

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

type CliEntryOptions = {
    commands: Record<string, CommandHandler>;
    createProgram: () => ProgramLike;
    config: AppConfig;
    welcomeMessage: string | ReactNode;
};
declare function startInteractiveCli(opts: CliEntryOptions): Promise<void>;

type CreateAppOptions = {
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
type CreateAppResult = {
    store: ReturnType<typeof createDevalboStore>;
    driver: Awaited<ReturnType<typeof createFilesystemDriver>>;
    App: React__default.FC<{
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
declare function createApp(options: CreateAppOptions): Promise<CreateAppResult>;

type ShellRuntimeContextValue = CommandRuntimeContext | null;
declare const ShellRuntimeContext: React__default.Context<ShellRuntimeContextValue>;
declare function useShellRuntime(): ShellRuntimeContextValue;
type ShellRuntimeProviderProps = {
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
declare function ShellRuntimeProvider({ value, bindToCli, children }: ShellRuntimeProviderProps): React__default.ReactElement;

interface NavigateArgs {
    path: string;
}
interface EditArgs {
    file: string;
}
declare const validateNavigateArgs: (args: string[]) => Effect.Effect<NavigateArgs, MissingArgument>;
declare const validateEditArgs: (args: string[]) => Effect.Effect<EditArgs, MissingArgument>;

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
declare function useValidParse<T>(source: string | Uint8Array, parse: (src: string | Uint8Array) => T | Promise<T>): {
    validDoc: T | null;
    parseError: string | null;
};

interface FsTreeNode {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: FsTreeNode[];
}
declare const getDefaultCwd: () => string;
declare const joinFsPath: (left: string, right: string) => string;
declare const splitFsPath: (input: string) => string[];
declare const resolveFsPath: (cwd: string, input?: string) => string;
declare const changeDir: (cwd: string, requested: string) => Promise<string>;
declare const listDirectory: (cwd: string, requested?: string) => Promise<FileEntry[]>;
declare const readTextFile: (cwd: string, requested: string) => Promise<string>;
declare const readBytesFile: (cwd: string, requested: string) => Promise<Uint8Array>;
declare const writeTextFile: (cwd: string, requested: string, content: string) => Promise<string>;
declare const writeBytesFile: (cwd: string, requested: string, data: Uint8Array) => Promise<string>;
declare const touchFile: (cwd: string, requested: string) => Promise<string>;
declare const makeDirectory: (cwd: string, requested: string) => Promise<string>;
declare const removePath: (cwd: string, requested: string) => Promise<string>;
declare const copyPath: (cwd: string, source: string, dest: string) => Promise<{
    sourcePath: string;
    destPath: string;
}>;
declare const movePath: (cwd: string, source: string, dest: string) => Promise<{
    sourcePath: string;
    destPath: string;
}>;
declare const statPath: (cwd: string, requested: string) => Promise<{
    path: string;
    entry: FileEntry;
}>;
declare const buildTree: (cwd: string, requested?: string) => Promise<FsTreeNode>;
declare const treeText: (cwd: string, requested?: string) => Promise<string>;
declare const exportDirectoryAsBft: (cwd: string, sourcePath?: string, outputPath?: string) => Promise<{
    sourcePath: string;
    outputPath?: string;
    json: string;
}>;
declare const importBftToLocation: (cwd: string, bftFilePath: string, locationName: string) => Promise<{
    bftFilePath: string;
    targetPath: string;
}>;
declare const importBftTextToLocation: (cwd: string, bftText: string, locationName: string) => Promise<{
    targetPath: string;
}>;

declare const getDriver: () => Promise<IFilesystemDriver>;
declare const getWatcher: () => Promise<IWatcherService>;

export { makeResult as $, type AsyncCommandHandler as A, BrowserShellProvider as B, type CliEntryOptions as C, defaultWelcomeMessage as D, type EditArgs as E, type FileEditProps as F, executeCommand as G, executeCommandRaw as H, InteractiveShell as I, exportDirectoryAsBft as J, filesystemCommands as K, getCliRuntimeStatus as L, type MimeTypeHandler as M, type NavigateArgs as N, getDefaultCwd as O, type ProgramArgumentLike as P, getDriver as Q, getWatcher as R, ShellContext as S, TerminalShellProvider as T, importBftTextToLocation as U, importBftToLocation as V, joinFsPath as W, listDirectory as X, makeDirectory as Y, makeError as Z, makeOutput as _, type CliRuntimeSource as a, makeResultError as a0, mergeCommands as a1, movePath as a2, parseCommandLine as a3, readBytesFile as a4, readTextFile as a5, registerBuiltinCommands as a6, registerBuiltinCommandsToRegistry as a7, removePath as a8, resolveFsPath as a9, splitFsPath as aa, startInteractiveCli as ab, statPath as ac, systemCommands as ad, touchFile as ae, treeText as af, unbindCliRuntimeSource as ag, useShell as ah, useShellRuntime as ai, useValidParse as aj, validateEditArgs as ak, validateNavigateArgs as al, withValidation as am, writeBytesFile as an, writeTextFile as ao, listMimeTypeHandlers as ap, registerMimeTypeHandler as aq, resolveMimeTypeHandler as ar, type CommandHandler as b, type CommandMeta as c, type CommandRegistry as d, type CommandRegistryEntry as e, type CommandRuntimeContext as f, type CreateAppOptions as g, type CreateAppResult as h, type ExtendedCommandOptions as i, type ExtendedCommandOptionsWithStore as j, type FsTreeNode as k, type FilePreviewProps as l, type ProgramCommandLike as m, type ProgramLike as n, ShellRuntimeContext as o, ShellRuntimeProvider as p, type StoreCommandHandler as q, appCommands as r, bindCliRuntimeSource as s, buildCommandOptions as t, buildTree as u, changeDir as v, cli as w, copyPath as x, createApp as y, createCommandRegistry as z };
