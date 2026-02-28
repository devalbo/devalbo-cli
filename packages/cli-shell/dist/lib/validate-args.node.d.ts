import { Effect } from 'effect';
import { MissingArgument } from '@devalbo-cli/shared';
export interface NavigateArgs {
    path: string;
}
export interface EditArgs {
    file: string;
}
export declare const validateNavigateArgs: (args: string[]) => Effect.Effect<NavigateArgs, MissingArgument>;
export declare const validateEditArgs: (args: string[]) => Effect.Effect<EditArgs, MissingArgument>;
//# sourceMappingURL=validate-args.node.d.ts.map