import type React from 'react';
export interface CommandResult {
    component: React.ReactNode;
    error?: string;
    data?: unknown;
    status?: 'ok' | 'error';
}
export interface CommandOptions {
    interactive?: boolean;
    onComplete?: () => void;
}
export type CommandHandler = (args: string[], options?: CommandOptions) => CommandResult;
//# sourceMappingURL=commands.d.ts.map