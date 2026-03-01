import { filesystemCommands } from '@devalbo-cli/cli-shell/commands/filesystem';
import { appCommands } from '@devalbo-cli/cli-shell/commands/app';
import { systemCommandsBrowser } from './system-commands.browser';

export { InteractiveShell } from '@devalbo-cli/cli-shell/components/InteractiveShell';
export {
  bindCliRuntimeSource,
  unbindCliRuntimeSource,
  getCliRuntimeStatus,
  cli,
  type CliRuntimeSource
} from '@devalbo-cli/cli-shell/web/console-helpers';

export type {
  CommandHandler,
  AsyncCommandHandler,
  StoreCommandHandler,
  ExtendedCommandOptions,
  ExtendedCommandOptionsWithStore
} from '@devalbo-cli/cli-shell/commands/_util';

export {
  makeOutput,
  makeError,
  makeResult,
  makeResultError,
  mergeCommands
} from '@devalbo-cli/cli-shell/commands/_util';

export { filesystemCommands };
export { appCommands };
export { registerBuiltinCommands, defaultWelcomeMessage, registerBuiltinCommandsToRegistry } from '@devalbo-cli/cli-shell/program-helpers';
export {
  createApp,
  ShellRuntimeProvider,
  useShellRuntime,
  createCommandRegistry,
  withValidation,
  validateEditArgs,
  validateNavigateArgs,
  useValidParse
} from '@devalbo-cli/cli-shell';

export type {
  CreateAppOptions,
  CreateAppResult,
  CommandRegistry,
  CommandMeta,
  CommandRegistryEntry,
  PreviewProps,
  EditProps,
  MimeTypeHandler,
  EditArgs,
  NavigateArgs
} from '@devalbo-cli/cli-shell';

/** Browser-safe built-ins avoid the Node-backed backend command source. */
export const builtinCommands = { ...filesystemCommands, ...systemCommandsBrowser, ...appCommands } as const;

export { createCliAppConfig } from '@devalbo-cli/shared';

export {
  createDevalboStore,
  AppConfigProvider,
  useAppConfig,
  StoreContext
} from '@devalbo-cli/state';

export { createFilesystemDriver } from '@devalbo-cli/filesystem';

export { BrowserConnectivityService } from '@devalbo-cli/shared';
