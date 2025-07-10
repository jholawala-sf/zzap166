import React from "react";
import { Alert, Icon } from "@salesforce/design-system-react";
import { useGlobalState } from "../state/global";
import { css } from "@emotion/react";

const containerCss = css`
    background-color: white;
    margin-left: -0.75rem;
    margin-right: -0.75rem;
    margin-top: -1rem;
    min-height: 100vh;
`;

const contentCss = css`
    padding: 1rem 1rem;
`;
/**
 * Card-like plain SLDS container
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
export default function FullPage({ children }) {
    const { globalError, clearErrors } = useGlobalState();

    return (
        <>
            <div css={containerCss}>
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
                <div css={contentCss}>{children}</div>
            </div>
        </>
    );
}
