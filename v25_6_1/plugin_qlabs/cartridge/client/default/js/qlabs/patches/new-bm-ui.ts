import newBMStyles from "./new-bm-ui.css?raw";
import bmStyles from "./old-bm-ui.css?raw";

export function applyNewBMUIPatches() {
    const ccbmElement = document.querySelector("ccbm");
    if (ccbmElement && ccbmElement.classList.contains("ldsbm")) {
        const style = document.createElement("style");
        style.innerHTML = newBMStyles;
        document.head.appendChild(style);
    } else if (ccbmElement) {
        const style = document.createElement("style");
        style.innerHTML = bmStyles;
        document.head.appendChild(style);
    }
}
