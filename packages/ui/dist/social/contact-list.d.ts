import React from 'react';
import type { ContactId, ContactRow } from '@devalbo-cli/shared';
interface ContactListProps {
    contacts: Array<{
        id: ContactId;
        row: ContactRow;
    }>;
    selectedId?: ContactId;
    onSelect?: (id: ContactId) => void;
    searchable?: boolean;
}
export declare const ContactList: React.FC<ContactListProps>;
export {};
//# sourceMappingURL=contact-list.d.ts.map