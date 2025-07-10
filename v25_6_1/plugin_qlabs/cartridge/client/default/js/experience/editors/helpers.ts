import { useQuery, QueryClient } from "@tanstack/react-query";

const CLIENT_ID = "6c957560-464f-4a98-ad0f-5e9662527e27";
const HOSTNAME = new URL(document.baseURI).hostname;

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 0,
        },
    },
});

async function getAccessToken() {
    const response = await fetch(`https://${HOSTNAME}/dw/oauth2/access_token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=urn%3Ademandware%3Aparams%3Aoauth%3Agrant-type%3Aclient-id%3Adwsid%3Adwsecuretoken&client_id=${CLIENT_ID}`,
    });
    const data = await response.json();
    const token = data.access_token;
    return token;
}

export async function getAgentDeployments() {
    const token = await getAccessToken();
    const response = await fetch(
        `https://${HOSTNAME}/s/-/dw/data/v23_2/custom_objects_search/QLabsDataStore`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: {
                    bool_query: {
                        must: [
                            {
                                term_query: {
                                    fields: ["c_typeId"],
                                    operator: "is",
                                    values: ["agents"],
                                },
                            },
                        ],
                    },
                },
                select: "(**)",
                start: 0,
            }),
        },
    );
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error.message);
    }
    return data.hits.map((hit) => {
        const agent = {
            __id: hit.key_value_string,
            __type: hit.c_typeId,
            ...JSON.parse(hit.c_data),
        };
        return agent;
    });
}

export const useAgentDeployments = () => {
    return useQuery({
        queryKey: ["agentDeployments"],
        queryFn: getAgentDeployments,
    });
};
