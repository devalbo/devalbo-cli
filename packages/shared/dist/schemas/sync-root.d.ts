import { z } from 'zod';
export declare const SyncRootSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<import("..").SyncRootId, string>>;
    label: z.ZodString;
    localPath: z.ZodPipe<z.ZodString, z.ZodTransform<import("..").DirectoryPath, string>>;
    podUrl: z.ZodPipe<z.ZodString, z.ZodTransform<import("..").PodUrl, string>>;
    webId: z.ZodPipe<z.ZodString, z.ZodTransform<import("..").WebId, string>>;
    readonly: z.ZodBoolean;
    enabled: z.ZodBoolean;
}, z.core.$strip>;
export type SyncRoot = z.infer<typeof SyncRootSchema>;
//# sourceMappingURL=sync-root.d.ts.map