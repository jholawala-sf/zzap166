import { useMemo } from "react";
import { qlabsEmit, qlabsSubscribe } from "./event-manager";

interface UseEventsRet {
    subscribe: (
        namePrefix: string,
        callback: (payload: any) => void,
        context?: Record<string, any>,
    ) => () => void;
    emit: (name: string, payload?: any, context?: Record<string, any>) => void;
}
export function useEvents(): UseEventsRet {
    const eventApi = useMemo(
        () => ({
            subscribe: qlabsSubscribe,
            emit: qlabsEmit,
        }),
        [],
    );

    return eventApi;
}
