import queryClient from "../query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy, useEffect, useState } from "react";

const ReactQueryDevtoolsProduction = lazy(() =>
    import("@tanstack/react-query-devtools/build/modern/production.js").then(
        (d) => ({
            default: d.ReactQueryDevtools,
        }),
    ),
);

export const DevTools = ({ showOnLoad = false }) => {
    const [showDevtools, setShowDevtools] = useState(showOnLoad);

    useEffect(() => {
        // @ts-expect-error
        window.toggleDevtools = () => setShowDevtools((old) => !old);
    }, []);

    return (
        <>
            {showDevtools && (
                <Suspense fallback={null}>
                    <QueryClientProvider client={queryClient}>
                        <ReactQueryDevtoolsProduction />
                    </QueryClientProvider>
                </Suspense>
            )}
        </>
    );
};
