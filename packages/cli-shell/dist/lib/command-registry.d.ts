import type { CommandHandler } from '../commands/_util';
import type { ProgramLike } from '../types/program';
export type CommandMeta = {
    description?: string;
    args?: Array<{
        name: string;
        description?: string;
        required?: boolean;
    }>;
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
export declare function createCommandRegistry(): CommandRegistry;
//# sourceMappingURL=command-registry.d.ts.map