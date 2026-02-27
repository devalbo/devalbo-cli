import { createStore, type Store } from 'tinybase';

export const createDevalboStore = (): Store => {
  const store = createStore();

  store.setTablesSchema({
    entries: {
      path: { type: 'string' },
      name: { type: 'string' },
      parentPath: { type: 'string' },
      isDirectory: { type: 'boolean' },
      size: { type: 'number' },
      mtime: { type: 'string' }
    },
    buffers: {
      path: { type: 'string' },
      content: { type: 'string' },
      isDirty: { type: 'boolean' },
      cursorLine: { type: 'number' },
      cursorCol: { type: 'number' }
    },
    sync_roots: {
      label: { type: 'string' },
      localPath: { type: 'string' },
      podUrl: { type: 'string' },
      webId: { type: 'string' },
      readonly: { type: 'boolean' },
      enabled: { type: 'boolean' }
    },
    file_sync_state: {
      path: { type: 'string' },
      syncRootId: { type: 'string' },
      podEtag: { type: 'string' },
      contentHash: { type: 'string' },
      status: { type: 'string' }
    }
  });

  return store;
};

export type DevalboStore = Store;
