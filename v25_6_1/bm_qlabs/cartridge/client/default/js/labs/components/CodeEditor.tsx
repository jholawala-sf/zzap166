import { javascript } from "@codemirror/lang-javascript";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import React, { useEffect } from "react";
import { useController } from "react-hook-form";

/**
 * Renders a CodeMirror editor with the given content and onChange handler with javascript syntax highlighting.
 */
export function CodeEditor({
    name,
    control,
    defaultValue = "",
    rules = {},
    ...props
}) {
    const {
        field,
    } = useController({
        name,
        control,
        rules,
        defaultValue,
    });
    return (
        <CodeMirror
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            {...props}
            ref={field.ref}
        />
    );
}

export function validateJavascript(value: string) {
    try {
        new Function(`return ${value}`);
        return null;
    } catch (e) {
        return e.message;
    }
}

export function CodeEditorJavascript({
    name,
    control,
    label = "",
    defaultValue = "",
    rules = {},
    help = "",
    ...props
}) {
    const refs = React.useRef<ReactCodeMirrorRef>({});

    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules,
        defaultValue,
    });

    useEffect(() => {
        if (refs.current?.view) {
            field.ref(refs.current.view);
        }
    }, [refs.current]);

    return (
        <div
            className={`slds-form-element ${
                error ? "slds-has-error" : ""
            } slds-m-vertical_small`}
        >
            <label
                className="slds-form-element__label"
                htmlFor={`input-field-${name}`}
            >
                {label}
            </label>

            <div className="slds-form-element__control">
                <CodeMirror
                    value={field.value}
                    onChange={(v) => {
                        field.onChange(v);
                    }}
                    onBlur={field.onBlur}
                    extensions={[
                        javascript({
                            jsx: true,
                        }),
                    ]}
                    {...props}
                    ref={refs}
                />
            </div>
            {help && <div className="slds-form-element__help">{help}</div>}
            {error && (
                <div className="slds-form-element__help slds-has-error">
                    ERROR: {error.message}
                </div>
            )}
        </div>
    );
}

export const CodeEditorShell = CodeEditor;
export const CodeEditorHTML = CodeEditor;
export const CodeEditorJSON = CodeEditor;

//export function CodeEditorShell({
//    value,
//    onChange,
//    readOnly,
//    ...props
//}: CodeEditorProps) {
//    return (
//        <CodeMirror
//            value={value}
//            readOnly={readOnly}
//            extensions={[StreamLanguage.define(shell)]}
//            onChange={(value) => (onChange ? onChange(value) : null)}
//            {...props}
//        />
//    );
//}
//
//export const CodeEditorHTML = forwardRef<ReactCodeMirrorRef, CodeEditorProps>(
//    function CodeEditorHTML({ value, ...props }, ref) {
//        return <CodeMirror
//            value={value}
//            style={{ width: "auto", maxWidth: "100%" }}
//            extensions={[html(), EditorView.lineWrapping]}
//            ref={ref}
//            {...props}
//        />;
//    }
//);
//export function CodeEditorHTML({
//    name,
//    control,
//    label,
//    defaultValue = "",
//    required = false,
//    ...props
//}) {
//    const {
//        field: { onChange, value, ref },
//        fieldState: { error },
//    } = useController({
//        name,
//        control,
//        defaultValue,
//        rules: { required },
//    });
//    return (
//        <CodeMirror
//            value={value}
//            style={{ width: "auto", maxWidth: "100%" }}
//            onChange={(v) => onChange(v)}
//            extensions={[html(), EditorView.lineWrapping]}
//            ref={ref}
//            {...props}
//        />
//    );
//}

/**
 * Renders a CodeMirror editor with the given content and onChange handler with json syntax highlighting.
 */
//export const CodeEditorJSON = forwardRef<ReactCodeMirrorRef, CodeEditorProps>(
//    function CodeEditorJSON({ value, onChange, ...props }, ref) {
//        return (
//            <CodeMirror
//                value={value}
//                onChange={(value) => onChange(value)}
//                extensions={[json()]}
//                ref={ref}
//                {...props}
//            />
//        );
//    },
//);
//
