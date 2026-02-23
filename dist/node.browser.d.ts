import type { DirectoryPath, FileEntry, FilePath, WatchEvent } from '@devalbo-cli/shared';
import type { IFilesystemDriver, IWatcherService } from './interfaces';
export declare class NativeFSDriver implements IFilesystemDriver {
    private unsupported;
    readFile(_path: FilePath): Promise<Uint8Array>;
    writeFile(_path: FilePath, _data: Uint8Array): Promise<void>;
    readdir(_path: DirectoryPath): Promise<FileEntry[]>;
    stat(_path: FilePath): Promise<FileEntry>;
    mkdir(_path: DirectoryPath): Promise<void>;
    rm(_path: FilePath): Promise<void>;
    exists(_path: FilePath): Promise<boolean>;
}
declare class NoopWatcher implements IWatcherService {
    watch(_path: DirectoryPath, _callback: (event: WatchEvent) => void): () => void;
    watchFile(_path: FilePath, _callback: (event: WatchEvent) => void): () => void;
}
export declare class NodeWatcherService extends NoopWatcher {
}
export declare class PollingWatcherService extends NoopWatcher {
}
export {};
//# sourceMappingURL=node.browser.d.ts.map