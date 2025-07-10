import React from "react";
import { Alert, Icon } from "@salesforce/design-system-react";
import { useGlobalState } from "../state/global";
import { css } from "@emotion/react";

const containerCss = css`
    background-color: white;
    width: 100%;
    border-radius: 0.25rem;
    border: 1px solid #c9c9c9;
    padding: 1rem 1rem;
    border-bottom: 1px solid var(--slds-g-color-border-base-1, #c9c9c9);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
`;
/**
 * Card-like plain SLDS container
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
export default function DefaultLayout({ children }) {
    const { globalError, clearErrors } = useGlobalState();

    return (
        <>
            <Alert
                variant={"warning"}
                icon={<Icon category="utility" name="warning" />}
                labels={{
                    heading:
                        "This is a productivity tool, visionary demo and experimental platform. It does not represent accepted product roadmap or feature sets. It is not intended for production use.",
                }}
            />
            {globalError &&
                globalError.map((error, i) => (
                    <Alert
                        key={i}
                        dismissible
                        onRequestClose={() => clearErrors()}
                        icon={<Icon category="utility" name="error" />}
                        labels={{
                            heading: error,
                        }}
                        variant="error"
                    />
                ))}
            <div css={containerCss}>{children}</div>
        </>
    );
}
