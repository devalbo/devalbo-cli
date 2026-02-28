import type { DevalboStore } from '../store';
export declare class SqliteNodePersister {
    private readonly _store;
    private readonly _dbPath;
    constructor(_store: DevalboStore, _dbPath: string);
    startAutoLoad(): Promise<void>;
    startAutoSave(): Promise<void>;
}
//# sourceMappingURL=sqlite-node.d.ts.map