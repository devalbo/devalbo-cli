import { type CatArgsInput, type CdArgsInput, type CpArgsInput, type LsArgsInput, type MkdirArgsInput, type MvArgsInput, type RmArgsInput, type StatArgsInput, type TouchArgsInput, type TreeArgsInput } from './filesystem-args.schema';
type ParseResult<T> = {
    success: true;
    value: T;
} | {
    success: false;
    error: string;
};
export type CpArgs = CpArgsInput;
export type CdArgs = CdArgsInput;
export type LsArgs = LsArgsInput;
export type TreeArgs = TreeArgsInput;
export type StatArgs = StatArgsInput;
export type CatArgs = CatArgsInput;
export type TouchArgs = TouchArgsInput;
export type MkdirArgs = MkdirArgsInput;
export type RmArgs = RmArgsInput;
export type MvArgs = MvArgsInput;
export declare const parseCpArgs: (args: string[]) => ParseResult<CpArgs>;
export declare const parseCdArgs: (args: string[]) => ParseResult<CdArgs>;
export declare const parseLsArgs: (args: string[]) => ParseResult<LsArgs>;
export declare const parseTreeArgs: (args: string[]) => ParseResult<TreeArgs>;
export declare const parseStatArgs: (args: string[]) => ParseResult<StatArgs>;
export declare const parseCatArgs: (args: string[]) => ParseResult<CatArgs>;
export declare const parseTouchArgs: (args: string[]) => ParseResult<TouchArgs>;
export declare const parseMkdirArgs: (args: string[]) => ParseResult<MkdirArgs>;
export declare const parseRmArgs: (args: string[]) => ParseResult<RmArgs>;
export declare const parseMvArgs: (args: string[]) => ParseResult<MvArgs>;
export {};
//# sourceMappingURL=filesystem-args.parser.d.ts.map