import { createContext, useContext } from 'react';
import type { SyncRootId } from '@devalbo-cli/shared';
import type { SolidLdpFileSynchronizer } from '@devalbo-cli/solid-client';

export type FileSyncMap = Map<SyncRootId, SolidLdpFileSynchronizer>;

export const FileSyncContext = createContext<FileSyncMap>(new Map());

export const useFileSyncMap = (): FileSyncMap => useContext(FileSyncContext);
