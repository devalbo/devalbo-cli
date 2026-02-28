import { Effect } from 'effect';
import type { CommandResult } from '@devalbo-cli/shared';
import { MissingArgument } from '@devalbo-cli/shared';
import type { ReactNode } from 'react';
export declare const withValidation: <A>(validate: Effect.Effect<A, MissingArgument>, onSuccess: (value: A) => ReactNode, onMissingArg: (error: MissingArgument) => ReactNode) => CommandResult;
//# sourceMappingURL=validation.d.ts.map