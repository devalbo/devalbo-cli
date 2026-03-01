import type { DirectoryPath, FilePath, WatchEvent } from '@devalbo-cli/shared';
import type { IWatcherService } from '../interfaces';
export declare class PollingWatcherService implements IWatcherService {
    watch(path: DirectoryPath, callback: (event: WatchEvent) => void): () => void;
    watchFile(path: FilePath, callback: (event: WatchEvent) => void): () => void;
}
//# sourceMappingURL=polling-watcher.d.ts.map