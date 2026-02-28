import type { Store } from 'tinybase';
import { type EditorBufferRow } from '@devalbo-cli/shared';
export declare const getBuffer: (store: Store, id: string) => EditorBufferRow | null;
export declare const setBuffer: (store: Store, id: string, buffer: EditorBufferRow) => void;
export declare const listBuffers: (store: Store) => Array<{
    id: string;
    row: EditorBufferRow;
}>;
export declare const deleteBuffer: (store: Store, id: string) => void;
//# sourceMappingURL=buffers.d.ts.map