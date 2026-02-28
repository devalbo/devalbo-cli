import { type FilesystemBackendInfo, type IFilesystemDriver, type IWatcherService } from '@devalbo-cli/filesystem';
export { FS_STORAGE_KEY } from '@devalbo-cli/filesystem';
export declare const getDriver: () => Promise<IFilesystemDriver>;
export declare const getWatcher: () => Promise<IWatcherService>;
export declare const getFilesystemBackendInfo: () => Promise<FilesystemBackendInfo>;
//# sourceMappingURL=file-operations.d.ts.map