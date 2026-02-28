import type { AppConfig } from '@devalbo-cli/shared';
import type { ProgramLike } from './types/program';
/**
 * Register all built-in cli-shell commands on a commander program.
 *
 * Call this after registering your own app-specific commands so that
 * `help` displays everything. Built-in commands include filesystem
 * operations, system commands, and app-config.
 */
export declare const registerBuiltinCommands: (program: ProgramLike) => void;
/**
 * Generate a default shell welcome message from AppConfig.
 *
 * Output format: `Welcome to <name>. Type "help" for available commands.`
 */
export declare const defaultWelcomeMessage: (config?: Pick<AppConfig, "appName" | "appId">) => string;
//# sourceMappingURL=program-helpers.d.ts.map