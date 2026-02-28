import { RuntimePlatform } from '@devalbo-cli/shared';
import type { IWatcherService } from './interfaces';
import type { IFilesystemDriver } from './interfaces';
export * from './interfaces';
export * from './drivers/memory';
export * from './drivers/zenfs';
export * from './drivers/browser-store';
export * from './watcher/events';
export * from './watcher/browser-watcher';
export type FilesystemBackendInfo = {
    platform: RuntimePlatform;
    adapter: 'browser-store';
    persistence?: 'opfs' | 'indexeddb' | 'localStorage';
    baseDir?: string;
};
export declare const createWatcherService: () => IWatcherService;
export declare const createFilesystemDriver: () => Promise<IFilesystemDriver>;
export declare const getFilesystemBackendInfo: () => Promise<FilesystemBackendInfo>;
//# sourceMappingURL=browser.d.ts.map