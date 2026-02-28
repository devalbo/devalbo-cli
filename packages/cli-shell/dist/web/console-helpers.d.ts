import type { CommandResult } from '@devalbo-cli/shared';
import { type CommandRuntimeContext } from '../lib/command-runtime';
export type CliRuntimeSource = {
    getContext: () => CommandRuntimeContext | null;
};
export declare const bindCliRuntimeSource: (source: CliRuntimeSource) => void;
export declare const unbindCliRuntimeSource: () => void;
export declare const getCliRuntimeStatus: () => {
    ready: boolean;
    missing: string[];
};
declare function exec(commandName: string, args?: string[], cwdOverride?: string): Promise<CommandResult>;
declare function execRaw(raw: string, cwdOverride?: string): Promise<CommandResult>;
declare function execText(commandName: string, args?: string[], cwdOverride?: string): Promise<{
    text: string;
    error: string | null;
}>;
export declare const cli: {
    exec: typeof exec;
    execRaw: typeof execRaw;
    execText: typeof execText;
    status: () => {
        ready: boolean;
        missing: string[];
    };
    pwd: () => Promise<CommandResult>;
    cd: (target: string) => Promise<CommandResult>;
    ls: (target?: string) => Promise<CommandResult>;
    tree: (target?: string) => Promise<CommandResult>;
    stat: (target: string) => Promise<CommandResult>;
    clear: () => Promise<CommandResult>;
    cat: (target: string) => Promise<CommandResult>;
    touch: (target: string) => Promise<CommandResult>;
    mkdir: (target: string) => Promise<CommandResult>;
    cp: (source: string, dest: string) => Promise<CommandResult>;
    mv: (source: string, dest: string) => Promise<CommandResult>;
    rm: (target: string) => Promise<CommandResult>;
    backend: () => Promise<CommandResult>;
    export: (target?: string, output?: string) => Promise<CommandResult>;
    import: (locationOrBftFile?: string, location?: string) => Promise<CommandResult>;
    exit: () => Promise<CommandResult>;
    help: () => Promise<CommandResult>;
    helpText: () => Promise<string>;
};
export {};
//# sourceMappingURL=console-helpers.d.ts.map