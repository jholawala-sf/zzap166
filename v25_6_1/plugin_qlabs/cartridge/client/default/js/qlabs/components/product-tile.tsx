import { useAgentAPI } from "@qlabs/state/agentapi";
import { usePinnedProducts } from "@companion/state/pinned-products";
import {
    type ProductRef,
    type ProductTileResponse,
    useProductTile,
} from "@companion/state/products";
import React, { useMemo, useState } from "react";
import { BookmarkIcon } from "./icons";

interface ProductTileViewProps {
    productTile: ProductTileResponse;
    allowPinning?: boolean;
    showName?: boolean;
    showPrice?: boolean;
    showQuickView?: boolean;
    showBuyButton?: boolean;
    isLoading?: boolean;
    openInNewTab?: boolean;
    imageViewType?: "small" | "medium" | "large";
    sendPinnedProductMessage?: boolean;
}

interface ProductTileProps
    extends Omit<ProductTileViewProps, "isLoading" | "productTile"> {
    productId: string;
}

export function ProductTile({ productId, ...props }) {
    const { data, isLoading } = useProductTile(productId);
    return (
        <ProductTileView productTile={data} isLoading={isLoading} {...props} />
    );
}

export function FallbackProductTileView({
    productTile,
    originalProduct,
}: {
    productTile: ProductTileResponse;
    originalProduct: ProductRef;
}) {
    const defaultPrice = {
        sales: { value: 0, currency: "", formatted: "", decimalPrice: "" },
        list: { value: 0, currency: "", formatted: "", decimalPrice: "" },
    };
    const fallbackTile = useMemo<ProductTileResponse>(
        () => ({
            product: {
                error: false,
                id: originalProduct.productId,
                productName:
                    originalProduct.productName || "Product Unavailable",
                price: originalProduct.price
                    ? (originalProduct.price as any)
                    : defaultPrice,
                images: originalProduct.images || {},
            },
            urls: {
                product: originalProduct.productUrl || productTile.urls.product,
                quickView:
                    originalProduct.quickViewUrl || productTile.urls.quickView,
                addToCart:
                    originalProduct.addToCartUrl || productTile.urls.addToCart,
            },
        }),
        [productTile, originalProduct],
    );

    // this is to handle mocking behaviors
    if (
        fallbackTile.product.productName === "Product Unavailable" ||
        !Object.keys(fallbackTile.product.images).length
    ) {
        return null;
    }
    return (
        <div className="w-full">
            <ProductTileView
                productTile={fallbackTile}
                allowPinning={false}
                showQuickView={false}
                openInNewTab={true}
            />
        </div>
    );
}

export function ProductTileView({
    productTile,
    showName = true,
    showPrice = true,
    showQuickView = true,
    showBuyButton = false,
    imageViewType = "medium",
    allowPinning = true,
    isLoading = false,
    openInNewTab = false,
    sendPinnedProductMessage = false,
}: ProductTileViewProps) {
    const {
        pinnedProducts,
        addPinnedProduct,
        removePinnedProduct,
        pinnedProductMessagePrefix,
    } = usePinnedProducts();
    const { sendMessage } = useAgentAPI();
    const isPinned = pinnedProducts.includes(productTile?.product?.id);
    const id = productTile?.product?.id;
    const productName = productTile?.product?.productName;
    const [isHovered, setIsHovered] = useState(false);

    const togglePin = () => {
        if (isPinned) {
            removePinnedProduct(id);
        } else {
            addPinnedProduct(id);
        }
        if (sendPinnedProductMessage) {
            sendMessage(
                `${pinnedProductMessagePrefix}_${isPinned ? "unpinned" : "pinned"}_${id}_${productName}`,
            );
        }
    };

    const getLinkProps = () =>
        openInNewTab
            ? {
                  target: "_blank",
                  rel: "noopener noreferrer",
              }
            : {};
    return (
        <div className="w-full">
            <div
                className="border rounded-lg overflow-hidden relative bg-white h-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {allowPinning && (
                    <button
                        onClick={togglePin}
                        className="absolute top-1 right-1 bg-red-500 text-black rounded-full w-9 h-9 p-1 flex items-center justify-center z-10 text-md"
                        aria-label="Remove from pinned"
                    >
                        {isPinned ? (
                            <BookmarkIcon solid className="size-9" />
                        ) : (
                            <BookmarkIcon className="size-9" />
                        )}
                    </button>
                )}

                {isLoading ? (
                    <div className="h-24 w-full flex justify-center items-center bg-gray-100">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent"></div>
                    </div>
                ) : (
                    <div className="text-center p-1 mt-2 relative">
                        <div className="relative">
                            <a
                                href={productTile.urls.product}
                                {...getLinkProps()}
                                className="block"
                            >
                                {productTile.product?.images?.[
                                    imageViewType
                                ]?.[0]?.url ? (
                                    <img
                                        src={
                                            productTile.product.images[
                                                imageViewType
                                            ]?.[0].url
                                        }
                                        alt={
                                            productTile.product.images[
                                                imageViewType
                                            ]?.[0].alt
                                        }
                                        title={
                                            productTile.product.images[
                                                imageViewType
                                            ]?.[0].title
                                        }
                                        className="w-full h-auto object-contain max-h-[150px]"
                                        height={150}
                                    />
                                ) : (
                                    <img
                                        src="/on/demandware.static/Sites-nto-Site/-/default/dwade5f90d/images/noimagelarge.png"
                                        className="w-full h-auto object-contain max-h-[150px]"
                                    />
                                )}
                            </a>

                            {/* Actual quick view functionality will be handled by SFRA for now */}
                            {showQuickView && (
                                <a
                                    className={`quickview !hidden absolute bottom-0 left-0 right-0 bg-white text-primary py-2 font-medium border border-primary text-center transition-opacity duration-200 ${
                                        isHovered ? "opacity-100" : "opacity-0"
                                    } md:!block`}
                                    href={productTile.urls.quickView}
                                    aria-label="Quick shop this product"
                                >
                                    Quick Shop
                                </a>
                            )}
                        </div>

                        {(showName || showPrice || showBuyButton) && (
                            <div className="h-24 w-full flex justify-center items-center flex-col">
                                {showName && (
                                    <h5 className="text-lg font-medium mb-0">
                                        {productTile.product.productName}
                                    </h5>
                                )}
                                {showPrice && (
                                    <span>
                                        {
                                            productTile.product?.price?.sales
                                                ?.formatted
                                        }
                                    </span>
                                )}
                                {showBuyButton &&
                                    productTile.urls.addToCart && (
                                        <a
                                            href={productTile.urls.addToCart}
                                            className="mt-2 bg-primary text-white py-1 px-4 rounded hover:bg-primary-dark transition-colors"
                                        >
                                            Buy Now
                                        </a>
                                    )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
