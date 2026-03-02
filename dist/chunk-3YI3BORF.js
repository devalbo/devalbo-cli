import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);
import {
  createStore
} from "./chunk-NPBGEVU6.js";
import {
  EditorBufferRowSchema,
  FileTreeRowSchema,
  SyncRootSchema,
  unsafeAsContentHash
} from "./chunk-LFJ2WG2S.js";

// packages/state/src/store.ts
var createDevalboStore = () => {
  const store = createStore();
  store.setTablesSchema({
    entries: {
      path: { type: "string" },
      name: { type: "string" },
      parentPath: { type: "string" },
      isDirectory: { type: "boolean" },
      size: { type: "number" },
      mtime: { type: "string" }
    },
    buffers: {
      path: { type: "string" },
      content: { type: "string" },
      isDirty: { type: "boolean" },
      cursorLine: { type: "number" },
      cursorCol: { type: "number" }
    },
    sync_roots: {
      label: { type: "string" },
      localPath: { type: "string" },
      podUrl: { type: "string" },
      webId: { type: "string" },
      readonly: { type: "boolean" },
      enabled: { type: "boolean" }
    },
    file_sync_state: {
      path: { type: "string" },
      syncRootId: { type: "string" },
      podEtag: { type: "string" },
      contentHash: { type: "string" },
      status: { type: "string" }
    }
  });
  return store;
};

// packages/state/src/schemas/file-tree.ts
var FILE_TREE_TABLE = "entries";

// packages/state/src/schemas/editor-buffer.ts
var EDITOR_BUFFER_TABLE = "buffers";

// packages/state/src/accessors/entries.ts
var getEntry = (store, id) => {
  const row = store.getRow(FILE_TREE_TABLE, id);
  if (row == null) return null;
  const parsed = FileTreeRowSchema.safeParse(row);
  return parsed.success ? parsed.data : null;
};
var setEntry = (store, id, entry) => {
  const parsed = FileTreeRowSchema.parse(entry);
  store.setRow(FILE_TREE_TABLE, id, parsed);
};
var listEntries = (store) => {
  const table = store.getTable(FILE_TREE_TABLE);
  if (!table) return [];
  return Object.entries(table).flatMap(([id, row]) => {
    const parsed = FileTreeRowSchema.safeParse(row);
    return parsed.success ? [{ id, row: parsed.data }] : [];
  });
};
var deleteEntry = (store, id) => {
  store.delRow(FILE_TREE_TABLE, id);
};

// packages/state/src/accessors/buffers.ts
var getBuffer = (store, id) => {
  const row = store.getRow(EDITOR_BUFFER_TABLE, id);
  if (row == null) return null;
  const parsed = EditorBufferRowSchema.safeParse(row);
  return parsed.success ? parsed.data : null;
};
var setBuffer = (store, id, buffer) => {
  const parsed = EditorBufferRowSchema.parse(buffer);
  store.setRow(EDITOR_BUFFER_TABLE, id, parsed);
};
var listBuffers = (store) => {
  const table = store.getTable(EDITOR_BUFFER_TABLE);
  if (!table) return [];
  return Object.entries(table).flatMap(([id, row]) => {
    const parsed = EditorBufferRowSchema.safeParse(row);
    return parsed.success ? [{ id, row: parsed.data }] : [];
  });
};
var deleteBuffer = (store, id) => {
  store.delRow(EDITOR_BUFFER_TABLE, id);
};

// packages/state/src/accessors/sync-roots.ts
var SYNC_ROOTS_TABLE = "sync_roots";
var getSyncRoot = (store, id) => {
  if (!store.hasRow(SYNC_ROOTS_TABLE, id)) return null;
  const row = store.getRow(SYNC_ROOTS_TABLE, id);
  const parsed = SyncRootSchema.safeParse({ id, ...row });
  return parsed.success ? parsed.data : null;
};
var setSyncRoot = (store, root) => {
  const parsed = SyncRootSchema.parse(root);
  const { id, ...row } = parsed;
  store.setRow(SYNC_ROOTS_TABLE, id, row);
};
var listSyncRoots = (store) => {
  const table = store.getTable(SYNC_ROOTS_TABLE);
  if (!table) return [];
  return Object.entries(table).flatMap(([id, row]) => {
    const parsed = SyncRootSchema.safeParse({ id, ...row });
    return parsed.success ? [parsed.data] : [];
  });
};
var deleteSyncRoot = (store, id) => {
  store.delRow(SYNC_ROOTS_TABLE, id);
};

// packages/state/src/accessors/file-sync-state.ts
var FILE_SYNC_STATE_TABLE = "file_sync_state";
var isFileSyncStatus = (value) => value === "synced" || value === "pending_upload" || value === "pending_delete" || value === "conflict";
var parseRow = (path, row) => {
  const syncRootId = row.syncRootId;
  const podEtagValue = row.podEtag;
  const contentHash = row.contentHash;
  const status = row.status;
  if (typeof syncRootId !== "string") return null;
  if (typeof contentHash !== "string") return null;
  if (!isFileSyncStatus(status)) return null;
  return {
    path,
    syncRootId,
    podEtag: typeof podEtagValue === "string" && podEtagValue.length > 0 ? podEtagValue : null,
    contentHash: unsafeAsContentHash(contentHash),
    status
  };
};
var getFileSyncState = (store, path) => {
  if (!store.hasRow(FILE_SYNC_STATE_TABLE, path)) return null;
  const row = store.getRow(FILE_SYNC_STATE_TABLE, path);
  return parseRow(path, row);
};
var setFileSyncState = (store, row) => {
  store.setRow(FILE_SYNC_STATE_TABLE, row.path, {
    path: row.path,
    syncRootId: row.syncRootId,
    podEtag: row.podEtag ?? "",
    contentHash: row.contentHash,
    status: row.status
  });
};
var deleteFileSyncState = (store, path) => {
  store.delRow(FILE_SYNC_STATE_TABLE, path);
};
var listFileSyncStatesForRoot = (store, rootId) => {
  const table = store.getTable(FILE_SYNC_STATE_TABLE);
  if (!table) return [];
  return Object.entries(table).flatMap(([path, row]) => {
    if (row.syncRootId !== rootId) return [];
    const parsed = parseRow(path, row);
    return parsed ? [parsed] : [];
  });
};

// packages/state/src/persisters/memory.ts
var MemoryPersister = class {
  constructor(_store) {
    this._store = _store;
  }
  async startAutoLoad() {
  }
  async startAutoSave() {
  }
  async stopAutoLoad() {
  }
  async stopAutoSave() {
  }
};

// packages/state/src/persisters/sqlite-browser.ts
var SqliteBrowserPersister = class {
  constructor(_store, _dbPath) {
    this._store = _store;
    this._dbPath = _dbPath;
  }
  async startAutoLoad() {
    throw new Error("SQLite browser persister is not implemented yet");
  }
  async startAutoSave() {
    throw new Error("SQLite browser persister is not implemented yet");
  }
};

// packages/state/src/persisters/sqlite-node.ts
var SqliteNodePersister = class {
  constructor(_store, _dbPath) {
    this._store = _store;
    this._dbPath = _dbPath;
  }
  async startAutoLoad() {
    throw new Error("SQLite node persister is not implemented yet");
  }
  async startAutoSave() {
    throw new Error("SQLite node persister is not implemented yet");
  }
};

// packages/state/src/hooks/use-store.ts
import { createContext, useContext } from "react";
var StoreContext = createContext(null);
var useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("StoreContext is not available");
  }
  return store;
};

// packages/state/src/hooks/use-table.ts
import { useEffect, useState } from "react";
var useTable = (tableId) => {
  const store = useStore();
  const [table, setTable] = useState(() => store.getTable(tableId));
  useEffect(() => {
    setTable(store.getTable(tableId));
    const listenerId = store.addTableListener(tableId, () => {
      setTable(store.getTable(tableId));
    });
    return () => {
      store.delListener(listenerId);
    };
  }, [store, tableId]);
  return table;
};

// packages/state/src/hooks/use-row.ts
import { useEffect as useEffect2, useState as useState2 } from "react";
var useRow = (tableId, rowId) => {
  const store = useStore();
  const [row, setRow] = useState2(() => store.getRow(tableId, rowId));
  useEffect2(() => {
    setRow(store.getRow(tableId, rowId));
    const listenerId = store.addRowListener(tableId, rowId, () => {
      setRow(store.getRow(tableId, rowId));
    });
    return () => {
      store.delListener(listenerId);
    };
  }, [rowId, store, tableId]);
  return row;
};

// packages/state/src/hooks/use-app-config.tsx
import { createContext as createContext2, useContext as useContext2 } from "react";
import { jsx } from "react/jsx-runtime";
var AppConfigContext = createContext2(null);
var AppConfigProvider = ({ config, children }) => /* @__PURE__ */ jsx(AppConfigContext.Provider, { value: config, children });
var useAppConfig = () => {
  const ctx = useContext2(AppConfigContext);
  if (!ctx) throw new Error("useAppConfig must be used inside AppConfigProvider");
  return ctx;
};

export {
  createDevalboStore,
  FILE_TREE_TABLE,
  EDITOR_BUFFER_TABLE,
  getEntry,
  setEntry,
  listEntries,
  deleteEntry,
  getBuffer,
  setBuffer,
  listBuffers,
  deleteBuffer,
  SYNC_ROOTS_TABLE,
  getSyncRoot,
  setSyncRoot,
  listSyncRoots,
  deleteSyncRoot,
  FILE_SYNC_STATE_TABLE,
  getFileSyncState,
  setFileSyncState,
  deleteFileSyncState,
  listFileSyncStatesForRoot,
  MemoryPersister,
  SqliteBrowserPersister,
  SqliteNodePersister,
  StoreContext,
  useStore,
  useTable,
  useRow,
  AppConfigContext,
  AppConfigProvider,
  useAppConfig
};
