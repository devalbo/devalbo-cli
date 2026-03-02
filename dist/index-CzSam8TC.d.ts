import { F as FileEntry, W as WatchEvent, R as RuntimePlatform } from './filesystem-BbmJFc5d.js';
import { F as FilePath, D as DirectoryPath } from './branded-D2eQxo7s.js';

interface IFilesystemDriver {
    readFile(path: FilePath): Promise<Uint8Array>;
    writeFile(path: FilePath, data: Uint8Array): Promise<void>;
    readdir(path: DirectoryPath): Promise<FileEntry[]>;
    stat(path: FilePath): Promise<FileEntry>;
    mkdir(path: DirectoryPath): Promise<void>;
    rm(path: FilePath): Promise<void>;
    exists(path: FilePath): Promise<boolean>;
}
interface IWatcherService {
    watch(path: DirectoryPath, callback: (event: WatchEvent) => void): () => void;
    watchFile(path: FilePath, callback: (event: WatchEvent) => void): () => void;
}

type FilesystemBackendInfo = {
    platform: RuntimePlatform;
    adapter: 'native-node' | 'tauri' | 'browser-store';
    persistence?: 'opfs' | 'indexeddb' | 'localStorage';
    baseDir?: string;
};
declare const createFilesystemDriver: () => Promise<IFilesystemDriver>;
declare const getFilesystemBackendInfo: () => Promise<FilesystemBackendInfo>;

export { type FilesystemBackendInfo as F, type IFilesystemDriver as I, type IWatcherService as a, createFilesystemDriver as c, getFilesystemBackendInfo as g };
