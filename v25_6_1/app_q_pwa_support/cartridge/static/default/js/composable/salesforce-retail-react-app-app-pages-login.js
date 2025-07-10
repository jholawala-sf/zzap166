"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-login"],{

/***/ "./overlays/passwordless-login/app/pages/login/index.jsx":
/*!***************************************************************!*\
  !*** ./overlays/passwordless-login/app/pages/login/index.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_login__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/login */ "./overlays/passwordless-login/app/components/login/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_previous__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-previous */ "./app/hooks/use-previous.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */















const LOGIN_ERROR_MESSAGE = (0,react_intl__WEBPACK_IMPORTED_MODULE_11__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Incorrect username or password, please try again."
  }],
  id: "login_page.error.incorrect_username_or_password"
});
const Login = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_14__.useLocation)();
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const {
    isRegistered,
    customerType
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerType)();
  const login = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.AuthHelpers.LoginRegisteredUserB2C);
  const customerId = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerId)();
  const prevAuthType = (0,_salesforce_retail_react_app_app_hooks_use_previous__WEBPACK_IMPORTED_MODULE_9__.usePrevious)(customerType);
  const {
    data: baskets
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerBaskets)({
    parameters: {
      customerId
    }
  }, {
    enabled: !!customerId && !_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__.isServer,
    keepPreviousData: true
  });
  const mergeBasket = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useShopperBasketsMutation)('mergeBasket');
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
      try {
        var _baskets$baskets, _baskets$baskets$, _baskets$baskets$$pro;
        yield login.mutateAsync({
          username: data.email,
          password: data.password
        });
        const hasBasketItem = (baskets === null || baskets === void 0 ? void 0 : (_baskets$baskets = baskets.baskets) === null || _baskets$baskets === void 0 ? void 0 : (_baskets$baskets$ = _baskets$baskets[0]) === null || _baskets$baskets$ === void 0 ? void 0 : (_baskets$baskets$$pro = _baskets$baskets$.productItems) === null || _baskets$baskets$$pro === void 0 ? void 0 : _baskets$baskets$$pro.length) > 0;
        // we only want to merge basket when the user is logged in as a recurring user
        // only recurring users trigger the login mutation, new user triggers register mutation
        // this logic needs to stay in this block because this is the only place that tells if a user is a recurring user
        // if you change logic here, also change it in login page
        const shouldMergeBasket = hasBasketItem && prevAuthType === 'guest';
        if (shouldMergeBasket) {
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
        }
      } catch (error) {
        const message = /Unauthorized/i.test(error.message) ? formatMessage(LOGIN_ERROR_MESSAGE) : formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_8__.API_ERROR_MESSAGE);
        form.setError('global', {
          type: 'manual',
          message
        });
      }
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // If customer is registered push to account page
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isRegistered) {
      var _location$state;
      if (location !== null && location !== void 0 && (_location$state = location.state) !== null && _location$state !== void 0 && _location$state.directedFrom) {
        navigate(location.state.directedFrom);
      } else {
        navigate('/account');
      }
    }
  }, [isRegistered]);

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    einstein.sendViewPage(location.pathname);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": "login-page",
    bg: "gray.50",
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_5__["default"], {
    title: "Sign in",
    description: "Customer sign in"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    paddingTop: 16,
    width: ['100%', '407px'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_login__WEBPACK_IMPORTED_MODULE_7__["default"], {
    form: form,
    submitForm: submitForm,
    clickCreateAccount: () => navigate('/registration'),
    clickForgotPassword: () => navigate('/reset-password'),
    clickPasswordlessLogin: () => navigate('/passwordless-login')
  })));
};
Login.getTemplateName = () => 'login';
Login.propTypes = {
  match: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Login);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-login.js.map