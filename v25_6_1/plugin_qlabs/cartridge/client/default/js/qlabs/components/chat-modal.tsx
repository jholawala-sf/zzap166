import {
    AgentContext,
    type IAgentContext,
    useAgentAPI,
} from "@qlabs/state/agentapi";
import { useAgentUI } from "@companion/state/agent-ui.ts";
import { useContext, useEffect, useRef, useState } from "react";
import {
    AgentSessionIcon,
    CloseIcon,
    EllipsisVerticalIcon,
    SendIcon,
    SparklesIcon,
} from "./icons";
import { MessagesView } from "./messages";
import { AgentConfig } from "./agent-config";
import { AnimatePresence, motion } from "motion/react";
import ReactDOM from "react-dom";

interface ChatModalProps {
    isOpen: boolean;
    toggleChat: () => void;
    resetUIState?: () => void;
    children?: React.ReactNode;

    // allow arbitrary props
    [key: string]: any;
}

// Chat window component to be rendered in the portal
export const ChatModal: React.FC<ChatModalProps> = ({
    isOpen,
    toggleChat,
    resetUIState,
    modalTitle = "Ask an Agent",
    children,
    ...props
}) => {
    const { messages, isLoading, sendMessage, resetSession } = useAgentAPI();
    const [newMessage, setNewMessage] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef(null);
    const menuRef = useRef(null);
    const chatContainerRef = useRef(null);

    // if we're on the first message, and we're skipping the first message, send an empty message to "start" the conversation
    const skip = props.skip || [];
    useEffect(() => {
        if (skip.includes(1) && messages.length === 1) {
            sendMessage("");
        }
    }, [skip, messages.length]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            const focusTimer = setTimeout(() => {
                inputRef.current.focus();
            }, 500);

            return () => clearTimeout(focusTimer);
        }
    }, [isOpen]);

    useEffect(() => {
        // Close menu when clicking outside
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setMenuOpen(false);
            setNewMessage("");
        }
    };

    const handleResetSession = () => {
        resetSession();
        resetUIState();
        setMenuOpen(false);
    };

    const scrollChatContainer = () => {
        if (props.autoScroll === false) return;
        setTimeout(() => {
            chatContainerRef.current?.scroll(
                0,
                chatContainerRef.current.scrollHeight,
            );
        }, 100);
    };

    return (
        <>
            <div className="text-white p-2 flex justify-between items-center">
                <div className="flex items-center space-x-2 pl-2">
                    <AgentSessionIcon className="h-6 w-6" />
                    <h3 className="!mb-0 !text-lg">{modalTitle}</h3>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white hover:bg-primary/50 rounded-full p-1 transition-colors"
                        >
                            <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>

                        {menuOpen && (
                            <div className="absolute left-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 text-black">
                                <button
                                    onClick={handleResetSession}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
                                >
                                    Reset Session
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <button
                    onClick={toggleChat}
                    className="text-white hover:bg-primary rounded-full p-1 transition-colors"
                >
                    <CloseIcon className="h-5 w-5" />
                </button>
            </div>

            <div
                className="bg-white flex-1 p-3 overflow-y-auto scroll-smooth"
                style={{ minHeight: "300px" }}
                ref={chatContainerRef}
            >
                <MessagesView
                    messages={messages}
                    isLoading={isLoading}
                    onUpdate={scrollChatContainer}
                    inlineRecommendations={true}
                    {...props}
                >
                    {children}
                </MessagesView>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white border-t p-3 flex"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                    type="submit"
                    className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                    <SendIcon className="h-5 w-5" />
                </button>
            </form>
        </>
    );
};

interface ConditionCheck {
    attribute: string; // data attribute name, e.g., 'data-pid'
    value: string; // expected value of the attribute, e.g., '2010510A02AEL'
}

interface SelectorWithData {
    selector: string; // CSS selector. for example: .cart-products
    triggeringConditions?: ConditionCheck[]; // conditions that trigger the modal
    blockingConditions?: ConditionCheck[]; // conditions that prevent the modal from opening
}

interface AutoOpenConditions {
    pathIncludes?: string;
    selector?: string;
    selectorWithData?: SelectorWithData;
}

interface ShopperAgentModalProps {
    buttonText?: string;
    showChatToggleButton?: boolean;
    messagePrefix?: string;
    messageSuffix?: string;
    children?: React.ReactNode;
    autoOpen?: boolean;
    autoOpenConditions?: AutoOpenConditions;

    // allow arbitrary props
    [key: string]: any;
}

// helper function for checking auto-open conditions
function shouldAutoOpenModal(
    autoOpen: boolean,
    autoOpenConditions: AutoOpenConditions,
): boolean {
    // direct autoOpen prop takes precedence
    if (autoOpen) {
        return true;
    }

    // check the pathname for a match
    if (
        autoOpenConditions?.pathIncludes &&
        typeof window !== "undefined" &&
        window.location.pathname.includes(autoOpenConditions?.pathIncludes)
    ) {
        return true;
    }

    // check for a specific DOM element
    if (
        autoOpenConditions?.selector &&
        typeof document !== "undefined" &&
        document.querySelector(autoOpenConditions?.selector)
    ) {
        return true;
    }

    /**
     * Check for elements with specific data attribute values
     * For example, finding product elements with a specific product ID
     */
    if (
        autoOpenConditions?.selectorWithData &&
        typeof document !== "undefined"
    ) {
        const {
            selector,
            triggeringConditions = [],
            blockingConditions = [],
        } = autoOpenConditions.selectorWithData;

        const containers = document.querySelectorAll(selector);
        let hasTriggeringCondition = false;
        let hasBlockingCondition = false;

        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];

            // check for any triggering conditions
            for (const condition of triggeringConditions) {
                const elementsWithAttribute = container.querySelectorAll(
                    `[${condition.attribute}]`,
                );

                for (let j = 0; j < elementsWithAttribute.length; j++) {
                    if (
                        elementsWithAttribute[j].getAttribute(
                            condition.attribute,
                        ) === condition.value
                    ) {
                        hasTriggeringCondition = true;
                        break;
                    }
                }

                if (hasTriggeringCondition) break;
            }

            // check for any blocking conditions
            for (const condition of blockingConditions) {
                const elementsWithAttribute = container.querySelectorAll(
                    `[${condition.attribute}]`,
                );

                for (let j = 0; j < elementsWithAttribute.length; j++) {
                    if (
                        elementsWithAttribute[j].getAttribute(
                            condition.attribute,
                        ) === condition.value
                    ) {
                        hasBlockingCondition = true;
                        break;
                    }
                }

                if (hasBlockingCondition) break;
            }

            if (hasTriggeringCondition || hasBlockingCondition) break;
        }

        // Only open if at least one trigger condition is met AND no blocking condition is present
        if (hasTriggeringCondition && !hasBlockingCondition) {
            return true;
        }
    }

    return false;
}

export const ShopperAgentModal = ({
    buttonText = "Ask an Agent",
    showChatToggleButton = true,
    messagePrefix = "",
    messageSuffix = "",
    children,
    autoOpen = false,
    autoOpenConditions = {},
    ...props
}: ShopperAgentModalProps) => {
    const { subscribe, isLoading, sessionId } = useAgentAPI();
    const { agent } = useContext<IAgentContext>(AgentContext);
    const { userClosedModal, setUserClosedModal, resetUIState } = useAgentUI(
        agent?.name || "default",
        sessionId || null,
    );
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingUiPrefs, setIsLoadingUiPrefs] = useState(true);
    const hasDecidedToOpen = useRef(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setUserClosedModal(isOpen);
    };

    // handle subscribe events
    useEffect(() => {
        const unsub = subscribe("agent:openModal", () => {
            setIsOpen(true);
            setUserClosedModal(false);
        });
        const unsub1 = subscribe("agent:closeModal", () => {
            setIsOpen(false);
            setUserClosedModal(true);
        });
        const unsub2 = subscribe("agent:toggleModal", () => {
            setIsOpen((prev) => {
                const localIsOpen = !prev;
                setUserClosedModal(!localIsOpen);
                return localIsOpen;
            });
        });
        return () => {
            unsub();
            unsub1();
            unsub2();
        };
    }, [subscribe]);

    // ui preferences loaded when we have a sessionId
    useEffect(() => {
        if (!isLoading && sessionId) {
            setIsLoadingUiPrefs(false);
        }
    }, [isLoading, sessionId]);

    useEffect(() => {
        if (!isLoadingUiPrefs && !hasDecidedToOpen.current) {
            hasDecidedToOpen.current = true;
            // only open if user hasn't explicitly closed the modal
            if (
                userClosedModal !== true &&
                shouldAutoOpenModal(autoOpen, autoOpenConditions)
            ) {
                setIsOpen(true);
                setUserClosedModal(false);
            }
        }
    }, [isLoadingUiPrefs, userClosedModal, autoOpen, autoOpenConditions]);

    return (
        <AgentConfig
            messagePrefix={messagePrefix}
            messageSuffix={messageSuffix}
        >
            {showChatToggleButton && (
                <ChatToggleButton onToggle={toggleChat} text={buttonText} />
            )}

            {ReactDOM.createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, top: 0, left: 16 }}
                            animate={{
                                opacity: 1,
                                top: "auto",
                                bottom: 16,
                                left: 16,
                            }}
                            exit={{
                                opacity: 0,
                                top: 0,
                                left: 16,
                                bottom: "auto",
                            }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="fixed w-90 md:w-116 bg-primary rounded-t-lg shadow-2xl shadow-black/30 flex flex-col z-50 border border-primary"
                            role="dialog"
                            aria-modal="true"
                            style={{ maxHeight: "50vh" }}
                        >
                            <ChatModal
                                isOpen={isOpen}
                                toggleChat={toggleChat}
                                resetUIState={resetUIState}
                                modalTitle={buttonText}
                                {...props}
                            >
                                {children}
                            </ChatModal>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body,
            )}
        </AgentConfig>
    );
};

export const ChatToggleButton = ({ onToggle, text }) => {
    return (
        <button
            onClick={onToggle}
            className="flex items-center space-x-2 bg-primary hover:bg-secondary text-white px-4 py-2 rounded-full shadow-md transition-all duration-300"
        >
            <SparklesIcon className="h-6 w-6" />
            <span>{text}</span>
        </button>
    );
};
