"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["pages-page"],{

/***/ "./app/components/page-designer/index.js":
/*!***********************************************!*\
  !*** ./app/components/page-designer/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PageDesignerPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/textarea/dist/chunk-4IH3O7BJ.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_designer_support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-designer/support */ "./app/components/page-designer/support.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_designer_tree__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-designer/tree */ "./app/components/page-designer/tree.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }









/**
 * @typedef PDPage
 * @property {string} id
 * @property {object} data
 * @property {object} custom
 * @property {PDRegion[]} regions
 */

function getConfigText(config) {
  const _config = _objectSpread(_objectSpread({}, config), {}, {
    app: _objectSpread(_objectSpread({}, config.app), {}, {
      enablePWAKitPrivateClient: config.app.commerceAPI.parameters.__publicClientId ? false : true,
      commerceAPI: _objectSpread(_objectSpread({}, config.app.commerceAPI), {}, {
        parameters: _objectSpread(_objectSpread({}, config.app.commerceAPI.parameters), {}, {
          // if we have a public client available show that instead of the private client as it's easier
          clientId: config.app.commerceAPI.parameters.__publicClientId ?? config.app.commerceAPI.parameters.clientId
        })
      }),
      dataCloudAPI: {
        appSourceId: '',
        tenantId: ''
      }
    }),
    ssrParameters: _objectSpread(_objectSpread({}, config.ssrParameters), {}, {
      // clean up some junk added by pwa-kit-runtime
      proxyConfigs: config.ssrParameters.proxyConfigs.map(proxy => {
        delete proxy.proxyPath;
        delete proxy.cachingPath;
        return proxy;
      })
    })
  });
  return `module.exports = ${JSON.stringify(_config, null, 2)}`;
}

/**
 * Implements a PageDesigner page in react
 *
 * Will delegate the regions/components of the page to other components by identifier
 * composing similar to platform page designer
 * @param {PDPage} page - PageDesigner structure
 *
 * @constructor
 */
function PageDesignerPage({
  page
}) {
  const {
    debug
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_salesforce_retail_react_app_app_components_page_designer_support__WEBPACK_IMPORTED_MODULE_3__.DebugContext);
  const {
    editMode
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_salesforce_retail_react_app_app_components_page_designer_support__WEBPACK_IMPORTED_MODULE_3__.PageDesignerContext);
  const config = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_6__.getConfig)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, debug && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Text, {
    size: "h1"
  }, "PAGE: ", page.id), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("h2", null, "PD Edit Mode: ", editMode ? 'TRUE' : 'FALSE')), debug && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_page_designer_tree__WEBPACK_IMPORTED_MODULE_4__.Hider, {
    data: (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])(page.data, page.custom)
  })), page.custom && page.custom.pageTitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_5__.Helmet, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("title", null, page.custom.pageTitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_page_designer_support__WEBPACK_IMPORTED_MODULE_3__.PDErrorBoundary, {
    type: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_page_designer_tree__WEBPACK_IMPORTED_MODULE_4__.PageDesignerRegions, {
    regions: page.regions
  })), debug && config && config.app && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Heading, {
    as: "h2"
  }, "App Configuration (copy to config/local.js)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Textarea, {
    size: "lg"
  }, getConfigText(config))));
}
PageDesignerPage.propTypes = {
  page: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object),
  debug: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool),
  preview: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool),
  editMode: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool)
};

/***/ }),

/***/ "./overlays/page-designer-theme-home/app/pages/page/index.jsx":
/*!********************************************************************!*\
  !*** ./overlays/page-designer-theme-home/app/pages/page/index.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_designer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-designer */ "./app/components/page-designer/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/errors */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js");




// Components


// Project Components



//Hooks




const Page = () => {
  var _page$custom;
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const {
    pathname
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  const {
    pageId
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useParams)();
  const {
    data: page,
    error,
    isLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5__.usePage)({
    parameters: {
      pageId
    }
  }, {
    refetchOnMount: 'always'
  });
  if (error) {
    var _error$response, _error$response2;
    let ErrorClass = ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404 ? _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_6__.HTTPNotFound : _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_6__.HTTPError;
    throw new ErrorClass((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.statusText);
  }

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    einstein.sendViewPage(pathname);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {
    layerStyle: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: (page === null || page === void 0 ? void 0 : (_page$custom = page.custom) === null || _page$custom === void 0 ? void 0 : _page$custom.pageTitle) || 'Page',
    description: "",
    keywords: ""
  }), !isLoading && page && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_page_designer__WEBPACK_IMPORTED_MODULE_3__["default"], {
    page: page
  }));
};
Page.getTemplateName = () => 'page';
Page.shouldGetProps = ({
  previousLocation,
  location
}) => !previousLocation || previousLocation.pathname !== location.pathname;
Page.getProps = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
    res,
    api,
    params
  }) {
    const {
      pageId
    } = params;
    if (res) {
      // res.set('Cache-Control', 'max-age=31536000')
    }
    const page = yield api.shopperExperience.getPage({
      parameters: {
        pageId: pageId
      }
    });
    return {
      page
    };
  });
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();
Page.propTypes = {
  /**
   * The search result object showing all the product hits, that belong
   * in the supplied category.
   */
  productSearchResult: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
  page: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
  /**
   * The current state of `getProps` when running this value is `true`, otherwise it's
   * `false`. (Provided internally)
   */
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);

/***/ }),

/***/ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HTTPNotFound = exports.HTTPError = void 0;
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.constructor = HTTPError;
    this.__proto__ = HTTPError.prototype;
    this.message = message;
    this.status = status;
  }
  toString() {
    return `HTTPError ${this.status}: ${this.message}`;
  }
}
exports.HTTPError = HTTPError;
class HTTPNotFound extends HTTPError {
  constructor(message) {
    super(404, message);
    this.constructor = HTTPNotFound;
    this.__proto__ = HTTPNotFound.prototype;
  }
}
exports.HTTPNotFound = HTTPNotFound;

/***/ }),

/***/ "./node_modules/@chakra-ui/textarea/dist/chunk-4IH3O7BJ.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/textarea/dist/chunk-4IH3O7BJ.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Textarea: () => (/* binding */ Textarea)
/* harmony export */ });
/* harmony import */ var _chakra_ui_form_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/form-control */ "./node_modules/@chakra-ui/form-control/dist/chunk-56K2BSAJ.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/styled-system/dist/index.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs");
/* harmony import */ var _chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/shared-utils */ "./node_modules/@chakra-ui/shared-utils/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client'

// src/textarea.tsx
;



// ../../utilities/object-utils/src/omit.ts
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}

// src/textarea.tsx

var omitted = ["h", "minH", "height", "minHeight"];
var Textarea = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((props, ref) => {
  const styles = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.useStyleConfig)("Textarea", props);
  const { className, rows, ...rest } = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_3__.omitThemingProps)(props);
  const textareaProps = (0,_chakra_ui_form_control__WEBPACK_IMPORTED_MODULE_4__.useFormControl)(rest);
  const textareaStyles = rows ? omit(styles, omitted) : styles;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _chakra_ui_system__WEBPACK_IMPORTED_MODULE_5__.chakra.textarea,
    {
      ref,
      rows,
      ...textareaProps,
      className: (0,_chakra_ui_shared_utils__WEBPACK_IMPORTED_MODULE_6__.cx)("chakra-textarea", className),
      __css: textareaStyles
    }
  );
});
Textarea.displayName = "Textarea";


//# sourceMappingURL=chunk-4IH3O7BJ.mjs.map

/***/ })

}]);
//# sourceMappingURL=pages-page.js.map