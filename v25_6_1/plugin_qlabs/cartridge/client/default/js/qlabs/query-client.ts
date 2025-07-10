import { QueryClient } from "@tanstack/react-query";
import { broadcastQueryClient } from "@tanstack/query-broadcast-client-experimental";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 10 * (60 * 1000), // 10 minutes
        },
    },
});

// This works well but not perfectly with react-hook-form; need to resolve that first
broadcastQueryClient({
    /* @ts-ignore */
    queryClient,
    broadcastChannel: "q-labs-companion",
});

export default queryClient;
