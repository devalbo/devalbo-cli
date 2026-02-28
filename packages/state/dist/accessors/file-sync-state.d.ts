import type { Store } from 'tinybase';
import type { AbsolutePath, ContentHash, PodETag, SyncRootId } from '@devalbo-cli/shared';
export declare const FILE_SYNC_STATE_TABLE: "file_sync_state";
export type FileSyncStatus = 'synced' | 'pending_upload' | 'pending_delete' | 'conflict';
export type FileSyncStateRow = {
    path: AbsolutePath;
    syncRootId: SyncRootId;
    podEtag: PodETag | null;
    contentHash: ContentHash;
    status: FileSyncStatus;
};
export declare const getFileSyncState: (store: Store, path: AbsolutePath) => FileSyncStateRow | null;
export declare const setFileSyncState: (store: Store, row: FileSyncStateRow) => void;
export declare const deleteFileSyncState: (store: Store, path: AbsolutePath) => void;
export declare const listFileSyncStatesForRoot: (store: Store, rootId: SyncRootId) => FileSyncStateRow[];
//# sourceMappingURL=file-sync-state.d.ts.map