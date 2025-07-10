import {
    Button,
    ButtonGroup,
    Dropdown,
    Spinner,
} from "@salesforce/design-system-react";
import React from "react";
import { useController } from "react-hook-form";
import { useCurrentLocaleLanguage } from "../state/global";
import { TextArea } from "./forms";

// eslint-disable-next-line no-unused-vars
import { css } from "@emotion/react";
import { useMutation } from "@tanstack/react-query";
import { generateCompletion } from "../services/completion";
import { usePromptsByObjectAttribute } from "../state/prompts";
import CodeMirror from "@uiw/react-codemirror";

/**
 * Represents a "react-hook-form" controlled field for an object attribute
 * with generative controls (generate/translate)
 *
 * TODO: this is specific to Product and not a general purpose for any system object yet
 *
 * @param control
 * @param {string} name
 * @param {ObjectAttribute} attribute
 * @param {object} props
 * @return {Element}
 * @constructor
 */
export function ControlledGenerativeField({
    control,
    attribute,
    object,
    ...props
}) {
    const { id: currentLocale, language } = useCurrentLocaleLanguage();

    const { field } = useController({
        name: attribute.ocapi_id,
        control,
        rules: { required: false },
    });

    const displayName =
        attribute.display_name[currentLocale] ?? attribute.display_name.default;

    // TODO: figure out when/where we want to use effective vs ocapi id
    const { data: prompts } = usePromptsByObjectAttribute(
        "Product",
        attribute.effective_id,
    );
    const promptOptions =
        prompts
            ?.sort((a, b) => {
                return (
                    new Date(b.lastModified).getTime() -
                    new Date(a.lastModified).getTime()
                );
            })
            .map((prompt) => ({
                label: prompt.data.name,
                value: prompt.id,
            })) || [];

    // TODO: not sure why i made this a mutation
    const updateFieldMutation = useMutation({
        mutationFn: async (promptId) => {
            const prompt = prompts?.find((p) => p.id === promptId);
            if (!prompt) {
                throw new Error(`Prompt ${promptId} not found`);
            }
            const result = await generateCompletion(prompt.data.body, {
                // TODO need full locale from current to get language
                CurrentLanguage: language || "English",
                Product: object,
            });
            field.onChange(result);
        },
    });

    return (
        <>
            <div className={`slds-form-element slds-m-vertical_small`}>
                <label
                    className="slds-form-element__label"
                    htmlFor={`input-field-${field.name}`}
                >
                    {`${displayName} (${attribute.effective_id})`}
                </label>
                <div className="slds-form-element__control">
                    {attribute.value_type === "html" && (
                        <CodeMirror
                            style={{ width: "auto", maxWidth: "100%" }}
                            value={field.value}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            {...props}
                            ref={field.ref}
                        />
                    )}
                    {attribute.value_type !== "html" && (
                        <TextArea
                            disabled={updateFieldMutation.isLoading}
                            rows={Math.min(
                                1 +
                                    Math.floor(
                                        field.value?.split("\n").length ?? 4,
                                    ),
                                10,
                            )}
                            {...field}
                            {...props}
                        />
                    )}
                </div>
                <ButtonGroup className="">
                    <Dropdown
                        align="right"
                        iconCategory="utility"
                        disabled={updateFieldMutation.isLoading}
                        iconName="down"
                        iconPosition="right"
                        label="Generate"
                        options={[
                            { label: "Prompts", type: "header" },
                            ...promptOptions,
                        ]}
                        onSelect={({ value }) =>
                            updateFieldMutation.mutate(value)
                        }
                    />
                    <Button
                        disabled={updateFieldMutation.isLoading}
                        iconCategory="utility"
                        iconName="world"
                        iconSize="medium"
                        fillColor="#0176d3"
                        iconVariant="border"
                        onClick={() => {
                            alert("Translations functionality coming soon");
                        }}
                    />
                </ButtonGroup>
                {updateFieldMutation.isLoading && (
                    <Spinner
                        className="slds-m-left_x-small"
                        size="small"
                        variant="brand"
                    />
                )}
            </div>
        </>
    );
}
