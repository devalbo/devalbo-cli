import type { AppConfig } from '@devalbo-cli/shared';
import type { ProgramLike } from './types/program';
import type { CommandRegistry } from './lib/command-registry';
import { filesystemCommands } from './commands/filesystem';
import { systemCommands } from './commands/system';
import { appCommands } from './commands/app';

const BUILTIN_META: Record<string, { description: string; args?: Array<{ name: string; description: string; required?: boolean }> }> = {
  pwd: { description: 'Print working directory' },
  cd: { description: 'Change directory', args: [{ name: 'path', description: 'Directory path', required: true }] },
  ls: { description: 'List directory contents', args: [{ name: 'path', description: 'Path', required: false }] },
  tree: { description: 'Show directory tree', args: [{ name: 'path', description: 'Path', required: false }] },
  cat: { description: 'Display file contents', args: [{ name: 'file', description: 'File path', required: true }] },
  touch: { description: 'Create empty file', args: [{ name: 'file', description: 'File path', required: true }] },
  mkdir: { description: 'Create directory', args: [{ name: 'dir', description: 'Directory path', required: true }] },
  cp: { description: 'Copy file or directory', args: [{ name: 'src', description: 'Source', required: true }, { name: 'dest', description: 'Destination', required: true }] },
  mv: { description: 'Move/rename file or directory', args: [{ name: 'src', description: 'Source', required: true }, { name: 'dest', description: 'Destination', required: true }] },
  rm: { description: 'Remove file or directory', args: [{ name: 'path', description: 'Path', required: true }] },
  stat: { description: 'Show file/directory info', args: [{ name: 'path', description: 'Path', required: true }] },
  clear: { description: 'Clear terminal' },
  backend: { description: 'Show filesystem backend info' },
  exit: { description: 'Exit the shell' },
  help: { description: 'Show available commands' },
  'app-config': { description: 'Show current app configuration' }
};

/**
 * Register all built-in commands into a command registry.
 * When `skipExisting` is true (default), commands already in the registry are
 * not overwritten — this lets app commands registered in `onReady` take
 * precedence over builtins.
 */
export function registerBuiltinCommandsToRegistry(registry: CommandRegistry, skipExisting = true): void {
  const all = { ...filesystemCommands, ...systemCommands, ...appCommands };
  for (const [name, handler] of Object.entries(all)) {
    if (skipExisting && registry.has(name)) continue;
    const meta = BUILTIN_META[name];
    registry.register(name, handler, meta);
  }
}

/**
 * Register all built-in cli-shell commands on a commander program.
 *
 * Call this after registering your own app-specific commands so that
 * `help` displays everything. Built-in commands include filesystem
 * operations, system commands, and app-config.
 */
export const registerBuiltinCommands = (program: ProgramLike): void => {
  // Filesystem
  program.command('pwd').description('Print working directory');
  program.command('cd <path>').description('Change directory');
  program.command('ls [path]').description('List directory contents');
  program.command('tree [path]').description('Show directory tree');
  program.command('cat <file>').description('Display file contents');
  program.command('touch <file>').description('Create empty file');
  program.command('mkdir <dir>').description('Create directory');
  program.command('cp <src> <dest>').description('Copy file or directory');
  program.command('mv <src> <dest>').description('Move/rename file or directory');
  program.command('rm <path>').description('Remove file or directory');
  program.command('stat <path>').description('Show file/directory info');

  // System
  program.command('clear').description('Clear terminal');
  program.command('backend').description('Show filesystem backend info');
  program.command('exit').description('Exit the shell');
  program.command('help').description('Show available commands');

  // App
  program.command('app-config').description('Show current app configuration');
};

/**
 * Generate a default shell welcome message from AppConfig.
 *
 * Output format: `Welcome to <name>. Type "help" for available commands.`
 */
export const defaultWelcomeMessage = (config?: Pick<AppConfig, 'appName' | 'appId'>): string => {
  const name = config?.appName ?? config?.appId ?? 'CLI shell';
  return `Welcome to ${name}. Type "help" for available commands.`;
};
