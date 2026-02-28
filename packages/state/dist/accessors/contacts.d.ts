import type { Store } from 'tinybase';
import { type ContactId, type ContactRow, type ContactRowInput, type PersonaId } from '@devalbo-cli/shared';
export declare const getContact: (store: Store, id: ContactId) => ContactRow | null;
export declare const setContact: (store: Store, id: ContactId, contact: ContactRowInput) => void;
export declare const listContacts: (store: Store) => Array<{
    id: ContactId;
    row: ContactRow;
}>;
export declare const deleteContact: (store: Store, id: ContactId) => void;
export declare const searchContacts: (store: Store, query: string) => Array<{
    id: ContactId;
    row: ContactRow;
}>;
export declare const linkContactToPersona: (store: Store, contactId: ContactId, personaId: PersonaId) => void;
//# sourceMappingURL=contacts.d.ts.map