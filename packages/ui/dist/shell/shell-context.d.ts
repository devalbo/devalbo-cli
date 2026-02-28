export interface ShellContextValue {
    isCommandRunning: boolean;
    startCommand: () => void;
    endCommand: () => void;
}
declare const ShellContext: import("react").Context<ShellContextValue | null>;
export declare const useShell: () => ShellContextValue;
export { ShellContext };
//# sourceMappingURL=shell-context.d.ts.map