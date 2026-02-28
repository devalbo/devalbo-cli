import type { Store } from 'tinybase';
import { type ContactId, type GroupId, type MembershipId, type MembershipRow, type MembershipRowInput } from '@devalbo-cli/shared';
type MembershipInput = Omit<MembershipRowInput, 'groupId' | 'contactId'> & {
    groupId: GroupId;
    contactId: ContactId;
};
export declare const getMembershipRowId: (groupId: GroupId, contactId: ContactId) => MembershipId;
export declare const addMember: (store: Store, membership: MembershipInput) => MembershipId;
export declare const removeMember: (store: Store, groupId: GroupId, contactId: ContactId) => void;
export declare const listMemberships: (store: Store) => Array<{
    id: MembershipId;
    row: MembershipRow;
}>;
export declare const listMembers: (store: Store, groupId: GroupId) => Array<{
    id: MembershipId;
    row: MembershipRow;
}>;
export declare const getGroupsForContact: (store: Store, contactId: ContactId) => GroupId[];
export {};
//# sourceMappingURL=memberships.d.ts.map