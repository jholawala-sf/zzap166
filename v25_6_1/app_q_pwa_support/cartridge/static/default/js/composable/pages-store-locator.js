"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["pages-store-locator"],{

/***/ "./app/pages/store-locator/index.jsx":
/*!*******************************************!*\
  !*** ./app/pages/store-locator/index.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_store_locator_modal_store_locator_content__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/store-locator-modal/store-locator-content */ "./app/components/store-locator-modal/store-locator-content.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_store_locator_modal_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/store-locator-modal/index */ "./app/components/store-locator-modal/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



// Components




// Others

const StoreLocator = () => {
  const storeLocator = (0,_salesforce_retail_react_app_app_components_store_locator_modal_index__WEBPACK_IMPORTED_MODULE_4__.useStoreLocator)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_store_locator_modal_index__WEBPACK_IMPORTED_MODULE_4__.StoreLocatorContext.Provider, {
    value: storeLocator
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    "data-testid": "store-locator-page",
    bg: "gray.50",
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Store Locator",
    description: "Find a Store"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Container, {
    overflowY: "scroll",
    paddingTop: 8,
    width: ['90%'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_store_locator_modal_store_locator_content__WEBPACK_IMPORTED_MODULE_3__["default"], null))));
};
StoreLocator.getTemplateName = () => 'store-locator';
StoreLocator.propTypes = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StoreLocator);

/***/ })

}]);
//# sourceMappingURL=pages-store-locator.js.map