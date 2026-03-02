import React__default from 'react';
import * as effect_Cause from 'effect/Cause';
import * as effect_Types from 'effect/Types';

interface CommandResult {
    component: React__default.ReactNode;
    error?: string;
    data?: unknown;
    status?: 'ok' | 'error';
}
interface CommandOptions {
    interactive?: boolean;
    onComplete?: () => void;
}

declare const MissingArgument_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "MissingArgument";
} & Readonly<A>;
declare class MissingArgument extends MissingArgument_base<{
    argName: string;
    message: string;
    defaultValue?: string;
}> {
}
declare const FileNotFound_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "FileNotFound";
} & Readonly<A>;
declare class FileNotFound extends FileNotFound_base<{
    path: string;
    message: string;
}> {
}

export { type CommandOptions as C, FileNotFound as F, MissingArgument as M, type CommandResult as a };
