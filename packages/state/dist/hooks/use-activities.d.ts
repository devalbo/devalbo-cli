import type { ActivityId, ActivityRow } from '@devalbo-cli/shared';
export interface ActivityFilter {
    subjectType?: ActivityRow['subjectType'];
    subjectId?: string;
}
export declare const useActivities: (filter?: ActivityFilter) => Array<{
    id: ActivityId;
    row: ActivityRow;
}>;
//# sourceMappingURL=use-activities.d.ts.map