import { type ReactNode } from 'react';
import type { AppConfig } from '@devalbo-cli/shared';
export declare const AppConfigContext: import("react").Context<AppConfig | null>;
export declare const AppConfigProvider: React.FC<{
    config: AppConfig;
    children: ReactNode;
}>;
export declare const useAppConfig: () => AppConfig;
//# sourceMappingURL=use-app-config.d.ts.map