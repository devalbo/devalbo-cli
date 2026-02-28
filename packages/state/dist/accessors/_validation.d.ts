import type { z } from 'zod';
export declare const safeParseWithWarning: <T>(schema: z.ZodType<T>, value: unknown, table: string, rowId: string, context: "get" | "list") => T | null;
//# sourceMappingURL=_validation.d.ts.map