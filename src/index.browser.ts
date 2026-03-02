/**
 * Browser entry: full public API (same as main) with browser-safe builtin commands.
 */
import { filesystemCommands } from '@devalbo-cli/cli-shell/commands/filesystem';
import { appCommands } from '@devalbo-cli/cli-shell/commands/app';
import { systemCommandsBrowser } from './system-commands.browser';

export * from '@devalbo-cli/shared';
export * from '@devalbo-cli/state';
export * from '@devalbo-cli/filesystem';
export * from '@devalbo-cli/cli-shell';

export {
  Spinner,
  useKeyboard,
  MarkdownEdit,
  MarkdownView,
  MarkdownViewEdit,
  registerDefaultMimeTypeHandlers,
  registerMimeTypeHandler,
  listMimeTypeHandlers,
  resolveMimeTypeHandler
} from '@devalbo-cli/ui';

/** Browser-safe built-ins (no Node-backed system commands). */
export const builtinCommands = { ...filesystemCommands, ...systemCommandsBrowser, ...appCommands } as const;
