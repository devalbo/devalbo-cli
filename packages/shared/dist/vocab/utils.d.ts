import { z } from 'zod';
import { NS } from './namespaces';
export declare const IRI: z.ZodString;
export type IRI = z.infer<typeof IRI>;
export declare const NodeRef: z.ZodObject<{
    '@id': z.ZodString;
}, z.core.$strip>;
export type NodeRef = z.infer<typeof NodeRef>;
export declare function oneOrMany<T extends z.ZodTypeAny>(schema: T): z.ZodUnion<readonly [T, z.ZodArray<T>]>;
export declare function generateUID(): string;
export declare function iri(namespace: keyof typeof NS, localName: string): string;
export declare function isNodeRef(value: unknown): value is NodeRef;
export declare function getId(value: NodeRef | string): string;
export declare function toArray<T>(value: T | T[]): T[];
export declare function nowISO(): string;
//# sourceMappingURL=utils.d.ts.map