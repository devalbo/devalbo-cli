export interface SharedBufferHandle {
    id: string;
    buffer: SharedArrayBuffer;
    bytes: Uint8Array;
}
export declare class SharedBufferPool {
    private readonly buffers;
    static isSupported(): boolean;
    allocate(id: string, size: number): SharedBufferHandle;
    get(id: string): SharedBufferHandle | undefined;
    release(id: string): boolean;
    clear(): void;
}
//# sourceMappingURL=shared-buffer.d.ts.map