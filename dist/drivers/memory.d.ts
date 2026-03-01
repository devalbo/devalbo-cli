import type { DirectoryPath, FileEntry, FilePath } from '@devalbo-cli/shared';
import type { IFilesystemDriver } from '../interfaces';
export declare class InMemoryDriver implements IFilesystemDriver {
    private nodes;
    constructor(seed?: Record<string, string>);
    readFile(filePath: FilePath): Promise<Uint8Array>;
    writeFile(filePath: FilePath, data: Uint8Array): Promise<void>;
    readdir(dirPath: DirectoryPath): Promise<FileEntry[]>;
    stat(filePath: FilePath): Promise<FileEntry>;
    mkdir(dirPath: DirectoryPath): Promise<void>;
    rm(filePath: FilePath): Promise<void>;
    exists(filePath: FilePath): Promise<boolean>;
}
//# sourceMappingURL=memory.d.ts.map