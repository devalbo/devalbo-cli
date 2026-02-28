import React from 'react';
import type { ContactId, ContactRow, MembershipId, MembershipRow } from '@devalbo-cli/shared';
interface ContactCardProps {
    contact: ContactRow;
    id: ContactId;
    memberships?: Array<{
        id: MembershipId;
        row: MembershipRow;
    }>;
    onClick?: () => void;
    selected?: boolean;
}
export declare const ContactCard: React.FC<ContactCardProps>;
export {};
//# sourceMappingURL=contact-card.d.ts.map