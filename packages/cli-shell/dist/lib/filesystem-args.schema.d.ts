import { z } from 'zod';
export declare const PathTokenSchema: z.ZodString;
export declare const CdArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, z.core.$strip>;
export declare const LsArgsSchema: z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const TreeArgsSchema: z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const StatArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, z.core.$strip>;
export declare const CatArgsSchema: z.ZodObject<{
    file: z.ZodString;
}, z.core.$strip>;
export declare const TouchArgsSchema: z.ZodObject<{
    file: z.ZodString;
}, z.core.$strip>;
export declare const MkdirArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, z.core.$strip>;
export declare const RmArgsSchema: z.ZodObject<{
    path: z.ZodString;
}, z.core.$strip>;
export declare const CpArgsSchema: z.ZodObject<{
    source: z.ZodString;
    dest: z.ZodString;
}, z.core.$strip>;
export declare const MvArgsSchema: z.ZodObject<{
    source: z.ZodString;
    dest: z.ZodString;
}, z.core.$strip>;
export type CpArgsInput = z.infer<typeof CpArgsSchema>;
export type MvArgsInput = z.infer<typeof MvArgsSchema>;
export type CdArgsInput = z.infer<typeof CdArgsSchema>;
export type LsArgsInput = z.infer<typeof LsArgsSchema>;
export type TreeArgsInput = z.infer<typeof TreeArgsSchema>;
export type StatArgsInput = z.infer<typeof StatArgsSchema>;
export type CatArgsInput = z.infer<typeof CatArgsSchema>;
export type TouchArgsInput = z.infer<typeof TouchArgsSchema>;
export type MkdirArgsInput = z.infer<typeof MkdirArgsSchema>;
export type RmArgsInput = z.infer<typeof RmArgsSchema>;
//# sourceMappingURL=filesystem-args.schema.d.ts.map