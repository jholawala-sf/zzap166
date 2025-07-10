// This is just an example of a PD editor that opens a dialog outside of the editor iframe
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";

import { IconSettings } from "@salesforce/design-system-react";
import { Button } from "@salesforce/design-system-react";
import createEmotion from "@emotion/css/create-instance";

const { css } = createEmotion({
    key: "page-designer-parent-portal",
    container: window.top.document.getElementsByTagName("head")[0],
});
const style = css``;

function Dialog({ children }) {
    const [el, setEl] = React.useState(null);
    useEffect(() => {
        const portalEl = window.top.document.createElement("div");
        window.top.document.body.appendChild(portalEl);
        setEl(portalEl);
        return () => {
            window.top.document.body.removeChild(el);
        };
    }, []);

    if (el) {
        return createPortal(children, el);
    }
}

function Example() {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    return (
        <IconSettings iconPath="/assets/icons">
            <div>
                <Button label="Open Modal" onClick={toggleOpen} />
                <Dialog>
                    {isOpen && (
                        <div>
                            <section
                                role="dialog"
                                tabIndex="-1"
                                aria-modal="true"
                                aria-labelledby="modal-heading-01"
                                className="slds-modal slds-fade-in-open"
                            >
                                <div className="slds-modal__container">
                                    <button className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse">
                                        <svg
                                            className="slds-button__icon slds-button__icon_large"
                                            aria-hidden="true"
                                        ></svg>
                                        <span className="slds-assistive-text">
                                            Cancel and close
                                        </span>
                                    </button>
                                    <div className="slds-modal__header">
                                        <h1
                                            id="modal-heading-01"
                                            className="slds-modal__title slds-hyphenate"
                                        >
                                            Modal header
                                        </h1>
                                    </div>
                                    <div
                                        className="slds-modal__content slds-p-around_medium"
                                        id="modal-content-id-1"
                                    >
                                        <p className={style}>
                                            Sit nulla est ex deserunt
                                            exercitation anim occaecat. Nostrud
                                            ullamco deserunt aute id consequat
                                            veniam incididunt duis in sint irure
                                            nisi. Mollit officia cillum Lorem
                                            ullamco minim nostrud elit officia
                                            tempor esse quis. Cillum sunt ad
                                            dolore quis aute consequat ipsum
                                            magna exercitation reprehenderit
                                            magna. Tempor cupidatat consequat
                                            elit dolor adipisicing.
                                        </p>
                                        <p>
                                            Dolor eiusmod sunt ex incididunt
                                            cillum quis nostrud velit duis sit
                                            officia. Lorem aliqua enim laboris
                                            do dolor eiusmod officia. Mollit
                                            incididunt nisi consectetur esse
                                            laborum eiusmod pariatur proident.
                                            Eiusmod et adipisicing culpa
                                            deserunt nostrud ad veniam nulla
                                            aute est. Labore esse esse cupidatat
                                            amet velit id elit consequat minim
                                            ullamco mollit enim excepteur ea.
                                        </p>
                                    </div>
                                    <div className="slds-modal__footer">
                                        <button
                                            className="slds-button slds-button_neutral"
                                            aria-label="Cancel and close"
                                        >
                                            Cancel
                                        </button>
                                        <button className="slds-button slds-button_brand">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <div
                                className="slds-backdrop slds-backdrop_open"
                                role="presentation"
                            ></div>
                        </div>
                    )}
                </Dialog>
            </div>
        </IconSettings>
    );
}

const container = document.createElement("div");
container.style.backgroundColor = "white";
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Example />);
