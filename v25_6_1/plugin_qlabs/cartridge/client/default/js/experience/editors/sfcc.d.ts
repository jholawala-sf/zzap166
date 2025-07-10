// sfcc.d.ts

declare global {
    function subscribe(
        eventName: "sfcc:ready",
        callback: (event: { config: unknown; value: unknown }) => void,
    ): void;
    function subscribe(
        eventName: "sfcc:value",
        callback: (value: unknown) => void,
    ): void;
    function subscribe(
        eventName: "sfcc:disabled",
        callback: (disabled: boolean) => void,
    ): void;
    function subscribe(
        eventName: string,
        callback: (...args: unknown[]) => void,
    ): void;

    function emit(event: { type: string; payload?: unknown }): void;
}

export {};
