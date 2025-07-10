import React, { useEffect } from "react";
import { useAgentAPI } from "@qlabs/state/agentapi";
import { useExpr } from "@companion/hooks/jsonata";
import { ContentAsset } from "./content-asset";
import type { MessageViewProps } from "./messages";

interface ButtonOption {
    text: string; // text to display on button or title in tile view
    response: string; // text to send to agent when clicked
    isTile?: boolean; // flag to render as a tile instead of a button
    imageUrl?: string; // optional image URL for image-based buttons
    maxImageHeight?: string | number; // optional max height for the image
    description?: string; // description text for tile view
    html?: string; // additional HTML content for tile view
    cid?: string; // content asset ID to render
}

interface ButtonsViewProps extends MessageViewProps {
    query?: string; // JSONata query to extract button options
    className?: string;
}

/**
 * Renders buttons that send predefined responses to the agent when clicked
 */
export function ButtonsView({
    message,
    onUpdate,
    query = "action.output.buttons",
    className = "",
}: ButtonsViewProps) {
    const { sendMessage } = useAgentAPI();
    const { result: buttonOptions, isLoading } = useExpr<ButtonOption[]>(
        query,
        message.MESSAGE_TYPE === "USER" ? undefined : message.json,
    );

    const handleButtonClick = (response: string) => {
        if (response.startsWith("http://") || response.startsWith("https://")) {
            window.location.href = response;
        } else {
            if (sendMessage) {
                sendMessage(response);
                if (onUpdate) {
                    onUpdate();
                }
            }
        }
    };

    useEffect(() => {
        if (!isLoading && buttonOptions && onUpdate) {
            setTimeout(() => {
                onUpdate();
            }, 100);
        }
    }, [isLoading, buttonOptions]);

    if (!buttonOptions || buttonOptions.length === 0) {
        return null;
    }

    const tileClassName =
        "border border-primary bg-gray-50 rounded-md p-4 cursor-pointer hover:bg-gray-200 max-w-sm";

    return (
        <div
            className={`${className} flex flex-wrap gap-2 justify-center my-4`}
        >
            {buttonOptions.map((option, index) => {
                if (option.cid) {
                    return (
                        <div
                            key={index}
                            onClick={() =>
                                handleButtonClick(
                                    option.response || option.text,
                                )
                            }
                            className={tileClassName}
                        >
                            <ContentAsset cid={option.cid} />
                        </div>
                    );
                }

                if (option.isTile) {
                    return (
                        <div
                            key={index}
                            onClick={() =>
                                handleButtonClick(
                                    option.response || option.text,
                                )
                            }
                            className={tileClassName}
                        >
                            {/* title and image section */}
                            <div className="mb-3 border-b border-gray-300">
                                <p className="font-bold text-black">
                                    {option.imageUrl && (
                                        <span className="inline-block mr-2">
                                            <img
                                                src={option.imageUrl}
                                                alt=""
                                                className="inline-block object-contain"
                                                style={
                                                    option.maxImageHeight
                                                        ? {
                                                              maxHeight:
                                                                  option.maxImageHeight,
                                                          }
                                                        : undefined
                                                }
                                            />
                                        </span>
                                    )}
                                    <span>{option.text}</span>
                                </p>
                            </div>

                            {/* description section */}
                            {option.description && (
                                <div className="text-medium mb-3">
                                    {option.description}
                                </div>
                            )}

                            {/* HTML content */}
                            {option.html && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: option.html,
                                    }}
                                />
                            )}

                            {/* Content Asset */}
                            {option.cid && <ContentAsset cid={option.cid} />}
                        </div>
                    );
                }

                // standard button rendering
                return (
                    <button
                        key={index}
                        onClick={() =>
                            handleButtonClick(option.response || option.text)
                        }
                        className={`rounded-md border transition-colors
                            ${
                                option.imageUrl
                                    ? "border-primary bg-white p-1 flex flex-col items-center"
                                    : "bg-primary text-white px-4 py-2"
                            }`}
                    >
                        {option.imageUrl && (
                            <img
                                src={option.imageUrl}
                                alt={option.text}
                                className="w-full h-auto object-contain mb-1"
                                style={
                                    option.maxImageHeight
                                        ? { maxHeight: option.maxImageHeight }
                                        : undefined
                                }
                            />
                        )}
                        <span>{option.text}</span>
                    </button>
                );
            })}
        </div>
    );
}
