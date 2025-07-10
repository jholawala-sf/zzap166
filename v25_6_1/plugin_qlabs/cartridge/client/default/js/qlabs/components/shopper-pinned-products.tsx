import { usePinnedProducts } from "@companion/state/pinned-products";
import { useProductTiles } from "../state/products";

const IMAGE_VIEW_TYPE = "medium";

import { useEffect, useState } from "react";
import { BookmarkIcon } from "./icons";
import { ProductTileView } from "./product-tile";

export const ShopperPinnedProducts = () => {
    const { removePinnedProduct, pinnedProducts } = usePinnedProducts();
    return (
        <PinnedProducts
            pinnedProducts={pinnedProducts}
            onUnpin={removePinnedProduct}
        />
    );
};

export function PinnedProducts({ pinnedProducts, onUnpin }) {
    if (!pinnedProducts || pinnedProducts.length === 0) {
        return null;
    }

    const { data: pinnedProductsData, isLoading } =
        useProductTiles(pinnedProducts);
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = sessionStorage.getItem("pinnedProductsCollapsed");
        return savedState ? JSON.parse(savedState) : false;
    });

    // Toggle collapsed state and update sessionStorage
    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        sessionStorage.setItem(
            "pinnedProductsCollapsed",
            JSON.stringify(newState),
        );
    };

    useEffect(() => {
        // If there are no pinned products anymore, we can reset the collapsed state
        if (pinnedProducts.length === 0) {
            sessionStorage.removeItem("pinnedProductsCollapsed");
        }
    }, [pinnedProducts.length]);

    return (
        <div className="w-full">
            <div className="shadow overflow-hidden">
                <div className="flex flex-row">
                    <div
                        className="bg-primary text-white px-4 py-3 flex items-center justify-center min-w-[80px] cursor-pointer hover:bg-primary-dark transition-colors relative"
                        onClick={toggleCollapse}
                        title={
                            isCollapsed
                                ? "Expand pinned products"
                                : "Collapse pinned products"
                        }
                    >
                        {isCollapsed ? (
                            <BookmarkIcon solid className="size-8" />
                        ) : (
                            <BookmarkIcon className="size-8" />
                        )}
                    </div>

                    {!isCollapsed ? (
                        <div className="flex-1 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            <div className="flex flex-nowrap space-x-4 px-4 py-3">
                                {pinnedProductsData?.map((productTileResp) => (
                                    <div
                                        key={productTileResp?.product.id}
                                        className="flex-shrink-0 w-[120px] lg:w-[calc((100%-4rem)/7)] xl:w-[calc((100%-5rem)/8)]"
                                    >
                                        <ProductTileView
                                            productTile={productTileResp}
                                            showPrice={false}
                                            showName={false}
                                            showQuickView={false}
                                            allowPinning={true}
                                            isLoading={isLoading}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 bg-primary flex items-center px-4"></div>
                    )}
                </div>
            </div>
        </div>
    );
}
