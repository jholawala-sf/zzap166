import { useQuery } from "@tanstack/react-query";
import { CONFIG } from "@qlabs/config";

const SITE_ID = CONFIG.currentSite;
const CONTENT_ASSET_URL = `/on/demandware.store/Sites-${SITE_ID}-Site/default/QLabsStorefront-ContentAsset`;

export interface ContentAssetResponse {
    content: string; // HTML content
    id: string;
}

export function useContentAsset(cid: string) {
    return useQuery<ContentAssetResponse>({
        queryKey: ["contentAsset", cid],
        queryFn: async () => {
            const params = new URLSearchParams({
                cid: cid,
            });
            const response = await fetch(
                `${CONTENT_ASSET_URL}?${params.toString()}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Error fetching content asset data");
            }

            return await response.json();
        },
        staleTime: Infinity,
    });
}
