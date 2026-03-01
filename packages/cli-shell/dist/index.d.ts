export { InteractiveShell } from './components/InteractiveShell';
export { BrowserShellProvider } from './components/BrowserShellProvider';
export { ShellContext, useShell } from './components/ShellContext';
export { TerminalShellProvider } from './components/TerminalShellProvider';
export type { AsyncCommandHandler, StoreCommandHandler, CommandHandler, ExtendedCommandOptions, ExtendedCommandOptionsWithStore } from './commands/_util';
export type { ProgramLike, ProgramCommandLike, ProgramArgumentLike } from './types/program';
export { makeOutput, makeError, makeResult, makeResultError, mergeCommands } from './commands/_util';
export { filesystemCommands } from './commands/filesystem';
export { systemCommands } from './commands/system';
export { appCommands } from './commands/app';
export { registerBuiltinCommands, defaultWelcomeMessage } from './program-helpers';
/** All built-in commands combined: filesystem + system + app. */
export declare const builtinCommands: {
    readonly "app-config": import(".").AsyncCommandHandler;
    readonly exit: import(".").AsyncCommandHandler;
    readonly clear: import(".").AsyncCommandHandler;
    readonly backend: import(".").AsyncCommandHandler;
    readonly help: import(".").AsyncCommandHandler;
    readonly pwd: import(".").AsyncCommandHandler;
    readonly cd: import(".").AsyncCommandHandler;
    readonly ls: import(".").AsyncCommandHandler;
    readonly tree: import(".").AsyncCommandHandler;
    readonly stat: import(".").AsyncCommandHandler;
    readonly cat: import(".").AsyncCommandHandler;
    readonly touch: import(".").AsyncCommandHandler;
    readonly mkdir: import(".").AsyncCommandHandler;
    readonly cp: import(".").AsyncCommandHandler;
    readonly mv: import(".").AsyncCommandHandler;
    readonly rm: import(".").AsyncCommandHandler;
};
export { parseCommandLine, buildCommandOptions, executeCommand, executeCommandRaw, type CommandRuntimeContext } from './lib/command-runtime';
export { bindCliRuntimeSource, unbindCliRuntimeSource, getCliRuntimeStatus, cli, type CliRuntimeSource } from './web/console-helpers';
export { startInteractiveCli, type CliEntryOptions } from './cli-entry';
export { createApp, type CreateAppOptions, type CreateAppResult } from './create-app';
export { ShellRuntimeProvider, useShellRuntime, ShellRuntimeContext } from './context/ShellRuntimeContext';
export { createCommandRegistry, type CommandRegistry, type CommandMeta, type CommandRegistryEntry } from './lib/command-registry';
export { registerBuiltinCommandsToRegistry } from './program-helpers';
export { withValidation } from './commands/with-validation';
export { validateEditArgs, validateNavigateArgs } from './lib/validate-args';
export type { EditArgs, NavigateArgs } from './lib/validate-args';
/** Handler prop types for MIME type preview/edit components. Re-exported from @devalbo-cli/ui. */
export type { FilePreviewProps as PreviewProps, FileEditProps as EditProps, MimeTypeHandler } from '@devalbo-cli/ui';
export { useValidParse } from './hooks/use-valid-parse';
export { createCliAppConfig } from '@devalbo-cli/shared';
export { buildTree, changeDir, copyPath, exportDirectoryAsBft, getDefaultCwd, importBftTextToLocation, importBftToLocation, joinFsPath, listDirectory, makeDirectory, movePath, readBytesFile, readTextFile, removePath, resolveFsPath, splitFsPath, statPath, touchFile, treeText, writeBytesFile, writeTextFile, type FsTreeNode } from './lib/filesystem-actions';
export { getDriver, getFilesystemBackendInfo, getWatcher } from './lib/file-operations';
//# sourceMappingURL=index.d.ts.map