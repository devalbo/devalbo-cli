import type { ContactId, GroupId, MembershipId, MembershipRow } from '@devalbo-cli/shared';
export interface MembershipFilter {
    groupId?: GroupId;
    contactId?: ContactId;
}
export declare const useMemberships: (filter?: MembershipFilter) => Array<{
    id: MembershipId;
    row: MembershipRow;
}>;
//# sourceMappingURL=use-memberships.d.ts.map