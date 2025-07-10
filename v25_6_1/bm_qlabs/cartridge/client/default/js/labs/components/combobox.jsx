import React, { forwardRef } from "react";
import {
    Combobox,
    comboboxFilterAndLimit,
} from "@salesforce/design-system-react";

/**
 *
 * @example
 * <SingleSelectComboBox
 *    label="Single Select"
 *    placeholder="Select an Option"
 *    options={[
 *    { id: "1", label: "Option 1" },
 *    { id: "2", label: "Option 2" },
 *    { id: "3", label: "Option 3" },
 *    ]}
 *    selection={selection}
 *    onSelect={(selection) => {
 *      setSelection(selection);
 *    }}
 *  />
 *
 * @param onSelect
 * @param options
 * @param selection
 * @param label
 * @param placeholder
 * @param props
 * @return {Element}
 * @constructor
 */
export const SingleSelectComboBox = forwardRef(function SingleSelectComboBox(
    {
        onSelect,
        onBlur,
        options,
        selection,
        label,
        placeholder,
        readOnly,
        ...props
    },
    ref,
) {
    const [inputValue, setInputValue] = React.useState("");

    return (
        <Combobox
            events={{
                onChange: (event, { value }) => {
                    setInputValue(value);
                },
                onBlur: () => {
                    if (onBlur) {
                        onBlur();
                    }
                },
                onRequestRemoveSelectedOption: () => {
                    setInputValue("");
                    onSelect(null);
                },
                onSelect: (event, data) => {
                    onSelect(data.selection[0]);
                },
            }}
            labels={{
                label: label,
                placeholder: placeholder,
            }}
            options={comboboxFilterAndLimit({
                inputValue: inputValue,
                options: options,
                limit: 100,
                selection: [selection].filter(Boolean),
            })}
            selection={[selection].filter(Boolean)}
            value={inputValue}
            variant={readOnly ? "readonly" : "inline-listbox"}
            {...props}
            inputRef={(r) => (ref ? (ref.current = r) : null)}
        />
    );
});

export function MultiSelectComboBox({
    onSelect,
    options = [],
    selection = [],
    label,
    placeholder,
    ...props
}) {
    const [inputValue, setInputValue] = React.useState("");

    return (
        <Combobox
            events={{
                onChange: (event, { value }) => {
                    setInputValue(value);
                },
                onRequestRemoveSelectedOption: (event, data) => {
                    setInputValue("");
                    onSelect(data.selection);
                },
                onSelect: (event, data) => {
                    setInputValue("");
                    onSelect(data.selection);
                },
            }}
            labels={{
                label: label,
                placeholder: placeholder,
            }}
            options={comboboxFilterAndLimit({
                inputValue: inputValue,
                options: options,
                limit: 100,
                selection: selection.filter(Boolean),
            })}
            selection={selection.filter(Boolean)}
            value={inputValue}
            multiple
            variant="inline-listbox"
            {...props}
        />
    );
}
