/**
 * This implements a new search tab in nto SFRA "Ask an Agent"
 * It's implement using the agent API
 */
import { AgentContext, type IAgentContext } from "@qlabs/state/agentapi";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

// attach ourselve in SFRA
const searchNav = document.querySelector(".search-nav .nav");
const tabContent = document.querySelector(".tab-content");

function AgentSearchNavTab({ onClick, active }) {
    useEffect(() => {
        if (active) {
            var otherTabs = document.querySelectorAll(".nav-link");
            otherTabs.forEach((tab) => {
                if (tab.id !== "agentforce-tab") {
                    tab.classList.remove("active");
                }
            });
        }
    }, [active]);
    return (
        <li className="nav-item" role="presentation">
            <a
                className={`af-nav-link nav-link${active ? " active" : ""}`}
                data-toggle="tab"
                role="tab"
                aria-selected={active ? "true" : "false"}
                id="agentforce-tab"
                href="#"
                onClick={onClick}
            >
                Ask an Agent
            </a>
        </li>
    );
}

interface SearchTabAgentProps {
    children?: React.ReactNode;
}

export function SFRASearchTabAgent({ children }: SearchTabAgentProps) {
    const {agent} = useContext<IAgentContext>(AgentContext);
    const [active, setActive] = useState(false);

    const selectTab = (e) => {
        e.preventDefault();
        setActive((prev) => !prev);
    };

    useEffect(() => {
        if (active) {
            var otherTabContent = document.querySelectorAll(".tab-pane");
            otherTabContent.forEach((tab) => {
                if (tab.id !== "agentforce-tab-content") {
                    tab.classList.remove("active");
                }
            });
        }
    }, [active]);

    // Only insert ourselves when we can (on search PLPs)
    if (!searchNav || !tabContent) {
        return null;
    }

    return (
        <>
            {createPortal(
                <AgentSearchNavTab onClick={selectTab} active={active} />,
                searchNav,
            )}
            {createPortal(
                <div className={`tab-pane ${active ? "active" : ""} py-4`} id="agentforce-tab-content" role="tabpanel">
                    {active && children}
                </div>,
                tabContent,
            )}
        </>
    );
}
