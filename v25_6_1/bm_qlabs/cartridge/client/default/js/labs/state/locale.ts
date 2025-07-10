import { api as ocapi } from "../api/ocapi";
import { useQuery } from "@tanstack/react-query";

interface LocaleInfo {
    id: string;
    name: string;
    display_name: string;
    active: boolean;
    default: boolean;

    country?: string;
    language?: string;
}

//load locales from LocalStorage
function loadLocales(): LocaleInfo[] {
    const locales = localStorage.getItem("bm-qlabs-locales");
    if (locales) {
        return JSON.parse(locales);
    }
    // if not persisted in LocalStorage, return default locale
    return [
        {
            active: true,
            id: "default",
            name: "Default",
            display_name: "Default",
            default: true,
        },
    ];
}

export function useLocales() {
    return useQuery<any, LocaleInfo[]>({
        queryKey: ["locales"],
        queryFn: async () => {
            const locales: LocaleInfo[] = (
                await ocapi.get("/locale_info/locales?select=(**)")
            ).data.hits;
            localStorage.setItem("bm-qlabs-locales", JSON.stringify(locales));
            return locales;
        },
        placeholderData: loadLocales(),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
}
