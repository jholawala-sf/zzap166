import React from "react";
import { CLIENT_SETTINGS } from "./config.js";

export default function Instructions() {
    return (
        <div style={{ minHeight: "600px", padding: "10px" }}>
            <h1 style={{ fontSize: "2em", paddingBottom: "1em" }}>Demo Help</h1>
            <ol style={{ listStyle: "auto" }}>
                <li>
                    Starting off: see Einsteins suggested prompt. Click the
                    button to automatically enter the prompt and generate the
                    first part of the page.
                    <br />
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/help1.png`}
                        alt={"placeholder"}
                    />
                </li>

                <li>
                    After each generation click the next prompt suggestion
                    (there are 3 total).
                </li>
                <li>
                    Finally you can view the page inside of the Page Designer
                    and the mobile storefront on the right. To see the landing
                    page in the mobile storefront, click the Click Here button.
                    <br />
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/help2.png`}
                        alt={"placeholder"}
                    />
                </li>
                <li>
                    When you are finished you can click the finish button to the
                    reset the demo. This will also happen automatically after 2
                    minutes.
                    <br />
                    <img
                        src={`${CLIENT_SETTINGS.staticAssets}/images/help3.png`}
                        alt={"placeholder"}
                    />
                </li>
            </ol>
        </div>
    );
}
