export { A as AbsolutePath, a as AbsolutePathSchema, b as ActivityId, c as ActivityIdToolbox, d as Branded, B as ByteCount, e as ByteCountSchema, C as ContactId, f as ContactIdToolbox, g as ContentHash, h as ContentHashSchema, D as DirectoryPath, i as DirectoryPathSchema, F as FilePath, j as FilePathSchema, G as GroupId, k as GroupIdToolbox, l as MembershipId, m as MembershipIdToolbox, M as Milliseconds, n as MillisecondsSchema, o as PersonaId, p as PersonaIdToolbox, q as PodETag, r as PodETagSchema, P as PodUrl, s as PodUrlSchema, R as RelativePath, t as RelativePathSchema, S as SyncRootId, u as SyncRootIdSchema, W as WebId, v as WebIdSchema, w as asDirectoryPath, x as asFilePath, y as assertAbsolutePath, z as assertActivityId, E as assertContactId, H as assertContentHash, I as assertDirectoryPath, J as assertFilePath, K as assertGroupId, L as assertMembershipId, N as assertPersonaId, O as assertPodUrl, Q as assertSyncRootId, T as assertWebId, U as parseAbsolutePath, V as parseActivityId, X as parseContactId, Y as parseDirectoryPath, Z as parseFilePath, _ as parseGroupId, $ as parseMembershipId, a0 as parsePersonaId, a1 as parsePodUrl, a2 as parseWebId, a3 as unsafeAsAbsolutePath, a4 as unsafeAsActivityId, a5 as unsafeAsByteCount, a6 as unsafeAsContactId, a7 as unsafeAsContentHash, a8 as unsafeAsDirectoryPath, a9 as unsafeAsFilePath, aa as unsafeAsGroupId, ab as unsafeAsMembershipId, ac as unsafeAsMilliseconds, ad as unsafeAsPersonaId, ae as unsafeAsPodETag, af as unsafeAsPodUrl, ag as unsafeAsRelativePath, ah as unsafeAsSyncRootId, ai as unsafeAsWebId } from './branded-D2eQxo7s.js';
import { a as RuntimeEnv } from './filesystem-BbmJFc5d.js';
export { A as AlwaysOnlineConnectivityService, B as BrowserConnectivityService, F as FileEntry, I as IConnectivityService, R as RuntimePlatform, W as WatchEvent, b as WatchEventType } from './filesystem-BbmJFc5d.js';
export { C as CommandOptions, a as CommandResult, F as FileNotFound, M as MissingArgument } from './errors-Jkwy0AU7.js';
export { E as EditorBufferRow, F as FileTreeRow, S as SyncRoot, a as SyncRootSchema } from './sync-root-BCnMChoN.js';
import { z } from 'zod';
export { A as AppConfig, c as createCliAppConfig, a as createSocialAppConfig } from './app-config-MGBUKfI7.js';
export { DCTERMS, FOAF, LDP, VCARD } from '@inrupt/vocab-common-rdf';
export { SOLID, WS } from '@inrupt/vocab-solid-common';
import 'react';
import 'effect/Cause';
import 'effect/Types';

declare const GroupTypeSchema: z.ZodEnum<{
    group: "group";
    organization: "organization";
    team: "team";
}>;
declare const ContactKindSchema: z.ZodEnum<{
    person: "person";
    agent: "agent";
}>;
declare const PersonaRowSchema: z.ZodObject<{
    name: z.ZodString;
    nickname: z.ZodDefault<z.ZodString>;
    givenName: z.ZodDefault<z.ZodString>;
    familyName: z.ZodDefault<z.ZodString>;
    email: z.ZodDefault<z.ZodString>;
    phone: z.ZodDefault<z.ZodString>;
    image: z.ZodDefault<z.ZodString>;
    bio: z.ZodDefault<z.ZodString>;
    homepage: z.ZodDefault<z.ZodString>;
    oidcIssuer: z.ZodDefault<z.ZodString>;
    inbox: z.ZodDefault<z.ZodString>;
    publicTypeIndex: z.ZodDefault<z.ZodString>;
    privateTypeIndex: z.ZodDefault<z.ZodString>;
    preferencesFile: z.ZodDefault<z.ZodString>;
    storage: z.ZodDefault<z.ZodString>;
    profileDoc: z.ZodDefault<z.ZodString>;
    isDefault: z.ZodBoolean;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const ContactRowSchema: z.ZodObject<{
    name: z.ZodString;
    uid: z.ZodString;
    nickname: z.ZodDefault<z.ZodString>;
    kind: z.ZodEnum<{
        person: "person";
        agent: "agent";
    }>;
    email: z.ZodDefault<z.ZodString>;
    phone: z.ZodDefault<z.ZodString>;
    url: z.ZodDefault<z.ZodString>;
    photo: z.ZodDefault<z.ZodString>;
    notes: z.ZodDefault<z.ZodString>;
    organization: z.ZodDefault<z.ZodString>;
    role: z.ZodDefault<z.ZodString>;
    webId: z.ZodDefault<z.ZodString>;
    agentCategory: z.ZodDefault<z.ZodString>;
    linkedPersona: z.ZodDefault<z.ZodString>;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const GroupRowSchema: z.ZodObject<{
    name: z.ZodString;
    groupType: z.ZodEnum<{
        group: "group";
        organization: "organization";
        team: "team";
    }>;
    description: z.ZodDefault<z.ZodString>;
    url: z.ZodDefault<z.ZodString>;
    logo: z.ZodDefault<z.ZodString>;
    parentGroup: z.ZodDefault<z.ZodString>;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const MembershipRowSchema: z.ZodObject<{
    groupId: z.ZodString;
    contactId: z.ZodString;
    role: z.ZodDefault<z.ZodString>;
    startDate: z.ZodDefault<z.ZodString>;
    endDate: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
declare const ActivitySubjectTypeSchema: z.ZodEnum<{
    contact: "contact";
    group: "group";
}>;
declare const ActivityTypeSchema: z.ZodEnum<{
    "share-card": "share-card";
    "share-file": "share-file";
    "share-link": "share-link";
    invite: "invite";
    note: "note";
}>;
declare const ActivityRowSchema: z.ZodObject<{
    actorPersonaId: z.ZodString;
    subjectType: z.ZodEnum<{
        contact: "contact";
        group: "group";
    }>;
    subjectId: z.ZodString;
    activityType: z.ZodEnum<{
        "share-card": "share-card";
        "share-file": "share-file";
        "share-link": "share-link";
        invite: "invite";
        note: "note";
    }>;
    payload: z.ZodString;
    timestamp: z.ZodString;
}, z.core.$strip>;
declare const PersonaRowStoreSchema: z.ZodObject<{
    name: z.ZodString;
    nickname: z.ZodDefault<z.ZodString>;
    givenName: z.ZodDefault<z.ZodString>;
    familyName: z.ZodDefault<z.ZodString>;
    email: z.ZodDefault<z.ZodString>;
    phone: z.ZodDefault<z.ZodString>;
    image: z.ZodDefault<z.ZodString>;
    bio: z.ZodDefault<z.ZodString>;
    homepage: z.ZodDefault<z.ZodString>;
    oidcIssuer: z.ZodDefault<z.ZodString>;
    inbox: z.ZodDefault<z.ZodString>;
    publicTypeIndex: z.ZodDefault<z.ZodString>;
    privateTypeIndex: z.ZodDefault<z.ZodString>;
    preferencesFile: z.ZodDefault<z.ZodString>;
    storage: z.ZodDefault<z.ZodString>;
    profileDoc: z.ZodDefault<z.ZodString>;
    isDefault: z.ZodBoolean;
    updatedAt: z.ZodString;
}, z.core.$strip>;
declare const ContactRowStoreSchema: z.ZodObject<{
    name: z.ZodString;
    uid: z.ZodString;
    nickname: z.ZodDefault<z.ZodString>;
    email: z.ZodDefault<z.ZodString>;
    phone: z.ZodDefault<z.ZodString>;
    url: z.ZodDefault<z.ZodString>;
    photo: z.ZodDefault<z.ZodString>;
    notes: z.ZodDefault<z.ZodString>;
    organization: z.ZodDefault<z.ZodString>;
    role: z.ZodDefault<z.ZodString>;
    webId: z.ZodDefault<z.ZodString>;
    agentCategory: z.ZodDefault<z.ZodString>;
    linkedPersona: z.ZodDefault<z.ZodString>;
    updatedAt: z.ZodString;
    kind: z.ZodString;
}, z.core.$strip>;
declare const GroupRowStoreSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    url: z.ZodDefault<z.ZodString>;
    logo: z.ZodDefault<z.ZodString>;
    parentGroup: z.ZodDefault<z.ZodString>;
    updatedAt: z.ZodString;
    groupType: z.ZodString;
}, z.core.$strip>;
declare const MembershipRowStoreSchema: z.ZodObject<{
    groupId: z.ZodString;
    contactId: z.ZodString;
    role: z.ZodDefault<z.ZodString>;
    startDate: z.ZodDefault<z.ZodString>;
    endDate: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
declare const ActivityRowStoreSchema: z.ZodObject<{
    actorPersonaId: z.ZodString;
    subjectId: z.ZodString;
    payload: z.ZodString;
    timestamp: z.ZodString;
    subjectType: z.ZodString;
    activityType: z.ZodString;
}, z.core.$strip>;

type GroupType = z.infer<typeof GroupTypeSchema>;
type ContactKind = z.infer<typeof ContactKindSchema>;
type PersonaRow = z.output<typeof PersonaRowSchema>;
type ContactRow = z.output<typeof ContactRowSchema>;
type GroupRow = z.output<typeof GroupRowSchema>;
type MembershipRow = z.output<typeof MembershipRowSchema>;
type ActivityRow = z.output<typeof ActivityRowSchema>;
type PersonaRowInput = z.input<typeof PersonaRowSchema>;
type ContactRowInput = z.input<typeof ContactRowSchema>;
type GroupRowInput = z.input<typeof GroupRowSchema>;
type MembershipRowInput = z.input<typeof MembershipRowSchema>;
type ActivityRowInput = z.input<typeof ActivityRowSchema>;

declare const detectPlatform: () => RuntimeEnv;

declare class ServiceContainer {
    private services;
    register<T>(key: string, service: T): void;
    resolve<T>(key: string): T;
}

declare const nonEmptyString: (argName: string) => z.ZodString;
declare const pathArgSchema: z.ZodString;

declare const FileTreeRowSchema: z.ZodObject<{
    path: z.ZodString;
    name: z.ZodString;
    parentPath: z.ZodString;
    isDirectory: z.ZodBoolean;
    size: z.ZodNumber;
    mtime: z.ZodString;
}, z.core.$strip>;

declare const EditorBufferRowSchema: z.ZodObject<{
    path: z.ZodString;
    content: z.ZodString;
    isDirty: z.ZodBoolean;
    cursorLine: z.ZodNumber;
    cursorCol: z.ZodNumber;
}, z.core.$strip>;

declare const ORG: {
    readonly NAMESPACE: "http://www.w3.org/ns/org#";
    readonly Organization: "http://www.w3.org/ns/org#Organization";
    readonly OrganizationalUnit: "http://www.w3.org/ns/org#OrganizationalUnit";
    readonly Membership: "http://www.w3.org/ns/org#Membership";
    readonly Role: "http://www.w3.org/ns/org#Role";
    readonly member: "http://www.w3.org/ns/org#member";
    readonly hasMember: "http://www.w3.org/ns/org#hasMember";
    readonly hasMembership: "http://www.w3.org/ns/org#hasMembership";
    readonly memberOf: "http://www.w3.org/ns/org#memberOf";
    readonly hasUnit: "http://www.w3.org/ns/org#hasUnit";
    readonly unitOf: "http://www.w3.org/ns/org#unitOf";
    readonly role: "http://www.w3.org/ns/org#role";
    readonly memberDuring: "http://www.w3.org/ns/org#memberDuring";
};
declare const TIME: {
    readonly NAMESPACE: "http://www.w3.org/2006/time#";
    readonly Interval: "http://www.w3.org/2006/time#Interval";
    readonly hasBeginning: "http://www.w3.org/2006/time#hasBeginning";
    readonly hasEnd: "http://www.w3.org/2006/time#hasEnd";
};
declare const NS: {
    readonly foaf: "http://xmlns.com/foaf/0.1/";
    readonly vcard: "http://www.w3.org/2006/vcard/ns#";
    readonly solid: "http://www.w3.org/ns/solid/terms#";
    readonly org: "http://www.w3.org/ns/org#";
    readonly ldp: "http://www.w3.org/ns/ldp#";
    readonly acl: "http://www.w3.org/ns/auth/acl#";
    readonly dc: "http://purl.org/dc/terms/";
    readonly posix: "http://www.w3.org/ns/posix/stat#";
    readonly xsd: "http://www.w3.org/2001/XMLSchema#";
    readonly schema: "https://schema.org/";
    readonly cert: "http://www.w3.org/ns/auth/cert#";
    readonly time: "http://www.w3.org/2006/time#";
    readonly pim: "http://www.w3.org/ns/pim/space#";
};
declare const POD_CONTEXT: {
    readonly '@vocab': "http://www.w3.org/2006/vcard/ns#";
    readonly foaf: "http://xmlns.com/foaf/0.1/";
    readonly solid: "http://www.w3.org/ns/solid/terms#";
    readonly vcard: "http://www.w3.org/2006/vcard/ns#";
    readonly org: "http://www.w3.org/ns/org#";
    readonly ldp: "http://www.w3.org/ns/ldp#";
    readonly acl: "http://www.w3.org/ns/auth/acl#";
    readonly dc: "http://purl.org/dc/terms/";
    readonly posix: "http://www.w3.org/ns/posix/stat#";
    readonly xsd: "http://www.w3.org/2001/XMLSchema#";
    readonly schema: "https://schema.org/";
    readonly cert: "http://www.w3.org/ns/auth/cert#";
    readonly time: "http://www.w3.org/2006/time#";
    readonly pim: "http://www.w3.org/ns/pim/space#";
};

declare const IRI: z.ZodString;
type IRI = z.infer<typeof IRI>;
declare const NodeRef: z.ZodObject<{
    '@id': z.ZodString;
}, z.core.$strip>;
type NodeRef = z.infer<typeof NodeRef>;
declare function oneOrMany<T extends z.ZodTypeAny>(schema: T): z.ZodUnion<readonly [T, z.ZodArray<T>]>;
declare function generateUID(): string;
declare function iri(namespace: keyof typeof NS, localName: string): string;
declare function isNodeRef(value: unknown): value is NodeRef;
declare function getId(value: NodeRef | string): string;
declare function toArray<T>(value: T | T[]): T[];
declare function nowISO(): string;

export { type ActivityRow, type ActivityRowInput, ActivityRowSchema, ActivityRowStoreSchema, ActivitySubjectTypeSchema, ActivityTypeSchema, type ContactKind, ContactKindSchema, type ContactRow, type ContactRowInput, ContactRowSchema, ContactRowStoreSchema, EditorBufferRowSchema, FileTreeRowSchema, type GroupRow, type GroupRowInput, GroupRowSchema, GroupRowStoreSchema, type GroupType, GroupTypeSchema, IRI, type MembershipRow, type MembershipRowInput, MembershipRowSchema, MembershipRowStoreSchema, NS, NodeRef, ORG, POD_CONTEXT, type PersonaRow, type PersonaRowInput, PersonaRowSchema, PersonaRowStoreSchema, RuntimeEnv, ServiceContainer, TIME, detectPlatform, generateUID, getId, iri, isNodeRef, nonEmptyString, nowISO, oneOrMany, pathArgSchema, toArray };
