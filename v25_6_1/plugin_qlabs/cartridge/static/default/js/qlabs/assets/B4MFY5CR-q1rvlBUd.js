var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { b as createContext, d as createSignal, o as onMount, e as createEffect, c as createMemo, a as createComponent, P as Portal, S as Show, t as template, i as insert, f as createRenderEffect, h as className, s as sortFns, m as mutationSortFns, j as on, k as setAttribute, l as clearDelegatedEvents, n as delegateEvents, u as useContext, p as onCleanup, q as getSidedProp, r as use, v as createUniqueId, w as batch, x as getQueryStatusLabel, y as getMutationStatusColor, z as getQueryStatusColor, A as getQueryStatusColorByLabel, B as displayValue, F as For, C as convertRemToPixels, D as untrack, $ as $TRACK, E as useTransition, G as spread, H as mergeProps, I as createRoot, J as serialize, K as Index, L as updateNestedDataByPath, M as addEventListener, N as stringify, O as Match, Q as Switch, R as deleteNestedDataByPath, T as splitProps, U as Dynamic, V as createComputed } from "./production-DMln5lV4.js";
var isNonNullable = (i2) => i2 != null;
var filterNonNullable = (arr) => arr.filter(isNonNullable);
function chain(callbacks) {
  return (...args) => {
    for (const callback of callbacks)
      callback && callback(...args);
  };
}
var access = (v) => typeof v === "function" && !v.length ? v() : v;
var asArray = (value) => Array.isArray(value) ? value : value ? [value] : [];
function accessWith(valueOrFn, ...args) {
  return typeof valueOrFn === "function" ? valueOrFn(...args) : valueOrFn;
}
var tryOnCleanup = onCleanup;
function handleDiffArray(current, prev, handleAdded, handleRemoved) {
  const currLength = current.length;
  const prevLength = prev.length;
  let i2 = 0;
  if (!prevLength) {
    for (; i2 < currLength; i2++)
      handleAdded(current[i2]);
    return;
  }
  if (!currLength) {
    for (; i2 < prevLength; i2++)
      handleRemoved(prev[i2]);
    return;
  }
  for (; i2 < prevLength; i2++) {
    if (prev[i2] !== current[i2])
      break;
  }
  let prevEl;
  let currEl;
  prev = prev.slice(i2);
  current = current.slice(i2);
  for (prevEl of prev) {
    if (!current.includes(prevEl))
      handleRemoved(prevEl);
  }
  for (currEl of current) {
    if (!prev.includes(currEl))
      handleAdded(currEl);
  }
}
function createStorage(props) {
  const [error, setError] = createSignal();
  const handleError = (props == null ? void 0 : props.throw) ? (err, fallback) => {
    setError(err instanceof Error ? err : new Error(fallback));
    throw err;
  } : (err, fallback) => {
    setError(err instanceof Error ? err : new Error(fallback));
  };
  const apis = (props == null ? void 0 : props.api) ? Array.isArray(props.api) ? props.api : [props.api] : [globalThis.localStorage].filter(Boolean);
  const prefix = (props == null ? void 0 : props.prefix) ? `${props.prefix}.` : "";
  const signals = /* @__PURE__ */ new Map();
  const store = new Proxy(
    {},
    {
      get(_, key) {
        let node = signals.get(key);
        if (!node) {
          node = createSignal(void 0, { equals: false });
          signals.set(key, node);
        }
        node[0]();
        const value = apis.reduce(
          (result, api) => {
            if (result !== null || !api) {
              return result;
            }
            try {
              return api.getItem(`${prefix}${key}`);
            } catch (err) {
              handleError(err, `Error reading ${prefix}${key} from ${api["name"]}`);
              return null;
            }
          },
          null
        );
        if (value !== null && (props == null ? void 0 : props.deserializer)) {
          return props.deserializer(value, key, props.options);
        }
        return value;
      }
    }
  );
  const setter = (key, value, options) => {
    const filteredValue = (props == null ? void 0 : props.serializer) ? props.serializer(value, key, options ?? props.options) : value;
    const apiKey = `${prefix}${key}`;
    apis.forEach((api) => {
      try {
        api.getItem(apiKey) !== filteredValue && api.setItem(apiKey, filteredValue);
      } catch (err) {
        handleError(err, `Error setting ${prefix}${key} to ${filteredValue} in ${api.name}`);
      }
    });
    const node = signals.get(key);
    node && node[1]();
  };
  const remove = (key) => apis.forEach((api) => {
    try {
      api.removeItem(`${prefix}${key}`);
    } catch (err) {
      handleError(err, `Error removing ${prefix}${key} from ${api.name}`);
    }
  });
  const clear = () => apis.forEach((api) => {
    try {
      api.clear();
    } catch (err) {
      handleError(err, `Error clearing ${api.name}`);
    }
  });
  const toJSON = () => {
    const result = {};
    const addValue = (key, value) => {
      if (!result.hasOwnProperty(key)) {
        const filteredValue = value && (props == null ? void 0 : props.deserializer) ? props.deserializer(value, key, props.options) : value;
        if (filteredValue) {
          result[key] = filteredValue;
        }
      }
    };
    apis.forEach((api) => {
      if (typeof api.getAll === "function") {
        let values;
        try {
          values = api.getAll();
        } catch (err) {
          handleError(err, `Error getting all values from in ${api.name}`);
        }
        for (const key of values) {
          addValue(key, values[key]);
        }
      } else {
        let index = 0, key;
        try {
          while (key = api.key(index++)) {
            if (!result.hasOwnProperty(key)) {
              addValue(key, api.getItem(key));
            }
          }
        } catch (err) {
          handleError(err, `Error getting all values from ${api.name}`);
        }
      }
    });
    return result;
  };
  (props == null ? void 0 : props.sync) !== false && onMount(() => {
    const listener = (ev) => {
      var _a;
      let changed = false;
      apis.forEach((api) => {
        try {
          if (api !== ev.storageArea && ev.key && ev.newValue !== api.getItem(ev.key)) {
            ev.newValue ? api.setItem(ev.key, ev.newValue) : api.removeItem(ev.key);
            changed = true;
          }
        } catch (err) {
          handleError(
            err,
            `Error synching api ${api.name} from storage event (${ev.key}=${ev.newValue})`
          );
        }
      });
      changed && ev.key && ((_a = signals.get(ev.key)) == null ? void 0 : _a[1]());
    };
    if ("addEventListener" in globalThis) {
      globalThis.addEventListener("storage", listener);
      onCleanup(() => globalThis.removeEventListener("storage", listener));
    } else {
      apis.forEach((api) => {
        var _a;
        return (_a = api.addEventListener) == null ? void 0 : _a.call(api, "storage", listener);
      });
      onCleanup(() => apis.forEach((api) => {
        var _a;
        return (_a = api.removeEventListener) == null ? void 0 : _a.call(api, "storage", listener);
      }));
    }
  });
  return [
    store,
    setter,
    {
      clear,
      error,
      remove,
      toJSON
    }
  ];
}
var createLocalStorage = createStorage;
var addClearMethod = (storage) => {
  if (typeof storage.clear === "function") {
    return storage;
  }
  storage.clear = () => {
    let key;
    while (key = storage.key(0)) {
      storage.removeItem(key);
    }
  };
  return storage;
};
var serializeCookieOptions = (options) => {
  if (!options) {
    return "";
  }
  let memo = "";
  for (const key in options) {
    if (!options.hasOwnProperty(key)) {
      continue;
    }
    const value = options[key];
    memo += value instanceof Date ? `; ${key}=${value.toUTCString()}` : typeof value === "boolean" ? `; ${key}` : `; ${key}=${value}`;
  }
  return memo;
};
var cookieStorage = addClearMethod({
  _cookies: [globalThis.document, "cookie"],
  getItem: (key) => {
    var _a;
    return ((_a = cookieStorage._cookies[0][cookieStorage._cookies[1]].match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")) == null ? void 0 : _a.pop()) ?? null;
  },
  setItem: (key, value, options) => {
    const oldValue = cookieStorage.getItem(key);
    cookieStorage._cookies[0][cookieStorage._cookies[1]] = `${key}=${value}${serializeCookieOptions(
      options
    )}`;
    const storageEvent = Object.assign(new Event("storage"), {
      key,
      oldValue,
      newValue: value,
      url: globalThis.document.URL,
      storageArea: cookieStorage
    });
    window.dispatchEvent(storageEvent);
  },
  removeItem: (key) => {
    cookieStorage._cookies[0][cookieStorage._cookies[1]] = `${key}=deleted${serializeCookieOptions({
      expires: /* @__PURE__ */ new Date(0)
    })}`;
  },
  key: (index) => {
    let key = null;
    let count = 0;
    cookieStorage._cookies[0][cookieStorage._cookies[1]].replace(
      /(?:^|;)\s*(.+?)\s*=\s*[^;]+/g,
      (_, found) => {
        if (!key && found && count++ === index) {
          key = found;
        }
        return "";
      }
    );
    return key;
  },
  get length() {
    let length = 0;
    cookieStorage._cookies[0][cookieStorage._cookies[1]].replace(
      /(?:^|;)\s*.+?\s*=\s*[^;]+/g,
      (found) => {
        length += found ? 1 : 0;
        return "";
      }
    );
    return length;
  }
});
var firstBreakpoint = 1024;
var secondBreakpoint = 796;
var thirdBreakpoint = 700;
var BUTTON_POSITION = "bottom-right";
var POSITION = "bottom";
var THEME_PREFERENCE = "system";
var INITIAL_IS_OPEN = false;
var DEFAULT_HEIGHT = 500;
var PIP_DEFAULT_HEIGHT = 500;
var DEFAULT_WIDTH = 500;
var DEFAULT_SORT_FN_NAME = Object.keys(sortFns)[0];
var DEFAULT_SORT_ORDER = 1;
var DEFAULT_MUTATION_SORT_FN_NAME = Object.keys(mutationSortFns)[0];
var QueryDevtoolsContext = createContext({
  client: void 0,
  onlineManager: void 0,
  queryFlavor: "",
  version: "",
  shadowDOMTarget: void 0
});
function useQueryDevtoolsContext() {
  return useContext(QueryDevtoolsContext);
}
var PiPContext = createContext(void 0);
var PiPProvider = (props) => {
  const [pipWindow, setPipWindow] = createSignal(null);
  const closePipWindow = () => {
    const w = pipWindow();
    if (w != null) {
      w.close();
      setPipWindow(null);
    }
  };
  const requestPipWindow = (width, height) => {
    if (pipWindow() != null) {
      return;
    }
    const pip = window.open("", "TSQD-Devtools-Panel", `width=${width},height=${height},popup`);
    if (!pip) {
      throw new Error("Failed to open popup. Please allow popups for this site to view the devtools in picture-in-picture mode.");
    }
    pip.document.head.innerHTML = "";
    pip.document.body.innerHTML = "";
    clearDelegatedEvents(pip.document);
    pip.document.title = "TanStack Query Devtools";
    pip.document.body.style.margin = "0";
    pip.addEventListener("pagehide", () => {
      props.setLocalStore("pip_open", "false");
      setPipWindow(null);
    });
    [...(useQueryDevtoolsContext().shadowDOMTarget || document).styleSheets].forEach((styleSheet) => {
      try {
        const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
        const style = document.createElement("style");
        const style_node = styleSheet.ownerNode;
        let style_id = "";
        if (style_node && "id" in style_node) {
          style_id = style_node.id;
        }
        if (style_id) {
          style.setAttribute("id", style_id);
        }
        style.textContent = cssRules;
        pip.document.head.appendChild(style);
      } catch (e2) {
        const link = document.createElement("link");
        if (styleSheet.href == null) {
          return;
        }
        link.rel = "stylesheet";
        link.type = styleSheet.type;
        link.media = styleSheet.media.toString();
        link.href = styleSheet.href;
        pip.document.head.appendChild(link);
      }
    });
    delegateEvents(["focusin", "focusout", "pointermove", "keydown", "pointerdown", "pointerup", "click", "mousedown", "input"], pip.document);
    props.setLocalStore("pip_open", "true");
    setPipWindow(pip);
  };
  createEffect(() => {
    const pip_open = props.localStore.pip_open ?? "false";
    if (pip_open === "true" && !props.disabled) {
      requestPipWindow(Number(window.innerWidth), Number(props.localStore.height || PIP_DEFAULT_HEIGHT));
    }
  });
  createEffect(() => {
    const gooberStyles = (useQueryDevtoolsContext().shadowDOMTarget || document).querySelector("#_goober");
    const w = pipWindow();
    if (gooberStyles && w) {
      const observer = new MutationObserver(() => {
        const pip_style = (useQueryDevtoolsContext().shadowDOMTarget || w.document).querySelector("#_goober");
        if (pip_style) {
          pip_style.textContent = gooberStyles.textContent;
        }
      });
      observer.observe(gooberStyles, {
        childList: true,
        // observe direct children
        subtree: true,
        // and lower descendants too
        characterDataOldValue: true
        // pass old data to callback
      });
      onCleanup(() => {
        observer.disconnect();
      });
    }
  });
  const value = createMemo(() => ({
    pipWindow: pipWindow(),
    requestPipWindow,
    closePipWindow,
    disabled: props.disabled ?? false
  }));
  return createComponent(PiPContext.Provider, {
    value,
    get children() {
      return props.children;
    }
  });
};
var usePiPWindow = () => {
  const context = createMemo(() => {
    const ctx = useContext(PiPContext);
    if (!ctx) {
      throw new Error("usePiPWindow must be used within a PiPProvider");
    }
    return ctx();
  });
  return context;
};
var ThemeContext = createContext(
  () => "dark"
);
function useTheme() {
  return useContext(ThemeContext);
}
var characterMap = {
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  Ấ: "A",
  Ắ: "A",
  Ẳ: "A",
  Ẵ: "A",
  Ặ: "A",
  Æ: "AE",
  Ầ: "A",
  Ằ: "A",
  Ȃ: "A",
  Ç: "C",
  Ḉ: "C",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  Ế: "E",
  Ḗ: "E",
  Ề: "E",
  Ḕ: "E",
  Ḝ: "E",
  Ȇ: "E",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  Ḯ: "I",
  Ȋ: "I",
  Ð: "D",
  Ñ: "N",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  Ố: "O",
  Ṍ: "O",
  Ṓ: "O",
  Ȏ: "O",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  Ý: "Y",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  ấ: "a",
  ắ: "a",
  ẳ: "a",
  ẵ: "a",
  ặ: "a",
  æ: "ae",
  ầ: "a",
  ằ: "a",
  ȃ: "a",
  ç: "c",
  ḉ: "c",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  ế: "e",
  ḗ: "e",
  ề: "e",
  ḕ: "e",
  ḝ: "e",
  ȇ: "e",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  ḯ: "i",
  ȋ: "i",
  ð: "d",
  ñ: "n",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  ố: "o",
  ṍ: "o",
  ṓ: "o",
  ȏ: "o",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  ý: "y",
  ÿ: "y",
  Ā: "A",
  ā: "a",
  Ă: "A",
  ă: "a",
  Ą: "A",
  ą: "a",
  Ć: "C",
  ć: "c",
  Ĉ: "C",
  ĉ: "c",
  Ċ: "C",
  ċ: "c",
  Č: "C",
  č: "c",
  C̆: "C",
  c̆: "c",
  Ď: "D",
  ď: "d",
  Đ: "D",
  đ: "d",
  Ē: "E",
  ē: "e",
  Ĕ: "E",
  ĕ: "e",
  Ė: "E",
  ė: "e",
  Ę: "E",
  ę: "e",
  Ě: "E",
  ě: "e",
  Ĝ: "G",
  Ǵ: "G",
  ĝ: "g",
  ǵ: "g",
  Ğ: "G",
  ğ: "g",
  Ġ: "G",
  ġ: "g",
  Ģ: "G",
  ģ: "g",
  Ĥ: "H",
  ĥ: "h",
  Ħ: "H",
  ħ: "h",
  Ḫ: "H",
  ḫ: "h",
  Ĩ: "I",
  ĩ: "i",
  Ī: "I",
  ī: "i",
  Ĭ: "I",
  ĭ: "i",
  Į: "I",
  į: "i",
  İ: "I",
  ı: "i",
  Ĳ: "IJ",
  ĳ: "ij",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  Ḱ: "K",
  ḱ: "k",
  K̆: "K",
  k̆: "k",
  Ĺ: "L",
  ĺ: "l",
  Ļ: "L",
  ļ: "l",
  Ľ: "L",
  ľ: "l",
  Ŀ: "L",
  ŀ: "l",
  Ł: "l",
  ł: "l",
  Ḿ: "M",
  ḿ: "m",
  M̆: "M",
  m̆: "m",
  Ń: "N",
  ń: "n",
  Ņ: "N",
  ņ: "n",
  Ň: "N",
  ň: "n",
  ŉ: "n",
  N̆: "N",
  n̆: "n",
  Ō: "O",
  ō: "o",
  Ŏ: "O",
  ŏ: "o",
  Ő: "O",
  ő: "o",
  Œ: "OE",
  œ: "oe",
  P̆: "P",
  p̆: "p",
  Ŕ: "R",
  ŕ: "r",
  Ŗ: "R",
  ŗ: "r",
  Ř: "R",
  ř: "r",
  R̆: "R",
  r̆: "r",
  Ȓ: "R",
  ȓ: "r",
  Ś: "S",
  ś: "s",
  Ŝ: "S",
  ŝ: "s",
  Ş: "S",
  Ș: "S",
  ș: "s",
  ş: "s",
  Š: "S",
  š: "s",
  Ţ: "T",
  ţ: "t",
  ț: "t",
  Ț: "T",
  Ť: "T",
  ť: "t",
  Ŧ: "T",
  ŧ: "t",
  T̆: "T",
  t̆: "t",
  Ũ: "U",
  ũ: "u",
  Ū: "U",
  ū: "u",
  Ŭ: "U",
  ŭ: "u",
  Ů: "U",
  ů: "u",
  Ű: "U",
  ű: "u",
  Ų: "U",
  ų: "u",
  Ȗ: "U",
  ȗ: "u",
  V̆: "V",
  v̆: "v",
  Ŵ: "W",
  ŵ: "w",
  Ẃ: "W",
  ẃ: "w",
  X̆: "X",
  x̆: "x",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Y̆: "Y",
  y̆: "y",
  Ź: "Z",
  ź: "z",
  Ż: "Z",
  ż: "z",
  Ž: "Z",
  ž: "z",
  ſ: "s",
  ƒ: "f",
  Ơ: "O",
  ơ: "o",
  Ư: "U",
  ư: "u",
  Ǎ: "A",
  ǎ: "a",
  Ǐ: "I",
  ǐ: "i",
  Ǒ: "O",
  ǒ: "o",
  Ǔ: "U",
  ǔ: "u",
  Ǖ: "U",
  ǖ: "u",
  Ǘ: "U",
  ǘ: "u",
  Ǚ: "U",
  ǚ: "u",
  Ǜ: "U",
  ǜ: "u",
  Ứ: "U",
  ứ: "u",
  Ṹ: "U",
  ṹ: "u",
  Ǻ: "A",
  ǻ: "a",
  Ǽ: "AE",
  ǽ: "ae",
  Ǿ: "O",
  ǿ: "o",
  Þ: "TH",
  þ: "th",
  Ṕ: "P",
  ṕ: "p",
  Ṥ: "S",
  ṥ: "s",
  X́: "X",
  x́: "x",
  Ѓ: "Г",
  ѓ: "г",
  Ќ: "К",
  ќ: "к",
  A̋: "A",
  a̋: "a",
  E̋: "E",
  e̋: "e",
  I̋: "I",
  i̋: "i",
  Ǹ: "N",
  ǹ: "n",
  Ồ: "O",
  ồ: "o",
  Ṑ: "O",
  ṑ: "o",
  Ừ: "U",
  ừ: "u",
  Ẁ: "W",
  ẁ: "w",
  Ỳ: "Y",
  ỳ: "y",
  Ȁ: "A",
  ȁ: "a",
  Ȅ: "E",
  ȅ: "e",
  Ȉ: "I",
  ȉ: "i",
  Ȍ: "O",
  ȍ: "o",
  Ȑ: "R",
  ȑ: "r",
  Ȕ: "U",
  ȕ: "u",
  B̌: "B",
  b̌: "b",
  Č̣: "C",
  č̣: "c",
  Ê̌: "E",
  ê̌: "e",
  F̌: "F",
  f̌: "f",
  Ǧ: "G",
  ǧ: "g",
  Ȟ: "H",
  ȟ: "h",
  J̌: "J",
  ǰ: "j",
  Ǩ: "K",
  ǩ: "k",
  M̌: "M",
  m̌: "m",
  P̌: "P",
  p̌: "p",
  Q̌: "Q",
  q̌: "q",
  Ř̩: "R",
  ř̩: "r",
  Ṧ: "S",
  ṧ: "s",
  V̌: "V",
  v̌: "v",
  W̌: "W",
  w̌: "w",
  X̌: "X",
  x̌: "x",
  Y̌: "Y",
  y̌: "y",
  A̧: "A",
  a̧: "a",
  B̧: "B",
  b̧: "b",
  Ḑ: "D",
  ḑ: "d",
  Ȩ: "E",
  ȩ: "e",
  Ɛ̧: "E",
  ɛ̧: "e",
  Ḩ: "H",
  ḩ: "h",
  I̧: "I",
  i̧: "i",
  Ɨ̧: "I",
  ɨ̧: "i",
  M̧: "M",
  m̧: "m",
  O̧: "O",
  o̧: "o",
  Q̧: "Q",
  q̧: "q",
  U̧: "U",
  u̧: "u",
  X̧: "X",
  x̧: "x",
  Z̧: "Z",
  z̧: "z"
};
var chars = Object.keys(characterMap).join("|");
var allAccents = new RegExp(chars, "g");
function removeAccents(str) {
  return str.replace(allAccents, (match) => {
    return characterMap[match];
  });
}
var rankings = {
  CASE_SENSITIVE_EQUAL: 7,
  EQUAL: 6,
  STARTS_WITH: 5,
  WORD_STARTS_WITH: 4,
  CONTAINS: 3,
  ACRONYM: 2,
  MATCHES: 1,
  NO_MATCH: 0
};
function rankItem(item, value, options) {
  var _options$threshold;
  options = options || {};
  options.threshold = (_options$threshold = options.threshold) != null ? _options$threshold : rankings.MATCHES;
  if (!options.accessors) {
    const rank = getMatchRanking(item, value, options);
    return {
      // ends up being duplicate of 'item' in matches but consistent
      rankedValue: item,
      rank,
      accessorIndex: -1,
      accessorThreshold: options.threshold,
      passed: rank >= options.threshold
    };
  }
  const valuesToRank = getAllValuesToRank(item, options.accessors);
  const rankingInfo = {
    rankedValue: item,
    rank: rankings.NO_MATCH,
    accessorIndex: -1,
    accessorThreshold: options.threshold,
    passed: false
  };
  for (let i2 = 0; i2 < valuesToRank.length; i2++) {
    const rankValue = valuesToRank[i2];
    let newRank = getMatchRanking(rankValue.itemValue, value, options);
    const {
      minRanking,
      maxRanking,
      threshold = options.threshold
    } = rankValue.attributes;
    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }
    newRank = Math.min(newRank, maxRanking);
    if (newRank >= threshold && newRank > rankingInfo.rank) {
      rankingInfo.rank = newRank;
      rankingInfo.passed = true;
      rankingInfo.accessorIndex = i2;
      rankingInfo.accessorThreshold = threshold;
      rankingInfo.rankedValue = rankValue.itemValue;
    }
  }
  return rankingInfo;
}
function getMatchRanking(testString, stringToRank, options) {
  testString = prepareValueForComparison(testString, options);
  stringToRank = prepareValueForComparison(stringToRank, options);
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }
  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }
  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();
  if (testString === stringToRank) {
    return rankings.EQUAL;
  }
  if (testString.startsWith(stringToRank)) {
    return rankings.STARTS_WITH;
  }
  if (testString.includes(` ${stringToRank}`)) {
    return rankings.WORD_STARTS_WITH;
  }
  if (testString.includes(stringToRank)) {
    return rankings.CONTAINS;
  } else if (stringToRank.length === 1) {
    return rankings.NO_MATCH;
  }
  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  }
  return getClosenessRanking(testString, stringToRank);
}
function getAcronym(string) {
  let acronym = "";
  const wordsInString = string.split(" ");
  wordsInString.forEach((wordInString) => {
    const splitByHyphenWords = wordInString.split("-");
    splitByHyphenWords.forEach((splitByHyphenWord) => {
      acronym += splitByHyphenWord.substr(0, 1);
    });
  });
  return acronym;
}
function getClosenessRanking(testString, stringToRank) {
  let matchingInOrderCharCount = 0;
  let charNumber = 0;
  function findMatchingCharacter(matchChar, string, index) {
    for (let j = index, J = string.length; j < J; j++) {
      const stringChar = string[j];
      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }
    return -1;
  }
  function getRanking(spread3) {
    const spreadPercentage = 1 / spread3;
    const inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    const ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking;
  }
  const firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }
  charNumber = firstIndex;
  for (let i2 = 1, I = stringToRank.length; i2 < I; i2++) {
    const matchChar = stringToRank[i2];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    const found = charNumber > -1;
    if (!found) {
      return rankings.NO_MATCH;
    }
  }
  const spread2 = charNumber - firstIndex;
  return getRanking(spread2);
}
function prepareValueForComparison(value, _ref) {
  let {
    keepDiacritics
  } = _ref;
  value = `${value}`;
  if (!keepDiacritics) {
    value = removeAccents(value);
  }
  return value;
}
function getItemValues(item, accessor) {
  let accessorFn = accessor;
  if (typeof accessor === "object") {
    accessorFn = accessor.accessor;
  }
  const value = accessorFn(item);
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [String(value)];
}
function getAllValuesToRank(item, accessors) {
  const allValues = [];
  for (let j = 0, J = accessors.length; j < J; j++) {
    const accessor = accessors[j];
    const attributes = getAccessorAttributes(accessor);
    const itemValues = getItemValues(item, accessor);
    for (let i2 = 0, I = itemValues.length; i2 < I; i2++) {
      allValues.push({
        itemValue: itemValues[i2],
        attributes
      });
    }
  }
  return allValues;
}
var defaultKeyAttributes = {
  maxRanking: Infinity,
  minRanking: -Infinity
};
function getAccessorAttributes(accessor) {
  if (typeof accessor === "function") {
    return defaultKeyAttributes;
  }
  return {
    ...defaultKeyAttributes,
    ...accessor
  };
}
var e = { data: "" };
var t = (t2) => "object" == typeof window ? ((t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign((t2 || document.head).appendChild(document.createElement("style")), { innerHTML: " ", id: "_goober" })).firstChild : t2 || e;
var l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g;
var a = /\/\*[^]*?\*\/|  +/g;
var n = /\n+/g;
var o = (e2, t2) => {
  let r2 = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r2 = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r2 + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
};
var c = {};
var s = (e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r2 in e2)
      t2 += r2 + s(e2[r2]);
    return t2;
  }
  return e2;
};
var i = (e2, t2, r2, i2, p2) => {
  let u2 = s(e2), d = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r3 = 11;
    for (; t3 < e3.length; )
      r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r3;
  })(u2));
  if (!c[d]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r3, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); )
        t4[4] ? o2.shift() : t4[3] ? (r3 = t4[3].replace(n, " ").trim(), o2.unshift(o2[0][r3] = o2[0][r3] || {})) : o2[0][t4[1]] = t4[2].replace(n, " ").trim();
      return o2[0];
    })(e2);
    c[d] = o(p2 ? { ["@keyframes " + d]: t3 } : t3, r2 ? "" : "." + d);
  }
  let f = r2 && c.g ? c.g : null;
  return r2 && (c.g = c[d]), ((e3, t3, r3, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
  })(c[d], t2, i2, f), d;
};
var p = (e2, t2, r2) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l2 + (null == n2 ? "" : n2);
}, "");
function u(e2) {
  let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r2.p) : t2), {}) : l2, t(r2.target), r2.g, r2.o, r2.k);
}
u.bind({ g: 1 });
u.bind({ k: 1 });
function r(e2) {
  var t2, f, n2 = "";
  if ("string" == typeof e2 || "number" == typeof e2)
    n2 += e2;
  else if ("object" == typeof e2)
    if (Array.isArray(e2)) {
      var o2 = e2.length;
      for (t2 = 0; t2 < o2; t2++)
        e2[t2] && (f = r(e2[t2])) && (n2 && (n2 += " "), n2 += f);
    } else
      for (f in e2)
        e2[f] && (n2 && (n2 += " "), n2 += f);
  return n2;
}
function clsx() {
  for (var e2, t2, f = 0, n2 = "", o2 = arguments.length; f < o2; f++)
    (e2 = arguments[f]) && (t2 = r(e2)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
function createListTransition(source, options) {
  const initSource = untrack(source);
  const { onChange } = options;
  let prevSet = new Set(options.appear ? void 0 : initSource);
  const exiting = /* @__PURE__ */ new WeakSet();
  const [toRemove, setToRemove] = createSignal([], { equals: false });
  const [isTransitionPending] = useTransition();
  const finishRemoved = (els) => {
    setToRemove((p2) => (p2.push.apply(p2, els), p2));
    for (const el of els)
      exiting.delete(el);
  };
  const handleRemoved = (els, el, i2) => els.splice(i2, 0, el);
  return createMemo(
    (prev) => {
      const elsToRemove = toRemove();
      const sourceList = source();
      sourceList[$TRACK];
      if (untrack(isTransitionPending)) {
        isTransitionPending();
        return prev;
      }
      if (elsToRemove.length) {
        const next = prev.filter((e2) => !elsToRemove.includes(e2));
        elsToRemove.length = 0;
        onChange({ list: next, added: [], removed: [], unchanged: next, finishRemoved });
        return next;
      }
      return untrack(() => {
        const nextSet = new Set(sourceList);
        const next = sourceList.slice();
        const added = [];
        const removed = [];
        const unchanged = [];
        for (const el of sourceList) {
          (prevSet.has(el) ? unchanged : added).push(el);
        }
        let nothingChanged = !added.length;
        for (let i2 = 0; i2 < prev.length; i2++) {
          const el = prev[i2];
          if (!nextSet.has(el)) {
            if (!exiting.has(el)) {
              removed.push(el);
              exiting.add(el);
            }
            handleRemoved(next, el, i2);
          }
          if (nothingChanged && el !== next[i2])
            nothingChanged = false;
        }
        if (!removed.length && nothingChanged)
          return prev;
        onChange({ list: next, added, removed, unchanged, finishRemoved });
        prevSet = nextSet;
        return next;
      });
    },
    options.appear ? [] : initSource.slice()
  );
}
function mergeRefs(...refs) {
  return chain(refs);
}
var defaultElementPredicate = (item) => item instanceof Element;
function getResolvedElements(value, predicate) {
  if (predicate(value))
    return value;
  if (typeof value === "function" && !value.length)
    return getResolvedElements(value(), predicate);
  if (Array.isArray(value)) {
    const results = [];
    for (const item of value) {
      const result = getResolvedElements(item, predicate);
      if (result)
        Array.isArray(result) ? results.push.apply(results, result) : results.push(result);
    }
    return results.length ? results : null;
  }
  return null;
}
function resolveElements(fn, predicate = defaultElementPredicate, serverPredicate = defaultElementPredicate) {
  const children2 = createMemo(fn);
  const memo = createMemo(
    () => getResolvedElements(children2(), predicate)
  );
  memo.toArray = () => {
    const value = memo();
    return Array.isArray(value) ? value : value ? [value] : [];
  };
  return memo;
}
function createClassnames(props) {
  return createMemo(() => {
    const name = props.name || "s";
    return {
      enterActive: (props.enterActiveClass || name + "-enter-active").split(" "),
      enter: (props.enterClass || name + "-enter").split(" "),
      enterTo: (props.enterToClass || name + "-enter-to").split(" "),
      exitActive: (props.exitActiveClass || name + "-exit-active").split(" "),
      exit: (props.exitClass || name + "-exit").split(" "),
      exitTo: (props.exitToClass || name + "-exit-to").split(" "),
      move: (props.moveClass || name + "-move").split(" ")
    };
  });
}
function nextFrame(fn) {
  requestAnimationFrame(() => requestAnimationFrame(fn));
}
function enterTransition(classes, events, el, done) {
  const { onBeforeEnter, onEnter, onAfterEnter } = events;
  onBeforeEnter == null ? void 0 : onBeforeEnter(el);
  el.classList.add(...classes.enter);
  el.classList.add(...classes.enterActive);
  queueMicrotask(() => {
    if (!el.parentNode)
      return done == null ? void 0 : done();
    onEnter == null ? void 0 : onEnter(el, () => endTransition());
  });
  nextFrame(() => {
    el.classList.remove(...classes.enter);
    el.classList.add(...classes.enterTo);
    if (!onEnter || onEnter.length < 2) {
      el.addEventListener("transitionend", endTransition);
      el.addEventListener("animationend", endTransition);
    }
  });
  function endTransition(e2) {
    if (!e2 || e2.target === el) {
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      el.classList.remove(...classes.enterActive);
      el.classList.remove(...classes.enterTo);
      onAfterEnter == null ? void 0 : onAfterEnter(el);
    }
  }
}
function exitTransition(classes, events, el, done) {
  const { onBeforeExit, onExit, onAfterExit } = events;
  if (!el.parentNode)
    return done == null ? void 0 : done();
  onBeforeExit == null ? void 0 : onBeforeExit(el);
  el.classList.add(...classes.exit);
  el.classList.add(...classes.exitActive);
  onExit == null ? void 0 : onExit(el, () => endTransition());
  nextFrame(() => {
    el.classList.remove(...classes.exit);
    el.classList.add(...classes.exitTo);
    if (!onExit || onExit.length < 2) {
      el.addEventListener("transitionend", endTransition);
      el.addEventListener("animationend", endTransition);
    }
  });
  function endTransition(e2) {
    if (!e2 || e2.target === el) {
      done == null ? void 0 : done();
      el.removeEventListener("transitionend", endTransition);
      el.removeEventListener("animationend", endTransition);
      el.classList.remove(...classes.exitActive);
      el.classList.remove(...classes.exitTo);
      onAfterExit == null ? void 0 : onAfterExit(el);
    }
  }
}
var TransitionGroup = (props) => {
  const classnames = createClassnames(props);
  return createListTransition(resolveElements(() => props.children).toArray, {
    appear: props.appear,
    onChange({ added, removed, finishRemoved, list }) {
      const classes = classnames();
      for (const el of added) {
        enterTransition(classes, props, el);
      }
      const toMove = [];
      for (const el of list) {
        if (el.isConnected && (el instanceof HTMLElement || el instanceof SVGElement)) {
          toMove.push({ el, rect: el.getBoundingClientRect() });
        }
      }
      queueMicrotask(() => {
        const moved = [];
        for (const { el, rect } of toMove) {
          if (el.isConnected) {
            const newRect = el.getBoundingClientRect(), dX = rect.left - newRect.left, dY = rect.top - newRect.top;
            if (dX || dY) {
              el.style.transform = `translate(${dX}px, ${dY}px)`;
              el.style.transitionDuration = "0s";
              moved.push(el);
            }
          }
        }
        document.body.offsetHeight;
        for (const el of moved) {
          let endTransition2 = function(e2) {
            if (e2.target === el || /transform$/.test(e2.propertyName)) {
              el.removeEventListener("transitionend", endTransition2);
              el.classList.remove(...classes.move);
            }
          };
          el.classList.add(...classes.move);
          el.style.transform = el.style.transitionDuration = "";
          el.addEventListener("transitionend", endTransition2);
        }
      });
      for (const el of removed) {
        exitTransition(classes, props, el, () => finishRemoved([el]));
      }
    }
  });
};
var FALLBACK = Symbol("fallback");
function dispose(list) {
  for (const o2 of list)
    o2.dispose();
}
function keyArray(items, keyFn, mapFn, options = {}) {
  const prev = /* @__PURE__ */ new Map();
  onCleanup(() => dispose(prev.values()));
  return () => {
    const list = items() || [];
    list[$TRACK];
    return untrack(() => {
      var _a, _b;
      if (!list.length) {
        dispose(prev.values());
        prev.clear();
        if (!options.fallback)
          return [];
        const fb2 = createRoot((dispose2) => {
          prev.set(FALLBACK, { dispose: dispose2 });
          return options.fallback();
        });
        return [fb2];
      }
      const result = new Array(list.length);
      const fb = prev.get(FALLBACK);
      if (!prev.size || fb) {
        fb == null ? void 0 : fb.dispose();
        prev.delete(FALLBACK);
        for (let i2 = 0; i2 < list.length; i2++) {
          const item = list[i2];
          const key = keyFn(item, i2);
          addNewItem(result, item, i2, key);
        }
        return result;
      }
      const prevKeys = new Set(prev.keys());
      for (let i2 = 0; i2 < list.length; i2++) {
        const item = list[i2];
        const key = keyFn(item, i2);
        prevKeys.delete(key);
        const lookup = prev.get(key);
        if (lookup) {
          result[i2] = lookup.mapped;
          (_a = lookup.setIndex) == null ? void 0 : _a.call(lookup, i2);
          lookup.setItem(() => item);
        } else
          addNewItem(result, item, i2, key);
      }
      for (const key of prevKeys) {
        (_b = prev.get(key)) == null ? void 0 : _b.dispose();
        prev.delete(key);
      }
      return result;
    });
  };
  function addNewItem(list, item, i2, key) {
    createRoot((dispose2) => {
      const [getItem, setItem] = createSignal(item);
      const save = { setItem, dispose: dispose2 };
      if (mapFn.length > 1) {
        const [index, setIndex] = createSignal(i2);
        save.setIndex = setIndex;
        save.mapped = mapFn(getItem, index);
      } else
        save.mapped = mapFn(getItem);
      prev.set(key, save);
      list[i2] = save.mapped;
    });
  }
}
function Key(props) {
  const { by } = props;
  return createMemo(
    keyArray(
      () => props.each,
      typeof by === "function" ? by : (v) => v[by],
      props.children,
      "fallback" in props ? { fallback: () => props.fallback } : void 0
    )
  );
}
function makeEventListener(target, type, handler, options) {
  target.addEventListener(type, handler, options);
  return tryOnCleanup(target.removeEventListener.bind(target, type, handler, options));
}
function createEventListener(targets, type, handler, options) {
  const attachListeners = () => {
    asArray(access(targets)).forEach((el) => {
      if (el)
        asArray(access(type)).forEach((type2) => makeEventListener(el, type2, handler, options));
    });
  };
  if (typeof targets === "function")
    createEffect(attachListeners);
  else
    createRenderEffect(attachListeners);
}
function makeResizeObserver(callback, options) {
  const observer = new ResizeObserver(callback);
  onCleanup(observer.disconnect.bind(observer));
  return {
    observe: (ref) => observer.observe(ref, options),
    unobserve: observer.unobserve.bind(observer)
  };
}
function createResizeObserver(targets, onResize, options) {
  const previousMap = /* @__PURE__ */ new WeakMap(), { observe, unobserve } = makeResizeObserver((entries2) => {
    for (const entry of entries2) {
      const { contentRect, target } = entry, width = Math.round(contentRect.width), height = Math.round(contentRect.height), previous = previousMap.get(target);
      if (!previous || previous.width !== width || previous.height !== height) {
        onResize(contentRect, target, entry);
        previousMap.set(target, { width, height });
      }
    }
  }, options);
  createEffect((prev) => {
    const refs = filterNonNullable(asArray(access(targets)));
    handleDiffArray(refs, prev, observe, unobserve);
    return refs;
  }, []);
}
var extractCSSregex = /((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g;
function stringStyleToObject(style) {
  const object = {};
  let match;
  while (match = extractCSSregex.exec(style)) {
    object[match[1]] = match[2];
  }
  return object;
}
function combineStyle(a2, b2) {
  if (typeof a2 === "string") {
    if (typeof b2 === "string")
      return `${a2};${b2}`;
    a2 = stringStyleToObject(a2);
  } else if (typeof b2 === "string") {
    b2 = stringStyleToObject(b2);
  }
  return { ...a2, ...b2 };
}
function addItemToArray(array, item, index = -1) {
  if (!(index in array)) {
    return [...array, item];
  }
  return [...array.slice(0, index), item, ...array.slice(index)];
}
function removeItemFromArray(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function isNumber(value) {
  return typeof value === "number";
}
function isString(value) {
  return Object.prototype.toString.call(value) === "[object String]";
}
function isFunction(value) {
  return typeof value === "function";
}
function createGenerateId(baseId) {
  return (suffix) => `${baseId()}-${suffix}`;
}
function contains(parent, child) {
  if (!parent) {
    return false;
  }
  return parent === child || parent.contains(child);
}
function getActiveElement(node, activeDescendant = false) {
  const { activeElement } = getDocument(node);
  if (!(activeElement == null ? void 0 : activeElement.nodeName)) {
    return null;
  }
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(activeElement.contentDocument.body, activeDescendant);
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = getDocument(activeElement).getElementById(id);
      if (element) {
        return element;
      }
    }
  }
  return activeElement;
}
function getWindow(node) {
  return getDocument(node).defaultView || window;
}
function getDocument(node) {
  return node ? node.ownerDocument || node : document;
}
function isFrame(element) {
  return element.tagName === "IFRAME";
}
var EventKey = /* @__PURE__ */ ((EventKey2) => {
  EventKey2["Escape"] = "Escape";
  EventKey2["Enter"] = "Enter";
  EventKey2["Tab"] = "Tab";
  EventKey2["Space"] = " ";
  EventKey2["ArrowDown"] = "ArrowDown";
  EventKey2["ArrowLeft"] = "ArrowLeft";
  EventKey2["ArrowRight"] = "ArrowRight";
  EventKey2["ArrowUp"] = "ArrowUp";
  EventKey2["End"] = "End";
  EventKey2["Home"] = "Home";
  EventKey2["PageDown"] = "PageDown";
  EventKey2["PageUp"] = "PageUp";
  return EventKey2;
})(EventKey || {});
function testPlatform(re) {
  var _a;
  return typeof window !== "undefined" && window.navigator != null ? (
    // @ts-ignore
    re.test(((_a = window.navigator["userAgentData"]) == null ? void 0 : _a.platform) || window.navigator.platform)
  ) : false;
}
function isMac() {
  return testPlatform(/^Mac/i);
}
function isIPhone() {
  return testPlatform(/^iPhone/i);
}
function isIPad() {
  return testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAppleDevice() {
  return isMac() || isIOS();
}
function callHandler(event, handler) {
  if (handler) {
    if (isFunction(handler)) {
      handler(event);
    } else {
      handler[0](handler[1], event);
    }
  }
  return event == null ? void 0 : event.defaultPrevented;
}
function composeEventHandlers(handlers) {
  return (event) => {
    for (const handler of handlers) {
      callHandler(event, handler);
    }
  };
}
function isCtrlKey(e2) {
  if (isMac()) {
    return e2.metaKey && !e2.ctrlKey;
  }
  return e2.ctrlKey && !e2.metaKey;
}
function focusWithoutScrolling(element) {
  if (!element) {
    return;
  }
  if (supportsPreventScroll()) {
    element.focus({ preventScroll: true });
  } else {
    const scrollableElements = getScrollableElements(element);
    element.focus();
    restoreScrollPosition(scrollableElements);
  }
}
var supportsPreventScrollCached = null;
function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;
    try {
      const focusElem = document.createElement("div");
      focusElem.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        }
      });
    } catch (e2) {
    }
  }
  return supportsPreventScrollCached;
}
function getScrollableElements(element) {
  let parent = element.parentNode;
  const scrollableElements = [];
  const rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft
      });
    }
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft
    });
  }
  return scrollableElements;
}
function restoreScrollPosition(scrollableElements) {
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}
var focusableElements = [
  "input:not([type='hidden']):not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "a[href]",
  "area[href]",
  "[tabindex]",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  "[contenteditable]:not([contenteditable='false'])"
];
var tabbableElements = [...focusableElements, '[tabindex]:not([tabindex="-1"]):not([disabled])'];
var FOCUSABLE_ELEMENT_SELECTOR = focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
var TABBABLE_ELEMENT_SELECTOR = tabbableElements.join(
  ':not([hidden]):not([tabindex="-1"]),'
);
function getAllTabbableIn(container, includeContainer) {
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENT_SELECTOR));
  const tabbableElements2 = elements.filter(isTabbable);
  if (includeContainer && isTabbable(container)) {
    tabbableElements2.unshift(container);
  }
  tabbableElements2.forEach((element, i2) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(frameBody, false);
      tabbableElements2.splice(i2, 1, ...allFrameTabbable);
    }
  });
  return tabbableElements2;
}
function isTabbable(element) {
  return isFocusable(element) && !hasNegativeTabIndex(element);
}
function isFocusable(element) {
  return element.matches(FOCUSABLE_ELEMENT_SELECTOR) && isElementVisible(element);
}
function hasNegativeTabIndex(element) {
  const tabIndex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabIndex < 0;
}
function isElementVisible(element, childElement) {
  return element.nodeName !== "#comment" && isStyleVisible(element) && isAttributeVisible(element, childElement) && (!element.parentElement || isElementVisible(element.parentElement, element));
}
function isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
    return false;
  }
  const { display, visibility } = element.style;
  let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
  if (isVisible) {
    if (!element.ownerDocument.defaultView) {
      return isVisible;
    }
    const { getComputedStyle: getComputedStyle3 } = element.ownerDocument.defaultView;
    const { display: computedDisplay, visibility: computedVisibility } = getComputedStyle3(element);
    isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
  }
  return isVisible;
}
function isAttributeVisible(element, childElement) {
  return !element.hasAttribute("hidden") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function getFocusableTreeWalker(root, opts, scope) {
  const selector = (opts == null ? void 0 : opts.tabbable) ? TABBABLE_ELEMENT_SELECTOR : FOCUSABLE_ELEMENT_SELECTOR;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      var _a;
      if ((_a = opts == null ? void 0 : opts.from) == null ? void 0 : _a.contains(node)) {
        return NodeFilter.FILTER_REJECT;
      }
      if (node.matches(selector) && isElementVisible(node) && true && (!(opts == null ? void 0 : opts.accept) || opts.accept(node))) {
        return NodeFilter.FILTER_ACCEPT;
      }
      return NodeFilter.FILTER_SKIP;
    }
  });
  if (opts == null ? void 0 : opts.from) {
    walker.currentNode = opts.from;
  }
  return walker;
}
function getScrollParent(node) {
  while (node && !isScrollable(node)) {
    node = node.parentElement;
  }
  return node || document.scrollingElement || document.documentElement;
}
function isScrollable(node) {
  const style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}
function noop3() {
  return;
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let inside = false;
  const length = polygon.length;
  for (let l2 = length, i2 = 0, j = l2 - 1; i2 < l2; j = i2++) {
    const [xi, yi] = polygon[i2];
    const [xj, yj] = polygon[j];
    const [, vy] = polygon[j === 0 ? l2 - 1 : j - 1] || [0, 0];
    const where = (yi - yj) * (x - xi) - (xi - xj) * (y - yi);
    if (yj < yi) {
      if (y >= yj && y < yi) {
        if (where === 0)
          return true;
        if (where > 0) {
          if (y === yj) {
            if (y > vy) {
              inside = !inside;
            }
          } else {
            inside = !inside;
          }
        }
      }
    } else if (yi < yj) {
      if (y > yi && y <= yj) {
        if (where === 0)
          return true;
        if (where < 0) {
          if (y === yj) {
            if (y < vy) {
              inside = !inside;
            }
          } else {
            inside = !inside;
          }
        }
      }
    } else if (y == yi && (x >= xj && x <= xi || x >= xi && x <= xj)) {
      return true;
    }
  }
  return inside;
}
function mergeDefaultProps(defaultProps, props) {
  return mergeProps(defaultProps, props);
}
var transitionsByElement = /* @__PURE__ */ new Map();
var transitionCallbacks = /* @__PURE__ */ new Set();
function setupGlobalEvents() {
  if (typeof window === "undefined") {
    return;
  }
  const onTransitionStart = (e2) => {
    if (!e2.target) {
      return;
    }
    let transitions = transitionsByElement.get(e2.target);
    if (!transitions) {
      transitions = /* @__PURE__ */ new Set();
      transitionsByElement.set(e2.target, transitions);
      e2.target.addEventListener("transitioncancel", onTransitionEnd);
    }
    transitions.add(e2.propertyName);
  };
  const onTransitionEnd = (e2) => {
    if (!e2.target) {
      return;
    }
    const properties = transitionsByElement.get(e2.target);
    if (!properties) {
      return;
    }
    properties.delete(e2.propertyName);
    if (properties.size === 0) {
      e2.target.removeEventListener("transitioncancel", onTransitionEnd);
      transitionsByElement.delete(e2.target);
    }
    if (transitionsByElement.size === 0) {
      for (const cb of transitionCallbacks) {
        cb();
      }
      transitionCallbacks.clear();
    }
  };
  document.body.addEventListener("transitionrun", onTransitionStart);
  document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") {
  if (document.readyState !== "loading") {
    setupGlobalEvents();
  } else {
    document.addEventListener("DOMContentLoaded", setupGlobalEvents);
  }
}
function scrollIntoView(scrollView, element) {
  const offsetX = relativeOffset(scrollView, element, "left");
  const offsetY = relativeOffset(scrollView, element, "top");
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  const maxX = x + scrollView.offsetWidth;
  const maxY = y + scrollView.offsetHeight;
  if (offsetX <= x) {
    x = offsetX;
  } else if (offsetX + width > maxX) {
    x += offsetX + width - maxX;
  }
  if (offsetY <= y) {
    y = offsetY;
  } else if (offsetY + height > maxY) {
    y += offsetY + height - maxY;
  }
  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
function relativeOffset(ancestor, child, axis) {
  const prop = axis === "left" ? "offsetLeft" : "offsetTop";
  let sum = 0;
  while (child.offsetParent) {
    sum += child[prop];
    if (child.offsetParent === ancestor) {
      break;
    } else if (child.offsetParent.contains(ancestor)) {
      sum -= ancestor[prop];
      break;
    }
    child = child.offsetParent;
  }
  return sum;
}
function scrollIntoViewport(targetElement, opts) {
  var _a, _b;
  if (document.contains(targetElement)) {
    const root = document.scrollingElement || document.documentElement;
    const isScrollPrevented = window.getComputedStyle(root).overflow === "hidden";
    if (!isScrollPrevented) {
      const { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
      (_a = targetElement == null ? void 0 : targetElement.scrollIntoView) == null ? void 0 : _a.call(targetElement, { block: "nearest" });
      const { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
      if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
        (_b = targetElement.scrollIntoView) == null ? void 0 : _b.call(targetElement, { block: "nearest" });
      }
    } else {
      let scrollParent = getScrollParent(targetElement);
      while (targetElement && scrollParent && targetElement !== root && scrollParent !== root) {
        scrollIntoView(scrollParent, targetElement);
        targetElement = scrollParent;
        scrollParent = getScrollParent(targetElement);
      }
    }
  }
}
var visuallyHiddenStyles = {
  border: "0",
  clip: "rect(0 0 0 0)",
  "clip-path": "inset(50%)",
  height: "1px",
  margin: "0 -1px -1px 0",
  overflow: "hidden",
  padding: "0",
  position: "absolute",
  width: "1px",
  "white-space": "nowrap"
};
function createRegisterId(setter) {
  return (id) => {
    setter(id);
    return () => setter(void 0);
  };
}
function createTagName(ref, fallback) {
  const [tagName, setTagName] = createSignal(stringOrUndefined(fallback == null ? void 0 : fallback()));
  createEffect(() => {
    var _a;
    setTagName(((_a = ref()) == null ? void 0 : _a.tagName.toLowerCase()) || stringOrUndefined(fallback == null ? void 0 : fallback()));
  });
  return tagName;
}
function stringOrUndefined(value) {
  return isString(value) ? value : void 0;
}
function Polymorphic(props) {
  const [local, others] = splitProps(props, ["as"]);
  if (!local.as) {
    throw new Error("[kobalte]: Polymorphic is missing the required `as` prop.");
  }
  return (
    // @ts-ignore: Props are valid but not worth calculating
    createComponent(Dynamic, mergeProps(others, {
      get component() {
        return local.as;
      }
    }))
  );
}
var FORM_CONTROL_PROP_NAMES = ["id", "name", "validationState", "required", "disabled", "readOnly"];
function createFormControl(props) {
  const defaultId = `form-control-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [labelId, setLabelId] = createSignal();
  const [fieldId, setFieldId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [errorMessageId, setErrorMessageId] = createSignal();
  const getAriaLabelledBy = (fieldId2, fieldAriaLabel, fieldAriaLabelledBy) => {
    const hasAriaLabelledBy = fieldAriaLabelledBy != null || labelId() != null;
    return [
      fieldAriaLabelledBy,
      labelId(),
      // If there is both an aria-label and aria-labelledby, add the field itself has an aria-labelledby
      hasAriaLabelledBy && fieldAriaLabel != null ? fieldId2 : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const getAriaDescribedBy = (fieldAriaDescribedBy) => {
    return [
      descriptionId(),
      // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA.
      // See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
      errorMessageId(),
      fieldAriaDescribedBy
    ].filter(Boolean).join(" ") || void 0;
  };
  const dataset = createMemo(() => ({
    "data-valid": access(mergedProps.validationState) === "valid" ? "" : void 0,
    "data-invalid": access(mergedProps.validationState) === "invalid" ? "" : void 0,
    "data-required": access(mergedProps.required) ? "" : void 0,
    "data-disabled": access(mergedProps.disabled) ? "" : void 0,
    "data-readonly": access(mergedProps.readOnly) ? "" : void 0
  }));
  const formControlContext = {
    name: () => access(mergedProps.name) ?? access(mergedProps.id),
    dataset,
    validationState: () => access(mergedProps.validationState),
    isRequired: () => access(mergedProps.required),
    isDisabled: () => access(mergedProps.disabled),
    isReadOnly: () => access(mergedProps.readOnly),
    labelId,
    fieldId,
    descriptionId,
    errorMessageId,
    getAriaLabelledBy,
    getAriaDescribedBy,
    generateId: createGenerateId(() => access(mergedProps.id)),
    registerLabel: createRegisterId(setLabelId),
    registerField: createRegisterId(setFieldId),
    registerDescription: createRegisterId(setDescriptionId),
    registerErrorMessage: createRegisterId(setErrorMessageId)
  };
  return {
    formControlContext
  };
}
var FormControlContext = createContext();
function useFormControlContext() {
  const context = useContext(FormControlContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useFormControlContext` must be used within a `FormControlContext.Provider` component");
  }
  return context;
}
function FormControlDescription(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function FormControlErrorMessage(props) {
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("error-message")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  const isInvalid = () => context.validationState() === "invalid";
  createEffect(() => {
    if (!isInvalid()) {
      return;
    }
    onCleanup(context.registerErrorMessage(others.id));
  });
  return createComponent(Show, {
    get when() {
      return local.forceMount || isInvalid();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
function FormControlLabel(props) {
  let ref;
  const context = useFormControlContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref"]);
  const tagName = createTagName(() => ref, () => "label");
  createEffect(() => onCleanup(context.registerLabel(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["for"]() {
      return createMemo(() => tagName() === "label")() ? context.fieldId() : void 0;
    }
  }, () => context.dataset(), others));
}
function createFormResetListener(element, handler) {
  createEffect(
    on(element, (element2) => {
      if (element2 == null) {
        return;
      }
      const form = getClosestForm(element2);
      if (form == null) {
        return;
      }
      form.addEventListener("reset", handler, { passive: true });
      onCleanup(() => {
        form.removeEventListener("reset", handler);
      });
    })
  );
}
function getClosestForm(element) {
  return isFormElement(element) ? element.form : element.closest("form");
}
function isFormElement(element) {
  return element.matches("textarea, input, select, button");
}
function createControllableSignal(props) {
  var _a;
  const [_value, _setValue] = createSignal((_a = props.defaultValue) == null ? void 0 : _a.call(props));
  const isControlled = createMemo(() => {
    var _a2;
    return ((_a2 = props.value) == null ? void 0 : _a2.call(props)) !== void 0;
  });
  const value = createMemo(() => {
    var _a2;
    return isControlled() ? (_a2 = props.value) == null ? void 0 : _a2.call(props) : _value();
  });
  const setValue = (next) => {
    untrack(() => {
      var _a2;
      const nextValue = accessWith(next, value());
      if (!Object.is(nextValue, value())) {
        if (!isControlled()) {
          _setValue(nextValue);
        }
        (_a2 = props.onChange) == null ? void 0 : _a2.call(props, nextValue);
      }
      return nextValue;
    });
  };
  return [value, setValue];
}
function createControllableBooleanSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? false;
  return [value, setValue];
}
function createControllableArraySignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? [];
  return [value, setValue];
}
function createToggleState(props = {}) {
  const [isSelected, _setIsSelected] = createControllableBooleanSignal({
    value: () => access(props.isSelected),
    defaultValue: () => !!access(props.defaultIsSelected),
    onChange: (value) => {
      var _a;
      return (_a = props.onSelectedChange) == null ? void 0 : _a.call(props, value);
    }
  });
  const setIsSelected = (value) => {
    if (!access(props.isReadOnly) && !access(props.isDisabled)) {
      _setIsSelected(value);
    }
  };
  const toggle = () => {
    if (!access(props.isReadOnly) && !access(props.isDisabled)) {
      _setIsSelected(!isSelected());
    }
  };
  return {
    isSelected,
    setIsSelected,
    toggle
  };
}
var __defProp2 = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
var DomCollectionContext = createContext();
function useOptionalDomCollectionContext() {
  return useContext(DomCollectionContext);
}
function useDomCollectionContext() {
  const context = useOptionalDomCollectionContext();
  if (context === void 0) {
    throw new Error(
      "[kobalte]: `useDomCollectionContext` must be used within a `DomCollectionProvider` component"
    );
  }
  return context;
}
function isElementPreceding(a2, b2) {
  return Boolean(
    b2.compareDocumentPosition(a2) & Node.DOCUMENT_POSITION_PRECEDING
  );
}
function findDOMIndex(items, item) {
  var _a;
  const itemEl = item.ref();
  if (!itemEl) {
    return -1;
  }
  let length = items.length;
  if (!length) {
    return -1;
  }
  while (length--) {
    const currentItemEl = (_a = items[length]) == null ? void 0 : _a.ref();
    if (!currentItemEl) {
      continue;
    }
    if (isElementPreceding(currentItemEl, itemEl)) {
      return length + 1;
    }
  }
  return 0;
}
function sortBasedOnDOMPosition(items) {
  const pairs = items.map((item, index) => [index, item]);
  let isOrderDifferent = false;
  pairs.sort(([indexA, a2], [indexB, b2]) => {
    const elementA = a2.ref();
    const elementB = b2.ref();
    if (elementA === elementB) {
      return 0;
    }
    if (!elementA || !elementB) {
      return 0;
    }
    if (isElementPreceding(elementA, elementB)) {
      if (indexA > indexB) {
        isOrderDifferent = true;
      }
      return -1;
    }
    if (indexA < indexB) {
      isOrderDifferent = true;
    }
    return 1;
  });
  if (isOrderDifferent) {
    return pairs.map(([_, item]) => item);
  }
  return items;
}
function setItemsBasedOnDOMPosition(items, setItems) {
  const sortedItems = sortBasedOnDOMPosition(items);
  if (items !== sortedItems) {
    setItems(sortedItems);
  }
}
function getCommonParent(items) {
  var _a, _b;
  const firstItem = items[0];
  const lastItemEl = (_a = items[items.length - 1]) == null ? void 0 : _a.ref();
  let parentEl = (_b = firstItem == null ? void 0 : firstItem.ref()) == null ? void 0 : _b.parentElement;
  while (parentEl) {
    if (lastItemEl && parentEl.contains(lastItemEl)) {
      return parentEl;
    }
    parentEl = parentEl.parentElement;
  }
  return getDocument(parentEl).body;
}
function createTimeoutObserver(items, setItems) {
  createEffect(() => {
    const timeout = setTimeout(() => {
      setItemsBasedOnDOMPosition(items(), setItems);
    });
    onCleanup(() => clearTimeout(timeout));
  });
}
function createSortBasedOnDOMPosition(items, setItems) {
  if (typeof IntersectionObserver !== "function") {
    createTimeoutObserver(items, setItems);
    return;
  }
  let previousItems = [];
  createEffect(() => {
    const callback = () => {
      const hasPreviousItems = !!previousItems.length;
      previousItems = items();
      if (!hasPreviousItems) {
        return;
      }
      setItemsBasedOnDOMPosition(items(), setItems);
    };
    const root = getCommonParent(items());
    const observer = new IntersectionObserver(callback, { root });
    for (const item of items()) {
      const itemEl = item.ref();
      if (itemEl) {
        observer.observe(itemEl);
      }
    }
    onCleanup(() => observer.disconnect());
  });
}
function createDomCollection(props = {}) {
  const [items, setItems] = createControllableArraySignal({
    value: () => access(props.items),
    onChange: (value) => {
      var _a;
      return (_a = props.onItemsChange) == null ? void 0 : _a.call(props, value);
    }
  });
  createSortBasedOnDOMPosition(items, setItems);
  const registerItem = (item) => {
    setItems((prevItems) => {
      const index = findDOMIndex(prevItems, item);
      return addItemToArray(prevItems, item, index);
    });
    return () => {
      setItems((prevItems) => {
        const nextItems = prevItems.filter(
          (prevItem) => prevItem.ref() !== item.ref()
        );
        if (prevItems.length === nextItems.length) {
          return prevItems;
        }
        return nextItems;
      });
    };
  };
  const DomCollectionProvider = (props2) => {
    return createComponent(DomCollectionContext.Provider, {
      value: { registerItem },
      get children() {
        return props2.children;
      }
    });
  };
  return { DomCollectionProvider };
}
function createDomCollectionItem(props) {
  const context = useDomCollectionContext();
  const mergedProps = mergeDefaultProps({ shouldRegisterItem: true }, props);
  createEffect(() => {
    if (!mergedProps.shouldRegisterItem) {
      return;
    }
    const unregister = context.registerItem(mergedProps.getItem());
    onCleanup(unregister);
  });
}
function buildNodes(params) {
  let index = params.startIndex ?? 0;
  const level = params.startLevel ?? 0;
  const nodes = [];
  const getKey = (data) => {
    if (data == null) {
      return "";
    }
    const _getKey = params.getKey ?? "key";
    const dataKey = isString(_getKey) ? data[_getKey] : _getKey(data);
    return dataKey != null ? String(dataKey) : "";
  };
  const getTextValue = (data) => {
    if (data == null) {
      return "";
    }
    const _getTextValue = params.getTextValue ?? "textValue";
    const dataTextValue = isString(_getTextValue) ? data[_getTextValue] : _getTextValue(data);
    return dataTextValue != null ? String(dataTextValue) : "";
  };
  const getDisabled = (data) => {
    if (data == null) {
      return false;
    }
    const _getDisabled = params.getDisabled ?? "disabled";
    return (isString(_getDisabled) ? data[_getDisabled] : _getDisabled(data)) ?? false;
  };
  const getSectionChildren = (data) => {
    var _a;
    if (data == null) {
      return void 0;
    }
    if (isString(params.getSectionChildren)) {
      return data[params.getSectionChildren];
    }
    return (_a = params.getSectionChildren) == null ? void 0 : _a.call(params, data);
  };
  for (const data of params.dataSource) {
    if (isString(data) || isNumber(data)) {
      nodes.push({
        type: "item",
        rawValue: data,
        key: String(data),
        textValue: String(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
      continue;
    }
    if (getSectionChildren(data) != null) {
      nodes.push({
        type: "section",
        rawValue: data,
        key: "",
        // not applicable here
        textValue: "",
        // not applicable here
        disabled: false,
        // not applicable here
        level,
        index
      });
      index++;
      const sectionChildren = getSectionChildren(data) ?? [];
      if (sectionChildren.length > 0) {
        const childNodes = buildNodes({
          dataSource: sectionChildren,
          getKey: params.getKey,
          getTextValue: params.getTextValue,
          getDisabled: params.getDisabled,
          getSectionChildren: params.getSectionChildren,
          startIndex: index,
          startLevel: level + 1
        });
        nodes.push(...childNodes);
        index += childNodes.length;
      }
    } else {
      nodes.push({
        type: "item",
        rawValue: data,
        key: getKey(data),
        textValue: getTextValue(data),
        disabled: getDisabled(data),
        level,
        index
      });
      index++;
    }
  }
  return nodes;
}
function createCollection(props, deps = []) {
  return createMemo(() => {
    const nodes = buildNodes({
      dataSource: access(props.dataSource),
      getKey: access(props.getKey),
      getTextValue: access(props.getTextValue),
      getDisabled: access(props.getDisabled),
      getSectionChildren: access(props.getSectionChildren)
    });
    for (let i2 = 0; i2 < deps.length; i2++)
      deps[i2]();
    return props.factory(nodes);
  });
}
var RTL_SCRIPTS = /* @__PURE__ */ new Set([
  "Avst",
  "Arab",
  "Armi",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr"
]);
var RTL_LANGS = /* @__PURE__ */ new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi"
]);
function isRTL(locale) {
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script ?? "";
    return RTL_SCRIPTS.has(script);
  }
  const lang = locale.split("-")[0];
  return RTL_LANGS.has(lang);
}
function getReadingDirection(locale) {
  return isRTL(locale) ? "rtl" : "ltr";
}
function getDefaultLocale() {
  let locale = typeof navigator !== "undefined" && // @ts-ignore
  (navigator.language || navigator.userLanguage) || "en-US";
  return {
    locale,
    direction: getReadingDirection(locale)
  };
}
var currentLocale = getDefaultLocale();
var listeners = /* @__PURE__ */ new Set();
function updateLocale() {
  currentLocale = getDefaultLocale();
  for (const listener of listeners) {
    listener(currentLocale);
  }
}
function createDefaultLocale() {
  const [defaultClientLocale, setDefaultClientLocale] = createSignal(currentLocale);
  const defaultLocale = createMemo(
    () => defaultClientLocale()
  );
  onMount(() => {
    if (listeners.size === 0) {
      window.addEventListener("languagechange", updateLocale);
    }
    listeners.add(setDefaultClientLocale);
    onCleanup(() => {
      listeners.delete(setDefaultClientLocale);
      if (listeners.size === 0) {
        window.removeEventListener("languagechange", updateLocale);
      }
    });
  });
  return {
    locale: () => defaultLocale().locale,
    direction: () => defaultLocale().direction
  };
}
var I18nContext = createContext();
function useLocale() {
  const defaultLocale = createDefaultLocale();
  const context = useContext(I18nContext);
  return context || defaultLocale;
}
var cache = /* @__PURE__ */ new Map();
function createCollator(options) {
  const { locale } = useLocale();
  const cacheKey = createMemo(() => {
    return locale() + Object.entries(options).sort((a2, b2) => a2[0] < b2[0] ? -1 : 1).join();
  });
  return createMemo(() => {
    const key = cacheKey();
    let collator;
    if (cache.has(key)) {
      collator = cache.get(key);
    }
    if (!collator) {
      collator = new Intl.Collator(locale(), options);
      cache.set(key, collator);
    }
    return collator;
  });
}
var Selection = class _Selection extends Set {
  constructor(keys2, anchorKey, currentKey) {
    super(keys2);
    __publicField(this, "anchorKey");
    __publicField(this, "currentKey");
    if (keys2 instanceof _Selection) {
      this.anchorKey = anchorKey || keys2.anchorKey;
      this.currentKey = currentKey || keys2.currentKey;
    } else {
      this.anchorKey = anchorKey;
      this.currentKey = currentKey;
    }
  }
};
function createControllableSelectionSignal(props) {
  const [_value, setValue] = createControllableSignal(props);
  const value = () => _value() ?? new Selection();
  return [value, setValue];
}
function isNonContiguousSelectionModifier(e2) {
  return isAppleDevice() ? e2.altKey : e2.ctrlKey;
}
function isCtrlKeyPressed(e2) {
  if (isMac()) {
    return e2.metaKey;
  }
  return e2.ctrlKey;
}
function convertSelection(selection) {
  return new Selection(selection);
}
function isSameSelection(setA, setB) {
  if (setA.size !== setB.size) {
    return false;
  }
  for (const item of setA) {
    if (!setB.has(item)) {
      return false;
    }
  }
  return true;
}
function createMultipleSelectionState(props) {
  const mergedProps = mergeDefaultProps(
    {
      selectionMode: "none",
      selectionBehavior: "toggle"
    },
    props
  );
  const [isFocused, setFocused] = createSignal(false);
  const [focusedKey, setFocusedKey] = createSignal();
  const selectedKeysProp = createMemo(() => {
    const selection = access(mergedProps.selectedKeys);
    if (selection != null) {
      return convertSelection(selection);
    }
    return selection;
  });
  const defaultSelectedKeys = createMemo(() => {
    const defaultSelection = access(mergedProps.defaultSelectedKeys);
    if (defaultSelection != null) {
      return convertSelection(defaultSelection);
    }
    return new Selection();
  });
  const [selectedKeys, _setSelectedKeys] = createControllableSelectionSignal({
    value: selectedKeysProp,
    defaultValue: defaultSelectedKeys,
    onChange: (value) => {
      var _a;
      return (_a = mergedProps.onSelectionChange) == null ? void 0 : _a.call(mergedProps, value);
    }
  });
  const [selectionBehavior, setSelectionBehavior] = createSignal(access(mergedProps.selectionBehavior));
  const selectionMode = () => access(mergedProps.selectionMode);
  const disallowEmptySelection = () => access(mergedProps.disallowEmptySelection) ?? false;
  const setSelectedKeys = (keys2) => {
    if (access(mergedProps.allowDuplicateSelectionEvents) || !isSameSelection(keys2, selectedKeys())) {
      _setSelectedKeys(keys2);
    }
  };
  createEffect(() => {
    const selection = selectedKeys();
    if (access(mergedProps.selectionBehavior) === "replace" && selectionBehavior() === "toggle" && typeof selection === "object" && selection.size === 0) {
      setSelectionBehavior("replace");
    }
  });
  createEffect(() => {
    setSelectionBehavior(access(mergedProps.selectionBehavior) ?? "toggle");
  });
  return {
    selectionMode,
    disallowEmptySelection,
    selectionBehavior,
    setSelectionBehavior,
    isFocused,
    setFocused,
    focusedKey,
    setFocusedKey,
    selectedKeys,
    setSelectedKeys
  };
}
function createTypeSelect(props) {
  const [search, setSearch] = createSignal("");
  const [timeoutId, setTimeoutId] = createSignal(-1);
  const onKeyDown = (e2) => {
    var _a;
    if (access(props.isDisabled)) {
      return;
    }
    const delegate = access(props.keyboardDelegate);
    const manager = access(props.selectionManager);
    if (!delegate.getKeyForSearch) {
      return;
    }
    const character = getStringForKey(e2.key);
    if (!character || e2.ctrlKey || e2.metaKey) {
      return;
    }
    if (character === " " && search().trim().length > 0) {
      e2.preventDefault();
      e2.stopPropagation();
    }
    let newSearch = setSearch((prev) => prev + character);
    let key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
    if (key == null && isAllSameLetter(newSearch)) {
      newSearch = newSearch[0];
      key = delegate.getKeyForSearch(newSearch, manager.focusedKey()) ?? delegate.getKeyForSearch(newSearch);
    }
    if (key != null) {
      manager.setFocusedKey(key);
      (_a = props.onTypeSelect) == null ? void 0 : _a.call(props, key);
    }
    clearTimeout(timeoutId());
    setTimeoutId(window.setTimeout(() => setSearch(""), 500));
  };
  return {
    typeSelectHandlers: {
      onKeyDown
    }
  };
}
function getStringForKey(key) {
  if (key.length === 1 || !/^[A-Z]/i.test(key)) {
    return key;
  }
  return "";
}
function isAllSameLetter(search) {
  return search.split("").every((letter) => letter === search[0]);
}
function createSelectableCollection(props, ref, scrollRef) {
  const defaultProps = {
    selectOnFocus: () => access(props.selectionManager).selectionBehavior() === "replace"
  };
  const mergedProps = mergeProps(defaultProps, props);
  const finalScrollRef = () => ref();
  const { direction } = useLocale();
  let scrollPos = { top: 0, left: 0 };
  createEventListener(
    () => !access(mergedProps.isVirtualized) ? finalScrollRef() : void 0,
    "scroll",
    () => {
      const scrollEl = finalScrollRef();
      if (!scrollEl) {
        return;
      }
      scrollPos = {
        top: scrollEl.scrollTop,
        left: scrollEl.scrollLeft
      };
    }
  );
  const { typeSelectHandlers } = createTypeSelect({
    isDisabled: () => access(mergedProps.disallowTypeAhead),
    keyboardDelegate: () => access(mergedProps.keyboardDelegate),
    selectionManager: () => access(mergedProps.selectionManager)
  });
  const orientation = () => access(mergedProps.orientation) ?? "vertical";
  const onKeyDown = (e2) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    callHandler(e2, typeSelectHandlers.onKeyDown);
    if (e2.altKey && e2.key === "Tab") {
      e2.preventDefault();
    }
    const refEl = ref();
    if (!(refEl == null ? void 0 : refEl.contains(e2.target))) {
      return;
    }
    const manager = access(mergedProps.selectionManager);
    const selectOnFocus = access(mergedProps.selectOnFocus);
    const navigateToKey = (key) => {
      if (key != null) {
        manager.setFocusedKey(key);
        if (e2.shiftKey && manager.selectionMode() === "multiple") {
          manager.extendSelection(key);
        } else if (selectOnFocus && !isNonContiguousSelectionModifier(e2)) {
          manager.replaceSelection(key);
        }
      }
    };
    const delegate = access(mergedProps.keyboardDelegate);
    const shouldFocusWrap = access(mergedProps.shouldFocusWrap);
    const focusedKey = manager.focusedKey();
    switch (e2.key) {
      case (orientation() === "vertical" ? "ArrowDown" : "ArrowRight"): {
        if (delegate.getKeyBelow) {
          e2.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyBelow(focusedKey);
          } else {
            nextKey = (_a = delegate.getFirstKey) == null ? void 0 : _a.call(delegate);
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = (_b = delegate.getFirstKey) == null ? void 0 : _b.call(delegate, focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowUp" : "ArrowLeft"): {
        if (delegate.getKeyAbove) {
          e2.preventDefault();
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyAbove(focusedKey);
          } else {
            nextKey = (_c = delegate.getLastKey) == null ? void 0 : _c.call(delegate);
          }
          if (nextKey == null && shouldFocusWrap) {
            nextKey = (_d = delegate.getLastKey) == null ? void 0 : _d.call(delegate, focusedKey);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowLeft" : "ArrowUp"): {
        if (delegate.getKeyLeftOf) {
          e2.preventDefault();
          const isRTL3 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyLeftOf(focusedKey);
          } else {
            nextKey = isRTL3 ? (_e = delegate.getFirstKey) == null ? void 0 : _e.call(delegate) : (_f = delegate.getLastKey) == null ? void 0 : _f.call(delegate);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case (orientation() === "vertical" ? "ArrowRight" : "ArrowDown"): {
        if (delegate.getKeyRightOf) {
          e2.preventDefault();
          const isRTL3 = direction() === "rtl";
          let nextKey;
          if (focusedKey != null) {
            nextKey = delegate.getKeyRightOf(focusedKey);
          } else {
            nextKey = isRTL3 ? (_g = delegate.getLastKey) == null ? void 0 : _g.call(delegate) : (_h = delegate.getFirstKey) == null ? void 0 : _h.call(delegate);
          }
          navigateToKey(nextKey);
        }
        break;
      }
      case "Home":
        if (delegate.getFirstKey) {
          e2.preventDefault();
          const firstKey = delegate.getFirstKey(
            focusedKey,
            isCtrlKeyPressed(e2)
          );
          if (firstKey != null) {
            manager.setFocusedKey(firstKey);
            if (isCtrlKeyPressed(e2) && e2.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(firstKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(firstKey);
            }
          }
        }
        break;
      case "End":
        if (delegate.getLastKey) {
          e2.preventDefault();
          const lastKey = delegate.getLastKey(focusedKey, isCtrlKeyPressed(e2));
          if (lastKey != null) {
            manager.setFocusedKey(lastKey);
            if (isCtrlKeyPressed(e2) && e2.shiftKey && manager.selectionMode() === "multiple") {
              manager.extendSelection(lastKey);
            } else if (selectOnFocus) {
              manager.replaceSelection(lastKey);
            }
          }
        }
        break;
      case "PageDown":
        if (delegate.getKeyPageBelow && focusedKey != null) {
          e2.preventDefault();
          const nextKey = delegate.getKeyPageBelow(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "PageUp":
        if (delegate.getKeyPageAbove && focusedKey != null) {
          e2.preventDefault();
          const nextKey = delegate.getKeyPageAbove(focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case "a":
        if (isCtrlKeyPressed(e2) && manager.selectionMode() === "multiple" && access(mergedProps.disallowSelectAll) !== true) {
          e2.preventDefault();
          manager.selectAll();
        }
        break;
      case "Escape":
        if (!e2.defaultPrevented) {
          e2.preventDefault();
          if (!access(mergedProps.disallowEmptySelection)) {
            manager.clearSelection();
          }
        }
        break;
      case "Tab": {
        if (!access(mergedProps.allowsTabNavigation)) {
          if (e2.shiftKey) {
            refEl.focus();
          } else {
            const walker = getFocusableTreeWalker(refEl, { tabbable: true });
            let next;
            let last;
            do {
              last = walker.lastChild();
              if (last) {
                next = last;
              }
            } while (last);
            if (next && !next.contains(document.activeElement)) {
              focusWithoutScrolling(next);
            }
          }
          break;
        }
      }
    }
  };
  const onFocusIn = (e2) => {
    var _a, _b;
    const manager = access(mergedProps.selectionManager);
    const delegate = access(mergedProps.keyboardDelegate);
    const selectOnFocus = access(mergedProps.selectOnFocus);
    if (manager.isFocused()) {
      if (!e2.currentTarget.contains(e2.target)) {
        manager.setFocused(false);
      }
      return;
    }
    if (!e2.currentTarget.contains(e2.target)) {
      return;
    }
    manager.setFocused(true);
    if (manager.focusedKey() == null) {
      const navigateToFirstKey = (key) => {
        if (key == null) {
          return;
        }
        manager.setFocusedKey(key);
        if (selectOnFocus) {
          manager.replaceSelection(key);
        }
      };
      const relatedTarget = e2.relatedTarget;
      if (relatedTarget && e2.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) {
        navigateToFirstKey(
          manager.lastSelectedKey() ?? ((_a = delegate.getLastKey) == null ? void 0 : _a.call(delegate))
        );
      } else {
        navigateToFirstKey(
          manager.firstSelectedKey() ?? ((_b = delegate.getFirstKey) == null ? void 0 : _b.call(delegate))
        );
      }
    } else if (!access(mergedProps.isVirtualized)) {
      const scrollEl = finalScrollRef();
      if (scrollEl) {
        scrollEl.scrollTop = scrollPos.top;
        scrollEl.scrollLeft = scrollPos.left;
        const element = scrollEl.querySelector(
          `[data-key="${manager.focusedKey()}"]`
        );
        if (element) {
          focusWithoutScrolling(element);
          scrollIntoView(scrollEl, element);
        }
      }
    }
  };
  const onFocusOut = (e2) => {
    const manager = access(mergedProps.selectionManager);
    if (!e2.currentTarget.contains(e2.relatedTarget)) {
      manager.setFocused(false);
    }
  };
  const onMouseDown = (e2) => {
    if (finalScrollRef() === e2.target) {
      e2.preventDefault();
    }
  };
  const tryAutoFocus = () => {
    var _a, _b;
    const autoFocus = access(mergedProps.autoFocus);
    if (!autoFocus) {
      return;
    }
    const manager = access(mergedProps.selectionManager);
    const delegate = access(mergedProps.keyboardDelegate);
    let focusedKey;
    if (autoFocus === "first") {
      focusedKey = (_a = delegate.getFirstKey) == null ? void 0 : _a.call(delegate);
    }
    if (autoFocus === "last") {
      focusedKey = (_b = delegate.getLastKey) == null ? void 0 : _b.call(delegate);
    }
    const selectedKeys = manager.selectedKeys();
    if (selectedKeys.size) {
      focusedKey = selectedKeys.values().next().value;
    }
    manager.setFocused(true);
    manager.setFocusedKey(focusedKey);
    const refEl = ref();
    if (refEl && focusedKey == null && !access(mergedProps.shouldUseVirtualFocus)) {
      focusWithoutScrolling(refEl);
    }
  };
  onMount(() => {
    if (mergedProps.deferAutoFocus) {
      setTimeout(tryAutoFocus, 0);
    } else {
      tryAutoFocus();
    }
  });
  createEffect(
    on(
      [
        finalScrollRef,
        () => access(mergedProps.isVirtualized),
        () => access(mergedProps.selectionManager).focusedKey()
      ],
      (newValue) => {
        var _a;
        const [scrollEl, isVirtualized, focusedKey] = newValue;
        if (isVirtualized) {
          focusedKey && ((_a = mergedProps.scrollToKey) == null ? void 0 : _a.call(mergedProps, focusedKey));
        } else {
          if (focusedKey && scrollEl) {
            const element = scrollEl.querySelector(
              `[data-key="${focusedKey}"]`
            );
            if (element) {
              scrollIntoView(scrollEl, element);
            }
          }
        }
      }
    )
  );
  const tabIndex = createMemo(() => {
    if (access(mergedProps.shouldUseVirtualFocus)) {
      return void 0;
    }
    return access(mergedProps.selectionManager).focusedKey() == null ? 0 : -1;
  });
  return {
    tabIndex,
    onKeyDown,
    onMouseDown,
    onFocusIn,
    onFocusOut
  };
}
function createSelectableItem(props, ref) {
  const manager = () => access(props.selectionManager);
  const key = () => access(props.key);
  const shouldUseVirtualFocus = () => access(props.shouldUseVirtualFocus);
  const onSelect = (e2) => {
    if (manager().selectionMode() === "none") {
      return;
    }
    if (manager().selectionMode() === "single") {
      if (manager().isSelected(key()) && !manager().disallowEmptySelection()) {
        manager().toggleSelection(key());
      } else {
        manager().replaceSelection(key());
      }
    } else if (e2 == null ? void 0 : e2.shiftKey) {
      manager().extendSelection(key());
    } else if (manager().selectionBehavior() === "toggle" || isCtrlKeyPressed(e2) || "pointerType" in e2 && e2.pointerType === "touch") {
      manager().toggleSelection(key());
    } else {
      manager().replaceSelection(key());
    }
  };
  const isSelected = () => manager().isSelected(key());
  const isDisabled = () => access(props.disabled) || manager().isDisabled(key());
  const allowsSelection = () => !isDisabled() && manager().canSelectItem(key());
  let pointerDownType = null;
  const onPointerDown = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    pointerDownType = e2.pointerType;
    if (e2.pointerType === "mouse" && e2.button === 0 && !access(props.shouldSelectOnPressUp)) {
      onSelect(e2);
    }
  };
  const onPointerUp = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    if (e2.pointerType === "mouse" && e2.button === 0 && access(props.shouldSelectOnPressUp) && access(props.allowsDifferentPressOrigin)) {
      onSelect(e2);
    }
  };
  const onClick = (e2) => {
    if (!allowsSelection()) {
      return;
    }
    if (access(props.shouldSelectOnPressUp) && !access(props.allowsDifferentPressOrigin) || pointerDownType !== "mouse") {
      onSelect(e2);
    }
  };
  const onKeyDown = (e2) => {
    if (!allowsSelection() || !["Enter", " "].includes(e2.key)) {
      return;
    }
    if (isNonContiguousSelectionModifier(e2)) {
      manager().toggleSelection(key());
    } else {
      onSelect(e2);
    }
  };
  const onMouseDown = (e2) => {
    if (isDisabled()) {
      e2.preventDefault();
    }
  };
  const onFocus = (e2) => {
    const refEl = ref();
    if (shouldUseVirtualFocus() || isDisabled() || !refEl) {
      return;
    }
    if (e2.target === refEl) {
      manager().setFocusedKey(key());
    }
  };
  const tabIndex = createMemo(() => {
    if (shouldUseVirtualFocus() || isDisabled()) {
      return void 0;
    }
    return key() === manager().focusedKey() ? 0 : -1;
  });
  const dataKey = createMemo(() => {
    return access(props.virtualized) ? void 0 : key();
  });
  createEffect(
    on(
      [
        ref,
        key,
        shouldUseVirtualFocus,
        () => manager().focusedKey(),
        () => manager().isFocused()
      ],
      ([refEl, key2, shouldUseVirtualFocus2, focusedKey, isFocused]) => {
        if (refEl && key2 === focusedKey && isFocused && !shouldUseVirtualFocus2 && document.activeElement !== refEl) {
          if (props.focus) {
            props.focus();
          } else {
            focusWithoutScrolling(refEl);
          }
        }
      }
    )
  );
  return {
    isSelected,
    isDisabled,
    allowsSelection,
    tabIndex,
    dataKey,
    onPointerDown,
    onPointerUp,
    onClick,
    onKeyDown,
    onMouseDown,
    onFocus
  };
}
var SelectionManager = class {
  constructor(collection, state) {
    __publicField(this, "collection");
    __publicField(this, "state");
    this.collection = collection;
    this.state = state;
  }
  /** The type of selection that is allowed in the collection. */
  selectionMode() {
    return this.state.selectionMode();
  }
  /** Whether the collection allows empty selection. */
  disallowEmptySelection() {
    return this.state.disallowEmptySelection();
  }
  /** The selection behavior for the collection. */
  selectionBehavior() {
    return this.state.selectionBehavior();
  }
  /** Sets the selection behavior for the collection. */
  setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  /** Whether the collection is currently focused. */
  isFocused() {
    return this.state.isFocused();
  }
  /** Sets whether the collection is focused. */
  setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  /** The current focused key in the collection. */
  focusedKey() {
    return this.state.focusedKey();
  }
  /** Sets the focused key. */
  setFocusedKey(key) {
    if (key == null || this.collection().getItem(key)) {
      this.state.setFocusedKey(key);
    }
  }
  /** The currently selected keys in the collection. */
  selectedKeys() {
    return this.state.selectedKeys();
  }
  /** Returns whether a key is selected. */
  isSelected(key) {
    if (this.state.selectionMode() === "none") {
      return false;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return false;
    }
    return this.state.selectedKeys().has(retrievedKey);
  }
  /** Whether the selection is empty. */
  isEmpty() {
    return this.state.selectedKeys().size === 0;
  }
  /** Whether all items in the collection are selected. */
  isSelectAll() {
    if (this.isEmpty()) {
      return false;
    }
    const selectedKeys = this.state.selectedKeys();
    return this.getAllSelectableKeys().every((k) => selectedKeys.has(k));
  }
  firstSelectedKey() {
    let first;
    for (const key of this.state.selectedKeys()) {
      const item = this.collection().getItem(key);
      const isItemBeforeFirst = (item == null ? void 0 : item.index) != null && (first == null ? void 0 : first.index) != null && item.index < first.index;
      if (!first || isItemBeforeFirst) {
        first = item;
      }
    }
    return first == null ? void 0 : first.key;
  }
  lastSelectedKey() {
    let last;
    for (const key of this.state.selectedKeys()) {
      const item = this.collection().getItem(key);
      const isItemAfterLast = (item == null ? void 0 : item.index) != null && (last == null ? void 0 : last.index) != null && item.index > last.index;
      if (!last || isItemAfterLast) {
        last = item;
      }
    }
    return last == null ? void 0 : last.key;
  }
  /** Extends the selection to the given key. */
  extendSelection(toKey) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single") {
      this.replaceSelection(toKey);
      return;
    }
    const retrievedToKey = this.getKey(toKey);
    if (retrievedToKey == null) {
      return;
    }
    const selectedKeys = this.state.selectedKeys();
    const anchorKey = selectedKeys.anchorKey || retrievedToKey;
    const selection = new Selection(selectedKeys, anchorKey, retrievedToKey);
    for (const key of this.getKeyRange(
      anchorKey,
      selectedKeys.currentKey || retrievedToKey
    )) {
      selection.delete(key);
    }
    for (const key of this.getKeyRange(retrievedToKey, anchorKey)) {
      if (this.canSelectItem(key)) {
        selection.add(key);
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    const fromItem = this.collection().getItem(from);
    const toItem = this.collection().getItem(to);
    if (fromItem && toItem) {
      if (fromItem.index != null && toItem.index != null && fromItem.index <= toItem.index) {
        return this.getKeyRangeInternal(from, to);
      }
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    const keys2 = [];
    let key = from;
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item") {
        keys2.push(key);
      }
      if (key === to) {
        return keys2;
      }
      key = this.collection().getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    const item = this.collection().getItem(key);
    if (!item) {
      return key;
    }
    if (!item || item.type !== "item") {
      return null;
    }
    return item.key;
  }
  /** Toggles whether the given key is selected. */
  toggleSelection(key) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single" && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return;
    }
    const keys2 = new Selection(this.state.selectedKeys());
    if (keys2.has(retrievedKey)) {
      keys2.delete(retrievedKey);
    } else if (this.canSelectItem(retrievedKey)) {
      keys2.add(retrievedKey);
      keys2.anchorKey = retrievedKey;
      keys2.currentKey = retrievedKey;
    }
    if (this.disallowEmptySelection() && keys2.size === 0) {
      return;
    }
    this.state.setSelectedKeys(keys2);
  }
  /** Replaces the selection with only the given key. */
  replaceSelection(key) {
    if (this.selectionMode() === "none") {
      return;
    }
    const retrievedKey = this.getKey(key);
    if (retrievedKey == null) {
      return;
    }
    const selection = this.canSelectItem(retrievedKey) ? new Selection([retrievedKey], retrievedKey, retrievedKey) : new Selection();
    this.state.setSelectedKeys(selection);
  }
  /** Replaces the selection with the given keys. */
  setSelectedKeys(keys2) {
    if (this.selectionMode() === "none") {
      return;
    }
    const selection = new Selection();
    for (const key of keys2) {
      const retrievedKey = this.getKey(key);
      if (retrievedKey != null) {
        selection.add(retrievedKey);
        if (this.selectionMode() === "single") {
          break;
        }
      }
    }
    this.state.setSelectedKeys(selection);
  }
  /** Selects all items in the collection. */
  selectAll() {
    if (this.selectionMode() === "multiple") {
      this.state.setSelectedKeys(new Set(this.getAllSelectableKeys()));
    }
  }
  /**
   * Removes all keys from the selection.
   */
  clearSelection() {
    const selectedKeys = this.state.selectedKeys();
    if (!this.disallowEmptySelection() && selectedKeys.size > 0) {
      this.state.setSelectedKeys(new Selection());
    }
  }
  /**
   * Toggles between select all and an empty selection.
   */
  toggleSelectAll() {
    if (this.isSelectAll()) {
      this.clearSelection();
    } else {
      this.selectAll();
    }
  }
  select(key, e2) {
    if (this.selectionMode() === "none") {
      return;
    }
    if (this.selectionMode() === "single") {
      if (this.isSelected(key) && !this.disallowEmptySelection()) {
        this.toggleSelection(key);
      } else {
        this.replaceSelection(key);
      }
    } else if (this.selectionBehavior() === "toggle" || e2 && e2.pointerType === "touch") {
      this.toggleSelection(key);
    } else {
      this.replaceSelection(key);
    }
  }
  /** Returns whether the current selection is equal to the given selection. */
  isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys()) {
      return true;
    }
    const selectedKeys = this.selectedKeys();
    if (selection.size !== selectedKeys.size) {
      return false;
    }
    for (const key of selection) {
      if (!selectedKeys.has(key)) {
        return false;
      }
    }
    for (const key of selectedKeys) {
      if (!selection.has(key)) {
        return false;
      }
    }
    return true;
  }
  canSelectItem(key) {
    if (this.state.selectionMode() === "none") {
      return false;
    }
    const item = this.collection().getItem(key);
    return item != null && !item.disabled;
  }
  isDisabled(key) {
    const item = this.collection().getItem(key);
    return !item || item.disabled;
  }
  getAllSelectableKeys() {
    const keys2 = [];
    const addKeys = (key) => {
      while (key != null) {
        if (this.canSelectItem(key)) {
          const item = this.collection().getItem(key);
          if (!item) {
            continue;
          }
          if (item.type === "item") {
            keys2.push(key);
          }
        }
        key = this.collection().getKeyAfter(key);
      }
    };
    addKeys(this.collection().getFirstKey());
    return keys2;
  }
};
var ListCollection = class {
  constructor(nodes) {
    __publicField(this, "keyMap", /* @__PURE__ */ new Map());
    __publicField(this, "iterable");
    __publicField(this, "firstKey");
    __publicField(this, "lastKey");
    this.iterable = nodes;
    for (const node of nodes) {
      this.keyMap.set(node.key, node);
    }
    if (this.keyMap.size === 0) {
      return;
    }
    let last;
    let index = 0;
    for (const [key, node] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node.prevKey = last.key;
      } else {
        this.firstKey = key;
        node.prevKey = void 0;
      }
      if (node.type === "item") {
        node.index = index++;
      }
      last = node;
      last.nextKey = void 0;
    }
    this.lastKey = last.key;
  }
  *[Symbol.iterator]() {
    yield* this.iterable;
  }
  getSize() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    var _a;
    return (_a = this.keyMap.get(key)) == null ? void 0 : _a.prevKey;
  }
  getKeyAfter(key) {
    var _a;
    return (_a = this.keyMap.get(key)) == null ? void 0 : _a.nextKey;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key);
  }
  at(idx) {
    const keys2 = [...this.getKeys()];
    return this.getItem(keys2[idx]);
  }
};
function createListState(props) {
  const selectionState = createMultipleSelectionState(props);
  const factory = (nodes) => {
    return props.filter ? new ListCollection(props.filter(nodes)) : new ListCollection(nodes);
  };
  const collection = createCollection(
    {
      dataSource: () => access(props.dataSource),
      getKey: () => access(props.getKey),
      getTextValue: () => access(props.getTextValue),
      getDisabled: () => access(props.getDisabled),
      getSectionChildren: () => access(props.getSectionChildren),
      factory
    },
    [() => props.filter]
  );
  const selectionManager = new SelectionManager(collection, selectionState);
  createComputed(() => {
    const focusedKey = selectionState.focusedKey();
    if (focusedKey != null && !collection().getItem(focusedKey)) {
      selectionState.setFocusedKey(void 0);
    }
  });
  return {
    collection,
    selectionManager: () => selectionManager
  };
}
var access2 = (v) => typeof v === "function" ? v() : v;
var createPresence = (props) => {
  const refStyles = createMemo(() => {
    const element = access2(props.element);
    if (!element)
      return;
    return getComputedStyle(element);
  });
  const getAnimationName = () => {
    var _a;
    return ((_a = refStyles()) == null ? void 0 : _a.animationName) ?? "none";
  };
  const [presentState, setPresentState] = createSignal(access2(props.show) ? "present" : "hidden");
  let animationName = "none";
  createEffect((prevShow) => {
    const show = access2(props.show);
    untrack(() => {
      var _a;
      if (prevShow === show)
        return show;
      const prevAnimationName = animationName;
      const currentAnimationName = getAnimationName();
      if (show) {
        setPresentState("present");
      } else if (currentAnimationName === "none" || ((_a = refStyles()) == null ? void 0 : _a.display) === "none") {
        setPresentState("hidden");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (prevShow === true && isAnimating) {
          setPresentState("hiding");
        } else {
          setPresentState("hidden");
        }
      }
    });
    return show;
  });
  createEffect(() => {
    const element = access2(props.element);
    if (!element)
      return;
    const handleAnimationStart = (event) => {
      if (event.target === element) {
        animationName = getAnimationName();
      }
    };
    const handleAnimationEnd = (event) => {
      const currentAnimationName = getAnimationName();
      const isCurrentAnimation = currentAnimationName.includes(
        event.animationName
      );
      if (event.target === element && isCurrentAnimation && presentState() === "hiding") {
        setPresentState("hidden");
      }
    };
    element.addEventListener("animationstart", handleAnimationStart);
    element.addEventListener("animationcancel", handleAnimationEnd);
    element.addEventListener("animationend", handleAnimationEnd);
    onCleanup(() => {
      element.removeEventListener("animationstart", handleAnimationStart);
      element.removeEventListener("animationcancel", handleAnimationEnd);
      element.removeEventListener("animationend", handleAnimationEnd);
    });
  });
  return {
    present: () => presentState() === "present" || presentState() === "hiding",
    state: presentState
  };
};
var presence_default = createPresence;
var src_default = presence_default;
var DATA_TOP_LAYER_ATTR = "data-kb-top-layer";
var originalBodyPointerEvents;
var hasDisabledBodyPointerEvents = false;
var layers = [];
function indexOf(node) {
  return layers.findIndex((layer) => layer.node === node);
}
function find(node) {
  return layers[indexOf(node)];
}
function isTopMostLayer(node) {
  return layers[layers.length - 1].node === node;
}
function getPointerBlockingLayers() {
  return layers.filter((layer) => layer.isPointerBlocking);
}
function getTopMostPointerBlockingLayer() {
  return [...getPointerBlockingLayers()].slice(-1)[0];
}
function hasPointerBlockingLayer() {
  return getPointerBlockingLayers().length > 0;
}
function isBelowPointerBlockingLayer(node) {
  var _a;
  const highestBlockingIndex = indexOf((_a = getTopMostPointerBlockingLayer()) == null ? void 0 : _a.node);
  return indexOf(node) < highestBlockingIndex;
}
function addLayer(layer) {
  layers.push(layer);
}
function removeLayer(node) {
  const index = indexOf(node);
  if (index < 0) {
    return;
  }
  layers.splice(index, 1);
}
function assignPointerEventToLayers() {
  for (const {
    node
  } of layers) {
    node.style.pointerEvents = isBelowPointerBlockingLayer(node) ? "none" : "auto";
  }
}
function disableBodyPointerEvents(node) {
  if (hasPointerBlockingLayer() && !hasDisabledBodyPointerEvents) {
    const ownerDocument = getDocument(node);
    originalBodyPointerEvents = document.body.style.pointerEvents;
    ownerDocument.body.style.pointerEvents = "none";
    hasDisabledBodyPointerEvents = true;
  }
}
function restoreBodyPointerEvents(node) {
  if (hasPointerBlockingLayer()) {
    return;
  }
  const ownerDocument = getDocument(node);
  ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
  if (ownerDocument.body.style.length === 0) {
    ownerDocument.body.removeAttribute("style");
  }
  hasDisabledBodyPointerEvents = false;
}
var layerStack = {
  layers,
  isTopMostLayer,
  hasPointerBlockingLayer,
  isBelowPointerBlockingLayer,
  addLayer,
  removeLayer,
  indexOf,
  find,
  assignPointerEventToLayers,
  disableBodyPointerEvents,
  restoreBodyPointerEvents
};
var button_exports = {};
__export(button_exports, {
  Button: () => Button,
  Root: () => ButtonRoot
});
var BUTTON_INPUT_TYPES = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit"
];
function isButton(element) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") {
    return true;
  }
  if (tagName === "input" && element.type) {
    return BUTTON_INPUT_TYPES.indexOf(element.type) !== -1;
  }
  return false;
}
function ButtonRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    type: "button"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "type", "disabled"]);
  const tagName = createTagName(() => ref, () => "button");
  const isNativeButton = createMemo(() => {
    const elementTagName = tagName();
    if (elementTagName == null) {
      return false;
    }
    return isButton({
      tagName: elementTagName,
      type: local.type
    });
  });
  const isNativeInput = createMemo(() => {
    return tagName() === "input";
  });
  const isNativeLink = createMemo(() => {
    return tagName() === "a" && (ref == null ? void 0 : ref.getAttribute("href")) != null;
  });
  return createComponent(Polymorphic, mergeProps({
    as: "button",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get type() {
      return isNativeButton() || isNativeInput() ? local.type : void 0;
    },
    get role() {
      return !isNativeButton() && !isNativeLink() ? "button" : void 0;
    },
    get tabIndex() {
      return !isNativeButton() && !isNativeLink() && !local.disabled ? 0 : void 0;
    },
    get disabled() {
      return isNativeButton() || isNativeInput() ? local.disabled : void 0;
    },
    get ["aria-disabled"]() {
      return !isNativeButton() && !isNativeInput() && local.disabled ? true : void 0;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : void 0;
    }
  }, others));
}
var Button = ButtonRoot;
var sides = ["top", "right", "bottom", "left"];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp2(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp2(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
var hide = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp2(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp2(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
var size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e2) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow2(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow2(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache2) {
  const cachedResult = cache2.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache2.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL2(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL: isRTL2
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries2) {
      const ratio = entries2[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var size2 = size;
var hide2 = hide;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache2 = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache2
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var PopperContext = createContext();
function usePopperContext() {
  const context = useContext(PopperContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `usePopperContext` must be used within a `Popper` component");
  }
  return context;
}
var _tmpl$ = /* @__PURE__ */ template(`<svg display="block" viewBox="0 0 30 30" style="transform:scale(1.02)"><g><path fill="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z"></path><path stroke="none" d="M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z">`);
var DEFAULT_SIZE = 30;
var HALF_DEFAULT_SIZE = DEFAULT_SIZE / 2;
var ROTATION_DEG = {
  top: 180,
  right: -90,
  bottom: 0,
  left: 90
};
function PopperArrow(props) {
  const context = usePopperContext();
  const mergedProps = mergeDefaultProps({
    size: DEFAULT_SIZE
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "size"]);
  const dir = () => context.currentPlacement().split("-")[0];
  const contentStyle = createComputedStyle(context.contentRef);
  const fill = () => {
    var _a;
    return ((_a = contentStyle()) == null ? void 0 : _a.getPropertyValue("background-color")) || "none";
  };
  const stroke = () => {
    var _a;
    return ((_a = contentStyle()) == null ? void 0 : _a.getPropertyValue(`border-${dir()}-color`)) || "none";
  };
  const borderWidth = () => {
    var _a;
    return ((_a = contentStyle()) == null ? void 0 : _a.getPropertyValue(`border-${dir()}-width`)) || "0px";
  };
  const strokeWidth = () => {
    return Number.parseInt(borderWidth()) * 2 * (DEFAULT_SIZE / local.size);
  };
  const rotate = () => {
    return `rotate(${ROTATION_DEG[dir()]} ${HALF_DEFAULT_SIZE} ${HALF_DEFAULT_SIZE}) translate(0 2)`;
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setArrowRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "aria-hidden": "true",
    get style() {
      return combineStyle({
        // server side rendering
        position: "absolute",
        "font-size": `${local.size}px`,
        width: "1em",
        height: "1em",
        "pointer-events": "none",
        fill: fill(),
        stroke: stroke(),
        "stroke-width": strokeWidth()
      }, local.style);
    }
  }, others, {
    get children() {
      const _el$ = _tmpl$(), _el$2 = _el$.firstChild;
      createRenderEffect(() => setAttribute(_el$2, "transform", rotate()));
      return _el$;
    }
  }));
}
function createComputedStyle(element) {
  const [style, setStyle] = createSignal();
  createEffect(() => {
    const el = element();
    el && setStyle(getWindow(el).getComputedStyle(el));
  });
  return style;
}
function PopperPositioner(props) {
  const context = usePopperContext();
  const [local, others] = splitProps(props, ["ref", "style"]);
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setPositionerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    "data-popper-positioner": "",
    get style() {
      return combineStyle({
        position: "absolute",
        top: 0,
        left: 0,
        "min-width": "max-content"
      }, local.style);
    }
  }, others));
}
function createDOMRect(anchorRect) {
  const { x = 0, y = 0, width = 0, height = 0 } = anchorRect ?? {};
  if (typeof DOMRect === "function") {
    return new DOMRect(x, y, width, height);
  }
  const rect = {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x
  };
  return { ...rect, toJSON: () => rect };
}
function getAnchorElement(anchor, getAnchorRect) {
  const contextElement = anchor;
  return {
    contextElement,
    getBoundingClientRect: () => {
      const anchorRect = getAnchorRect(anchor);
      if (anchorRect) {
        return createDOMRect(anchorRect);
      }
      if (anchor) {
        return anchor.getBoundingClientRect();
      }
      return createDOMRect();
    }
  };
}
function isValidPlacement(flip22) {
  return /^(?:top|bottom|left|right)(?:-(?:start|end))?$/.test(flip22);
}
var REVERSE_BASE_PLACEMENT = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
function getTransformOrigin(placement, readingDirection) {
  const [basePlacement, alignment] = placement.split("-");
  const reversePlacement = REVERSE_BASE_PLACEMENT[basePlacement];
  if (!alignment) {
    return `${reversePlacement} center`;
  }
  if (basePlacement === "left" || basePlacement === "right") {
    return `${reversePlacement} ${alignment === "start" ? "top" : "bottom"}`;
  }
  if (alignment === "start") {
    return `${reversePlacement} ${readingDirection === "rtl" ? "right" : "left"}`;
  }
  return `${reversePlacement} ${readingDirection === "rtl" ? "left" : "right"}`;
}
function PopperRoot(props) {
  const mergedProps = mergeDefaultProps({
    getAnchorRect: (anchor) => anchor == null ? void 0 : anchor.getBoundingClientRect(),
    placement: "bottom",
    gutter: 0,
    shift: 0,
    flip: true,
    slide: true,
    overlap: false,
    sameWidth: false,
    fitViewport: false,
    hideWhenDetached: false,
    detachedPadding: 0,
    arrowPadding: 4,
    overflowPadding: 8
  }, props);
  const [positionerRef, setPositionerRef] = createSignal();
  const [arrowRef, setArrowRef] = createSignal();
  const [currentPlacement, setCurrentPlacement] = createSignal(mergedProps.placement);
  const anchorRef = () => {
    var _a;
    return getAnchorElement((_a = mergedProps.anchorRef) == null ? void 0 : _a.call(mergedProps), mergedProps.getAnchorRect);
  };
  const {
    direction
  } = useLocale();
  async function updatePosition() {
    var _a, _b;
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    const arrowEl = arrowRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const arrowOffset = ((arrowEl == null ? void 0 : arrowEl.clientHeight) || 0) / 2;
    const finalGutter = typeof mergedProps.gutter === "number" ? mergedProps.gutter + arrowOffset : mergedProps.gutter ?? arrowOffset;
    floatingEl.style.setProperty("--kb-popper-content-overflow-padding", `${mergedProps.overflowPadding}px`);
    referenceEl.getBoundingClientRect();
    const middleware = [
      // https://floating-ui.com/docs/offset
      offset2(({
        placement
      }) => {
        const hasAlignment = !!placement.split("-")[1];
        return {
          mainAxis: finalGutter,
          crossAxis: !hasAlignment ? mergedProps.shift : void 0,
          alignmentAxis: mergedProps.shift
        };
      })
    ];
    if (mergedProps.flip !== false) {
      const fallbackPlacements = typeof mergedProps.flip === "string" ? mergedProps.flip.split(" ") : void 0;
      if (fallbackPlacements !== void 0 && !fallbackPlacements.every(isValidPlacement)) {
        throw new Error("`flip` expects a spaced-delimited list of placements");
      }
      middleware.push(flip2({
        padding: mergedProps.overflowPadding,
        fallbackPlacements
      }));
    }
    if (mergedProps.slide || mergedProps.overlap) {
      middleware.push(shift2({
        mainAxis: mergedProps.slide,
        crossAxis: mergedProps.overlap,
        padding: mergedProps.overflowPadding
      }));
    }
    middleware.push(size2({
      padding: mergedProps.overflowPadding,
      apply({
        availableWidth,
        availableHeight,
        rects
      }) {
        const referenceWidth = Math.round(rects.reference.width);
        availableWidth = Math.floor(availableWidth);
        availableHeight = Math.floor(availableHeight);
        floatingEl.style.setProperty("--kb-popper-anchor-width", `${referenceWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-width", `${availableWidth}px`);
        floatingEl.style.setProperty("--kb-popper-content-available-height", `${availableHeight}px`);
        if (mergedProps.sameWidth) {
          floatingEl.style.width = `${referenceWidth}px`;
        }
        if (mergedProps.fitViewport) {
          floatingEl.style.maxWidth = `${availableWidth}px`;
          floatingEl.style.maxHeight = `${availableHeight}px`;
        }
      }
    }));
    if (mergedProps.hideWhenDetached) {
      middleware.push(hide2({
        padding: mergedProps.detachedPadding
      }));
    }
    if (arrowEl) {
      middleware.push(arrow2({
        element: arrowEl,
        padding: mergedProps.arrowPadding
      }));
    }
    const pos = await computePosition2(referenceEl, floatingEl, {
      placement: mergedProps.placement,
      strategy: "absolute",
      middleware,
      platform: {
        ...platform,
        isRTL: () => direction() === "rtl"
      }
    });
    setCurrentPlacement(pos.placement);
    (_a = mergedProps.onCurrentPlacementChange) == null ? void 0 : _a.call(mergedProps, pos.placement);
    if (!floatingEl) {
      return;
    }
    floatingEl.style.setProperty("--kb-popper-content-transform-origin", getTransformOrigin(pos.placement, direction()));
    const x = Math.round(pos.x);
    const y = Math.round(pos.y);
    let visibility;
    if (mergedProps.hideWhenDetached) {
      visibility = ((_b = pos.middlewareData.hide) == null ? void 0 : _b.referenceHidden) ? "hidden" : "visible";
    }
    Object.assign(floatingEl.style, {
      top: "0",
      left: "0",
      transform: `translate3d(${x}px, ${y}px, 0)`,
      visibility
    });
    if (arrowEl && pos.middlewareData.arrow) {
      const {
        x: arrowX,
        y: arrowY
      } = pos.middlewareData.arrow;
      const dir = pos.placement.split("-")[0];
      Object.assign(arrowEl.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [dir]: "100%"
      });
    }
  }
  createEffect(() => {
    const referenceEl = anchorRef();
    const floatingEl = positionerRef();
    if (!referenceEl || !floatingEl) {
      return;
    }
    const cleanupAutoUpdate = autoUpdate(referenceEl, floatingEl, updatePosition, {
      // JSDOM doesn't support ResizeObserver
      elementResize: typeof ResizeObserver === "function"
    });
    onCleanup(cleanupAutoUpdate);
  });
  createEffect(() => {
    var _a;
    const positioner = positionerRef();
    const content = (_a = mergedProps.contentRef) == null ? void 0 : _a.call(mergedProps);
    if (!positioner || !content) {
      return;
    }
    queueMicrotask(() => {
      positioner.style.zIndex = getComputedStyle(content).zIndex;
    });
  });
  const context = {
    currentPlacement,
    contentRef: () => {
      var _a;
      return (_a = mergedProps.contentRef) == null ? void 0 : _a.call(mergedProps);
    },
    setPositionerRef,
    setArrowRef
  };
  return createComponent(PopperContext.Provider, {
    value: context,
    get children() {
      return mergedProps.children;
    }
  });
}
var Popper = Object.assign(PopperRoot, {
  Arrow: PopperArrow,
  Context: PopperContext,
  usePopperContext,
  Positioner: PopperPositioner
});
function createEscapeKeyDown(props) {
  const handleKeyDown = (event) => {
    var _a;
    if (event.key === EventKey.Escape) {
      (_a = props.onEscapeKeyDown) == null ? void 0 : _a.call(props, event);
    }
  };
  createEffect(() => {
    var _a;
    if (access(props.isDisabled)) {
      return;
    }
    const document2 = ((_a = props.ownerDocument) == null ? void 0 : _a.call(props)) ?? getDocument();
    document2.addEventListener("keydown", handleKeyDown);
    onCleanup(() => {
      document2.removeEventListener("keydown", handleKeyDown);
    });
  });
}
var POINTER_DOWN_OUTSIDE_EVENT = "interactOutside.pointerDownOutside";
var FOCUS_OUTSIDE_EVENT = "interactOutside.focusOutside";
function createInteractOutside(props, ref) {
  let pointerDownTimeoutId;
  let clickHandler = noop3;
  const ownerDocument = () => getDocument(ref());
  const onPointerDownOutside = (e2) => {
    var _a;
    return (_a = props.onPointerDownOutside) == null ? void 0 : _a.call(props, e2);
  };
  const onFocusOutside = (e2) => {
    var _a;
    return (_a = props.onFocusOutside) == null ? void 0 : _a.call(props, e2);
  };
  const onInteractOutside = (e2) => {
    var _a;
    return (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, e2);
  };
  const isEventOutside = (e2) => {
    var _a;
    const target = e2.target;
    if (!(target instanceof HTMLElement)) {
      return false;
    }
    if (target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
      return false;
    }
    if (!contains(ownerDocument(), target)) {
      return false;
    }
    if (contains(ref(), target)) {
      return false;
    }
    return !((_a = props.shouldExcludeElement) == null ? void 0 : _a.call(props, target));
  };
  const onPointerDown = (e2) => {
    function handler() {
      const container = ref();
      const target = e2.target;
      if (!container || !target || !isEventOutside(e2)) {
        return;
      }
      const handler2 = composeEventHandlers([
        onPointerDownOutside,
        onInteractOutside
      ]);
      target.addEventListener(POINTER_DOWN_OUTSIDE_EVENT, handler2, {
        once: true
      });
      const pointerDownOutsideEvent = new CustomEvent(
        POINTER_DOWN_OUTSIDE_EVENT,
        {
          bubbles: false,
          cancelable: true,
          detail: {
            originalEvent: e2,
            isContextMenu: e2.button === 2 || isCtrlKey(e2) && e2.button === 0
          }
        }
      );
      target.dispatchEvent(pointerDownOutsideEvent);
    }
    if (e2.pointerType === "touch") {
      ownerDocument().removeEventListener("click", handler);
      clickHandler = handler;
      ownerDocument().addEventListener("click", handler, { once: true });
    } else {
      handler();
    }
  };
  const onFocusIn = (e2) => {
    const container = ref();
    const target = e2.target;
    if (!container || !target || !isEventOutside(e2)) {
      return;
    }
    const handler = composeEventHandlers([
      onFocusOutside,
      onInteractOutside
    ]);
    target.addEventListener(FOCUS_OUTSIDE_EVENT, handler, { once: true });
    const focusOutsideEvent = new CustomEvent(FOCUS_OUTSIDE_EVENT, {
      bubbles: false,
      cancelable: true,
      detail: {
        originalEvent: e2,
        isContextMenu: false
      }
    });
    target.dispatchEvent(focusOutsideEvent);
  };
  createEffect(() => {
    if (access(props.isDisabled)) {
      return;
    }
    pointerDownTimeoutId = window.setTimeout(() => {
      ownerDocument().addEventListener("pointerdown", onPointerDown, true);
    }, 0);
    ownerDocument().addEventListener("focusin", onFocusIn, true);
    onCleanup(() => {
      window.clearTimeout(pointerDownTimeoutId);
      ownerDocument().removeEventListener("click", clickHandler);
      ownerDocument().removeEventListener("pointerdown", onPointerDown, true);
      ownerDocument().removeEventListener("focusin", onFocusIn, true);
    });
  });
}
var DismissableLayerContext = createContext();
function useOptionalDismissableLayerContext() {
  return useContext(DismissableLayerContext);
}
function DismissableLayer(props) {
  let ref;
  const parentContext = useOptionalDismissableLayerContext();
  const [local, others] = splitProps(props, ["ref", "disableOutsidePointerEvents", "excludedElements", "onEscapeKeyDown", "onPointerDownOutside", "onFocusOutside", "onInteractOutside", "onDismiss", "bypassTopMostLayerCheck"]);
  const nestedLayers = /* @__PURE__ */ new Set([]);
  const registerNestedLayer = (element) => {
    nestedLayers.add(element);
    const parentUnregister = parentContext == null ? void 0 : parentContext.registerNestedLayer(element);
    return () => {
      nestedLayers.delete(element);
      parentUnregister == null ? void 0 : parentUnregister();
    };
  };
  const shouldExcludeElement = (element) => {
    var _a;
    if (!ref) {
      return false;
    }
    return ((_a = local.excludedElements) == null ? void 0 : _a.some((node) => contains(node(), element))) || [...nestedLayers].some((layer) => contains(layer, element));
  };
  const onPointerDownOutside = (e2) => {
    var _a, _b, _c;
    if (!ref || layerStack.isBelowPointerBlockingLayer(ref)) {
      return;
    }
    if (!local.bypassTopMostLayerCheck && !layerStack.isTopMostLayer(ref)) {
      return;
    }
    (_a = local.onPointerDownOutside) == null ? void 0 : _a.call(local, e2);
    (_b = local.onInteractOutside) == null ? void 0 : _b.call(local, e2);
    if (!e2.defaultPrevented) {
      (_c = local.onDismiss) == null ? void 0 : _c.call(local);
    }
  };
  const onFocusOutside = (e2) => {
    var _a, _b, _c;
    (_a = local.onFocusOutside) == null ? void 0 : _a.call(local, e2);
    (_b = local.onInteractOutside) == null ? void 0 : _b.call(local, e2);
    if (!e2.defaultPrevented) {
      (_c = local.onDismiss) == null ? void 0 : _c.call(local);
    }
  };
  createInteractOutside({
    shouldExcludeElement,
    onPointerDownOutside,
    onFocusOutside
  }, () => ref);
  createEscapeKeyDown({
    ownerDocument: () => getDocument(ref),
    onEscapeKeyDown: (e2) => {
      var _a;
      if (!ref || !layerStack.isTopMostLayer(ref)) {
        return;
      }
      (_a = local.onEscapeKeyDown) == null ? void 0 : _a.call(local, e2);
      if (!e2.defaultPrevented && local.onDismiss) {
        e2.preventDefault();
        local.onDismiss();
      }
    }
  });
  onMount(() => {
    if (!ref) {
      return;
    }
    layerStack.addLayer({
      node: ref,
      isPointerBlocking: local.disableOutsidePointerEvents,
      dismiss: local.onDismiss
    });
    const unregisterFromParentLayer = parentContext == null ? void 0 : parentContext.registerNestedLayer(ref);
    layerStack.assignPointerEventToLayers();
    layerStack.disableBodyPointerEvents(ref);
    onCleanup(() => {
      if (!ref) {
        return;
      }
      layerStack.removeLayer(ref);
      unregisterFromParentLayer == null ? void 0 : unregisterFromParentLayer();
      layerStack.assignPointerEventToLayers();
      layerStack.restoreBodyPointerEvents(ref);
    });
  });
  createEffect(on([() => ref, () => local.disableOutsidePointerEvents], ([ref2, disableOutsidePointerEvents]) => {
    if (!ref2) {
      return;
    }
    const layer = layerStack.find(ref2);
    if (layer && layer.isPointerBlocking !== disableOutsidePointerEvents) {
      layer.isPointerBlocking = disableOutsidePointerEvents;
      layerStack.assignPointerEventToLayers();
    }
    if (disableOutsidePointerEvents) {
      layerStack.disableBodyPointerEvents(ref2);
    }
    onCleanup(() => {
      layerStack.restoreBodyPointerEvents(ref2);
    });
  }, {
    defer: true
  }));
  const context = {
    registerNestedLayer
  };
  return createComponent(DismissableLayerContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        }
      }, others));
    }
  });
}
function createDisclosureState(props = {}) {
  const [isOpen, setIsOpen] = createControllableBooleanSignal({
    value: () => access(props.open),
    defaultValue: () => !!access(props.defaultOpen),
    onChange: (value) => {
      var _a;
      return (_a = props.onOpenChange) == null ? void 0 : _a.call(props, value);
    }
  });
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const toggle = () => {
    isOpen() ? close() : open();
  };
  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle
  };
}
var radio_group_exports = {};
__export(radio_group_exports, {
  Description: () => FormControlDescription,
  ErrorMessage: () => FormControlErrorMessage,
  Item: () => RadioGroupItem,
  ItemControl: () => RadioGroupItemControl,
  ItemDescription: () => RadioGroupItemDescription,
  ItemIndicator: () => RadioGroupItemIndicator,
  ItemInput: () => RadioGroupItemInput,
  ItemLabel: () => RadioGroupItemLabel,
  Label: () => RadioGroupLabel,
  RadioGroup: () => RadioGroup,
  Root: () => RadioGroupRoot
});
var RadioGroupContext = createContext();
function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useRadioGroupContext` must be used within a `RadioGroup` component");
  }
  return context;
}
var RadioGroupItemContext = createContext();
function useRadioGroupItemContext() {
  const context = useContext(RadioGroupItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useRadioGroupItemContext` must be used within a `RadioGroup.Item` component");
  }
  return context;
}
function RadioGroupItem(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const defaultId = `${formControlContext.generateId("item")}-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "disabled", "onPointerDown"]);
  const [inputId, setInputId] = createSignal();
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [inputRef, setInputRef] = createSignal();
  const [isFocused, setIsFocused] = createSignal(false);
  const isSelected = createMemo(() => {
    return radioGroupContext.isSelectedValue(local.value);
  });
  const isDisabled = createMemo(() => {
    return local.disabled || formControlContext.isDisabled() || false;
  });
  const onPointerDown = (e2) => {
    callHandler(e2, local.onPointerDown);
    if (isFocused()) {
      e2.preventDefault();
    }
  };
  const dataset = createMemo(() => ({
    ...formControlContext.dataset(),
    "data-disabled": isDisabled() ? "" : void 0,
    "data-checked": isSelected() ? "" : void 0
  }));
  const context = {
    value: () => local.value,
    dataset,
    isSelected,
    isDisabled,
    inputId,
    labelId,
    descriptionId,
    inputRef,
    select: () => radioGroupContext.setSelectedValue(local.value),
    generateId: createGenerateId(() => others.id),
    registerInput: createRegisterId(setInputId),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId),
    setIsFocused,
    setInputRef
  };
  return createComponent(RadioGroupItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        onPointerDown
      }, dataset, others));
    }
  });
}
function RadioGroupItemControl(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("control")
  }, props);
  const [local, others] = splitProps(mergedProps, ["onClick", "onKeyDown"]);
  const onClick = (e2) => {
    var _a;
    callHandler(e2, local.onClick);
    context.select();
    (_a = context.inputRef()) == null ? void 0 : _a.focus();
  };
  const onKeyDown = (e2) => {
    var _a;
    callHandler(e2, local.onKeyDown);
    if (e2.key === EventKey.Space) {
      context.select();
      (_a = context.inputRef()) == null ? void 0 : _a.focus();
    }
  };
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    onClick,
    onKeyDown
  }, () => context.dataset(), others));
}
function RadioGroupItemDescription(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  createEffect(() => onCleanup(context.registerDescription(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div"
  }, () => context.dataset(), mergedProps));
}
function RadioGroupItemIndicator(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "forceMount"]);
  const [ref, setRef] = createSignal();
  const {
    present
  } = src_default({
    show: () => local.forceMount || context.isSelected(),
    element: () => ref() ?? null
  });
  return createComponent(Show, {
    get when() {
      return present();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs(setRef, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        }
      }, () => context.dataset(), others));
    }
  });
}
function RadioGroupItemInput(props) {
  const formControlContext = useFormControlContext();
  const radioGroupContext = useRadioGroupContext();
  const radioContext = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: radioContext.generateId("input")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "style", "aria-labelledby", "aria-describedby", "onChange", "onFocus", "onBlur"]);
  const ariaLabelledBy = () => {
    return [
      local["aria-labelledby"],
      radioContext.labelId(),
      // If there is both an aria-label and aria-labelledby, add the input itself has an aria-labelledby
      local["aria-labelledby"] != null && others["aria-label"] != null ? others.id : void 0
    ].filter(Boolean).join(" ") || void 0;
  };
  const ariaDescribedBy = () => {
    return [local["aria-describedby"], radioContext.descriptionId(), radioGroupContext.ariaDescribedBy()].filter(Boolean).join(" ") || void 0;
  };
  const [isInternalChangeEvent, setIsInternalChangeEvent] = createSignal(false);
  const onChange = (e2) => {
    callHandler(e2, local.onChange);
    e2.stopPropagation();
    if (!isInternalChangeEvent()) {
      radioGroupContext.setSelectedValue(radioContext.value());
      const target = e2.target;
      target.checked = radioContext.isSelected();
    }
    setIsInternalChangeEvent(false);
  };
  const onFocus = (e2) => {
    callHandler(e2, local.onFocus);
    radioContext.setIsFocused(true);
  };
  const onBlur = (e2) => {
    callHandler(e2, local.onBlur);
    radioContext.setIsFocused(false);
  };
  createEffect(on([() => radioContext.isSelected(), () => radioContext.value()], (c2) => {
    if (!c2[0] && c2[1] === radioContext.value())
      return;
    setIsInternalChangeEvent(true);
    const ref = radioContext.inputRef();
    ref == null ? void 0 : ref.dispatchEvent(new Event("input", {
      bubbles: true,
      cancelable: true
    }));
    ref == null ? void 0 : ref.dispatchEvent(new Event("change", {
      bubbles: true,
      cancelable: true
    }));
  }, {
    defer: true
  }));
  createEffect(() => onCleanup(radioContext.registerInput(others.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "input",
    ref(r$) {
      const _ref$ = mergeRefs(radioContext.setInputRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    type: "radio",
    get name() {
      return formControlContext.name();
    },
    get value() {
      return radioContext.value();
    },
    get checked() {
      return radioContext.isSelected();
    },
    get required() {
      return formControlContext.isRequired();
    },
    get disabled() {
      return radioContext.isDisabled();
    },
    get readonly() {
      return formControlContext.isReadOnly();
    },
    get style() {
      return combineStyle({
        ...visuallyHiddenStyles
      }, local.style);
    },
    get ["aria-labelledby"]() {
      return ariaLabelledBy();
    },
    get ["aria-describedby"]() {
      return ariaDescribedBy();
    },
    onChange,
    onFocus,
    onBlur
  }, () => radioContext.dataset(), others));
}
function RadioGroupItemLabel(props) {
  const context = useRadioGroupItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  createEffect(() => onCleanup(context.registerLabel(mergedProps.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "label",
    get ["for"]() {
      return context.inputId();
    }
  }, () => context.dataset(), mergedProps));
}
function RadioGroupLabel(props) {
  return createComponent(FormControlLabel, mergeProps({
    as: "span"
  }, props));
}
function RadioGroupRoot(props) {
  let ref;
  const defaultId = `radiogroup-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    orientation: "vertical"
  }, props);
  const [local, formControlProps, others] = splitProps(mergedProps, ["ref", "value", "defaultValue", "onChange", "orientation", "aria-labelledby", "aria-describedby"], FORM_CONTROL_PROP_NAMES);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => {
      var _a;
      return (_a = local.onChange) == null ? void 0 : _a.call(local, value);
    }
  });
  const {
    formControlContext
  } = createFormControl(formControlProps);
  createFormResetListener(() => ref, () => setSelected(local.defaultValue ?? ""));
  const ariaLabelledBy = () => {
    return formControlContext.getAriaLabelledBy(access(formControlProps.id), others["aria-label"], local["aria-labelledby"]);
  };
  const ariaDescribedBy = () => {
    return formControlContext.getAriaDescribedBy(local["aria-describedby"]);
  };
  const isSelectedValue = (value) => {
    return value === selected();
  };
  const context = {
    ariaDescribedBy,
    isSelectedValue,
    setSelectedValue: (value) => {
      if (formControlContext.isReadOnly() || formControlContext.isDisabled()) {
        return;
      }
      setSelected(value);
      if (ref)
        for (const el of ref.querySelectorAll("[type='radio']")) {
          const radio = el;
          radio.checked = isSelectedValue(radio.value);
        }
    }
  };
  return createComponent(FormControlContext.Provider, {
    value: formControlContext,
    get children() {
      return createComponent(RadioGroupContext.Provider, {
        value: context,
        get children() {
          return createComponent(Polymorphic, mergeProps({
            as: "div",
            ref(r$) {
              const _ref$ = mergeRefs((el) => ref = el, local.ref);
              typeof _ref$ === "function" && _ref$(r$);
            },
            role: "radiogroup",
            get id() {
              return access(formControlProps.id);
            },
            get ["aria-invalid"]() {
              return formControlContext.validationState() === "invalid" || void 0;
            },
            get ["aria-required"]() {
              return formControlContext.isRequired() || void 0;
            },
            get ["aria-disabled"]() {
              return formControlContext.isDisabled() || void 0;
            },
            get ["aria-readonly"]() {
              return formControlContext.isReadOnly() || void 0;
            },
            get ["aria-orientation"]() {
              return local.orientation;
            },
            get ["aria-labelledby"]() {
              return ariaLabelledBy();
            },
            get ["aria-describedby"]() {
              return ariaDescribedBy();
            }
          }, () => formControlContext.dataset(), others));
        }
      });
    }
  });
}
var RadioGroup = Object.assign(RadioGroupRoot, {
  Description: FormControlDescription,
  ErrorMessage: FormControlErrorMessage,
  Item: RadioGroupItem,
  ItemControl: RadioGroupItemControl,
  ItemDescription: RadioGroupItemDescription,
  ItemIndicator: RadioGroupItemIndicator,
  ItemInput: RadioGroupItemInput,
  ItemLabel: RadioGroupItemLabel,
  Label: RadioGroupLabel
});
var ListKeyboardDelegate = class {
  constructor(collection, ref, collator) {
    __publicField(this, "collection");
    __publicField(this, "ref");
    __publicField(this, "collator");
    this.collection = collection;
    this.ref = ref;
    this.collator = collator;
  }
  getKeyBelow(key) {
    let keyAfter = this.collection().getKeyAfter(key);
    while (keyAfter != null) {
      const item = this.collection().getItem(keyAfter);
      if (item && item.type === "item" && !item.disabled) {
        return keyAfter;
      }
      keyAfter = this.collection().getKeyAfter(keyAfter);
    }
  }
  getKeyAbove(key) {
    let keyBefore = this.collection().getKeyBefore(key);
    while (keyBefore != null) {
      const item = this.collection().getItem(keyBefore);
      if (item && item.type === "item" && !item.disabled) {
        return keyBefore;
      }
      keyBefore = this.collection().getKeyBefore(keyBefore);
    }
  }
  getFirstKey() {
    let key = this.collection().getFirstKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item" && !item.disabled) {
        return key;
      }
      key = this.collection().getKeyAfter(key);
    }
  }
  getLastKey() {
    let key = this.collection().getLastKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item && item.type === "item" && !item.disabled) {
        return key;
      }
      key = this.collection().getKeyBefore(key);
    }
  }
  getItem(key) {
    var _a, _b;
    return ((_b = (_a = this.ref) == null ? void 0 : _a.call(this)) == null ? void 0 : _b.querySelector(`[data-key="${key}"]`)) ?? null;
  }
  // TODO: not working correctly
  getKeyPageAbove(key) {
    var _a;
    const menu = (_a = this.ref) == null ? void 0 : _a.call(this);
    let item = this.getItem(key);
    if (!menu || !item) {
      return;
    }
    const pageY = Math.max(
      0,
      item.offsetTop + item.offsetHeight - menu.offsetHeight
    );
    let keyAbove = key;
    while (keyAbove && item && item.offsetTop > pageY) {
      keyAbove = this.getKeyAbove(keyAbove);
      item = keyAbove != null ? this.getItem(keyAbove) : null;
    }
    return keyAbove;
  }
  // TODO: not working correctly
  getKeyPageBelow(key) {
    var _a;
    const menu = (_a = this.ref) == null ? void 0 : _a.call(this);
    let item = this.getItem(key);
    if (!menu || !item) {
      return;
    }
    const pageY = Math.min(
      menu.scrollHeight,
      item.offsetTop - item.offsetHeight + menu.offsetHeight
    );
    let keyBelow = key;
    while (keyBelow && item && item.offsetTop < pageY) {
      keyBelow = this.getKeyBelow(keyBelow);
      item = keyBelow != null ? this.getItem(keyBelow) : null;
    }
    return keyBelow;
  }
  getKeyForSearch(search, fromKey) {
    var _a;
    const collator = (_a = this.collator) == null ? void 0 : _a.call(this);
    if (!collator) {
      return;
    }
    let key = fromKey != null ? this.getKeyBelow(fromKey) : this.getFirstKey();
    while (key != null) {
      const item = this.collection().getItem(key);
      if (item) {
        const substring = item.textValue.slice(0, search.length);
        if (item.textValue && collator.compare(substring, search) === 0) {
          return key;
        }
      }
      key = this.getKeyBelow(key);
    }
  }
};
function createSelectableList(props, ref, scrollRef) {
  const collator = createCollator({ usage: "search", sensitivity: "base" });
  const delegate = createMemo(() => {
    const keyboardDelegate = access(props.keyboardDelegate);
    if (keyboardDelegate) {
      return keyboardDelegate;
    }
    return new ListKeyboardDelegate(props.collection, ref, collator);
  });
  return createSelectableCollection(
    {
      selectionManager: () => access(props.selectionManager),
      keyboardDelegate: delegate,
      autoFocus: () => access(props.autoFocus),
      deferAutoFocus: () => access(props.deferAutoFocus),
      shouldFocusWrap: () => access(props.shouldFocusWrap),
      disallowEmptySelection: () => access(props.disallowEmptySelection),
      selectOnFocus: () => access(props.selectOnFocus),
      disallowTypeAhead: () => access(props.disallowTypeAhead),
      shouldUseVirtualFocus: () => access(props.shouldUseVirtualFocus),
      allowsTabNavigation: () => access(props.allowsTabNavigation),
      isVirtualized: () => access(props.isVirtualized),
      scrollToKey: (key) => {
        var _a;
        return (_a = access(props.scrollToKey)) == null ? void 0 : _a(key);
      },
      orientation: () => access(props.orientation)
    },
    ref
  );
}
var AUTOFOCUS_ON_MOUNT_EVENT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT_EVENT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true
};
var focusScopeStack = {
  /** A stack of focus scopes, with the active one at the top */
  stack: [],
  active() {
    return this.stack[0];
  },
  add(scope) {
    var _a;
    if (scope !== this.active()) {
      (_a = this.active()) == null ? void 0 : _a.pause();
    }
    this.stack = removeItemFromArray(this.stack, scope);
    this.stack.unshift(scope);
  },
  remove(scope) {
    var _a;
    this.stack = removeItemFromArray(this.stack, scope);
    (_a = this.active()) == null ? void 0 : _a.resume();
  }
};
function createFocusScope(props, ref) {
  const [isPaused, setIsPaused] = createSignal(false);
  const focusScope = {
    pause() {
      setIsPaused(true);
    },
    resume() {
      setIsPaused(false);
    }
  };
  let lastFocusedElement = null;
  const onMountAutoFocus = (e2) => {
    var _a;
    return (_a = props.onMountAutoFocus) == null ? void 0 : _a.call(props, e2);
  };
  const onUnmountAutoFocus = (e2) => {
    var _a;
    return (_a = props.onUnmountAutoFocus) == null ? void 0 : _a.call(props, e2);
  };
  const ownerDocument = () => getDocument(ref());
  const createSentinel = () => {
    const element = ownerDocument().createElement("span");
    element.setAttribute("data-focus-trap", "");
    element.tabIndex = 0;
    Object.assign(element.style, visuallyHiddenStyles);
    return element;
  };
  const tabbables = () => {
    const container = ref();
    if (!container) {
      return [];
    }
    return getAllTabbableIn(container, true).filter((el) => !el.hasAttribute("data-focus-trap"));
  };
  const firstTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[0] : null;
  };
  const lastTabbable = () => {
    const items = tabbables();
    return items.length > 0 ? items[items.length - 1] : null;
  };
  const shouldPreventUnmountAutoFocus = () => {
    const container = ref();
    if (!container) {
      return false;
    }
    const activeElement = getActiveElement(container);
    if (!activeElement) {
      return false;
    }
    if (contains(container, activeElement)) {
      return false;
    }
    return isFocusable(activeElement);
  };
  createEffect(() => {
    const container = ref();
    if (!container) {
      return;
    }
    focusScopeStack.add(focusScope);
    const previouslyFocusedElement = getActiveElement(container);
    const hasFocusedCandidate = contains(container, previouslyFocusedElement);
    if (!hasFocusedCandidate) {
      const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT_EVENT, EVENT_OPTIONS);
      container.addEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      container.dispatchEvent(mountEvent);
      if (!mountEvent.defaultPrevented) {
        setTimeout(() => {
          focusWithoutScrolling(firstTabbable());
          if (getActiveElement(container) === previouslyFocusedElement) {
            focusWithoutScrolling(container);
          }
        }, 0);
      }
    }
    onCleanup(() => {
      container.removeEventListener(AUTOFOCUS_ON_MOUNT_EVENT, onMountAutoFocus);
      setTimeout(() => {
        const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT_EVENT, EVENT_OPTIONS);
        if (shouldPreventUnmountAutoFocus()) {
          unmountEvent.preventDefault();
        }
        container.addEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        container.dispatchEvent(unmountEvent);
        if (!unmountEvent.defaultPrevented) {
          focusWithoutScrolling(previouslyFocusedElement ?? ownerDocument().body);
        }
        container.removeEventListener(AUTOFOCUS_ON_UNMOUNT_EVENT, onUnmountAutoFocus);
        focusScopeStack.remove(focusScope);
      }, 0);
    });
  });
  createEffect(() => {
    const container = ref();
    if (!container || !access(props.trapFocus) || isPaused()) {
      return;
    }
    const onFocusIn = (event) => {
      const target = event.target;
      if (target == null ? void 0 : target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (contains(container, target)) {
        lastFocusedElement = target;
      } else {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    const onFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      const target = relatedTarget ?? getActiveElement(container);
      if (target == null ? void 0 : target.closest(`[${DATA_TOP_LAYER_ATTR}]`)) {
        return;
      }
      if (!contains(container, target)) {
        focusWithoutScrolling(lastFocusedElement);
      }
    };
    ownerDocument().addEventListener("focusin", onFocusIn);
    ownerDocument().addEventListener("focusout", onFocusOut);
    onCleanup(() => {
      ownerDocument().removeEventListener("focusin", onFocusIn);
      ownerDocument().removeEventListener("focusout", onFocusOut);
    });
  });
  createEffect(() => {
    const container = ref();
    if (!container || !access(props.trapFocus) || isPaused()) {
      return;
    }
    const startSentinel = createSentinel();
    container.insertAdjacentElement("afterbegin", startSentinel);
    const endSentinel = createSentinel();
    container.insertAdjacentElement("beforeend", endSentinel);
    function onFocus(event) {
      const first = firstTabbable();
      const last = lastTabbable();
      if (event.relatedTarget === first) {
        focusWithoutScrolling(last);
      } else {
        focusWithoutScrolling(first);
      }
    }
    startSentinel.addEventListener("focusin", onFocus);
    endSentinel.addEventListener("focusin", onFocus);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.previousSibling === endSentinel) {
          endSentinel.remove();
          container.insertAdjacentElement("beforeend", endSentinel);
        }
        if (mutation.nextSibling === startSentinel) {
          startSentinel.remove();
          container.insertAdjacentElement("afterbegin", startSentinel);
        }
      }
    });
    observer.observe(container, {
      childList: true,
      subtree: false
    });
    onCleanup(() => {
      startSentinel.removeEventListener("focusin", onFocus);
      endSentinel.removeEventListener("focusin", onFocus);
      startSentinel.remove();
      endSentinel.remove();
      observer.disconnect();
    });
  });
}
var DATA_LIVE_ANNOUNCER_ATTR = "data-live-announcer";
function createHideOutside(props) {
  createEffect(() => {
    if (access(props.isDisabled)) {
      return;
    }
    onCleanup(ariaHideOutside(access(props.targets), access(props.root)));
  });
}
var refCountMap = /* @__PURE__ */ new WeakMap();
var observerStack = [];
function ariaHideOutside(targets, root = document.body) {
  const visibleNodes = new Set(targets);
  const hiddenNodes = /* @__PURE__ */ new Set();
  const walk = (root2) => {
    for (const element of root2.querySelectorAll(
      `[${DATA_LIVE_ANNOUNCER_ATTR}], [${DATA_TOP_LAYER_ATTR}]`
    )) {
      visibleNodes.add(element);
    }
    const acceptNode = (node) => {
      if (visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") {
        return NodeFilter.FILTER_REJECT;
      }
      for (const target of visibleNodes) {
        if (node.contains(target)) {
          return NodeFilter.FILTER_SKIP;
        }
      }
      return NodeFilter.FILTER_ACCEPT;
    };
    const walker = document.createTreeWalker(root2, NodeFilter.SHOW_ELEMENT, {
      acceptNode
    });
    const acceptRoot = acceptNode(root2);
    if (acceptRoot === NodeFilter.FILTER_ACCEPT) {
      hide3(root2);
    }
    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker.nextNode();
      while (node != null) {
        hide3(node);
        node = walker.nextNode();
      }
    }
  };
  const hide3 = (node) => {
    const refCount = refCountMap.get(node) ?? 0;
    if (node.getAttribute("aria-hidden") === "true" && refCount === 0) {
      return;
    }
    if (refCount === 0) {
      node.setAttribute("aria-hidden", "true");
    }
    hiddenNodes.add(node);
    refCountMap.set(node, refCount + 1);
  };
  if (observerStack.length) {
    observerStack[observerStack.length - 1].disconnect();
  }
  walk(root);
  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type !== "childList" || change.addedNodes.length === 0) {
        continue;
      }
      if (![...visibleNodes, ...hiddenNodes].some(
        (node) => node.contains(change.target)
      )) {
        for (const node of change.removedNodes) {
          if (node instanceof Element) {
            visibleNodes.delete(node);
            hiddenNodes.delete(node);
          }
        }
        for (const node of change.addedNodes) {
          if ((node instanceof HTMLElement || node instanceof SVGElement) && (node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer === "true")) {
            visibleNodes.add(node);
          } else if (node instanceof Element) {
            walk(node);
          }
        }
      }
    }
  });
  observer.observe(root, { childList: true, subtree: true });
  const observerWrapper = {
    observe() {
      observer.observe(root, { childList: true, subtree: true });
    },
    disconnect() {
      observer.disconnect();
    }
  };
  observerStack.push(observerWrapper);
  return () => {
    observer.disconnect();
    for (const node of hiddenNodes) {
      const count = refCountMap.get(node);
      if (count == null) {
        return;
      }
      if (count === 1) {
        node.removeAttribute("aria-hidden");
        refCountMap.delete(node);
      } else {
        refCountMap.set(node, count - 1);
      }
    }
    if (observerWrapper === observerStack[observerStack.length - 1]) {
      observerStack.pop();
      if (observerStack.length) {
        observerStack[observerStack.length - 1].observe();
      }
    } else {
      observerStack.splice(observerStack.indexOf(observerWrapper), 1);
    }
  };
}
var activeStyles = /* @__PURE__ */ new Map();
var createStyle = (props) => {
  createEffect(() => {
    const style = access2(props.style) ?? {};
    const properties = access2(props.properties) ?? [];
    const originalStyles = {};
    for (const key in style) {
      originalStyles[key] = props.element.style[key];
    }
    const activeStyle = activeStyles.get(props.key);
    if (activeStyle) {
      activeStyle.activeCount++;
    } else {
      activeStyles.set(props.key, {
        activeCount: 1,
        originalStyles,
        properties: properties.map((property) => property.key)
      });
    }
    Object.assign(props.element.style, props.style);
    for (const property of properties) {
      props.element.style.setProperty(property.key, property.value);
    }
    onCleanup(() => {
      var _a;
      const activeStyle2 = activeStyles.get(props.key);
      if (!activeStyle2)
        return;
      if (activeStyle2.activeCount !== 1) {
        activeStyle2.activeCount--;
        return;
      }
      activeStyles.delete(props.key);
      for (const [key, value] of Object.entries(activeStyle2.originalStyles)) {
        props.element.style[key] = value;
      }
      for (const property of activeStyle2.properties) {
        props.element.style.removeProperty(property);
      }
      if (props.element.style.length === 0) {
        props.element.removeAttribute("style");
      }
      (_a = props.cleanup) == null ? void 0 : _a.call(props);
    });
  });
};
var style_default = createStyle;
var getScrollDimensions = (element, axis) => {
  switch (axis) {
    case "x":
      return [element.clientWidth, element.scrollLeft, element.scrollWidth];
    case "y":
      return [element.clientHeight, element.scrollTop, element.scrollHeight];
  }
};
var isScrollContainer = (element, axis) => {
  const styles = getComputedStyle(element);
  const overflow = axis === "x" ? styles.overflowX : styles.overflowY;
  return overflow === "auto" || overflow === "scroll" || // The HTML element is a scroll container if it has overflow visible
  element.tagName === "HTML" && overflow === "visible";
};
var getScrollAtLocation = (location, axis, stopAt) => {
  const directionFactor = axis === "x" && window.getComputedStyle(location).direction === "rtl" ? -1 : 1;
  let currentElement = location;
  let availableScroll = 0;
  let availableScrollTop = 0;
  let wrapperReached = false;
  do {
    const [clientSize, scrollOffset, scrollSize] = getScrollDimensions(
      currentElement,
      axis
    );
    const scrolled = scrollSize - clientSize - directionFactor * scrollOffset;
    if ((scrollOffset !== 0 || scrolled !== 0) && isScrollContainer(currentElement, axis)) {
      availableScroll += scrolled;
      availableScrollTop += scrollOffset;
    }
    if (currentElement === (stopAt ?? document.documentElement)) {
      wrapperReached = true;
    } else {
      currentElement = currentElement._$host ?? currentElement.parentElement;
    }
  } while (currentElement && !wrapperReached);
  return [availableScroll, availableScrollTop];
};
var [preventScrollStack, setPreventScrollStack] = createSignal([]);
var isActive = (id) => preventScrollStack().indexOf(id) === preventScrollStack().length - 1;
var createPreventScroll = (props) => {
  const defaultedProps = mergeProps(
    {
      element: null,
      enabled: true,
      hideScrollbar: true,
      preventScrollbarShift: true,
      preventScrollbarShiftMode: "padding",
      restoreScrollPosition: true,
      allowPinchZoom: false
    },
    props
  );
  const preventScrollId = createUniqueId();
  let currentTouchStart = [0, 0];
  let currentTouchStartAxis = null;
  let currentTouchStartDelta = null;
  createEffect(() => {
    if (!access2(defaultedProps.enabled))
      return;
    setPreventScrollStack((stack) => [...stack, preventScrollId]);
    onCleanup(() => {
      setPreventScrollStack(
        (stack) => stack.filter((id) => id !== preventScrollId)
      );
    });
  });
  createEffect(() => {
    if (!access2(defaultedProps.enabled) || !access2(defaultedProps.hideScrollbar))
      return;
    const { body } = document;
    const scrollbarWidth = window.innerWidth - body.offsetWidth;
    if (access2(defaultedProps.preventScrollbarShift)) {
      const style = { overflow: "hidden" };
      const properties = [];
      if (scrollbarWidth > 0) {
        if (access2(defaultedProps.preventScrollbarShiftMode) === "padding") {
          style.paddingRight = `calc(${window.getComputedStyle(body).paddingRight} + ${scrollbarWidth}px)`;
        } else {
          style.marginRight = `calc(${window.getComputedStyle(body).marginRight} + ${scrollbarWidth}px)`;
        }
        properties.push({
          key: "--scrollbar-width",
          value: `${scrollbarWidth}px`
        });
      }
      const offsetTop = window.scrollY;
      const offsetLeft = window.scrollX;
      style_default({
        key: "prevent-scroll",
        element: body,
        style,
        properties,
        cleanup: () => {
          if (access2(defaultedProps.restoreScrollPosition) && scrollbarWidth > 0) {
            window.scrollTo(offsetLeft, offsetTop);
          }
        }
      });
    } else {
      style_default({
        key: "prevent-scroll",
        element: body,
        style: {
          overflow: "hidden"
        }
      });
    }
  });
  createEffect(() => {
    if (!isActive(preventScrollId) || !access2(defaultedProps.enabled))
      return;
    document.addEventListener("wheel", maybePreventWheel, {
      passive: false
    });
    document.addEventListener("touchstart", logTouchStart, {
      passive: false
    });
    document.addEventListener("touchmove", maybePreventTouch, {
      passive: false
    });
    onCleanup(() => {
      document.removeEventListener("wheel", maybePreventWheel);
      document.removeEventListener("touchstart", logTouchStart);
      document.removeEventListener("touchmove", maybePreventTouch);
    });
  });
  const logTouchStart = (event) => {
    currentTouchStart = getTouchXY(event);
    currentTouchStartAxis = null;
    currentTouchStartDelta = null;
  };
  const maybePreventWheel = (event) => {
    const target = event.target;
    const wrapper = access2(defaultedProps.element);
    const delta = getDeltaXY(event);
    const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
    const axisDelta = axis === "x" ? delta[0] : delta[1];
    const resultsInScroll = wouldScroll(target, axis, axisDelta, wrapper);
    let shouldCancel;
    if (wrapper && contains2(wrapper, target)) {
      shouldCancel = !resultsInScroll;
    } else {
      shouldCancel = true;
    }
    if (shouldCancel && event.cancelable) {
      event.preventDefault();
    }
  };
  const maybePreventTouch = (event) => {
    const wrapper = access2(defaultedProps.element);
    const target = event.target;
    let shouldCancel;
    if (event.touches.length === 2) {
      shouldCancel = !access2(defaultedProps.allowPinchZoom);
    } else {
      if (currentTouchStartAxis == null || currentTouchStartDelta === null) {
        const delta = getTouchXY(event).map(
          (touch, i2) => currentTouchStart[i2] - touch
        );
        const axis = Math.abs(delta[0]) > Math.abs(delta[1]) ? "x" : "y";
        currentTouchStartAxis = axis;
        currentTouchStartDelta = axis === "x" ? delta[0] : delta[1];
      }
      if (target.type === "range") {
        shouldCancel = false;
      } else {
        const wouldResultInScroll = wouldScroll(
          target,
          currentTouchStartAxis,
          currentTouchStartDelta,
          wrapper
        );
        if (wrapper && contains2(wrapper, target)) {
          shouldCancel = !wouldResultInScroll;
        } else {
          shouldCancel = true;
        }
      }
    }
    if (shouldCancel && event.cancelable) {
      event.preventDefault();
    }
  };
};
var getDeltaXY = (event) => [
  event.deltaX,
  event.deltaY
];
var getTouchXY = (event) => event.changedTouches[0] ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
var wouldScroll = (target, axis, delta, wrapper) => {
  const targetInWrapper = wrapper !== null && contains2(wrapper, target);
  const [availableScroll, availableScrollTop] = getScrollAtLocation(
    target,
    axis,
    targetInWrapper ? wrapper : void 0
  );
  if (delta > 0 && Math.abs(availableScroll) <= 1) {
    return false;
  }
  if (delta < 0 && Math.abs(availableScrollTop) < 1) {
    return false;
  }
  return true;
};
var contains2 = (wrapper, target) => {
  if (wrapper.contains(target))
    return true;
  let currentElement = target;
  while (currentElement) {
    if (currentElement === wrapper)
      return true;
    currentElement = currentElement._$host ?? currentElement.parentElement;
  }
  return false;
};
var preventScroll_default = createPreventScroll;
var src_default2 = preventScroll_default;
var MenuContext = createContext();
function useOptionalMenuContext() {
  return useContext(MenuContext);
}
function useMenuContext() {
  const context = useOptionalMenuContext();
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuContext` must be used within a `Menu` component");
  }
  return context;
}
var MenuItemContext = createContext();
function useMenuItemContext() {
  const context = useContext(MenuItemContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuItemContext` must be used within a `Menu.Item` component");
  }
  return context;
}
var MenuRootContext = createContext();
function useMenuRootContext() {
  const context = useContext(MenuRootContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuRootContext` must be used within a `MenuRoot` component");
  }
  return context;
}
function MenuItemBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const menuContext = useMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`item-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "textValue", "disabled", "closeOnSelect", "checked", "indeterminate", "onSelect", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  const [labelId, setLabelId] = createSignal();
  const [descriptionId, setDescriptionId] = createSignal();
  const [labelRef, setLabelRef] = createSignal();
  const selectionManager = () => menuContext.listState().selectionManager();
  const key = () => others.id;
  const isHighlighted = () => selectionManager().focusedKey() === key();
  const onSelect = () => {
    var _a;
    (_a = local.onSelect) == null ? void 0 : _a.call(local);
    if (local.closeOnSelect) {
      setTimeout(() => {
        menuContext.close(true);
      });
    }
  };
  createDomCollectionItem({
    getItem: () => {
      var _a;
      return {
        ref: () => ref,
        type: "item",
        key: key(),
        textValue: local.textValue ?? ((_a = labelRef()) == null ? void 0 : _a.textContent) ?? (ref == null ? void 0 : ref.textContent) ?? "",
        disabled: local.disabled ?? false
      };
    }
  });
  const selectableItem = createSelectableItem({
    key,
    selectionManager,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    disabled: () => local.disabled
  }, () => ref);
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    if (local.disabled) {
      menuContext.onItemLeave(e2);
    } else {
      menuContext.onItemEnter(e2);
      if (!e2.defaultPrevented) {
        focusWithoutScrolling(e2.currentTarget);
        menuContext.listState().selectionManager().setFocused(true);
        menuContext.listState().selectionManager().setFocusedKey(key());
      }
    }
  };
  const onPointerLeave = (e2) => {
    callHandler(e2, local.onPointerLeave);
    if (e2.pointerType !== "mouse") {
      return;
    }
    menuContext.onItemLeave(e2);
  };
  const onPointerUp = (e2) => {
    callHandler(e2, local.onPointerUp);
    if (!local.disabled && e2.button === 0) {
      onSelect();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    switch (e2.key) {
      case "Enter":
      case " ":
        onSelect();
        break;
    }
  };
  const ariaChecked = createMemo(() => {
    if (local.indeterminate) {
      return "mixed";
    }
    if (local.checked == null) {
      return void 0;
    }
    return local.checked;
  });
  const dataset = createMemo(() => ({
    "data-indeterminate": local.indeterminate ? "" : void 0,
    "data-checked": local.checked && !local.indeterminate ? "" : void 0,
    "data-disabled": local.disabled ? "" : void 0,
    "data-highlighted": isHighlighted() ? "" : void 0
  }));
  const context = {
    isChecked: () => local.checked,
    dataset,
    setLabelRef,
    generateId: createGenerateId(() => others.id),
    registerLabel: createRegisterId(setLabelId),
    registerDescription: createRegisterId(setDescriptionId)
  };
  return createComponent(MenuItemContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        ref(r$) {
          const _ref$ = mergeRefs((el) => ref = el, local.ref);
          typeof _ref$ === "function" && _ref$(r$);
        },
        get tabIndex() {
          return selectableItem.tabIndex();
        },
        get ["aria-checked"]() {
          return ariaChecked();
        },
        get ["aria-disabled"]() {
          return local.disabled;
        },
        get ["aria-labelledby"]() {
          return labelId();
        },
        get ["aria-describedby"]() {
          return descriptionId();
        },
        get ["data-key"]() {
          return selectableItem.dataKey();
        },
        get onPointerDown() {
          return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
        },
        get onPointerUp() {
          return composeEventHandlers([onPointerUp, selectableItem.onPointerUp]);
        },
        get onClick() {
          return composeEventHandlers([local.onClick, selectableItem.onClick]);
        },
        get onKeyDown() {
          return composeEventHandlers([onKeyDown, selectableItem.onKeyDown]);
        },
        get onMouseDown() {
          return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
        },
        get onFocus() {
          return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
        },
        onPointerMove,
        onPointerLeave
      }, dataset, others));
    }
  });
}
function MenuCheckboxItem(props) {
  const mergedProps = mergeDefaultProps({
    closeOnSelect: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["checked", "defaultChecked", "onChange", "onSelect"]);
  const state = createToggleState({
    isSelected: () => local.checked,
    defaultIsSelected: () => local.defaultChecked,
    onSelectedChange: (checked) => {
      var _a;
      return (_a = local.onChange) == null ? void 0 : _a.call(local, checked);
    },
    isDisabled: () => others.disabled
  });
  const onSelect = () => {
    var _a;
    (_a = local.onSelect) == null ? void 0 : _a.call(local);
    state.toggle();
  };
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitemcheckbox",
    get checked() {
      return state.isSelected();
    },
    onSelect
  }, others));
}
var MenubarContext = createContext();
function useOptionalMenubarContext() {
  return useContext(MenubarContext);
}
var MENUBAR_KEYS = {
  next: (dir, orientation) => dir === "ltr" ? orientation === "horizontal" ? "ArrowRight" : "ArrowDown" : orientation === "horizontal" ? "ArrowLeft" : "ArrowUp",
  previous: (dir, orientation) => MENUBAR_KEYS.next(dir === "ltr" ? "rtl" : "ltr", orientation)
};
var MENU_KEYS = {
  first: (orientation) => orientation === "horizontal" ? "ArrowDown" : "ArrowRight",
  last: (orientation) => orientation === "horizontal" ? "ArrowUp" : "ArrowLeft"
};
function MenuTrigger(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId("trigger")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "disabled", "onPointerDown", "onClick", "onKeyDown", "onMouseOver", "onFocus"]);
  let key = () => rootContext.value();
  if (optionalMenubarContext !== void 0) {
    key = () => rootContext.value() ?? local.id;
    if (optionalMenubarContext.lastValue() === void 0)
      optionalMenubarContext.setLastValue(key);
  }
  const tagName = createTagName(() => context.triggerRef(), () => "button");
  const isNativeLink = createMemo(() => {
    var _a;
    return tagName() === "a" && ((_a = context.triggerRef()) == null ? void 0 : _a.getAttribute("href")) != null;
  });
  createEffect(on(() => optionalMenubarContext == null ? void 0 : optionalMenubarContext.value(), (value) => {
    var _a;
    if (!isNativeLink())
      return;
    if (value === key())
      (_a = context.triggerRef()) == null ? void 0 : _a.focus();
  }));
  const handleClick = () => {
    if (optionalMenubarContext !== void 0) {
      if (!context.isOpen()) {
        if (!optionalMenubarContext.autoFocusMenu()) {
          optionalMenubarContext.setAutoFocusMenu(true);
        }
        context.open(false);
      } else {
        if (optionalMenubarContext.value() === key())
          optionalMenubarContext.closeMenu();
      }
    } else
      context.toggle(true);
  };
  const onPointerDown = (e2) => {
    callHandler(e2, local.onPointerDown);
    e2.currentTarget.dataset.pointerType = e2.pointerType;
    if (!local.disabled && e2.pointerType !== "touch" && e2.button === 0) {
      handleClick();
    }
  };
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    if (!local.disabled) {
      if (e2.currentTarget.dataset.pointerType === "touch")
        handleClick();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (local.disabled) {
      return;
    }
    if (isNativeLink()) {
      switch (e2.key) {
        case "Enter":
        case " ":
          return;
      }
    }
    switch (e2.key) {
      case "Enter":
      case " ":
      case MENU_KEYS.first(rootContext.orientation()):
        e2.stopPropagation();
        e2.preventDefault();
        scrollIntoViewport(e2.currentTarget);
        context.open("first");
        optionalMenubarContext == null ? void 0 : optionalMenubarContext.setAutoFocusMenu(true);
        optionalMenubarContext == null ? void 0 : optionalMenubarContext.setValue(key);
        break;
      case MENU_KEYS.last(rootContext.orientation()):
        e2.stopPropagation();
        e2.preventDefault();
        context.open("last");
        break;
      case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
        if (optionalMenubarContext === void 0)
          break;
        e2.stopPropagation();
        e2.preventDefault();
        optionalMenubarContext.nextMenu();
        break;
      case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
        if (optionalMenubarContext === void 0)
          break;
        e2.stopPropagation();
        e2.preventDefault();
        optionalMenubarContext.previousMenu();
        break;
    }
  };
  const onMouseOver = (e2) => {
    var _a;
    callHandler(e2, local.onMouseOver);
    if (((_a = context.triggerRef()) == null ? void 0 : _a.dataset.pointerType) === "touch")
      return;
    if (!local.disabled && optionalMenubarContext !== void 0 && optionalMenubarContext.value() !== void 0) {
      optionalMenubarContext.setValue(key);
    }
  };
  const onFocus = (e2) => {
    callHandler(e2, local.onFocus);
    if (optionalMenubarContext !== void 0 && e2.currentTarget.dataset.pointerType !== "touch")
      optionalMenubarContext.setValue(key);
  };
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  return createComponent(ButtonRoot, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs(context.setTriggerRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get ["data-kb-menu-value-trigger"]() {
      return rootContext.value();
    },
    get id() {
      return local.id;
    },
    get disabled() {
      return local.disabled;
    },
    "aria-haspopup": "true",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return createMemo(() => !!context.isOpen())() ? context.contentId() : void 0;
    },
    get ["data-highlighted"]() {
      return key() !== void 0 && (optionalMenubarContext == null ? void 0 : optionalMenubarContext.value()) === key() ? true : void 0;
    },
    get tabIndex() {
      return optionalMenubarContext !== void 0 ? optionalMenubarContext.value() === key() || optionalMenubarContext.lastValue() === key() ? 0 : -1 : void 0;
    },
    onPointerDown,
    onMouseOver,
    onClick,
    onKeyDown,
    onFocus,
    role: optionalMenubarContext !== void 0 ? "menuitem" : void 0
  }, () => context.dataset(), others));
}
var NavigationMenuContext = createContext();
function useOptionalNavigationMenuContext() {
  return useContext(NavigationMenuContext);
}
function MenuContentBase(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const {
    direction
  } = useLocale();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`content-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "style", "onOpenAutoFocus", "onCloseAutoFocus", "onEscapeKeyDown", "onFocusOutside", "onPointerEnter", "onPointerMove", "onKeyDown", "onMouseDown", "onFocusIn", "onFocusOut"]);
  let lastPointerX = 0;
  const isRootModalContent = () => {
    return context.parentMenuContext() == null && optionalMenubarContext === void 0 && rootContext.isModal();
  };
  const selectableList = createSelectableList({
    selectionManager: context.listState().selectionManager,
    collection: context.listState().collection,
    autoFocus: context.autoFocus,
    deferAutoFocus: true,
    // ensure all menu items are mounted and collection is not empty before trying to autofocus.
    shouldFocusWrap: true,
    disallowTypeAhead: () => !context.listState().selectionManager().isFocused(),
    orientation: () => rootContext.orientation() === "horizontal" ? "vertical" : "horizontal"
  }, () => ref);
  createFocusScope({
    trapFocus: () => isRootModalContent() && context.isOpen(),
    onMountAutoFocus: (event) => {
      var _a;
      if (optionalMenubarContext === void 0)
        (_a = local.onOpenAutoFocus) == null ? void 0 : _a.call(local, event);
    },
    onUnmountAutoFocus: local.onCloseAutoFocus
  }, () => ref);
  const onKeyDown = (e2) => {
    if (!contains(e2.currentTarget, e2.target)) {
      return;
    }
    if (e2.key === "Tab" && context.isOpen()) {
      e2.preventDefault();
    }
    if (optionalMenubarContext !== void 0) {
      if (e2.currentTarget.getAttribute("aria-haspopup") !== "true")
        switch (e2.key) {
          case MENUBAR_KEYS.next(direction(), rootContext.orientation()):
            e2.stopPropagation();
            e2.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.nextMenu();
            break;
          case MENUBAR_KEYS.previous(direction(), rootContext.orientation()):
            if (e2.currentTarget.hasAttribute("data-closed"))
              break;
            e2.stopPropagation();
            e2.preventDefault();
            context.close(true);
            optionalMenubarContext.setAutoFocusMenu(true);
            optionalMenubarContext.previousMenu();
            break;
        }
    }
  };
  const onEscapeKeyDown = (e2) => {
    var _a;
    (_a = local.onEscapeKeyDown) == null ? void 0 : _a.call(local, e2);
    optionalMenubarContext == null ? void 0 : optionalMenubarContext.setAutoFocusMenu(false);
    context.close(true);
  };
  const onFocusOutside = (e2) => {
    var _a;
    (_a = local.onFocusOutside) == null ? void 0 : _a.call(local, e2);
    if (rootContext.isModal()) {
      e2.preventDefault();
    }
  };
  const onPointerEnter = (e2) => {
    var _a, _b;
    callHandler(e2, local.onPointerEnter);
    if (!context.isOpen()) {
      return;
    }
    (_a = context.parentMenuContext()) == null ? void 0 : _a.listState().selectionManager().setFocused(false);
    (_b = context.parentMenuContext()) == null ? void 0 : _b.listState().selectionManager().setFocusedKey(void 0);
  };
  const onPointerMove = (e2) => {
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    const target = e2.target;
    const pointerXHasChanged = lastPointerX !== e2.clientX;
    if (contains(e2.currentTarget, target) && pointerXHasChanged) {
      context.setPointerDir(e2.clientX > lastPointerX ? "right" : "left");
      lastPointerX = e2.clientX;
    }
  };
  createEffect(() => onCleanup(context.registerContentId(local.id)));
  const commonAttributes = {
    ref: mergeRefs((el) => {
      context.setContentRef(el);
      ref = el;
    }, local.ref),
    role: "menu",
    get id() {
      return local.id;
    },
    get tabIndex() {
      return selectableList.tabIndex();
    },
    get "aria-labelledby"() {
      return context.triggerId();
    },
    onKeyDown: composeEventHandlers([local.onKeyDown, selectableList.onKeyDown, onKeyDown]),
    onMouseDown: composeEventHandlers([local.onMouseDown, selectableList.onMouseDown]),
    onFocusIn: composeEventHandlers([local.onFocusIn, selectableList.onFocusIn]),
    onFocusOut: composeEventHandlers([local.onFocusOut, selectableList.onFocusOut]),
    onPointerEnter,
    onPointerMove,
    get "data-orientation"() {
      return rootContext.orientation();
    }
  };
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Show, {
        get when() {
          return optionalNavigationMenuContext === void 0 || context.parentMenuContext() != null;
        },
        get fallback() {
          return createComponent(Polymorphic, mergeProps({
            as: "div"
          }, () => context.dataset(), commonAttributes, others));
        },
        get children() {
          return createComponent(Popper.Positioner, {
            get children() {
              return createComponent(DismissableLayer, mergeProps({
                get disableOutsidePointerEvents() {
                  return createMemo(() => !!isRootModalContent())() && context.isOpen();
                },
                get excludedElements() {
                  return [context.triggerRef];
                },
                bypassTopMostLayerCheck: true,
                get style() {
                  return combineStyle({
                    "--kb-menu-content-transform-origin": "var(--kb-popper-content-transform-origin)",
                    position: "relative"
                  }, local.style);
                },
                onEscapeKeyDown,
                onFocusOutside,
                get onDismiss() {
                  return context.close;
                }
              }, () => context.dataset(), commonAttributes, others));
            }
          });
        }
      });
    }
  });
}
function MenuContent(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["ref"]);
  src_default2({
    element: () => ref ?? null,
    enabled: () => context.contentPresent() && rootContext.preventScroll()
  });
  return createComponent(MenuContentBase, mergeProps({
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    }
  }, others));
}
var MenuGroupContext = createContext();
function useMenuGroupContext() {
  const context = useContext(MenuGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuGroupContext` must be used within a `Menu.Group` component");
  }
  return context;
}
function MenuGroup(props) {
  const rootContext = useMenuRootContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`group-${createUniqueId()}`)
  }, props);
  const [labelId, setLabelId] = createSignal();
  const context = {
    generateId: createGenerateId(() => mergedProps.id),
    registerLabelId: createRegisterId(setLabelId)
  };
  return createComponent(MenuGroupContext.Provider, {
    value: context,
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div",
        role: "group",
        get ["aria-labelledby"]() {
          return labelId();
        }
      }, mergedProps));
    }
  });
}
function MenuGroupLabel(props) {
  const context = useMenuGroupContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerLabelId(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    get id() {
      return local.id;
    },
    "aria-hidden": "true"
  }, others));
}
function MenuIcon(props) {
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps({
    children: "▼"
  }, props);
  return createComponent(Polymorphic, mergeProps({
    as: "span",
    "aria-hidden": "true"
  }, () => context.dataset(), mergedProps));
}
function MenuItem(props) {
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitem",
    closeOnSelect: true
  }, props));
}
function MenuItemDescription(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("description")
  }, props);
  const [local, others] = splitProps(mergedProps, ["id"]);
  createEffect(() => onCleanup(context.registerDescription(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function MenuItemIndicator(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("indicator")
  }, props);
  const [local, others] = splitProps(mergedProps, ["forceMount"]);
  return createComponent(Show, {
    get when() {
      return local.forceMount || context.isChecked();
    },
    get children() {
      return createComponent(Polymorphic, mergeProps({
        as: "div"
      }, () => context.dataset(), others));
    }
  });
}
function MenuItemLabel(props) {
  const context = useMenuItemContext();
  const mergedProps = mergeDefaultProps({
    id: context.generateId("label")
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id"]);
  createEffect(() => onCleanup(context.registerLabel(local.id)));
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs(context.setLabelRef, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    }
  }, () => context.dataset(), others));
}
function MenuPortal(props) {
  const context = useMenuContext();
  return createComponent(Show, {
    get when() {
      return context.contentPresent();
    },
    get children() {
      return createComponent(Portal, props);
    }
  });
}
var MenuRadioGroupContext = createContext();
function useMenuRadioGroupContext() {
  const context = useContext(MenuRadioGroupContext);
  if (context === void 0) {
    throw new Error("[kobalte]: `useMenuRadioGroupContext` must be used within a `Menu.RadioGroup` component");
  }
  return context;
}
function MenuRadioGroup(props) {
  const rootContext = useMenuRootContext();
  const defaultId = rootContext.generateId(`radiogroup-${createUniqueId()}`);
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "defaultValue", "onChange", "disabled"]);
  const [selected, setSelected] = createControllableSignal({
    value: () => local.value,
    defaultValue: () => local.defaultValue,
    onChange: (value) => {
      var _a;
      return (_a = local.onChange) == null ? void 0 : _a.call(local, value);
    }
  });
  const context = {
    isDisabled: () => local.disabled,
    isSelectedValue: (value) => value === selected(),
    setSelectedValue: setSelected
  };
  return createComponent(MenuRadioGroupContext.Provider, {
    value: context,
    get children() {
      return createComponent(MenuGroup, others);
    }
  });
}
function MenuRadioItem(props) {
  const context = useMenuRadioGroupContext();
  const mergedProps = mergeDefaultProps({
    closeOnSelect: false
  }, props);
  const [local, others] = splitProps(mergedProps, ["value", "onSelect"]);
  const onSelect = () => {
    var _a;
    (_a = local.onSelect) == null ? void 0 : _a.call(local);
    context.setSelectedValue(local.value);
  };
  return createComponent(MenuItemBase, mergeProps({
    role: "menuitemradio",
    get checked() {
      return context.isSelectedValue(local.value);
    },
    onSelect
  }, others));
}
function getPointerGraceArea(placement, event, contentEl) {
  const basePlacement = placement.split("-")[0];
  const contentRect = contentEl.getBoundingClientRect();
  const polygon = [];
  const pointerX = event.clientX;
  const pointerY = event.clientY;
  switch (basePlacement) {
    case "top":
      polygon.push([pointerX, pointerY + 5]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      break;
    case "right":
      polygon.push([pointerX - 5, pointerY]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      break;
    case "bottom":
      polygon.push([pointerX, pointerY - 5]);
      polygon.push([contentRect.right, contentRect.top]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      break;
    case "left":
      polygon.push([pointerX + 5, pointerY]);
      polygon.push([contentRect.right, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.bottom]);
      polygon.push([contentRect.left, contentRect.top]);
      polygon.push([contentRect.right, contentRect.top]);
      break;
  }
  return polygon;
}
function isPointerInGraceArea(event, area) {
  if (!area) {
    return false;
  }
  return isPointInPolygon([event.clientX, event.clientY], area);
}
function Menu(props) {
  const rootContext = useMenuRootContext();
  const parentDomCollectionContext = useOptionalDomCollectionContext();
  const parentMenuContext = useOptionalMenuContext();
  const optionalMenubarContext = useOptionalMenubarContext();
  const optionalNavigationMenuContext = useOptionalNavigationMenuContext();
  const mergedProps = mergeDefaultProps({
    placement: rootContext.orientation() === "horizontal" ? "bottom-start" : "right-start"
  }, props);
  const [local, others] = splitProps(mergedProps, ["open", "defaultOpen", "onOpenChange"]);
  let pointerGraceTimeoutId = 0;
  let pointerGraceIntent = null;
  let pointerDir = "right";
  const [triggerId, setTriggerId] = createSignal();
  const [contentId, setContentId] = createSignal();
  const [triggerRef, setTriggerRef] = createSignal();
  const [contentRef, setContentRef] = createSignal();
  const [focusStrategy, setFocusStrategy] = createSignal(true);
  const [currentPlacement, setCurrentPlacement] = createSignal(others.placement);
  const [nestedMenus, setNestedMenus] = createSignal([]);
  const [items, setItems] = createSignal([]);
  const {
    DomCollectionProvider
  } = createDomCollection({
    items,
    onItemsChange: setItems
  });
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => {
      var _a;
      return (_a = local.onOpenChange) == null ? void 0 : _a.call(local, isOpen);
    }
  });
  const {
    present: contentPresent
  } = src_default({
    show: () => rootContext.forceMount() || disclosureState.isOpen(),
    element: () => contentRef() ?? null
  });
  const listState = createListState({
    selectionMode: "none",
    dataSource: items
  });
  const open = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.open();
  };
  const close = (recursively = false) => {
    disclosureState.close();
    if (recursively && parentMenuContext) {
      parentMenuContext.close(true);
    }
  };
  const toggle = (focusStrategy2) => {
    setFocusStrategy(focusStrategy2);
    disclosureState.toggle();
  };
  const _focusContent = () => {
    const content = contentRef();
    if (content) {
      focusWithoutScrolling(content);
      listState.selectionManager().setFocused(true);
      listState.selectionManager().setFocusedKey(void 0);
    }
  };
  const focusContent = () => {
    if (optionalNavigationMenuContext != null)
      setTimeout(() => _focusContent());
    else
      _focusContent();
  };
  const registerNestedMenu = (element) => {
    setNestedMenus((prev) => [...prev, element]);
    const parentUnregister = parentMenuContext == null ? void 0 : parentMenuContext.registerNestedMenu(element);
    return () => {
      setNestedMenus((prev) => removeItemFromArray(prev, element));
      parentUnregister == null ? void 0 : parentUnregister();
    };
  };
  const isPointerMovingToSubmenu = (e2) => {
    const isMovingTowards = pointerDir === (pointerGraceIntent == null ? void 0 : pointerGraceIntent.side);
    return isMovingTowards && isPointerInGraceArea(e2, pointerGraceIntent == null ? void 0 : pointerGraceIntent.area);
  };
  const onItemEnter = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      e2.preventDefault();
    }
  };
  const onItemLeave = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      return;
    }
    focusContent();
  };
  const onTriggerLeave = (e2) => {
    if (isPointerMovingToSubmenu(e2)) {
      e2.preventDefault();
    }
  };
  createHideOutside({
    isDisabled: () => {
      return !(parentMenuContext == null && disclosureState.isOpen() && rootContext.isModal());
    },
    targets: () => [contentRef(), ...nestedMenus()].filter(Boolean)
  });
  createEffect(() => {
    const contentEl = contentRef();
    if (!contentEl || !parentMenuContext) {
      return;
    }
    const parentUnregister = parentMenuContext.registerNestedMenu(contentEl);
    onCleanup(() => {
      parentUnregister();
    });
  });
  createEffect(() => {
    if (parentMenuContext !== void 0)
      return;
    optionalMenubarContext == null ? void 0 : optionalMenubarContext.registerMenu(rootContext.value(), [contentRef(), ...nestedMenus()]);
  });
  createEffect(() => {
    var _a;
    if (parentMenuContext !== void 0 || optionalMenubarContext === void 0)
      return;
    if (optionalMenubarContext.value() === rootContext.value()) {
      (_a = triggerRef()) == null ? void 0 : _a.focus();
      if (optionalMenubarContext.autoFocusMenu())
        open(true);
    } else
      close();
  });
  createEffect(() => {
    if (parentMenuContext !== void 0 || optionalMenubarContext === void 0)
      return;
    if (disclosureState.isOpen())
      optionalMenubarContext.setValue(rootContext.value());
  });
  onCleanup(() => {
    if (parentMenuContext !== void 0)
      return;
    optionalMenubarContext == null ? void 0 : optionalMenubarContext.unregisterMenu(rootContext.value());
  });
  const dataset = createMemo(() => ({
    "data-expanded": disclosureState.isOpen() ? "" : void 0,
    "data-closed": !disclosureState.isOpen() ? "" : void 0
  }));
  const context = {
    dataset,
    isOpen: disclosureState.isOpen,
    contentPresent,
    nestedMenus,
    currentPlacement,
    pointerGraceTimeoutId: () => pointerGraceTimeoutId,
    autoFocus: focusStrategy,
    listState: () => listState,
    parentMenuContext: () => parentMenuContext,
    triggerRef,
    contentRef,
    triggerId,
    contentId,
    setTriggerRef,
    setContentRef,
    open,
    close,
    toggle,
    focusContent,
    onItemEnter,
    onItemLeave,
    onTriggerLeave,
    setPointerDir: (dir) => pointerDir = dir,
    setPointerGraceTimeoutId: (id) => pointerGraceTimeoutId = id,
    setPointerGraceIntent: (intent) => pointerGraceIntent = intent,
    registerNestedMenu,
    registerItemToParentDomCollection: parentDomCollectionContext == null ? void 0 : parentDomCollectionContext.registerItem,
    registerTriggerId: createRegisterId(setTriggerId),
    registerContentId: createRegisterId(setContentId)
  };
  return createComponent(DomCollectionProvider, {
    get children() {
      return createComponent(MenuContext.Provider, {
        value: context,
        get children() {
          return createComponent(Show, {
            when: optionalNavigationMenuContext === void 0,
            get fallback() {
              return others.children;
            },
            get children() {
              return createComponent(Popper, mergeProps({
                anchorRef: triggerRef,
                contentRef,
                onCurrentPlacementChange: setCurrentPlacement
              }, others));
            }
          });
        }
      });
    }
  });
}
function MenuSub(props) {
  const {
    direction
  } = useLocale();
  return createComponent(Menu, mergeProps({
    get placement() {
      return direction() === "rtl" ? "left-start" : "right-start";
    },
    flip: true
  }, props));
}
var SUB_CLOSE_KEYS = {
  close: (dir, orientation) => {
    if (dir === "ltr") {
      return [orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
    }
    return [orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
  }
};
function MenuSubContent(props) {
  const context = useMenuContext();
  const rootContext = useMenuRootContext();
  const [local, others] = splitProps(props, ["onFocusOutside", "onKeyDown"]);
  const {
    direction
  } = useLocale();
  const onOpenAutoFocus = (e2) => {
    e2.preventDefault();
  };
  const onCloseAutoFocus = (e2) => {
    e2.preventDefault();
  };
  const onFocusOutside = (e2) => {
    var _a;
    (_a = local.onFocusOutside) == null ? void 0 : _a.call(local, e2);
    const target = e2.target;
    if (!contains(context.triggerRef(), target)) {
      context.close();
    }
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    const isKeyDownInside = contains(e2.currentTarget, e2.target);
    const isCloseKey = SUB_CLOSE_KEYS.close(direction(), rootContext.orientation()).includes(e2.key);
    const isSubMenu = context.parentMenuContext() != null;
    if (isKeyDownInside && isCloseKey && isSubMenu) {
      context.close();
      focusWithoutScrolling(context.triggerRef());
    }
  };
  return createComponent(MenuContentBase, mergeProps({
    onOpenAutoFocus,
    onCloseAutoFocus,
    onFocusOutside,
    onKeyDown
  }, others));
}
var SELECTION_KEYS = ["Enter", " "];
var SUB_OPEN_KEYS = {
  open: (dir, orientation) => {
    if (dir === "ltr") {
      return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowRight" : "ArrowDown"];
    }
    return [...SELECTION_KEYS, orientation === "horizontal" ? "ArrowLeft" : "ArrowUp"];
  }
};
function MenuSubTrigger(props) {
  let ref;
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const mergedProps = mergeDefaultProps({
    id: rootContext.generateId(`sub-trigger-${createUniqueId()}`)
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "id", "textValue", "disabled", "onPointerMove", "onPointerLeave", "onPointerDown", "onPointerUp", "onClick", "onKeyDown", "onMouseDown", "onFocus"]);
  let openTimeoutId = null;
  const clearOpenTimeout = () => {
    if (openTimeoutId) {
      window.clearTimeout(openTimeoutId);
    }
    openTimeoutId = null;
  };
  const {
    direction
  } = useLocale();
  const key = () => local.id;
  const parentSelectionManager = () => {
    const parentMenuContext = context.parentMenuContext();
    if (parentMenuContext == null) {
      throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
    }
    return parentMenuContext.listState().selectionManager();
  };
  const collection = () => context.listState().collection();
  const isHighlighted = () => parentSelectionManager().focusedKey() === key();
  const selectableItem = createSelectableItem({
    key,
    selectionManager: parentSelectionManager,
    shouldSelectOnPressUp: true,
    allowsDifferentPressOrigin: true,
    disabled: () => local.disabled
  }, () => ref);
  const onClick = (e2) => {
    callHandler(e2, local.onClick);
    if (!context.isOpen() && !local.disabled) {
      context.open(true);
    }
  };
  const onPointerMove = (e2) => {
    var _a;
    callHandler(e2, local.onPointerMove);
    if (e2.pointerType !== "mouse") {
      return;
    }
    const parentMenuContext = context.parentMenuContext();
    parentMenuContext == null ? void 0 : parentMenuContext.onItemEnter(e2);
    if (e2.defaultPrevented) {
      return;
    }
    if (local.disabled) {
      parentMenuContext == null ? void 0 : parentMenuContext.onItemLeave(e2);
      return;
    }
    if (!context.isOpen() && !openTimeoutId) {
      (_a = context.parentMenuContext()) == null ? void 0 : _a.setPointerGraceIntent(null);
      openTimeoutId = window.setTimeout(() => {
        context.open(false);
        clearOpenTimeout();
      }, 100);
    }
    parentMenuContext == null ? void 0 : parentMenuContext.onItemEnter(e2);
    if (!e2.defaultPrevented) {
      if (context.listState().selectionManager().isFocused()) {
        context.listState().selectionManager().setFocused(false);
        context.listState().selectionManager().setFocusedKey(void 0);
      }
      focusWithoutScrolling(e2.currentTarget);
      parentMenuContext == null ? void 0 : parentMenuContext.listState().selectionManager().setFocused(true);
      parentMenuContext == null ? void 0 : parentMenuContext.listState().selectionManager().setFocusedKey(key());
    }
  };
  const onPointerLeave = (e2) => {
    callHandler(e2, local.onPointerLeave);
    if (e2.pointerType !== "mouse") {
      return;
    }
    clearOpenTimeout();
    const parentMenuContext = context.parentMenuContext();
    const contentEl = context.contentRef();
    if (contentEl) {
      parentMenuContext == null ? void 0 : parentMenuContext.setPointerGraceIntent({
        area: getPointerGraceArea(context.currentPlacement(), e2, contentEl),
        // Safe because sub menu always open "left" or "right".
        side: context.currentPlacement().split("-")[0]
      });
      window.clearTimeout(parentMenuContext == null ? void 0 : parentMenuContext.pointerGraceTimeoutId());
      const pointerGraceTimeoutId = window.setTimeout(() => {
        parentMenuContext == null ? void 0 : parentMenuContext.setPointerGraceIntent(null);
      }, 300);
      parentMenuContext == null ? void 0 : parentMenuContext.setPointerGraceTimeoutId(pointerGraceTimeoutId);
    } else {
      parentMenuContext == null ? void 0 : parentMenuContext.onTriggerLeave(e2);
      if (e2.defaultPrevented) {
        return;
      }
      parentMenuContext == null ? void 0 : parentMenuContext.setPointerGraceIntent(null);
    }
    parentMenuContext == null ? void 0 : parentMenuContext.onItemLeave(e2);
  };
  const onKeyDown = (e2) => {
    callHandler(e2, local.onKeyDown);
    if (e2.repeat) {
      return;
    }
    if (local.disabled) {
      return;
    }
    if (SUB_OPEN_KEYS.open(direction(), rootContext.orientation()).includes(e2.key)) {
      e2.stopPropagation();
      e2.preventDefault();
      parentSelectionManager().setFocused(false);
      parentSelectionManager().setFocusedKey(void 0);
      if (!context.isOpen()) {
        context.open("first");
      }
      context.focusContent();
      context.listState().selectionManager().setFocused(true);
      context.listState().selectionManager().setFocusedKey(collection().getFirstKey());
    }
  };
  createEffect(() => {
    if (context.registerItemToParentDomCollection == null) {
      throw new Error("[kobalte]: `Menu.SubTrigger` must be used within a `Menu.Sub` component");
    }
    const unregister = context.registerItemToParentDomCollection({
      ref: () => ref,
      type: "item",
      key: key(),
      textValue: local.textValue ?? (ref == null ? void 0 : ref.textContent) ?? "",
      disabled: local.disabled ?? false
    });
    onCleanup(unregister);
  });
  createEffect(on(() => {
    var _a;
    return (_a = context.parentMenuContext()) == null ? void 0 : _a.pointerGraceTimeoutId();
  }, (pointerGraceTimer) => {
    onCleanup(() => {
      var _a;
      window.clearTimeout(pointerGraceTimer);
      (_a = context.parentMenuContext()) == null ? void 0 : _a.setPointerGraceIntent(null);
    });
  }));
  createEffect(() => onCleanup(context.registerTriggerId(local.id)));
  onCleanup(() => {
    clearOpenTimeout();
  });
  return createComponent(Polymorphic, mergeProps({
    as: "div",
    ref(r$) {
      const _ref$ = mergeRefs((el) => {
        context.setTriggerRef(el);
        ref = el;
      }, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get id() {
      return local.id;
    },
    role: "menuitem",
    get tabIndex() {
      return selectableItem.tabIndex();
    },
    "aria-haspopup": "true",
    get ["aria-expanded"]() {
      return context.isOpen();
    },
    get ["aria-controls"]() {
      return createMemo(() => !!context.isOpen())() ? context.contentId() : void 0;
    },
    get ["aria-disabled"]() {
      return local.disabled;
    },
    get ["data-key"]() {
      return selectableItem.dataKey();
    },
    get ["data-highlighted"]() {
      return isHighlighted() ? "" : void 0;
    },
    get ["data-disabled"]() {
      return local.disabled ? "" : void 0;
    },
    get onPointerDown() {
      return composeEventHandlers([local.onPointerDown, selectableItem.onPointerDown]);
    },
    get onPointerUp() {
      return composeEventHandlers([local.onPointerUp, selectableItem.onPointerUp]);
    },
    get onClick() {
      return composeEventHandlers([onClick, selectableItem.onClick]);
    },
    get onKeyDown() {
      return composeEventHandlers([onKeyDown, selectableItem.onKeyDown]);
    },
    get onMouseDown() {
      return composeEventHandlers([local.onMouseDown, selectableItem.onMouseDown]);
    },
    get onFocus() {
      return composeEventHandlers([local.onFocus, selectableItem.onFocus]);
    },
    onPointerMove,
    onPointerLeave
  }, () => context.dataset(), others));
}
function MenuRoot(props) {
  const optionalMenubarContext = useOptionalMenubarContext();
  const defaultId = `menu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId,
    modal: true
  }, props);
  const [local, others] = splitProps(mergedProps, ["id", "modal", "preventScroll", "forceMount", "open", "defaultOpen", "onOpenChange", "value", "orientation"]);
  const disclosureState = createDisclosureState({
    open: () => local.open,
    defaultOpen: () => local.defaultOpen,
    onOpenChange: (isOpen) => {
      var _a;
      return (_a = local.onOpenChange) == null ? void 0 : _a.call(local, isOpen);
    }
  });
  const context = {
    isModal: () => local.modal ?? true,
    preventScroll: () => local.preventScroll ?? context.isModal(),
    forceMount: () => local.forceMount ?? false,
    generateId: createGenerateId(() => local.id),
    value: () => local.value,
    orientation: () => local.orientation ?? (optionalMenubarContext == null ? void 0 : optionalMenubarContext.orientation()) ?? "horizontal"
  };
  return createComponent(MenuRootContext.Provider, {
    value: context,
    get children() {
      return createComponent(Menu, mergeProps({
        get open() {
          return disclosureState.isOpen();
        },
        get onOpenChange() {
          return disclosureState.setIsOpen;
        }
      }, others));
    }
  });
}
var separator_exports = {};
__export(separator_exports, {
  Root: () => SeparatorRoot,
  Separator: () => Separator
});
function SeparatorRoot(props) {
  let ref;
  const mergedProps = mergeDefaultProps({
    orientation: "horizontal"
  }, props);
  const [local, others] = splitProps(mergedProps, ["ref", "orientation"]);
  const tagName = createTagName(() => ref, () => "hr");
  return createComponent(Polymorphic, mergeProps({
    as: "hr",
    ref(r$) {
      const _ref$ = mergeRefs((el) => ref = el, local.ref);
      typeof _ref$ === "function" && _ref$(r$);
    },
    get role() {
      return tagName() !== "hr" ? "separator" : void 0;
    },
    get ["aria-orientation"]() {
      return local.orientation === "vertical" ? "vertical" : void 0;
    },
    get ["data-orientation"]() {
      return local.orientation;
    }
  }, others));
}
var Separator = SeparatorRoot;
var dropdown_menu_exports = {};
__export(dropdown_menu_exports, {
  Arrow: () => PopperArrow,
  CheckboxItem: () => MenuCheckboxItem,
  Content: () => DropdownMenuContent,
  DropdownMenu: () => DropdownMenu,
  Group: () => MenuGroup,
  GroupLabel: () => MenuGroupLabel,
  Icon: () => MenuIcon,
  Item: () => MenuItem,
  ItemDescription: () => MenuItemDescription,
  ItemIndicator: () => MenuItemIndicator,
  ItemLabel: () => MenuItemLabel,
  Portal: () => MenuPortal,
  RadioGroup: () => MenuRadioGroup,
  RadioItem: () => MenuRadioItem,
  Root: () => DropdownMenuRoot,
  Separator: () => SeparatorRoot,
  Sub: () => MenuSub,
  SubContent: () => MenuSubContent,
  SubTrigger: () => MenuSubTrigger,
  Trigger: () => MenuTrigger
});
function DropdownMenuContent(props) {
  const rootContext = useMenuRootContext();
  const context = useMenuContext();
  const [local, others] = splitProps(props, ["onCloseAutoFocus", "onInteractOutside"]);
  let hasInteractedOutside = false;
  const onCloseAutoFocus = (e2) => {
    var _a;
    (_a = local.onCloseAutoFocus) == null ? void 0 : _a.call(local, e2);
    if (!hasInteractedOutside) {
      focusWithoutScrolling(context.triggerRef());
    }
    hasInteractedOutside = false;
    e2.preventDefault();
  };
  const onInteractOutside = (e2) => {
    var _a;
    (_a = local.onInteractOutside) == null ? void 0 : _a.call(local, e2);
    if (!rootContext.isModal() || e2.detail.isContextMenu) {
      hasInteractedOutside = true;
    }
  };
  return createComponent(MenuContent, mergeProps({
    onCloseAutoFocus,
    onInteractOutside
  }, others));
}
function DropdownMenuRoot(props) {
  const defaultId = `dropdownmenu-${createUniqueId()}`;
  const mergedProps = mergeDefaultProps({
    id: defaultId
  }, props);
  return createComponent(MenuRoot, mergedProps);
}
var DropdownMenu = Object.assign(DropdownMenuRoot, {
  Arrow: PopperArrow,
  CheckboxItem: MenuCheckboxItem,
  Content: DropdownMenuContent,
  Group: MenuGroup,
  GroupLabel: MenuGroupLabel,
  Icon: MenuIcon,
  Item: MenuItem,
  ItemDescription: MenuItemDescription,
  ItemIndicator: MenuItemIndicator,
  ItemLabel: MenuItemLabel,
  Portal: MenuPortal,
  RadioGroup: MenuRadioGroup,
  RadioItem: MenuRadioItem,
  Separator: SeparatorRoot,
  Sub: MenuSub,
  SubContent: MenuSubContent,
  SubTrigger: MenuSubTrigger,
  Trigger: MenuTrigger
});
var tokens = {
  colors: {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    neutral: {
      50: "#f9fafb",
      100: "#f2f4f7",
      200: "#eaecf0",
      300: "#d0d5dd",
      400: "#98a2b3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1d2939",
      900: "#101828"
    },
    darkGray: {
      50: "#525c7a",
      100: "#49536e",
      200: "#414962",
      300: "#394056",
      400: "#313749",
      500: "#292e3d",
      600: "#212530",
      700: "#191c24",
      800: "#111318",
      900: "#0b0d10"
    },
    gray: {
      50: "#f9fafb",
      100: "#f2f4f7",
      200: "#eaecf0",
      300: "#d0d5dd",
      400: "#98a2b3",
      500: "#667085",
      600: "#475467",
      700: "#344054",
      800: "#1d2939",
      900: "#101828"
    },
    blue: {
      25: "#F5FAFF",
      50: "#EFF8FF",
      100: "#D1E9FF",
      200: "#B2DDFF",
      300: "#84CAFF",
      400: "#53B1FD",
      500: "#2E90FA",
      600: "#1570EF",
      700: "#175CD3",
      800: "#1849A9",
      900: "#194185"
    },
    green: {
      25: "#F6FEF9",
      50: "#ECFDF3",
      100: "#D1FADF",
      200: "#A6F4C5",
      300: "#6CE9A6",
      400: "#32D583",
      500: "#12B76A",
      600: "#039855",
      700: "#027A48",
      800: "#05603A",
      900: "#054F31"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a"
    },
    yellow: {
      25: "#FFFCF5",
      50: "#FFFAEB",
      100: "#FEF0C7",
      200: "#FEDF89",
      300: "#FEC84B",
      400: "#FDB022",
      500: "#F79009",
      600: "#DC6803",
      700: "#B54708",
      800: "#93370D",
      900: "#7A2E0E"
    },
    purple: {
      25: "#FAFAFF",
      50: "#F4F3FF",
      100: "#EBE9FE",
      200: "#D9D6FE",
      300: "#BDB4FE",
      400: "#9B8AFB",
      500: "#7A5AF8",
      600: "#6938EF",
      700: "#5925DC",
      800: "#4A1FB8",
      900: "#3E1C96"
    },
    teal: {
      25: "#F6FEFC",
      50: "#F0FDF9",
      100: "#CCFBEF",
      200: "#99F6E0",
      300: "#5FE9D0",
      400: "#2ED3B7",
      500: "#15B79E",
      600: "#0E9384",
      700: "#107569",
      800: "#125D56",
      900: "#134E48"
    },
    pink: {
      25: "#fdf2f8",
      50: "#fce7f3",
      100: "#fbcfe8",
      200: "#f9a8d4",
      300: "#f472b6",
      400: "#ec4899",
      500: "#db2777",
      600: "#be185d",
      700: "#9d174d",
      800: "#831843",
      900: "#500724"
    },
    cyan: {
      25: "#ecfeff",
      50: "#cffafe",
      100: "#a5f3fc",
      200: "#67e8f9",
      300: "#22d3ee",
      400: "#06b6d4",
      500: "#0891b2",
      600: "#0e7490",
      700: "#155e75",
      800: "#164e63",
      900: "#083344"
    }
  },
  alpha: {
    90: "e5",
    80: "cc"
  },
  font: {
    size: {
      xs: "calc(var(--tsqd-font-size) * 0.75)",
      sm: "calc(var(--tsqd-font-size) * 0.875)",
      md: "var(--tsqd-font-size)"
    },
    lineHeight: {
      xs: "calc(var(--tsqd-font-size) * 1)",
      sm: "calc(var(--tsqd-font-size) * 1.25)",
      md: "calc(var(--tsqd-font-size) * 1.5)"
    },
    weight: {
      medium: "500",
      semibold: "600",
      bold: "700"
    }
  },
  border: {
    radius: {
      xs: "calc(var(--tsqd-font-size) * 0.125)",
      sm: "calc(var(--tsqd-font-size) * 0.25)",
      full: "9999px"
    }
  },
  size: {
    0.25: "calc(var(--tsqd-font-size) * 0.0625)",
    0.5: "calc(var(--tsqd-font-size) * 0.125)",
    1: "calc(var(--tsqd-font-size) * 0.25)",
    1.5: "calc(var(--tsqd-font-size) * 0.375)",
    2: "calc(var(--tsqd-font-size) * 0.5)",
    2.5: "calc(var(--tsqd-font-size) * 0.625)",
    3: "calc(var(--tsqd-font-size) * 0.75)",
    3.5: "calc(var(--tsqd-font-size) * 0.875)",
    4: "calc(var(--tsqd-font-size) * 1)",
    4.5: "calc(var(--tsqd-font-size) * 1.125)",
    5: "calc(var(--tsqd-font-size) * 1.25)",
    6: "calc(var(--tsqd-font-size) * 1.5)",
    6.5: "calc(var(--tsqd-font-size) * 1.625)",
    14: "calc(var(--tsqd-font-size) * 3.5)"
  },
  shadow: {
    xs: (_ = "rgb(0 0 0 / 0.1)") => `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
    sm: (color = "rgb(0 0 0 / 0.1)") => `0 1px 3px 0 ${color}, 0 1px 2px -1px ${color}`,
    md: (color = "rgb(0 0 0 / 0.1)") => `0 4px 6px -1px ${color}, 0 2px 4px -2px ${color}`,
    lg: (color = "rgb(0 0 0 / 0.1)") => `0 10px 15px -3px ${color}, 0 4px 6px -4px ${color}`,
    xl: (color = "rgb(0 0 0 / 0.1)") => `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`,
    "2xl": (color = "rgb(0 0 0 / 0.25)") => `0 25px 50px -12px ${color}`,
    inner: (color = "rgb(0 0 0 / 0.05)") => `inset 0 2px 4px 0 ${color}`,
    none: () => `none`
  }
};
var _tmpl$2 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 14 14"fill=none xmlns=http://www.w3.org/2000/svg><path d="M13 13L9.00007 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$22 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$3 = /* @__PURE__ */ template(`<svg width=10 height=6 viewBox="0 0 10 6"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L5 5L9 1"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$4 = /* @__PURE__ */ template(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 13.3333V2.66667M8 2.66667L4 6.66667M8 2.66667L12 6.66667"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$5 = /* @__PURE__ */ template(`<svg width=12 height=12 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 2.66667V13.3333M8 13.3333L4 9.33333M8 13.3333L12 9.33333"stroke=currentColor stroke-width=1.66667 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$6 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$7 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M22 15.844a10.424 10.424 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.464 10.464 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$8 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=12 width=12 fill=none xmlns=http://www.w3.org/2000/svg><path d="M8 21h8m-4-4v4m-5.2-4h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 14.72 22 13.88 22 12.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 3 18.88 3 17.2 3H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 5.28 2 6.12 2 7.8v4.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 17 5.12 17 6.8 17Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$9 = /* @__PURE__ */ template(`<svg stroke=currentColor fill=currentColor stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M0 0h24v24H0z"></path><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z">`);
var _tmpl$10 = /* @__PURE__ */ template(`<svg stroke-width=0 viewBox="0 0 24 24"height=1em width=1em xmlns=http://www.w3.org/2000/svg><path fill=none d="M24 .01c0-.01 0-.01 0 0L0 0v24h24V.01zM0 0h24v24H0V0zm0 0h24v24H0V0z"></path><path d="M22.99 9C19.15 5.16 13.8 3.76 8.84 4.78l2.52 2.52c3.47-.17 6.99 1.05 9.63 3.7l2-2zm-4 4a9.793 9.793 0 00-4.49-2.56l3.53 3.53.96-.97zM2 3.05L5.07 6.1C3.6 6.82 2.22 7.78 1 9l1.99 2c1.24-1.24 2.67-2.16 4.2-2.77l2.24 2.24A9.684 9.684 0 005 13v.01L6.99 15a7.042 7.042 0 014.92-2.06L18.98 20l1.27-1.26L3.29 1.79 2 3.05zM9 17l3 3 3-3a4.237 4.237 0 00-6 0z">`);
var _tmpl$11 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.3951 19.3711L9.97955 20.6856C10.1533 21.0768 10.4368 21.4093 10.7958 21.6426C11.1547 21.8759 11.5737 22.0001 12.0018 22C12.4299 22.0001 12.8488 21.8759 13.2078 21.6426C13.5667 21.4093 13.8503 21.0768 14.024 20.6856L14.6084 19.3711C14.8165 18.9047 15.1664 18.5159 15.6084 18.26C16.0532 18.0034 16.5678 17.8941 17.0784 17.9478L18.5084 18.1C18.9341 18.145 19.3637 18.0656 19.7451 17.8713C20.1265 17.6771 20.4434 17.3763 20.6573 17.0056C20.8715 16.635 20.9735 16.2103 20.9511 15.7829C20.9286 15.3555 20.7825 14.9438 20.5307 14.5978L19.684 13.4344C19.3825 13.0171 19.2214 12.5148 19.224 12C19.2239 11.4866 19.3865 10.9864 19.6884 10.5711L20.5351 9.40778C20.787 9.06175 20.933 8.65007 20.9555 8.22267C20.978 7.79528 20.8759 7.37054 20.6618 7C20.4479 6.62923 20.131 6.32849 19.7496 6.13423C19.3681 5.93997 18.9386 5.86053 18.5129 5.90556L17.0829 6.05778C16.5722 6.11141 16.0577 6.00212 15.6129 5.74556C15.17 5.48825 14.82 5.09736 14.6129 4.62889L14.024 3.31444C13.8503 2.92317 13.5667 2.59072 13.2078 2.3574C12.8488 2.12408 12.4299 1.99993 12.0018 2C11.5737 1.99993 11.1547 2.12408 10.7958 2.3574C10.4368 2.59072 10.1533 2.92317 9.97955 3.31444L9.3951 4.62889C9.18803 5.09736 8.83798 5.48825 8.3951 5.74556C7.95032 6.00212 7.43577 6.11141 6.9251 6.05778L5.49066 5.90556C5.06499 5.86053 4.6354 5.93997 4.25397 6.13423C3.87255 6.32849 3.55567 6.62923 3.34177 7C3.12759 7.37054 3.02555 7.79528 3.04804 8.22267C3.07052 8.65007 3.21656 9.06175 3.46844 9.40778L4.3151 10.5711C4.61704 10.9864 4.77964 11.4866 4.77955 12C4.77964 12.5134 4.61704 13.0137 4.3151 13.4289L3.46844 14.5922C3.21656 14.9382 3.07052 15.3499 3.04804 15.7773C3.02555 16.2047 3.12759 16.6295 3.34177 17C3.55589 17.3706 3.8728 17.6712 4.25417 17.8654C4.63554 18.0596 5.06502 18.1392 5.49066 18.0944L6.92066 17.9422C7.43133 17.8886 7.94587 17.9979 8.39066 18.2544C8.83519 18.511 9.18687 18.902 9.3951 19.3711Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><path d="M12 15C13.6568 15 15 13.6569 15 12C15 10.3431 13.6568 9 12 9C10.3431 9 8.99998 10.3431 8.99998 12C8.99998 13.6569 10.3431 15 12 15Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$12 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M16 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V8M11.5 12.5L17 7M17 7H12M17 7V12M6.2 21H8.8C9.9201 21 10.4802 21 10.908 20.782C11.2843 20.5903 11.5903 20.2843 11.782 19.908C12 19.4802 12 18.9201 12 17.8V15.2C12 14.0799 12 13.5198 11.782 13.092C11.5903 12.7157 11.2843 12.4097 10.908 12.218C10.4802 12 9.92011 12 8.8 12H6.2C5.0799 12 4.51984 12 4.09202 12.218C3.71569 12.4097 3.40973 12.7157 3.21799 13.092C3 13.5198 3 14.0799 3 15.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$13 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path class=copier d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round stroke=currentColor>`);
var _tmpl$14 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M2.5 21.4998L8.04927 19.3655C8.40421 19.229 8.58168 19.1607 8.74772 19.0716C8.8952 18.9924 9.0358 18.901 9.16804 18.7984C9.31692 18.6829 9.45137 18.5484 9.72028 18.2795L21 6.99982C22.1046 5.89525 22.1046 4.10438 21 2.99981C19.8955 1.89525 18.1046 1.89524 17 2.99981L5.72028 14.2795C5.45138 14.5484 5.31692 14.6829 5.20139 14.8318C5.09877 14.964 5.0074 15.1046 4.92823 15.2521C4.83911 15.4181 4.77085 15.5956 4.63433 15.9506L2.5 21.4998ZM2.5 21.4998L4.55812 16.1488C4.7054 15.7659 4.77903 15.5744 4.90534 15.4867C5.01572 15.4101 5.1523 15.3811 5.2843 15.4063C5.43533 15.4351 5.58038 15.5802 5.87048 15.8703L8.12957 18.1294C8.41967 18.4195 8.56472 18.5645 8.59356 18.7155C8.61877 18.8475 8.58979 18.9841 8.51314 19.0945C8.42545 19.2208 8.23399 19.2944 7.85107 19.4417L2.5 21.4998Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$15 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$16 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9 9L15 15M15 9L9 15M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"stroke=#F04438 stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$17 = /* @__PURE__ */ template(`<svg width=24 height=24 viewBox="0 0 24 24"fill=none stroke=currentColor stroke-width=2 xmlns=http://www.w3.org/2000/svg><rect class=list width=20 height=20 y=2 x=2 rx=2></rect><line class=list-item y1=7 y2=7 x1=6 x2=18></line><line class=list-item y2=12 y1=12 x1=6 x2=18></line><line class=list-item y1=17 y2=17 x1=6 x2=18>`);
var _tmpl$18 = /* @__PURE__ */ template(`<svg viewBox="0 0 24 24"height=20 width=20 fill=none xmlns=http://www.w3.org/2000/svg><path d="M3 7.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C5.28 3 6.12 3 7.8 3h8.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C21 5.28 21 6.12 21 7.8v8.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.72 21 17.88 21 16.2 21H7.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3 18.72 3 17.88 3 16.2V7.8Z"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$19 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$20 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M12 2V6M12 18V22M6 12H2M22 12H18M19.0784 19.0784L16.25 16.25M19.0784 4.99994L16.25 7.82837M4.92157 19.0784L7.75 16.25M4.92157 4.99994L7.75 7.82837"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round></path><animateTransform attributeName=transform attributeType=XML type=rotate from=0 to=360 dur=2s repeatCount=indefinite>`);
var _tmpl$21 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$222 = /* @__PURE__ */ template(`<svg width=14 height=14 viewBox="0 0 24 24"fill=none xmlns=http://www.w3.org/2000/svg><path d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"stroke=currentColor stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$23 = /* @__PURE__ */ template(`<svg version=1.0 viewBox="0 0 633 633"><linearGradient x1=-666.45 x2=-666.45 y1=163.28 y2=163.99 gradientTransform="matrix(633 0 0 633 422177 -103358)"gradientUnits=userSpaceOnUse><stop stop-color=#6BDAFF offset=0></stop><stop stop-color=#F9FFB5 offset=.32></stop><stop stop-color=#FFA770 offset=.71></stop><stop stop-color=#FF7373 offset=1></stop></linearGradient><circle cx=316.5 cy=316.5 r=316.5></circle><defs><filter x=-137.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=316.5 y=412 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=412 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=610.5 rx=214.5 ry=186 fill=#015064 stroke=#00CFE2 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=316.5 y=450 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=450 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=648.5 rx=214.5 ry=186 fill=#015064 stroke=#00A8B8 stroke-width=25></ellipse></g><defs><filter x=-137.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=-137.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=89.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=316.5 y=486 width=454 height=396.9 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=316.5 y=486 width=454 height=396.9 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><ellipse cx=543.5 cy=684.5 rx=214.5 ry=186 fill=#015064 stroke=#007782 stroke-width=25></ellipse></g><defs><filter x=272.2 y=308 width=176.9 height=129.3 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=272.2 y=308 width=176.9 height=129.3 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><line x1=436 x2=431 y1=403.2 y2=431.8 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=291 x2=280 y1=341.5 y2=403.5 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><line x1=332.9 x2=328.6 y1=384.1 y2=411.2 fill=none stroke=#000 stroke-linecap=round stroke-linejoin=bevel stroke-width=11></line><linearGradient x1=-670.75 x2=-671.59 y1=164.4 y2=164.49 gradientTransform="matrix(-184.16 -32.472 -11.461 64.997 -121359 -32126)"gradientUnits=userSpaceOnUse><stop stop-color=#EE2700 offset=0></stop><stop stop-color=#FF008E offset=1></stop></linearGradient><path d="m344.1 363 97.7 17.2c5.8 2.1 8.2 6.1 7.1 12.1s-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1 0.8-12.8s8.3-4.4 13.7-2.1l55.2 53.6z"clip-rule=evenodd fill-rule=evenodd></path><line x1=428.2 x2=429.1 y1=384.5 y2=378 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=395.2 x2=396.1 y1=379.5 y2=373 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=362.2 x2=363.1 y1=373.5 y2=367.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=324.2 x2=328.4 y1=351.3 y2=347.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line><line x1=303.2 x2=307.4 y1=331.3 y2=327.4 fill=none stroke=#fff stroke-linecap=round stroke-linejoin=bevel stroke-width=7></line></g><defs><filter x=73.2 y=113.8 width=280.6 height=317.4 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=73.2 y=113.8 width=280.6 height=317.4 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-672.16 x2=-672.16 y1=165.03 y2=166.03 gradientTransform="matrix(-100.18 48.861 97.976 200.88 -83342 -93.059)"gradientUnits=userSpaceOnUse><stop stop-color=#A17500 offset=0></stop><stop stop-color=#5D2100 offset=1></stop></linearGradient><path d="m192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.1-3 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6s-10.8-51.9-22.1-99.6l-25.3 4.6"clip-rule=evenodd fill-rule=evenodd></path><g stroke=#2F8A00><linearGradient x1=-660.23 x2=-660.23 y1=166.72 y2=167.72 gradientTransform="matrix(92.683 4.8573 -2.0259 38.657 61680 -3088.6)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-661.36 x2=-661.36 y1=164.18 y2=165.18 gradientTransform="matrix(110 5.7648 -6.3599 121.35 73933 -15933)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.4 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20.2 49.6-53.2 49.6-53.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.79 x2=-656.79 y1=165.15 y2=166.15 gradientTransform="matrix(62.954 3.2993 -3.5023 66.828 42156 -8754.1)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m195 183.9c-0.8-21.9 6-38 20.6-48.2s29.8-15.4 45.5-15.3c-6.1 21.4-14.5 35.8-25.2 43.4s-24.4 14.2-40.9 20.1z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-663.07 x2=-663.07 y1=165.44 y2=166.44 gradientTransform="matrix(152.47 7.9907 -3.0936 59.029 101884 -4318.7)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c31.9-30 64.1-39.7 96.7-29s50.8 30.4 54.6 59.1c-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-662.57 x2=-662.57 y1=164.44 y2=165.44 gradientTransform="matrix(136.46 7.1517 -5.2163 99.533 91536 -11442)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c35.8-7.6 65.6-0.2 89.2 22s37.7 49 42.3 80.3c-39.8-9.7-68.3-23.8-85.5-42.4s-32.5-38.5-46-59.9z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><linearGradient x1=-656.43 x2=-656.43 y1=163.86 y2=164.86 gradientTransform="matrix(60.866 3.1899 -8.7773 167.48 41560 -25168)"gradientUnits=userSpaceOnUse><stop stop-color=#2F8A00 offset=0></stop><stop stop-color=#90FF57 offset=1></stop></linearGradient><path d="m194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6s-3.6 63.1 8.7 99.6c27.4-40.3 43.2-69.6 47.4-88s5.6-44.1 4-77.2z"clip-rule=evenodd fill-rule=evenodd stroke-width=13></path><path d="m196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4s-9.5 33-11.1 45.1"fill=none stroke-linecap=round stroke-width=8></path><path d="m194.9 185.7c-24.4 1.7-43.8 9-58.1 21.8s-24.7 25.4-31.3 37.8"fill=none stroke-linecap=round stroke-width=8></path><path d="m204.5 176.4c29.7-6.7 52-8.4 67-5.1s26.9 8.6 35.8 15.9"fill=none stroke-linecap=round stroke-width=8></path><path d="m196.5 181.4c20.3 9.9 38.2 20.5 53.9 31.9s27.4 22.1 35.1 32"fill=none stroke-linecap=round stroke-width=8></path></g></g><defs><filter x=50.5 y=399 width=532 height=633 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=50.5 y=399 width=532 height=633 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-666.06 x2=-666.23 y1=163.36 y2=163.75 gradientTransform="matrix(532 0 0 633 354760 -102959)"gradientUnits=userSpaceOnUse><stop stop-color=#FFF400 offset=0></stop><stop stop-color=#3C8700 offset=1></stop></linearGradient><ellipse cx=316.5 cy=715.5 rx=266 ry=316.5></ellipse></g><defs><filter x=391 y=-24 width=288 height=283 filterUnits=userSpaceOnUse><feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"></feColorMatrix></filter></defs><mask x=391 y=-24 width=288 height=283 maskUnits=userSpaceOnUse><g><circle cx=316.5 cy=316.5 r=316.5 fill=#fff></circle></g></mask><g><linearGradient x1=-664.56 x2=-664.56 y1=163.79 y2=164.79 gradientTransform="matrix(227 0 0 227 151421 -37204)"gradientUnits=userSpaceOnUse><stop stop-color=#FFDF00 offset=0></stop><stop stop-color=#FF9D00 offset=1></stop></linearGradient><circle cx=565.5 cy=89.5 r=113.5></circle><linearGradient x1=-644.5 x2=-645.77 y1=342 y2=342 gradientTransform="matrix(30 0 0 1 19770 -253)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=427 x2=397 y1=89 y2=89 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-641.56 x2=-642.83 y1=196.02 y2=196.07 gradientTransform="matrix(26.5 0 0 5.5 17439 -1025.5)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=430.5 x2=404 y1=55.5 y2=50 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-643.73 x2=-645 y1=185.83 y2=185.9 gradientTransform="matrix(29 0 0 8 19107 -1361)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=431 x2=402 y1=122 y2=130 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-638.94 x2=-640.22 y1=177.09 y2=177.39 gradientTransform="matrix(24 0 0 13 15783 -2145)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=442 x2=418 y1=153 y2=166 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-633.42 x2=-634.7 y1=172.41 y2=173.31 gradientTransform="matrix(20 0 0 19 13137 -3096)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=464 x2=444 y1=180 y2=199 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-619.05 x2=-619.52 y1=170.82 y2=171.82 gradientTransform="matrix(13.83 0 0 22.85 9050 -3703.4)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=491.4 x2=477.5 y1=203 y2=225.9 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=-578.5 x2=-578.63 y1=170.31 y2=171.31 gradientTransform="matrix(7.5 0 0 24.5 4860 -3953)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=524.5 x2=517 y1=219.5 y2=244 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12></line><linearGradient x1=666.5 x2=666.5 y1=170.31 y2=171.31 gradientTransform="matrix(.5 0 0 24.5 231.5 -3944)"gradientUnits=userSpaceOnUse><stop stop-color=#FFA400 offset=0></stop><stop stop-color=#FF5E00 offset=1></stop></linearGradient><line x1=564.5 x2=565 y1=228.5 y2=253 fill=none stroke-linecap=round stroke-linejoin=bevel stroke-width=12>`);
function Search() {
  return _tmpl$2();
}
function Trash() {
  return _tmpl$22();
}
function ChevronDown() {
  return _tmpl$3();
}
function ArrowUp() {
  return _tmpl$4();
}
function ArrowDown() {
  return _tmpl$5();
}
function ArrowLeft() {
  return (() => {
    var _el$6 = _tmpl$5();
    _el$6.style.setProperty("transform", "rotate(90deg)");
    return _el$6;
  })();
}
function ArrowRight() {
  return (() => {
    var _el$7 = _tmpl$5();
    _el$7.style.setProperty("transform", "rotate(-90deg)");
    return _el$7;
  })();
}
function Sun() {
  return _tmpl$6();
}
function Moon() {
  return _tmpl$7();
}
function Monitor() {
  return _tmpl$8();
}
function Wifi() {
  return _tmpl$9();
}
function Offline() {
  return _tmpl$10();
}
function Settings() {
  return _tmpl$11();
}
function PiPIcon() {
  return _tmpl$12();
}
function Copier() {
  return _tmpl$13();
}
function Pencil() {
  return _tmpl$14();
}
function CopiedCopier(props) {
  return (() => {
    var _el$17 = _tmpl$15(), _el$18 = _el$17.firstChild;
    createRenderEffect(() => setAttribute(_el$18, "stroke", props.theme === "dark" ? "#12B76A" : "#027A48"));
    return _el$17;
  })();
}
function ErrorCopier() {
  return _tmpl$16();
}
function List() {
  return _tmpl$17();
}
function Check(props) {
  return [createComponent(Show, {
    get when() {
      return props.checked;
    },
    get children() {
      var _el$21 = _tmpl$15(), _el$22 = _el$21.firstChild;
      createRenderEffect(() => setAttribute(_el$22, "stroke", props.theme === "dark" ? "#9B8AFB" : "#6938EF"));
      return _el$21;
    }
  }), createComponent(Show, {
    get when() {
      return !props.checked;
    },
    get children() {
      var _el$23 = _tmpl$18(), _el$24 = _el$23.firstChild;
      createRenderEffect(() => setAttribute(_el$24, "stroke", props.theme === "dark" ? "#9B8AFB" : "#6938EF"));
      return _el$23;
    }
  })];
}
function CheckCircle() {
  return _tmpl$19();
}
function LoadingCircle() {
  return _tmpl$20();
}
function XCircle() {
  return _tmpl$21();
}
function PauseCircle() {
  return _tmpl$222();
}
function TanstackLogo() {
  const id = createUniqueId();
  return (() => {
    var _el$29 = _tmpl$23(), _el$30 = _el$29.firstChild, _el$31 = _el$30.nextSibling, _el$32 = _el$31.nextSibling, _el$33 = _el$32.firstChild, _el$34 = _el$32.nextSibling, _el$35 = _el$34.firstChild, _el$36 = _el$34.nextSibling, _el$37 = _el$36.nextSibling, _el$38 = _el$37.firstChild, _el$39 = _el$37.nextSibling, _el$40 = _el$39.firstChild, _el$41 = _el$39.nextSibling, _el$42 = _el$41.nextSibling, _el$43 = _el$42.firstChild, _el$44 = _el$42.nextSibling, _el$45 = _el$44.firstChild, _el$46 = _el$44.nextSibling, _el$47 = _el$46.nextSibling, _el$48 = _el$47.firstChild, _el$49 = _el$47.nextSibling, _el$50 = _el$49.firstChild, _el$51 = _el$49.nextSibling, _el$52 = _el$51.nextSibling, _el$53 = _el$52.firstChild, _el$54 = _el$52.nextSibling, _el$55 = _el$54.firstChild, _el$56 = _el$54.nextSibling, _el$57 = _el$56.nextSibling, _el$58 = _el$57.firstChild, _el$59 = _el$57.nextSibling, _el$60 = _el$59.firstChild, _el$61 = _el$59.nextSibling, _el$62 = _el$61.nextSibling, _el$63 = _el$62.firstChild, _el$64 = _el$62.nextSibling, _el$65 = _el$64.firstChild, _el$66 = _el$64.nextSibling, _el$67 = _el$66.firstChild, _el$68 = _el$67.nextSibling, _el$69 = _el$68.nextSibling, _el$70 = _el$69.nextSibling, _el$71 = _el$70.nextSibling, _el$72 = _el$66.nextSibling, _el$73 = _el$72.firstChild, _el$74 = _el$72.nextSibling, _el$75 = _el$74.firstChild, _el$76 = _el$74.nextSibling, _el$77 = _el$76.firstChild, _el$78 = _el$77.nextSibling, _el$79 = _el$78.nextSibling, _el$80 = _el$79.firstChild, _el$81 = _el$80.nextSibling, _el$82 = _el$81.nextSibling, _el$83 = _el$82.nextSibling, _el$84 = _el$83.nextSibling, _el$85 = _el$84.nextSibling, _el$86 = _el$85.nextSibling, _el$87 = _el$86.nextSibling, _el$88 = _el$87.nextSibling, _el$89 = _el$88.nextSibling, _el$90 = _el$89.nextSibling, _el$91 = _el$90.nextSibling, _el$92 = _el$76.nextSibling, _el$93 = _el$92.firstChild, _el$94 = _el$92.nextSibling, _el$95 = _el$94.firstChild, _el$96 = _el$94.nextSibling, _el$97 = _el$96.firstChild, _el$98 = _el$97.nextSibling, _el$99 = _el$96.nextSibling, _el$100 = _el$99.firstChild, _el$101 = _el$99.nextSibling, _el$102 = _el$101.firstChild, _el$103 = _el$101.nextSibling, _el$104 = _el$103.firstChild, _el$105 = _el$104.nextSibling, _el$106 = _el$105.nextSibling, _el$107 = _el$106.nextSibling, _el$108 = _el$107.nextSibling, _el$109 = _el$108.nextSibling, _el$110 = _el$109.nextSibling, _el$111 = _el$110.nextSibling, _el$112 = _el$111.nextSibling, _el$113 = _el$112.nextSibling, _el$114 = _el$113.nextSibling, _el$115 = _el$114.nextSibling, _el$116 = _el$115.nextSibling, _el$117 = _el$116.nextSibling, _el$118 = _el$117.nextSibling, _el$119 = _el$118.nextSibling, _el$120 = _el$119.nextSibling, _el$121 = _el$120.nextSibling;
    setAttribute(_el$30, "id", `a-${id}`);
    setAttribute(_el$31, "fill", `url(#a-${id})`);
    setAttribute(_el$33, "id", `am-${id}`);
    setAttribute(_el$34, "id", `b-${id}`);
    setAttribute(_el$35, "filter", `url(#am-${id})`);
    setAttribute(_el$36, "mask", `url(#b-${id})`);
    setAttribute(_el$38, "id", `ah-${id}`);
    setAttribute(_el$39, "id", `k-${id}`);
    setAttribute(_el$40, "filter", `url(#ah-${id})`);
    setAttribute(_el$41, "mask", `url(#k-${id})`);
    setAttribute(_el$43, "id", `ae-${id}`);
    setAttribute(_el$44, "id", `j-${id}`);
    setAttribute(_el$45, "filter", `url(#ae-${id})`);
    setAttribute(_el$46, "mask", `url(#j-${id})`);
    setAttribute(_el$48, "id", `ai-${id}`);
    setAttribute(_el$49, "id", `i-${id}`);
    setAttribute(_el$50, "filter", `url(#ai-${id})`);
    setAttribute(_el$51, "mask", `url(#i-${id})`);
    setAttribute(_el$53, "id", `aj-${id}`);
    setAttribute(_el$54, "id", `h-${id}`);
    setAttribute(_el$55, "filter", `url(#aj-${id})`);
    setAttribute(_el$56, "mask", `url(#h-${id})`);
    setAttribute(_el$58, "id", `ag-${id}`);
    setAttribute(_el$59, "id", `g-${id}`);
    setAttribute(_el$60, "filter", `url(#ag-${id})`);
    setAttribute(_el$61, "mask", `url(#g-${id})`);
    setAttribute(_el$63, "id", `af-${id}`);
    setAttribute(_el$64, "id", `f-${id}`);
    setAttribute(_el$65, "filter", `url(#af-${id})`);
    setAttribute(_el$66, "mask", `url(#f-${id})`);
    setAttribute(_el$70, "id", `m-${id}`);
    setAttribute(_el$71, "fill", `url(#m-${id})`);
    setAttribute(_el$73, "id", `ak-${id}`);
    setAttribute(_el$74, "id", `e-${id}`);
    setAttribute(_el$75, "filter", `url(#ak-${id})`);
    setAttribute(_el$76, "mask", `url(#e-${id})`);
    setAttribute(_el$77, "id", `n-${id}`);
    setAttribute(_el$78, "fill", `url(#n-${id})`);
    setAttribute(_el$80, "id", `r-${id}`);
    setAttribute(_el$81, "fill", `url(#r-${id})`);
    setAttribute(_el$82, "id", `s-${id}`);
    setAttribute(_el$83, "fill", `url(#s-${id})`);
    setAttribute(_el$84, "id", `q-${id}`);
    setAttribute(_el$85, "fill", `url(#q-${id})`);
    setAttribute(_el$86, "id", `p-${id}`);
    setAttribute(_el$87, "fill", `url(#p-${id})`);
    setAttribute(_el$88, "id", `o-${id}`);
    setAttribute(_el$89, "fill", `url(#o-${id})`);
    setAttribute(_el$90, "id", `l-${id}`);
    setAttribute(_el$91, "fill", `url(#l-${id})`);
    setAttribute(_el$93, "id", `al-${id}`);
    setAttribute(_el$94, "id", `d-${id}`);
    setAttribute(_el$95, "filter", `url(#al-${id})`);
    setAttribute(_el$96, "mask", `url(#d-${id})`);
    setAttribute(_el$97, "id", `u-${id}`);
    setAttribute(_el$98, "fill", `url(#u-${id})`);
    setAttribute(_el$100, "id", `ad-${id}`);
    setAttribute(_el$101, "id", `c-${id}`);
    setAttribute(_el$102, "filter", `url(#ad-${id})`);
    setAttribute(_el$103, "mask", `url(#c-${id})`);
    setAttribute(_el$104, "id", `t-${id}`);
    setAttribute(_el$105, "fill", `url(#t-${id})`);
    setAttribute(_el$106, "id", `v-${id}`);
    setAttribute(_el$107, "stroke", `url(#v-${id})`);
    setAttribute(_el$108, "id", `aa-${id}`);
    setAttribute(_el$109, "stroke", `url(#aa-${id})`);
    setAttribute(_el$110, "id", `w-${id}`);
    setAttribute(_el$111, "stroke", `url(#w-${id})`);
    setAttribute(_el$112, "id", `ac-${id}`);
    setAttribute(_el$113, "stroke", `url(#ac-${id})`);
    setAttribute(_el$114, "id", `ab-${id}`);
    setAttribute(_el$115, "stroke", `url(#ab-${id})`);
    setAttribute(_el$116, "id", `y-${id}`);
    setAttribute(_el$117, "stroke", `url(#y-${id})`);
    setAttribute(_el$118, "id", `x-${id}`);
    setAttribute(_el$119, "stroke", `url(#x-${id})`);
    setAttribute(_el$120, "id", `z-${id}`);
    setAttribute(_el$121, "stroke", `url(#z-${id})`);
    return _el$29;
  })();
}
var _tmpl$24 = /* @__PURE__ */ template(`<span><svg width=16 height=16 viewBox="0 0 16 16"fill=none xmlns=http://www.w3.org/2000/svg><path d="M6 12L10 8L6 4"stroke-width=2 stroke-linecap=round stroke-linejoin=round>`);
var _tmpl$25 = /* @__PURE__ */ template(`<button title="Copy object to clipboard">`);
var _tmpl$32 = /* @__PURE__ */ template(`<button title="Remove all items"aria-label="Remove all items">`);
var _tmpl$42 = /* @__PURE__ */ template(`<button title="Delete item"aria-label="Delete item">`);
var _tmpl$52 = /* @__PURE__ */ template(`<button title="Toggle value"aria-label="Toggle value">`);
var _tmpl$62 = /* @__PURE__ */ template(`<button title="Bulk Edit Data"aria-label="Bulk Edit Data">`);
var _tmpl$72 = /* @__PURE__ */ template(`<div>`);
var _tmpl$82 = /* @__PURE__ */ template(`<div><button> <span></span> <span> `);
var _tmpl$92 = /* @__PURE__ */ template(`<input>`);
var _tmpl$102 = /* @__PURE__ */ template(`<span>`);
var _tmpl$112 = /* @__PURE__ */ template(`<div><span>:`);
var _tmpl$122 = /* @__PURE__ */ template(`<div><div><button> [<!>...<!>]`);
function chunkArray(array, size3) {
  let i2 = 0;
  const result = [];
  while (i2 < array.length) {
    result.push(array.slice(i2, i2 + size3));
    i2 = i2 + size3;
  }
  return result;
}
var Expander = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  return (() => {
    var _el$ = _tmpl$24();
    createRenderEffect(() => className(_el$, clsx(styles().expander, css`
          transform: rotate(${props.expanded ? 90 : 0}deg);
        `, props.expanded && css`
            & svg {
              top: -1px;
            }
          `)));
    return _el$;
  })();
};
var CopyButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const [copyState, setCopyState] = createSignal("NoCopy");
  return (() => {
    var _el$2 = _tmpl$25();
    addEventListener(_el$2, "click", copyState() === "NoCopy" ? () => {
      navigator.clipboard.writeText(stringify(props.value)).then(() => {
        setCopyState("SuccessCopy");
        setTimeout(() => {
          setCopyState("NoCopy");
        }, 1500);
      }, (err) => {
        setCopyState("ErrorCopy");
        setTimeout(() => {
          setCopyState("NoCopy");
        }, 1500);
      });
    } : void 0, true);
    insert(_el$2, createComponent(Switch, {
      get children() {
        return [createComponent(Match, {
          get when() {
            return copyState() === "NoCopy";
          },
          get children() {
            return createComponent(Copier, {});
          }
        }), createComponent(Match, {
          get when() {
            return copyState() === "SuccessCopy";
          },
          get children() {
            return createComponent(CopiedCopier, {
              get theme() {
                return theme();
              }
            });
          }
        }), createComponent(Match, {
          get when() {
            return copyState() === "ErrorCopy";
          },
          get children() {
            return createComponent(ErrorCopier, {});
          }
        })];
      }
    }));
    createRenderEffect((_p$) => {
      var _v$ = styles().actionButton, _v$2 = `${copyState() === "NoCopy" ? "Copy object to clipboard" : copyState() === "SuccessCopy" ? "Object copied to clipboard" : "Error copying object to clipboard"}`;
      _v$ !== _p$.e && className(_el$2, _p$.e = _v$);
      _v$2 !== _p$.t && setAttribute(_el$2, "aria-label", _p$.t = _v$2);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$2;
  })();
};
var ClearArrayButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  return (() => {
    var _el$3 = _tmpl$32();
    _el$3.$$click = () => {
      const oldData = props.activeQuery.state.data;
      const newData = updateNestedDataByPath(oldData, props.dataPath, []);
      queryClient.setQueryData(props.activeQuery.queryKey, newData);
    };
    insert(_el$3, createComponent(List, {}));
    createRenderEffect(() => className(_el$3, styles().actionButton));
    return _el$3;
  })();
};
var DeleteItemButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  return (() => {
    var _el$4 = _tmpl$42();
    _el$4.$$click = () => {
      const oldData = props.activeQuery.state.data;
      const newData = deleteNestedDataByPath(oldData, props.dataPath);
      queryClient.setQueryData(props.activeQuery.queryKey, newData);
    };
    insert(_el$4, createComponent(Trash, {}));
    createRenderEffect(() => className(_el$4, clsx(styles().actionButton)));
    return _el$4;
  })();
};
var ToggleValueButton = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  return (() => {
    var _el$5 = _tmpl$52();
    _el$5.$$click = () => {
      const oldData = props.activeQuery.state.data;
      const newData = updateNestedDataByPath(oldData, props.dataPath, !props.value);
      queryClient.setQueryData(props.activeQuery.queryKey, newData);
    };
    insert(_el$5, createComponent(Check, {
      get theme() {
        return theme();
      },
      get checked() {
        return props.value;
      }
    }));
    createRenderEffect(() => className(_el$5, clsx(styles().actionButton, css`
          width: ${tokens.size[3.5]};
          height: ${tokens.size[3.5]};
        `)));
    return _el$5;
  })();
};
function isIterable(x) {
  return Symbol.iterator in x;
}
function Explorer(props) {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles(css) : lightStyles(css);
  });
  const queryClient = useQueryDevtoolsContext().client;
  const [expanded, setExpanded] = createSignal((props.defaultExpanded || []).includes(props.label));
  const toggleExpanded = () => setExpanded((old) => !old);
  const [expandedPages, setExpandedPages] = createSignal([]);
  const subEntries = createMemo(() => {
    if (Array.isArray(props.value)) {
      return props.value.map((d, i2) => ({
        label: i2.toString(),
        value: d
      }));
    } else if (props.value !== null && typeof props.value === "object" && isIterable(props.value) && typeof props.value[Symbol.iterator] === "function") {
      if (props.value instanceof Map) {
        return Array.from(props.value, ([key, val]) => ({
          label: key,
          value: val
        }));
      }
      return Array.from(props.value, (val, i2) => ({
        label: i2.toString(),
        value: val
      }));
    } else if (typeof props.value === "object" && props.value !== null) {
      return Object.entries(props.value).map(([key, val]) => ({
        label: key,
        value: val
      }));
    }
    return [];
  });
  const type = createMemo(() => {
    if (Array.isArray(props.value)) {
      return "array";
    } else if (props.value !== null && typeof props.value === "object" && isIterable(props.value) && typeof props.value[Symbol.iterator] === "function") {
      return "Iterable";
    } else if (typeof props.value === "object" && props.value !== null) {
      return "object";
    }
    return typeof props.value;
  });
  const subEntryPages = createMemo(() => chunkArray(subEntries(), 100));
  const currentDataPath = props.dataPath ?? [];
  return (() => {
    var _el$6 = _tmpl$72();
    insert(_el$6, createComponent(Show, {
      get when() {
        return subEntryPages().length;
      },
      get children() {
        return [(() => {
          var _el$7 = _tmpl$82(), _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$10 = _el$9.nextSibling, _el$11 = _el$10.nextSibling, _el$12 = _el$11.nextSibling, _el$13 = _el$12.firstChild;
          _el$8.$$click = () => toggleExpanded();
          insert(_el$8, createComponent(Expander, {
            get expanded() {
              return expanded();
            }
          }), _el$9);
          insert(_el$10, () => props.label);
          insert(_el$12, () => String(type()).toLowerCase() === "iterable" ? "(Iterable) " : "", _el$13);
          insert(_el$12, () => subEntries().length, _el$13);
          insert(_el$12, () => subEntries().length > 1 ? `items` : `item`, null);
          insert(_el$7, createComponent(Show, {
            get when() {
              return props.editable;
            },
            get children() {
              var _el$14 = _tmpl$72();
              insert(_el$14, createComponent(CopyButton, {
                get value() {
                  return props.value;
                }
              }), null);
              insert(_el$14, createComponent(Show, {
                get when() {
                  return props.itemsDeletable && props.activeQuery !== void 0;
                },
                get children() {
                  return createComponent(DeleteItemButton, {
                    get activeQuery() {
                      return props.activeQuery;
                    },
                    dataPath: currentDataPath
                  });
                }
              }), null);
              insert(_el$14, createComponent(Show, {
                get when() {
                  return type() === "array" && props.activeQuery !== void 0;
                },
                get children() {
                  return createComponent(ClearArrayButton, {
                    get activeQuery() {
                      return props.activeQuery;
                    },
                    dataPath: currentDataPath
                  });
                }
              }), null);
              insert(_el$14, createComponent(Show, {
                get when() {
                  return createMemo(() => !!!!props.onEdit)() && !serialize(props.value).meta;
                },
                get children() {
                  var _el$15 = _tmpl$62();
                  _el$15.$$click = () => {
                    var _a;
                    (_a = props.onEdit) == null ? void 0 : _a.call(props);
                  };
                  insert(_el$15, createComponent(Pencil, {}));
                  createRenderEffect(() => className(_el$15, styles().actionButton));
                  return _el$15;
                }
              }), null);
              createRenderEffect(() => className(_el$14, styles().actions));
              return _el$14;
            }
          }), null);
          createRenderEffect((_p$) => {
            var _v$3 = styles().expanderButtonContainer, _v$4 = styles().expanderButton, _v$5 = styles().info;
            _v$3 !== _p$.e && className(_el$7, _p$.e = _v$3);
            _v$4 !== _p$.t && className(_el$8, _p$.t = _v$4);
            _v$5 !== _p$.a && className(_el$12, _p$.a = _v$5);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          });
          return _el$7;
        })(), createComponent(Show, {
          get when() {
            return expanded();
          },
          get children() {
            return [createComponent(Show, {
              get when() {
                return subEntryPages().length === 1;
              },
              get children() {
                var _el$16 = _tmpl$72();
                insert(_el$16, createComponent(Key, {
                  get each() {
                    return subEntries();
                  },
                  by: (item) => item.label,
                  children: (entry) => {
                    return createComponent(Explorer, {
                      get defaultExpanded() {
                        return props.defaultExpanded;
                      },
                      get label() {
                        return entry().label;
                      },
                      get value() {
                        return entry().value;
                      },
                      get editable() {
                        return props.editable;
                      },
                      get dataPath() {
                        return [...currentDataPath, entry().label];
                      },
                      get activeQuery() {
                        return props.activeQuery;
                      },
                      get itemsDeletable() {
                        return type() === "array" || type() === "Iterable" || type() === "object";
                      }
                    });
                  }
                }));
                createRenderEffect(() => className(_el$16, styles().subEntry));
                return _el$16;
              }
            }), createComponent(Show, {
              get when() {
                return subEntryPages().length > 1;
              },
              get children() {
                var _el$17 = _tmpl$72();
                insert(_el$17, createComponent(Index, {
                  get each() {
                    return subEntryPages();
                  },
                  children: (entries2, index) => (() => {
                    var _el$23 = _tmpl$122(), _el$24 = _el$23.firstChild, _el$25 = _el$24.firstChild, _el$26 = _el$25.firstChild, _el$30 = _el$26.nextSibling, _el$28 = _el$30.nextSibling, _el$31 = _el$28.nextSibling;
                    _el$31.nextSibling;
                    _el$25.$$click = () => setExpandedPages((old) => old.includes(index) ? old.filter((d) => d !== index) : [...old, index]);
                    insert(_el$25, createComponent(Expander, {
                      get expanded() {
                        return expandedPages().includes(index);
                      }
                    }), _el$26);
                    insert(_el$25, index * 100, _el$30);
                    insert(_el$25, index * 100 + 100 - 1, _el$31);
                    insert(_el$24, createComponent(Show, {
                      get when() {
                        return expandedPages().includes(index);
                      },
                      get children() {
                        var _el$32 = _tmpl$72();
                        insert(_el$32, createComponent(Key, {
                          get each() {
                            return entries2();
                          },
                          by: (entry) => entry.label,
                          children: (entry) => createComponent(Explorer, {
                            get defaultExpanded() {
                              return props.defaultExpanded;
                            },
                            get label() {
                              return entry().label;
                            },
                            get value() {
                              return entry().value;
                            },
                            get editable() {
                              return props.editable;
                            },
                            get dataPath() {
                              return [...currentDataPath, entry().label];
                            },
                            get activeQuery() {
                              return props.activeQuery;
                            }
                          })
                        }));
                        createRenderEffect(() => className(_el$32, styles().subEntry));
                        return _el$32;
                      }
                    }), null);
                    createRenderEffect((_p$) => {
                      var _v$10 = styles().entry, _v$11 = styles().expanderButton;
                      _v$10 !== _p$.e && className(_el$24, _p$.e = _v$10);
                      _v$11 !== _p$.t && className(_el$25, _p$.t = _v$11);
                      return _p$;
                    }, {
                      e: void 0,
                      t: void 0
                    });
                    return _el$23;
                  })()
                }));
                createRenderEffect(() => className(_el$17, styles().subEntry));
                return _el$17;
              }
            })];
          }
        })];
      }
    }), null);
    insert(_el$6, createComponent(Show, {
      get when() {
        return subEntryPages().length === 0;
      },
      get children() {
        var _el$18 = _tmpl$112(), _el$19 = _el$18.firstChild, _el$20 = _el$19.firstChild;
        insert(_el$19, () => props.label, _el$20);
        insert(_el$18, createComponent(Show, {
          get when() {
            return createMemo(() => !!(props.editable && props.activeQuery !== void 0))() && (type() === "string" || type() === "number" || type() === "boolean");
          },
          get fallback() {
            return (() => {
              var _el$33 = _tmpl$102();
              insert(_el$33, () => displayValue(props.value));
              createRenderEffect(() => className(_el$33, styles().value));
              return _el$33;
            })();
          },
          get children() {
            return [createComponent(Show, {
              get when() {
                return createMemo(() => !!(props.editable && props.activeQuery !== void 0))() && (type() === "string" || type() === "number");
              },
              get children() {
                var _el$21 = _tmpl$92();
                _el$21.addEventListener("change", (changeEvent) => {
                  const oldData = props.activeQuery.state.data;
                  const newData = updateNestedDataByPath(oldData, currentDataPath, type() === "number" ? changeEvent.target.valueAsNumber : changeEvent.target.value);
                  queryClient.setQueryData(props.activeQuery.queryKey, newData);
                });
                createRenderEffect((_p$) => {
                  var _v$6 = type() === "number" ? "number" : "text", _v$7 = clsx(styles().value, styles().editableInput);
                  _v$6 !== _p$.e && setAttribute(_el$21, "type", _p$.e = _v$6);
                  _v$7 !== _p$.t && className(_el$21, _p$.t = _v$7);
                  return _p$;
                }, {
                  e: void 0,
                  t: void 0
                });
                createRenderEffect(() => _el$21.value = props.value);
                return _el$21;
              }
            }), createComponent(Show, {
              get when() {
                return type() === "boolean";
              },
              get children() {
                var _el$22 = _tmpl$102();
                insert(_el$22, createComponent(ToggleValueButton, {
                  get activeQuery() {
                    return props.activeQuery;
                  },
                  dataPath: currentDataPath,
                  get value() {
                    return props.value;
                  }
                }), null);
                insert(_el$22, () => displayValue(props.value), null);
                createRenderEffect(() => className(_el$22, clsx(styles().value, styles().actions, styles().editableInput)));
                return _el$22;
              }
            })];
          }
        }), null);
        insert(_el$18, createComponent(Show, {
          get when() {
            return props.editable && props.itemsDeletable && props.activeQuery !== void 0;
          },
          get children() {
            return createComponent(DeleteItemButton, {
              get activeQuery() {
                return props.activeQuery;
              },
              dataPath: currentDataPath
            });
          }
        }), null);
        createRenderEffect((_p$) => {
          var _v$8 = styles().row, _v$9 = styles().label;
          _v$8 !== _p$.e && className(_el$18, _p$.e = _v$8);
          _v$9 !== _p$.t && className(_el$19, _p$.t = _v$9);
          return _p$;
        }, {
          e: void 0,
          t: void 0
        });
        return _el$18;
      }
    }), null);
    createRenderEffect(() => className(_el$6, styles().entry));
    return _el$6;
  })();
}
var stylesFactory = (theme, css) => {
  const {
    colors,
    font,
    size: size3,
    border
  } = tokens;
  const t2 = (light, dark) => theme === "light" ? light : dark;
  return {
    entry: css`
      & * {
        font-size: ${font.size.xs};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
      }
      position: relative;
      outline: none;
      word-break: break-word;
    `,
    subEntry: css`
      margin: 0 0 0 0.5em;
      padding-left: 0.75em;
      border-left: 2px solid ${t2(colors.gray[300], colors.darkGray[400])};
      /* outline: 1px solid ${colors.teal[400]}; */
    `,
    expander: css`
      & path {
        stroke: ${colors.gray[400]};
      }
      & svg {
        width: ${size3[3]};
        height: ${size3[3]};
      }
      display: inline-flex;
      align-items: center;
      transition: all 0.1s ease;
      /* outline: 1px solid ${colors.blue[400]}; */
    `,
    expanderButtonContainer: css`
      display: flex;
      align-items: center;
      line-height: ${size3[4]};
      min-height: ${size3[4]};
      gap: ${size3[2]};
    `,
    expanderButton: css`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      height: ${size3[5]};
      background: transparent;
      border: none;
      padding: 0;
      display: inline-flex;
      align-items: center;
      gap: ${size3[1]};
      position: relative;
      /* outline: 1px solid ${colors.green[400]}; */

      &:focus-visible {
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }

      & svg {
        position: relative;
        left: 1px;
      }
    `,
    info: css`
      color: ${t2(colors.gray[500], colors.gray[500])};
      font-size: ${font.size.xs};
      margin-left: ${size3[1]};
      /* outline: 1px solid ${colors.yellow[400]}; */
    `,
    label: css`
      color: ${t2(colors.gray[700], colors.gray[300])};
      white-space: nowrap;
    `,
    value: css`
      color: ${t2(colors.purple[600], colors.purple[400])};
      flex-grow: 1;
    `,
    actions: css`
      display: inline-flex;
      gap: ${size3[2]};
      align-items: center;
    `,
    row: css`
      display: inline-flex;
      gap: ${size3[2]};
      width: 100%;
      margin: ${size3[0.25]} 0px;
      line-height: ${size3[4.5]};
      align-items: center;
    `,
    editableInput: css`
      border: none;
      padding: ${size3[0.5]} ${size3[1]} ${size3[0.5]} ${size3[1.5]};
      flex-grow: 1;
      border-radius: ${border.radius.xs};
      background-color: ${t2(colors.gray[200], colors.darkGray[500])};

      &:hover {
        background-color: ${t2(colors.gray[300], colors.darkGray[600])};
      }
    `,
    actionButton: css`
      background-color: transparent;
      color: ${t2(colors.gray[500], colors.gray[500])};
      border: none;
      display: inline-flex;
      padding: 0px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: ${size3[3]};
      height: ${size3[3]};
      position: relative;
      z-index: 1;

      &:hover svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
      }

      &:focus-visible {
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
        outline-offset: 2px;
      }
    `
  };
};
var lightStyles = (css) => stylesFactory("light", css);
var darkStyles = (css) => stylesFactory("dark", css);
delegateEvents(["click"]);
var _tmpl$26 = /* @__PURE__ */ template(`<div><div aria-hidden=true></div><button type=button aria-label="Open Tanstack query devtools"class=tsqd-open-btn>`);
var _tmpl$27 = /* @__PURE__ */ template(`<div>`);
var _tmpl$33 = /* @__PURE__ */ template(`<aside aria-label="Tanstack query devtools"><div></div><button aria-label="Close tanstack query devtools">`);
var _tmpl$43 = /* @__PURE__ */ template(`<select name=tsqd-queries-filter-sort>`);
var _tmpl$53 = /* @__PURE__ */ template(`<select name=tsqd-mutations-filter-sort>`);
var _tmpl$63 = /* @__PURE__ */ template(`<span>Asc`);
var _tmpl$73 = /* @__PURE__ */ template(`<span>Desc`);
var _tmpl$83 = /* @__PURE__ */ template(`<button aria-label="Open in picture-in-picture mode"title="Open in picture-in-picture mode">`);
var _tmpl$93 = /* @__PURE__ */ template(`<div>Settings`);
var _tmpl$103 = /* @__PURE__ */ template(`<span>Position`);
var _tmpl$113 = /* @__PURE__ */ template(`<span>Top`);
var _tmpl$123 = /* @__PURE__ */ template(`<span>Bottom`);
var _tmpl$132 = /* @__PURE__ */ template(`<span>Left`);
var _tmpl$142 = /* @__PURE__ */ template(`<span>Right`);
var _tmpl$152 = /* @__PURE__ */ template(`<span>Theme`);
var _tmpl$162 = /* @__PURE__ */ template(`<span>Light`);
var _tmpl$172 = /* @__PURE__ */ template(`<span>Dark`);
var _tmpl$182 = /* @__PURE__ */ template(`<span>System`);
var _tmpl$192 = /* @__PURE__ */ template(`<div><div class=tsqd-queries-container>`);
var _tmpl$202 = /* @__PURE__ */ template(`<div><div class=tsqd-mutations-container>`);
var _tmpl$212 = /* @__PURE__ */ template(`<div><div><div><button aria-label="Close Tanstack query devtools"><span>TANSTACK</span><span> v</span></button></div></div><div><div><div><input aria-label="Filter queries by query key"type=text placeholder=Filter name=tsqd-query-filter-input></div><div></div><button class=tsqd-query-filter-sort-order-btn></button></div><div><button aria-label="Clear query cache"></button><button>`);
var _tmpl$223 = /* @__PURE__ */ template(`<option>Sort by `);
var _tmpl$232 = /* @__PURE__ */ template(`<div class=tsqd-query-disabled-indicator>disabled`);
var _tmpl$242 = /* @__PURE__ */ template(`<button><div></div><code class=tsqd-query-hash>`);
var _tmpl$252 = /* @__PURE__ */ template(`<div role=tooltip id=tsqd-status-tooltip>`);
var _tmpl$262 = /* @__PURE__ */ template(`<span>`);
var _tmpl$272 = /* @__PURE__ */ template(`<button><span></span><span>`);
var _tmpl$28 = /* @__PURE__ */ template(`<button><span></span> Error`);
var _tmpl$29 = /* @__PURE__ */ template(`<div><span></span>Trigger Error<select><option value=""disabled selected>`);
var _tmpl$30 = /* @__PURE__ */ template(`<div class="tsqd-query-details-explorer-container tsqd-query-details-data-explorer">`);
var _tmpl$31 = /* @__PURE__ */ template(`<form><textarea name=data></textarea><div><span></span><div><button type=button>Cancel</button><button>Save`);
var _tmpl$322 = /* @__PURE__ */ template(`<div><div>Query Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-observers-count><span>Observers:</span><span></span></div><div class=tsqd-query-details-last-updated><span>Last Updated:</span><span></span></div></div><div>Actions</div><div><button><span></span>Refetch</button><button><span></span>Invalidate</button><button><span></span>Reset</button><button><span></span>Remove</button><button><span></span> Loading</button></div><div>Data </div><div>Query Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);
var _tmpl$332 = /* @__PURE__ */ template(`<option>`);
var _tmpl$34 = /* @__PURE__ */ template(`<div><div>Mutation Details</div><div><div class=tsqd-query-details-summary><pre><code></code></pre><span></span></div><div class=tsqd-query-details-last-updated><span>Submitted At:</span><span></span></div></div><div>Variables Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Context Details</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Data Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer"></div><div>Mutations Explorer</div><div class="tsqd-query-details-explorer-container tsqd-query-details-query-explorer">`);
var [selectedQueryHash, setSelectedQueryHash] = createSignal(null);
var [selectedMutationId, setSelectedMutationId] = createSignal(null);
var [panelWidth, setPanelWidth] = createSignal(0);
var [offline, setOffline] = createSignal(false);
var Devtools = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const pip = usePiPWindow();
  const buttonPosition = createMemo(() => {
    return useQueryDevtoolsContext().buttonPosition || BUTTON_POSITION;
  });
  const isOpen = createMemo(() => {
    return props.localStore.open === "true" ? true : props.localStore.open === "false" ? false : useQueryDevtoolsContext().initialIsOpen || INITIAL_IS_OPEN;
  });
  const position = createMemo(() => {
    return props.localStore.position || useQueryDevtoolsContext().position || POSITION;
  });
  let transitionsContainerRef;
  createEffect(() => {
    const root = transitionsContainerRef.parentElement;
    const height = props.localStore.height || DEFAULT_HEIGHT;
    const width = props.localStore.width || DEFAULT_WIDTH;
    const panelPosition = position();
    root.style.setProperty("--tsqd-panel-height", `${panelPosition === "top" ? "-" : ""}${height}px`);
    root.style.setProperty("--tsqd-panel-width", `${panelPosition === "left" ? "-" : ""}${width}px`);
  });
  onMount(() => {
    const onFocus = () => {
      const root = transitionsContainerRef.parentElement;
      const fontSize = getComputedStyle(root).fontSize;
      root.style.setProperty("--tsqd-font-size", fontSize);
    };
    onFocus();
    window.addEventListener("focus", onFocus);
    onCleanup(() => {
      window.removeEventListener("focus", onFocus);
    });
  });
  const pip_open = createMemo(() => props.localStore.pip_open ?? "false");
  return [createComponent(Show, {
    get when() {
      return createMemo(() => !!pip().pipWindow)() && pip_open() == "true";
    },
    get children() {
      return createComponent(Portal, {
        get mount() {
          var _a;
          return (_a = pip().pipWindow) == null ? void 0 : _a.document.body;
        },
        get children() {
          return createComponent(PiPPanel, {
            get children() {
              return createComponent(ContentView, props);
            }
          });
        }
      });
    }
  }), (() => {
    var _el$ = _tmpl$27();
    var _ref$ = transitionsContainerRef;
    typeof _ref$ === "function" ? use(_ref$, _el$) : transitionsContainerRef = _el$;
    insert(_el$, createComponent(TransitionGroup, {
      name: "tsqd-panel-transition",
      get children() {
        return createComponent(Show, {
          get when() {
            return createMemo(() => !!(isOpen() && !pip().pipWindow))() && pip_open() == "false";
          },
          get children() {
            return createComponent(DraggablePanel, {
              get localStore() {
                return props.localStore;
              },
              get setLocalStore() {
                return props.setLocalStore;
              }
            });
          }
        });
      }
    }), null);
    insert(_el$, createComponent(TransitionGroup, {
      name: "tsqd-button-transition",
      get children() {
        return createComponent(Show, {
          get when() {
            return !isOpen();
          },
          get children() {
            var _el$2 = _tmpl$26(), _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling;
            insert(_el$3, createComponent(TanstackLogo, {}));
            _el$4.$$click = () => props.setLocalStore("open", "true");
            insert(_el$4, createComponent(TanstackLogo, {}));
            createRenderEffect(() => className(_el$2, clsx(styles().devtoolsBtn, styles()[`devtoolsBtn-position-${buttonPosition()}`], "tsqd-open-btn-container")));
            return _el$2;
          }
        });
      }
    }), null);
    createRenderEffect(() => className(_el$, clsx(css`
            & .tsqd-panel-transition-exit-active,
            & .tsqd-panel-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
            }

            & .tsqd-panel-transition-exit-to,
            & .tsqd-panel-transition-enter {
              ${position() === "top" || position() === "bottom" ? `transform: translateY(var(--tsqd-panel-height));` : `transform: translateX(var(--tsqd-panel-width));`}
            }

            & .tsqd-button-transition-exit-active,
            & .tsqd-button-transition-enter-active {
              transition:
                opacity 0.3s,
                transform 0.3s;
              opacity: 1;
            }

            & .tsqd-button-transition-exit-to,
            & .tsqd-button-transition-enter {
              transform: ${buttonPosition() === "relative" ? `none;` : buttonPosition() === "top-left" ? `translateX(-72px);` : buttonPosition() === "top-right" ? `translateX(72px);` : `translateY(72px);`};
              opacity: 0;
            }
          `, "tsqd-transitions-container")));
    return _el$;
  })()];
};
var PiPPanel = (props) => {
  const pip = usePiPWindow();
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const getPanelDynamicStyles = () => {
    const {
      colors
    } = tokens;
    const t2 = (light, dark) => theme() === "dark" ? dark : light;
    if (panelWidth() < secondBreakpoint) {
      return css`
        flex-direction: column;
        background-color: ${t2(colors.gray[300], colors.gray[600])};
      `;
    }
    return css`
      flex-direction: row;
      background-color: ${t2(colors.gray[200], colors.darkGray[900])};
    `;
  };
  createEffect(() => {
    const win = pip().pipWindow;
    const resizeCB = () => {
      if (!win)
        return;
      setPanelWidth(win.innerWidth);
    };
    if (win) {
      win.addEventListener("resize", resizeCB);
      resizeCB();
    }
    onCleanup(() => {
      if (win) {
        win.removeEventListener("resize", resizeCB);
      }
    });
  });
  return (() => {
    var _el$5 = _tmpl$27();
    _el$5.style.setProperty("--tsqd-font-size", "16px");
    _el$5.style.setProperty("max-height", "100vh");
    _el$5.style.setProperty("height", "100vh");
    _el$5.style.setProperty("width", "100vw");
    insert(_el$5, () => props.children);
    createRenderEffect(() => className(_el$5, clsx(styles().panel, getPanelDynamicStyles(), {
      [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint
    }, "tsqd-main-panel")));
    return _el$5;
  })();
};
var ParentPanel = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  let panelRef;
  onMount(() => {
    createResizeObserver(panelRef, ({
      width
    }, el) => {
      if (el === panelRef) {
        setPanelWidth(width);
      }
    });
  });
  const getPanelDynamicStyles = () => {
    const {
      colors
    } = tokens;
    const t2 = (light, dark) => theme() === "dark" ? dark : light;
    if (panelWidth() < secondBreakpoint) {
      return css`
        flex-direction: column;
        background-color: ${t2(colors.gray[300], colors.gray[600])};
      `;
    }
    return css`
      flex-direction: row;
      background-color: ${t2(colors.gray[200], colors.darkGray[900])};
    `;
  };
  return (() => {
    var _el$6 = _tmpl$27();
    var _ref$2 = panelRef;
    typeof _ref$2 === "function" ? use(_ref$2, _el$6) : panelRef = _el$6;
    _el$6.style.setProperty("--tsqd-font-size", "16px");
    insert(_el$6, () => props.children);
    createRenderEffect(() => className(_el$6, clsx(styles().parentPanel, getPanelDynamicStyles(), {
      [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint
    }, "tsqd-main-panel")));
    return _el$6;
  })();
};
var DraggablePanel = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const [isResizing, setIsResizing] = createSignal(false);
  const position = createMemo(() => props.localStore.position || useQueryDevtoolsContext().position || POSITION);
  const handleDragStart = (event) => {
    const panelElement = event.currentTarget.parentElement;
    if (!panelElement)
      return;
    setIsResizing(true);
    const {
      height,
      width
    } = panelElement.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    let newSize = 0;
    const minHeight = convertRemToPixels(3.5);
    const minWidth = convertRemToPixels(12);
    const runDrag = (moveEvent) => {
      moveEvent.preventDefault();
      if (position() === "left" || position() === "right") {
        const valToAdd = position() === "right" ? startX - moveEvent.clientX : moveEvent.clientX - startX;
        newSize = Math.round(width + valToAdd);
        if (newSize < minWidth) {
          newSize = minWidth;
        }
        props.setLocalStore("width", String(Math.round(newSize)));
        const newWidth = panelElement.getBoundingClientRect().width;
        if (Number(props.localStore.width) < newWidth) {
          props.setLocalStore("width", String(newWidth));
        }
      } else {
        const valToAdd = position() === "bottom" ? startY - moveEvent.clientY : moveEvent.clientY - startY;
        newSize = Math.round(height + valToAdd);
        if (newSize < minHeight) {
          newSize = minHeight;
          setSelectedQueryHash(null);
        }
        props.setLocalStore("height", String(Math.round(newSize)));
      }
    };
    const unsubscribe = () => {
      if (isResizing()) {
        setIsResizing(false);
      }
      document.removeEventListener("mousemove", runDrag, false);
      document.removeEventListener("mouseUp", unsubscribe, false);
    };
    document.addEventListener("mousemove", runDrag, false);
    document.addEventListener("mouseup", unsubscribe, false);
  };
  let panelRef;
  onMount(() => {
    createResizeObserver(panelRef, ({
      width
    }, el) => {
      if (el === panelRef) {
        setPanelWidth(width);
      }
    });
  });
  createEffect(() => {
    var _a, _b;
    const rootContainer = (_b = (_a = panelRef.parentElement) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.parentElement;
    if (!rootContainer)
      return;
    const currentPosition = props.localStore.position || POSITION;
    const styleProp = getSidedProp("padding", currentPosition);
    const isVertical = props.localStore.position === "left" || props.localStore.position === "right";
    const previousPaddings = (({
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    }) => ({
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    }))(rootContainer.style);
    rootContainer.style[styleProp] = `${isVertical ? props.localStore.width : props.localStore.height}px`;
    onCleanup(() => {
      Object.entries(previousPaddings).forEach(([property, previousValue]) => {
        rootContainer.style[property] = previousValue;
      });
    });
  });
  const getPanelDynamicStyles = () => {
    const {
      colors
    } = tokens;
    const t2 = (light, dark) => theme() === "dark" ? dark : light;
    if (panelWidth() < secondBreakpoint) {
      return css`
        flex-direction: column;
        background-color: ${t2(colors.gray[300], colors.gray[600])};
      `;
    }
    return css`
      flex-direction: row;
      background-color: ${t2(colors.gray[200], colors.darkGray[900])};
    `;
  };
  return (() => {
    var _el$7 = _tmpl$33(), _el$8 = _el$7.firstChild, _el$9 = _el$8.nextSibling;
    var _ref$3 = panelRef;
    typeof _ref$3 === "function" ? use(_ref$3, _el$7) : panelRef = _el$7;
    _el$8.$$mousedown = handleDragStart;
    _el$9.$$click = () => props.setLocalStore("open", "false");
    insert(_el$9, createComponent(ChevronDown, {}));
    insert(_el$7, createComponent(ContentView, props), null);
    createRenderEffect((_p$) => {
      var _v$ = clsx(styles().panel, styles()[`panel-position-${position()}`], getPanelDynamicStyles(), {
        [css`
            min-width: min-content;
          `]: panelWidth() < thirdBreakpoint && (position() === "right" || position() === "left")
      }, "tsqd-main-panel"), _v$2 = position() === "bottom" || position() === "top" ? `${props.localStore.height || DEFAULT_HEIGHT}px` : "auto", _v$3 = position() === "right" || position() === "left" ? `${props.localStore.width || DEFAULT_WIDTH}px` : "auto", _v$4 = clsx(styles().dragHandle, styles()[`dragHandle-position-${position()}`], "tsqd-drag-handle"), _v$5 = clsx(styles().closeBtn, styles()[`closeBtn-position-${position()}`], "tsqd-minimize-btn");
      _v$ !== _p$.e && className(_el$7, _p$.e = _v$);
      _v$2 !== _p$.t && ((_p$.t = _v$2) != null ? _el$7.style.setProperty("height", _v$2) : _el$7.style.removeProperty("height"));
      _v$3 !== _p$.a && ((_p$.a = _v$3) != null ? _el$7.style.setProperty("width", _v$3) : _el$7.style.removeProperty("width"));
      _v$4 !== _p$.o && className(_el$8, _p$.o = _v$4);
      _v$5 !== _p$.i && className(_el$9, _p$.i = _v$5);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0
    });
    return _el$7;
  })();
};
var ContentView = (props) => {
  setupQueryCacheSubscription();
  setupMutationCacheSubscription();
  let containerRef;
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const pip = usePiPWindow();
  const [selectedView, setSelectedView] = createSignal("queries");
  const sort = createMemo(() => props.localStore.sort || DEFAULT_SORT_FN_NAME);
  const sortOrder = createMemo(() => Number(props.localStore.sortOrder) || DEFAULT_SORT_ORDER);
  const mutationSort = createMemo(() => props.localStore.mutationSort || DEFAULT_MUTATION_SORT_FN_NAME);
  const mutationSortOrder = createMemo(() => Number(props.localStore.mutationSortOrder) || DEFAULT_SORT_ORDER);
  const sortFn = createMemo(() => sortFns[sort()]);
  const mutationSortFn = createMemo(() => mutationSortFns[mutationSort()]);
  const onlineManager = createMemo(() => useQueryDevtoolsContext().onlineManager);
  const query_cache = createMemo(() => {
    return useQueryDevtoolsContext().client.getQueryCache();
  });
  const mutation_cache = createMemo(() => {
    return useQueryDevtoolsContext().client.getMutationCache();
  });
  const queryCount = createSubscribeToQueryCacheBatcher((queryCache) => {
    return queryCache().getAll().length;
  }, false);
  const queries = createMemo(on(() => [queryCount(), props.localStore.filter, sort(), sortOrder()], () => {
    const curr = query_cache().getAll();
    const filtered = props.localStore.filter ? curr.filter((item) => rankItem(item.queryHash, props.localStore.filter || "").passed) : [...curr];
    const sorted = sortFn() ? filtered.sort((a2, b2) => sortFn()(a2, b2) * sortOrder()) : filtered;
    return sorted;
  }));
  const mutationCount = createSubscribeToMutationCacheBatcher((mutationCache) => {
    return mutationCache().getAll().length;
  }, false);
  const mutations = createMemo(on(() => [mutationCount(), props.localStore.mutationFilter, mutationSort(), mutationSortOrder()], () => {
    const curr = mutation_cache().getAll();
    const filtered = props.localStore.mutationFilter ? curr.filter((item) => {
      const value = `${item.options.mutationKey ? JSON.stringify(item.options.mutationKey) + " - " : ""}${new Date(item.state.submittedAt).toLocaleString()}`;
      return rankItem(value, props.localStore.mutationFilter || "").passed;
    }) : [...curr];
    const sorted = mutationSortFn() ? filtered.sort((a2, b2) => mutationSortFn()(a2, b2) * mutationSortOrder()) : filtered;
    return sorted;
  }));
  const setDevtoolsPosition = (pos) => {
    props.setLocalStore("position", pos);
  };
  const setComputedVariables = (el) => {
    const computedStyle = getComputedStyle(containerRef);
    const variable = computedStyle.getPropertyValue("--tsqd-font-size");
    el.style.setProperty("--tsqd-font-size", variable);
  };
  return [(() => {
    var _el$10 = _tmpl$212(), _el$11 = _el$10.firstChild, _el$12 = _el$11.firstChild, _el$13 = _el$12.firstChild, _el$14 = _el$13.firstChild, _el$15 = _el$14.nextSibling, _el$16 = _el$15.firstChild, _el$17 = _el$11.nextSibling, _el$18 = _el$17.firstChild, _el$19 = _el$18.firstChild, _el$20 = _el$19.firstChild, _el$21 = _el$19.nextSibling, _el$24 = _el$21.nextSibling, _el$27 = _el$18.nextSibling, _el$28 = _el$27.firstChild, _el$29 = _el$28.nextSibling;
    var _ref$4 = containerRef;
    typeof _ref$4 === "function" ? use(_ref$4, _el$10) : containerRef = _el$10;
    _el$13.$$click = () => {
      if (!pip().pipWindow && !props.showPanelViewOnly) {
        props.setLocalStore("open", "false");
        return;
      }
      if (props.onClose) {
        props.onClose();
      }
    };
    insert(_el$15, () => useQueryDevtoolsContext().queryFlavor, _el$16);
    insert(_el$15, () => useQueryDevtoolsContext().version, null);
    insert(_el$12, createComponent(radio_group_exports.Root, {
      get ["class"]() {
        return clsx(styles().viewToggle);
      },
      get value() {
        return selectedView();
      },
      onChange: (value) => {
        setSelectedView(value);
        setSelectedQueryHash(null);
        setSelectedMutationId(null);
      },
      get children() {
        return [createComponent(radio_group_exports.Item, {
          value: "queries",
          "class": "tsqd-radio-toggle",
          get children() {
            return [createComponent(radio_group_exports.ItemInput, {}), createComponent(radio_group_exports.ItemControl, {
              get children() {
                return createComponent(radio_group_exports.ItemIndicator, {});
              }
            }), createComponent(radio_group_exports.ItemLabel, {
              title: "Toggle Queries View",
              children: "Queries"
            })];
          }
        }), createComponent(radio_group_exports.Item, {
          value: "mutations",
          "class": "tsqd-radio-toggle",
          get children() {
            return [createComponent(radio_group_exports.ItemInput, {}), createComponent(radio_group_exports.ItemControl, {
              get children() {
                return createComponent(radio_group_exports.ItemIndicator, {});
              }
            }), createComponent(radio_group_exports.ItemLabel, {
              title: "Toggle Mutations View",
              children: "Mutations"
            })];
          }
        })];
      }
    }), null);
    insert(_el$11, createComponent(Show, {
      get when() {
        return selectedView() === "queries";
      },
      get children() {
        return createComponent(QueryStatusCount, {});
      }
    }), null);
    insert(_el$11, createComponent(Show, {
      get when() {
        return selectedView() === "mutations";
      },
      get children() {
        return createComponent(MutationStatusCount, {});
      }
    }), null);
    insert(_el$19, createComponent(Search, {}), _el$20);
    _el$20.$$input = (e2) => {
      if (selectedView() === "queries") {
        props.setLocalStore("filter", e2.currentTarget.value);
      } else {
        props.setLocalStore("mutationFilter", e2.currentTarget.value);
      }
    };
    insert(_el$21, createComponent(Show, {
      get when() {
        return selectedView() === "queries";
      },
      get children() {
        var _el$22 = _tmpl$43();
        _el$22.addEventListener("change", (e2) => {
          props.setLocalStore("sort", e2.currentTarget.value);
        });
        insert(_el$22, () => Object.keys(sortFns).map((key) => (() => {
          var _el$45 = _tmpl$223();
          _el$45.firstChild;
          _el$45.value = key;
          insert(_el$45, key, null);
          return _el$45;
        })()));
        createRenderEffect(() => _el$22.value = sort());
        return _el$22;
      }
    }), null);
    insert(_el$21, createComponent(Show, {
      get when() {
        return selectedView() === "mutations";
      },
      get children() {
        var _el$23 = _tmpl$53();
        _el$23.addEventListener("change", (e2) => {
          props.setLocalStore("mutationSort", e2.currentTarget.value);
        });
        insert(_el$23, () => Object.keys(mutationSortFns).map((key) => (() => {
          var _el$47 = _tmpl$223();
          _el$47.firstChild;
          _el$47.value = key;
          insert(_el$47, key, null);
          return _el$47;
        })()));
        createRenderEffect(() => _el$23.value = mutationSort());
        return _el$23;
      }
    }), null);
    insert(_el$21, createComponent(ChevronDown, {}), null);
    _el$24.$$click = () => {
      if (selectedView() === "queries") {
        props.setLocalStore("sortOrder", String(sortOrder() * -1));
      } else {
        props.setLocalStore("mutationSortOrder", String(mutationSortOrder() * -1));
      }
    };
    insert(_el$24, createComponent(Show, {
      get when() {
        return (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === 1;
      },
      get children() {
        return [_tmpl$63(), createComponent(ArrowUp, {})];
      }
    }), null);
    insert(_el$24, createComponent(Show, {
      get when() {
        return (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1;
      },
      get children() {
        return [_tmpl$73(), createComponent(ArrowDown, {})];
      }
    }), null);
    _el$28.$$click = () => {
      if (selectedView() === "queries") {
        query_cache().clear();
      } else {
        mutation_cache().clear();
      }
    };
    insert(_el$28, createComponent(Trash, {}));
    _el$29.$$click = () => {
      if (offline()) {
        onlineManager().setOnline(true);
        setOffline(false);
      } else {
        onlineManager().setOnline(false);
        setOffline(true);
      }
    };
    insert(_el$29, (() => {
      var _c$ = createMemo(() => !!offline());
      return () => _c$() ? createComponent(Offline, {}) : createComponent(Wifi, {});
    })());
    insert(_el$27, createComponent(Show, {
      get when() {
        return createMemo(() => !!!pip().pipWindow)() && !pip().disabled;
      },
      get children() {
        var _el$30 = _tmpl$83();
        _el$30.$$click = () => {
          pip().requestPipWindow(Number(window.innerWidth), Number(props.localStore.height ?? 500));
        };
        insert(_el$30, createComponent(PiPIcon, {}));
        createRenderEffect(() => className(_el$30, clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-open-pip")));
        return _el$30;
      }
    }), null);
    insert(_el$27, createComponent(dropdown_menu_exports.Root, {
      gutter: 4,
      get children() {
        return [createComponent(dropdown_menu_exports.Trigger, {
          get ["class"]() {
            return clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-settings");
          },
          get children() {
            return createComponent(Settings, {});
          }
        }), createComponent(dropdown_menu_exports.Portal, {
          ref: (el) => setComputedVariables(el),
          get mount() {
            return createMemo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
          },
          get children() {
            return createComponent(dropdown_menu_exports.Content, {
              get ["class"]() {
                return clsx(styles().settingsMenu, "tsqd-settings-menu");
              },
              get children() {
                return [(() => {
                  var _el$31 = _tmpl$93();
                  createRenderEffect(() => className(_el$31, clsx(styles().settingsMenuHeader, "tsqd-settings-menu-header")));
                  return _el$31;
                })(), createComponent(Show, {
                  get when() {
                    return !props.showPanelViewOnly;
                  },
                  get children() {
                    return createComponent(dropdown_menu_exports.Sub, {
                      overlap: true,
                      gutter: 8,
                      shift: -4,
                      get children() {
                        return [createComponent(dropdown_menu_exports.SubTrigger, {
                          get ["class"]() {
                            return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-position");
                          },
                          get children() {
                            return [_tmpl$103(), createComponent(ChevronDown, {})];
                          }
                        }), createComponent(dropdown_menu_exports.Portal, {
                          ref: (el) => setComputedVariables(el),
                          get mount() {
                            return createMemo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                          },
                          get children() {
                            return createComponent(dropdown_menu_exports.SubContent, {
                              get ["class"]() {
                                return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                              },
                              get children() {
                                return [createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    setDevtoolsPosition("top");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-top");
                                  },
                                  get children() {
                                    return [_tmpl$113(), createComponent(ArrowUp, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    setDevtoolsPosition("bottom");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-bottom");
                                  },
                                  get children() {
                                    return [_tmpl$123(), createComponent(ArrowDown, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    setDevtoolsPosition("left");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-left");
                                  },
                                  get children() {
                                    return [_tmpl$132(), createComponent(ArrowLeft, {})];
                                  }
                                }), createComponent(dropdown_menu_exports.Item, {
                                  onSelect: () => {
                                    setDevtoolsPosition("right");
                                  },
                                  as: "button",
                                  get ["class"]() {
                                    return clsx(styles().settingsSubButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-right");
                                  },
                                  get children() {
                                    return [_tmpl$142(), createComponent(ArrowRight, {})];
                                  }
                                })];
                              }
                            });
                          }
                        })];
                      }
                    });
                  }
                }), createComponent(dropdown_menu_exports.Sub, {
                  overlap: true,
                  gutter: 8,
                  shift: -4,
                  get children() {
                    return [createComponent(dropdown_menu_exports.SubTrigger, {
                      get ["class"]() {
                        return clsx(styles().settingsSubTrigger, "tsqd-settings-menu-sub-trigger", "tsqd-settings-menu-sub-trigger-position");
                      },
                      get children() {
                        return [_tmpl$152(), createComponent(ChevronDown, {})];
                      }
                    }), createComponent(dropdown_menu_exports.Portal, {
                      ref: (el) => setComputedVariables(el),
                      get mount() {
                        return createMemo(() => !!pip().pipWindow)() ? pip().pipWindow.document.body : document.body;
                      },
                      get children() {
                        return createComponent(dropdown_menu_exports.SubContent, {
                          get ["class"]() {
                            return clsx(styles().settingsMenu, "tsqd-settings-submenu");
                          },
                          get children() {
                            return [createComponent(dropdown_menu_exports.Item, {
                              onSelect: () => {
                                props.setLocalStore("theme_preference", "light");
                              },
                              as: "button",
                              get ["class"]() {
                                return clsx(styles().settingsSubButton, props.localStore.theme_preference === "light" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-top");
                              },
                              get children() {
                                return [_tmpl$162(), createComponent(Sun, {})];
                              }
                            }), createComponent(dropdown_menu_exports.Item, {
                              onSelect: () => {
                                props.setLocalStore("theme_preference", "dark");
                              },
                              as: "button",
                              get ["class"]() {
                                return clsx(styles().settingsSubButton, props.localStore.theme_preference === "dark" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-bottom");
                              },
                              get children() {
                                return [_tmpl$172(), createComponent(Moon, {})];
                              }
                            }), createComponent(dropdown_menu_exports.Item, {
                              onSelect: () => {
                                props.setLocalStore("theme_preference", "system");
                              },
                              as: "button",
                              get ["class"]() {
                                return clsx(styles().settingsSubButton, props.localStore.theme_preference === "system" && styles().themeSelectedButton, "tsqd-settings-menu-position-btn", "tsqd-settings-menu-position-btn-left");
                              },
                              get children() {
                                return [_tmpl$182(), createComponent(Monitor, {})];
                              }
                            })];
                          }
                        });
                      }
                    })];
                  }
                })];
              }
            });
          }
        })];
      }
    }), null);
    insert(_el$10, createComponent(Show, {
      get when() {
        return selectedView() === "queries";
      },
      get children() {
        var _el$41 = _tmpl$192(), _el$42 = _el$41.firstChild;
        insert(_el$42, createComponent(Key, {
          by: (q) => q.queryHash,
          get each() {
            return queries();
          },
          children: (query) => createComponent(QueryRow, {
            get query() {
              return query();
            }
          })
        }));
        createRenderEffect(() => className(_el$41, clsx(styles().overflowQueryContainer, "tsqd-queries-overflow-container")));
        return _el$41;
      }
    }), null);
    insert(_el$10, createComponent(Show, {
      get when() {
        return selectedView() === "mutations";
      },
      get children() {
        var _el$43 = _tmpl$202(), _el$44 = _el$43.firstChild;
        insert(_el$44, createComponent(Key, {
          by: (m) => m.mutationId,
          get each() {
            return mutations();
          },
          children: (mutation) => createComponent(MutationRow, {
            get mutation() {
              return mutation();
            }
          })
        }));
        createRenderEffect(() => className(_el$43, clsx(styles().overflowQueryContainer, "tsqd-mutations-overflow-container")));
        return _el$43;
      }
    }), null);
    createRenderEffect((_p$) => {
      var _v$6 = clsx(styles().queriesContainer, panelWidth() < secondBreakpoint && (selectedQueryHash() || selectedMutationId()) && css`
              height: 50%;
              max-height: 50%;
            `, panelWidth() < secondBreakpoint && !(selectedQueryHash() || selectedMutationId()) && css`
              height: 100%;
              max-height: 100%;
            `, "tsqd-queries-container"), _v$7 = clsx(styles().row, "tsqd-header"), _v$8 = styles().logoAndToggleContainer, _v$9 = clsx(styles().logo, "tsqd-text-logo-container"), _v$10 = clsx(styles().tanstackLogo, "tsqd-text-logo-tanstack"), _v$11 = clsx(styles().queryFlavorLogo, "tsqd-text-logo-query-flavor"), _v$12 = clsx(styles().row, "tsqd-filters-actions-container"), _v$13 = clsx(styles().filtersContainer, "tsqd-filters-container"), _v$14 = clsx(styles().filterInput, "tsqd-query-filter-textfield-container"), _v$15 = clsx("tsqd-query-filter-textfield"), _v$16 = clsx(styles().filterSelect, "tsqd-query-filter-sort-container"), _v$17 = `Sort order ${(selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1 ? "descending" : "ascending"}`, _v$18 = (selectedView() === "queries" ? sortOrder() : mutationSortOrder()) === -1, _v$19 = clsx(styles().actionsContainer, "tsqd-actions-container"), _v$20 = clsx(styles().actionsBtn, "tsqd-actions-btn", "tsqd-action-clear-cache"), _v$21 = `Clear ${selectedView()} cache`, _v$22 = clsx(styles().actionsBtn, offline() && styles().actionsBtnOffline, "tsqd-actions-btn", "tsqd-action-mock-offline-behavior"), _v$23 = `${offline() ? "Unset offline mocking behavior" : "Mock offline behavior"}`, _v$24 = offline(), _v$25 = `${offline() ? "Unset offline mocking behavior" : "Mock offline behavior"}`;
      _v$6 !== _p$.e && className(_el$10, _p$.e = _v$6);
      _v$7 !== _p$.t && className(_el$11, _p$.t = _v$7);
      _v$8 !== _p$.a && className(_el$12, _p$.a = _v$8);
      _v$9 !== _p$.o && className(_el$13, _p$.o = _v$9);
      _v$10 !== _p$.i && className(_el$14, _p$.i = _v$10);
      _v$11 !== _p$.n && className(_el$15, _p$.n = _v$11);
      _v$12 !== _p$.s && className(_el$17, _p$.s = _v$12);
      _v$13 !== _p$.h && className(_el$18, _p$.h = _v$13);
      _v$14 !== _p$.r && className(_el$19, _p$.r = _v$14);
      _v$15 !== _p$.d && className(_el$20, _p$.d = _v$15);
      _v$16 !== _p$.l && className(_el$21, _p$.l = _v$16);
      _v$17 !== _p$.u && setAttribute(_el$24, "aria-label", _p$.u = _v$17);
      _v$18 !== _p$.c && setAttribute(_el$24, "aria-pressed", _p$.c = _v$18);
      _v$19 !== _p$.w && className(_el$27, _p$.w = _v$19);
      _v$20 !== _p$.m && className(_el$28, _p$.m = _v$20);
      _v$21 !== _p$.f && setAttribute(_el$28, "title", _p$.f = _v$21);
      _v$22 !== _p$.y && className(_el$29, _p$.y = _v$22);
      _v$23 !== _p$.g && setAttribute(_el$29, "aria-label", _p$.g = _v$23);
      _v$24 !== _p$.p && setAttribute(_el$29, "aria-pressed", _p$.p = _v$24);
      _v$25 !== _p$.b && setAttribute(_el$29, "title", _p$.b = _v$25);
      return _p$;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0,
      i: void 0,
      n: void 0,
      s: void 0,
      h: void 0,
      r: void 0,
      d: void 0,
      l: void 0,
      u: void 0,
      c: void 0,
      w: void 0,
      m: void 0,
      f: void 0,
      y: void 0,
      g: void 0,
      p: void 0,
      b: void 0
    });
    createRenderEffect(() => _el$20.value = selectedView() === "queries" ? props.localStore.filter || "" : props.localStore.mutationFilter || "");
    return _el$10;
  })(), createComponent(Show, {
    get when() {
      return createMemo(() => selectedView() === "queries")() && selectedQueryHash();
    },
    get children() {
      return createComponent(QueryDetails, {});
    }
  }), createComponent(Show, {
    get when() {
      return createMemo(() => selectedView() === "mutations")() && selectedMutationId();
    },
    get children() {
      return createComponent(MutationDetails, {});
    }
  })];
};
var QueryRow = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors,
    alpha
  } = tokens;
  const t2 = (light, dark) => theme() === "dark" ? dark : light;
  const queryState = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return (_a = queryCache().find({
      queryKey: props.query.queryKey
    })) == null ? void 0 : _a.state;
  }, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const isDisabled = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return ((_a = queryCache().find({
      queryKey: props.query.queryKey
    })) == null ? void 0 : _a.isDisabled()) ?? false;
  }, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const isStale = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return ((_a = queryCache().find({
      queryKey: props.query.queryKey
    })) == null ? void 0 : _a.isStale()) ?? false;
  }, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const observers = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return ((_a = queryCache().find({
      queryKey: props.query.queryKey
    })) == null ? void 0 : _a.getObserversCount()) ?? 0;
  }, true, (e2) => e2.query.queryHash === props.query.queryHash);
  const color = createMemo(() => getQueryStatusColor({
    queryState: queryState(),
    observerCount: observers(),
    isStale: isStale()
  }));
  const getObserverCountColorStyles = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
      `;
    }
    return css`
      background-color: ${t2(colors[color()][200] + alpha[80], colors[color()][900])};
      color: ${t2(colors[color()][800], colors[color()][300])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return queryState();
    },
    get children() {
      var _el$49 = _tmpl$242(), _el$50 = _el$49.firstChild, _el$51 = _el$50.nextSibling;
      _el$49.$$click = () => setSelectedQueryHash(props.query.queryHash === selectedQueryHash() ? null : props.query.queryHash);
      insert(_el$50, observers);
      insert(_el$51, () => props.query.queryHash);
      insert(_el$49, createComponent(Show, {
        get when() {
          return isDisabled();
        },
        get children() {
          return _tmpl$232();
        }
      }), null);
      createRenderEffect((_p$) => {
        var _v$26 = clsx(styles().queryRow, selectedQueryHash() === props.query.queryHash && styles().selectedQueryRow, "tsqd-query-row"), _v$27 = `Query key ${props.query.queryHash}`, _v$28 = clsx(getObserverCountColorStyles(), "tsqd-query-observer-count");
        _v$26 !== _p$.e && className(_el$49, _p$.e = _v$26);
        _v$27 !== _p$.t && setAttribute(_el$49, "aria-label", _p$.t = _v$27);
        _v$28 !== _p$.a && className(_el$50, _p$.a = _v$28);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$49;
    }
  });
};
var MutationRow = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors,
    alpha
  } = tokens;
  const t2 = (light, dark) => theme() === "dark" ? dark : light;
  const mutationState = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
    return mutation == null ? void 0 : mutation.state;
  });
  const isPaused = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
    if (!mutation)
      return false;
    return mutation.state.isPaused;
  });
  const status = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === props.mutation.mutationId);
    if (!mutation)
      return "idle";
    return mutation.state.status;
  });
  const color = createMemo(() => getMutationStatusColor({
    isPaused: isPaused(),
    status: status()
  }));
  const getObserverCountColorStyles = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
      `;
    }
    return css`
      background-color: ${t2(colors[color()][200] + alpha[80], colors[color()][900])};
      color: ${t2(colors[color()][800], colors[color()][300])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return mutationState();
    },
    get children() {
      var _el$53 = _tmpl$242(), _el$54 = _el$53.firstChild, _el$55 = _el$54.nextSibling;
      _el$53.$$click = () => {
        setSelectedMutationId(props.mutation.mutationId === selectedMutationId() ? null : props.mutation.mutationId);
      };
      insert(_el$54, createComponent(Show, {
        get when() {
          return color() === "purple";
        },
        get children() {
          return createComponent(PauseCircle, {});
        }
      }), null);
      insert(_el$54, createComponent(Show, {
        get when() {
          return color() === "green";
        },
        get children() {
          return createComponent(CheckCircle, {});
        }
      }), null);
      insert(_el$54, createComponent(Show, {
        get when() {
          return color() === "red";
        },
        get children() {
          return createComponent(XCircle, {});
        }
      }), null);
      insert(_el$54, createComponent(Show, {
        get when() {
          return color() === "yellow";
        },
        get children() {
          return createComponent(LoadingCircle, {});
        }
      }), null);
      insert(_el$55, createComponent(Show, {
        get when() {
          return props.mutation.options.mutationKey;
        },
        get children() {
          return [createMemo(() => JSON.stringify(props.mutation.options.mutationKey)), " -", " "];
        }
      }), null);
      insert(_el$55, () => new Date(props.mutation.state.submittedAt).toLocaleString(), null);
      createRenderEffect((_p$) => {
        var _v$29 = clsx(styles().queryRow, selectedMutationId() === props.mutation.mutationId && styles().selectedQueryRow, "tsqd-query-row"), _v$30 = `Mutation submitted at ${new Date(props.mutation.state.submittedAt).toLocaleString()}`, _v$31 = clsx(getObserverCountColorStyles(), "tsqd-query-observer-count");
        _v$29 !== _p$.e && className(_el$53, _p$.e = _v$29);
        _v$30 !== _p$.t && setAttribute(_el$53, "aria-label", _p$.t = _v$30);
        _v$31 !== _p$.a && className(_el$54, _p$.a = _v$31);
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0
      });
      return _el$53;
    }
  });
};
var QueryStatusCount = () => {
  const stale = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "stale").length);
  const fresh = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "fresh").length);
  const fetching = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "fetching").length);
  const paused = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "paused").length);
  const inactive = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().filter((q) => getQueryStatusLabel(q) === "inactive").length);
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  return (() => {
    var _el$56 = _tmpl$27();
    insert(_el$56, createComponent(QueryStatus, {
      label: "Fresh",
      color: "green",
      get count() {
        return fresh();
      }
    }), null);
    insert(_el$56, createComponent(QueryStatus, {
      label: "Fetching",
      color: "blue",
      get count() {
        return fetching();
      }
    }), null);
    insert(_el$56, createComponent(QueryStatus, {
      label: "Paused",
      color: "purple",
      get count() {
        return paused();
      }
    }), null);
    insert(_el$56, createComponent(QueryStatus, {
      label: "Stale",
      color: "yellow",
      get count() {
        return stale();
      }
    }), null);
    insert(_el$56, createComponent(QueryStatus, {
      label: "Inactive",
      color: "gray",
      get count() {
        return inactive();
      }
    }), null);
    createRenderEffect(() => className(_el$56, clsx(styles().queryStatusContainer, "tsqd-query-status-container")));
    return _el$56;
  })();
};
var MutationStatusCount = () => {
  const success = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "green").length);
  const pending = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "yellow").length);
  const paused = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "purple").length);
  const error = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().filter((m) => getMutationStatusColor({
    isPaused: m.state.isPaused,
    status: m.state.status
  }) === "red").length);
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  return (() => {
    var _el$57 = _tmpl$27();
    insert(_el$57, createComponent(QueryStatus, {
      label: "Paused",
      color: "purple",
      get count() {
        return paused();
      }
    }), null);
    insert(_el$57, createComponent(QueryStatus, {
      label: "Pending",
      color: "yellow",
      get count() {
        return pending();
      }
    }), null);
    insert(_el$57, createComponent(QueryStatus, {
      label: "Success",
      color: "green",
      get count() {
        return success();
      }
    }), null);
    insert(_el$57, createComponent(QueryStatus, {
      label: "Error",
      color: "red",
      get count() {
        return error();
      }
    }), null);
    createRenderEffect(() => className(_el$57, clsx(styles().queryStatusContainer, "tsqd-query-status-container")));
    return _el$57;
  })();
};
var QueryStatus = (props) => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors,
    alpha
  } = tokens;
  const t2 = (light, dark) => theme() === "dark" ? dark : light;
  let tagRef;
  const [mouseOver, setMouseOver] = createSignal(false);
  const [focused, setFocused] = createSignal(false);
  const showLabel = createMemo(() => {
    if (selectedQueryHash()) {
      if (panelWidth() < firstBreakpoint && panelWidth() > secondBreakpoint) {
        return false;
      }
    }
    if (panelWidth() < secondBreakpoint) {
      return false;
    }
    return true;
  });
  return (() => {
    var _el$58 = _tmpl$272(), _el$60 = _el$58.firstChild, _el$62 = _el$60.nextSibling;
    var _ref$5 = tagRef;
    typeof _ref$5 === "function" ? use(_ref$5, _el$58) : tagRef = _el$58;
    _el$58.addEventListener("mouseleave", () => {
      setMouseOver(false);
      setFocused(false);
    });
    _el$58.addEventListener("mouseenter", () => setMouseOver(true));
    _el$58.addEventListener("blur", () => setFocused(false));
    _el$58.addEventListener("focus", () => setFocused(true));
    spread(_el$58, mergeProps({
      get disabled() {
        return showLabel();
      },
      get ["class"]() {
        return clsx(styles().queryStatusTag, !showLabel() && css`
            cursor: pointer;
            &:hover {
              background: ${t2(colors.gray[200], colors.darkGray[400])}${alpha[80]};
            }
          `, "tsqd-query-status-tag", `tsqd-query-status-tag-${props.label.toLowerCase()}`);
      }
    }, () => mouseOver() || focused() ? {
      "aria-describedby": "tsqd-status-tooltip"
    } : {}), false, true);
    insert(_el$58, createComponent(Show, {
      get when() {
        return createMemo(() => !!!showLabel())() && (mouseOver() || focused());
      },
      get children() {
        var _el$59 = _tmpl$252();
        insert(_el$59, () => props.label);
        createRenderEffect(() => className(_el$59, clsx(styles().statusTooltip, "tsqd-query-status-tooltip")));
        return _el$59;
      }
    }), _el$60);
    insert(_el$58, createComponent(Show, {
      get when() {
        return showLabel();
      },
      get children() {
        var _el$61 = _tmpl$262();
        insert(_el$61, () => props.label);
        createRenderEffect(() => className(_el$61, clsx(styles().queryStatusTagLabel, "tsqd-query-status-tag-label")));
        return _el$61;
      }
    }), _el$62);
    insert(_el$62, () => props.count);
    createRenderEffect((_p$) => {
      var _v$32 = clsx(css`
            width: ${tokens.size[1.5]};
            height: ${tokens.size[1.5]};
            border-radius: ${tokens.border.radius.full};
            background-color: ${tokens.colors[props.color][500]};
          `, "tsqd-query-status-tag-dot"), _v$33 = clsx(styles().queryStatusCount, props.count > 0 && props.color !== "gray" && css`
              background-color: ${t2(colors[props.color][100], colors[props.color][900])};
              color: ${t2(colors[props.color][700], colors[props.color][300])};
            `, "tsqd-query-status-tag-count");
      _v$32 !== _p$.e && className(_el$60, _p$.e = _v$32);
      _v$33 !== _p$.t && className(_el$62, _p$.t = _v$33);
      return _p$;
    }, {
      e: void 0,
      t: void 0
    });
    return _el$58;
  })();
};
var QueryDetails = () => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors
  } = tokens;
  const t2 = (light, dark) => theme() === "dark" ? dark : light;
  const queryClient = useQueryDevtoolsContext().client;
  const [restoringLoading, setRestoringLoading] = createSignal(false);
  const [dataMode, setDataMode] = createSignal("view");
  const [dataEditError, setDataEditError] = createSignal(false);
  const errorTypes = createMemo(() => {
    return useQueryDevtoolsContext().errorTypes || [];
  });
  const activeQuery = createSubscribeToQueryCacheBatcher((queryCache) => queryCache().getAll().find((query) => query.queryHash === selectedQueryHash()), false);
  const activeQueryFresh = createSubscribeToQueryCacheBatcher((queryCache) => {
    return queryCache().getAll().find((query) => query.queryHash === selectedQueryHash());
  }, false);
  const activeQueryState = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return (_a = queryCache().getAll().find((query) => query.queryHash === selectedQueryHash())) == null ? void 0 : _a.state;
  }, false);
  const activeQueryStateData = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return (_a = queryCache().getAll().find((query) => query.queryHash === selectedQueryHash())) == null ? void 0 : _a.state.data;
  }, false);
  const statusLabel = createSubscribeToQueryCacheBatcher((queryCache) => {
    const query = queryCache().getAll().find((q) => q.queryHash === selectedQueryHash());
    if (!query)
      return "inactive";
    return getQueryStatusLabel(query);
  });
  const queryStatus = createSubscribeToQueryCacheBatcher((queryCache) => {
    const query = queryCache().getAll().find((q) => q.queryHash === selectedQueryHash());
    if (!query)
      return "pending";
    return query.state.status;
  });
  const observerCount = createSubscribeToQueryCacheBatcher((queryCache) => {
    var _a;
    return ((_a = queryCache().getAll().find((query) => query.queryHash === selectedQueryHash())) == null ? void 0 : _a.getObserversCount()) ?? 0;
  });
  const color = createMemo(() => getQueryStatusColorByLabel(statusLabel()));
  const handleRefetch = () => {
    var _a;
    const promise = (_a = activeQuery()) == null ? void 0 : _a.fetch();
    promise == null ? void 0 : promise.catch(() => {
    });
  };
  const triggerError = (errorType) => {
    const error = (errorType == null ? void 0 : errorType.initializer(activeQuery())) ?? new Error("Unknown error from devtools");
    const __previousQueryOptions = activeQuery().options;
    activeQuery().setState({
      status: "error",
      error,
      fetchMeta: {
        ...activeQuery().state.fetchMeta,
        __previousQueryOptions
      }
    });
  };
  const restoreQueryAfterLoadingOrError = () => {
    const activeQueryVal = activeQuery();
    const previousState = activeQueryVal.state;
    const previousOptions = activeQueryVal.state.fetchMeta ? activeQueryVal.state.fetchMeta.__previousQueryOptions : null;
    activeQueryVal.cancel({
      silent: true
    });
    activeQueryVal.setState({
      ...previousState,
      fetchStatus: "idle",
      fetchMeta: null
    });
    if (previousOptions) {
      activeQueryVal.fetch(previousOptions);
    }
  };
  createEffect(() => {
    if (statusLabel() !== "fetching") {
      setRestoringLoading(false);
    }
  });
  const getQueryStatusColors = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
        border-color: ${t2(colors[color()][400], colors[color()][600])};
      `;
    }
    return css`
      background-color: ${t2(colors[color()][100], colors[color()][900])};
      color: ${t2(colors[color()][700], colors[color()][300])};
      border-color: ${t2(colors[color()][400], colors[color()][600])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return createMemo(() => !!activeQuery())() && activeQueryState();
    },
    get children() {
      var _el$63 = _tmpl$322(), _el$64 = _el$63.firstChild, _el$65 = _el$64.nextSibling, _el$66 = _el$65.firstChild, _el$67 = _el$66.firstChild, _el$68 = _el$67.firstChild, _el$69 = _el$67.nextSibling, _el$70 = _el$66.nextSibling, _el$71 = _el$70.firstChild, _el$72 = _el$71.nextSibling, _el$73 = _el$70.nextSibling, _el$74 = _el$73.firstChild, _el$75 = _el$74.nextSibling, _el$76 = _el$65.nextSibling, _el$77 = _el$76.nextSibling, _el$78 = _el$77.firstChild, _el$79 = _el$78.firstChild, _el$80 = _el$78.nextSibling, _el$81 = _el$80.firstChild, _el$82 = _el$80.nextSibling, _el$83 = _el$82.firstChild, _el$84 = _el$82.nextSibling, _el$85 = _el$84.firstChild, _el$86 = _el$84.nextSibling, _el$87 = _el$86.firstChild, _el$88 = _el$87.nextSibling, _el$97 = _el$77.nextSibling;
      _el$97.firstChild;
      var _el$107 = _el$97.nextSibling, _el$108 = _el$107.nextSibling;
      insert(_el$68, () => displayValue(activeQuery().queryKey, true));
      insert(_el$69, statusLabel);
      insert(_el$72, observerCount);
      insert(_el$75, () => new Date(activeQueryState().dataUpdatedAt).toLocaleTimeString());
      _el$78.$$click = handleRefetch;
      _el$80.$$click = () => queryClient.invalidateQueries(activeQuery());
      _el$82.$$click = () => queryClient.resetQueries(activeQuery());
      _el$84.$$click = () => {
        queryClient.removeQueries(activeQuery());
        setSelectedQueryHash(null);
      };
      _el$86.$$click = () => {
        var _a;
        if (((_a = activeQuery()) == null ? void 0 : _a.state.data) === void 0) {
          setRestoringLoading(true);
          restoreQueryAfterLoadingOrError();
        } else {
          const activeQueryVal = activeQuery();
          if (!activeQueryVal)
            return;
          const __previousQueryOptions = activeQueryVal.options;
          activeQueryVal.fetch({
            ...__previousQueryOptions,
            queryFn: () => {
              return new Promise(() => {
              });
            },
            gcTime: -1
          });
          activeQueryVal.setState({
            data: void 0,
            status: "pending",
            fetchMeta: {
              ...activeQueryVal.state.fetchMeta,
              __previousQueryOptions
            }
          });
        }
      };
      insert(_el$86, () => queryStatus() === "pending" ? "Restore" : "Trigger", _el$88);
      insert(_el$77, createComponent(Show, {
        get when() {
          return errorTypes().length === 0 || queryStatus() === "error";
        },
        get children() {
          var _el$89 = _tmpl$28(), _el$90 = _el$89.firstChild, _el$91 = _el$90.nextSibling;
          _el$89.$$click = () => {
            if (!activeQuery().state.error) {
              triggerError();
            } else {
              queryClient.resetQueries(activeQuery());
            }
          };
          insert(_el$89, () => queryStatus() === "error" ? "Restore" : "Trigger", _el$91);
          createRenderEffect((_p$) => {
            var _v$34 = clsx(css`
                  color: ${t2(colors.red[500], colors.red[400])};
                `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-error"), _v$35 = queryStatus() === "pending", _v$36 = css`
                  background-color: ${t2(colors.red[500], colors.red[400])};
                `;
            _v$34 !== _p$.e && className(_el$89, _p$.e = _v$34);
            _v$35 !== _p$.t && (_el$89.disabled = _p$.t = _v$35);
            _v$36 !== _p$.a && className(_el$90, _p$.a = _v$36);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          });
          return _el$89;
        }
      }), null);
      insert(_el$77, createComponent(Show, {
        get when() {
          return !(errorTypes().length === 0 || queryStatus() === "error");
        },
        get children() {
          var _el$92 = _tmpl$29(), _el$93 = _el$92.firstChild, _el$94 = _el$93.nextSibling, _el$95 = _el$94.nextSibling;
          _el$95.firstChild;
          _el$95.addEventListener("change", (e2) => {
            const errorType = errorTypes().find((et) => et.name === e2.currentTarget.value);
            triggerError(errorType);
          });
          insert(_el$95, createComponent(For, {
            get each() {
              return errorTypes();
            },
            children: (errorType) => (() => {
              var _el$109 = _tmpl$332();
              insert(_el$109, () => errorType.name);
              createRenderEffect(() => _el$109.value = errorType.name);
              return _el$109;
            })()
          }), null);
          insert(_el$92, createComponent(ChevronDown, {}), null);
          createRenderEffect((_p$) => {
            var _v$37 = clsx(styles().actionsSelect, "tsqd-query-details-actions-btn", "tsqd-query-details-action-error-multiple"), _v$38 = css`
                  background-color: ${tokens.colors.red[400]};
                `, _v$39 = queryStatus() === "pending";
            _v$37 !== _p$.e && className(_el$92, _p$.e = _v$37);
            _v$38 !== _p$.t && className(_el$93, _p$.t = _v$38);
            _v$39 !== _p$.a && (_el$95.disabled = _p$.a = _v$39);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0
          });
          return _el$92;
        }
      }), null);
      insert(_el$97, () => dataMode() === "view" ? "Explorer" : "Editor", null);
      insert(_el$63, createComponent(Show, {
        get when() {
          return dataMode() === "view";
        },
        get children() {
          var _el$99 = _tmpl$30();
          insert(_el$99, createComponent(Explorer, {
            label: "Data",
            defaultExpanded: ["Data"],
            get value() {
              return activeQueryStateData();
            },
            editable: true,
            onEdit: () => setDataMode("edit"),
            get activeQuery() {
              return activeQuery();
            }
          }));
          createRenderEffect((_$p) => (_$p = tokens.size[2]) != null ? _el$99.style.setProperty("padding", _$p) : _el$99.style.removeProperty("padding"));
          return _el$99;
        }
      }), _el$107);
      insert(_el$63, createComponent(Show, {
        get when() {
          return dataMode() === "edit";
        },
        get children() {
          var _el$100 = _tmpl$31(), _el$101 = _el$100.firstChild, _el$102 = _el$101.nextSibling, _el$103 = _el$102.firstChild, _el$104 = _el$103.nextSibling, _el$105 = _el$104.firstChild, _el$106 = _el$105.nextSibling;
          _el$100.addEventListener("submit", (e2) => {
            e2.preventDefault();
            const formData = new FormData(e2.currentTarget);
            const data = formData.get("data");
            try {
              const parsedData = JSON.parse(data);
              activeQuery().setState({
                ...activeQuery().state,
                data: parsedData
              });
              setDataMode("view");
            } catch (error) {
              setDataEditError(true);
            }
          });
          _el$101.addEventListener("focus", () => setDataEditError(false));
          insert(_el$103, () => dataEditError() ? "Invalid Value" : "");
          _el$105.$$click = () => setDataMode("view");
          createRenderEffect((_p$) => {
            var _v$40 = clsx(styles().devtoolsEditForm, "tsqd-query-details-data-editor"), _v$41 = styles().devtoolsEditTextarea, _v$42 = dataEditError(), _v$43 = styles().devtoolsEditFormActions, _v$44 = styles().devtoolsEditFormError, _v$45 = styles().devtoolsEditFormActionContainer, _v$46 = clsx(styles().devtoolsEditFormAction, css`
                      color: ${t2(colors.gray[600], colors.gray[300])};
                    `), _v$47 = clsx(styles().devtoolsEditFormAction, css`
                      color: ${t2(colors.blue[600], colors.blue[400])};
                    `);
            _v$40 !== _p$.e && className(_el$100, _p$.e = _v$40);
            _v$41 !== _p$.t && className(_el$101, _p$.t = _v$41);
            _v$42 !== _p$.a && setAttribute(_el$101, "data-error", _p$.a = _v$42);
            _v$43 !== _p$.o && className(_el$102, _p$.o = _v$43);
            _v$44 !== _p$.i && className(_el$103, _p$.i = _v$44);
            _v$45 !== _p$.n && className(_el$104, _p$.n = _v$45);
            _v$46 !== _p$.s && className(_el$105, _p$.s = _v$46);
            _v$47 !== _p$.h && className(_el$106, _p$.h = _v$47);
            return _p$;
          }, {
            e: void 0,
            t: void 0,
            a: void 0,
            o: void 0,
            i: void 0,
            n: void 0,
            s: void 0,
            h: void 0
          });
          createRenderEffect(() => _el$101.value = JSON.stringify(activeQueryStateData(), null, 2));
          return _el$100;
        }
      }), _el$107);
      insert(_el$108, createComponent(Explorer, {
        label: "Query",
        defaultExpanded: ["Query", "queryKey"],
        get value() {
          return activeQueryFresh();
        }
      }));
      createRenderEffect((_p$) => {
        var _v$48 = clsx(styles().detailsContainer, "tsqd-query-details-container"), _v$49 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$50 = clsx(styles().detailsBody, "tsqd-query-details-summary-container"), _v$51 = clsx(styles().queryDetailsStatus, getQueryStatusColors()), _v$52 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$53 = clsx(styles().actionsBody, "tsqd-query-details-actions-container"), _v$54 = clsx(css`
                color: ${t2(colors.blue[600], colors.blue[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-refetch"), _v$55 = statusLabel() === "fetching", _v$56 = css`
                background-color: ${t2(colors.blue[600], colors.blue[400])};
              `, _v$57 = clsx(css`
                color: ${t2(colors.yellow[600], colors.yellow[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-invalidate"), _v$58 = queryStatus() === "pending", _v$59 = css`
                background-color: ${t2(colors.yellow[600], colors.yellow[400])};
              `, _v$60 = clsx(css`
                color: ${t2(colors.gray[600], colors.gray[300])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-reset"), _v$61 = queryStatus() === "pending", _v$62 = css`
                background-color: ${t2(colors.gray[600], colors.gray[400])};
              `, _v$63 = clsx(css`
                color: ${t2(colors.pink[500], colors.pink[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-remove"), _v$64 = statusLabel() === "fetching", _v$65 = css`
                background-color: ${t2(colors.pink[500], colors.pink[400])};
              `, _v$66 = clsx(css`
                color: ${t2(colors.cyan[500], colors.cyan[400])};
              `, "tsqd-query-details-actions-btn", "tsqd-query-details-action-loading"), _v$67 = restoringLoading(), _v$68 = css`
                background-color: ${t2(colors.cyan[500], colors.cyan[400])};
              `, _v$69 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$70 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$71 = tokens.size[2];
        _v$48 !== _p$.e && className(_el$63, _p$.e = _v$48);
        _v$49 !== _p$.t && className(_el$64, _p$.t = _v$49);
        _v$50 !== _p$.a && className(_el$65, _p$.a = _v$50);
        _v$51 !== _p$.o && className(_el$69, _p$.o = _v$51);
        _v$52 !== _p$.i && className(_el$76, _p$.i = _v$52);
        _v$53 !== _p$.n && className(_el$77, _p$.n = _v$53);
        _v$54 !== _p$.s && className(_el$78, _p$.s = _v$54);
        _v$55 !== _p$.h && (_el$78.disabled = _p$.h = _v$55);
        _v$56 !== _p$.r && className(_el$79, _p$.r = _v$56);
        _v$57 !== _p$.d && className(_el$80, _p$.d = _v$57);
        _v$58 !== _p$.l && (_el$80.disabled = _p$.l = _v$58);
        _v$59 !== _p$.u && className(_el$81, _p$.u = _v$59);
        _v$60 !== _p$.c && className(_el$82, _p$.c = _v$60);
        _v$61 !== _p$.w && (_el$82.disabled = _p$.w = _v$61);
        _v$62 !== _p$.m && className(_el$83, _p$.m = _v$62);
        _v$63 !== _p$.f && className(_el$84, _p$.f = _v$63);
        _v$64 !== _p$.y && (_el$84.disabled = _p$.y = _v$64);
        _v$65 !== _p$.g && className(_el$85, _p$.g = _v$65);
        _v$66 !== _p$.p && className(_el$86, _p$.p = _v$66);
        _v$67 !== _p$.b && (_el$86.disabled = _p$.b = _v$67);
        _v$68 !== _p$.T && className(_el$87, _p$.T = _v$68);
        _v$69 !== _p$.A && className(_el$97, _p$.A = _v$69);
        _v$70 !== _p$.O && className(_el$107, _p$.O = _v$70);
        _v$71 !== _p$.I && ((_p$.I = _v$71) != null ? _el$108.style.setProperty("padding", _v$71) : _el$108.style.removeProperty("padding"));
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0,
        d: void 0,
        l: void 0,
        u: void 0,
        c: void 0,
        w: void 0,
        m: void 0,
        f: void 0,
        y: void 0,
        g: void 0,
        p: void 0,
        b: void 0,
        T: void 0,
        A: void 0,
        O: void 0,
        I: void 0
      });
      return _el$63;
    }
  });
};
var MutationDetails = () => {
  const theme = useTheme();
  const css = useQueryDevtoolsContext().shadowDOMTarget ? u.bind({
    target: useQueryDevtoolsContext().shadowDOMTarget
  }) : u;
  const styles = createMemo(() => {
    return theme() === "dark" ? darkStyles2(css) : lightStyles2(css);
  });
  const {
    colors
  } = tokens;
  const t2 = (light, dark) => theme() === "dark" ? dark : light;
  const isPaused = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === selectedMutationId());
    if (!mutation)
      return false;
    return mutation.state.isPaused;
  });
  const status = createSubscribeToMutationCacheBatcher((mutationCache) => {
    const mutations = mutationCache().getAll();
    const mutation = mutations.find((m) => m.mutationId === selectedMutationId());
    if (!mutation)
      return "idle";
    return mutation.state.status;
  });
  const color = createMemo(() => getMutationStatusColor({
    isPaused: isPaused(),
    status: status()
  }));
  const activeMutation = createSubscribeToMutationCacheBatcher((mutationCache) => mutationCache().getAll().find((mutation) => mutation.mutationId === selectedMutationId()), false);
  const getQueryStatusColors = () => {
    if (color() === "gray") {
      return css`
        background-color: ${t2(colors[color()][200], colors[color()][700])};
        color: ${t2(colors[color()][700], colors[color()][300])};
        border-color: ${t2(colors[color()][400], colors[color()][600])};
      `;
    }
    return css`
      background-color: ${t2(colors[color()][100], colors[color()][900])};
      color: ${t2(colors[color()][700], colors[color()][300])};
      border-color: ${t2(colors[color()][400], colors[color()][600])};
    `;
  };
  return createComponent(Show, {
    get when() {
      return activeMutation();
    },
    get children() {
      var _el$110 = _tmpl$34(), _el$111 = _el$110.firstChild, _el$112 = _el$111.nextSibling, _el$113 = _el$112.firstChild, _el$114 = _el$113.firstChild, _el$115 = _el$114.firstChild, _el$116 = _el$114.nextSibling, _el$117 = _el$113.nextSibling, _el$118 = _el$117.firstChild, _el$119 = _el$118.nextSibling, _el$120 = _el$112.nextSibling, _el$121 = _el$120.nextSibling, _el$122 = _el$121.nextSibling, _el$123 = _el$122.nextSibling, _el$124 = _el$123.nextSibling, _el$125 = _el$124.nextSibling, _el$126 = _el$125.nextSibling, _el$127 = _el$126.nextSibling;
      insert(_el$115, createComponent(Show, {
        get when() {
          return activeMutation().options.mutationKey;
        },
        fallback: "No mutationKey found",
        get children() {
          return displayValue(activeMutation().options.mutationKey, true);
        }
      }));
      insert(_el$116, createComponent(Show, {
        get when() {
          return color() === "purple";
        },
        children: "pending"
      }), null);
      insert(_el$116, createComponent(Show, {
        get when() {
          return color() !== "purple";
        },
        get children() {
          return status();
        }
      }), null);
      insert(_el$119, () => new Date(activeMutation().state.submittedAt).toLocaleTimeString());
      insert(_el$121, createComponent(Explorer, {
        label: "Variables",
        defaultExpanded: ["Variables"],
        get value() {
          return activeMutation().state.variables;
        }
      }));
      insert(_el$123, createComponent(Explorer, {
        label: "Context",
        defaultExpanded: ["Context"],
        get value() {
          return activeMutation().state.context;
        }
      }));
      insert(_el$125, createComponent(Explorer, {
        label: "Data",
        defaultExpanded: ["Data"],
        get value() {
          return activeMutation().state.data;
        }
      }));
      insert(_el$127, createComponent(Explorer, {
        label: "Mutation",
        defaultExpanded: ["Mutation"],
        get value() {
          return activeMutation();
        }
      }));
      createRenderEffect((_p$) => {
        var _v$72 = clsx(styles().detailsContainer, "tsqd-query-details-container"), _v$73 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$74 = clsx(styles().detailsBody, "tsqd-query-details-summary-container"), _v$75 = clsx(styles().queryDetailsStatus, getQueryStatusColors()), _v$76 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$77 = tokens.size[2], _v$78 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$79 = tokens.size[2], _v$80 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$81 = tokens.size[2], _v$82 = clsx(styles().detailsHeader, "tsqd-query-details-header"), _v$83 = tokens.size[2];
        _v$72 !== _p$.e && className(_el$110, _p$.e = _v$72);
        _v$73 !== _p$.t && className(_el$111, _p$.t = _v$73);
        _v$74 !== _p$.a && className(_el$112, _p$.a = _v$74);
        _v$75 !== _p$.o && className(_el$116, _p$.o = _v$75);
        _v$76 !== _p$.i && className(_el$120, _p$.i = _v$76);
        _v$77 !== _p$.n && ((_p$.n = _v$77) != null ? _el$121.style.setProperty("padding", _v$77) : _el$121.style.removeProperty("padding"));
        _v$78 !== _p$.s && className(_el$122, _p$.s = _v$78);
        _v$79 !== _p$.h && ((_p$.h = _v$79) != null ? _el$123.style.setProperty("padding", _v$79) : _el$123.style.removeProperty("padding"));
        _v$80 !== _p$.r && className(_el$124, _p$.r = _v$80);
        _v$81 !== _p$.d && ((_p$.d = _v$81) != null ? _el$125.style.setProperty("padding", _v$81) : _el$125.style.removeProperty("padding"));
        _v$82 !== _p$.l && className(_el$126, _p$.l = _v$82);
        _v$83 !== _p$.u && ((_p$.u = _v$83) != null ? _el$127.style.setProperty("padding", _v$83) : _el$127.style.removeProperty("padding"));
        return _p$;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0,
        r: void 0,
        d: void 0,
        l: void 0,
        u: void 0
      });
      return _el$110;
    }
  });
};
var queryCacheMap = /* @__PURE__ */ new Map();
var setupQueryCacheSubscription = () => {
  const queryCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getQueryCache();
  });
  const unsubscribe = queryCache().subscribe((q) => {
    batch(() => {
      for (const [callback, value] of queryCacheMap.entries()) {
        if (!value.shouldUpdate(q))
          continue;
        value.setter(callback(queryCache));
      }
    });
  });
  onCleanup(() => {
    queryCacheMap.clear();
    unsubscribe();
  });
  return unsubscribe;
};
var createSubscribeToQueryCacheBatcher = (callback, equalityCheck = true, shouldUpdate = () => true) => {
  const queryCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getQueryCache();
  });
  const [value, setValue] = createSignal(callback(queryCache), !equalityCheck ? {
    equals: false
  } : void 0);
  createEffect(() => {
    setValue(callback(queryCache));
  });
  queryCacheMap.set(callback, {
    setter: setValue,
    shouldUpdate
  });
  onCleanup(() => {
    queryCacheMap.delete(callback);
  });
  return value;
};
var mutationCacheMap = /* @__PURE__ */ new Map();
var setupMutationCacheSubscription = () => {
  const mutationCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getMutationCache();
  });
  const unsubscribe = mutationCache().subscribe(() => {
    for (const [callback, setter] of mutationCacheMap.entries()) {
      queueMicrotask(() => {
        setter(callback(mutationCache));
      });
    }
  });
  onCleanup(() => {
    mutationCacheMap.clear();
    unsubscribe();
  });
  return unsubscribe;
};
var createSubscribeToMutationCacheBatcher = (callback, equalityCheck = true) => {
  const mutationCache = createMemo(() => {
    const client = useQueryDevtoolsContext().client;
    return client.getMutationCache();
  });
  const [value, setValue] = createSignal(callback(mutationCache), !equalityCheck ? {
    equals: false
  } : void 0);
  createEffect(() => {
    setValue(callback(mutationCache));
  });
  mutationCacheMap.set(callback, setValue);
  onCleanup(() => {
    mutationCacheMap.delete(callback);
  });
  return value;
};
var stylesFactory2 = (theme, css) => {
  const {
    colors,
    font,
    size: size3,
    alpha,
    shadow,
    border
  } = tokens;
  const t2 = (light, dark) => theme === "light" ? light : dark;
  return {
    devtoolsBtn: css`
      z-index: 100000;
      position: fixed;
      padding: 4px;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 9999px;
      box-shadow: ${shadow.md()};
      overflow: hidden;

      & div {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border-radius: 9999px;

        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        filter: blur(6px) saturate(1.2) contrast(1.1);
      }

      &:focus-within {
        outline-offset: 2px;
        outline: 3px solid ${colors.green[600]};
      }

      & button {
        position: relative;
        z-index: 1;
        padding: 0;
        border-radius: 9999px;
        background-color: transparent;
        border: none;
        height: 40px;
        display: flex;
        width: 40px;
        overflow: hidden;
        cursor: pointer;
        outline: none;
        & svg {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
    `,
    panel: css`
      position: fixed;
      z-index: 9999;
      display: flex;
      gap: ${tokens.size[0.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${t2(colors.gray[300], colors.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${t2(colors.gray[400], colors.darkGray[300])};
      }
    `,
    parentPanel: css`
      z-index: 9999;
      display: flex;
      height: 100%;
      gap: ${tokens.size[0.5]};
      & * {
        box-sizing: border-box;
        text-transform: none;
      }

      & *::-webkit-scrollbar {
        width: 7px;
      }

      & *::-webkit-scrollbar-track {
        background: transparent;
      }

      & *::-webkit-scrollbar-thumb {
        background: ${t2(colors.gray[300], colors.darkGray[200])};
      }

      & *::-webkit-scrollbar-thumb:hover {
        background: ${t2(colors.gray[400], colors.darkGray[300])};
      }
    `,
    "devtoolsBtn-position-bottom-right": css`
      bottom: 12px;
      right: 12px;
    `,
    "devtoolsBtn-position-bottom-left": css`
      bottom: 12px;
      left: 12px;
    `,
    "devtoolsBtn-position-top-left": css`
      top: 12px;
      left: 12px;
    `,
    "devtoolsBtn-position-top-right": css`
      top: 12px;
      right: 12px;
    `,
    "devtoolsBtn-position-relative": css`
      position: relative;
    `,
    "panel-position-top": css`
      top: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${size3[14]};
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
    `,
    "panel-position-bottom": css`
      bottom: 0;
      right: 0;
      left: 0;
      max-height: 90%;
      min-height: ${size3[14]};
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
    `,
    "panel-position-right": css`
      bottom: 0;
      right: 0;
      top: 0;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      max-width: 90%;
    `,
    "panel-position-left": css`
      bottom: 0;
      left: 0;
      top: 0;
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      max-width: 90%;
    `,
    closeBtn: css`
      position: absolute;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline: 2px solid ${colors.blue[600]};
      }
      & svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
        width: ${size3[2]};
        height: ${size3[2]};
      }
    `,
    "closeBtn-position-top": css`
      bottom: 0;
      right: ${size3[2]};
      transform: translate(0, 100%);
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: none;
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: 0px 0px ${border.radius.sm} ${border.radius.sm};
      padding: ${size3[0.5]} ${size3[1.5]} ${size3[1]} ${size3[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        bottom: 100%;
        left: -${size3[2.5]};
        height: ${size3[1.5]};
        width: calc(100% + ${size3[5]});
      }

      & svg {
        transform: rotate(180deg);
      }
    `,
    "closeBtn-position-bottom": css`
      top: 0;
      right: ${size3[2]};
      transform: translate(0, -100%);
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: none;
      border-radius: ${border.radius.sm} ${border.radius.sm} 0px 0px;
      padding: ${size3[1]} ${size3[1.5]} ${size3[0.5]} ${size3[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${size3[2.5]};
        height: ${size3[1.5]};
        width: calc(100% + ${size3[5]});
      }
    `,
    "closeBtn-position-right": css`
      bottom: ${size3[2]};
      left: 0;
      transform: translate(-100%, 0);
      border-right: none;
      border-left: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: ${border.radius.sm} 0px 0px ${border.radius.sm};
      padding: ${size3[1.5]} ${size3[0.5]} ${size3[1.5]} ${size3[1]};

      &::after {
        content: ' ';
        position: absolute;
        left: 100%;
        height: calc(100% + ${size3[5]});
        width: ${size3[1.5]};
      }

      & svg {
        transform: rotate(-90deg);
      }
    `,
    "closeBtn-position-left": css`
      bottom: ${size3[2]};
      right: 0;
      transform: translate(100%, 0);
      border-left: none;
      border-right: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-top: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-bottom: ${t2(colors.gray[400], colors.darkGray[300])} 1px solid;
      border-radius: 0px ${border.radius.sm} ${border.radius.sm} 0px;
      padding: ${size3[1.5]} ${size3[1]} ${size3[1.5]} ${size3[0.5]};

      &::after {
        content: ' ';
        position: absolute;
        right: 100%;
        height: calc(100% + ${size3[5]});
        width: ${size3[1.5]};
      }

      & svg {
        transform: rotate(90deg);
      }
    `,
    queriesContainer: css`
      flex: 1 1 700px;
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      display: flex;
      flex-direction: column;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
    `,
    dragHandle: css`
      position: absolute;
      transition: background-color 0.125s ease;
      &:hover {
        background-color: ${colors.purple[400]}${t2("", alpha[90])};
      }
      z-index: 4;
    `,
    "dragHandle-position-top": css`
      bottom: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,
    "dragHandle-position-bottom": css`
      top: 0;
      width: 100%;
      height: 3px;
      cursor: ns-resize;
    `,
    "dragHandle-position-right": css`
      left: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,
    "dragHandle-position-left": css`
      right: 0;
      width: 3px;
      height: 100%;
      cursor: ew-resize;
    `,
    row: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${tokens.size[2]} ${tokens.size[2.5]};
      gap: ${tokens.size[2.5]};
      border-bottom: ${t2(colors.gray[300], colors.darkGray[500])} 1px solid;
      align-items: center;
      & > button {
        padding: 0;
        background: transparent;
        border: none;
        display: flex;
        gap: ${size3[0.5]};
        flex-direction: column;
      }
    `,
    logoAndToggleContainer: css`
      display: flex;
      gap: ${tokens.size[3]};
      align-items: center;
    `,
    logo: css`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      gap: ${tokens.size[0.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    tanstackLogo: css`
      font-size: ${font.size.md};
      font-weight: ${font.weight.bold};
      line-height: ${font.lineHeight.xs};
      white-space: nowrap;
      color: ${t2(colors.gray[600], colors.gray[300])};
    `,
    queryFlavorLogo: css`
      font-weight: ${font.weight.semibold};
      font-size: ${font.size.xs};
      background: linear-gradient(
        to right,
        ${t2("#ea4037, #ff9b11", "#dd524b, #e9a03b")}
      );
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,
    queryStatusContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
      height: min-content;
    `,
    queryStatusTag: css`
      display: flex;
      gap: ${tokens.size[1.5]};
      box-sizing: border-box;
      height: ${tokens.size[6.5]};
      background: ${t2(colors.gray[50], colors.darkGray[500])};
      color: ${t2(colors.gray[700], colors.gray[300])};
      border-radius: ${tokens.border.radius.sm};
      font-size: ${font.size.sm};
      padding: ${tokens.size[1]};
      padding-left: ${tokens.size[1.5]};
      align-items: center;
      font-weight: ${font.weight.medium};
      border: ${t2("1px solid " + colors.gray[300], "1px solid transparent")};
      user-select: none;
      position: relative;
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    queryStatusTagLabel: css`
      font-size: ${font.size.xs};
    `,
    queryStatusCount: css`
      font-size: ${font.size.xs};
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${t2(colors.gray[500], colors.gray[400])};
      background-color: ${t2(colors.gray[200], colors.darkGray[300])};
      border-radius: 2px;
      font-variant-numeric: tabular-nums;
      height: ${tokens.size[4.5]};
    `,
    statusTooltip: css`
      position: absolute;
      z-index: 1;
      background-color: ${t2(colors.gray[50], colors.darkGray[500])};
      top: 100%;
      left: 50%;
      transform: translate(-50%, calc(${tokens.size[2]}));
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      border-radius: ${tokens.border.radius.sm};
      font-size: ${font.size.xs};
      border: 1px solid ${t2(colors.gray[400], colors.gray[600])};
      color: ${t2(colors["gray"][600], colors["gray"][300])};

      &::before {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, -100%);
        position: absolute;
        border-color: transparent transparent
          ${t2(colors.gray[400], colors.gray[600])} transparent;
        border-style: solid;
        border-width: 7px;
        /* transform: rotate(180deg); */
      }

      &::after {
        top: 0px;
        content: ' ';
        display: block;
        left: 50%;
        transform: translate(-50%, calc(-100% + 2px));
        position: absolute;
        border-color: transparent transparent
          ${t2(colors.gray[100], colors.darkGray[500])} transparent;
        border-style: solid;
        border-width: 7px;
      }
    `,
    filtersContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
      & > button {
        cursor: pointer;
        padding: ${tokens.size[0.5]} ${tokens.size[1.5]} ${tokens.size[0.5]}
          ${tokens.size[2]};
        border-radius: ${tokens.border.radius.sm};
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
        color: ${t2(colors.gray[700], colors.gray[300])};
        font-size: ${font.size.xs};
        display: flex;
        align-items: center;
        line-height: ${font.lineHeight.sm};
        gap: ${tokens.size[1.5]};
        max-width: 160px;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${border.radius.xs};
          outline: 2px solid ${colors.blue[800]};
        }
        & svg {
          width: ${tokens.size[3]};
          height: ${tokens.size[3]};
          color: ${t2(colors.gray[500], colors.gray[400])};
        }
      }
    `,
    filterInput: css`
      padding: ${size3[0.5]} ${size3[2]};
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[400])};
      display: flex;
      box-sizing: content-box;
      align-items: center;
      gap: ${tokens.size[1.5]};
      max-width: 160px;
      min-width: 100px;
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      height: min-content;
      color: ${t2(colors.gray[600], colors.gray[400])};
      & > svg {
        width: ${size3[3]};
        height: ${size3[3]};
      }
      & input {
        font-size: ${font.size.xs};
        width: 100%;
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        border: none;
        padding: 0;
        line-height: ${font.lineHeight.sm};
        color: ${t2(colors.gray[700], colors.gray[300])};
        &::placeholder {
          color: ${t2(colors.gray[700], colors.gray[300])};
        }
        &:focus {
          outline: none;
        }
      }

      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    filterSelect: css`
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[400])};
      display: flex;
      align-items: center;
      gap: ${tokens.size[1.5]};
      box-sizing: content-box;
      max-width: 160px;
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      height: min-content;
      & > svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
      & > select {
        appearance: none;
        color: ${t2(colors.gray[700], colors.gray[300])};
        min-width: 100px;
        line-height: ${font.lineHeight.sm};
        font-size: ${font.size.xs};
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        border: none;
        &:focus {
          outline: none;
        }
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    actionsContainer: css`
      display: flex;
      gap: ${tokens.size[2]};
    `,
    actionsBtn: css`
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[400])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      width: ${tokens.size[6.5]};
      height: ${tokens.size[6.5]};
      justify-content: center;
      display: flex;
      align-items: center;
      gap: ${tokens.size[1.5]};
      max-width: 160px;
      cursor: pointer;
      padding: 0;
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      & svg {
        color: ${t2(colors.gray[700], colors.gray[300])};
        width: ${tokens.size[3]};
        height: ${tokens.size[3]};
      }
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    actionsBtnOffline: css`
      & svg {
        stroke: ${t2(colors.yellow[700], colors.yellow[500])};
        fill: ${t2(colors.yellow[700], colors.yellow[500])};
      }
    `,
    overflowQueryContainer: css`
      flex: 1;
      overflow-y: auto;
      & > div {
        display: flex;
        flex-direction: column;
      }
    `,
    queryRow: css`
      display: flex;
      align-items: center;
      padding: 0;
      border: none;
      cursor: pointer;
      color: ${t2(colors.gray[700], colors.gray[300])};
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      line-height: 1;
      &:focus {
        outline: none;
      }
      &:focus-visible {
        outline-offset: -2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      &:hover .tsqd-query-hash {
        background-color: ${t2(colors.gray[200], colors.darkGray[600])};
      }

      & .tsqd-query-observer-count {
        padding: 0 ${tokens.size[1]};
        user-select: none;
        min-width: ${tokens.size[6.5]};
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${font.size.xs};
        font-weight: ${font.weight.medium};
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[700])};
      }
      & .tsqd-query-hash {
        user-select: text;
        font-size: ${font.size.xs};
        display: flex;
        align-items: center;
        min-height: ${tokens.size[6]};
        flex: 1;
        padding: ${tokens.size[1]} ${tokens.size[2]};
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
        text-align: left;
        text-overflow: clip;
        word-break: break-word;
      }

      & .tsqd-query-disabled-indicator {
        align-self: stretch;
        display: flex;
        align-items: center;
        padding: 0 ${tokens.size[2]};
        color: ${t2(colors.gray[800], colors.gray[300])};
        background-color: ${t2(colors.gray[300], colors.darkGray[600])};
        border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
        font-size: ${font.size.xs};
      }
    `,
    selectedQueryRow: css`
      background-color: ${t2(colors.gray[200], colors.darkGray[500])};
    `,
    detailsContainer: css`
      flex: 1 1 700px;
      background-color: ${t2(colors.gray[50], colors.darkGray[700])};
      color: ${t2(colors.gray[700], colors.gray[300])};
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      display: flex;
      text-align: left;
    `,
    detailsHeader: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${t2(colors.gray[200], colors.darkGray[600])};
      padding: ${tokens.size[1.5]} ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      font-size: ${font.size.xs};
      line-height: ${font.lineHeight.xs};
      text-align: left;
    `,
    detailsBody: css`
      margin: ${tokens.size[1.5]} 0px ${tokens.size[2]} 0px;
      & > div {
        display: flex;
        align-items: stretch;
        padding: 0 ${tokens.size[2]};
        line-height: ${font.lineHeight.sm};
        justify-content: space-between;
        & > span {
          font-size: ${font.size.xs};
        }
        & > span:nth-child(2) {
          font-variant-numeric: tabular-nums;
        }
      }

      & > div:first-child {
        margin-bottom: ${tokens.size[1.5]};
      }

      & code {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
          'Liberation Mono', 'Courier New', monospace;
        margin: 0;
        font-size: ${font.size.xs};
        line-height: ${font.lineHeight.xs};
      }

      & pre {
        margin: 0;
        display: flex;
        align-items: center;
      }
    `,
    queryDetailsStatus: css`
      border: 1px solid ${colors.darkGray[200]};
      border-radius: ${tokens.border.radius.sm};
      font-weight: ${font.weight.medium};
      padding: ${tokens.size[1]} ${tokens.size[2.5]};
    `,
    actionsBody: css`
      flex-wrap: wrap;
      margin: ${tokens.size[2]} 0px ${tokens.size[2]} 0px;
      display: flex;
      gap: ${tokens.size[2]};
      padding: 0px ${tokens.size[2]};
      & > button {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        font-size: ${font.size.xs};
        padding: ${tokens.size[1]} ${tokens.size[2]};
        display: flex;
        border-radius: ${tokens.border.radius.sm};
        background-color: ${t2(colors.gray[100], colors.darkGray[600])};
        border: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
        align-items: center;
        gap: ${tokens.size[2]};
        font-weight: ${font.weight.medium};
        line-height: ${font.lineHeight.xs};
        cursor: pointer;
        &:focus-visible {
          outline-offset: 2px;
          border-radius: ${border.radius.xs};
          outline: 2px solid ${colors.blue[800]};
        }
        &:hover {
          background-color: ${t2(colors.gray[200], colors.darkGray[500])};
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        & > span {
          width: ${size3[1.5]};
          height: ${size3[1.5]};
          border-radius: ${tokens.border.radius.full};
        }
      }
    `,
    actionsSelect: css`
      font-size: ${font.size.xs};
      padding: ${tokens.size[0.5]} ${tokens.size[2]};
      display: flex;
      border-radius: ${tokens.border.radius.sm};
      overflow: hidden;
      background-color: ${t2(colors.gray[100], colors.darkGray[600])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
      align-items: center;
      gap: ${tokens.size[2]};
      font-weight: ${font.weight.medium};
      line-height: ${font.lineHeight.sm};
      color: ${t2(colors.red[500], colors.red[400])};
      cursor: pointer;
      position: relative;
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      & > span {
        width: ${size3[1.5]};
        height: ${size3[1.5]};
        border-radius: ${tokens.border.radius.full};
      }
      &:focus-within {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      & select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        appearance: none;
        background-color: transparent;
        border: none;
        color: transparent;
        outline: none;
      }

      & svg path {
        stroke: ${tokens.colors.red[400]};
      }
      & svg {
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
    `,
    settingsMenu: css`
      display: flex;
      & * {
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      }
      flex-direction: column;
      gap: ${size3[0.5]};
      border-radius: ${tokens.border.radius.sm};
      border: 1px solid ${t2(colors.gray[300], colors.gray[700])};
      background-color: ${t2(colors.gray[50], colors.darkGray[600])};
      font-size: ${font.size.xs};
      color: ${t2(colors.gray[700], colors.gray[300])};
      z-index: 99999;
      min-width: 120px;
      padding: ${size3[0.5]};
    `,
    settingsSubTrigger: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: ${tokens.border.radius.xs};
      padding: ${tokens.size[1]} ${tokens.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      color: ${t2(colors.gray[700], colors.gray[300])};
      & svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
        transform: rotate(-90deg);
        width: ${tokens.size[2]};
        height: ${tokens.size[2]};
      }
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
      &.data-disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
    settingsMenuHeader: css`
      padding: ${tokens.size[1]} ${tokens.size[1]};
      font-weight: ${font.weight.medium};
      border-bottom: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
      color: ${t2(colors.gray[500], colors.gray[400])};
      font-size: ${font.size["xs"]};
    `,
    settingsSubButton: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${t2(colors.gray[700], colors.gray[300])};
      font-size: ${font.size["xs"]};
      border-radius: ${tokens.border.radius.xs};
      padding: ${tokens.size[1]} ${tokens.size[1]};
      cursor: pointer;
      background-color: transparent;
      border: none;
      & svg {
        color: ${t2(colors.gray[600], colors.gray[400])};
      }
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }
      &:focus-visible {
        outline-offset: 2px;
        outline: 2px solid ${colors.blue[800]};
      }
    `,
    themeSelectedButton: css`
      background-color: ${t2(colors.purple[100], colors.purple[900])};
      color: ${t2(colors.purple[700], colors.purple[300])};
      & svg {
        color: ${t2(colors.purple[700], colors.purple[300])};
      }
      &:hover {
        background-color: ${t2(colors.purple[100], colors.purple[900])};
      }
    `,
    viewToggle: css`
      border-radius: ${tokens.border.radius.sm};
      background-color: ${t2(colors.gray[200], colors.darkGray[600])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      display: flex;
      padding: 0;
      font-size: ${font.size.xs};
      color: ${t2(colors.gray[700], colors.gray[300])};
      overflow: hidden;

      &:has(:focus-visible) {
        outline: 2px solid ${colors.blue[800]};
      }

      & .tsqd-radio-toggle {
        opacity: 0.5;
        display: flex;
        & label {
          display: flex;
          align-items: center;
          cursor: pointer;
          line-height: ${font.lineHeight.md};
        }

        & label:hover {
          background-color: ${t2(colors.gray[100], colors.darkGray[500])};
        }
      }

      & > [data-checked] {
        opacity: 1;
        background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        & label:hover {
          background-color: ${t2(colors.gray[100], colors.darkGray[400])};
        }
      }

      & .tsqd-radio-toggle:first-child {
        & label {
          padding: 0 ${tokens.size[1.5]} 0 ${tokens.size[2]};
        }
        border-right: 1px solid ${t2(colors.gray[300], colors.darkGray[200])};
      }

      & .tsqd-radio-toggle:nth-child(2) {
        & label {
          padding: 0 ${tokens.size[2]} 0 ${tokens.size[1.5]};
        }
      }
    `,
    devtoolsEditForm: css`
      padding: ${size3[2]};
      & > [data-error='true'] {
        outline: 2px solid ${t2(colors.red[200], colors.red[800])};
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
      }
    `,
    devtoolsEditTextarea: css`
      width: 100%;
      max-height: 500px;
      font-family: 'Fira Code', monospace;
      font-size: ${font.size.xs};
      border-radius: ${border.radius.sm};
      field-sizing: content;
      padding: ${size3[2]};
      background-color: ${t2(colors.gray[100], colors.darkGray[800])};
      color: ${t2(colors.gray[900], colors.gray[100])};
      border: 1px solid ${t2(colors.gray[200], colors.gray[700])};
      resize: none;
      &:focus {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${t2(colors.blue[200], colors.blue[800])};
      }
    `,
    devtoolsEditFormActions: css`
      display: flex;
      justify-content: space-between;
      gap: ${size3[2]};
      align-items: center;
      padding-top: ${size3[1]};
      font-size: ${font.size.xs};
    `,
    devtoolsEditFormError: css`
      color: ${t2(colors.red[700], colors.red[500])};
    `,
    devtoolsEditFormActionContainer: css`
      display: flex;
      gap: ${size3[2]};
    `,
    devtoolsEditFormAction: css`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      font-size: ${font.size.xs};
      padding: ${size3[1]} ${tokens.size[2]};
      display: flex;
      border-radius: ${border.radius.sm};
      background-color: ${t2(colors.gray[100], colors.darkGray[600])};
      border: 1px solid ${t2(colors.gray[300], colors.darkGray[400])};
      align-items: center;
      gap: ${size3[2]};
      font-weight: ${font.weight.medium};
      line-height: ${font.lineHeight.xs};
      cursor: pointer;
      &:focus-visible {
        outline-offset: 2px;
        border-radius: ${border.radius.xs};
        outline: 2px solid ${colors.blue[800]};
      }
      &:hover {
        background-color: ${t2(colors.gray[200], colors.darkGray[500])};
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `
  };
};
var lightStyles2 = (css) => stylesFactory2("light", css);
var darkStyles2 = (css) => stylesFactory2("dark", css);
delegateEvents(["click", "mousedown", "input"]);
export {
  ContentView as C,
  Devtools as D,
  PiPProvider as P,
  QueryDevtoolsContext as Q,
  THEME_PREFERENCE as T,
  ThemeContext as a,
  ParentPanel as b,
  createLocalStorage as c
};
//# sourceMappingURL=B4MFY5CR-q1rvlBUd.js.map
