/**
 * Message box and message box components
 */

import {
    type AgentAPIMessage,
    type AgentMessage,
    type AgentUserMessage,
    useAgentAPI,
} from "@qlabs/state/agentapi";
import { usePinnedProducts } from "@companion/state/pinned-products";
import {
    type ReactElement,
    cloneElement,
    isValidElement,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import ReactMarkdown from "react-markdown";
import jsonata from "jsonata";
import { useExpr } from "@companion/hooks/jsonata";
import { ProductTileView, FallbackProductTileView } from "./product-tile";
import { ButtonsView } from "./buttons";
import {
    type ProductTileResponse,
    type ProductRef,
    useProductTiles,
} from "@companion/state/products";
import { EllipsisVerticalIcon, SpinnerIcon } from "./icons";
import React from "react";
import { EditablePropType, type EditableReactComponent } from "./types";
import { ResponseMessageType } from "@qlabs/api/agentapi";

export interface MessageViewProps {
    message: AgentAPIMessage<any> | AgentUserMessage;
    query?: string;
    onUpdate?: () => void;
}

/**
 * Displays a plain text message formatted via markdown
 * If query is provided look for specific messages in structured data
 *
 * Queries are only relevant for API messages
 */
export function MarkdownMessageView({
    message,
    query = "action.output.userFriendlyMessage ? action.output.userFriendlyMessage : action.output.nextStep",
}: MessageViewProps) {
    const { result, isLoading } = useExpr<string>(
        query,
        message.MESSAGE_TYPE === "USER" ? undefined : message.json,
    );

    // we only care about Inform messages right now
    if (
        message.MESSAGE_TYPE === "AGENT" &&
        message.type !== ResponseMessageType.Inform
    ) {
        return null;
    }

    // only wait for expr if message is not from user
    // and we have structured data that we can query
    if (isLoading && message.MESSAGE_TYPE !== "USER") {
        return null;
    }

    const isUser = message.MESSAGE_TYPE === "USER";
    if (result) {
        var content = result;
    } else if (message.MESSAGE_TYPE === "USER") {
        content = message.text;
    } else {
        content = message.message as string;
    }

    if (!content) {
        // if we have no content, we can skip the box entirely
        // other message types may handle this message
        return null;
    }

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        >
            <div
                className={`[&>*:last-child]:!mb-0 rounded-lg p-3 max-w-3/4 ${isUser ? "bg-primary text-white" : "bg-gray-200 text-black"}`}
            >
                <ReactMarkdown linkTarget="_blank">{content}</ReactMarkdown>
            </div>
        </div>
    );
}

interface ProductTilesViewProps extends MessageViewProps {
    allowPinning?: boolean;
    showQuickView?: boolean;
    showBuyButton?: boolean;
    sendPinnedProductMessage?: boolean;
    className?: string;
}

/**
 * Renders product ids in structured data as product tiles
 */
export function ProductTilesMessageView({
    message,
    allowPinning = true,
    showQuickView = true,
    showBuyButton = false,
    sendPinnedProductMessage = false,
    onUpdate,
    query = "action.output.products.productId",
    className = "",
}: ProductTilesViewProps) {
    const { result: rawProductIds, isLoading } = useExpr<string[]>(
        query,
        message.MESSAGE_TYPE === "USER" ? undefined : message.json,
    );

    // ensure productIds is an array - comes across as string when there is only one product
    const productIds = rawProductIds
        ? Array.isArray(rawProductIds)
            ? rawProductIds
            : [rawProductIds]
        : null;

    // this is just used for mocked/fallback products
    const { result: products } = useExpr<ProductRef[]>(
        "action.output.products",
        message.MESSAGE_TYPE === "USER" ? undefined : message.json,
    );

    const { data: productTiles, isLoading: isTilesLoading } =
        useProductTiles(productIds);

    useEffect(() => {
        if (!isTilesLoading && onUpdate) {
            // give the tile rendering some time to pop-in
            setTimeout(() => {
                onUpdate();
            }, 100);
        }
    }, [isTilesLoading]);

    if (!productIds) {
        return null;
    }

    return (
        <div className={`${className} md:p-4`}>
            <div className="flex flex-wrap -mx-2 my-2 justify-center">
                {!isTilesLoading &&
                    productTiles?.map((productTile, index) => (
                        <div
                            className={`${productTiles.length === 1 ? "w-full" : "md:w-1/3 w-1/2"} mb-2 px-2`}
                            key={index}
                        >
                            {productTile.product.error && products?.[index] ? (
                                <FallbackProductTileView
                                    productTile={productTile}
                                    originalProduct={products[index]}
                                />
                            ) : (
                                <ProductTileView
                                    productTile={productTile}
                                    key={productTile.product.id}
                                    allowPinning={allowPinning}
                                    showQuickView={showQuickView}
                                    showBuyButton={showBuyButton}
                                    sendPinnedProductMessage={
                                        sendPinnedProductMessage
                                    }
                                />
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export function SessionEndedMessageView({ message }: MessageViewProps) {
    const { resetSession } = useAgentAPI();

    // Only handle SessionEnded message types
    if (
        message.MESSAGE_TYPE !== "AGENT" ||
        message.type !== ResponseMessageType.SessionEnded
    ) {
        return null;
    }

    const handleRestartSession = (e) => {
        e.preventDefault();
        resetSession();
    };

    return (
        <div className="flex justify-center mb-4">
            <div className="text-center text-gray-500 px-4 py-2">
                <p className="mb-0">Session has ended</p>
                <a
                    href="#"
                    onClick={handleRestartSession}
                    className="text-primary hover:underline font-medium"
                >
                    Restart Session
                </a>
            </div>
        </div>
    );
}

interface MessagesProps {
    messages: AgentMessage[];
    isLoading: boolean;
    last?: number;
    user?: boolean;
    agent?: boolean;
    skip?: number[];

    // allow arbitrary props
    [key: string]: any;
}

/**
 * Generic message box wrapper with auto scroll
 */
export const Messages: EditableReactComponent<MessagesProps> = ({
    style,
    children,
    autoScroll = true,
    ...props
}) => {
    const { messages, isLoading } = useAgentAPI();
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainer = () => {
        if (!autoScroll) return;
        setTimeout(() => {
            containerRef.current?.scroll(0, containerRef.current.scrollHeight);
        }, 100);
    };

    return (
        <div
            style={props.style}
            ref={containerRef}
            className="overflow-y-auto scroll-smooth"
        >
            <MessagesView
                messages={messages}
                isLoading={isLoading}
                onUpdate={scrollContainer}
                {...props}
            >
                {children}
            </MessagesView>
        </div>
    );
};
Messages.displayName = "Messages";
Messages.__editableProps = {
    autoScroll: {
        name: "Auto Scroll",
        type: EditablePropType.BOOLEAN,
        defaultValue: true,
        description:
            "Automatically scroll to the bottom when new messages are added",
    },
};

function filterTrailingProgressIndicators(arr) {
    const targetType = ResponseMessageType.ProgressIndicator;
    const n = arr.length;

    if (n === 0) {
        return [];
    }

    let firstNonIndicatorIndex = -1;

    for (let i = n - 1; i >= 0; i--) {
        if (arr[i].type !== targetType) {
            firstNonIndicatorIndex = i;
            break;
        }
    }
    const startIndex =
        firstNonIndicatorIndex === -1 ? 0 : firstNonIndicatorIndex + 1;
    if (startIndex >= n) {
        return [];
    }

    return arr.slice(startIndex);
}

/**
 * Loading message spinner; Should also display ProgressIndicator message types
 */
export function LoadingMessage() {
    const { isLoading, messages } = useAgentAPI();
    if (!isLoading) {
        return null;
    }

    const currentProgressIndicators =
        filterTrailingProgressIndicators(messages);
    return (
        <div className="flex justify-start mb-4">
            <div className="bg-gray-200 rounded-lg p-3">
                <div className="flex">
                    <div className="mt-0 flex-shrink-0">
                        <SpinnerIcon className="size-5 animate-spin text-primary mr-2" />
                    </div>
                    <div>
                        {currentProgressIndicators.map((msg, index) => (
                            <div key={index} className="text-gray-500">
                                {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// we only want to display these in messages view
const VALID_MESSAGE_TYPES = [
    ResponseMessageType.Inform,
    ResponseMessageType.SessionEnded,
];

/**
 * Display a box of messages
 *
 * Children can be any "view" component capable of rendering messages.
 * i.e. of type MessageViewProps
 *
 * Containing components should set a max height and overflow-y: auto
 */
export function MessagesView({
    messages,
    isLoading,
    onUpdate,
    inlineRecommendations,
    last,
    user = true,
    agent = true,
    skip = [],
    children,
    ...props
}: MessagesProps) {
    const viewComponents = React.Children.toArray(children).filter(
        isValidElement,
    ) as ReactElement[];

    useEffect(() => {
        if (onUpdate) {
            onUpdate();
        }
    }, [messages]);

    const _messages = useMemo(() => {
        var _messages = messages;

        if (!agent) {
            _messages = messages.filter((msg) => msg.MESSAGE_TYPE !== "AGENT");
        }

        if (!user) {
            _messages = messages.filter((msg) => msg.MESSAGE_TYPE !== "USER");
        }

        // filter out end of turn messages
        _messages = _messages.filter(
            (msg) =>
                msg.MESSAGE_TYPE === "USER" ||
                (msg.MESSAGE_TYPE === "AGENT" &&
                    VALID_MESSAGE_TYPES.includes(msg.type)),
        );

        // filter out pinned product messages
        const { pinnedProductMessagePrefix } = usePinnedProducts();
        _messages = _messages.filter(
            (msg) =>
                !(
                    msg.MESSAGE_TYPE === "USER" &&
                    msg.text?.startsWith(pinnedProductMessagePrefix)
                ),
        );

        // skip messages with 1-based indexing (skip=[1] skips the first message)
        if (skip.length > 0) {
            _messages = _messages.filter(
                (_, index) => !skip.includes(index + 1),
            );
        }

        if (last) {
            if (isLoading) {
                // loading indicator is considered a "message" since
                // it takes up a slot in the message list
                last -= 1;
            }
            if (last === 0) {
                return [];
            }
            _messages = _messages.slice(-last);
        }
        return _messages;
    }, [messages, last, user, agent, isLoading, skip]);

    return (
        <div className="py-1">
            {_messages.map((msg, index) => (
                <>
                    {viewComponents.length ? (
                        viewComponents.map((viewComponent, index) => {
                            return (
                                <React.Fragment key={index}>
                                    {cloneElement<MessageViewProps>(
                                        viewComponent,
                                        {
                                            message: msg,
                                            ...props,
                                        },
                                    )}
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <>
                            <MarkdownMessageView
                                key={index}
                                message={msg}
                                {...props}
                                onUpdate={onUpdate}
                            />
                            <ButtonsView
                                key={index}
                                message={msg}
                                query="action.output.buttons"
                                onUpdate={onUpdate}
                                {...props}
                            />
                            <ProductTilesMessageView
                                key={index}
                                message={msg}
                                query="action.output.products.productId"
                                className={`${inlineRecommendations ? "block" : "block md:hidden"}`}
                                onUpdate={onUpdate}
                                sendPinnedProductMessage={
                                    props.sendPinnedProductMessage
                                }
                                {...props}
                            />
                            <SessionEndedMessageView
                                key={index}
                                message={msg}
                                {...props}
                            />
                        </>
                    )}
                </>
            ))}
            <LoadingMessage />
        </div>
    );
}

/**
 * Wrapper chat input that uses the current agent
 */
export const ChatInput: EditableReactComponent<any> = function ChatInput({
    ...props
}) {
    const { sendMessage, isLoading, resetSession } = useAgentAPI();
    return (
        <ChatInputView
            onSendMessage={sendMessage}
            disabled={isLoading}
            resetSession={resetSession}
            {...props}
        />
    );
};
ChatInput.displayName = "ChatInput";
ChatInput.__editableProps = {};

export function ChatInputView({
    onSendMessage,
    disabled = false,
    placeholder = "",
    showMenu = false,
    resetSession = () => {},
}) {
    const [input, setInput] = useState("");
    const inputRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !disabled) {
            onSendMessage?.(input);
            setInput("");
        }
    };

    const handleResetSession = () => {
        resetSession?.();
        setMenuOpen(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="flex-grow rounded-l-lg border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    disabled={disabled || !input.trim()}
                    className="!bg-primary text-white rounded-r-lg px-4 py-2 disabled:!bg-secondary transition-colors"
                >
                    Send
                </button>
                {showMenu && (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="!bg-secondary text-white hover:!bg-primary p-2 transition-colors disabled:!bg-secondary !border-l border-white"
                            style={{ height: "100%" }}
                        >
                            <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>

                        {menuOpen && (
                            <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 text-black">
                                <button
                                    onClick={handleResetSession}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                    role="menuitem"
                                >
                                    Reset Session
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </form>
    );
}
