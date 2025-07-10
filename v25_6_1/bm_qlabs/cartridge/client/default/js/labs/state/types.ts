export interface ObjectAttribute {
    id: string;
    effective_id: string;
    ocapi_id: string;
    display_name: LocalizedString;
    value_type: "string" | "text" | "html" | string;
    localizable: boolean;
}

export interface LocalizedString {
    [locale: string]: string;
}
