export class NativeFSDriver {
    unsupported() {
        throw new Error('NativeFSDriver is not available in browser builds');
    }
    readFile(_path) {
        return Promise.reject(this.unsupported());
    }
    writeFile(_path, _data) {
        return Promise.reject(this.unsupported());
    }
    readdir(_path) {
        return Promise.reject(this.unsupported());
    }
    stat(_path) {
        return Promise.reject(this.unsupported());
    }
    mkdir(_path) {
        return Promise.reject(this.unsupported());
    }
    rm(_path) {
        return Promise.reject(this.unsupported());
    }
    exists(_path) {
        return Promise.reject(this.unsupported());
    }
}
class NoopWatcher {
    watch(_path, _callback) {
        return () => { };
    }
    watchFile(_path, _callback) {
        return () => { };
    }
}
export class NodeWatcherService extends NoopWatcher {
}
export class PollingWatcherService extends NoopWatcher {
}
//# sourceMappingURL=node.browser.js.map