import React from 'react';
import type { GroupId, GroupRow } from '@devalbo-cli/shared';
interface GroupListProps {
    groups: Array<{
        id: GroupId;
        row: GroupRow;
        memberCount?: number;
    }>;
    selectedId?: GroupId;
    onSelect?: (id: GroupId) => void;
}
export declare const GroupList: React.FC<GroupListProps>;
export {};
//# sourceMappingURL=group-list.d.ts.map