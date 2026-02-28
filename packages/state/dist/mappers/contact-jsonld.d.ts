import { type ContactId, type ContactRow, type ContactRowInput } from '@devalbo-cli/shared';
type JsonLdObject = Record<string, unknown>;
export declare const contactToJsonLd: (row: ContactRow, id: ContactId) => JsonLdObject;
export declare const jsonLdToContactRow: (jsonLd: JsonLdObject) => {
    id: ContactId;
    row: ContactRowInput;
};
export {};
//# sourceMappingURL=contact-jsonld.d.ts.map