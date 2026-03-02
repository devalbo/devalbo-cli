import { I as IFilesystemDriver, a as IWatcherService } from './index-CzSam8TC.js';
export { F as FilesystemBackendInfo, c as createFilesystemDriver, g as getFilesystemBackendInfo } from './index-CzSam8TC.js';
import { F as FilePath, D as DirectoryPath } from './branded-D2eQxo7s.js';
import { F as FileEntry, W as WatchEvent } from './filesystem-BbmJFc5d.js';
export { b as WatchEventType } from './filesystem-BbmJFc5d.js';
import 'zod';

declare class InMemoryDriver implements IFilesystemDriver {
    private nodes;
    constructor(seed?: Record<string, string>);
    readFile(filePath: FilePath): Promise<Uint8Array>;
    writeFile(filePath: FilePath, data: Uint8Array): Promise<void>;
    readdir(dirPath: DirectoryPath): Promise<FileEntry[]>;
    stat(filePath: FilePath): Promise<FileEntry>;
    mkdir(dirPath: DirectoryPath): Promise<void>;
    rm(filePath: FilePath): Promise<void>;
    exists(filePath: FilePath): Promise<boolean>;
}

declare class ZenFSDriver implements IFilesystemDriver {
    readFile(_path: FilePath): Promise<Uint8Array>;
    writeFile(_path: FilePath, _data: Uint8Array): Promise<void>;
    readdir(_path: DirectoryPath): Promise<FileEntry[]>;
    stat(_path: FilePath): Promise<FileEntry>;
    mkdir(_path: DirectoryPath): Promise<void>;
    rm(_path: FilePath): Promise<void>;
    exists(_path: FilePath): Promise<boolean>;
}

declare const FS_STORAGE_KEY = "naveditor.fs.v1";
interface BrowserBackendInfo {
    adapter: 'browser-store';
    persistence: 'opfs' | 'indexeddb' | 'localStorage';
}
type BrowserFsListener = (event: WatchEvent) => void;
declare const subscribeBrowserFsEvents: (listener: BrowserFsListener) => (() => void);
declare class BrowserStoreFSDriver implements IFilesystemDriver {
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
declare const toFilePath: (path: string) => FilePath;
declare const toDirectoryPath: (path: string) => DirectoryPath;

declare const createWatcherService: () => Promise<IWatcherService>;

declare class BrowserWatcherService implements IWatcherService {
    watch(path: DirectoryPath, callback: (event: WatchEvent) => void): () => void;
    watchFile(path: FilePath, callback: (event: WatchEvent) => void): () => void;
}

export { type BrowserBackendInfo, BrowserStoreFSDriver, BrowserWatcherService, FS_STORAGE_KEY, IFilesystemDriver, IWatcherService, InMemoryDriver, ZenFSDriver, createWatcherService, subscribeBrowserFsEvents, toDirectoryPath, toFilePath };
