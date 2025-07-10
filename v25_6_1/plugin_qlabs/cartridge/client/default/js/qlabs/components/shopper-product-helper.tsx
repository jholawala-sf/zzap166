import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { AgentConfig } from "./agent-config";
import { ChatModal, ChatToggleButton } from "./chat-modal";
import { useAgentAPI } from "@qlabs/state/agentapi";

const productDetailDiv = document.querySelector(".product-detail");

export const SFRAProductDetailScope = ({ children }) => {
    // TODO put this as a global variable instead
    const pid = useMemo(() => {
        // get [data-pid] from productDetailDiv
        var pid = productDetailDiv?.getAttribute("data-master-pid");
        if (!pid) {
            pid = productDetailDiv?.getAttribute("data-pid");
        }
        return pid;
    }, []);

    // If we're not on product detail don't render this widget
    if (!productDetailDiv || !pid) {
        return null;
    }

    // set pid variable and session scope the agent
    return (
        <AgentConfig variables={{ pid }} sessionKey={pid}>
            {children}
        </AgentConfig>
    );
};

export const ShopperProductHelper = ({
    buttonText = "Ask an Agent",
    messagePrefix = "",
    messageSuffix = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { subscribe } = useAgentAPI();

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const unsub = subscribe("agent:openModal", () => {
            setIsOpen(true);
        });
        const unsub1 = subscribe("agent:closeModal", () => {
            setIsOpen(false);
        });
        const unsub2 = subscribe("agent:toggleModal", () => {
            setIsOpen((prev) => !prev);
        });
        return () => {
            unsub();
            unsub1();
            unsub2();
        };
    }, [subscribe]);

    return (
        <AgentConfig
            messagePrefix={messagePrefix}
            messageSuffix={messageSuffix}
        >
            <SFRAProductDetailScope>
                <ChatToggleButton onToggle={toggleChat} text={buttonText} />

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
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body,
                )}
            </SFRAProductDetailScope>
        </AgentConfig>
    );
};
