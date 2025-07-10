import React from "react";
import { Modal as SLDSModal } from "@salesforce/design-system-react";

/**
 * Wraps the modal so this application can work within a shadow DOM
 * All modal usage should go through this wrapper
 * @param props
 * @return {Element}
 * @constructor
 */
export function Modal(props) {
    return (
        <SLDSModal
            {...props}
            parentSelector={() =>
                document.getElementById("labs-container").shadowRoot ??
                document.body
            }
        />
    );
}
