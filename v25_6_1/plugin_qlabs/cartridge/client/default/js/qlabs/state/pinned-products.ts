import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CONFIG } from "@qlabs/config";

const SITE_ID = CONFIG.currentSite;
// Storage key
const STORAGE_KEY = "pinnedProducts-" + SITE_ID;

// Utility functions to read/write from storage
const getPinnedProducts = (): string[] => {
    try {
        const savedPinned = localStorage.getItem(STORAGE_KEY);
        return savedPinned ? JSON.parse(savedPinned) : [];
    } catch (error) {
        console.error("Error reading pinned products:", error);
        return [];
    }
};

const savePinnedProducts = (products: string[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        console.error("Error saving pinned products:", error);
    }
};

// Main hook
export function usePinnedProducts() {
    const queryClient = useQueryClient();

    // Query for getting pinned products
    const { data: pinnedProducts = [] } = useQuery({
        queryKey: ["pinnedProducts"],
        queryFn: getPinnedProducts,
        // Since this is local state, we don't need refetching
        staleTime: Infinity,
    });

    // Mutation for adding a product
    const addPinnedProduct = useMutation({
        mutationFn: async (productId: string) => {
            const currentProducts = getPinnedProducts();
            // Only add if not already pinned
            if (!currentProducts.includes(productId)) {
                const updatedProducts = [...currentProducts, productId];
                savePinnedProducts(updatedProducts);
                return updatedProducts;
            }
            return currentProducts;
        },
        onSuccess: (updatedProducts) => {
            queryClient.setQueryData(["pinnedProducts"], updatedProducts);
        },
    });

    // Mutation for removing a product
    const removePinnedProduct = useMutation({
        mutationFn: async (productId: string) => {
            const currentProducts = getPinnedProducts();
            const updatedProducts = currentProducts.filter(
                (id) => id !== productId,
            );
            savePinnedProducts(updatedProducts);
            return updatedProducts;
        },
        onSuccess: (updatedProducts) => {
            queryClient.setQueryData(["pinnedProducts"], updatedProducts);
        },
    });

    // Mutation for setting all pinned products
    const setPinnedProducts = useMutation({
        mutationFn: async (products: string[]) => {
            savePinnedProducts(products);
            return products;
        },
        onSuccess: (updatedProducts) => {
            queryClient.setQueryData(["pinnedProducts"], updatedProducts);
        },
    });

    return {
        pinnedProducts,
        addPinnedProduct: (productId: string) =>
            addPinnedProduct.mutate(productId),
        removePinnedProduct: (productId: string) =>
            removePinnedProduct.mutate(productId),
        setPinnedProducts: (products: string[]) =>
            setPinnedProducts.mutate(products),
        isPending:
            addPinnedProduct.isPending ||
            removePinnedProduct.isPending ||
            setPinnedProducts.isPending,
        pinnedProductMessagePrefix: "PINNED_PRODUCT_MESSAGE",
    };
}
