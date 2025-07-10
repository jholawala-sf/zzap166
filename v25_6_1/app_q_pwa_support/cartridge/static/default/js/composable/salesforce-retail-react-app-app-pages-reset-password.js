"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-reset-password"],{

/***/ "./app/components/forms/useUpdatePasswordFields.jsx":
/*!**********************************************************!*\
  !*** ./app/components/forms/useUpdatePasswordFields.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useUpdatePasswordFields)
/* harmony export */ });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_password_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/password-utils */ "./app/utils/password-utils.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


function useUpdatePasswordFields({
  form: {
    control,
    formState: {
      errors
    },
    getValues
  },
  prefix = ''
}) {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const fields = {
    currentPassword: {
      name: `${prefix}currentPassword`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Current Password"
        }],
        id: "use_update_password_fields.label.current_password"
      }),
      defaultValue: '',
      type: 'password',
      autoComplete: 'current-password',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your password."
          }],
          id: "use_update_password_fields.error.required_password"
        })
      },
      error: errors[`${prefix}currentPassword`],
      control
    },
    password: {
      name: `${prefix}password`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "New Password"
        }],
        id: "use_update_password_fields.label.new_password"
      }),
      type: 'password',
      autoComplete: 'new-password',
      defaultValue: '',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please provide a new password."
          }],
          id: "use_update_password_fields.error.required_new_password"
        }),
        validate: {
          hasMinChars: val => (0,_salesforce_retail_react_app_app_utils_password_utils__WEBPACK_IMPORTED_MODULE_0__.validatePassword)(val).hasMinChars || formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Password must contain at least 8 characters."
            }],
            id: "use_update_password_fields.error.minimum_characters"
          }),
          hasUppercase: val => (0,_salesforce_retail_react_app_app_utils_password_utils__WEBPACK_IMPORTED_MODULE_0__.validatePassword)(val).hasUppercase || formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Password must contain at least one uppercase letter."
            }],
            id: "use_update_password_fields.error.uppercase_letter"
          }),
          hasLowercase: val => (0,_salesforce_retail_react_app_app_utils_password_utils__WEBPACK_IMPORTED_MODULE_0__.validatePassword)(val).hasLowercase || formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Password must contain at least one lowercase letter."
            }],
            id: "use_update_password_fields.error.lowercase_letter"
          }),
          hasNumber: val => (0,_salesforce_retail_react_app_app_utils_password_utils__WEBPACK_IMPORTED_MODULE_0__.validatePassword)(val).hasNumber || formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Password must contain at least one number."
            }],
            id: "use_update_password_fields.error.contain_number"
          }),
          hasSpecialChar: val => (0,_salesforce_retail_react_app_app_utils_password_utils__WEBPACK_IMPORTED_MODULE_0__.validatePassword)(val).hasSpecialChar || formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Password must contain at least one special character."
            }],
            id: "use_update_password_fields.error.special_character"
          })
        }
      },
      error: errors[`${prefix}password`],
      control
    },
    confirmPassword: {
      name: `${prefix}confirmPassword`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Confirm New Password"
        }],
        id: "use_update_password_fields.label.confirm_new_password"
      }),
      type: 'password',
      autoComplete: 'new-password',
      defaultValue: '',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please confirm your password."
          }],
          id: "use_update_password_fields.error.required_confirm_password"
        }),
        validate: {
          matches: val => val === getValues(`${prefix}password`) || formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Passwords do not match."
            }],
            id: "use_update_password_fields.error.password_mismatch"
          })
        }
      },
      error: errors[`${prefix}confirmPassword`],
      control
    }
  };
  return fields;
}

/***/ }),

/***/ "./app/pages/reset-password/index.jsx":
/*!********************************************!*\
  !*** ./app/pages/reset-password/index.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_reset_password__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/reset-password */ "./app/components/reset-password/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_reset_password_reset_password_landing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/reset-password/reset-password-landing */ "./app/pages/reset-password/reset-password-landing.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-datacloud */ "./app/hooks/use-datacloud.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_password_reset__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-password-reset */ "./app/hooks/use-password-reset.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
















const ResetPassword = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_11__["default"])();
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_12__.useForm)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const dataCloud = (0,_salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const {
    pathname
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_13__.useLocation)();
  const {
    path
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_13__.useRouteMatch)();
  const {
    getPasswordResetToken
  } = (0,_salesforce_retail_react_app_app_hooks_use_password_reset__WEBPACK_IMPORTED_MODULE_9__.usePasswordReset)();
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
      email
    }) {
      try {
        yield getPasswordResetToken(email);
      } catch (e) {
        var _e$response;
        const message = ((_e$response = e.response) === null || _e$response === void 0 ? void 0 : _e$response.status) === 400 ? formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_10__.FEATURE_UNAVAILABLE_ERROR_MESSAGE) : formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_10__.API_ERROR_MESSAGE);
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

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    einstein.sendViewPage(pathname);
    dataCloud.sendViewPage(pathname);
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": "reset-password-page",
    bg: "gray.50",
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Reset password",
    description: "Reset customer password"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    paddingTop: 16,
    width: ['100%', '407px'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, path === _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_10__.RESET_PASSWORD_LANDING_PATH ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_reset_password_reset_password_landing__WEBPACK_IMPORTED_MODULE_5__["default"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_reset_password__WEBPACK_IMPORTED_MODULE_4__["default"], {
    form: form,
    submitForm: submitForm,
    clickSignIn: () => navigate('/login')
  })));
};
ResetPassword.getTemplateName = () => 'reset-password';
ResetPassword.propTypes = {
  match: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResetPassword);

/***/ }),

/***/ "./app/pages/reset-password/reset-password-landing.jsx":
/*!*************************************************************!*\
  !*** ./app/pages/reset-password/reset-password-landing.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_password_requirements__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/password-requirements */ "./app/components/forms/password-requirements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useUpdatePasswordFields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useUpdatePasswordFields */ "./app/components/forms/useUpdatePasswordFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_password_reset__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-password-reset */ "./app/hooks/use-password-reset.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */














const ResetPasswordLanding = () => {
  var _form$formState$error;
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useForm)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_11__["default"])();
  const {
    search
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_12__.useLocation)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const queryParams = new URLSearchParams(search);
  const email = decodeURIComponent(queryParams.get('email'));
  const token = decodeURIComponent(queryParams.get('token'));
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useUpdatePasswordFields__WEBPACK_IMPORTED_MODULE_6__["default"])({
    form
  });
  const password = form.watch('password');
  const {
    resetPassword
  } = (0,_salesforce_retail_react_app_app_hooks_use_password_reset__WEBPACK_IMPORTED_MODULE_7__.usePasswordReset)();
  const submit = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (values) {
      form.clearErrors();
      try {
        yield resetPassword({
          email,
          token,
          newPassword: values.password
        });
        navigate('/login');
      } catch (error) {
        var _error$response;
        const errorData = yield (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.json();
        const message = _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_9__.INVALID_TOKEN_ERROR.test(errorData.message) ? formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_9__.INVALID_TOKEN_ERROR_MESSAGE) : formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_9__.API_ERROR_MESSAGE);
        form.setError('global', {
          type: 'manual',
          message
        });
      }
    });
    return function submit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    justify: "center",
    align: "center",
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.BrandLogo, {
    width: "60px",
    height: "auto"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    align: "center",
    fontSize: "xl",
    fontWeight: "semibold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_13__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Reset Password"
    }],
    id: "reset_password_form.title.reset_password"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(submit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 6,
    paddingLeft: 4,
    paddingRight: 4
  }, ((_form$formState$error = form.formState.errors) === null || _form$formState$error === void 0 ? void 0 : _form$formState$error.global) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Alert, {
    "data-testid": "password-update-error",
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.AlertIcon, {
    color: "red.500",
    boxSize: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm",
    ml: 3
  }, form.formState.errors.global.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 3,
    pb: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_4__["default"], fields.password), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_4__["default"], fields.confirmPassword), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_forms_password_requirements__WEBPACK_IMPORTED_MODULE_5__["default"], {
    value: password
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    type: "submit",
    isLoading: form.formState.isSubmitting
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_13__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Reset Password"
    }],
    id: "reset_password_form.button.reset_password"
  }))))));
};
ResetPasswordLanding.getTemplateName = () => 'reset-password-landing';
ResetPasswordLanding.propTypes = {
  token: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResetPasswordLanding);

/***/ }),

/***/ "./app/hooks/use-password-reset.js":
/*!*****************************************!*\
  !*** ./app/hooks/use-password-reset.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePasswordReset: () => (/* binding */ usePasswordReset)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_app_origin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-app-origin */ "./app/hooks/use-app-origin.js");
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");
/* harmony import */ var _salesforce_retail_react_app_app_page_designer_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/page-designer/utils */ "./app/page-designer/utils.js");

/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







/**
 * This hook provides commerce-react-sdk hooks to simplify the reset password flow.
 */
const usePasswordReset = () => {
  var _config$app$login, _config$app$login$res;
  const showToast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_2__.useToast)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const appOrigin = (0,_salesforce_retail_react_app_app_hooks_use_app_origin__WEBPACK_IMPORTED_MODULE_3__.useAppOrigin)();
  const config = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_4__.getConfig)();
  const resetPasswordCallback = ((_config$app$login = config.app.login) === null || _config$app$login === void 0 ? void 0 : (_config$app$login$res = _config$app$login.resetPassword) === null || _config$app$login$res === void 0 ? void 0 : _config$app$login$res.callbackURI) || '/reset-password-callback';
  const callbackURI = (0,_salesforce_retail_react_app_app_page_designer_utils__WEBPACK_IMPORTED_MODULE_5__.isAbsoluteURL)(resetPasswordCallback) ? resetPasswordCallback : `${appOrigin}${resetPasswordCallback}`;
  const getPasswordResetTokenMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.AuthHelpers.GetPasswordResetToken);
  const resetPasswordMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_1__.AuthHelpers.ResetPassword);
  const getPasswordResetToken = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (email) {
      yield getPasswordResetTokenMutation.mutateAsync({
        user_id: email,
        callback_uri: callbackURI
      });
    });
    return function getPasswordResetToken(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const resetPassword = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
      email,
      token,
      newPassword
    }) {
      yield resetPasswordMutation.mutateAsync({
        user_id: email,
        pwd_action_token: token,
        new_password: newPassword
      }, {
        onSuccess: () => {
          showToast({
            title: formatMessage({
              defaultMessage: [{
                "type": 0,
                "value": "Password Reset Success"
              }],
              id: "password_reset_success.toast"
            }),
            status: 'success',
            position: 'bottom-right'
          });
        }
      });
    });
    return function resetPassword(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    getPasswordResetToken,
    resetPassword
  };
};

/***/ }),

/***/ "./app/page-designer/utils.js":
/*!************************************!*\
  !*** ./app/page-designer/utils.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAbsoluteURL: () => (/* binding */ isAbsoluteURL)
/* harmony export */ });
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
const isAbsoluteURL = url => /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-reset-password.js.map