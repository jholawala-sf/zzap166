import React from "react";
import { css } from "@emotion/react";

const spinnerContainer = css`
    height: 6rem;
    background-color: #16325c;
    position: relative;
`;

export function SpinnerWithContainer() {
    return (
        <div className="demo-only demo--inverse" css={spinnerContainer}>
            <div className="slds-spinner_container">
                <div role="status" className="slds-spinner slds-spinner_medium">
                    <span className="slds-assistive-text">Loading</span>
                    <div className="slds-spinner__dot-a"></div>
                    <div className="slds-spinner__dot-b"></div>
                </div>
            </div>
        </div>
    );
}
