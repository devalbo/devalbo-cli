import { type DirectoryPath, type FileEntry, type FilePath } from '@devalbo-cli/shared';
import type { IFilesystemDriver } from '../interfaces';
export declare class TauriFSDriver implements IFilesystemDriver {
    private baseDirPromise;
    private getBaseDir;
    private toRealPath;
    private toFileEntry;
    readFile(filePath: FilePath): Promise<Uint8Array>;
    writeFile(filePath: FilePath, data: Uint8Array): Promise<void>;
    readdir(dirPath: DirectoryPath): Promise<FileEntry[]>;
    stat(filePath: FilePath): Promise<FileEntry>;
    mkdir(dirPath: DirectoryPath): Promise<void>;
    rm(filePath: FilePath): Promise<void>;
    exists(filePath: FilePath): Promise<boolean>;
    getBackendInfo(): Promise<{
        adapter: 'tauri';
        baseDir: string;
    }>;
}
//# sourceMappingURL=tauri.d.ts.map