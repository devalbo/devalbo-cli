import { type ContactId, type GroupId, type GroupRow, type GroupRowInput, type MembershipRowInput } from '@devalbo-cli/shared';
import type { Store } from 'tinybase';
type JsonLdObject = Record<string, unknown>;
export declare const groupToJsonLd: (store: Store, row: GroupRow, id: GroupId) => JsonLdObject;
export declare const jsonLdToGroupRow: (jsonLd: JsonLdObject) => {
    id: GroupId;
    row: GroupRowInput;
};
export declare const extractMembershipsFromGroupJsonLd: (jsonLd: JsonLdObject) => Array<Omit<MembershipRowInput, "groupId" | "contactId"> & {
    groupId: GroupId;
    contactId: ContactId;
}>;
export {};
//# sourceMappingURL=group-jsonld.d.ts.map