import { type ByteCount, type Milliseconds } from './types/branded';
export type AppConfig = {
    appId: string;
    appName: string;
    storageKey: string;
    podNamespace: string;
    socialLocalPath: string;
    sync: {
        social: {
            pollIntervalMs: Milliseconds;
            outboundDebounceMs: Milliseconds;
        };
        files: {
            pollIntervalMs: Milliseconds;
            outboundDebounceMs: Milliseconds;
            maxFileSizeBytes: ByteCount;
        };
    };
    features: {
        socialSync: boolean;
        fileSync: boolean;
        fileSharing: boolean;
    };
};
type AppIdentity = {
    appId: string;
    appName: string;
    storageKey: string;
};
/** CLI-only app: all sync and social features disabled. */
export declare const createCliAppConfig: (identity: AppIdentity) => AppConfig;
/** Browser or desktop app with full Solid sync enabled. */
export declare const createSocialAppConfig: (identity: AppIdentity, opts: {
    podNamespace: string;
    socialLocalPath: string;
}) => AppConfig;
export {};
//# sourceMappingURL=app-config.d.ts.map