import type { DevalboStore } from '../store';
export declare class MemoryPersister {
    private readonly _store;
    constructor(_store: DevalboStore);
    startAutoLoad(): Promise<void>;
    startAutoSave(): Promise<void>;
    stopAutoLoad(): Promise<void>;
    stopAutoSave(): Promise<void>;
}
//# sourceMappingURL=memory.d.ts.map