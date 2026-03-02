import { M as Milliseconds, B as ByteCount } from './branded-D2eQxo7s.js';

type AppConfig = {
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
    /** Allow consuming apps to attach custom fields without losing the base type. */
    [key: string]: unknown;
};
type AppIdentity = {
    appId: string;
    appName: string;
    storageKey: string;
};
/** CLI-only app: all sync and social features disabled. */
declare const createCliAppConfig: (identity: AppIdentity) => AppConfig;
/** Browser or desktop app with full Solid sync enabled. */
declare const createSocialAppConfig: (identity: AppIdentity, opts: {
    podNamespace: string;
    socialLocalPath: string;
}) => AppConfig;

export { type AppConfig as A, createSocialAppConfig as a, createCliAppConfig as c };
