import { z } from 'zod';
import type { Branded } from './brand-types';
export type BrandedString<B extends string> = Branded<string, ['BrandedString', B]>;
export type BrandedStringSchema<B extends string> = z.ZodTypeAny;
export interface IBrandedStringToolbox<B extends string> {
    schema: BrandedStringSchema<B>;
    createBrandedString: (value: string) => BrandedString<B>;
}
export interface IBrandedStringToolboxForSchema<T extends z.ZodTypeAny, B extends string> {
    schema: T;
    brandSchema: BrandedStringSchema<B>;
    hydrateFromString: (value: string) => z.infer<T>;
    createBrandedString: (value: string) => BrandedString<B>;
}
export declare const createBrandedStringSchema: <B extends string>(name: B) => BrandedStringSchema<B>;
export declare const createBrandedStringToolbox: <B extends string>(name: B) => IBrandedStringToolbox<B>;
export declare const createBrandedStringToolboxForSchema: <T extends z.ZodTypeAny>(schema: T) => IBrandedStringToolboxForSchema<T, string>;
//# sourceMappingURL=branded-string.d.ts.map