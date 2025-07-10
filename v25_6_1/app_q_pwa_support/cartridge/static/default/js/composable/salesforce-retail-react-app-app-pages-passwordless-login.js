"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-passwordless-login"],{

/***/ "./overlays/passwordless-login/app/pages/passwordless-login/index.jsx":
/*!****************************************************************************!*\
  !*** ./overlays/passwordless-login/app/pages/passwordless-login/index.jsx ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_passwordless_login__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/passwordless-login */ "./overlays/passwordless-login/app/components/passwordless-login/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_passwordless_token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/passwordless-token */ "./overlays/passwordless-login/app/components/passwordless-token/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-multi-site */ "./app/hooks/use-multi-site.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_previous__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-previous */ "./app/hooks/use-previous.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_passwordless_login_utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/passwordless-login-utils */ "./overlays/passwordless-login/app/utils/passwordless-login-utils.js");

/*
 * Copyright (c) 2024, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


















const PasswordlessLogin = () => {
  const {
    app
  } = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_4__.getConfig)();
  const authForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_14__.useForm)();
  const tokenForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_14__.useForm)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_15__["default"])();
  const [submittedEmail, setSubmittedEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [showSubmittedSuccess, setShowSubmittedSuccess] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [isTokenLoading, setIsTokenLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const {
    pathname
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_16__.useLocation)();
  const {
    site
  } = (0,_salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_10__["default"])();
  const {
    usid
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useUsid)();
  const {
    getTokenWhenReady
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useAccessToken)();
  const {
    isRegistered,
    customerType
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerType)();
  const enablePasswordlessLogin = (app === null || app === void 0 ? void 0 : app.enablePWAKitPrivateClient) || false;
  const pinInputMaxLength = 8;
  const customerId = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerId)();
  const prevAuthType = (0,_salesforce_retail_react_app_app_hooks_use_previous__WEBPACK_IMPORTED_MODULE_11__.usePrevious)(customerType);
  const {
    data: baskets
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerBaskets)({
    parameters: {
      customerId
    }
  }, {
    enabled: !!customerId && !_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_12__.isServer,
    keepPreviousData: true
  });
  const mergeBasket = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useShopperBasketsMutation)('mergeBasket');

  // If customer is registered push to account page
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isRegistered) {
      var _location, _location$state;
      if ((_location = location) !== null && _location !== void 0 && (_location$state = _location.state) !== null && _location$state !== void 0 && _location$state.directedFrom) {
        navigate(location.state.directedFrom);
      } else {
        navigate('/account');
      }
    }
  }, [isRegistered]);

  // if passwordless login is disabled, redirect to login page
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!enablePasswordlessLogin) {
      navigate('/login');
    }
  }, [enablePasswordlessLogin]);
  const auth = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return (0,_salesforce_retail_react_app_app_utils_passwordless_login_utils__WEBPACK_IMPORTED_MODULE_13__.getPasswordlessAuth)();
  }, []);
  const submitAuthForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
      email
    }) {
      const accessToken = yield getTokenWhenReady();
      const {
        error
      } = yield (0,_salesforce_retail_react_app_app_utils_passwordless_login_utils__WEBPACK_IMPORTED_MODULE_13__.authorizePasswordlessCustomer)({
        email,
        siteId: site.id,
        usid,
        accessToken
      });
      if (error) {
        authForm.setError('global', {
          type: 'manual',
          message: formatMessage(error)
        });
      } else {
        setSubmittedEmail(email);
        setShowSubmittedSuccess(!showSubmittedSuccess);
      }
    });
    return function submitAuthForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const submitTokenForm = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _baskets$baskets, _baskets$baskets$, _baskets$baskets$$pro;
      const hasBasketItem = (baskets === null || baskets === void 0 ? void 0 : (_baskets$baskets = baskets.baskets) === null || _baskets$baskets === void 0 ? void 0 : (_baskets$baskets$ = _baskets$baskets[0]) === null || _baskets$baskets$ === void 0 ? void 0 : (_baskets$baskets$$pro = _baskets$baskets$.productItems) === null || _baskets$baskets$$pro === void 0 ? void 0 : _baskets$baskets$$pro.length) > 0;
      const shouldMergeBasket = hasBasketItem && prevAuthType === 'guest';
      const {
        error
      } = yield (0,_salesforce_retail_react_app_app_utils_passwordless_login_utils__WEBPACK_IMPORTED_MODULE_13__.getPasswordlessAccessToken)({
        auth,
        token,
        shouldMergeBasket,
        mergeBasket
      });
      if (error) {
        tokenForm.setError('global', {
          type: 'manual',
          message: error.message
        });
      }
    });
    return function submitTokenForm() {
      return _ref2.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setIsTokenLoading(tokenForm.formState.isSubmitting);
  }, [tokenForm.formState.isSubmitting]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    function submitToken() {
      return _submitToken.apply(this, arguments);
    }
    function _submitToken() {
      _submitToken = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (token.length === pinInputMaxLength) {
          setIsTokenLoading(true);
          yield submitTokenForm();
          setIsTokenLoading(false);
        }
      });
      return _submitToken.apply(this, arguments);
    }
    submitToken();
  }, [token]);
  const handleTokenChange = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (value) {
      setToken(value);
    });
    return function handleTokenChange(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    einstein.sendViewPage(pathname);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": "reset-password-page",
    bg: "gray.50",
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: "Log in with email",
    description: "Log in with email"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    paddingTop: 16,
    width: ['100%', '407px'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, !showSubmittedSuccess ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_passwordless_login__WEBPACK_IMPORTED_MODULE_6__["default"], {
    form: authForm,
    submitForm: submitAuthForm,
    clickSignIn: () => navigate('/login')
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_passwordless_token__WEBPACK_IMPORTED_MODULE_7__["default"], {
    form: tokenForm,
    submitForm: submitTokenForm,
    handleTokenChange: handleTokenChange,
    pinInputMaxLength: pinInputMaxLength,
    isTokenLoading: isTokenLoading,
    token: token,
    clickSignIn: () => navigate('/login'),
    email: submittedEmail
  })));
};
PasswordlessLogin.getTemplateName = () => 'passwordless-login';
PasswordlessLogin.propTypes = {
  match: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PasswordlessLogin);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-passwordless-login.js.map