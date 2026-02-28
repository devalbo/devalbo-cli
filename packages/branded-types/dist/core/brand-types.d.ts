import { z } from 'zod';
declare const __brand: unique symbol;
type Brand<B> = {
    [__brand]: B;
};
export type Branded<T, B> = T & Brand<B>;
export declare const IdTypePrefixBrandKey: "id-type-prefix";
export declare const IdTypeKeyMethodBrandKey: "id-type-key-method";
export declare const IdTypePrefixBrandSchema: z.core.$ZodBranded<z.ZodString, "id-type-prefix", "out">;
export type IdTypePrefixBrand = z.infer<typeof IdTypePrefixBrandSchema>;
export declare const IdTypeKeyMethodBrandSchema: z.core.$ZodBranded<z.ZodString, "id-type-key-method", "out">;
export type IdTypeKeyMethodBrand = z.infer<typeof IdTypeKeyMethodBrandSchema>;
export declare const RegexableStringSchema: z.core.$ZodBranded<z.ZodString, "regexable-string", "out">;
export type RegexableString = z.infer<typeof RegexableStringSchema>;
export {};
//# sourceMappingURL=brand-types.d.ts.map