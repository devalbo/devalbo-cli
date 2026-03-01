import { watch } from 'node:fs';
import path from 'node:path';
import { unsafeAsFilePath, WatchEventType } from '@devalbo-cli/shared';
export class NodeWatcherService {
    watch(target, callback) {
        const watcher = watch(target, (_eventType, filename) => {
            if (!filename)
                return;
            callback({
                type: WatchEventType.Modified,
                path: unsafeAsFilePath(path.join(target, filename.toString())),
                timestamp: new Date()
            });
        });
        return () => watcher.close();
    }
    watchFile(target, callback) {
        const watcher = watch(target, () => {
            callback({
                type: WatchEventType.Modified,
                path: target,
                timestamp: new Date()
            });
        });
        return () => watcher.close();
    }
}
//# sourceMappingURL=node-watcher.js.map