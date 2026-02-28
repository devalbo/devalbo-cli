import type { CommandHandler } from './commands/_util';
import type { AppConfig } from '@devalbo-cli/shared';
import type { ReactNode } from 'react';
import type { ProgramLike } from './types/program';
export type CliEntryOptions = {
    commands: Record<string, CommandHandler>;
    createProgram: () => ProgramLike;
    config: AppConfig;
    welcomeMessage: string | ReactNode;
};
export declare function startInteractiveCli(opts: CliEntryOptions): Promise<void>;
//# sourceMappingURL=cli-entry.d.ts.map