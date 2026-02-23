import { type DirectoryPath, type FileEntry, type FilePath, type WatchEvent } from '@devalbo-cli/shared';
import type { IFilesystemDriver } from '../interfaces';
export declare const FS_STORAGE_KEY = "naveditor.fs.v1";
export interface BrowserBackendInfo {
    adapter: 'browser-store';
    persistence: 'opfs' | 'indexeddb' | 'localStorage';
}
type BrowserFsListener = (event: WatchEvent) => void;
export declare const subscribeBrowserFsEvents: (listener: BrowserFsListener) => (() => void);
export declare class BrowserStoreFSDriver implements IFilesystemDriver {
    private store;
    private persister;
    private initPromise;
    private persistenceMode;
    private hasStoreListener;
    constructor();
    private rowForPath;
    private setDirectoryRow;
    private ensureDirectoryPath;
    private ensureStoreListener;
    private init;
    private load;
    private save;
    readFile(path: FilePath): Promise<Uint8Array>;
    writeFile(path: FilePath, data: Uint8Array): Promise<void>;
    readdir(path: DirectoryPath): Promise<FileEntry[]>;
    stat(path: FilePath): Promise<FileEntry>;
    mkdir(path: DirectoryPath): Promise<void>;
    rm(path: FilePath): Promise<void>;
    exists(path: FilePath): Promise<boolean>;
    getBackendInfo(): Promise<BrowserBackendInfo>;
}
export declare const toFilePath: (path: string) => FilePath;
export declare const toDirectoryPath: (path: string) => DirectoryPath;
export {};
//# sourceMappingURL=browser-store.d.ts.map