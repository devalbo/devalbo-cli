import { RuntimePlatform } from '@devalbo-cli/shared';
import type { IWatcherService } from './interfaces';
import { BrowserWatcherService } from './watcher/browser-watcher';
import { BrowserStoreFSDriver } from './drivers/browser-store';
import type { IFilesystemDriver } from './interfaces';

export * from './interfaces';
export * from './drivers/memory';
export * from './drivers/zenfs';
export * from './drivers/browser-store';
export * from './watcher/events';
export * from './watcher/browser-watcher';

export type FilesystemBackendInfo = {
  platform: RuntimePlatform;
  adapter: 'browser-store';
  persistence?: 'opfs' | 'indexeddb' | 'localStorage';
  baseDir?: string;
};

export const createWatcherService = (): IWatcherService => new BrowserWatcherService();
export const createFilesystemDriver = async (): Promise<IFilesystemDriver> => new BrowserStoreFSDriver();

export const getFilesystemBackendInfo = async (): Promise<FilesystemBackendInfo> => {
  const driver = new BrowserStoreFSDriver() as IFilesystemDriver & {
    getBackendInfo?: () => Promise<{ adapter: 'browser-store'; persistence: 'opfs' | 'indexeddb' | 'localStorage' }>;
  };
  const info = await driver.getBackendInfo?.();
  return {
    platform: RuntimePlatform.Browser,
    adapter: 'browser-store',
    ...(info?.persistence ? { persistence: info.persistence } : {})
  };
};
