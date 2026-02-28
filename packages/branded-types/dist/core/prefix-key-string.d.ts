import { z } from 'zod';
import type { Branded, IdTypeKeyMethodBrand, IdTypePrefixBrand, RegexableString } from './brand-types';
export interface IKeyMethodology<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> {
    idPrefix: P;
    createIdPrefixRegexStr: (idPrefix: P) => RegexableString;
    keyRegexStr: RegexableString;
    generateRandomKey?: () => KM;
}
export type BrandedPrefixKeyString<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> = Branded<string, ['PrefixKeyString', P, KM]>;
export type BrandedPrefixKeyStringSchema<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> = z.ZodTypeAny;
export interface IBrandedPrefixKeyStringToolbox<P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand> {
    idSchema: BrandedPrefixKeyStringSchema<P, KM>;
    idPrefix: P;
    separator: string;
    keyMethodology: IKeyMethodology<P, KM>;
    createRandomId?: () => BrandedPrefixKeyString<P, KM>;
    createIdForKey: (key: KM) => BrandedPrefixKeyString<P, KM>;
    parseId: (id: string) => z.ZodSafeParseResult<BrandedPrefixKeyString<P, KM>>;
    assertId: (id: string) => BrandedPrefixKeyString<P, KM>;
}
export declare const createBrandedPrefixKeyStringSchema: <P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand>(keyMethodology: IKeyMethodology<P, KM>, separator: string) => BrandedPrefixKeyStringSchema<P, KM>;
export declare const createBrandedPrefixKeyStringValue: <P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand>(idPrefix: P, separator: string, keyValue: KM) => BrandedPrefixKeyString<P, KM>;
export declare const parseBrandedPrefixKeyStringValue: <P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand>(schema: BrandedPrefixKeyStringSchema<P, KM>, value: string) => z.ZodSafeParseResult<BrandedPrefixKeyString<P, KM>>;
export declare const assertBrandedPrefixKeyStringValue: <P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand>(schema: BrandedPrefixKeyStringSchema<P, KM>, value: string) => BrandedPrefixKeyString<P, KM>;
export declare const isValidBrandedPrefixKeyStringValue: <P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand>(id: string, idPrefixRegex: P, keyRegex: KM, separator?: string) => id is BrandedPrefixKeyString<P, KM>;
export declare const createBrandedPrefixKeyStringToolbox: <P extends IdTypePrefixBrand, KM extends IdTypeKeyMethodBrand>(keyMethodology: IKeyMethodology<P, KM>, separator: string) => IBrandedPrefixKeyStringToolbox<P, KM>;
//# sourceMappingURL=prefix-key-string.d.ts.map