import type { Store } from 'tinybase';
import { type SyncRoot, type SyncRootId } from '@devalbo-cli/shared';
export declare const SYNC_ROOTS_TABLE: "sync_roots";
export declare const getSyncRoot: (store: Store, id: SyncRootId) => SyncRoot | null;
export declare const setSyncRoot: (store: Store, root: SyncRoot) => void;
export declare const listSyncRoots: (store: Store) => SyncRoot[];
export declare const deleteSyncRoot: (store: Store, id: SyncRootId) => void;
//# sourceMappingURL=sync-roots.d.ts.map