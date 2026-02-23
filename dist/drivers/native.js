import { promises as fs } from 'node:fs';
import path from 'node:path';
import { unsafeAsFilePath } from '@devalbo-cli/shared';
function toEntry(fullPath, stats) {
    return {
        name: path.basename(fullPath),
        path: unsafeAsFilePath(fullPath),
        isDirectory: stats.isDirectory(),
        size: Number(stats.size),
        mtime: stats.mtime
    };
}
export class NativeFSDriver {
    async readFile(filePath) {
        const buffer = await fs.readFile(filePath);
        return new Uint8Array(buffer);
    }
    async writeFile(filePath, data) {
        await fs.writeFile(filePath, data);
    }
    async readdir(dirPath) {
        const names = await fs.readdir(dirPath);
        return Promise.all(names.map(async (name) => {
            const fullPath = path.join(dirPath, name);
            const stats = await fs.stat(fullPath);
            return toEntry(fullPath, stats);
        }));
    }
    async stat(filePath) {
        const stats = await fs.stat(filePath);
        return toEntry(filePath, stats);
    }
    async mkdir(dirPath) {
        await fs.mkdir(dirPath, { recursive: true });
    }
    async rm(filePath) {
        await fs.rm(filePath, { recursive: true, force: true });
    }
    async exists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        }
        catch {
            return false;
        }
    }
}
//# sourceMappingURL=native.js.map