import type { DataStoreObject } from "../api/data";
import { createDataStoreHooks } from "../api/data";

interface Prompt {
    name: string;
    body: string;
    builtIn: boolean;
    defaultBody?: string;
    systemObject?: string;
    systemObjectAttribute?: string;
}

export const {
    useList: usePrompts,
    useItem: usePrompt,
    useFind: useFindPrompts,
    useCreate: useCreatePrompt,
    useUpdate: useUpdatePrompt,
    usePatch: usePatchPrompt,
    useDelete: useDeletePrompt,
    queries: { list: promptsQuery, item: promptQuery },
} = createDataStoreHooks<Prompt>({
    typeId: "prompts",
    queryableAttributes: ["name", "systemObject", "systemObjectAttribute"],
    defaultData: {
        name: "",
        body: "",
        builtIn: false,
    },
});

export function usePromptsByObjectAttribute(
    systemObject: string,
    systemObjectAttribute: string,
) {
    return useFindPrompts({ attrs: { systemObject, systemObjectAttribute } });
}

export function usePromptByName(name: string) {
    return useFindPrompts<DataStoreObject<Prompt>>(
        { attrs: { name } },
        {
            select: (data) => data[0],
        },
    );
}
