import path from 'node:path';
import { unsafeAsFilePath } from '@devalbo-cli/shared';
export class InMemoryDriver {
    nodes = new Map();
    constructor(seed = {}) {
        this.nodes.set('/', { data: new Uint8Array(), isDirectory: true, mtime: new Date() });
        for (const [filePath, content] of Object.entries(seed)) {
            this.nodes.set(filePath, { data: new TextEncoder().encode(content), isDirectory: false, mtime: new Date() });
        }
    }
    async readFile(filePath) {
        const node = this.nodes.get(filePath);
        if (!node || node.isDirectory) {
            throw new Error(`File not found: ${filePath}`);
        }
        return node.data;
    }
    async writeFile(filePath, data) {
        this.nodes.set(filePath, { data, isDirectory: false, mtime: new Date() });
    }
    async readdir(dirPath) {
        const prefix = dirPath.endsWith('/') ? dirPath : `${dirPath}/`;
        const entries = [];
        for (const [nodePath, node] of this.nodes.entries()) {
            if (!nodePath.startsWith(prefix) || nodePath === dirPath)
                continue;
            const rel = nodePath.slice(prefix.length);
            if (rel.includes('/'))
                continue;
            entries.push({
                name: path.basename(nodePath),
                path: unsafeAsFilePath(nodePath),
                isDirectory: node.isDirectory,
                size: node.data.length,
                mtime: node.mtime
            });
        }
        return entries;
    }
    async stat(filePath) {
        const node = this.nodes.get(filePath);
        if (!node) {
            throw new Error(`Path not found: ${filePath}`);
        }
        return {
            name: path.basename(filePath),
            path: unsafeAsFilePath(filePath),
            isDirectory: node.isDirectory,
            size: node.data.length,
            mtime: node.mtime
        };
    }
    async mkdir(dirPath) {
        this.nodes.set(dirPath, { data: new Uint8Array(), isDirectory: true, mtime: new Date() });
    }
    async rm(filePath) {
        this.nodes.delete(filePath);
    }
    async exists(filePath) {
        return this.nodes.has(filePath);
    }
}
//# sourceMappingURL=memory.js.map