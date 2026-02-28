import type { CommandHandler } from '@devalbo-cli/shared';
import { CommandRegistry } from './registry';
export declare const createConsoleBridge: (commandsOrRegistry: Record<string, CommandHandler> | CommandRegistry) => {
    exec: (input: string, args?: string[]) => import("@devalbo-cli/shared").CommandResult;
    help: (appName?: string) => string;
    list: () => string[];
};
//# sourceMappingURL=console-bridge.d.ts.map