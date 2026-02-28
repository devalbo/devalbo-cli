import React from 'react';
import type { GroupId, GroupRow } from '@devalbo-cli/shared';
interface GroupCardProps {
    group: GroupRow;
    id: GroupId;
    memberCount?: number;
    onClick?: () => void;
    selected?: boolean;
}
export declare const GroupCard: React.FC<GroupCardProps>;
export {};
//# sourceMappingURL=group-card.d.ts.map