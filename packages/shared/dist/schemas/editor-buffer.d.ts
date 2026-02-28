import { z } from 'zod';
export declare const EditorBufferRowSchema: z.ZodObject<{
    path: z.ZodString;
    content: z.ZodString;
    isDirty: z.ZodBoolean;
    cursorLine: z.ZodNumber;
    cursorCol: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=editor-buffer.d.ts.map