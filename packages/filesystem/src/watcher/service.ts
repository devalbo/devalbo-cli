import { detectPlatform, RuntimePlatform } from '@devalbo-cli/shared';
import type { IWatcherService } from '../interfaces';
import { BrowserWatcherService } from './browser-watcher';

export const createWatcherService = async (): Promise<IWatcherService> => {
  const env = detectPlatform();
  if (env.platform === RuntimePlatform.NodeJS) {
    const { NodeWatcherService } = await import(/* @vite-ignore */ '@devalbo-cli/filesystem/node');
    return new NodeWatcherService();
  }
  return new BrowserWatcherService();
};
