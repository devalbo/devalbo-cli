import { z } from 'zod';
declare const BftTextNodeSchema: z.ZodObject<{
    type: z.ZodLiteral<"text">;
    content: z.ZodString;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const BftBinaryNodeSchema: z.ZodObject<{
    type: z.ZodLiteral<"binary">;
    encoding: z.ZodLiteral<"base64">;
    content: z.ZodString;
    comment: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BftTextNode = z.infer<typeof BftTextNodeSchema>;
export type BftBinaryNode = z.infer<typeof BftBinaryNodeSchema>;
export interface BftDirectoryNode {
    type: 'directory';
    entries: Record<string, BftNode>;
    comment?: string | undefined;
}
export type BftNode = BftTextNode | BftBinaryNode | BftDirectoryNode;
export declare const isUtf8Text: (bytes: Uint8Array) => boolean;
export declare const bytesToBftNode: (bytes: Uint8Array) => BftTextNode | BftBinaryNode;
export declare const bftNodeToBytes: (node: BftTextNode | BftBinaryNode) => Uint8Array;
export declare const parseBftJson: (text: string) => BftDirectoryNode;
export declare const stringifyBft: (node: BftDirectoryNode) => string;
export declare const sortedEntries: (entries: Record<string, BftNode>) => Array<[string, BftNode]>;
export {};
//# sourceMappingURL=bft-transfer.d.ts.map