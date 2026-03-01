import { detectPlatform, RuntimePlatform } from '@devalbo-cli/shared';
import { BrowserWatcherService } from './browser-watcher';
export const createWatcherService = async () => {
    const env = detectPlatform();
    if (env.platform === RuntimePlatform.NodeJS) {
        const { NodeWatcherService } = await import(/* @vite-ignore */ '@devalbo-cli/filesystem/node');
        return new NodeWatcherService();
    }
    return new BrowserWatcherService();
};
//# sourceMappingURL=service.js.map