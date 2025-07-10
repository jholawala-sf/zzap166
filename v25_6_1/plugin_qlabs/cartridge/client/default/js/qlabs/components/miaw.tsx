import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { type Agent } from "@qlabs/state/agents.ts";

declare global {
    var embeddedservice_bootstrap: any;
}

/**
 *
 * @param agent {Agent}
 * @constructor
 */
export const EmbeddedMessaging = ({ agent, siteId } : {agent: Agent, siteId: string}) => {
    const orgId = agent.orgId;
    const esDeveloperName = agent.esDeveloperName;
    const deploymentUrl = agent.deploymentUrl;
    const messagingUrl = agent.messagingUrl;
    const [userJWT, setUserJWT] = useState();
    const [visiblePrechatFields, setVisiblePrechatFields] = useState({});
    const [prechatFieldsReady, setPrechatFieldsReady] = useState(
        !agent.deployStorefront,
    );

    // fetch user verification token if needed
    useEffect(() => {
        async function initVerification() {
            // @ts-ignore
            const userVerificationUrl =
                window.__qlabsConfig.userVerificationUrl;
            var resp = await fetch(userVerificationUrl, {
                method: "GET",
                credentials: "include",
            });
            var data = await resp.json();
            var userJwt = data.jwt;
            setUserJWT(userJwt);
        }
        if (agent.userVerification) {
            initVerification();
        }
    }, [agent]);

    // fetch prechat fields for storefront agents
    useEffect(() => {
        async function fetchPrechatFields() {
            try {
                const params = new URLSearchParams();
                params.append("visible", "true");

                // @ts-ignore
                const miawFieldsUrl = `${window.__qlabsConfig.miawPrechatFieldsUrl}?${params.toString()}`;
                const resp = await fetch(miawFieldsUrl, {
                    method: "GET",
                });

                if (resp.ok) {
                    const data = await resp.json();
                    if (data.visiblePrechatFields) {
                        setVisiblePrechatFields(data.visiblePrechatFields);
                    }
                }
                setPrechatFieldsReady(true);
            } catch (error) {
                console.error("Error fetching MIAW fields:", error);
                setPrechatFieldsReady(true);
            }
        }

        if (agent.deployStorefront) {
            fetchPrechatFields();
        }
    }, [agent]);

    useEffect(() => {
        if ((agent.userVerification && !userJWT) || !prechatFieldsReady) {
            return;
        }

        // Function to load the bootstrap script
        const loadBootstrapScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `${deploymentUrl}/assets/js/bootstrap.js`;
            script.onload = initEmbeddedMessaging;
            document.body.appendChild(script);
        };
        window.addEventListener("onEmbeddedMessagingReady", () => {
            const previousSiteId = window.localStorage.getItem("qlabs-site-id");
            if (previousSiteId && previousSiteId !== siteId) {
                console.log(
                    `[QLABS] siteId changed from ${previousSiteId} to ${siteId}`,
                );
                window.localStorage.setItem("qlabs-site-id", siteId);
                // this should only be necessary for business manager agents
                if (agent.deployBM) {
                    console.log(
                        `[QLABS] clearing session due to siteId change`,
                    );
                    embeddedservice_bootstrap.userVerificationAPI.clearSession();
                }
            }

            if (userJWT) {
                embeddedservice_bootstrap.userVerificationAPI.setIdentityToken({
                    identityTokenType: "JWT",
                    identityToken: userJWT,
                });
            }

            const hiddenFields = JSON.parse(agent.prechatFields || "{}");
            if (siteId) {
                hiddenFields.siteId = siteId;
            }

            hiddenFields.scapiShortCode =
                // @ts-ignore
                window?.__qlabsConfig?.clientSettings?.scapiShortCode;

            hiddenFields.scapiOrgId =
                // @ts-ignore
                window?.__qlabsConfig?.clientSettings?.scapiOrgId;

            embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields(
                hiddenFields,
            );
            embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields(
                visiblePrechatFields,
            );
        });

        // Function to initialize embedded messaging
        const initEmbeddedMessaging = () => {
            try {
                if (window.embeddedservice_bootstrap) {
                    // TODO use locale from site/BM
                    window.embeddedservice_bootstrap.settings.language =
                        "en_US";
                    window.embeddedservice_bootstrap.settings.disableStreamingResponses =
                        true;

                    window.embeddedservice_bootstrap.init(
                        orgId,
                        esDeveloperName,
                        deploymentUrl,
                        {
                            scrt2URL: messagingUrl,
                        },
                    );
                }
            } catch (err) {
                console.error("Error loading Embedded Messaging: ", err);
            }
        };
        loadBootstrapScript();

        // Cleanup function to remove the script when component unmounts
        return () => {
            const scripts = document.getElementsByTagName("script");
            for (const script of scripts) {
                if (
                    script.src.includes(
                        `${deploymentUrl}/assets/js/bootstrap.js`,
                    )
                ) {
                    script.remove();
                }
            }
        };
    }, [agent, userJWT, siteId, visiblePrechatFields, prechatFieldsReady]); // Dependencies array

    // Component doesn't need to render anything
    return null;
};

export function renderAgent(agent: Agent, siteId: string) {
    // render agent with react dom
    const container = document.createElement("div");
    container.id = "root";
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<EmbeddedMessaging agent={agent} siteId={siteId} />);
}
