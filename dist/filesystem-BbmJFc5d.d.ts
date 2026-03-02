import { F as FilePath } from './branded-D2eQxo7s.js';

declare enum RuntimePlatform {
    NodeJS = "nodejs",
    Browser = "browser",
    Worker = "worker",
    Tauri = "tauri"
}
interface RuntimeEnv {
    platform: RuntimePlatform;
    hasSharedArrayBuffer: boolean;
    hasOPFS: boolean;
    hasFSWatch: boolean;
}
interface IConnectivityService {
    isOnline(): boolean;
    onOnline(callback: () => void): () => void;
}
declare class AlwaysOnlineConnectivityService implements IConnectivityService {
    isOnline(): boolean;
    onOnline(): () => void;
}
declare class BrowserConnectivityService implements IConnectivityService {
    isOnline(): boolean;
    onOnline(callback: () => void): () => void;
}

interface FileEntry {
    name: string;
    path: FilePath;
    isDirectory: boolean;
    size?: number;
    mtime?: Date;
}
declare enum WatchEventType {
    Created = "created",
    Modified = "modified",
    Deleted = "deleted",
    Moved = "moved"
}
interface WatchEvent {
    type: WatchEventType;
    path: FilePath;
    oldPath?: FilePath;
    timestamp: Date;
}

export { AlwaysOnlineConnectivityService as A, BrowserConnectivityService as B, type FileEntry as F, type IConnectivityService as I, RuntimePlatform as R, type WatchEvent as W, type RuntimeEnv as a, WatchEventType as b };
