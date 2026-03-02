import { S as SyncRootId, D as DirectoryPath, P as PodUrl, W as WebId } from './branded-D2eQxo7s.js';
import { z } from 'zod';

interface FileTreeRow {
    path: string;
    name: string;
    parentPath: string;
    isDirectory: boolean;
    size: number;
    mtime: string;
}
interface EditorBufferRow {
    path: string;
    content: string;
    isDirty: boolean;
    cursorLine: number;
    cursorCol: number;
}

declare const SyncRootSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<SyncRootId, string>>;
    label: z.ZodString;
    localPath: z.ZodPipe<z.ZodString, z.ZodTransform<DirectoryPath, string>>;
    podUrl: z.ZodPipe<z.ZodString, z.ZodTransform<PodUrl, string>>;
    webId: z.ZodPipe<z.ZodString, z.ZodTransform<WebId, string>>;
    readonly: z.ZodBoolean;
    enabled: z.ZodBoolean;
}, z.core.$strip>;
type SyncRoot = z.infer<typeof SyncRootSchema>;

export { type EditorBufferRow as E, type FileTreeRow as F, type SyncRoot as S, SyncRootSchema as a };
