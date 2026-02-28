import type { Store } from 'tinybase';
import { type PersonaId, type PersonaRow, type PersonaRowInput } from '@devalbo-cli/shared';
export declare const getPersona: (store: Store, id: PersonaId) => PersonaRow | null;
export declare const setPersona: (store: Store, id: PersonaId, persona: PersonaRowInput) => void;
export declare const listPersonas: (store: Store) => Array<{
    id: PersonaId;
    row: PersonaRow;
}>;
export declare const deletePersona: (store: Store, id: PersonaId) => void;
export declare const getDefaultPersona: (store: Store) => {
    id: PersonaId;
    row: PersonaRow;
} | null;
export declare const setDefaultPersona: (store: Store, id: PersonaId) => void;
//# sourceMappingURL=personas.d.ts.map