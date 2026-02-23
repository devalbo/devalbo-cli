import type { DirectoryPath, FilePath, WatchEvent } from '@devalbo-cli/shared';
import type { IWatcherService } from '../interfaces';
export declare class BrowserWatcherService implements IWatcherService {
    watch(path: DirectoryPath, callback: (event: WatchEvent) => void): () => void;
    watchFile(path: FilePath, callback: (event: WatchEvent) => void): () => void;
}
//# sourceMappingURL=browser-watcher.d.ts.map