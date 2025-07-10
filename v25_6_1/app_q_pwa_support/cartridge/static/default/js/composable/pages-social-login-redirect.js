"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["pages-social-login-redirect"],{

/***/ "./app/pages/social-login-redirect/index.jsx":
/*!***************************************************!*\
  !*** ./app/pages/social-login-redirect/index.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_app_origin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-app-origin */ "./app/hooks/use-app-origin.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2024, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






// Hooks








const SocialLoginRedirect = () => {
  var _getConfig$app$login$;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_13__["default"])();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const [searchParams] = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_7__.useSearchParams)();
  const loginIDPUser = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.AuthHelpers.LoginIDPUser);
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_8__.useCurrentCustomer)();
  // Build redirectURI from config values
  const appOrigin = (0,_salesforce_retail_react_app_app_hooks_use_app_origin__WEBPACK_IMPORTED_MODULE_10__.useAppOrigin)();
  const redirectPath = ((_getConfig$app$login$ = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_9__.getConfig)().app.login.social) === null || _getConfig$app$login$ === void 0 ? void 0 : _getConfig$app$login$.redirectURI) || '';
  const redirectURI = (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_11__.buildRedirectURI)(appOrigin, redirectPath);
  const locatedFrom = (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_11__.getSessionJSONItem)('returnToPage');
  const mergeBasket = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutation)('mergeBasket');
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)('');

  // Runs after successful 3rd-party IDP authorization, processing query parameters
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!searchParams.code) {
      return;
    }
    const socialLogin = /*#__PURE__*/function () {
      var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
        try {
          yield loginIDPUser.mutateAsync(_objectSpread({
            code: searchParams.code,
            redirectURI: redirectURI
          }, searchParams.usid && {
            usid: searchParams.usid
          }));
        } catch (error) {
          const message = formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_12__.API_ERROR_MESSAGE);
          setError(message);
        }
      });
      return function socialLogin() {
        return _ref.apply(this, arguments);
      };
    }();
    socialLogin();
  }, []);

  // If customer is registered, push to secure account page
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!(customer !== null && customer !== void 0 && customer.isRegistered)) {
      return;
    }
    (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_11__.clearSessionJSONItem)('returnToPage');
    mergeBasket.mutate({
      headers: {
        // This is not required since the request has no body
        // but CommerceAPI throws a '419 - Unsupported Media Type' error if this header is removed.
        'Content-Type': 'application/json'
      },
      parameters: {
        createDestinationBasket: true
      }
    });
    if (locatedFrom) {
      navigate(locatedFrom);
    } else {
      navigate('/account');
    }
  }, [customer === null || customer === void 0 ? void 0 : customer.isRegistered]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    "data-testid": "login-redirect-page",
    bg: "gray.50",
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    paddingTop: 16,
    width: ['100%', '407px'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Alert, {
    status: "error",
    marginBottom: 8
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.AlertIcon, {
    color: "red.500",
    boxSize: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: "sm",
    ml: 3
  }, error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    justify: "center",
    align: "center",
    spacing: 8,
    marginBottom: 8
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Spinner, {
    opacity: 0.85,
    color: "blue.600",
    animationDuration: "0.8s",
    size: "lg"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    align: "center",
    fontSize: "xl",
    fontWeight: "semibold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    id: "social_login_redirect.message.authenticating",
    defaultMessage: [{
      "type": 0,
      "value": "Authenticating..."
    }]
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    align: "center",
    fontSize: "m"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    id: "social_login_redirect.message.redirect_link",
    defaultMessage: [{
      "type": 0,
      "value": "If you are not automatically redirected, click "
    }, {
      "type": 8,
      "value": "link",
      "children": [{
        "type": 0,
        "value": "this link"
      }]
    }, {
      "type": 0,
      "value": " to proceed."
    }],
    values: {
      link: chunks => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("a", {
        href: "/account",
        style: {
          color: '#0176D3',
          textDecoration: 'underline'
        }
      }, chunks)
    }
  })))));
};
SocialLoginRedirect.getTemplateName = () => 'social-login-redirect';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialLoginRedirect);

/***/ })

}]);
//# sourceMappingURL=pages-social-login-redirect.js.map