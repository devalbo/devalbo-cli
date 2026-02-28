import { z } from 'zod';
import { type IdTypePrefixBrand } from '../core/brand-types';
import { type IBrandedPrefixKeyStringToolbox, type IKeyMethodology } from '../core/prefix-key-string';
export declare const NumberIndexMethodBrandKey: "number-index-methodology";
export declare const NumberIndexKeyValueSchema: z.core.$ZodBranded<z.core.$ZodBranded<z.ZodString, "id-type-key-method", "out">, "number-index-methodology", "out">;
export type NumberIndexKeyValue = z.infer<typeof NumberIndexKeyValueSchema>;
export type NumberIndexPrefixType = IdTypePrefixBrand;
export declare const generateNumberIndexKey: () => NumberIndexKeyValue;
export declare const numberIndexMethodology: <T extends NumberIndexPrefixType>(idPrefix: T) => IKeyMethodology<T, NumberIndexKeyValue>;
export declare const createBrandedNumberIndexToolbox: <T extends NumberIndexPrefixType>(idPrefix: T, separator?: string) => IBrandedPrefixKeyStringToolbox<T, NumberIndexKeyValue>;
//# sourceMappingURL=number-index-key.d.ts.map