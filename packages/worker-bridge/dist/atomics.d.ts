export declare class AtomicsSignal {
    private readonly state;
    static isSupported(): boolean;
    constructor(state: Int32Array);
    notify(value?: number): void;
    wait(expected?: number, timeoutMs?: number): 'ok' | 'timed-out';
    reset(): void;
}
export declare class AtomicsLock {
    private readonly state;
    constructor(state: Int32Array);
    lock(timeoutMs?: number): boolean;
    unlock(): void;
}
//# sourceMappingURL=atomics.d.ts.map