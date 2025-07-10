declare global {
    interface Window {
        embeddedservice_bootstrap: any;
    }
}

export function miawHandlers(siteId: string) {
    const previousSiteId = window.localStorage.getItem("qlabs-site-id");
    let siteIdChanged = false;
    let clearedSession = false;

    // check if site changed. if yes, clear the session
    if (previousSiteId !== siteId) {
        console.log(
            `[QLABS] siteId changed from ${previousSiteId} to ${siteId}`,
        );
        siteIdChanged = true;
    }
    window.localStorage.setItem("qlabs-site-id", siteId);

    try {
        window.addEventListener("onEmbeddedMessagingReady", () => {
            if (siteIdChanged && !clearedSession) {
                clearedSession = true;
                window.embeddedservice_bootstrap.userVerificationAPI.clearSession();
            } else {
                window.embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields(
                    {
                        siteId: siteId,
                        scapiShortCode: window?._clientSettings?.scapiShortCode,
                        scapiOrgId: window?._clientSettings?.scapiOrgId,
                    },
                );
            }
        });
    } catch (err) {
        console.error("Error in onEmbeddedMessagingReady event: ", err);
    }
}
