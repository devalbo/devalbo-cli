export declare enum RuntimePlatform {
    NodeJS = "nodejs",
    Browser = "browser",
    Worker = "worker",
    Tauri = "tauri"
}
export interface RuntimeEnv {
    platform: RuntimePlatform;
    hasSharedArrayBuffer: boolean;
    hasOPFS: boolean;
    hasFSWatch: boolean;
}
export interface IConnectivityService {
    isOnline(): boolean;
    onOnline(callback: () => void): () => void;
}
export declare class AlwaysOnlineConnectivityService implements IConnectivityService {
    isOnline(): boolean;
    onOnline(): () => void;
}
export declare class BrowserConnectivityService implements IConnectivityService {
    isOnline(): boolean;
    onOnline(callback: () => void): () => void;
}
//# sourceMappingURL=environment.d.ts.map