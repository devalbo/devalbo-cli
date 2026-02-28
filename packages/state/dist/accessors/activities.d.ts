import type { Store } from 'tinybase';
import { type ActivityId, type ActivityRow, type ActivityRowInput } from '@devalbo-cli/shared';
export declare const logActivity: (store: Store, id: ActivityId, row: ActivityRowInput) => void;
export declare const listActivities: (store: Store) => Array<{
    id: ActivityId;
    row: ActivityRow;
}>;
export declare const listActivitiesForSubject: (store: Store, subjectType: ActivityRow["subjectType"], subjectId: string) => Array<{
    id: ActivityId;
    row: ActivityRow;
}>;
//# sourceMappingURL=activities.d.ts.map