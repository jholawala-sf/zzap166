import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CONFIG } from "@qlabs/config";

const SITE_ID = CONFIG.currentSite;
const UI_STATE_STORAGE_PREFIX = `agent-ui-state-${SITE_ID}`;

const getStorageKey = (agentName: string, sessionKey: string | undefined) =>
    `${UI_STATE_STORAGE_PREFIX}-${agentName}${sessionKey ? "-" + sessionKey : ""}`;

// load agent UI state from session storage
const loadUIState = (agentName: string, sessionKey: string) => {
    if (typeof localStorage === "undefined") return {};

    try {
        const key = getStorageKey(agentName, sessionKey);
        const storedState = localStorage.getItem(key);
        return storedState ? JSON.parse(storedState) : {};
    } catch (e) {
        console.error("Failed to load agent UI state:", e);
        return {};
    }
};

// save agent UI state to local storage
const saveUIState = (agentName: string, sessionKey: string, state: any) => {
    if (typeof localStorage === "undefined") return;

    try {
        const key = getStorageKey(agentName, sessionKey);
        localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
        console.error("Failed to save agent UI state:", e);
    }
};

// clear UI state from local storage
const clearUIState = (agentName: string, sessionKey: string) => {
    if (typeof localStorage === "undefined") return;

    try {
        const key = getStorageKey(agentName, sessionKey);
        localStorage.removeItem(key);
    } catch (e) {
        console.error("Failed to clear agent UI state:", e);
    }
};

// default UI state
const defaultUIState = {
    userClosedModal: undefined,
};

export function useAgentUI(agentName: string, sessionKey: string) {
    const queryClient = useQueryClient();
    const queryKey = ["agentUIState", agentName, sessionKey || ""];
    const isReady = !!sessionKey;

    // query to get UI state
    const { data: uiState = defaultUIState } = useQuery({
        queryKey,
        queryFn: () =>
            isReady ? loadUIState(agentName, sessionKey) : defaultUIState,
        staleTime: Infinity,
        enabled: isReady,
    });

    // update UI state
    const updateUIState = useMutation({
        mutationFn: (newState: Partial<typeof defaultUIState>) => {
            queryClient.setQueryData(queryKey, (old: any) => {
                const updatedState = { ...old, ...newState };
                saveUIState(agentName, sessionKey, updatedState);
                return updatedState;
            });
            return Promise.resolve();
        },
    });

    // set modal closed state
    const setUserClosedModal = (closed: boolean) => {
        if (isReady) {
            updateUIState.mutate({ userClosedModal: closed });
        }
    };

    // reset UI state
    const resetUIState = () => {
        clearUIState(agentName, sessionKey);
        queryClient.setQueryData(queryKey, defaultUIState);
    };

    return {
        userClosedModal: uiState.userClosedModal,
        setUserClosedModal,
        resetUIState,
    };
}
