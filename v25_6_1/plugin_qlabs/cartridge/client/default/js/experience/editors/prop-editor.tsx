import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {
    type EditablePropDefinition,
    EditablePropType,
    type EditableReactComponent,
} from "@companion/components/types";
import SLDSConfig from "./slds";
interface PropsEditorConfig {
    component: string;
    props: Record<string, EditablePropDefinition>;
}

interface PropsEditorProps {
    config: PropsEditorConfig;
    value: PropAttrs | null;
}

interface PropAttrs extends Record<string, any> {}

function Prop({
    propId,
    propDef,
    value,
    onChange,
}: {
    propId: string;
    propDef: EditablePropDefinition;
    value: any;
    onChange: (value: any) => void;
}) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const renderField = () => {
        switch (propDef.type) {
            case EditablePropType.STRING:
            case EditablePropType.NUMBER:
                return (
                    <>
                        <label
                            className="slds-form-element__label"
                            htmlFor={`field-${propId}`}
                        >
                            {propDef.name}
                            {propDef.required && (
                                <span className="text-red-500 ml-1">*</span>
                            )}
                        </label>
                        <div className="slds-form-element__control">
                            <input
                                id={`field-${propId}`}
                                type={
                                    propDef.type === EditablePropType.NUMBER
                                        ? "number"
                                        : "text"
                                }
                                value={value || propDef.defaultValue || ""}
                                onChange={(e) => onChange(e.target.value)}
                                className="slds-input"
                                required={!!propDef.required}
                            />
                        </div>
                    </>
                );

            case EditablePropType.BOOLEAN:
                return (
                    <div className="slds-form-element__control">
                        <div className="slds-checkbox">
                            <input
                                type="checkbox"
                                id={`field-${propId}`}
                                checked={Boolean(value ?? propDef.defaultValue)}
                                onChange={(e) => onChange(e.target.checked)}
                                className="slds-checkbox__input"
                            />
                            <label
                                className="slds-checkbox__label"
                                htmlFor={`field-${propId}`}
                            >
                                <span className="slds-checkbox_faux"></span>
                                <span className="slds-form-element__label">
                                    {propDef.name}
                                </span>
                            </label>
                        </div>
                    </div>
                );

            case EditablePropType.OBJECT:
            case EditablePropType.TEMPLATE:
                return (
                    <div className="slds-form-element__control">
                        <label
                            className="slds-form-element__label"
                            htmlFor={`field-${propId}`}
                        >
                            {propDef.name}
                            {propDef.required && (
                                <span className="text-red-500 ml-1">*</span>
                            )}
                        </label>
                        <CodeMirror
                            value={value || propDef.defaultValue || ""}
                            onChange={(v) => {
                                onChange(v);
                            }}
                            extensions={[
                                javascript({
                                    jsx: true,
                                }),
                            ]}
                        />
                    </div>
                );

            case EditablePropType.QUERY:
                return (
                    <>
                        <label
                            className="slds-form-element__label"
                            htmlFor={`field-${propId}`}
                        >
                            {propDef.name}
                            {propDef.required && (
                                <span className="text-red-500 ml-1">*</span>
                            )}
                        </label>
                        <div className="slds-form-element__control">
                            <textarea
                                id={`field-${propId}`}
                                value={value || propDef.defaultValue || ""}
                                onChange={(e) => onChange(e.target.value)}
                                className="slds-textarea"
                                rows={4}
                                required={!!propDef.required}
                            />
                        </div>
                        {propDef.type === EditablePropType.QUERY && (
                            <div className="slds-form-element__help">
                                Uses jsonata syntax. See{" "}
                                <a href="https://jsonata.org/" target="_blank">
                                    jsonata.org
                                </a>{" "}
                                for more details.
                            </div>
                        )}
                    </>
                );
            default:
                return <div>Unknown prop type: {propDef.type}</div>;
        }
    };
    return (
        <div className={"slds-form-element"}>
            {renderField()}
            {propDef.description && (
                <div className="slds-form-element__help">
                    {propDef.description}
                </div>
            )}
            {false && (
                <div className="slds-form-element__help slds-has-error text-red-500 ">
                    ERROR:
                </div>
            )}
        </div>
    );
}

function PropsEditor({ config, value }: PropsEditorProps) {
    const [readOnly, setReadOnly] = useState(false);
    const [attrs, setAttrs] = useState<PropAttrs>(value || {});
    const componentName = config.component;
    const editableProps = config.props ?? {};

    useEffect(() => {
        emit({
            type: "sfcc:value",
            payload: attrs,
        });
    }, [attrs]);

    useEffect(() => {
        emit({
            type: "sfcc:interacted",
        });
    }, []);

    const handlePropChange = (propName: string, propValue: any) => {
        setAttrs((prevAttrs) => ({
            ...prevAttrs,
            [propName]: propValue,
        }));
    };

    return (
        <SLDSConfig>
            <div className="space-y-4 py-2 px-1">
                {Object.entries(editableProps).map(([propName, propDef]) => (
                    <div key={propName} className="mb-1">
                        <Prop
                            propId={propName}
                            propDef={propDef}
                            value={attrs[propName]}
                            onChange={(value) =>
                                handlePropChange(propName, value)
                            }
                        />
                    </div>
                ))}
            </div>
        </SLDSConfig>
    );
}

subscribe(
    "sfcc:ready",
    ({ config, value }: { config: any; value: PropAttrs | null }) => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        const root = createRoot(container);
        root.render(<PropsEditor config={config} value={value} />);
    },
);
