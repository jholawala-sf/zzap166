"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-product-list"],{

/***/ "./app/components/breadcrumb/index.jsx":
/*!*********************************************!*\
  !*** ./app/components/breadcrumb/index.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/url */ "./overlays/utils/app/utils/url.js");


const _excluded = ["categories"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






// Components


// Icons


// Others


/**
 * A simplification of the Chakra `Breadcrumb` component for our project needs. Given
 * a list of categories, display a breadcrumb and it's items.
 */
const Breadcrumb = _ref => {
  let {
      categories
    } = _ref,
    rest = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useStyleConfig)('Breadcrumb');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "sf-breadcrumb",
    sx: styles.container,
    separator: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronRightIcon, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.icon, {
      "aria-hidden": "true"
    }))
  }, rest), categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.BreadcrumbItem, {
    key: category.id,
    "data-testid": "sf-crumb-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.BreadcrumbLink, {
    as: react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link,
    to: (0,_salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_5__.categoryUrlBuilder)(category, intl.locale),
    sx: styles.link
  }, category.name))));
};
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  /**
   * The categories to be displayed in this breadcrumb.
   */
  categories: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Breadcrumb);

/***/ }),

/***/ "./app/components/pagination/index.jsx":
/*!*********************************************!*\
  !*** ./app/components/pagination/index.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");


const _excluded = ["urls", "currentURL"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






// Components


// Icons


// Constants
const SELECT_ID = 'pagination';

/**
 * The pagination component is a simple component allowing you to navigate
 * from one page  to the next by means of previous or next buttons, or directly
 * using a select drop down.
 */
const Pagination = props => {
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useStyleConfig)('Pagination');
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useHistory)();
  const {
      urls,
      currentURL
    } = props,
    rest = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(props, _excluded);
  const currentIndex = urls.indexOf(currentURL) > 0 ? urls.indexOf(currentURL) : 0;
  const prev = urls[currentIndex - 1];
  const next = urls[currentIndex + 1];

  // Determine the current page index.
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "data-testid": "sf-pagination",
    className: "sf-pagination"
  }, styles.container, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.button, {
    as: react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link
    // Because we are using a button component as a link, the isDisabled flag isn't working
    // as intended, the workaround is to use the current url when its disabled.
    ,
    href: prev || currentURL,
    to: prev || currentURL,
    "aria-label": intl.formatMessage({
      id: "pagination.link.prev.assistive_msg",
      defaultMessage: [{
        "type": 0,
        "value": "Previous Page"
      }]
    }),
    "aria-disabled": !prev,
    variant: "link"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronLeftIcon, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, intl.formatMessage({
    id: "pagination.link.prev",
    defaultMessage: [{
      "type": 0,
      "value": "Prev"
    }]
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    paddingLeft: 4,
    paddingRight: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Select, {
    id: SELECT_ID,
    onChange: e => {
      history.push(e.target.value);
    },
    value: currentURL,
    height: 11,
    "aria-label": intl.formatMessage({
      id: "pagination.field.page_number_select",
      defaultMessage: [{
        "type": 0,
        "value": "Select page number"
      }]
    })
  }, urls.map((href, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("option", {
    key: index,
    value: href
  }, index + 1))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, styles.text, intl.formatMessage({
    id: "pagination.field.num_of_pages",
    defaultMessage: [{
      "type": 0,
      "value": "of "
    }, {
      "type": 1,
      "value": "numOfPages"
    }]
  }, {
    numOfPages: urls.length
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.button, {
    as: react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link
    // Because we are using a button component as a link, the isDisabled flag isn't working
    // as intended, the workaround is to use the current url when its disabled.
    ,
    href: next || currentURL,
    to: next || currentURL,
    "aria-label": intl.formatMessage({
      id: "pagination.link.next.assistive_msg",
      defaultMessage: [{
        "type": 0,
        "value": "Next Page"
      }]
    }),
    "aria-disabled": !next,
    variant: "link"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, intl.formatMessage({
    id: "pagination.link.next",
    defaultMessage: [{
      "type": 0,
      "value": "Next"
    }]
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronRightIcon, null)));
};
Pagination.displayName = 'Pagination';
Pagination.propTypes = {
  /**
   * A list of URL's representing the pages that can be navigated to.
   */
  urls: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().array).isRequired,
  /**
   * The URL representing the current page
   */
  currentURL: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./app/pages/product-list/index.jsx":
/*!******************************************!*\
  !*** ./app/pages/product-list/index.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/hooks */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_pagination__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/pagination */ "./app/components/pagination/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_tile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-tile */ "./app/components/product-tile/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/responsive */ "./app/components/responsive/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_refinements__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/refinements */ "./app/pages/product-list/partials/refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_category_links__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/category-links */ "./app/pages/product-list/partials/category-links.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_selected_refinements__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/selected-refinements */ "./app/pages/product-list/partials/selected-refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_empty_results__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/empty-results */ "./app/pages/product-list/partials/empty-results.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_page_header__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/page-header */ "./app/pages/product-list/partials/page-header.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_above_page_header__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/above-page-header */ "./overlays/category-header-slot/app/pages/product-list/partials/above-page-header.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_page_designer_promotional_banner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/page-designer-promotional-banner */ "./app/pages/product-list/partials/page-designer-promotional-banner.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-datacloud */ "./app/hooks/use-datacloud.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_active_data__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-active-data */ "./app/hooks/use-active-data.js");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/errors */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_logger_instance__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/logger-instance */ "./app/utils/logger-instance.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-wish-list */ "./app/hooks/use-wish-list.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");




const _excluded = ["isLoading", "staticContext"],
  _excluded2 = ["_refine"],
  _excluded3 = ["sortUrls", "productSearchResult", "basePath"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */









// Components


// Project Components











// Icons


// Hooks






// Others



// Constants






// NOTE: You can ignore certain refinements on a template level by updating the below
// list of ignored refinements.
const REFINEMENT_DISALLOW_LIST = ['c_isNew'];

/*
 * This is a simple product listing page. It displays a paginated list
 * of product hit objects. Allowing for sorting and filtering based on the
 * allowable filters and sort refinements.
 */
const ProductList = props => {
  var _error$response, _productSearchResult$, _productSearchResult$2;
  // Using destructuring to omit properties; we must rename `isLoading` because we use a different
  // `isLoading` later in this function.
  // eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
  const {
      isLoading: _unusedIsLoading,
      staticContext
    } = props,
    rest = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(props, _excluded);
  const {
    isOpen,
    onOpen,
    onClose
  } = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.useDisclosure)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_32__["default"])();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_28__["default"])();
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_33__.useHistory)();
  const params = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_33__.useParams)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_33__.useLocation)();
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_21__.useToast)();
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_22__["default"])();
  const dataCloud = (0,_salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_23__["default"])();
  const activeData = (0,_salesforce_retail_react_app_app_hooks_use_active_data__WEBPACK_IMPORTED_MODULE_24__["default"])();
  const {
    res
  } = (0,_salesforce_pwa_kit_react_sdk_ssr_universal_hooks__WEBPACK_IMPORTED_MODULE_7__.useServerContext)();
  const customerId = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useCustomerId)();
  const [searchParams, {
    stringify: stringifySearchParams
  }] = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_20__.useSearchParams)();

  /**************** Page State ****************/
  const [filtersLoading, setFiltersLoading] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [wishlistLoading, setWishlistLoading] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);
  const [sortOpen, setSortOpen] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const urlParams = new URLSearchParams(location.search);
  let searchQuery = urlParams.get('q');
  const isSearch = !!searchQuery;
  if (params.categoryId) {
    searchParams._refine.push(`cgid=${params.categoryId}`);
  }

  /**************** Mutation Actions ****************/
  const {
    mutateAsync: createCustomerProductListItem
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperCustomersMutation)('createCustomerProductListItem');
  const {
    mutateAsync: deleteCustomerProductListItem
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperCustomersMutation)('deleteCustomerProductListItem');

  /**************** Query Actions ****************/
  // _refine is an invalid param for useProductSearch, we don't want to pass it to API call
  const {
      _refine
    } = searchParams,
    restOfParams = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(searchParams, _excluded2);
  const {
    isLoading,
    isFetched,
    isRefetching,
    data: productSearchResult
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useProductSearch)({
    parameters: _objectSpread(_objectSpread({}, restOfParams), {}, {
      perPricebook: true,
      allVariationProperties: true,
      allImages: true,
      expand: ['promotions', 'variations', 'prices', 'images', 'page_meta_tags', 'custom_properties'],
      refine: _refine
    })
  }, {
    keepPreviousData: true
  });
  const {
    error,
    data: category
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useCategory)({
    parameters: {
      id: params.categoryId
    }
  }, {
    enabled: !isSearch && !!params.categoryId
  });

  // Apply disallow list to refinements.
  if (productSearchResult !== null && productSearchResult !== void 0 && productSearchResult.refinements) {
    productSearchResult.refinements = productSearchResult.refinements.filter(({
      attributeId
    }) => !REFINEMENT_DISALLOW_LIST.includes(attributeId));
  }

  /**************** Error Handling ****************/
  const errorStatus = error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status;
  switch (errorStatus) {
    case undefined:
      // No Error.
      break;
    case 404:
      throw new _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_25__.HTTPNotFound('Category Not Found.');
    default:
      throw new _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_25__.HTTPError(errorStatus, `HTTP Error ${errorStatus} occurred.`);
  }

  /**************** Response Handling ****************/
  if (res) {
    res.set('Cache-Control', `s-maxage=${_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.MAX_CACHE_AGE}, stale-while-revalidate=${_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.STALE_WHILE_REVALIDATE}`);
  }

  // Reset scroll position when `isRefetching` becomes `true`.
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    isRefetching && window.scrollTo(0, 0);
    setFiltersLoading(isRefetching);
  }, [isRefetching]);

  /**************** Render Variables ****************/
  const basePath = `${location.pathname}${location.search}`;
  const showNoResults = !isLoading && productSearchResult && !(productSearchResult !== null && productSearchResult !== void 0 && productSearchResult.hits);
  const {
    total,
    sortingOptions
  } = productSearchResult || {};
  const selectedSortingOptionLabel = (sortingOptions === null || sortingOptions === void 0 ? void 0 : sortingOptions.find(option => option.id === (productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.selectedSortingOption))) ?? (sortingOptions === null || sortingOptions === void 0 ? void 0 : sortingOptions[0]);

  // Get urls to be used for pagination, page size changes, and sorting.
  const pageUrls = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_20__.usePageUrls)({
    total
  });
  const sortUrls = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_20__.useSortUrls)({
    options: sortingOptions
  });
  const limitUrls = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_20__.useLimitUrls)();

  /**************** Action Handlers ****************/
  const {
    data: wishlist
  } = (0,_salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_30__.useWishList)();
  const addItemToWishlist = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (product) {
      setWishlistLoading([...wishlistLoading, product.productId]);

      // TODO: This wishlist object is from an old API, we need to replace it with the new one.
      const listId = wishlist.id;
      yield createCustomerProductListItem({
        parameters: {
          customerId,
          listId
        },
        body: {
          quantity: 1,
          public: false,
          priority: 1,
          type: 'product',
          productId: product.productId
        }
      }, {
        onError: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.API_ERROR_MESSAGE),
            status: 'error'
          });
        },
        onSuccess: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.TOAST_MESSAGE_ADDED_TO_WISHLIST, {
              quantity: 1
            }),
            status: 'success',
            action:
            /*#__PURE__*/
            // it would be better if we could use <Button as={Link}>
            // but unfortunately the Link component is not compatible
            // with Chakra Toast, since the ToastManager is rendered via portal
            // and the toast doesn't have access to intl provider, which is a
            // requirement of the Link component.
            react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Button, {
              variant: "link",
              onClick: () => navigate('/account/wishlist')
            }, formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.TOAST_ACTION_VIEW_WISHLIST))
          });
        },
        onSettled: () => {
          setWishlistLoading(wishlistLoading.filter(id => id !== product.productId));
        }
      });
    });
    return function addItemToWishlist(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const removeItemFromWishlist = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (product) {
      setWishlistLoading([...wishlistLoading, product.productId]);
      const listId = wishlist.id;
      const itemId = wishlist.customerProductListItems.find(i => i.productId === product.productId).id;
      yield deleteCustomerProductListItem({
        body: {},
        parameters: {
          customerId,
          listId,
          itemId
        }
      }, {
        onError: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.API_ERROR_MESSAGE),
            status: 'error'
          });
        },
        onSuccess: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.TOAST_MESSAGE_REMOVED_FROM_WISHLIST),
            status: 'success'
          });
        },
        onSettled: () => {
          setWishlistLoading(wishlistLoading.filter(id => id !== product.productId));
        }
      });
    });
    return function removeItemFromWishlist(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Toggles filter on and off
  const toggleFilter = (value, attributeId, selected, allowMultiple = true) => {
    const searchParamsCopy = _objectSpread({}, searchParams);

    // Remove the `offset` search param if present.
    delete searchParamsCopy.offset;

    // If we aren't allowing for multiple selections, simply clear any value set for the
    // attribute, and apply a new one if required.
    if (!allowMultiple) {
      const previousValue = searchParamsCopy.refine[attributeId];
      delete searchParamsCopy.refine[attributeId];

      // Note the loose comparison, for "string != number" checks.
      if (!selected && value.value != previousValue) {
        searchParamsCopy.refine[attributeId] = value.value;
      }
    } else {
      // Get the attibute value as an array.
      let attributeValue = searchParamsCopy.refine[attributeId] || [];

      // Ensure that the value is still converted into an array if it's a `string` or `number`.
      if (typeof attributeValue === 'string') {
        attributeValue = attributeValue.split('|');
      } else if (typeof attributeValue === 'number') {
        attributeValue = [attributeValue];
      }

      // Either set the value, or filter the value out.
      if (!selected) {
        attributeValue.push(value.value);
      } else {
        var _attributeValue;
        // Note the loose comparison, for "string != number" checks.
        attributeValue = (_attributeValue = attributeValue) === null || _attributeValue === void 0 ? void 0 : _attributeValue.filter(v => v != value.value);
      }

      // Update the attribute value in the new search params.
      searchParamsCopy.refine[attributeId] = attributeValue;

      // If the update value is an empty array, remove the current attribute key.
      if (searchParamsCopy.refine[attributeId].length === 0) {
        delete searchParamsCopy.refine[attributeId];
      }
    }
    if (isSearch) {
      navigate(`/search?${stringifySearchParams(searchParamsCopy)}`);
    } else {
      navigate(`/category/${params.categoryId}?${stringifySearchParams(searchParamsCopy)}`);
    }
  };

  // Clears all filters
  const resetFilters = () => {
    const newSearchParams = _objectSpread(_objectSpread({}, searchParams), {}, {
      refine: []
    });
    const newPath = isSearch ? `/search?${stringifySearchParams(newSearchParams)}` : `/category/${params.categoryId}?${stringifySearchParams(newSearchParams)}`;
    navigate(newPath);
  };

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (productSearchResult) {
      if (isSearch) {
        try {
          einstein.sendViewSearch(searchQuery, productSearchResult);
        } catch (err) {
          _salesforce_retail_react_app_app_utils_logger_instance__WEBPACK_IMPORTED_MODULE_26__["default"].error('Einstein sendViewSearch error', {
            namespace: 'ProductList.useEffect',
            additionalProperties: {
              error: err,
              searchQuery
            }
          });
        }
        dataCloud.sendViewSearchResults(searchParams, productSearchResult);
        activeData.sendViewSearch(searchParams, productSearchResult);
      } else {
        try {
          einstein.sendViewCategory(category, productSearchResult);
        } catch (err) {
          _salesforce_retail_react_app_app_utils_logger_instance__WEBPACK_IMPORTED_MODULE_26__["default"].error('Einstein sendViewCategory error', {
            namespace: 'ProductList.useEffect',
            additionalProperties: {
              error: err,
              category
            }
          });
        }
        dataCloud.sendViewCategory(searchParams, category, productSearchResult);
        activeData.sendViewCategory(searchParams, category, productSearchResult);
      }
    }
  }, [productSearchResult]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "sf-product-list-page",
    "data-testid": "sf-product-list-page",
    layerStyle: "page",
    paddingTop: {
      base: 6,
      lg: 8
    }
  }, rest), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_5__.Helmet, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("title", null, (category === null || category === void 0 ? void 0 : category.pageTitle) ?? searchQuery), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("meta", {
    name: "description",
    content: (category === null || category === void 0 ? void 0 : category.pageDescription) ?? searchQuery
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("meta", {
    name: "keywords",
    content: category === null || category === void 0 ? void 0 : category.pageKeywords
  }), productSearchResult === null || productSearchResult === void 0 ? void 0 : (_productSearchResult$ = productSearchResult.pageMetaTags) === null || _productSearchResult$ === void 0 ? void 0 : _productSearchResult$.map(({
    id,
    value
  }) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("meta", {
      name: id,
      content: value,
      key: id
    });
  })), showNoResults ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_empty_results__WEBPACK_IMPORTED_MODULE_15__["default"], {
    searchQuery: searchQuery,
    category: category
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_above_page_header__WEBPACK_IMPORTED_MODULE_17__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_page_designer_promotional_banner__WEBPACK_IMPORTED_MODULE_18__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Stack, {
    display: {
      base: 'none',
      lg: 'flex'
    },
    direction: "row",
    justify: "flex-start",
    align: "flex-start",
    spacing: 4,
    marginBottom: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Flex, {
    align: "left",
    width: "287px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_page_header__WEBPACK_IMPORTED_MODULE_16__["default"], {
    searchQuery: searchQuery,
    category: category,
    productSearchResult: productSearchResult,
    isLoading: isLoading
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Box, {
    flex: 1,
    paddingTop: '45px'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_selected_refinements__WEBPACK_IMPORTED_MODULE_14__["default"], {
    filters: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.refinements,
    toggleFilter: toggleFilter,
    handleReset: resetFilters,
    selectedFilterValues: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.selectedRefinements
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Box, {
    paddingTop: '45px'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(Sort, {
    sortUrls: sortUrls,
    productSearchResult: productSearchResult,
    basePath: basePath
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_11__.HideOnDesktop, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_page_header__WEBPACK_IMPORTED_MODULE_16__["default"], {
    searchQuery: searchQuery,
    category: category,
    productSearchResult: productSearchResult,
    isLoading: isLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Stack, {
    display: {
      base: 'flex',
      md: 'none'
    },
    direction: "row",
    justify: "flex-start",
    align: "center",
    spacing: 1,
    height: 12,
    borderColor: "gray.100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Flex, {
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Button, {
    fontSize: "sm",
    colorScheme: "black",
    variant: "outline",
    marginRight: 2,
    display: "inline-flex",
    leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_19__.FilterIcon, {
      boxSize: 5
    }),
    onClick: onOpen
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_34__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Filter"
    }],
    id: "product_list.button.filter"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Flex, {
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Button, {
    maxWidth: "245px",
    fontSize: "sm",
    marginRight: 2,
    colorScheme: "black",
    variant: "outline",
    display: "inline-flex",
    rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_19__.ChevronDownIcon, {
      boxSize: 5
    }),
    onClick: () => setSortOpen(true)
  }, formatMessage({
    id: "product_list.button.sort_by",
    defaultMessage: [{
      "type": 0,
      "value": "Sort By: "
    }, {
      "type": 1,
      "value": "sortOption"
    }]
  }, {
    sortOption: selectedSortingOptionLabel === null || selectedSortingOptionLabel === void 0 ? void 0 : selectedSortingOptionLabel.label
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Box, {
    marginBottom: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_selected_refinements__WEBPACK_IMPORTED_MODULE_14__["default"], {
    filters: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.refinements,
    toggleFilter: toggleFilter,
    handleReset: resetFilters,
    selectedFilterValues: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.selectedRefinements
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Grid, {
    templateColumns: {
      base: '1fr',
      md: '280px 1fr'
    },
    columnGap: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Stack, {
    display: {
      base: 'none',
      md: 'flex'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_refinements__WEBPACK_IMPORTED_MODULE_12__["default"], {
    itemsBefore: category !== null && category !== void 0 && category.categories ? [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_category_links__WEBPACK_IMPORTED_MODULE_13__["default"], {
      key: "itemsBefore",
      category: category
    })] : undefined,
    isLoading: filtersLoading,
    toggleFilter: toggleFilter,
    filters: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.refinements,
    excludedFilters: ['cgid'],
    selectedFilters: searchParams.refine
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.SimpleGrid, {
    columns: [2, 2, 3, 3],
    spacingX: 4,
    spacingY: {
      base: 12,
      lg: 16
    }
  }, (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_31__.isHydrated)() && (isRefetching && !isFetched || !productSearchResult) ? new Array(searchParams.limit).fill(0).map((value, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_product_tile__WEBPACK_IMPORTED_MODULE_10__.Skeleton, {
    key: index
  })) : productSearchResult === null || productSearchResult === void 0 ? void 0 : (_productSearchResult$2 = productSearchResult.hits) === null || _productSearchResult$2 === void 0 ? void 0 : _productSearchResult$2.map(productSearchItem => {
    var _wishlist$customerPro;
    const productId = productSearchItem.productId;
    const isInWishlist = !!(wishlist !== null && wishlist !== void 0 && (_wishlist$customerPro = wishlist.customerProductListItems) !== null && _wishlist$customerPro !== void 0 && _wishlist$customerPro.find(item => item.productId === productId));
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_product_tile__WEBPACK_IMPORTED_MODULE_10__["default"], {
      "data-testid": `sf-product-tile-${productSearchItem.productId}`,
      key: productSearchItem.productId,
      product: productSearchItem,
      enableFavourite: true,
      isFavourite: isInWishlist,
      isRefreshingData: isRefetching && isFetched,
      imageViewType: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.PRODUCT_LIST_IMAGE_VIEW_TYPE,
      selectableAttributeId: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.PRODUCT_LIST_SELECTABLE_ATTRIBUTE_ID,
      onClick: () => {
        if (searchQuery) {
          einstein.sendClickSearch(searchQuery, productSearchItem);
        } else if (category) {
          einstein.sendClickCategory(category, productSearchItem);
        }
      },
      onFavouriteToggle: toBeFavourite => {
        const action = toBeFavourite ? addItemToWishlist : removeItemFromWishlist;
        return action(productSearchItem);
      },
      dynamicImageProps: {
        widths: ['50vw', '50vw', '20vw', '20vw', '25vw']
      }
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Flex, {
    justifyContent: ['center', 'center', 'flex-start'],
    paddingTop: 8
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_pagination__WEBPACK_IMPORTED_MODULE_9__["default"], {
    currentURL: basePath,
    urls: pageUrls
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Select, {
    display: "none",
    value: basePath,
    onChange: ({
      target
    }) => {
      history.push(target.value);
    }
  }, limitUrls.map((href, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("option", {
    key: href,
    value: href
  }, _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_27__.DEFAULT_LIMIT_VALUES[index]))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Modal, {
    isOpen: isOpen,
    onClose: onClose,
    size: "full",
    motionPreset: "slideInBottom",
    scrollBehavior: "inside"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.ModalOverlay, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.ModalContent, {
    top: 0,
    marginTop: 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.ModalHeader, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Heading, {
    as: "h1",
    fontWeight: "bold",
    fontSize: "2xl"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_34__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Filter"
    }],
    id: "product_list.modal.title.filter"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.ModalCloseButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.ModalBody, {
    py: 4
  }, filtersLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_29__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_refinements__WEBPACK_IMPORTED_MODULE_12__["default"], {
    toggleFilter: toggleFilter,
    filters: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.refinements,
    selectedFilters: searchParams.refine,
    itemsBefore: category !== null && category !== void 0 && category.categories ? [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_category_links__WEBPACK_IMPORTED_MODULE_13__["default"], {
      key: "itemsBefore",
      category: category,
      onSelect: onClose
    })] : undefined,
    excludedFilters: ['cgid']
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.ModalFooter
  // justify="space-between"
  , {
    display: "block",
    width: "full",
    borderTop: "1px solid",
    borderColor: "gray.100",
    paddingBottom: 10
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Button, {
    width: "full",
    onClick: onClose
  }, formatMessage({
    id: "product_list.modal.button.view_items",
    defaultMessage: [{
      "type": 0,
      "value": "View "
    }, {
      "type": 1,
      "value": "prroductCount"
    }, {
      "type": 0,
      "value": " items"
    }]
  }, {
    prroductCount: productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.total
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Button, {
    width: "full",
    variant: "outline",
    onClick: resetFilters
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_34__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Clear Filters"
    }],
    id: "product_list.modal.button.clear_filters"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Drawer, {
    placement: "bottom",
    isOpen: sortOpen,
    onClose: () => setSortOpen(false),
    size: "sm",
    motionPreset: "slideInBottom",
    scrollBehavior: "inside",
    isFullHeight: false,
    height: "50%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.DrawerOverlay, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.DrawerContent, {
    marginTop: 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.DrawerHeader, {
    boxShadow: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Text, {
    fontWeight: "bold",
    fontSize: "2xl"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_34__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sort By"
    }],
    id: "product_list.drawer.title.sort_by"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.DrawerCloseButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.DrawerBody, null, sortUrls.map((href, idx) => {
    var _productSearchResult$3, _productSearchResult$4;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Button, {
      width: "full",
      onClick: () => {
        setSortOpen(false);
        history.push(href);
      },
      fontSize: 'md',
      key: idx,
      marginTop: 0,
      variant: "menu-link"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Text, {
      as: (selectedSortingOptionLabel === null || selectedSortingOptionLabel === void 0 ? void 0 : selectedSortingOptionLabel.label) === (productSearchResult === null || productSearchResult === void 0 ? void 0 : (_productSearchResult$3 = productSearchResult.sortingOptions[idx]) === null || _productSearchResult$3 === void 0 ? void 0 : _productSearchResult$3.label) && 'u'
    }, productSearchResult === null || productSearchResult === void 0 ? void 0 : (_productSearchResult$4 = productSearchResult.sortingOptions[idx]) === null || _productSearchResult$4 === void 0 ? void 0 : _productSearchResult$4.label));
  })))));
};
ProductList.getTemplateName = () => 'product-list';
ProductList.propTypes = {
  onAddToWishlistClick: (prop_types__WEBPACK_IMPORTED_MODULE_35___default().func),
  onRemoveWishlistClick: (prop_types__WEBPACK_IMPORTED_MODULE_35___default().func),
  category: (prop_types__WEBPACK_IMPORTED_MODULE_35___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductList);
const Sort = _ref3 => {
  let {
      sortUrls,
      productSearchResult,
      basePath
    } = _ref3,
    otherProps = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref3, _excluded3);
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_32__["default"])();
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_33__.useHistory)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.FormControl, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-label": intl.formatMessage({
      id: "product_list.drawer.title.sort_by",
      defaultMessage: [{
        "type": 0,
        "value": "Sort By"
      }]
    }),
    "data-testid": "sf-product-list-sort",
    id: "page_sort",
    width: "auto"
  }, otherProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_8__.Select, {
    id: "sf-product-list-sort-select",
    "aria-label": intl.formatMessage({
      id: "product_list.sort_by.label.assistive_msg",
      defaultMessage: [{
        "type": 0,
        "value": "Sort products by"
      }]
    }),
    value: basePath.replace(/(offset)=(\d+)/i, '$1=0'),
    onChange: ({
      target
    }) => {
      history.push(target.value);
    },
    height: 11,
    width: "240px"
  }, sortUrls.map((href, index) => {
    var _productSearchResult$5;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("option", {
      key: href,
      value: href
    }, intl.formatMessage({
      id: "product_list.select.sort_by",
      defaultMessage: [{
        "type": 0,
        "value": "Sort By: "
      }, {
        "type": 1,
        "value": "sortOption"
      }]
    }, {
      sortOption: productSearchResult === null || productSearchResult === void 0 ? void 0 : (_productSearchResult$5 = productSearchResult.sortingOptions[index]) === null || _productSearchResult$5 === void 0 ? void 0 : _productSearchResult$5.label
    }));
  })));
};
Sort.propTypes = {
  sortUrls: (prop_types__WEBPACK_IMPORTED_MODULE_35___default().array),
  productSearchResult: (prop_types__WEBPACK_IMPORTED_MODULE_35___default().object),
  basePath: (prop_types__WEBPACK_IMPORTED_MODULE_35___default().string)
};

/***/ }),

/***/ "./app/pages/product-list/partials/above-page-header.jsx":
/*!***************************************************************!*\
  !*** ./app/pages/product-list/partials/above-page-header.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

const AbovePageHeader = () => null;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbovePageHeader);

/***/ }),

/***/ "./app/pages/product-list/partials/category-links.jsx":
/*!************************************************************!*\
  !*** ./app/pages/product-list/partials/category-links.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





// Project Components



// Others

const CategoryLinks = ({
  category = {},
  onSelect = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_3__.noop
}) => {
  const {
    categories = []
  } = category;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionItem, {
    paddingBottom: 6,
    borderTop: "none",
    key: "show-all"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionButton, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Heading, {
    as: "h2",
    flex: "1",
    textAlign: "left",
    fontSize: "md",
    fontWeight: 600
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Categories"
    }],
    id: "category_links.button_text"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionPanel, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 1
  }, categories.map(({
    id,
    name
  }) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
      display: "flex",
      alignItems: "center",
      lineHeight: {
        base: '44px',
        lg: '24px'
      },
      key: id,
      href: `/category/${id}`,
      onClick: onSelect,
      useNavLink: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
      fontSize: "sm"
    }, name));
  }))));
};
CategoryLinks.propTypes = {
  category: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  onSelect: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryLinks);

/***/ }),

/***/ "./app/pages/product-list/partials/checkbox-refinements.jsx":
/*!******************************************************************!*\
  !*** ./app/pages/product-list/partials/checkbox-refinements.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/refinements-utils */ "./app/pages/product-list/partials/refinements-utils.js");
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const CheckboxRefinements = ({
  filter,
  toggleFilter,
  selectedFilters
}) => {
  var _filter$values;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_3__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 1
  }, (_filter$values = filter.values) === null || _filter$values === void 0 ? void 0 : _filter$values.map(value => {
    const isChecked = selectedFilters.includes(value.value);
    // Don't display refinements with no results, unless we got there by selecting too
    // many refinements
    if (value.hitCount === 0 && !isChecked) return;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
      key: value.value
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Checkbox, {
      isChecked: isChecked,
      onChange: () => toggleFilter(value, filter.attributeId, isChecked),
      "aria-label": formatMessage(isChecked ? _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_2__.REMOVE_FILTER : _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_2__.ADD_FILTER, value)
    }, value.label));
  }));
};
CheckboxRefinements.propTypes = {
  filter: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  selectedFilters: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckboxRefinements);

/***/ }),

/***/ "./app/pages/product-list/partials/color-refinements.jsx":
/*!***************************************************************!*\
  !*** ./app/pages/product-list/partials/color-refinements.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/refinements-utils */ "./app/pages/product-list/partials/refinements-utils.js");

/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







const ColorRefinements = ({
  filter,
  toggleFilter,
  selectedFilters
}) => {
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useMultiStyleConfig)('SwatchGroup', {
    variant: 'circle',
    disabled: false
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.SimpleGrid, {
    columns: 2,
    spacing: 2,
    mt: 1
  }, filter.values.map((value, idx) => {
    const isSelected = selectedFilters.includes(value.value);

    // Don't display refinements with no results, unless we got there by selecting too
    // many refinements
    if (value.hitCount === 0 && !isSelected) return;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
      key: idx
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.HStack, {
      onClick: () => toggleFilter(value, filter.attributeId, isSelected),
      spacing: 1,
      cursor: "pointer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.swatch, {
      color: isSelected ? 'black' : 'gray.200',
      border: isSelected ? '1px' : '0',
      "aria-checked": isSelected,
      role: "checkbox",
      variant: "outline",
      marginRight: 0,
      marginBottom: "-1px",
      "aria-label": intl.formatMessage(isSelected ? _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_4__.REMOVE_FILTER_HIT_COUNT : _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_4__.ADD_FILTER_HIT_COUNT, value)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Center, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.swatchButton, {
      marginRight: 0,
      border: "1px solid black"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
      marginRight: 0,
      height: "100%",
      width: "100%",
      minWidth: "32px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_3__.cssColorGroups[value.presentationId.toLowerCase()],
      background: value.presentationId.toLowerCase() === 'miscellaneous' && _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_3__.cssColorGroups[value.presentationId.toLowerCase()]
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
      display: "flex",
      alignItems: "center",
      fontSize: "sm",
      marginBottom: "1px",
      "aria-hidden": "true" // avoid redundant readout since swatch has aria label
    }, intl.formatMessage({
      id: "colorRefinements.label.hitCount",
      defaultMessage: [{
        "type": 1,
        "value": "colorLabel"
      }, {
        "type": 0,
        "value": " ("
      }, {
        "type": 1,
        "value": "colorHitCount"
      }, {
        "type": 0,
        "value": ")"
      }]
    }, {
      colorLabel: value.label,
      colorHitCount: value.hitCount
    }))));
  }));
};
ColorRefinements.propTypes = {
  filter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
  selectedFilters: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorRefinements);

/***/ }),

/***/ "./app/pages/product-list/partials/empty-results.jsx":
/*!***********************************************************!*\
  !*** ./app/pages/product-list/partials/empty-results.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/recommended-products */ "./overlays/page-designer-theme-home/app/components/recommended-products/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */









const contactUsMessage = (0,react_intl__WEBPACK_IMPORTED_MODULE_5__.defineMessage)({
  id: "empty_search_results.link.contact_us",
  defaultMessage: [{
    "type": 0,
    "value": "Contact Us"
  }]
});
const EmptySearchResults = ({
  searchQuery,
  category
}) => {
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    "data-testid": "sf-product-empty-list-page",
    direction: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 28,
    paddingBottom: 28
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.SearchIcon, {
    boxSize: [6, 12, 12, 12],
    marginBottom: 5
  }), !searchQuery ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontSize: ['l', 'l', 'xl', '2xl'],
    fontWeight: "700",
    marginBottom: 2
  }, intl.formatMessage({
    id: "empty_search_results.info.cant_find_anything_for_category",
    defaultMessage: [{
      "type": 0,
      "value": "We couldn’t find anything for "
    }, {
      "type": 1,
      "value": "category"
    }, {
      "type": 0,
      "value": ". Try searching for a product or "
    }, {
      "type": 1,
      "value": "link"
    }, {
      "type": 0,
      "value": "."
    }]
  }, {
    category: category === null || category === void 0 ? void 0 : category.name,
    link: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Link, {
      as: react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link,
      to: '/'
    }, intl.formatMessage(contactUsMessage))
  })), ' ') : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontSize: ['lg', 'lg', 'xl', '3xl'],
    fontWeight: "700",
    marginBottom: 2
  }, intl.formatMessage({
    id: "empty_search_results.info.cant_find_anything_for_query",
    defaultMessage: [{
      "type": 0,
      "value": "We couldn’t find anything for \""
    }, {
      "type": 1,
      "value": "searchQuery"
    }, {
      "type": 0,
      "value": "\"."
    }]
  }, {
    searchQuery: searchQuery
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontSize: ['md', 'md', 'md', 'md'],
    fontWeight: "400"
  }, intl.formatMessage({
    id: "empty_search_results.info.double_check_spelling",
    defaultMessage: [{
      "type": 0,
      "value": "Double-check your spelling and try again or "
    }, {
      "type": 1,
      "value": "link"
    }, {
      "type": 0,
      "value": "."
    }]
  }, {
    link: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "link",
      to: '/'
    }, intl.formatMessage(contactUsMessage))
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 16,
    marginTop: 32
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_8__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Top Sellers"
      }],
      id: "empty_search_results.recommended_products.title.top_sellers"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_4__.EINSTEIN_RECOMMENDERS.EMPTY_SEARCH_RESULTS_TOP_SELLERS,
    mx: {
      base: -4,
      md: -8,
      lg: 0
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_8__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Most Viewed"
      }],
      id: "empty_search_results.recommended_products.title.most_viewed"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_4__.EINSTEIN_RECOMMENDERS.EMPTY_SEARCH_RESULTS_MOST_VIEWED,
    mx: {
      base: -4,
      md: -8,
      lg: 0
    }
  }))));
};
EmptySearchResults.propTypes = {
  searchQuery: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),
  category: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmptySearchResults);

/***/ }),

/***/ "./app/pages/product-list/partials/link-refinements.jsx":
/*!**************************************************************!*\
  !*** ./app/pages/product-list/partials/link-refinements.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const LinkRefinements = ({
  filter
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 1
  }, filter.values.map(value => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_2__["default"], {
      display: "flex",
      alignItems: "center",
      lineHeight: {
        base: '44px',
        lg: '24px'
      },
      key: value.value,
      href: `/category/${value.value}`,
      useNavLink: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
      fontSize: "sm"
    }, value.label));
  }));
};
LinkRefinements.propTypes = {
  filter: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LinkRefinements);

/***/ }),

/***/ "./app/pages/product-list/partials/page-designer-promotional-banner.jsx":
/*!******************************************************************************!*\
  !*** ./app/pages/product-list/partials/page-designer-promotional-banner.jsx ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react/components */ "./node_modules/@salesforce/commerce-sdk-react/components/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_retail_react_app_app_page_designer_assets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/page-designer/assets */ "./app/page-designer/assets/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_page_designer_layouts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/page-designer/layouts */ "./app/page-designer/layouts/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-multi-site */ "./app/hooks/use-multi-site.js");
/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



// Components



// Page Designer Components



// Hooks



// Constants
const PROMO_BANNER_DESKTOP_PAGE_ID = 'instagram-promo-banner-desktop';
const PROMO_BANNER_MOBILE_PAGE_ID = 'instagram-promo-banner-mobile';
const PAGEDESIGNER_TO_COMPONENT = {
  'commerce_assets.productListTile': _salesforce_retail_react_app_app_page_designer_assets__WEBPACK_IMPORTED_MODULE_4__.ImageWithText,
  'commerce_layouts.mobileGrid1r1c': _salesforce_retail_react_app_app_page_designer_layouts__WEBPACK_IMPORTED_MODULE_5__.MobileGrid1r1c
};
const PageDesignerPromotionalBanner = () => {
  const {
    site
  } = (0,_salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const {
    usid
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.useUsid)();
  const {
    data: shopperContext
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.useShopperContext)({
    parameters: {
      usid,
      siteId: site.id
    }
  }, {
    enabled: !_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.isServer && Boolean(usid)
  });
  const {
    data: promoBannerDesktop,
    error: pageErrorDesktop
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.usePage)({
    parameters: {
      pageId: PROMO_BANNER_DESKTOP_PAGE_ID
    }
  }, {
    enabled: !!shopperContext
  });
  const {
    data: promoBannerMobile,
    error: pageErrorMobile
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.usePage)({
    parameters: {
      pageId: PROMO_BANNER_MOBILE_PAGE_ID
    }
  }, {
    enabled: !!shopperContext
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, promoBannerDesktop && !pageErrorDesktop && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    display: {
      base: 'none',
      sm: 'block'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_3__.Page, {
    page: promoBannerDesktop,
    components: PAGEDESIGNER_TO_COMPONENT,
    "data-testid": 'sf-promo-banner-desktop'
  })), promoBannerMobile && !pageErrorMobile && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    display: {
      base: 'block',
      sm: 'none'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_3__.Page, {
    page: promoBannerMobile,
    components: PAGEDESIGNER_TO_COMPONENT,
    "data-testid": 'sf-promo-banner-mobile'
  })));
};
PageDesignerPromotionalBanner.propTypes = {};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageDesignerPromotionalBanner);

/***/ }),

/***/ "./app/pages/product-list/partials/page-header.jsx":
/*!*********************************************************!*\
  !*** ./app/pages/product-list/partials/page-header.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_breadcrumb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/breadcrumb */ "./app/components/breadcrumb/index.jsx");


const _excluded = ["category", "productSearchResult", "isLoading", "searchQuery"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



// Components


// Project Components

const PageHeader = _ref => {
  let {
      category,
      productSearchResult,
      isLoading,
      searchQuery
    } = _ref,
    otherProps = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, otherProps, {
    "data-testid": "sf-product-list-breadcrumb"
  }), category && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_breadcrumb__WEBPACK_IMPORTED_MODULE_4__["default"], {
    categories: category.parentCategoryTree
  }), searchQuery && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, "Search Results for"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h2",
    size: "lg",
    marginRight: 2
  }, `${(category === null || category === void 0 ? void 0 : category.name) || searchQuery || ''}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h2",
    size: "lg",
    marginRight: 2
  }, !isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Fade, {
    in: true
  }, "(", productSearchResult === null || productSearchResult === void 0 ? void 0 : productSearchResult.total, ")"))));
};
PageHeader.propTypes = {
  category: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  productSearchResult: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  searchQuery: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageHeader);

/***/ }),

/***/ "./app/pages/product-list/partials/radio-refinements.jsx":
/*!***************************************************************!*\
  !*** ./app/pages/product-list/partials/radio-refinements.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/refinements-utils */ "./app/pages/product-list/partials/refinements-utils.js");
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const RadioRefinement = ({
  filter,
  value,
  toggleFilter,
  isSelected
}) => {
  const buttonRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_3__["default"])();
  // Because choosing a refinement is equivalent to a form submission, the best semantic choice
  // for the refinement is a button or a link, rather than a radio input. The radio element here
  // is purely for visual purposes, and should probably be replaced with a simple icon.
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Radio, {
    display: "inline-flex",
    height: {
      base: '44px',
      lg: '24px'
    },
    isChecked: isSelected
    // Ideally, this "icon" would be part of the button, but doing so with a radio input
    // triggers `onClick` twice. The radio must be separate, and therefore we must add
    // these workarounds to prevent it from receiving focus.
    ,
    inputProps: {
      'aria-hidden': true,
      tabIndex: -1
    },
    onClick: () => {
      var _buttonRef$current;
      return (_buttonRef$current = buttonRef.current) === null || _buttonRef$current === void 0 ? void 0 : _buttonRef$current.click();
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    ref: buttonRef,
    ml: 2,
    as: "button",
    fontSize: "sm",
    onClick: () => toggleFilter(value, filter.attributeId, false, false),
    "aria-label": formatMessage(isSelected ? _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_2__.REMOVE_FILTER : _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_2__.ADD_FILTER, value)
  }, value.label));
};
RadioRefinement.propTypes = {
  filter: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  value: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  isSelected: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().bool)
};
const RadioRefinements = ({
  filter,
  toggleFilter,
  selectedFilters
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 1
  }, filter.values.map(value => {
    const isSelected = selectedFilters.includes(value.value);
    // Don't display refinements with no results, unless we got there by selecting too
    // many refinements
    if (value.hitCount === 0 && !isSelected) return;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(RadioRefinement, {
      key: value.value,
      value: value,
      filter: filter,
      toggleFilter: toggleFilter,
      isSelected: isSelected
    });
  }));
};
RadioRefinements.propTypes = {
  filter: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func),
  selectedFilters: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object))
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadioRefinements);

/***/ }),

/***/ "./app/pages/product-list/partials/refinements.jsx":
/*!*********************************************************!*\
  !*** ./app/pages/product-list/partials/refinements.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   componentMap: () => (/* binding */ componentMap),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_color_refinements__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/color-refinements */ "./app/pages/product-list/partials/color-refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_size_refinements__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/size-refinements */ "./app/pages/product-list/partials/size-refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_radio_refinements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/radio-refinements */ "./app/pages/product-list/partials/radio-refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_checkbox_refinements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/checkbox-refinements */ "./app/pages/product-list/partials/checkbox-refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_link_refinements__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/link-refinements */ "./app/pages/product-list/partials/link-refinements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */












/** Map of refinement attribute IDs to the components used to display values as filter options. */
const componentMap = {
  cgid: _salesforce_retail_react_app_app_pages_product_list_partials_link_refinements__WEBPACK_IMPORTED_MODULE_6__["default"],
  c_refinementColor: _salesforce_retail_react_app_app_pages_product_list_partials_color_refinements__WEBPACK_IMPORTED_MODULE_2__["default"],
  c_size: _salesforce_retail_react_app_app_pages_product_list_partials_size_refinements__WEBPACK_IMPORTED_MODULE_3__["default"],
  price: _salesforce_retail_react_app_app_pages_product_list_partials_radio_refinements__WEBPACK_IMPORTED_MODULE_4__["default"]
};
const Refinements = ({
  itemsBefore,
  excludedFilters = [],
  filters = [],
  toggleFilter,
  selectedFilters,
  isLoading
}) => {
  var _filters, _filters4;
  // Exclude filters in the exclude list.
  if (excludedFilters) {
    filters = filters.filter(({
      attributeId
    }) => !excludedFilters.includes(attributeId));
  }

  // Getting the indices of filters to open accordions by default
  let filtersIndexes = (_filters = filters) === null || _filters === void 0 ? void 0 : _filters.map((filter, idx) => idx);

  // Use saved state for accordions
  if (!_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_7__.isServer) {
    // TODO: Change this to `useLocalStorage` hook when localStorage detection is more robust
    const filterAccordionState = window.localStorage.getItem(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_8__.FILTER_ACCORDION_SATE);
    const savedExpandedAccordionIndexes = filterAccordionState && JSON.parse(filterAccordionState);
    if (savedExpandedAccordionIndexes) {
      var _filters2;
      filtersIndexes = (_filters2 = filters) === null || _filters2 === void 0 ? void 0 : _filters2.map((filter, index) => {
        if (savedExpandedAccordionIndexes.includes(filter.attributeId)) {
          return index;
        }
      }).filter(index => index !== undefined);
    }
  }

  // Handle saving acccordion state
  const updateAccordionState = expandedIndex => {
    var _filters3;
    const filterState = (_filters3 = filters) === null || _filters3 === void 0 ? void 0 : _filters3.filter((filter, index) => expandedIndex.includes(index)).map(filter => filter.attributeId);

    // TODO: Update when localStorage detection is more robust? useLocalStorage is only a getter
    window.localStorage.setItem(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_8__.FILTER_ACCORDION_SATE, JSON.stringify(filterState));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 8
  }, filtersIndexes && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Accordion, {
    pointerEvents: isLoading ? 'none' : 'auto',
    onChange: updateAccordionState,
    opacity: isLoading ? 0.2 : 1,
    allowMultiple: true,
    defaultIndex: filtersIndexes,
    reduceMotion: true
  }, itemsBefore, (_filters4 = filters) === null || _filters4 === void 0 ? void 0 : _filters4.map((filter, idx) => {
    // Render the appropriate component for the refinement type, fallback to checkboxes
    const Values = componentMap[filter.attributeId] || _salesforce_retail_react_app_app_pages_product_list_partials_checkbox_refinements__WEBPACK_IMPORTED_MODULE_5__["default"];
    let selectedFiltersArray = (selectedFilters === null || selectedFilters === void 0 ? void 0 : selectedFilters[filter.attributeId]) ?? [];

    // Catch any non-array values and wrap them in an array
    if (!Array.isArray(selectedFiltersArray)) {
      selectedFiltersArray = [selectedFiltersArray];
    }
    if (filter.values) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
        key: filter.attributeId,
        divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Divider, null)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionItem, {
        paddingTop: idx !== 0 || itemsBefore ? 6 : 0,
        borderBottom: idx === filters.length - 1 ? '1px solid gray.200' : 'none',
        paddingBottom: 6,
        borderTop: idx === 0 && !itemsBefore ? 'none' : '1px solid gray.200'
      }, ({
        isExpanded
      }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionButton, {
        paddingTop: 0,
        paddingBottom: isExpanded ? 2 : 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Heading, {
        as: "h2",
        flex: "1",
        textAlign: "left",
        fontSize: "md",
        fontWeight: 600
      }, filter.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionPanel, {
        paddingLeft: 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Values, {
        selectedFilters: selectedFiltersArray,
        filter: filter,
        toggleFilter: toggleFilter
      })))));
    } else {
      return null;
    }
  })));
};
Refinements.propTypes = {
  itemsBefore: prop_types__WEBPACK_IMPORTED_MODULE_9___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_9___default().element)),
  filters: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().array),
  excludedFilters: prop_types__WEBPACK_IMPORTED_MODULE_9___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_9___default().string)),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func),
  selectedFilters: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Refinements);

/***/ }),

/***/ "./app/pages/product-list/partials/selected-refinements.jsx":
/*!******************************************************************!*\
  !*** ./app/pages/product-list/partials/selected-refinements.jsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/refinements-utils */ "./app/pages/product-list/partials/refinements-utils.js");
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







const SelectedRefinements = ({
  toggleFilter,
  selectedFilterValues,
  filters,
  handleReset
}) => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const priceFilterValues = filters === null || filters === void 0 ? void 0 : filters.find(filter => filter.attributeId === 'price');
  let selectedFilters = [];
  for (const key in selectedFilterValues) {
    const filters = selectedFilterValues[key].split('|');
    filters === null || filters === void 0 ? void 0 : filters.forEach(filter => {
      var _priceFilterValues$va, _priceFilterValues$va2;
      const selected = {
        uiLabel: key === 'price' ? priceFilterValues === null || priceFilterValues === void 0 ? void 0 : (_priceFilterValues$va = priceFilterValues.values) === null || _priceFilterValues$va === void 0 ? void 0 : (_priceFilterValues$va2 = _priceFilterValues$va.find(priceFilter => priceFilter.value === filter)) === null || _priceFilterValues$va2 === void 0 ? void 0 : _priceFilterValues$va2.label : filter,
        value: key,
        apiLabel: filter
      };
      if (selected.value !== 'htype' && selected.value !== 'cgid') {
        selectedFilters.push(selected);
      }
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Wrap, {
    direction: "row",
    align: "center",
    display: "flex",
    flexWrap: "wrap",
    "data-testid": "sf-selected-refinements"
  }, selectedFilters === null || selectedFilters === void 0 ? void 0 : selectedFilters.map((filter, idx) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.WrapItem, {
      key: idx
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
      marginLeft: 0,
      marginRight: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
      marginTop: 1,
      padding: 5,
      color: "black",
      colorScheme: "gray",
      size: "sm",
      iconSpacing: 1,
      rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.CloseIcon, {
        color: "black",
        boxSize: 4,
        mr: "-7px",
        mb: "-6px"
      }),
      onClick: () => toggleFilter({
        value: filter.apiLabel
      }, filter.value, true),
      "aria-label": formatMessage(_salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_3__.REMOVE_FILTER, {
        label: filter.uiLabel
      })
    }, filter.uiLabel)));
  }), (selectedFilters === null || selectedFilters === void 0 ? void 0 : selectedFilters.length) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.WrapItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    padding: {
      sm: 0,
      base: 2
    },
    variant: "link",
    size: "sm",
    onClick: handleReset,
    "aria-label": formatMessage({
      id: "selected_refinements.action.assistive_msg.clear_all",
      defaultMessage: [{
        "type": 0,
        "value": "Clear all filters"
      }]
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Clear All"
    }],
    id: "selected_refinements.action.clear_all"
  })))));
};
SelectedRefinements.propTypes = {
  filters: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().array),
  selectedFilterValues: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
  handleReset: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SelectedRefinements);

/***/ }),

/***/ "./app/pages/product-list/partials/size-refinements.jsx":
/*!**************************************************************!*\
  !*** ./app/pages/product-list/partials/size-refinements.jsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/refinements-utils */ "./app/pages/product-list/partials/refinements-utils.js");

/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const SizeRefinements = ({
  filter,
  toggleFilter,
  selectedFilters
}) => {
  var _filter$values;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useMultiStyleConfig)('SwatchGroup', {
    variant: 'square',
    disabled: false
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.SimpleGrid, {
    templateColumns: "repeat(auto-fit, 44px)",
    spacing: 4,
    mt: 1
  }, (_filter$values = filter.values) === null || _filter$values === void 0 ? void 0 : _filter$values.map((value, idx) => {
    // Note the loose comparison, for "string == number" checks.
    const isSelected = selectedFilters.some(filterValue => filterValue == value.value);
    // Don't display refinements with no results, unless we got there by selecting too
    // many refinements
    if (value.hitCount === 0 && !isSelected) return;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      key: idx
    }, styles.swatch, {
      borderColor: isSelected ? 'black' : 'gray.200',
      backgroundColor: isSelected ? 'black' : 'white',
      color: isSelected ? 'white' : 'gray.900',
      onClick: () => toggleFilter(value, filter.attributeId, isSelected),
      "aria-checked": isSelected,
      role: "checkbox",
      variant: "outline",
      marginBottom: 0,
      marginRight: 0,
      "aria-label": formatMessage(isSelected ? _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_3__.REMOVE_FILTER : _salesforce_retail_react_app_app_pages_product_list_partials_refinements_utils__WEBPACK_IMPORTED_MODULE_3__.ADD_FILTER, value)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Center, styles.swatchButton, value.label));
  }));
};
SizeRefinements.propTypes = {
  filter: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  selectedFilters: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_5___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)), (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string)]),
  toggleFilter: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SizeRefinements);

/***/ }),

/***/ "./app/pages/product-list/partials/refinements-utils.js":
/*!**************************************************************!*\
  !*** ./app/pages/product-list/partials/refinements-utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ADD_FILTER: () => (/* binding */ ADD_FILTER),
/* harmony export */   ADD_FILTER_HIT_COUNT: () => (/* binding */ ADD_FILTER_HIT_COUNT),
/* harmony export */   REMOVE_FILTER: () => (/* binding */ REMOVE_FILTER),
/* harmony export */   REMOVE_FILTER_HIT_COUNT: () => (/* binding */ REMOVE_FILTER_HIT_COUNT)
/* harmony export */ });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


/** ARIA label for refinement pickers when the option has not been selected. */
const ADD_FILTER = (0,react_intl__WEBPACK_IMPORTED_MODULE_0__.defineMessage)({
  id: "product_list.refinements.button.assistive_msg.add_filter",
  defaultMessage: [{
    "type": 0,
    "value": "Add filter: "
  }, {
    "type": 1,
    "value": "label"
  }]
});

/** ARIA label for refinement pickers when the option has been selected. */
const REMOVE_FILTER = (0,react_intl__WEBPACK_IMPORTED_MODULE_0__.defineMessage)({
  id: "product_list.refinements.button.assistive_msg.remove_filter",
  defaultMessage: [{
    "type": 0,
    "value": "Remove filter: "
  }, {
    "type": 1,
    "value": "label"
  }]
});

/**
 * ARIA label for refinement pickers when the option has not been selected.
 * Includes the number of results.
 */
const ADD_FILTER_HIT_COUNT = (0,react_intl__WEBPACK_IMPORTED_MODULE_0__.defineMessage)({
  id: "product_list.refinements.button.assistive_msg.add_filter_with_hit_count",
  defaultMessage: [{
    "type": 0,
    "value": "Add filter: "
  }, {
    "type": 1,
    "value": "label"
  }, {
    "type": 0,
    "value": " ("
  }, {
    "type": 1,
    "value": "hitCount"
  }, {
    "type": 0,
    "value": ")"
  }]
});

/**
 * ARIA label for refinement pickers when the option has not been selected.
 * Includes the number of results.
 */
const REMOVE_FILTER_HIT_COUNT = (0,react_intl__WEBPACK_IMPORTED_MODULE_0__.defineMessage)({
  id: "product_list.refinements.button.assistive_msg.remove_filter_with_hit_count",
  defaultMessage: [{
    "type": 0,
    "value": "Remove filter: "
  }, {
    "type": 1,
    "value": "label"
  }, {
    "type": 0,
    "value": " ("
  }, {
    "type": 1,
    "value": "hitCount"
  }, {
    "type": 0,
    "value": ")"
  }]
});

/***/ }),

/***/ "./overlays/category-header-slot/app/pages/product-list/partials/above-page-header.jsx":
/*!*********************************************************************************************!*\
  !*** ./overlays/category-header-slot/app/pages/product-list/partials/above-page-header.jsx ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_list_partials_above_page_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-list/partials/above-page-header */ "./app/pages/product-list/partials/above-page-header.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-multi-site */ "./app/hooks/use-multi-site.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/useQuery.esm.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_designer_headless_helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-designer/headless/helpers */ "./app/components/page-designer/headless/helpers.js");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_utils_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/utils/url */ "./node_modules/@salesforce/pwa-kit-react-sdk/utils/url.js");












/**
 * Get a category slot as JSON
 */
function useCategorySlot(categoryId, slotId) {
  const {
    app: {
      commerceAPI
    }
  } = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_3__.getConfig)();
  const {
    parameters: {
      organizationId
    }
  } = commerceAPI;
  const appOrigin = (0,_salesforce_pwa_kit_react_sdk_utils_url__WEBPACK_IMPORTED_MODULE_7__.getAppOrigin)();
  const {
    site
  } = (0,_salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const {
    getTokenWhenReady
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_5__.useAccessToken)();
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.useQuery)({
    queryKey: ['custom', 'content-slots', 'category', categoryId, slotId],
    queryFn: function () {
      var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const urlParams = new URLSearchParams();
        urlParams.append('siteId', site.id);
        const token = yield getTokenWhenReady();
        const response = yield fetch(`${appOrigin}/${commerceAPI.proxyPath.replace(/^\/|\/$/g, '')}/custom/content-slots/v1/organizations/${organizationId}/category/${categoryId}/${slotId}?${urlParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          //throw new Error(`Could not load slot: ${response.status}`)
          // be safe
          return [];
        }
        return yield response.json();
      });
      return function queryFn() {
        return _ref.apply(this, arguments);
      };
    }(),
    enabled: !!(categoryId && slotId)
  });
}

/**
 * Render the category header slot if it contains JSX content
 *
 * Uses the jsxToReact helper from Page Designer impl to render the JSX content
 */
function CategoryHeaderSlot({
  categoryId
}) {
  var _slotData$slot;
  const {
    data: slotData,
    isSuccess
  } = useCategorySlot(categoryId, 'pwa-category-header');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, isSuccess ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, slotData === null || slotData === void 0 ? void 0 : (_slotData$slot = slotData.slot) === null || _slotData$slot === void 0 ? void 0 : _slotData$slot.filter(Boolean).map((slot, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", {
      key: index
    }, slot.jsx ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("div", null, (0,_salesforce_retail_react_app_app_components_page_designer_headless_helpers__WEBPACK_IMPORTED_MODULE_6__.jsxToReact)(slot.jsx, {})) : null);
  })) : null);
}
CategoryHeaderSlot.propTypes = {
  categoryId: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string).isRequired
};
const AbovePageHeader = () => {
  const params = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useParams)();
  const categoryId = params.categoryId;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(CategoryHeaderSlot, {
    categoryId: categoryId
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_pages_product_list_partials_above_page_header__WEBPACK_IMPORTED_MODULE_1__["default"], null));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbovePageHeader);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-product-list.js.map