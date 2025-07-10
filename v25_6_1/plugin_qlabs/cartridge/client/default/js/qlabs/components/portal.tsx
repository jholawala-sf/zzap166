import { AgentContext } from "@qlabs/state/agentapi";
import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    selector: string;
    // when no mode is specified the target element is used directly
    mode?: "append" | "prepend" | "insertAfter" | "insertBefore";
    children: React.ReactNode;
}

/**
 * Portal component that renders children into a DOM element specified by selector
 */
const Portal = ({ selector, mode = null, children }: PortalProps) => {
    const [targetElement, setTargetElement] = useState<Element | null>(null);
    const agentContext = useContext(AgentContext);

    useEffect(() => {
        // Find the DOM element
        var target = document.querySelector(selector);

        if (mode === "append" && target) {
            // Append to the target element if mode is append
            const newElement = document.createElement("div");
            target?.appendChild(newElement);
            target = newElement;
        } else if (mode === "prepend" && target) {
            // Prepend to the target element if mode is prepend
            const newElement = document.createElement("div");
            target?.insertBefore(newElement, target.firstChild);
            target = newElement;
        } else if (mode === "insertAfter" && target) {
            // Insert after the target element if mode is insertAfter
            const newElement = document.createElement("div");
            target?.parentNode?.insertBefore(newElement, target.nextSibling);
            target = newElement;
        } else if (mode === "insertBefore" && target) {
            // Insert before the target element if mode is insertBefore
            const newElement = document.createElement("div");
            target?.parentNode?.insertBefore(newElement, target);
            target = newElement;
        }

        // Set the target element if found
        setTargetElement(target);
    }, [selector]);

    // If no target element found, return null (render nothing)
    if (!targetElement) return null;

    // Create a React portal to the target element
    return createPortal(children, targetElement);
};

export default Portal;
