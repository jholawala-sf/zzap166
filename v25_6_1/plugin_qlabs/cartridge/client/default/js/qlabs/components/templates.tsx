import { useExpr } from "@companion/hooks/jsonata";
import {
    type AgentAPIMessage,
    useAgentAPI,
} from "@qlabs/state/agentapi";
import React from "react";
import { jsxToReact } from "./helpers";

/**
 * Queries agent data using jsonata and returns the resulting data
 * as a match to it's children as props.
 */
export function Query({
    query,
    output = "match",
    children,
    message,
    lastMessage = false,
    ...props
}) {
    const { data, messages } = useAgentAPI();

    const agentMessages = messages?.filter(
        (m) => m.MESSAGE_TYPE === "AGENT",
    ) as AgentAPIMessage[];
    const lastAgentMessage = agentMessages?.[agentMessages.length - 1];
    const { result, isLoading } = useExpr<any>(
        query,
        // if message is provided, use that as the data source
        // if lastMessage is true, use the last agent message
        // lastly use the merged data layer
        // this way this component can be used in various contexts
        message ? message?.json : lastMessage ? lastAgentMessage?.json : data,
    );

    if (isLoading || !result) {
        return null;
    }

    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { [output]: result, ...props });
        }
        return child;
    });

    if (!childrenWithProps) {
        return null;
    }

    return <>{childrenWithProps}</>;
}

/**
 * Renders the children that are strings through our JSX parser using the
 * props as bindings. Intended for use with query to render arbitrary
 * agent data in a dynamic way.
 */
export function Template({ children, ...props }) {
    const childrenWithProps = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { ...props });
        }
        if (typeof child === "string") {
            return jsxToReact(child, {
                props: props,
            });
        }
        return child;
    });

    return <>{childrenWithProps}</>;
}

// A comment does nothing
export function Comment() {
    return <></>;
}
