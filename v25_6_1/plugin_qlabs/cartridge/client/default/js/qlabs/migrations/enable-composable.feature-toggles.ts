const HOSTNAME = new URL(document.baseURI).hostname;

/**
 * enables composabled related feature toggles
 */
export default async function migrate(): Promise<void> {
    const response = await fetch(
        `https://${HOSTNAME}/on/demandware.store/Sites-Site/default%3bapp%3d__bm_admin/ViewFeatureSwitchPreferences-Show?SelectedMenuItem=feature_switch_manager&CurrentMenuItemId=global-prefs`,
    );
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const form = doc.querySelector(
        'form[name="FormUpdateBetaFeatureSwitchPreferences"]',
    ) as HTMLFormElement;

    const checkboxes = form.querySelectorAll(
        'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
        switch (checkbox.name) {
            case "ScapiHookExecutionEnabled":
                checkbox.checked = true;
                break;
            case "ShopperContextEnabled":
                checkbox.checked = true;
                break;
        }
    });

    const formData = new FormData(form);
    formData.append("ActionButton", "Apply");

    const submitResponse = await fetch(form.action, {
        method: form.method || "POST",
        body: formData,
        headers: {},
    });
}
