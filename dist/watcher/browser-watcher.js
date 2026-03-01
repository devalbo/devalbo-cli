import { subscribeBrowserFsEvents } from '../drivers/browser-store';
const normalizePath = (input) => {
    if (input === '' || input === '.')
        return '/';
    return input.startsWith('/') ? input : `/${input}`;
};
const isSamePath = (left, right) => normalizePath(left) === normalizePath(right);
const isWithinDirectory = (targetPath, directoryPath) => {
    const normalizedTarget = normalizePath(targetPath);
    const normalizedDirectory = normalizePath(directoryPath);
    if (normalizedDirectory === '/')
        return normalizedTarget.startsWith('/');
    return normalizedTarget === normalizedDirectory || normalizedTarget.startsWith(`${normalizedDirectory}/`);
};
export class BrowserWatcherService {
    watch(path, callback) {
        return subscribeBrowserFsEvents((event) => {
            if (isWithinDirectory(event.path, path)) {
                callback(event);
            }
        });
    }
    watchFile(path, callback) {
        return subscribeBrowserFsEvents((event) => {
            if (isSamePath(event.path, path) || (event.oldPath != null && isSamePath(event.oldPath, path))) {
                callback(event);
            }
        });
    }
}
//# sourceMappingURL=browser-watcher.js.map