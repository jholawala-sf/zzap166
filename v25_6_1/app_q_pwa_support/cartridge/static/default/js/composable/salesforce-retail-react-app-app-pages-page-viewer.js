"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-page-viewer"],{

/***/ "./app/pages/page-viewer/index.jsx":
/*!*****************************************!*\
  !*** ./app/pages/page-viewer/index.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../page-designer/layouts */ "./app/page-designer/layouts/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/commerce-sdk-react/components */ "./node_modules/@salesforce/commerce-sdk-react/components/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_page_designer_assets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/page-designer/assets */ "./app/page-designer/assets/index.js");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/errors */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js");









const PAGEDESIGNER_TO_COMPONENT = {
  'commerce_assets.photoTile': _salesforce_retail_react_app_app_page_designer_assets__WEBPACK_IMPORTED_MODULE_5__.ImageTile,
  'commerce_assets.imageAndText': _salesforce_retail_react_app_app_page_designer_assets__WEBPACK_IMPORTED_MODULE_5__.ImageWithText,
  'commerce_layouts.carousel': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.Carousel,
  'commerce_layouts.mobileGrid1r1c': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.MobileGrid1r1c,
  'commerce_layouts.mobileGrid2r1c': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.MobileGrid2r1c,
  'commerce_layouts.mobileGrid2r2c': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.MobileGrid2r2c,
  'commerce_layouts.mobileGrid2r3c': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.MobileGrid2r3c,
  'commerce_layouts.mobileGrid3r1c': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.MobileGrid3r1c,
  'commerce_layouts.mobileGrid3r2c': _page_designer_layouts__WEBPACK_IMPORTED_MODULE_0__.MobileGrid3r2c,
  'headless.einsteinAssisted': _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__
};
const PageViewer = () => {
  const {
    pageId
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useParams)();
  const {
    data: page,
    error
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.usePage)({
    parameters: {
      pageId
    }
  });
  if (error) {
    var _error$response, _error$response2;
    let ErrorClass = ((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 404 ? _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_6__.HTTPNotFound : _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_6__.HTTPError;
    throw new ErrorClass((_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.statusText);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    layerStyle: 'page'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_commerce_sdk_react_components__WEBPACK_IMPORTED_MODULE_4__.Page, {
    page: page,
    components: PAGEDESIGNER_TO_COMPONENT,
    jsxParserComponents: _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__
  }));
};
PageViewer.displayName = 'PageViewer';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageViewer);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-page-viewer.js.map