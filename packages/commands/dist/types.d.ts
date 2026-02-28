import type { CommandHandler } from '@devalbo-cli/shared';
export interface CommandArgument {
    name: string;
    required?: boolean;
}
export interface CommandDefinition {
    name: string;
    description: string;
    arguments?: CommandArgument[];
    handler: CommandHandler;
    subcommands?: CommandDefinition[];
}
//# sourceMappingURL=types.d.ts.map