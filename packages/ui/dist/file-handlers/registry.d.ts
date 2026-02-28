import type { MimeTypeHandler, ResolvedMimeTypeHandler } from './types';
export declare const registerMimeTypeHandler: (pattern: string, handler: MimeTypeHandler) => void;
export declare const resolveMimeTypeHandler: (mimeType: string) => ResolvedMimeTypeHandler | null;
export declare const clearMimeTypeHandlers: () => void;
export declare const listMimeTypeHandlers: () => Array<ResolvedMimeTypeHandler>;
export declare const markDefaultMimeHandlersRegistered: () => void;
export declare const areDefaultMimeHandlersRegistered: () => boolean;
//# sourceMappingURL=registry.d.ts.map