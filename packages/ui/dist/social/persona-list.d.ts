import React from 'react';
import type { PersonaId, PersonaRow } from '@devalbo-cli/shared';
interface PersonaListProps {
    personas: Array<{
        id: PersonaId;
        row: PersonaRow;
    }>;
    defaultPersonaId?: PersonaId;
    selectedId?: PersonaId;
    onSelect?: (id: PersonaId) => void;
}
export declare const PersonaList: React.FC<PersonaListProps>;
export {};
//# sourceMappingURL=persona-list.d.ts.map