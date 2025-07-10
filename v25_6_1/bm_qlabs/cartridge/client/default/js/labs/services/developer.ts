import { uuid4 } from "../utils";
import { api as ocapi } from "../api/ocapi";
import { useQuery } from "@tanstack/react-query";

export interface DeveloperConfig {
    clientId: string;
    privateClientId: string;
    privateClientSecret: string;
    organizationId: string;
    tenant: string;
    sandbox: string;
}

export function useDeveloperConfig(siteId) {
    return useQuery({
        queryKey: ["feature-config", siteId],
        queryFn: async (): Promise<DeveloperConfig> => {
            var clientId;
            var privateClientId;
            var privateClientSecret;
            var resp = await ocapi.get(
                "custom_objects/B2CToolsFeature/Managed Runtime Composable Storefront",
            );
            if (resp && resp.data && resp.data.c_vars) {
                var vars = JSON.parse(resp.data.c_vars);
                const secretVars = JSON.parse(resp.data.c_secretVars);
                vars = Object.assign({}, vars, secretVars);
                clientId = vars.slasClientID;
                privateClientId = vars.slasPrivateClientID;
                privateClientSecret = vars.slasPrivateClientSecret;
            }
            var sandbox = document.location.hostname.split(".")[0];
            var tenant = sandbox.replace("-", "_");
            var org = `f_ecom_${tenant}`;

            return {
                clientId,
                privateClientId,
                privateClientSecret,
                organizationId: org,
                tenant,
                sandbox,
            };
        },
        enabled: !!siteId,
    });
}

/**
 * Generate a postman environment JSON for the current instance
 */
export async function generatePostmanEnvironment(
    siteId: string,
    config: DeveloperConfig,
): Promise<object> {
    var values = POSTMAN_ENV.values.map((v) => {
        if (v.key === "clientId") {
            v.value = config.clientId;
        } else if (v.key === "private_client_id") {
            v.value = config.privateClientId;
        } else if (v.key === "private_client_secret") {
            v.value = config.privateClientSecret;
        } else if (v.key === "tenant") {
            v.value = config.tenant;
        } else if (v.key === "siteId") {
            v.value = siteId;
        } else if (v.key === "sandbox") {
            v.value = config.sandbox;
        }
        return v;
    });
    return {
        ...POSTMAN_ENV,
        id: uuid4(),
        name: `${config.tenant}-${siteId}`,
        values,
    };
}

const POSTMAN_ENV = {
    id: "",
    name: "",
    values: [
        {
            key: "version",
            value: "v1",
            enabled: true,
        },
        {
            key: "clientId",
            value: "",
            enabled: true,
        },
        {
            key: "public_client_id",
            value: "{{clientId}}",
            type: "default",
            enabled: true,
        },
        {
            key: "admin_client_id",
            value: "",
            type: "default",
            enabled: true,
        },
        {
            key: "admin_client_secret",
            value: "",
            type: "secret",
            enabled: true,
        },
        {
            key: "private_client_id",
            value: "",
            type: "default",
            enabled: true,
        },
        {
            key: "private_client_secret",
            value: "",
            type: "secret",
            enabled: true,
        },
        {
            key: "agentUsername",
            value: "",
            enabled: true,
        },
        {
            key: "agentPassword",
            value: "",
            enabled: true,
        },
        {
            key: "locale",
            value: "en_US",
            type: "default",
            enabled: true,
        },
        {
            key: "redirect_url",
            value: "http://localhost:3000/callback",
            type: "default",
            enabled: true,
        },
        {
            key: "tenant",
            value: "zzsb_115",
            enabled: true,
        },
        {
            key: "organizationId",
            value: "f_ecom_{{tenant}}",
            enabled: true,
        },
        {
            key: "siteId",
            value: "RefArch",
            enabled: true,
        },
        {
            key: "ocapi_site",
            value: "{{siteId}}",
            enabled: true,
        },
        {
            key: "shortCode",
            value: "kv7kzm78",
            enabled: true,
        },
        {
            key: "product_id",
            value: "2010575BE5AD4",
            enabled: true,
        },
        {
            key: "sandbox",
            value: "zzsb-115.dx.commercecloud.salesforce.com",
            enabled: true,
        },
        {
            key: "HOST",
            value: "https://{{shortCode}}.api.commercecloud.salesforce.com",
            enabled: true,
        },
        {
            key: "catalogId",
            value: "apparel-m-catalog",
            enabled: true,
        },
        {
            key: "categoryId",
            value: "mens-accessories-gloves",
            enabled: true,
        },
        {
            key: "registeredCustomerEmail",
            value: "setesting@sink.salesforce.com",
            enabled: true,
        },
        {
            key: "CUSTOMER_EMAIL",
            value: "setesting@sink.salesforce.com",
            enabled: true,
        },
        {
            key: "ecom_customer_login",
            value: "setesting@sink.salesforce.com",
            enabled: true,
        },
        {
            key: "registeredCustomerPassword",
            // NOTE: this is a test password; not a credential
            value: "Salesforce1!",
            enabled: true,
        },
        {
            key: "ecom_customer_pw",
            // NOTE: this is a test password; not a credential
            value: "Salesforce1!",
            enabled: true,
        },
    ],
    _postman_variable_scope: "environment",
    _postman_exported_at: "",
    _postman_exported_using: "Postman/10.15.4",
};

export const SHELL_SCRIPTS = {
    public: function generatePublicShellScript(
        siteId,
        config: DeveloperConfig,
    ) {
        return `#!/usr/bin/env bash
set -e

CODE='kv7kzm78'
ORG='${config.organizationId}'
CLIENT='${config.clientId}'
REDIRECT='http://localhost:3000/callback'

SITE='${siteId}'
PRODUCT_ID="2010575BE5AD4"

BASE="https://$CODE.api.commercecloud.salesforce.com"
BASE_AUTH="$BASE/shopper/auth/v1/organizations/$ORG"
BASE_PRODUCTS="$BASE/product/shopper-products/v1/organizations/$ORG"

echo '--> Get guest token...'
VERIFIER=$(openssl rand -base64 96 | tr -d '\\n' | tr '/+' '_-' | tr -d '=')
CHALLENGE=$(echo -n $VERIFIER | openssl dgst -binary -sha256 | openssl base64 -A | tr '/' '_' | tr '+' '-' | tr -d '=')
USID_AND_CODE=$(
    curl "$BASE_AUTH/oauth2/authorize" \\
        -sSfGd "redirect_uri=$REDIRECT" \\
        -d 'response_type=code' \\
        -d 'hint=guest' \\
        -d "client_id=$CLIENT" \\
        -d "code_challenge=$CHALLENGE" \\
        -D- |
        grep -i 'location' | cut -d'?' -f2 | tr -d '\\n\\r'
)
RESPONSE=$(
    curl "$BASE_AUTH/oauth2/token" \\
        -sSfd "client_id=$CLIENT" \\
        -d "channel_id=$SITE" \\
        -d "code_verifier=$VERIFIER" \\
        -d $USID_AND_CODE \\
        -d 'grant_type=authorization_code_pkce' \\
        -d "redirect_uri=$REDIRECT"
)
TOKEN=$(echo $RESPONSE | jq -r '.access_token')
CUSTOMER=$(echo $RESPONSE | jq -r '.customer_id')
USID=$(echo $USID_AND_CODE | cut -d'&' -f1)
echo "$CUSTOMER" "$USID"

echo "--> Doing something..."
curl "$BASE_PRODUCTS/products/\${PRODUCT_ID}?expand=recommendations&siteId=$SITE" \\
    -sSfH "Authorization: Bearer $TOKEN" | jq
`;
    },
    private: function generatePrivateShellScript(
        siteId,
        config: DeveloperConfig,
    ) {
        return `#!/bin/bash
set -eu

CODE='kv7kzm78'
ORG='${config.organizationId}'
CLIENT_ID="${config.privateClientId}"
CLIENT_SECRET="${config.privateClientSecret}"

SITE='${siteId}'
PRODUCT_ID="2010575BE5AD4"

BASE="https://$CODE.api.commercecloud.salesforce.com"
BASE_AUTH="$BASE/shopper/auth/v1/organizations/$ORG"
BASE_PRODUCTS="$BASE/product/shopper-products/v1/organizations/$ORG"
RESPONSE=$(curl "$BASE_AUTH/oauth2/token" \\
    -su "$CLIENT_ID:$CLIENT_SECRET" \\
    -d "grant_type=client_credentials&channel_id=\${SITE}")

TOKEN=$(echo $RESPONSE | jq -r '.access_token')
USID=$(echo $RESPONSE | jq -r '.usid')
CUSTOMER=$(echo $RESPONSE | jq -r '.customer_id')
#echo $TOKEN
echo $USID $CUSTOMER

echo "--> Doing something..."
curl "$BASE_PRODUCTS/products/\${PRODUCT_ID}?expand=recommendations&siteId=$SITE" \\
    -sSfH "Authorization: Bearer $TOKEN" | jq
`;
    },
    admin: function generateAdminShellScript(siteId, config: DeveloperConfig) {
        return `#!/usr/bin/env bash
set -e

API_CLIENT_ID=""
API_CLIENT_SECRET=""
RESPONSE=$(curl "https://account.demandware.com/dwsso/oauth2/access_token" \\
    -su "$API_CLIENT_ID:$API_CLIENT_SECRET" \\
    -d "grant_type=client_credentials")
echo $RESPONSE | jq
TOKEN=$(echo $RESPONSE | jq -r '.access_token')
`;
    },
};
