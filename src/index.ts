/**
 * Main entry: re-export full public API so consumers can use
 * import { X } from 'devalbo-cli' without Vite/tsconfig aliases into packages/*.
 * Order: shared, state, filesystem, cli-shell. Conflicting names re-exported explicitly below.
 */

export * from '@devalbo-cli/shared';
export * from '@devalbo-cli/state';
export * from '@devalbo-cli/filesystem';
export * from '@devalbo-cli/cli-shell';

/** UI / MIME components not re-exported from cli-shell barrel */
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
