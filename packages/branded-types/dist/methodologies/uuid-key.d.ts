import { z } from 'zod';
import { type IdTypePrefixBrand } from '../core/brand-types';
import { type IBrandedPrefixKeyStringToolbox, type IKeyMethodology } from '../core/prefix-key-string';
export declare const UuidMethodBrandKey: "uuid-methodology";
export declare const UuidKeyValueSchema: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "id-type-key-method", "out">, "uuid-methodology", "out">;
export type UuidKeyValue = z.infer<typeof UuidKeyValueSchema>;
export type UuidPrefixType = IdTypePrefixBrand;
export declare const generateUuidKey: () => UuidKeyValue;
export declare const uuidMethodology: <T extends UuidPrefixType>(idPrefix: T) => IKeyMethodology<T, UuidKeyValue>;
export declare const createBrandedUuidToolbox: <T extends UuidPrefixType>(idPrefix: T, separator?: string) => IBrandedPrefixKeyStringToolbox<T, UuidKeyValue>;
//# sourceMappingURL=uuid-key.d.ts.map