import { z } from 'zod';
import type { Branded } from '../core/brand-types';
export type BrandedNumber<B extends string> = Branded<number, ['BrandedNumber', B]>;
export declare const createBrandedIntSchema: <B extends string>(brand: B) => z.ZodPipe<z.ZodNumber, z.ZodTransform<BrandedNumber<B>, number>>;
export declare const createBrandedNonNegativeIntSchema: <B extends string>(brand: B) => z.ZodPipe<z.ZodNumber, z.ZodTransform<BrandedNumber<B>, number>>;
export declare const createBrandedFiniteNumberSchema: <B extends string>(brand: B) => z.ZodPipe<z.ZodNumber, z.ZodTransform<BrandedNumber<B>, number>>;
export declare const createBrandedPositiveIntSchema: <B extends string>(brand: B) => z.ZodPipe<z.ZodNumber, z.ZodTransform<BrandedNumber<B>, number>>;
export declare const unsafeAsBrandedNumber: <B extends string>(value: number) => BrandedNumber<B>;
//# sourceMappingURL=branded-number.d.ts.map