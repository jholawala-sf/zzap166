// Unfortunately slds-react fields are not compatible with react-hook-forms and other modern
// react techniques. So using SLDS classes directly here
import { css } from "@emotion/react";
import { Button, Spinner } from "@salesforce/design-system-react";
import { forwardRef } from "react";
import { useController } from "react-hook-form";

const fixBMStyles = css`
    padding: 0.5rem 0.75rem !important;
`;

interface IUncontrolledFieldProps {
    name: string;
    label: string;
    error: any;
    readOnly?: boolean;
    children?: any;
    [key: string]: any;
}

export const CodeEditor = forwardRef<HTMLTextAreaElement>(
    function CodeEditor(props, ref) {
        return (
            <textarea
                className="slds-textarea"
                css={fixBMStyles}
                {...props}
                ref={ref}
            />
        );
    },
);

export function ControlledInputField({
    name,
    label,
    control,
    defaultValue = "",
    required = false,
}) {
    const {
        field: { onChange, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
        rules: { required },
    });
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
                <input
                    type="text"
                    aria-invalid={error ? "true" : "false"}
                    id={`input-field-${name}`}
                    className="slds-input"
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    ref={ref}
                />
            </div>
            {error && (
                <div className="slds-form-element__help slds-has-error">
                    {error.message}
                </div>
            )}
        </div>
    );
}

export const InputField = forwardRef<HTMLInputElement, IUncontrolledFieldProps>(
    function InputField({ label, error, type="text", ...props }, ref) {
        const name = props.name;
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
                    <input
                        type={type}
                        aria-invalid={error ? "true" : "false"}
                        id={`input-field-${name}`}
                        className="slds-input"
                        {...props}
                        ref={ref}
                    />
                </div>
                {error && (
                    <div className="slds-form-element__help slds-has-error">
                        {error.message}
                    </div>
                )}
            </div>
        );
    },
);

/**
 * To get around business manager !important CSS
 * @return {JSX.Element}
 * @constructor
 */
export const TextArea = forwardRef<HTMLTextAreaElement>(
    function TextArea(props, ref) {
        return (
            <textarea
                className="slds-textarea"
                css={fixBMStyles}
                {...props}
                ref={ref}
            />
        );
    },
);

export const TextAreaField = forwardRef<
    HTMLTextAreaElement,
    IUncontrolledFieldProps
>(function TextAreaField({ label, error, help="", ...props }, ref) {
    const name = props.name;
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
                <TextArea {...props} ref={ref} />
            </div>
            {help && <div className="slds-form-element__help">{help}</div>}
            {error && (
                <div className="slds-form-element__help slds-has-error">
                    {error.message}
                </div>
            )}
        </div>
    );
});

export const SelectField = forwardRef<
    HTMLSelectElement,
    IUncontrolledFieldProps
>(function SelectField({ label, error, children, ...props }, ref) {
    const name = props.name;
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
                <select
                    aria-invalid={error ? "true" : "false"}
                    id={`input-field-${name}`}
                    className="slds-select"
                    disabled={props.readOnly}
                    {...props}
                    ref={ref}
                >
                    {children}
                </select>
            </div>
            {error && (
                <div className="slds-form-element__help slds-has-error">
                    {error.message}
                </div>
            )}
        </div>
    );
});

export const CheckboxField = ({
    name,
    control,
    label,
    help = "",
    required = false,
    disabled = false,
    defaultValue = false,
}) => {
    const {
        field: { onChange, value, ref },
        fieldState: { error },
    } = useController({
        name,
        control,
        defaultValue,
        rules: { required },
    });

    return (
        <div className="slds-form-element">
            <div className="slds-form-element__control">
                <div className="slds-checkbox">
                    <input
                        type="checkbox"
                        id={name}
                        name={name}
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                        disabled={disabled}
                        ref={ref}
                        className="slds-checkbox__input"
                    />
                    <label className="slds-checkbox__label" htmlFor={name}>
                        <span className="slds-checkbox_faux"></span>
                        <span className="slds-form-element__label">
                            {label}
                        </span>
                    </label>
                </div>
            </div>
            {help && <div className="slds-form-element__help">{help}</div>}
            {error && (
                <div className="slds-form-element__help slds-has-error">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export const LoadingSaveButton = ({
    loading = false,
    label = "Save",
    variant = "brand",
    ...props
}) => {
    return (
        <div className="slds-grid slds-grid_vertical-align-center">
            <Button
                label={label}
                variant={variant}
                type="submit"
                disabled={loading}
                {...props}
            />
            {loading && (
                <div className="slds-m-left_medium" style={{position: "relative"}}>
                    <Spinner
                        assistiveText={{ label: "Loading" }}
                        size="x-small"
                        variant="brand"
                    />
                </div>
            )}
        </div>
    );
};
