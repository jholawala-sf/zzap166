import {
    Alert,
    Button,
    Card,
    Icon,
    PageHeaderControl,
    SplitView,
    SplitViewHeader,
    SplitViewListbox,
} from "@salesforce/design-system-react";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SingleSelectComboBox } from "../components/combobox.jsx";
import { InputField, TextAreaField } from "../components/forms";
import { APP_SETTINGS } from "../config";
import DefaultLayout from "../layouts/default.jsx";
import queryClient from "../query-client";
import {
    promptQuery,
    promptsQuery,
    useCreatePrompt,
    useDeletePrompt,
    usePrompt,
    usePrompts,
    useUpdatePrompt,
} from "../state/prompts";
import { attributesQuery } from "../state/system-objects";

function PromptsView() {
    const { data: prompts } = usePrompts();
    const params = useParams();
    const navigate = useNavigate();
    const createPrompt = useCreatePrompt();
    const listItems =
        prompts
            ?.sort((a, b) => {
                // sort builtIn prompts first then by creation date
                if (a.data.builtIn && !b.data.builtIn) {
                    return -1;
                } else if (!a.data.builtIn && b.data.builtIn) {
                    return 1;
                } else {
                    return new Date(b.creationDate) - new Date(a.creationDate);
                }
            })
            ?.map((prompt) => ({
                id: prompt.id,
                label: prompt.data.name,
                bottomLeftText: `${prompt.data.builtIn ? "Built-In" : ""} ${
                    prompt.data.systemObject ?? ""
                } ${prompt.data.systemObjectAttribute ?? ""}`,
                bottomRightText: prompt.id.substring(0, 6),
                topRightText: prompt.creationDate,
            })) ?? [];

    const selectedPrompt = listItems.find((li) => li.id === params.promptId);

    return (
        <>
            <SplitViewHeader
                key="1"
                onRenderActions={() => (
                    <PageHeaderControl>
                        <Button
                            label="New Prompt"
                            onClick={() => createPrompt.mutate()}
                        />
                    </PageHeaderControl>
                )}
                icon={<Icon category="standard" name="prompt" />}
                info={
                    <p className="slds-text-body_small">
                        {prompts?.length} items
                    </p>
                }
                title={"Prompts"}
                truncate
                variant="object-home"
            />
            <SplitViewListbox
                key="2"
                multiple
                options={listItems}
                events={{
                    onSelect: (event, { item }) => {
                        navigate(`/prompts/${item.id}`);
                    },
                }}
                selection={[selectedPrompt]}
            />
        </>
    );
}

export function PromptView() {
    const params = useParams();
    // using a key here to ensure a fresh component on project route change
    return <Prompt promptId={params.promptId} key={params.promptId} />;
}

function Prompt({ promptId }) {
    const navigate = useNavigate();

    const { data: promptObj, isLoading } = usePrompt(promptId);
    const prompt = promptObj?.data;

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
        reset,
    } = useForm({ defaultValues: prompt });
    useEffect(() => {
        reset(prompt);
    }, [isLoading]);
    const currentSelectedSystemObject = watch("systemObject");
    const {
        data: systemObjectAttributes,
        isLoading: isLoadingSystemObjectAttributes,
    } = useQuery({
        ...attributesQuery(currentSelectedSystemObject),
        enabled: !!currentSelectedSystemObject,
    });
    const updatePrompt = useUpdatePrompt(promptObj);

    const deletePrompt = useDeletePrompt();
    const createPrompt = useCreatePrompt();

    const deletePromptHandler = () => {
        // use js confirm dialog
        if (window.confirm("Are you sure you want to delete this prompt?")) {
            deletePrompt.mutate(promptObj, {
                onSuccess: () => {
                    navigate("/prompts");
                },
            });
        }
    };
    const resetPromptHandler = () => {
        // use js confirm dialog
        if (
            window.confirm(
                "Are you sure you want to reset this prompts content?",
            )
        ) {
            updatePrompt.mutate(
                { ...prompt, body: prompt.defaultBody },
                {
                    onSuccess: () => {
                        reset({ ...prompt, body: prompt.defaultBody });
                    },
                },
            );
        }
    };
    const clonePromptHandler = () => {
        createPrompt.mutate(
            {
                ...prompt,
                name: `${prompt.name} (Copy)`,
                builtIn: false,
            },
            {
                onSuccess: (newPrompt) => {
                    navigate(`/prompts/${newPrompt.id}`);
                },
            },
        );
    };

    if (!prompt) {
        return <div>Loading...</div>;
    }
    return (
        <Card
            heading={prompt.name}
            icon={<Icon category="standard" name="prompt" />}
            headerActions={
                <PageHeaderControl>
                    <Button
                        label="Clone"
                        variant="neutral"
                        onClick={clonePromptHandler}
                    />
                    <Button
                        label="Delete"
                        variant="destructive"
                        onClick={deletePromptHandler}
                        disabled={prompt.builtIn}
                    />
                </PageHeaderControl>
            }
        >
            <div className="slds-p-around_medium">
                {prompt.builtIn && (
                    <Alert
                        className="slds-m-bottom_medium"
                        labels={{
                            heading:
                                "This is a built-in prompt that cannot be edited. Clone the prompt to make changes.",
                        }}
                        variant="warning"
                    />
                )}
                <form onSubmit={handleSubmit(updatePrompt.mutate)}>
                    <InputField
                        label="Prompt Name"
                        name="name"
                        {...register("name", {
                            required: true,
                            maxLength: 80,
                        })}
                        readOnly={prompt.builtIn}
                        error={errors.name}
                    />
                    <Controller
                        control={control}
                        name="systemObject"
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => {
                            const options = [
                                { id: "Product", label: "Product" },
                            ];

                            return (
                                <SingleSelectComboBox
                                    label="System Object"
                                    singleInputDisabled={prompt.builtIn}
                                    readOnly={prompt.builtIn}
                                    error={errors.systemObject}
                                    onSelect={(row) => {
                                        if (row) {
                                            onChange(row.id);
                                        } else {
                                            onChange(null);
                                            setValue(
                                                "systemObjectAttribute",
                                                null,
                                            );
                                        }
                                    }}
                                    onBlur={onBlur}
                                    selection={options.find(
                                        (o) => o.id === value,
                                    )}
                                    options={options}
                                    ref={ref}
                                />
                            );
                        }}
                    />

                    <Controller
                        control={control}
                        name="systemObjectAttribute"
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => {
                            const options =
                                systemObjectAttributes?.map((soa) => ({
                                    id: soa.effective_id,
                                    label: soa.display_name?.default || soa.id,
                                    subTitle: soa.effective_id,
                                })) || [];

                            return (
                                <SingleSelectComboBox
                                    label="Object Attribute"
                                    singleInputDisabled={
                                        prompt.builtIn ||
                                        !currentSelectedSystemObject ||
                                        isLoadingSystemObjectAttributes
                                    }
                                    readOnly={prompt.builtIn}
                                    error={errors.systemObject}
                                    onSelect={(row) =>
                                        row ? onChange(row.id) : onChange(null)
                                    }
                                    onBlur={onBlur}
                                    selection={options.find(
                                        (o) => o.id === value,
                                    )}
                                    options={options}
                                    ref={ref}
                                />
                            );
                        }}
                    />

                    <TextAreaField
                        rows={20}
                        {...register("body")}
                        readOnly={
                            !APP_SETTINGS.ALLOW_EDIT_BUILT_IN_PROMPTS &&
                            prompt.builtIn
                        }
                    />

                    <Button label="Save" variant="brand" type="submit" />
                    {prompt.builtIn && (
                        <Button
                            label="Reset to Default"
                            variant="neutral"
                            type="button"
                            onClick={resetPromptHandler}
                        />
                    )}
                </form>
            </div>
        </Card>
    );
}

export function PromptStudio() {
    return (
        <DefaultLayout>
            <SplitView
                masterWidth={"375px"}
                master={<PromptsView />}
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
        path: "prompts",
        element: <PromptStudio />,
        handle: {
            crumb: "Prompt Studio",
        },
        loader: async () => {
            return await queryClient.ensureQueryData(promptsQuery);
        },
        children: [
            {
                index: true,
                element: (
                    <div className="slds-card slds-p-around--large">
                        Choose or create a prompt
                    </div>
                ),
            },
            {
                path: ":promptId",
                element: <PromptView />,
                loader: async ({ params }) => {
                    const query = promptQuery(params.promptId);
                    return await queryClient.ensureQueryData(query);
                },
                handle: {
                    crumb: (data) => {
                        return `${data.data.name}`;
                    },
                },
            },
        ],
    },
];
