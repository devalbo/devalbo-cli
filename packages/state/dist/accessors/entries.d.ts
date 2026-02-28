import type { Store } from 'tinybase';
import { type FileTreeRow } from '@devalbo-cli/shared';
export declare const getEntry: (store: Store, id: string) => FileTreeRow | null;
export declare const setEntry: (store: Store, id: string, entry: FileTreeRow) => void;
export declare const listEntries: (store: Store) => Array<{
    id: string;
    row: FileTreeRow;
}>;
export declare const deleteEntry: (store: Store, id: string) => void;
//# sourceMappingURL=entries.d.ts.map