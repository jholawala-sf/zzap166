import { c as createLocalStorage, T as THEME_PREFERENCE, P as PiPProvider, a as ThemeContext, D as Devtools, Q as QueryDevtoolsContext } from "./B4MFY5CR-q1rvlBUd.js";
import { g as getPreferredColorScheme, c as createMemo, a as createComponent } from "./production-DMln5lV4.js";
import "../companion.js";
var DevtoolsComponent = (props) => {
  const [localStore, setLocalStore] = createLocalStorage({
    prefix: "TanstackQueryDevtools"
  });
  const colorScheme = getPreferredColorScheme();
  const theme = createMemo(() => {
    const preference = localStore.theme_preference || THEME_PREFERENCE;
    if (preference !== "system")
      return preference;
    return colorScheme();
  });
  return createComponent(QueryDevtoolsContext.Provider, {
    value: props,
    get children() {
      return createComponent(PiPProvider, {
        localStore,
        setLocalStore,
        get children() {
          return createComponent(ThemeContext.Provider, {
            value: theme,
            get children() {
              return createComponent(Devtools, {
                localStore,
                setLocalStore
              });
            }
          });
        }
      });
    }
  });
};
var DevtoolsComponent_default = DevtoolsComponent;
export {
  DevtoolsComponent_default as default
};
//# sourceMappingURL=HO4MOOFI-BHCrO9Kf.js.map
