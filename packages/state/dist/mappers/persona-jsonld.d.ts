import { type PersonaId, type PersonaRow, type PersonaRowInput } from '@devalbo-cli/shared';
type JsonLdObject = Record<string, unknown>;
export declare const personaToJsonLd: (row: PersonaRow, id: PersonaId) => JsonLdObject;
export declare const jsonLdToPersonaRow: (jsonLd: JsonLdObject) => {
    id: PersonaId;
    row: PersonaRowInput;
};
export {};
//# sourceMappingURL=persona-jsonld.d.ts.map