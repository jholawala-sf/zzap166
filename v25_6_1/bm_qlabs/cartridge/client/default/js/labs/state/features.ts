import { createDataStoreHooks } from "../api/data";

export interface Feature {
    name: string;
    description?: string;
    builtIn?: boolean;
    deploymentCode?: string;
    deployStorefront: boolean;
    deployBM: boolean;
    siteId: string[];
}

const defaultFeature: Feature = {
    name: "New Feature",
    description: "",
    builtIn: false,
    deploymentCode: "",
    deployStorefront: false,
    deployBM: false,
    siteId: [],
};

export const {
    useList: useFeatures,
    useItem: useFeature,
    useFind: useFindFeatures,
    useCreate: useCreateFeature,
    useUpdate: useUpdateFeature,
    usePatch: usePatchFeature,
    useDelete: useDeleteFeature,
    queries: { list: featuresQuery, item: featureQuery },
} = createDataStoreHooks<Feature>({
    typeId: "features",
    queryableAttributes: ["name", "deployStorefront", "deployBM"],
    defaultData: defaultFeature,
});
