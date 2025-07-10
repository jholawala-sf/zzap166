import { useEffect } from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../layouts/default.jsx";

import {
    Button,
    Card,
    Icon,
    PageHeaderControl,
    SplitView,
    SplitViewHeader,
    SplitViewListbox,
} from "@salesforce/design-system-react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SortOrder } from "../api/data.js";
import {
    CodeEditorJavascript,
    validateJavascript,
} from "../components/CodeEditor";
import {
    CheckboxField,
    InputField,
    LoadingSaveButton,
    TextAreaField,
} from "../components/forms";
import queryClient from "../query-client.js";
import {
    featureQuery,
    featuresQuery,
    useFeature,
    useCreateFeature,
    useDeleteFeature,
    useFindFeatures,
    useUpdateFeature,
} from "../state/features";
import { useQuery } from "@tanstack/react-query";
import { api as ocapi } from "../api/ocapi";

function FeaturesView() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: features, isLoading } = useFindFeatures({
        sort: [
            {
                field: "creation_date",
                sortOrder: SortOrder.DESC,
            },
        ],
    });
    const createFeature = useCreateFeature();
    const listItems =
        features?.map((feature) => ({
            id: feature.id,
            label: feature.data.name,
            bottomLeftText: feature.data.builtIn ? "Built-in" : "Custom",
            bottomRightText: feature.id.substring(0, 6),
            topRightText: feature.creationDate,
        })) ?? [];

    const selectedFeature = listItems?.find((li) => li.id === params.featureId);

    return (
        <>
            <SplitViewHeader
                key="1"
                onRenderActions={() => (
                    <PageHeaderControl>
                        <Button
                            label="New Feature"
                            onClick={() =>
                                createFeature.mutate({ name: "New Feature" })
                            }
                        />
                    </PageHeaderControl>
                )}
                icon={<Icon category="standard" name="choice" size="small" />}
                info={
                    <p className="slds-text-body_small">
                        {features?.length} items
                    </p>
                }
                title={"Features"}
                truncate
                variant="object-home"
            />
            <SplitViewListbox
                key="2"
                multiple
                options={listItems}
                events={{
                    onSelect: (event, { item }) => {
                        navigate(`/features/${item.id}`);
                    },
                }}
                selection={[selectedFeature]}
            />
        </>
    );
}

export function FeatureView() {
    const params = useParams();
    return <FeatureEdit featureId={params.featureId} key={params.featureId} />;
}

function useSites() {
    return useQuery({
        queryKey: ["sites"],
        queryFn: async () => {
            const response = await ocapi.get("sites");
            return response.data.data.map((site) => site.id);
        },
    });
}

function FeatureEdit({ featureId }) {
    const navigate = useNavigate();
    const { data: featureObj, isLoading: isFeatureLoading } = useFeature(featureId);
    const { data: sites } = useSites();
    const feature = featureObj?.data;

    const deleteFeature = useDeleteFeature();
    const deleteFeatureHandler = () => {
        if (window.confirm("Are you sure you want to delete this feature?")) {
            deleteFeature.mutate(featureObj, {
                onSuccess: () => {
                    navigate("/features");
                },
            });
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        watch,
    } = useForm({ defaultValues: feature });
    const deployStorefront = watch("deployStorefront");

    useEffect(() => {
        reset(feature);
    }, [isFeatureLoading]);

    const updateFeature = useUpdateFeature(featureObj);
    const createFeature = useCreateFeature();
    const cloneFeatureHandler = () => {
        createFeature.mutate({
            ...feature,
            name: `${feature.name} (Copy)`,
            builtIn: false,
        });
    };

    return (
        <Card
            heading={feature?.name}
            icon={
                <Icon
                    category="standard"
                    name="choice"
                    size="small"
                />
            }
            headerActions={
                <PageHeaderControl>
                    <Button
                        label="Clone"
                        variant="neutral"
                        onClick={cloneFeatureHandler}
                    />
                    <Button
                        label="Delete"
                        variant="destructive"
                        disabled={feature?.builtIn}
                        onClick={deleteFeatureHandler}
                    />
                </PageHeaderControl>
            }
        >
            <div className="slds-p-around_medium">
                <form
                    onSubmit={handleSubmit((data) => {
                        updateFeature.mutate(data);
                    })}
                >
                    <InputField
                        label="Feature Name"
                        readOnly={feature?.builtIn}
                        {...register("name", {
                            required: true,
                        })}
                        error={errors.name}
                    />
                    <TextAreaField
                        label="Description"
                        readOnly={feature?.builtIn}
                        {...register("description", {})}
                        error={errors.description}
                    />
                    <CheckboxField
                        name="deployStorefront"
                        control={control}
                        label="Deploy on Storefront"
                    />
                    {deployStorefront && (
                        <div
                            className={"slds-form-element slds-m-around--small"}
                        >
                            <label
                                className="slds-form-element__label"
                                htmlFor="select-01"
                            >
                                Select a site
                            </label>
                            <div className="slds-form-element__control">
                                <div className="slds-select_container">
                                    <select
                                        multiple
                                        className="slds-select"
                                        id="select-01"
                                        {...register("siteId")}
                                    >
                                        {sites?.map((_site) => (
                                            <option value={_site} key={_site}>
                                                {_site}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                    <CheckboxField
                        name="deployBM"
                        control={control}
                        label="Deploy in Business Manager"
                    />
                    <CodeEditorJavascript
                        label="Deployment Code"
                        name="deploymentCode"
                        control={control}
                        rows={10}
                    />
                    <LoadingSaveButton
                        loading={updateFeature.isPending}
                        label="Save"
                        variant="brand"
                        type="submit"
                    />
                </form>
            </div>
        </Card>
    );
}

export default function FeaturesManager() {
    return (
        <DefaultLayout>
            <SplitView
                masterWidth={"375px"}
                master={<FeaturesView />}
                detail={
                    <div className="slds-m-left_medium slds-grid slds-grid_vertical">
                        <Outlet />
                    </div>
                }
            />
        </DefaultLayout>
    );
}

export const ROUTES = [
    {
        path: "features",
        element: <FeaturesManager />,
        loader: async () => {
            const query = featuresQuery;
            return await queryClient.ensureQueryData(query);
        },
        handle: {
            crumb: () => "Features",
        },
        children: [
            {
                index: true,
                element: (
                    <div className="slds-card slds-p-around--large">
                        Choose or create a feature
                    </div>
                ),
            },
            {
                path: ":featureId",
                element: <FeatureView />,
                loader: async ({ params }) => {
                    const query = featureQuery(params.featureId);
                    return await queryClient.ensureQueryData(query);
                },
                handle: {
                    crumb: (data) => {
                        return `Feature ${data.id.substring(0, 6)}...`;
                    },
                },
            },
        ],
    },
];
