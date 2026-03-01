import type { DirectoryPath, FilePath, WatchEvent } from '@devalbo-cli/shared';
import type { IWatcherService } from '../interfaces';
export declare class NodeWatcherService implements IWatcherService {
    watch(target: DirectoryPath, callback: (event: WatchEvent) => void): () => void;
    watchFile(target: FilePath, callback: (event: WatchEvent) => void): () => void;
}
//# sourceMappingURL=node-watcher.d.ts.map