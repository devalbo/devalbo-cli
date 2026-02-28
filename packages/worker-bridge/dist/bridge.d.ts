import { type BridgeResponse } from './protocols';
export interface WorkerLike {
    postMessage(message: unknown): void;
    addEventListener(type: 'message', listener: (event: MessageEvent) => void): void;
    removeEventListener(type: 'message', listener: (event: MessageEvent) => void): void;
}
export interface WorkerBridgeOptions {
    timeoutMs?: number;
}
export declare class WorkerBridge {
    private readonly worker;
    private readonly timeoutMs;
    private readonly pending;
    private readonly onMessageBound;
    constructor(worker: WorkerLike, options?: WorkerBridgeOptions);
    send<TRequest = unknown>(type: string, payload: TRequest): Promise<BridgeResponse>;
    dispose(): void;
    private onMessage;
}
//# sourceMappingURL=bridge.d.ts.map