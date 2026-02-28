import { RuntimePlatform } from '@devalbo-cli/shared';
import type { IFilesystemDriver } from './interfaces';
export * from './interfaces';
export * from './drivers/memory';
export * from './drivers/zenfs';
export * from './drivers/browser-store';
export * from './watcher/events';
export * from './watcher/service';
export * from './watcher/browser-watcher';
export type FilesystemBackendInfo = {
    platform: RuntimePlatform;
    adapter: 'native-node' | 'tauri' | 'browser-store';
    persistence?: 'opfs' | 'indexeddb' | 'localStorage';
    baseDir?: string;
};
export declare const createFilesystemDriver: () => Promise<IFilesystemDriver>;
export declare const getFilesystemBackendInfo: () => Promise<FilesystemBackendInfo>;
//# sourceMappingURL=index.d.ts.map