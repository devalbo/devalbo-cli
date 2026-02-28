import { type MembershipRow } from '@devalbo-cli/shared';
type JsonLdObject = Record<string, unknown>;
export declare const membershipToJsonLd: (row: MembershipRow) => JsonLdObject;
export declare const extractRoleFromMembershipJsonLd: (membership: JsonLdObject) => string;
export {};
//# sourceMappingURL=membership-jsonld.d.ts.map