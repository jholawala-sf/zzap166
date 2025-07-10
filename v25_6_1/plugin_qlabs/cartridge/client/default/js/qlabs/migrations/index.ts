/**
 * The migrations system is part of the companion script. It is used to apply
 * changes that require an active Business Manager session and cannot be
 * accomplished by normal data migration means.
 */

import enableComposableFeatureToggles from "./enable-composable.feature-toggles";

const HOSTNAME = new URL(document.baseURI).hostname;

const MIGRATIONS = {
    ENABLE_COMPOSABLE_FEATURE_TOGGLES: enableComposableFeatureToggles,
};

interface AccessTokenResponse {
    access_token: string;
}

interface QLabsCompanionConfig {
    migrations?: string[];
}

export async function getBMAuthGrant(): Promise<AccessTokenResponse> {
    // TODO: why did I use fetch instead of axios here?
    const response = await fetch(`https://${HOSTNAME}/dw/oauth2/access_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=urn%3Ademandware%3Aparams%3Aoauth%3Agrant-type%3Aclient-id%3Adwsid%3Adwsecuretoken&client_id=6c957560-464f-4a98-ad0f-5e9662527e27`,
    });
    const data = await response.json();
    return data;
}

export async function doMigrateInstance() {
    // store the last migration time in local storage
    // so that we only attempt to migrate once per session
    const lastMigration = window.sessionStorage.getItem("qlabs-last-migration");
    if (lastMigration) {
        return;
    }

    // check if we are loaded in business manager (Sites-Site is in the url)
    if (!document.location.pathname.includes("Sites-Site")) {
        return;
    }

    var config: QLabsCompanionConfig = {};
    var accessToken: string;
    try {
        const authGrant = await getBMAuthGrant();
        if (!authGrant || !authGrant.access_token) {
            console.warn(
                "[QLABS] Could not get BM auth grant; must not be logged in",
            );
            return;
        }

        accessToken = authGrant.access_token;

        // get current config
        const response = await fetch(
            `https://${HOSTNAME}/s/-/dw/data/v23_2/global_preferences/preference_groups/qlabs/development`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        const orgPrefs = await response.json();
        const configValue = orgPrefs.c_qlabsCompanionConfig ?? "{}";
        config = JSON.parse(configValue);
    } catch (error) {
        console.error("[QLABS] Error during migration", error);
        return;
    }

    const migrationsApplied = config.migrations ?? [];
    const migrationsRequired = Object.keys(MIGRATIONS).filter(
        (migration) => !migrationsApplied.includes(migration),
    );

    if (migrationsRequired.length === 0) {
        console.log("[QLABS] No client migrations required");
        window.sessionStorage.setItem(
            "qlabs-last-migration",
            new Date().toISOString(),
        );
        return;
    }

    console.log("[QLABS] Migrations required", migrationsRequired);

    for (const migration of migrationsRequired) {
        try {
            await MIGRATIONS[migration]();
            migrationsApplied.push(migration);
        } catch (error) {
            console.error(
                `[QLABS] Error applying migration ${migration}`,
                error,
            );
            return;
        }
    }

    // save the updated config
    try {
        config.migrations = migrationsApplied;
        const response = await fetch(
            `https://${HOSTNAME}/s/-/dw/data/v23_2/global_preferences/preference_groups/qlabs/development`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    c_qlabsCompanionConfig: JSON.stringify(config),
                }),
            },
        );
        if (!response.ok) {
            console.error("[QLABS] Error saving updated config", response);
            return;
        }
    } catch (error) {
        console.error("[QLABS] Error saving updated config", error);
        return;
    }

    window.sessionStorage.setItem(
        "qlabs-last-migration",
        new Date().toISOString(),
    );
}
