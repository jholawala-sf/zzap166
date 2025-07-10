/**
 * This implements shopper search using the agent API
 */
import {
    type ProductRef,
    type ProductTileResponse,
    useProductTiles,
} from "@companion/state/products";
import {
    AgentContext,
    type IAgentContext,
    useAgentAPI,
} from "@qlabs/state/agentapi";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ArrowPathIcon } from "./icons";
import { ChatInputView, MessagesView } from "./messages";
import { ProductTileView, FallbackProductTileView } from "./product-tile";

interface ProductResultMessage {
    userFriendlyMessage: string;
    products: ProductRef[];
}

interface AgentSearch {
    action: {
        output: ProductResultMessage;
    };
}

function ProductRecommendations({
    products,
    sendPinnedProductMessage,
}: {
    products: ProductRef[];
    sendPinnedProductMessage?: boolean;
}) {
    const productIds = products.map((product) => product.productId);
    const { data: productTiles, isLoading } = useProductTiles(productIds);

    return (
        <>
            {!isLoading &&
                productTiles.map((productTile, index) => (
                    <div className="md:w-1/3 w-1/2 mb-2 px-2" key={index}>
                        {productTile.product.error ? (
                            <FallbackProductTileView
                                productTile={productTile}
                                originalProduct={products[index]}
                            />
                        ) : (
                            <ProductTileView
                                productTile={productTile}
                                sendPinnedProductMessage={
                                    sendPinnedProductMessage
                                }
                            />
                        )}
                    </div>
                ))}
        </>
    );
}

interface ShopperAgentAPIProps {
    initialMessage?: string;
    initialMessageFromQuery?: string;
    initialMessagePrefix?: string;
    initialMessageSuffix?: string;
    inlineRecommendations?: boolean;
    allowPinning?: boolean;
    children?: React.ReactNode;

    // allow arbitrary props
    [key: string]: any;
}

export function ShopperAgentAPI({
    initialMessage: initialMessageProp,
    initialMessageFromQuery,
    initialMessagePrefix = "",
    initialMessageSuffix = "",
    inlineRecommendations = false,
    allowPinning = true,
    chatInputViewPlaceholder = "Search for something else...",
    children,
    ...props
}: ShopperAgentAPIProps) {
    const { agent } = useContext<IAgentContext>(AgentContext);

    const { messages, isLoading, sendMessage, data, resetSession, isActive } =
        useAgentAPI<AgentSearch>();

    const chatContainerRef = useRef(null);

    const initialMessage = useMemo(() => {
        if (initialMessageProp) {
            return initialMessageProp;
        }

        // get q= from query string
        if (initialMessageFromQuery) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(initialMessageFromQuery);
        }
    }, []);

    useEffect(() => {
        // only send the query if we're starting the convo
        if (initialMessage && !isLoading && messages.length === 1) {
            sendMessage(
                initialMessagePrefix + initialMessage + initialMessageSuffix,
            );
        }
    }, [initialMessage, isLoading, messages.length]);

    const scrollChatContainer = () => {
        setTimeout(() => {
            chatContainerRef.current?.scroll(
                0,
                chatContainerRef.current.scrollHeight,
            );
        }, 100);
    };

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-2">
                <div
                    className={`w-full ${inlineRecommendations ? "" : "md:w-1/2"} px-2`}
                >
                    <div className="rounded-lg shadow overflow-hidden">
                        <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
                            <h5 className="text-lg font-medium mb-0">
                                Chat with Agent
                            </h5>
                            <button
                                className="text-white"
                                onClick={() => {
                                    resetSession();
                                }}
                                aria-label="Reset chat"
                            >
                                <ArrowPathIcon className="size-6" />
                            </button>
                        </div>
                        <div
                            ref={chatContainerRef}
                            className="p-4 pb-0 overflow-auto scroll-smooth"
                            style={{ minHeight: "400px", maxHeight: "700px" }}
                        >
                            <MessagesView
                                messages={messages}
                                isLoading={isLoading}
                                allowPinning={allowPinning}
                                inlineRecommendations={inlineRecommendations}
                                onUpdate={scrollChatContainer}
                                {...props}
                            >
                                {children}
                            </MessagesView>
                        </div>
                        <div className="bg-gray-50 px-4 py-3">
                            <ChatInputView
                                onSendMessage={sendMessage}
                                disabled={isLoading || !isActive}
                                placeholder={chatInputViewPlaceholder}
                            />
                        </div>
                    </div>
                </div>

                {!inlineRecommendations && (
                    <div className="w-full md:w-1/2 px-2 md:mt-0 hidden md:block">
                        <div className="rounded-lg shadow overflow-hidden h-full">
                            <div className="bg-primary text-white px-4 py-3">
                                <h5 className="text-lg font-medium mb-0">
                                    Recommended Products
                                </h5>
                            </div>
                            <div
                                className="p-4 overflow-auto"
                                style={{ height: "calc(100% - 56px)" }}
                            >
                                {data &&
                                data?.action?.output?.products?.length ? (
                                    <div className="flex flex-wrap -mx-2">
                                        <ProductRecommendations
                                            products={
                                                data.action.output.products
                                            }
                                            sendPinnedProductMessage={
                                                props.sendPinnedProductMessage
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="flex justify-center items-center h-full">
                                        <p className="text-gray-500">
                                            Waiting for product
                                            recommendations...
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
