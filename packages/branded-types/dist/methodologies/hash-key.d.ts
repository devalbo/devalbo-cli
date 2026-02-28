import { z } from 'zod';
import { type IdTypePrefixBrand } from '../core/brand-types';
import { type IBrandedPrefixKeyStringToolbox, type IKeyMethodology } from '../core/prefix-key-string';
export declare const HashMethodBrandKey: "hash-methodology";
export declare const HashKeyValueSchema: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "id-type-key-method", "out">, "hash-methodology", "out">;
export type HashKeyValue = z.infer<typeof HashKeyValueSchema>;
export type HashPrefixType = IdTypePrefixBrand;
export interface HashMethodologyOptions {
    hashLength?: number;
}
export declare const hashMethodology: <T extends HashPrefixType>(idPrefix: T, options?: HashMethodologyOptions) => IKeyMethodology<T, HashKeyValue>;
export declare const createBrandedHashToolbox: <T extends HashPrefixType>(idPrefix: T, options: {
    hashLength: number;
    separator?: string;
}) => IBrandedPrefixKeyStringToolbox<T, HashKeyValue>;
//# sourceMappingURL=hash-key.d.ts.map