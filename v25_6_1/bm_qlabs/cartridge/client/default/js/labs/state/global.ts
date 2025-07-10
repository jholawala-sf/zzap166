import { create } from "zustand";
import { CONFIG } from "../config";
import { useLocales } from "./locale";

interface GlobalState {
    globalError: string[];
    currentLocale: string;
    setError: (err: string) => void;
    clearErrors: () => void;
    setCurrentLocale: (locale: string) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
    globalError: [],
    currentLocale: CONFIG.currentLocale || "default",
    setError: (err) =>
        set(({ globalError }) => ({
            globalError: [...globalError, err],
        })),
    clearErrors: () =>
        set(() => ({
            globalError: [],
        })),
    setCurrentLocale: (locale) =>
        set(() => ({
            currentLocale: locale,
        })),
}));

export function useCurrentLocale() {
    return useGlobalState((state) => state.currentLocale);
}

export function useCurrentLocaleLanguage() {
    const { data: locales } = useLocales();
    const currentLocale = useCurrentLocale();
    if (locales) {
        const locale = (
            locales as Array<{
                id: string;
                display_language: string;
                language: string;
            }>
        ).find((l) => l.id === currentLocale);
        if (locale) {
            return {
                id: locale.id,
                language: locale.language ? locale.display_language : "English",
            };
        }
    } else {
        return {
            id: currentLocale,
            language: "English",
        };
    }
}
