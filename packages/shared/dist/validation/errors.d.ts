declare const MissingArgument_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => import("effect/Cause").YieldableError & {
    readonly _tag: "MissingArgument";
} & Readonly<A>;
export declare class MissingArgument extends MissingArgument_base<{
    argName: string;
    message: string;
    defaultValue?: string;
}> {
}
declare const FileNotFound_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => import("effect/Cause").YieldableError & {
    readonly _tag: "FileNotFound";
} & Readonly<A>;
export declare class FileNotFound extends FileNotFound_base<{
    path: string;
    message: string;
}> {
}
export {};
//# sourceMappingURL=errors.d.ts.map