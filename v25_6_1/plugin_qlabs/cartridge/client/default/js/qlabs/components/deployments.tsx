// Renders custom agents and other react-based custom deployments
// from JSX or page designer rendered markup
import { AgentProvider } from "@qlabs/state/agentapi.ts";
import type { Referenceable } from "@qlabs/api/data.ts";
import type { Agent } from "@qlabs/state/agents.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { jsxToReact } from "./helpers.tsx";
import queryClient from "../query-client.ts";
import { ALLOWED_COMPONENTS } from "./registry.ts";
import { qlabsSubscribe } from "@companion/hooks/event-manager.ts";

/**
 * Wraps non-agent custom features (i.e. qlabs Features)
 */
export function CustomDeploymentWrapper({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}


export function renderFeature(feature) {
    if (!feature.deploymentCode) {
        return;
    }

    const container = document.createElement("div");
    container.id = "root-" + feature.name.replace(/ /g, "-");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
        <CustomDeploymentWrapper>
            {jsxToReact(feature.deploymentCode, {
                props: feature.props || {},
            })}
        </CustomDeploymentWrapper>,
    );
}

/**
 * Wraps all agents with their initial context
 * subscribes to outside events
 */
export function CustomAgentWrapper({
    agent,
    children,
    initialContext = {},
}: {
    agent: Referenceable<Agent>;
    children: React.ReactNode;
    initialContext?: Record<string, any>;
}) {
    const [runtimeContext, setRuntimeContext] =
        React.useState<Record<string, any>>(initialContext);

    useEffect(() => {
        const unsub = qlabsSubscribe(
            "agent:setRuntimeContext",
            (context: Record<string, unknown>) => {
                setRuntimeContext((prevContext) => ({
                    ...prevContext,
                    ...context,
                }));
            },
            {
                agentName: agent.name,
            },
        );
        return () => {
            unsub();
        };
    }, [agent?.name, setRuntimeContext]);

    return (
        <AgentProvider value={{ agent, runtimeContext, setRuntimeContext }}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AgentProvider>
    );
}

const calcSpacingCSS = (value: number | string) => {
    if (!value) {
        return undefined;
    }
    var _value = value;
    if (typeof _value === "number") {
        _value = _value.toFixed(0);
    }
    return `calc(var(--spacing) * ${_value})`;
};
/**
 * Higher order component to optionally wrap a component with custom styles
 */
export const withContainerStyles = (Component) => {
    const ContainedComponent = ({
        __containerStyles,
        ...props
    }: {
        __containerStyles?: any;
        [key: string]: any;
    }): React.ReactNode => {
        const containerStyles = __containerStyles || {};
        const { padding, margin } = containerStyles;

        const styles = {
            backgroundColor: containerStyles.backgroundColor,
            textColor: containerStyles.textColor,
            paddingTop: calcSpacingCSS(padding?.top),
            paddingRight: calcSpacingCSS(padding?.right),
            paddingBottom: calcSpacingCSS(padding?.bottom),
            paddingLeft: calcSpacingCSS(padding?.left),
            marginTop: calcSpacingCSS(margin?.top),
            marginRight: calcSpacingCSS(margin?.right),
            marginBottom: calcSpacingCSS(margin?.bottom),
            marginLeft: calcSpacingCSS(margin?.left),
        };

        return (
            <div
                style={{
                    backgroundColor: styles.backgroundColor,
                    color: styles.textColor,
                    paddingTop: styles.paddingTop,
                    paddingRight: styles.paddingRight,
                    paddingBottom: styles.paddingBottom,
                    paddingLeft: styles.paddingLeft,
                    marginTop: styles.marginTop,
                    marginRight: styles.marginRight,
                    marginBottom: styles.marginBottom,
                    marginLeft: styles.marginLeft,
                }}
            >
                <Component {...props} />
            </div>
        );
    };
    return ContainedComponent;
};

/**
 * Use the custom configuration of the agent to determine the
 * rendering of the agent.
 */
export function renderCustomAgent(agent: Referenceable<Agent>) {
    // template divs are rendered by the page designer agent components
    const pdAgents = document.querySelectorAll(
        `div[data-agent="${agent.__id}"]`,
    );

    if (pdAgents.length > 0) {
        pdAgents.forEach((agentDiv) => {
            // Get the agent ID and target ID
            const agentId = agentDiv.getAttribute("data-agent");

            if (!agentId) {
                console.warn(
                    "Missing data-agent or data-agent-target attribute on template script",
                );
                return;
            }

            // Get the context data if available
            let context = {};
            const contextAttr = agentDiv.getAttribute("data-agent-context");
            if (contextAttr) {
                try {
                    context = JSON.parse(decodeURIComponent(contextAttr));
                } catch (e) {
                    console.error("Failed to parse data-agent-context:", e);
                }
            }
            let containerStyles = {};
            const containerStylesAttr = agentDiv.getAttribute(
                "data-__container-styles",
            );
            if (containerStylesAttr) {
                try {
                    containerStyles = JSON.parse(
                        decodeURIComponent(containerStylesAttr),
                    );
                } catch (e) {
                    console.error(
                        "Failed to parse data-__container-styles:",
                        e,
                    );
                }
            }

            // insert the target div right after the agentDiv
            try {
                const agentReact = parseAgentHtml(agentDiv);
                const targetElement = document.createElement("div");
                agentDiv.insertAdjacentElement("afterend", targetElement);

                const root = createRoot(targetElement);

                const AgentComponent = withContainerStyles(CustomAgentWrapper);

                root.render(
                    <AgentComponent
                        __containerStyles={containerStyles}
                        agent={agent}
                        initialContext={context}
                    >
                        {agentReact}
                    </AgentComponent>,
                );
            } catch (e) {
                console.error("Error rendering agent component:", e);
            }
        });
    }

    if (!agent.deploymentCode) {
        return;
    }

    const container = document.createElement("div");
    container.id = "root-" + agent.name.replace(/ /g, "-");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
        <CustomAgentWrapper agent={agent}>
            {jsxToReact(agent.deploymentCode, {
                props: {},
            })}
        </CustomAgentWrapper>,
    );
}

/**
 * Decode html attributes with URI encoded JSON values
 */
function decodeAndParseJson(encodedValue) {
    try {
        const decoded = decodeURIComponent(encodedValue);
        try {
            return JSON.parse(decoded);
        } catch (parseError) {
            console.error(
                `Error parsing JSON for attribute`,
                parseError,
                "\nRaw value:",
                decoded,
            );
            return undefined; // Indicate failure
        }
    } catch (decodeError) {
        console.error(
            `Error decoding URI component for attribute`,
            decodeError,
            "\nRaw value:",
            encodedValue,
        );
        return undefined; // Indicate failure
    }
}

/**
 * Recursively parses child DOM nodes created by the PD component to create React elements.
 */
function parseAgentComponentsRecursive(
    parentElement,
    componentRegistry = ALLOWED_COMPONENTS,
) {
    const collectedReactElements = [];

    for (const node of parentElement.childNodes) {
        // skip non-elements
        if (node.nodeType !== 1) {
            continue;
        }

        const componentName = node.dataset?.agentComponent;

        if (componentName !== undefined) {
            const Component = componentRegistry[componentName];

            if (!Component) {
                console.warn(
                    `Component "${componentName}" not found in registry. Skipping element:`,
                    node,
                );
                continue;
            }

            const propsAttr = node.dataset?.props;
            var props: Record<string, any> = {};
            if (propsAttr) {
                props = decodeAndParseJson(propsAttr);
            }

            const containerStylesAttr = node.dataset?.__containerStyles;
            if (containerStylesAttr) {
                const containerStyles = decodeAndParseJson(containerStylesAttr);
                if (containerStyles) {
                    props.__containerStyles = containerStyles;
                }
            }

            // parse children (i.e. "regions" in PD parlance)
            const directChildren = parseAgentComponentsRecursive(
                node,
                componentRegistry,
            );

            try {
                const element = React.createElement(
                    withContainerStyles(Component),
                    props,
                    ...directChildren,
                );
                collectedReactElements.push(element);
            } catch (error) {
                console.error(
                    `Error creating React element for component "${componentName}":`,
                    error,
                    "\nProps:",
                    props,
                    "\nElement:",
                    node,
                );
            }
        } else {
            // non agent component (possibly PD markers); recurse
            const nestedAgentElements = parseAgentComponentsRecursive(
                node,
                componentRegistry,
            );
            collectedReactElements.push(...nestedAgentElements);
        }
    }

    return collectedReactElements;
}

/**
 * Parses an HTML structure created by the PD component and converts it into a React element tree.
 */
function parseAgentHtml(rootElement) {
    // --- Child Element Processing (Recursive) ---
    const childReactElements = parseAgentComponentsRecursive(rootElement);

    // --- Create Root React Element ---
    try {
        return React.createElement(React.Fragment, {}, ...childReactElements);
    } catch (error) {
        console.error("Error creating the Agent element:", error);
        return null;
    }
}
