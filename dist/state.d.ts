import { D as DevalboStore } from './store-Doi5pYJL.js';
export { c as createDevalboStore } from './store-Doi5pYJL.js';
import { Store, Table, Row } from 'tinybase';
import { F as FileTreeRow, E as EditorBufferRow, S as SyncRoot } from './sync-root-BCnMChoN.js';
import { S as SyncRootId, A as AbsolutePath, q as PodETag, g as ContentHash } from './branded-D2eQxo7s.js';
import * as React$1 from 'react';
import { Context, ReactNode } from 'react';
import { A as AppConfig } from './app-config-MGBUKfI7.js';
import 'zod';

declare const FILE_TREE_TABLE = "entries";

declare const EDITOR_BUFFER_TABLE = "buffers";

declare const getEntry: (store: Store, id: string) => FileTreeRow | null;
declare const setEntry: (store: Store, id: string, entry: FileTreeRow) => void;
declare const listEntries: (store: Store) => Array<{
    id: string;
    row: FileTreeRow;
}>;
declare const deleteEntry: (store: Store, id: string) => void;

declare const getBuffer: (store: Store, id: string) => EditorBufferRow | null;
declare const setBuffer: (store: Store, id: string, buffer: EditorBufferRow) => void;
declare const listBuffers: (store: Store) => Array<{
    id: string;
    row: EditorBufferRow;
}>;
declare const deleteBuffer: (store: Store, id: string) => void;

declare const SYNC_ROOTS_TABLE: "sync_roots";
declare const getSyncRoot: (store: Store, id: SyncRootId) => SyncRoot | null;
declare const setSyncRoot: (store: Store, root: SyncRoot) => void;
declare const listSyncRoots: (store: Store) => SyncRoot[];
declare const deleteSyncRoot: (store: Store, id: SyncRootId) => void;

declare const FILE_SYNC_STATE_TABLE: "file_sync_state";
type FileSyncStatus = 'synced' | 'pending_upload' | 'pending_delete' | 'conflict';
type FileSyncStateRow = {
    path: AbsolutePath;
    syncRootId: SyncRootId;
    podEtag: PodETag | null;
    contentHash: ContentHash;
    status: FileSyncStatus;
};
declare const getFileSyncState: (store: Store, path: AbsolutePath) => FileSyncStateRow | null;
declare const setFileSyncState: (store: Store, row: FileSyncStateRow) => void;
declare const deleteFileSyncState: (store: Store, path: AbsolutePath) => void;
declare const listFileSyncStatesForRoot: (store: Store, rootId: SyncRootId) => FileSyncStateRow[];

declare class MemoryPersister {
    private readonly _store;
    constructor(_store: DevalboStore);
    startAutoLoad(): Promise<void>;
    startAutoSave(): Promise<void>;
    stopAutoLoad(): Promise<void>;
    stopAutoSave(): Promise<void>;
}

declare class SqliteBrowserPersister {
    private readonly _store;
    private readonly _dbPath;
    constructor(_store: DevalboStore, _dbPath: string);
    startAutoLoad(): Promise<void>;
    startAutoSave(): Promise<void>;
}

declare class SqliteNodePersister {
    private readonly _store;
    private readonly _dbPath;
    constructor(_store: DevalboStore, _dbPath: string);
    startAutoLoad(): Promise<void>;
    startAutoSave(): Promise<void>;
}

declare const StoreContext: Context<DevalboStore | null>;
declare const useStore: () => DevalboStore;

declare const useTable: (tableId: string) => Table;

declare const useRow: (tableId: string, rowId: string) => Row;

declare const AppConfigContext: React$1.Context<AppConfig | null>;
declare const AppConfigProvider: React.FC<{
    config: AppConfig;
    children: ReactNode;
}>;
declare const useAppConfig: () => AppConfig;

export { AppConfigContext, AppConfigProvider, DevalboStore, EDITOR_BUFFER_TABLE, FILE_SYNC_STATE_TABLE, FILE_TREE_TABLE, type FileSyncStateRow, type FileSyncStatus, MemoryPersister, SYNC_ROOTS_TABLE, SqliteBrowserPersister, SqliteNodePersister, StoreContext, deleteBuffer, deleteEntry, deleteFileSyncState, deleteSyncRoot, getBuffer, getEntry, getFileSyncState, getSyncRoot, listBuffers, listEntries, listFileSyncStatesForRoot, listSyncRoots, setBuffer, setEntry, setFileSyncState, setSyncRoot, useAppConfig, useRow, useStore, useTable };
