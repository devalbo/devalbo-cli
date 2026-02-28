import type { CommandDefinition } from './types';
export declare class CommandRegistry {
    private readonly commands;
    register(command: CommandDefinition): this;
    get(name: string): CommandDefinition | undefined;
    list(): CommandDefinition[];
    listFlattened(prefix?: string): Array<{
        path: string;
        command: CommandDefinition;
    }>;
    getHelp(appName?: string): string;
}
//# sourceMappingURL=registry.d.ts.map