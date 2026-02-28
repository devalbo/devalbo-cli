import { z } from 'zod';
export declare const FileTreeRowSchema: z.ZodObject<{
    path: z.ZodString;
    name: z.ZodString;
    parentPath: z.ZodString;
    isDirectory: z.ZodBoolean;
    size: z.ZodNumber;
    mtime: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=file-tree.d.ts.map