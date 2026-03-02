import { z } from 'zod';

declare const __brand: unique symbol;
type Brand<B> = {
    [__brand]: B;
};
type Branded<T, B> = T & Brand<B>;
declare const IdTypePrefixBrandSchema: z.core.$ZodBranded<z.ZodString, "id-type-prefix", "out">;
type IdTypePrefixBrand = z.infer<typeof IdTypePrefixBrandSchema>;
declare const IdTypeKeyMethodBrandSchema: z.core.$ZodBranded<z.ZodString, "id-type-key-method", "out">;
type IdTypeKeyMethodBrand = z.infer<typeof IdTypeKeyMethodBrandSchema>;
declare const RegexableStringSchema: z.core.$ZodBranded<z.ZodString, "regexable-string", "out">;
type RegexableString = z.infer<typeof RegexableStringSchema>;

interface IKeyMethodology<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> {
    idPrefix: P;
    createIdPrefixRegexStr: (idPrefix: P) => RegexableString;
    keyRegexStr: RegexableString;
    generateRandomKey?: () => KM;
}
type BrandedPrefixKeyString<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> = Branded<string, ['PrefixKeyString', P, KM]>;
type BrandedPrefixKeyStringSchema<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> = z.ZodTypeAny;
interface IBrandedPrefixKeyStringToolbox<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> {
    idSchema: BrandedPrefixKeyStringSchema<P, KM>;
    idPrefix: P;
    separator: string;
    keyMethodology: IKeyMethodology<P, KM>;
    createRandomId?: () => BrandedPrefixKeyString<P, KM>;
    createIdForKey: (key: KM) => BrandedPrefixKeyString<P, KM>;
    parseId: (id: string) => z.ZodSafeParseResult<BrandedPrefixKeyString<P, KM>>;
    assertId: (id: string) => BrandedPrefixKeyString<P, KM>;
}

type BrandedNumber<B extends string> = Branded<number, ['BrandedNumber', B]>;

type FilePath = Branded<string, 'FilePath'>;
type DirectoryPath = Branded<string, 'DirectoryPath'>;
type PersonaId = Branded<string, 'PersonaId'>;
type ContactId = Branded<string, 'ContactId'>;
type GroupId = Branded<string, 'GroupId'>;
type MembershipId = Branded<string, 'MembershipId'>;
type ActivityId = Branded<string, 'ActivityId'>;
type SyncRootId = Branded<string, 'SyncRootId'>;
type AbsolutePath = Branded<string, 'AbsolutePath'>;
type PodUrl = Branded<string, 'PodUrl'>;
type WebId = Branded<string, 'WebId'>;
type ContentHash = Branded<string, 'ContentHash'>;
type PodETag = Branded<string, 'PodETag'>;
type RelativePath = Branded<string, 'RelativePath'>;
type Milliseconds = BrandedNumber<'Milliseconds'>;
type ByteCount = BrandedNumber<'ByteCount'>;
declare const FilePathSchema: z.ZodPipe<z.ZodString, z.ZodTransform<FilePath, string>>;
declare const DirectoryPathSchema: z.ZodPipe<z.ZodString, z.ZodTransform<DirectoryPath, string>>;
declare const AbsolutePathSchema: z.ZodPipe<z.ZodString, z.ZodTransform<AbsolutePath, string>>;
declare const PodUrlSchema: z.ZodPipe<z.ZodString, z.ZodTransform<PodUrl, string>>;
declare const WebIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<WebId, string>>;
declare const ContentHashSchema: z.ZodPipe<z.ZodString, z.ZodTransform<ContentHash, string>>;
declare const PodETagSchema: z.ZodPipe<z.ZodString, z.ZodTransform<PodETag, string>>;
declare const RelativePathSchema: z.ZodPipe<z.ZodString, z.ZodTransform<RelativePath, string>>;
declare const SyncRootIdSchema: z.ZodPipe<z.ZodString, z.ZodTransform<SyncRootId, string>>;
declare const MillisecondsSchema: z.ZodPipe<z.ZodNumber, z.ZodTransform<BrandedNumber<"Milliseconds">, number>>;
declare const ByteCountSchema: z.ZodPipe<z.ZodNumber, z.ZodTransform<BrandedNumber<"ByteCount">, number>>;
declare const parseFilePath: (path: string) => z.ZodSafeParseResult<FilePath>;
declare const parseDirectoryPath: (path: string) => z.ZodSafeParseResult<DirectoryPath>;
declare const parseAbsolutePath: (path: string) => z.ZodSafeParseResult<AbsolutePath>;
declare const parsePodUrl: (url: string) => z.ZodSafeParseResult<PodUrl>;
declare const parseWebId: (webId: string) => z.ZodSafeParseResult<WebId>;
declare const assertFilePath: (path: string) => FilePath;
declare const assertDirectoryPath: (path: string) => DirectoryPath;
declare const assertAbsolutePath: (path: string) => AbsolutePath;
declare const assertPodUrl: (url: string) => PodUrl;
declare const assertWebId: (webId: string) => WebId;
declare const assertSyncRootId: (id: string) => SyncRootId;
declare const assertContentHash: (hash: string) => ContentHash;
declare const unsafeAsFilePath: (path: string) => FilePath;
declare const unsafeAsDirectoryPath: (path: string) => DirectoryPath;
declare const unsafeAsAbsolutePath: (path: string) => AbsolutePath;
declare const unsafeAsPodUrl: (url: string) => PodUrl;
declare const unsafeAsWebId: (webId: string) => WebId;
declare const unsafeAsSyncRootId: (id: string) => SyncRootId;
declare const unsafeAsContentHash: (hash: string) => ContentHash;
declare const unsafeAsPodETag: (etag: string) => PodETag;
declare const unsafeAsRelativePath: (path: string) => RelativePath;
declare const unsafeAsMilliseconds: (value: number) => Milliseconds;
declare const unsafeAsByteCount: (value: number) => ByteCount;
declare const unsafeAsPersonaId: (id: string) => PersonaId;
declare const unsafeAsContactId: (id: string) => ContactId;
declare const unsafeAsGroupId: (id: string) => GroupId;
declare const unsafeAsMembershipId: (id: string) => MembershipId;
declare const unsafeAsActivityId: (id: string) => ActivityId;
declare const PersonaIdToolbox: IBrandedPrefixKeyStringToolbox<string & z.core.$brand<"id-type-prefix">, string & z.core.$brand<"id-type-key-method"> & z.core.$brand<"uuid-methodology">>;
declare const ContactIdToolbox: IBrandedPrefixKeyStringToolbox<string & z.core.$brand<"id-type-prefix">, string & z.core.$brand<"id-type-key-method"> & z.core.$brand<"uuid-methodology">>;
declare const GroupIdToolbox: IBrandedPrefixKeyStringToolbox<string & z.core.$brand<"id-type-prefix">, string & z.core.$brand<"id-type-key-method"> & z.core.$brand<"uuid-methodology">>;
declare const MembershipIdToolbox: IBrandedPrefixKeyStringToolbox<string & z.core.$brand<"id-type-prefix">, string & z.core.$brand<"id-type-key-method"> & z.core.$brand<"uuid-methodology">>;
declare const ActivityIdToolbox: IBrandedPrefixKeyStringToolbox<string & z.core.$brand<"id-type-prefix">, string & z.core.$brand<"id-type-key-method"> & z.core.$brand<"uuid-methodology">>;
declare const parsePersonaId: (id: string) => z.ZodSafeParseResult<PersonaId>;
declare const parseContactId: (id: string) => z.ZodSafeParseResult<ContactId>;
declare const parseGroupId: (id: string) => z.ZodSafeParseResult<GroupId>;
declare const parseMembershipId: (id: string) => z.ZodSafeParseResult<MembershipId>;
declare const parseActivityId: (id: string) => z.ZodSafeParseResult<ActivityId>;
declare const assertPersonaId: (id: string) => PersonaId;
declare const assertContactId: (id: string) => ContactId;
declare const assertGroupId: (id: string) => GroupId;
declare const assertMembershipId: (id: string) => MembershipId;
declare const assertActivityId: (id: string) => ActivityId;
/** @deprecated Use `unsafeAsFilePath` for trusted data or `parseFilePath`/`assertFilePath` for untrusted data. */
declare const asFilePath: (path: string) => FilePath;
/** @deprecated Use `unsafeAsDirectoryPath` for trusted data or `parseDirectoryPath`/`assertDirectoryPath` for untrusted data. */
declare const asDirectoryPath: (path: string) => DirectoryPath;

export { parseMembershipId as $, type AbsolutePath as A, type ByteCount as B, type ContactId as C, type DirectoryPath as D, assertContactId as E, type FilePath as F, type GroupId as G, assertContentHash as H, assertDirectoryPath as I, assertFilePath as J, assertGroupId as K, assertMembershipId as L, type Milliseconds as M, assertPersonaId as N, assertPodUrl as O, type PodUrl as P, assertSyncRootId as Q, type RelativePath as R, type SyncRootId as S, assertWebId as T, parseAbsolutePath as U, parseActivityId as V, type WebId as W, parseContactId as X, parseDirectoryPath as Y, parseFilePath as Z, parseGroupId as _, AbsolutePathSchema as a, parsePersonaId as a0, parsePodUrl as a1, parseWebId as a2, unsafeAsAbsolutePath as a3, unsafeAsActivityId as a4, unsafeAsByteCount as a5, unsafeAsContactId as a6, unsafeAsContentHash as a7, unsafeAsDirectoryPath as a8, unsafeAsFilePath as a9, unsafeAsGroupId as aa, unsafeAsMembershipId as ab, unsafeAsMilliseconds as ac, unsafeAsPersonaId as ad, unsafeAsPodETag as ae, unsafeAsPodUrl as af, unsafeAsRelativePath as ag, unsafeAsSyncRootId as ah, unsafeAsWebId as ai, type ActivityId as b, ActivityIdToolbox as c, type Branded as d, ByteCountSchema as e, ContactIdToolbox as f, type ContentHash as g, ContentHashSchema as h, DirectoryPathSchema as i, FilePathSchema as j, GroupIdToolbox as k, type MembershipId as l, MembershipIdToolbox as m, MillisecondsSchema as n, type PersonaId as o, PersonaIdToolbox as p, type PodETag as q, PodETagSchema as r, PodUrlSchema as s, RelativePathSchema as t, SyncRootIdSchema as u, WebIdSchema as v, asDirectoryPath as w, asFilePath as x, assertAbsolutePath as y, assertActivityId as z };
