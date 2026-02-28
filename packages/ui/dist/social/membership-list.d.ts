import React from 'react';
import type { ContactId, ContactRow, MembershipId, MembershipRow } from '@devalbo-cli/shared';
interface MembershipListProps {
    memberships: Array<{
        id: MembershipId;
        row: MembershipRow;
    }>;
    contactsById: Map<ContactId, ContactRow>;
}
export declare const MembershipList: React.FC<MembershipListProps>;
export {};
//# sourceMappingURL=membership-list.d.ts.map