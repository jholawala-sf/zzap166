// Singleton event manager for QLabs companion
import queryClient from "@companion/query-client";

export type CallbackFunc = (
    payload: unknown,
    context?: Record<string, unknown>,
) => void;

export type EmitFunc = (
    name: string,
    payload?: unknown,
    context?: Record<string, unknown>,
) => void;

export type SubscribeFunc = (
    name: string,
    callback: CallbackFunc,
    context?: Record<string, unknown>,
) => () => void;

declare global {
    interface Window {
        _qlabsEvents: (string | [string, unknown, Record<string, unknown>])[];
        _qlabsSubscribers: [string, CallbackFunc, Record<string, unknown>][];
        qlabsEmit: EmitFunc;
        qlabsSubscribe: SubscribeFunc;
    }
}

interface Subscription {
    id: number;
    name: string;
    callback: CallbackFunc;
    context?: Record<string, unknown>;
}

interface EventRecord {
    name: string;
    payload: unknown;
    context?: Record<string, unknown>;
    timestamp: number;
}

let subscribers: Subscription[] = [];
let nextSubscriptionId = 0;
let isInitialized = false;

export const eventHistoryQueryKey = ["qlabsEvents", "history"];

/**
 * This should be called once
 */
export function initializeEventManager() {
    if (isInitialized) {
        console.warn("EventManager: Already initialized");
        return;
    }
    isInitialized = true;

    if (!queryClient.getQueryData(eventHistoryQueryKey)) {
        queryClient.setQueryData(eventHistoryQueryKey, () => []);
    }

    // these can be provided prior to companion being loaded
    window._qlabsEvents = Array.isArray(window._qlabsEvents)
        ? window._qlabsEvents
        : [];

    const bufferedEvents = [...window._qlabsEvents]; // Copy buffer
    window._qlabsEvents.length = 0;
    bufferedEvents.forEach((args) => {
        if (Array.isArray(args)) {
            qlabsEmit(args[0], args[1], args[2]);
        } else if (typeof args === "string") {
            qlabsEmit(args);
        }
    });

    window._qlabsEvents.push = (args) => {
        if (Array.isArray(args)) {
            qlabsEmit(args[0], args[1], args[2]);
        } else if (typeof args === "string") {
            qlabsEmit(args);
        }
        const history =
            queryClient.getQueryData<EventRecord[]>(eventHistoryQueryKey) || [];
        return history.length;
    };

    window._qlabsSubscribers = window._qlabsSubscribers || [];
    window._qlabsSubscribers.forEach((sub) => {
        qlabsSubscribe(sub[0], sub[1], sub[2]);
    });
    window._qlabsSubscribers.length = 0;
    window._qlabsSubscribers.push = (sub) => {
        qlabsSubscribe(sub[0], sub[1], sub[2]);
        return subscribers.length;
    };

    window.qlabsEmit = qlabsEmit;
    window.qlabsSubscribe = qlabsSubscribe;
}

function matchesContext(
    subContext: Record<string, unknown>,
    emitContext: Record<string, unknown>,
) {
    // match all events if we subscribe to no context
    if (!subContext || Object.keys(subContext).length === 0) {
        return true;
    }
    // if no context is emitted broadcast to all subscribers
    if (!emitContext) {
        return true;
    }

    // check if any provided emit context matches the subscription context
    // ignore undefined values
    return Object.entries(subContext).every(
        ([key, value]) =>
            !emitContext.hasOwnProperty(key) || emitContext[key] === value,
    );
}

/**
 * Subscribes to events matching a name prefix and optional context.
 */
export function qlabsSubscribe(
    name: string,
    callback: CallbackFunc,
    context?: Record<string, unknown>,
) {
    const id = nextSubscriptionId++;
    const subscription = { id, name, callback, context };
    subscribers.push(subscription);

    const history =
        queryClient.getQueryData<EventRecord[]>(eventHistoryQueryKey) || [];
    history.forEach((event) => {
        if (
            event.name.startsWith(name) &&
            matchesContext(context, event.context)
        ) {
            callback?.(event.payload, event.context);
        }
    });

    return () => {
        subscribers = subscribers.filter((sub) => sub.id !== id);
    };
}

/**
 * Emits an event to all matching subscribers.
 */
export function qlabsEmit(
    name: string,
    payload?: unknown,
    context?: Record<string, unknown>,
) {
    if (!isInitialized) {
        window._qlabsEvents = Array.isArray(window._qlabsEvents)
            ? window._qlabsEvents
            : [];
        window._qlabsEvents.push([name, payload, context]);
        return;
    }

    const eventRecord = {
        name,
        payload,
        context,
        timestamp: Date.now(),
    };

    queryClient.setQueryData(
        eventHistoryQueryKey,
        (oldHistory: EventRecord[] = []) => {
            return [...oldHistory, eventRecord];
        },
    );

    subscribers.forEach((sub) => {
        if (name.startsWith(sub.name) && matchesContext(sub.context, context)) {
            sub?.callback(payload, context);
        }
    });
}
