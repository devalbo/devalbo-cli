import type { FilePath } from './branded';
export interface FileEntry {
    name: string;
    path: FilePath;
    isDirectory: boolean;
    size?: number;
    mtime?: Date;
}
export declare enum WatchEventType {
    Created = "created",
    Modified = "modified",
    Deleted = "deleted",
    Moved = "moved"
}
export interface WatchEvent {
    type: WatchEventType;
    path: FilePath;
    oldPath?: FilePath;
    timestamp: Date;
}
//# sourceMappingURL=filesystem.d.ts.map