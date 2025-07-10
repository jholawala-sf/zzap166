"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-registration"],{

/***/ "./app/pages/registration/index.jsx":
/*!******************************************!*\
  !*** ./app/pages/registration/index.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_register__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/register */ "./app/components/register/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-datacloud */ "./app/hooks/use-datacloud.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */














const Registration = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_10__["default"])();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const {
    isRegistered
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useCustomerType)();
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_11__.useForm)();
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const dataCloud = (0,_salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const {
    pathname
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_12__.useLocation)();
  const register = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.AuthHelpers.Register);
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
      const body = {
        customer: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          login: data.email
        },
        password: data.password
      };
      try {
        yield register.mutateAsync(body, {});
      } catch (e) {
        form.setError('global', {
          type: 'manual',
          message: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_9__.API_ERROR_MESSAGE)
        });
      }
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (isRegistered) {
      navigate('/account');
    }
  }, [isRegistered]);

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    einstein.sendViewPage(pathname);
    dataCloud.sendViewPage(pathname);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": "registration-page",
    bg: "gray.50",
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_4__["default"], {
    title: "Registration",
    description: "Customer sign up"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    paddingTop: 16,
    width: ['100%', '407px'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_register__WEBPACK_IMPORTED_MODULE_5__["default"], {
    submitForm: submitForm,
    form: form,
    clickSignIn: () => navigate('/login')
  })));
};
Registration.getTemplateName = () => 'registration';
Registration.propTypes = {
  match: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Registration);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-registration.js.map