import type { FileEntry } from '@devalbo-cli/shared';
export interface FsTreeNode {
    name: string;
    path: string;
    isDirectory: boolean;
    children?: FsTreeNode[];
}
export declare const getDefaultCwd: () => string;
export declare const joinFsPath: (left: string, right: string) => string;
export declare const splitFsPath: (input: string) => string[];
export declare const resolveFsPath: (cwd: string, input?: string) => string;
export declare const changeDir: (cwd: string, requested: string) => Promise<string>;
export declare const listDirectory: (cwd: string, requested?: string) => Promise<FileEntry[]>;
export declare const readTextFile: (cwd: string, requested: string) => Promise<string>;
export declare const readBytesFile: (cwd: string, requested: string) => Promise<Uint8Array>;
export declare const writeTextFile: (cwd: string, requested: string, content: string) => Promise<string>;
export declare const writeBytesFile: (cwd: string, requested: string, data: Uint8Array) => Promise<string>;
export declare const touchFile: (cwd: string, requested: string) => Promise<string>;
export declare const makeDirectory: (cwd: string, requested: string) => Promise<string>;
export declare const removePath: (cwd: string, requested: string) => Promise<string>;
export declare const copyPath: (cwd: string, source: string, dest: string) => Promise<{
    sourcePath: string;
    destPath: string;
}>;
export declare const movePath: (cwd: string, source: string, dest: string) => Promise<{
    sourcePath: string;
    destPath: string;
}>;
export declare const statPath: (cwd: string, requested: string) => Promise<{
    path: string;
    entry: FileEntry;
}>;
export declare const buildTree: (cwd: string, requested?: string) => Promise<FsTreeNode>;
export declare const treeText: (cwd: string, requested?: string) => Promise<string>;
export declare const exportDirectoryAsBft: (cwd: string, sourcePath?: string, outputPath?: string) => Promise<{
    sourcePath: string;
    outputPath?: string;
    json: string;
}>;
export declare const importBftToLocation: (cwd: string, bftFilePath: string, locationName: string) => Promise<{
    bftFilePath: string;
    targetPath: string;
}>;
export declare const importBftTextToLocation: (cwd: string, bftText: string, locationName: string) => Promise<{
    targetPath: string;
}>;
//# sourceMappingURL=filesystem-actions.d.ts.map