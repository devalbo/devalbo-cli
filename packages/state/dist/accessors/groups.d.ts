import type { Store } from 'tinybase';
import { type GroupId, type GroupRow, type GroupRowInput } from '@devalbo-cli/shared';
export declare const getGroup: (store: Store, id: GroupId) => GroupRow | null;
export declare const setGroup: (store: Store, id: GroupId, group: GroupRowInput) => void;
export declare const listGroups: (store: Store) => Array<{
    id: GroupId;
    row: GroupRow;
}>;
export declare const deleteGroup: (store: Store, id: GroupId) => void;
//# sourceMappingURL=groups.d.ts.map