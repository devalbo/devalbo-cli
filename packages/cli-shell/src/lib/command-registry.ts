import { Command } from 'commander';
import type { CommandHandler } from '../commands/_util';
import type { ProgramLike } from '../types/program';

export type CommandMeta = {
  description?: string;
  args?: Array<{ name: string; description?: string; required?: boolean }>;
};

export type CommandRegistryEntry = {
  name: string;
  handler: CommandHandler;
  meta?: CommandMeta;
};

export type CommandRegistry = {
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
export function createCommandRegistry(): CommandRegistry {
  const entries = new Map<string, CommandRegistryEntry>();
  let frozen = false;

  return {
    has(name: string): boolean {
      return entries.has(name);
    },

    register(name: string, handler: CommandHandler, meta?: CommandMeta): void {
      if (frozen) {
        throw new Error(`Cannot register command "${name}": registry is frozen. Register commands in onReady before createApp() resolves.`);
      }
      if (entries.has(name)) {
        throw new Error(`Command already registered: ${name}`);
      }
      const entry: CommandRegistryEntry = { name, handler };
      if (meta !== undefined) entry.meta = meta;
      entries.set(name, entry);
    },

    freeze(): void {
      frozen = true;
    },

    getCommandMap(): Record<string, CommandHandler> {
      const map: Record<string, CommandHandler> = {};
      for (const [name, { handler }] of entries) {
        map[name] = handler;
      }
      return map;
    },

    createProgram(
      appName: string,
      version = '0.0.0',
      description = ''
    ): ProgramLike {
      const program = new Command(appName).version(version);
      if (description) program.description(description);

      for (const [, { name, meta }] of entries) {
        const spec = meta?.args?.length
          ? `${name} ${meta.args.map((a) => (a.required ? `<${a.name}>` : `[${a.name}]`)).join(' ')}`
          : name;
        const cmd = program.command(spec);
        if (meta?.description) cmd.description(meta.description);
      }

      return program as unknown as ProgramLike;
    }
  };
}
