import React$1, { ReactNode, Context } from 'react';
import { Store } from 'tinybase';
import { Effect } from 'effect';
import * as effect_Cause from 'effect/Cause';
import * as effect_Types from 'effect/Types';

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

declare const MissingArgument_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "MissingArgument";
} & Readonly<A>;
declare class MissingArgument extends MissingArgument_base<{
    argName: string;
    message: string;
    defaultValue?: string;
}> {
}

declare const withValidation: <A>(validate: Effect.Effect<A, MissingArgument>, onSuccess: (value: A) => ReactNode, onMissingArg: (error: MissingArgument) => ReactNode) => CommandResult;

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

declare const createDevalboStore: () => Store;
type DevalboStore = Store;

declare const StoreContext: Context<DevalboStore | null>;

declare const AppConfigProvider: React.FC<{
    config: AppConfig;
    children: ReactNode;
}>;
declare const useAppConfig: () => AppConfig;

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

declare const InteractiveShell: React$1.FC<{
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
type FilePreviewHandler = React$1.ComponentType<FilePreviewProps>;
type FileEditHandler = React$1.ComponentType<FileEditProps>;
interface MimeTypeHandler {
    preview?: FilePreviewHandler;
    edit?: FileEditHandler;
    viewEdit?: FileEditHandler;
}

declare const registerMimeTypeHandler: (pattern: string, handler: MimeTypeHandler) => void;

declare const filesystemCommands: Record<'pwd' | 'cd' | 'ls' | 'tree' | 'stat' | 'cat' | 'touch' | 'mkdir' | 'cp' | 'mv' | 'rm', AsyncCommandHandler>;

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
    App: React$1.FC<{
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
declare function ShellRuntimeProvider({ value, bindToCli, children }: ShellRuntimeProviderProps): React$1.ReactElement;

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

export { AppConfigProvider, type AsyncCommandHandler, BrowserConnectivityService, type CliRuntimeSource, type CommandHandler, type CommandMeta, type CommandRegistry, type CommandRegistryEntry, type CreateAppOptions, type CreateAppResult, type EditArgs, type FileEditProps as EditProps, type ExtendedCommandOptions, type ExtendedCommandOptionsWithStore, InteractiveShell, type MimeTypeHandler, type NavigateArgs, type FilePreviewProps as PreviewProps, ShellRuntimeProvider, type StoreCommandHandler, StoreContext, appCommands, bindCliRuntimeSource, builtinCommands, cli, createApp, createCliAppConfig, createCommandRegistry, createDevalboStore, createFilesystemDriver, defaultWelcomeMessage, filesystemCommands, getCliRuntimeStatus, makeError, makeOutput, makeResult, makeResultError, mergeCommands, registerBuiltinCommands, registerBuiltinCommandsToRegistry, unbindCliRuntimeSource, useAppConfig, useShellRuntime, useValidParse, validateEditArgs, validateNavigateArgs, withValidation };
