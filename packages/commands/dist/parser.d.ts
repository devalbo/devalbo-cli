import type { CommandDefinition } from './types';
import type { CommandRegistry } from './registry';
export interface ParsedCommand {
    fullName: string;
    path: string[];
    name: string;
    args: string[];
}
export interface ResolvedCommand extends ParsedCommand {
    command: CommandDefinition;
}
export declare const parseCommand: (input: string | string[]) => ParsedCommand;
export declare const resolveCommand: (registry: CommandRegistry, input: string | string[]) => ResolvedCommand | undefined;
//# sourceMappingURL=parser.d.ts.map