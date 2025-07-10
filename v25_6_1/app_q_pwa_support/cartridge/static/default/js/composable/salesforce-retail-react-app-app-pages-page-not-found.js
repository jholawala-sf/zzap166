"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-page-not-found"],{

/***/ "./app/pages/page-not-found/index.jsx":
/*!********************************************!*\
  !*** ./app/pages/page-not-found/index.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/hooks */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */









const PageNotFound = () => {
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useHistory)();
  const {
    res
  } = (0,_salesforce_pwa_kit_react_sdk_ssr_universal_hooks__WEBPACK_IMPORTED_MODULE_3__.useServerContext)();
  if (res) {
    res.status(404);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    layerStyle: "page",
    className: "page-not-found",
    height: '100%',
    padding: {
      lg: 8,
      md: 6,
      sm: 0,
      base: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "The page you're looking for can't be found."
    }],
    id: "page_not_found.title.page_cant_be_found"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    h: "100%",
    justify: "center",
    align: "center",
    flexDirection: "column",
    px: {
      base: 5,
      md: 12
    },
    py: {
      base: 48,
      md: 60
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.SearchIcon, {
    boxSize: ['30px', '32px'],
    mb: 8
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Heading, {
    as: "h2",
    fontSize: ['xl', '2xl', '2xl', '3xl'],
    mb: 2,
    align: "center"
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "The page you're looking for can't be found."
    }],
    id: "page_not_found.title.page_cant_be_found"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    mb: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    textAlign: "center"
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Please try retyping the address, going back to the previous page, or going to the home page."
    }],
    id: "page_not_found.message.suggestion_to_try"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    direction: ['column', 'row'],
    width: ['100%', 'auto']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "outline",
    bg: "white",
    onClick: () => history.goBack(),
    borderColor: 'gray.200'
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Back to previous page"
    }],
    id: "page_not_found.action.go_back"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_5__["default"],
    to: '/'
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Go to home page"
    }],
    id: "page_not_found.link.homepage"
  })))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageNotFound);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-page-not-found.js.map