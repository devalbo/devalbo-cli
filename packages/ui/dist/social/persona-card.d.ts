import React from 'react';
import type { PersonaId, PersonaRow } from '@devalbo-cli/shared';
interface PersonaCardProps {
    persona: PersonaRow;
    id: PersonaId;
    isDefault?: boolean;
    onClick?: () => void;
    selected?: boolean;
}
export declare const PersonaCard: React.FC<PersonaCardProps>;
export {};
//# sourceMappingURL=persona-card.d.ts.map