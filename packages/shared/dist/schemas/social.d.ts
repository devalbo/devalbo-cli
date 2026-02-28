import { z } from 'zod';
export declare const GroupTypeSchema: z.ZodEnum<{
    group: "group";
    organization: "organization";
    team: "team";
}>;
export declare const ContactKindSchema: z.ZodEnum<{
    person: "person";
    agent: "agent";
}>;
export declare const PersonaRowSchema: z.ZodObject<{
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
export declare const ContactRowSchema: z.ZodObject<{
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
export declare const GroupRowSchema: z.ZodObject<{
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
export declare const MembershipRowSchema: z.ZodObject<{
    groupId: z.ZodString;
    contactId: z.ZodString;
    role: z.ZodDefault<z.ZodString>;
    startDate: z.ZodDefault<z.ZodString>;
    endDate: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const ActivitySubjectTypeSchema: z.ZodEnum<{
    contact: "contact";
    group: "group";
}>;
export declare const ActivityTypeSchema: z.ZodEnum<{
    "share-card": "share-card";
    "share-file": "share-file";
    "share-link": "share-link";
    invite: "invite";
    note: "note";
}>;
export declare const ActivityRowSchema: z.ZodObject<{
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
export declare const PersonaRowStoreSchema: z.ZodObject<{
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
export declare const ContactRowStoreSchema: z.ZodObject<{
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
export declare const GroupRowStoreSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    url: z.ZodDefault<z.ZodString>;
    logo: z.ZodDefault<z.ZodString>;
    parentGroup: z.ZodDefault<z.ZodString>;
    updatedAt: z.ZodString;
    groupType: z.ZodString;
}, z.core.$strip>;
export declare const MembershipRowStoreSchema: z.ZodObject<{
    groupId: z.ZodString;
    contactId: z.ZodString;
    role: z.ZodDefault<z.ZodString>;
    startDate: z.ZodDefault<z.ZodString>;
    endDate: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export declare const ActivityRowStoreSchema: z.ZodObject<{
    actorPersonaId: z.ZodString;
    subjectId: z.ZodString;
    payload: z.ZodString;
    timestamp: z.ZodString;
    subjectType: z.ZodString;
    activityType: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=social.d.ts.map