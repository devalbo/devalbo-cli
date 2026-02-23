import { promises as fs } from 'node:fs';
import { unsafeAsFilePath, WatchEventType } from '@devalbo-cli/shared';
export class PollingWatcherService {
    watch(path, callback) {
        const interval = setInterval(async () => {
            try {
                await fs.readdir(path);
                callback({ type: WatchEventType.Modified, path: unsafeAsFilePath(path), timestamp: new Date() });
            }
            catch {
                callback({ type: WatchEventType.Deleted, path: unsafeAsFilePath(path), timestamp: new Date() });
            }
        }, 1500);
        return () => clearInterval(interval);
    }
    watchFile(path, callback) {
        const interval = setInterval(async () => {
            try {
                await fs.stat(path);
                callback({ type: WatchEventType.Modified, path, timestamp: new Date() });
            }
            catch {
                callback({ type: WatchEventType.Deleted, path, timestamp: new Date() });
            }
        }, 1500);
        return () => clearInterval(interval);
    }
}
//# sourceMappingURL=polling-watcher.js.map