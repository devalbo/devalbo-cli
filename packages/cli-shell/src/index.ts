import { filesystemCommands as _fs } from './commands/filesystem';
import { systemCommands as _sys } from './commands/system';
import { appCommands as _app } from './commands/app';

export { InteractiveShell } from './components/InteractiveShell';
export { BrowserShellProvider } from './components/BrowserShellProvider';
export { ShellContext, useShell } from './components/ShellContext';
export { TerminalShellProvider } from './components/TerminalShellProvider';

export type {
  AsyncCommandHandler,
  StoreCommandHandler,
  CommandHandler,
  ExtendedCommandOptions,
  ExtendedCommandOptionsWithStore
} from './commands/_util';
export type { ProgramLike, ProgramCommandLike, ProgramArgumentLike } from './types/program';
export { makeOutput, makeError, makeResult, makeResultError, mergeCommands } from './commands/_util';

export { filesystemCommands } from './commands/filesystem';
export { systemCommands } from './commands/system';
export { appCommands } from './commands/app';
export { registerBuiltinCommands, defaultWelcomeMessage } from './program-helpers';

/** All built-in commands combined: filesystem + system + app. */
export const builtinCommands = { ..._fs, ..._sys, ..._app } as const;

export {
  parseCommandLine,
  buildCommandOptions,
  executeCommand,
  executeCommandRaw,
  type CommandRuntimeContext
} from './lib/command-runtime';

export {
  bindCliRuntimeSource,
  unbindCliRuntimeSource,
  getCliRuntimeStatus,
  cli,
  type CliRuntimeSource
} from './web/console-helpers';

export { startInteractiveCli, type CliEntryOptions } from './cli-entry';

export { createApp, type CreateAppOptions, type CreateAppResult } from './create-app';
export { ShellRuntimeProvider, useShellRuntime, ShellRuntimeContext } from './context/ShellRuntimeContext';
export { createCommandRegistry, type CommandRegistry, type CommandMeta, type CommandRegistryEntry } from './lib/command-registry';
export { registerBuiltinCommandsToRegistry } from './program-helpers';

export { withValidation } from './commands/with-validation';
export { validateEditArgs, validateNavigateArgs } from './lib/validate-args';
export type { EditArgs, NavigateArgs } from './lib/validate-args';

/** Handler prop types for MIME type preview/edit components. Re-exported from @devalbo-cli/ui. */
export type {
  FilePreviewProps as PreviewProps,
  FileEditProps as EditProps,
  MimeTypeHandler
} from '@devalbo-cli/ui';

export { useValidParse } from './hooks/use-valid-parse';

export { createCliAppConfig } from '@devalbo-cli/shared';

export {
  buildTree,
  changeDir,
  copyPath,
  exportDirectoryAsBft,
  getDefaultCwd,
  importBftTextToLocation,
  importBftToLocation,
  joinFsPath,
  listDirectory,
  makeDirectory,
  movePath,
  readBytesFile,
  readTextFile,
  removePath,
  resolveFsPath,
  splitFsPath,
  statPath,
  touchFile,
  treeText,
  writeBytesFile,
  writeTextFile,
  type FsTreeNode
} from './lib/filesystem-actions';

export {
  getDriver,
  getFilesystemBackendInfo,
  getWatcher
} from './lib/file-operations';
