import type { DirectoryPath, FileEntry, FilePath } from '@devalbo-cli/shared';
import type { IFilesystemDriver } from '../interfaces';
export declare class ZenFSDriver implements IFilesystemDriver {
    readFile(_path: FilePath): Promise<Uint8Array>;
    writeFile(_path: FilePath, _data: Uint8Array): Promise<void>;
    readdir(_path: DirectoryPath): Promise<FileEntry[]>;
    stat(_path: FilePath): Promise<FileEntry>;
    mkdir(_path: DirectoryPath): Promise<void>;
    rm(_path: FilePath): Promise<void>;
    exists(_path: FilePath): Promise<boolean>;
}
//# sourceMappingURL=zenfs.d.ts.map