import { CONFIG } from "@qlabs/config";
import { useQuery } from "@tanstack/react-query";
const SITE_ID = CONFIG.currentSite;
const PRODUCT_TILE_URL = `/on/demandware.store/Sites-${SITE_ID}-Site/default/Tile-Show`;
const PRODUCT_TILE_BATCH_URL = `/on/demandware.store/Sites-${SITE_ID}-Site/default/Tile-Batch`;

interface Price {
    value: number;
    currency: string;
    formatted: string;
    decimalPrice: string;
}
interface Image {
    alt: string;
    url: string;
    title: string;
}
interface ProductTile {
    id: string;
    productName: string;
    price: {
        sales: Price;
        list: Price;
    };
    images: {
        [viewType: string]: Image[];
    };
    error: boolean;
}
export interface ProductRef {
    name: string;
    productId: string;
    productUrl: string;
    productName: string;
    quickViewUrl: string;
    addToCartUrl: string;
    price?: {
        sales?: Partial<Price>;
        list?: Partial<Price>;
    };
    images: {
        [viewType: string]: Image[];
    };
}
export interface ProductTileResponse {
    product: ProductTile;
    urls: {
        product: string;
        quickView: string;
        addToCart: string;
    };
}

export function useProductTile(productId: string) {
    return useQuery<ProductTileResponse>({
        queryKey: ["productTileJson", productId],
        queryFn: async () => {
            const params = new URLSearchParams({
                pid: productId,
                asJSON: "true",
            });
            const response = await fetch(
                `${PRODUCT_TILE_URL}?${params.toString()}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (!response.ok) {
                throw new Error("Error fetching product tile data");
            }
            const data = await response.json();
            return data;
        },
    });
}

export function useProductTiles(productIds: string[]) {
    return useQuery<ProductTileResponse[]>({
        queryKey: ["productTileBatch", productIds],
        queryFn: async () => {
            const params = new URLSearchParams({
                pids: productIds.join(","),
            });
            const response = await fetch(
                `${PRODUCT_TILE_BATCH_URL}?${params.toString()}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            if (!response.ok) {
                throw new Error("Error fetching product tile data");
            }
            const data = await response.json();
            return data.products;
        },
        staleTime: Infinity,
        placeholderData: (prev) => prev,
    });
}
