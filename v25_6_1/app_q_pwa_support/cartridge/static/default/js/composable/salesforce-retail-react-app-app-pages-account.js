"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-account"],{

/***/ "./app/components/forms/profile-fields.jsx":
/*!*************************************************!*\
  !*** ./app/components/forms/profile-fields.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useProfileFields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useProfileFields */ "./app/components/forms/useProfileFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const ProfileFields = ({
  form,
  prefix = ''
}) => {
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useProfileFields__WEBPACK_IMPORTED_MODULE_2__["default"])({
    form,
    prefix
  });
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const formTitleAriaLabel = (0,react_intl__WEBPACK_IMPORTED_MODULE_5__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Profile Form"
    }],
    id: "profile_fields.label.profile_form"
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 5,
    "aria-label": intl.formatMessage(formTitleAriaLabel)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.SimpleGrid, {
    columns: [1, 1, 1, 2],
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.firstName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.lastName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.phone));
};
ProfileFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProfileFields);

/***/ }),

/***/ "./app/components/forms/update-password-fields.jsx":
/*!*********************************************************!*\
  !*** ./app/components/forms/update-password-fields.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useUpdatePasswordFields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useUpdatePasswordFields */ "./app/components/forms/useUpdatePasswordFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_password_requirements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/password-requirements */ "./app/components/forms/password-requirements.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







const UpdatePasswordFields = ({
  form,
  prefix = ''
}) => {
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useUpdatePasswordFields__WEBPACK_IMPORTED_MODULE_2__["default"])({
    form,
    prefix
  });
  const password = form.watch('password');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 5,
    divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.StackDivider, {
      borderColor: "gray.100"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.currentPassword), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "link",
    size: "sm",
    onClick: () => null
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Forgot Password?"
    }],
    id: "update_password_fields.button.forgot_password"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 3,
    pb: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.password), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.confirmPassword), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_forms_password_requirements__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: password
  })));
};
UpdatePasswordFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UpdatePasswordFields);

/***/ }),

/***/ "./app/components/forms/useProfileFields.jsx":
/*!***************************************************!*\
  !*** ./app/components/forms/useProfileFields.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useProfileFields)
/* harmony export */ });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_phone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/phone-utils */ "./app/utils/phone-utils.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


function useProfileFields({
  form: {
    control,
    formState: {
      errors
    }
  },
  prefix = ''
}) {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const fields = {
    firstName: {
      name: `${prefix}firstName`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "First Name"
        }],
        id: "use_profile_fields.label.first_name"
      }),
      type: 'text',
      autoComplete: 'given-name',
      defaultValue: '',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your first name."
          }],
          id: "use_profile_fields.error.required_first_name"
        })
      },
      error: errors[`${prefix}firstName`],
      control
    },
    lastName: {
      name: `${prefix}lastName`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Last Name"
        }],
        id: "use_profile_fields.label.last_name"
      }),
      type: 'text',
      defaultValue: '',
      autoComplete: 'family-name',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your last name."
          }],
          id: "use_profile_fields.error.required_last_name"
        })
      },
      error: errors[`${prefix}lastName`],
      control
    },
    email: {
      name: `${prefix}email`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Email"
        }],
        id: "use_profile_fields.label.email"
      }),
      placeholder: 'you@email.com',
      type: 'email',
      defaultValue: '',
      autoComplete: 'email',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter a valid email address."
          }],
          id: "use_profile_fields.error.required_email"
        })
      },
      error: errors[`${prefix}email`],
      control
    },
    phone: {
      name: `${prefix}phone`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Phone Number"
        }],
        id: "use_profile_fields.label.phone"
      }),
      defaultValue: '',
      type: 'tel',
      autoComplete: 'tel',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your phone number."
          }],
          id: "use_profile_fields.error.required_phone"
        })
      },
      error: errors[`${prefix}phone`],
      inputProps: ({
        onChange
      }) => ({
        inputMode: 'numeric',
        onChange(evt) {
          onChange((0,_salesforce_retail_react_app_app_utils_phone_utils__WEBPACK_IMPORTED_MODULE_0__.formatPhoneNumber)(evt.target.value));
        }
      }),
      control
    }
  };
  return fields;
}

/***/ }),

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

/***/ "./app/pages/account/addresses.jsx":
/*!*****************************************!*\
  !*** ./app/pages/account/addresses.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/form-action-buttons */ "./app/components/forms/form-action-buttons.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_action_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/action-card */ "./app/components/action-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_address_fields__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/address-fields */ "./app/components/forms/address-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/address-display */ "./app/components/address-display/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_action_placeholder__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-action-placeholder */ "./app/components/page-action-placeholder/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


















const DEFAULT_SKELETON_COUNT = 3;
const BoxArrow = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    width: 3,
    height: 3,
    borderLeft: "1px solid",
    borderTop: "1px solid",
    borderColor: "blue.600",
    position: "absolute",
    left: "50%",
    bottom: "-23px",
    zIndex: 1,
    background: "white",
    transform: "rotate(45deg)"
  });
};
const ShippingAddressForm = ({
  form,
  hasAddresses,
  selectedAddressId,
  toggleEdit,
  submitForm
}) => {
  var _form$formState$error;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "base",
    position: "relative"
  }, hasAddresses && {
    gridColumn: [1, 'span 2', 'span 2', 'span 2', 'span 3'],
    paddingX: [4, 4, 6],
    paddingY: 6,
    rounded: 'base',
    border: '1px solid',
    borderColor: 'blue.600'
  }), form.formState.isSubmitting && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 6,
    padding: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    as: "h3",
    size: "sm"
  }, selectedAddressId ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Edit Address"
    }],
    id: "shipping_address_form.heading.edit_address"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Add New Address"
    }],
    id: "shipping_address_form.heading.new_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("form", {
    onSubmit: form.handleSubmit(submitForm)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 6
  }, ((_form$formState$error = form.formState.errors) === null || _form$formState$error === void 0 ? void 0 : _form$formState$error.global) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Alert, {
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertIcon, {
    color: "red.600",
    boxSize: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    ml: 3
  }, form.formState.errors.global.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_forms_address_fields__WEBPACK_IMPORTED_MODULE_10__["default"], {
    form: form
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_5__["default"], {
    onCancel: toggleEdit
  })))))));
};
ShippingAddressForm.propTypes = {
  form: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().object),
  hasAddresses: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().bool),
  selectedAddressId: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().string),
  toggleEdit: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func),
  submitForm: (prop_types__WEBPACK_IMPORTED_MODULE_17___default().func)
};
const successfullyAddedAddress = (0,react_intl__WEBPACK_IMPORTED_MODULE_18__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "New address saved"
  }],
  id: "account_addresses.info.new_address_saved"
});
const successfullyUpdatedAddress = (0,react_intl__WEBPACK_IMPORTED_MODULE_18__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Address updated"
  }],
  id: "account_addresses.info.address_updated"
});
const successfullyRemovedAddress = (0,react_intl__WEBPACK_IMPORTED_MODULE_18__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Address removed"
  }],
  id: "account_addresses.info.address_removed"
});
const AccountAddresses = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_19__["default"])();
  const {
    data: customer,
    isLoading
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_13__.useCurrentCustomer)();
  const {
    isRegistered,
    addresses,
    customerId
  } = customer;
  const addCustomerAddress = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_14__.useShopperCustomersMutation)('createCustomerAddress');
  const updateSavedAddress = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_14__.useShopperCustomersMutation)('updateCustomerAddress');
  const removeCustomerAddress = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_14__.useShopperCustomersMutation)('removeCustomerAddress');
  const [isEditing, setIsEditing] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [selectedAddressId, setSelectedAddressId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const showToast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_6__.useToast)();
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_20__.useForm)();
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    var _headingRef$current;
    // Focus the 'Addresses' header when the component mounts for accessibility
    headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current = headingRef.current) === null || _headingRef$current === void 0 ? void 0 : _headingRef$current.focus();
  }, []);

  // keep track of the edit buttons so we can focus on them later for accessibility
  const [editBtnRefs, setEditBtnRefs] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const currentRefs = {};
    addresses === null || addresses === void 0 ? void 0 : addresses.forEach(({
      addressId
    }) => {
      currentRefs[addressId] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createRef();
    });
    setEditBtnRefs(currentRefs);
  }, [addresses]);
  const hasAddresses = (addresses === null || addresses === void 0 ? void 0 : addresses.length) > 0;
  const showError = () => {
    showToast({
      title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_15__.API_ERROR_MESSAGE),
      status: 'error'
    });
  };
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (address) {
      try {
        let data;
        form.clearErrors();
        if (selectedAddressId) {
          const body = _objectSpread(_objectSpread({}, address), {}, {
            addressId: selectedAddressId
          });
          data = yield updateSavedAddress.mutateAsync({
            body,
            parameters: {
              customerId,
              addressName: selectedAddressId
            }
          });
        } else {
          const body = _objectSpread({
            addressId: (0,nanoid__WEBPACK_IMPORTED_MODULE_21__.nanoid)()
          }, address);
          data = yield addCustomerAddress.mutateAsync({
            body,
            parameters: {
              customerId: customer.customerId
            }
          });
        }
        if (data) {
          toggleEdit();
          showToast({
            title: selectedAddressId ? formatMessage(successfullyUpdatedAddress) : formatMessage(successfullyAddedAddress),
            status: 'success',
            isClosable: true
          });
        }
      } catch (error) {
        form.setError('global', {
          type: 'manual',
          message: error.message
        });
      }
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const removeAddress = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (addressId) {
      try {
        if (addressId === selectedAddressId) {
          setSelectedAddressId(undefined);
          setIsEditing(false);
          form.reset({
            addressId: ''
          });
        }
        yield removeCustomerAddress.mutateAsync({
          parameters: {
            customerId,
            addressName: addressId
          }
        }, {
          onSuccess: () => {
            var _headingRef$current2;
            showToast({
              title: formatMessage(successfullyRemovedAddress),
              status: 'success',
              isClosable: true
            });
            // Move focus to header after we successfully remove address
            headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current2 = headingRef.current) === null || _headingRef$current2 === void 0 ? void 0 : _headingRef$current2.focus();
          }
        });
      } catch (error) {
        showError();
        throw error;
      }
    });
    return function removeAddress(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  const toggleEdit = address => {
    form.reset(_objectSpread({}, address));
    if (address !== null && address !== void 0 && address.addressId) {
      setSelectedAddressId(address.addressId);
      setIsEditing(true);
    } else {
      var _editBtnRefs$selected;
      // Focus on the edit button that opened the form when the form closes
      // otherwise focus on the heading if we can't find the button
      const focusAfterClose = ((_editBtnRefs$selected = editBtnRefs[selectedAddressId]) === null || _editBtnRefs$selected === void 0 ? void 0 : _editBtnRefs$selected.current) ?? (headingRef === null || headingRef === void 0 ? void 0 : headingRef.current);
      focusAfterClose === null || focusAfterClose === void 0 ? void 0 : focusAfterClose.focus();
      setSelectedAddressId(undefined);
      setIsEditing(!isEditing);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 4,
    "data-testid": "account-addresses-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    as: "h1",
    fontSize: "2xl",
    tabIndex: "0",
    ref: headingRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Addresses"
    }],
    id: "account_addresses.title.addresses"
  })), isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.SimpleGrid, {
    columns: [1, 2, 2, 2, 3],
    spacing: 4
  }, new Array(DEFAULT_SKELETON_COUNT).fill().map((_, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_action_card__WEBPACK_IMPORTED_MODULE_9__["default"], {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
      spacing: 2,
      marginBottom: 7
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Skeleton, {
      height: "23px",
      width: "120px"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Skeleton, {
      height: "23px",
      width: "84px"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Skeleton, {
      height: "23px",
      width: "104px"
    })));
  })), hasAddresses && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.SimpleGrid, {
    columns: [1, 2, 2, 2, 3],
    spacing: 4,
    gridAutoFlow: "row dense"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "outline",
    border: "1px dashed",
    borderColor: "gray.200",
    color: "blue.600",
    height: {
      lg: 'full'
    },
    minHeight: 11,
    rounded: "base",
    fontWeight: "medium",
    leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.PlusIcon, {
      display: "block",
      boxSize: '15px'
    }),
    onClick: () => toggleEdit()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Add Address"
    }],
    id: "account_addresses.button.add_address"
  }), isEditing && !selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(BoxArrow, null)), isEditing && !selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(ShippingAddressForm, {
    form: form,
    hasAddresses: hasAddresses,
    submitForm: submitForm,
    selectedAddressId: selectedAddressId,
    toggleEdit: toggleEdit
  })), addresses.map(address => {
    const editLabel = formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Edit "
      }, {
        "type": 1,
        "value": "address"
      }],
      id: "shipping_address.label.edit_button"
    }, {
      address: address.address1
    });
    const removeLabel = formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Remove "
      }, {
        "type": 1,
        "value": "address"
      }],
      id: "shipping_address.label.remove_button"
    }, {
      address: address.address1
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), {
      key: address.addressId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_action_card__WEBPACK_IMPORTED_MODULE_9__["default"], {
      borderColor: "gray.200",
      key: address.addressId,
      editBtnRef: editBtnRefs[address.addressId],
      onRemove: () => removeAddress(address.addressId),
      onEdit: () => toggleEdit(address),
      editBtnLabel: editLabel,
      removeBtnLabel: removeLabel
    }, address.preferred && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Badge, {
      position: "absolute",
      fontSize: "xs",
      right: 4,
      variant: "solid",
      bg: "gray.100",
      color: "gray.900"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Default"
      }],
      id: "account_addresses.badge.default"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_11__["default"], {
      address: address
    }), isEditing && address.addressId === selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(BoxArrow, null)), isEditing && address.addressId === selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(ShippingAddressForm, {
      form: form,
      hasAddresses: hasAddresses,
      submitForm: submitForm,
      selectedAddressId: selectedAddressId,
      toggleEdit: toggleEdit
    }));
  })), !hasAddresses && !isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, !isEditing && isRegistered && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_page_action_placeholder__WEBPACK_IMPORTED_MODULE_12__["default"], {
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.LocationIcon, {
      boxSize: 8
    }),
    heading: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "No Saved Addresses"
      }],
      id: "account_addresses.page_action_placeholder.heading.no_saved_addresses"
    }),
    text: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Add a new address method for faster checkout."
      }],
      id: "account_addresses.page_action_placeholder.message.add_new_address"
    }),
    buttonText: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Add Address"
      }],
      id: "account_addresses.page_action_placeholder.button.add_address"
    }),
    onButtonClick: () => toggleEdit()
  }), isEditing && !selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(ShippingAddressForm, {
    form: form,
    hasAddresses: hasAddresses,
    submitForm: submitForm,
    selectedAddressId: selectedAddressId,
    toggleEdit: toggleEdit
  })));
};
AccountAddresses.getTemplateName = () => 'account-addresses';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountAddresses);

/***/ }),

/***/ "./app/pages/account/index.jsx":
/*!*************************************!*\
  !*** ./app/pages/account/index.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_profile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/profile */ "./app/pages/account/profile.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_addresses__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/addresses */ "./app/pages/account/addresses.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_orders__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/orders */ "./app/pages/account/orders.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_wishlist_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/wishlist/index */ "./app/pages/account/wishlist/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/constant */ "./app/pages/account/constant.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-multi-site */ "./app/hooks/use-multi-site.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-datacloud */ "./app/hooks/use-datacloud.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */























const onClient = typeof window !== 'undefined';
const LogoutButton = ({
  onClick
}) => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_19__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Divider, {
    colorScheme: 'gray',
    marginTop: 3
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    fontWeight: "500",
    onClick: onClick,
    padding: 4,
    py: 0,
    variant: "unstyled",
    _hover: {
      background: 'gray.50'
    },
    marginTop: 1,
    borderRadius: "4px",
    cursor: 'pointer',
    height: 11
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    justify: {
      base: 'center',
      lg: 'flex-start'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__.SignoutIcon, {
    boxSize: 5,
    mr: 2,
    "aria-hidden": true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    as: "span",
    fontSize: ['md', 'md', 'md', 'sm'],
    fontWeight: "normal"
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Log Out"
    }],
    id: "account.logout_button.button.log_out"
  })))));
};
LogoutButton.propTypes = {
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func).isRequired
};
const Account = () => {
  const {
    path
  } = (0,react_router__WEBPACK_IMPORTED_MODULE_21__.useRouteMatch)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_19__["default"])();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_17__.useCurrentCustomer)();
  const {
    isRegistered,
    customerType
  } = customer;
  const logout = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_16__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_16__.AuthHelpers.Logout);
  const location = (0,react_router__WEBPACK_IMPORTED_MODULE_21__.useLocation)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_11__["default"])();
  const [mobileNavIndex, setMobileNavIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(-1);
  const [showLoading, setShowLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_14__["default"])();
  const dataCloud = (0,_salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_15__["default"])();
  const {
    buildUrl
  } = (0,_salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_13__["default"])();
  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    einstein.sendViewPage(location.pathname);
    dataCloud.sendViewPage(location.pathname);
  }, [location]);
  const onSignoutClick = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      setShowLoading(true);
      yield logout.mutateAsync();
      navigate('/login');
    });
    return function onSignoutClick() {
      return _ref.apply(this, arguments);
    };
  }();

  // If we have customer data and they are not registered, push to login page
  // Using Redirect allows us to store the directed page to location
  // so we can direct users back after they are successfully log in
  if (customerType !== null && !isRegistered && onClient) {
    const path = buildUrl('/login');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_21__.Redirect, {
      to: {
        pathname: path,
        state: {
          directedFrom: '/account'
        }
      }
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": isRegistered && (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_18__.isHydrated)() ? 'account-page' : 'account-page-skeleton',
    layerStyle: "page",
    paddingTop: [4, 4, 12, 12, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "My Account",
    description: "Customer Account Page"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Grid, {
    templateColumns: {
      base: '1fr',
      lg: '320px 1fr'
    },
    gap: {
      base: 10,
      lg: 24
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
    display: {
      base: 'block',
      lg: 'none'
    },
    allowToggle: true,
    reduceMotion: true,
    index: mobileNavIndex,
    onChange: setMobileNavIndex
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AccordionItem, {
    border: "none",
    background: "gray.50",
    borderRadius: "base"
  }, ({
    isExpanded
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AccordionButton, {
    as: _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button,
    height: 16,
    paddingLeft: 8,
    variant: "ghost",
    color: "black",
    _active: {
      background: 'gray.100'
    },
    _expanded: {
      background: 'transparent'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    align: "center",
    justify: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h2",
    fontSize: "16px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "My Account"
    }],
    id: "account.accordion.button.my_account"
  })), isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__.ChevronUpIcon, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__.ChevronDownIcon, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AccordionPanel, {
    px: 4,
    paddingBottom: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    as: "nav",
    spacing: 0,
    direction: "column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 0,
    as: "ul",
    "data-testid": "account-nav"
  }, _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_10__.navLinks.map(link => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    align: "center",
    key: link.name,
    as: "li",
    listStyleType: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_4__["default"],
    to: `/account${link.path}`,
    useNavLink: true,
    variant: "menu-link-mobile",
    justifyContent: "center",
    fontSize: "md",
    fontWeight: "normal",
    width: "100%",
    onClick: () => setMobileNavIndex(-1)
  }, formatMessage(_salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_10__.messages[link.name])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LogoutButton, {
    justify: "center",
    onClick: onSignoutClick
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    display: {
      base: 'none',
      lg: 'flex'
    },
    spacing: 4
  }, showLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_12__["default"], {
    wrapperStyles: {
      height: '100vh'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h2",
    fontSize: "18px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "My Account"
    }],
    id: "account.heading.my_account"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    spacing: 0,
    as: "nav",
    "data-testid": "account-detail-nav",
    direction: "column"
  }, _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_10__.navLinks.map(link => {
    const LinkIcon = link.icon;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
      key: link.name,
      as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_4__["default"],
      to: `/account${link.path}`,
      useNavLink: true,
      variant: "menu-link",
      leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LinkIcon, {
        boxSize: 5
      })
    }, formatMessage(_salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_10__.messages[link.name]));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(LogoutButton, {
    onClick: onSignoutClick
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_21__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_21__.Route, {
    exact: true,
    path: path
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_account_profile__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_21__.Route, {
    exact: true,
    path: `${path}/wishlist`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_account_wishlist_index__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_21__.Route, {
    exact: true,
    path: `${path}/addresses`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_account_addresses__WEBPACK_IMPORTED_MODULE_7__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_21__.Route, {
    path: `${path}/orders`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_account_orders__WEBPACK_IMPORTED_MODULE_8__["default"], null)))));
};
Account.getTemplateName = () => 'account';
Account.propTypes = {
  match: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Account);

/***/ }),

/***/ "./app/pages/account/order-detail.jsx":
/*!********************************************!*\
  !*** ./app/pages/account/order-detail.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/cc-utils */ "./app/utils/cc-utils.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/order-summary */ "./app/components/order-summary/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-image */ "./app/components/item-variant/item-image.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-name */ "./app/components/item-variant/item-name.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-attributes */ "./app/components/item-variant/item-attributes.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-price */ "./app/components/item-variant/item-price.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_13__);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
















const onClient = typeof window !== 'undefined';
const OrderProducts = ({
  productItems,
  currency
}) => {
  const orderProductIds = productItems.map(product => product.productId);
  const {
    data: products,
    isLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useProducts)({
    parameters: {
      ids: orderProductIds
    }
  }, {
    enabled: !!orderProductIds && onClient,
    select: result => {
      var _result$data;
      return result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.reduce((result, item) => {
        const key = item.id;
        result[key] = item;
        return result;
      }, {});
    }
  });
  const variants = productItems === null || productItems === void 0 ? void 0 : productItems.map(item => {
    const product = products === null || products === void 0 ? void 0 : products[item.productId];
    return _objectSpread(_objectSpread({}, product ? product : {}), {}, {
      isProductUnavailable: !product
    }, item);
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, !isLoading && (variants === null || variants === void 0 ? void 0 : variants.map((variant, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
      p: [4, 6],
      key: index,
      border: "1px solid",
      borderColor: "gray.100",
      borderRadius: "base"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_8__["default"], {
      variant: variant,
      currency: currency
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
      width: "full",
      alignItems: "flex-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_9__["default"], {
      width: ['88px', 36],
      mr: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
      spacing: 1,
      marginTop: "-3px",
      flex: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_10__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
      width: "full",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_11__["default"], {
      includeQuantity: true,
      currency: currency
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_12__["default"], {
      currency: currency
    }))))));
  })));
};
OrderProducts.propTypes = {
  productItems: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().array).isRequired,
  currency: (prop_types__WEBPACK_IMPORTED_MODULE_13___default().string)
};
const AccountOrderDetail = () => {
  var _order$paymentInstrum;
  const {
    params
  } = (0,react_router__WEBPACK_IMPORTED_MODULE_14__.useRouteMatch)();
  const history = (0,react_router__WEBPACK_IMPORTED_MODULE_14__.useHistory)();
  const {
    formatMessage,
    formatDate
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_15__["default"])();
  const {
    data: order,
    isLoading: isOrderLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useOrder)({
    parameters: {
      orderNo: params.orderNo
    }
  }, {
    enabled: onClient && !!params.orderNo
  });
  const isLoading = isOrderLoading || !order;
  const shipment = order === null || order === void 0 ? void 0 : order.shipments[0];
  const {
    shippingAddress,
    shippingMethod,
    shippingStatus,
    trackingNumber
  } = shipment || {};
  const paymentCard = order === null || order === void 0 ? void 0 : (_order$paymentInstrum = order.paymentInstruments[0]) === null || _order$paymentInstrum === void 0 ? void 0 : _order$paymentInstrum.paymentCard;
  const CardIcon = (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_3__.getCreditCardIcon)(paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.cardType);
  const itemCount = (order === null || order === void 0 ? void 0 : order.productItems.reduce((count, item) => item.quantity + count, 0)) || 0;
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _headingRef$current;
    // Focus the 'Order Details' header when the component mounts for accessibility
    headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current = headingRef.current) === null || _headingRef$current === void 0 ? void 0 : _headingRef$current.focus();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 6,
    "data-testid": "account-order-details-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_5__["default"],
    to: '/account/orders',
    variant: "link",
    leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_6__.ChevronLeftIcon, null),
    size: "sm",
    onClick: e => {
      if (history.action === 'PUSH') {
        e.preventDefault();
        history.goBack();
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Back to Order History"
    }],
    id: "account_order_detail.link.back_to_history"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: [1, 2]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h1",
    fontSize: ['lg', '2xl'],
    tabIndex: "0",
    ref: headingRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Details"
    }],
    id: "account_order_detail.title.order_details"
  })), !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    direction: ['column', 'row'],
    alignItems: ['flex-start', 'center'],
    spacing: [0, 3],
    divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Divider, {
      visibility: {
        base: 'visible'
      },
      orientation: "vertical",
      h: [0, 4]
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: ['sm', 'md']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Ordered: "
    }, {
      "type": 1,
      "value": "date"
    }],
    id: "account_order_detail.label.ordered_date",
    values: {
      date: formatDate(new Date(order.creationDate), {
        year: 'numeric',
        day: 'numeric',
        month: 'short'
      })
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    direction: "row",
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: ['sm', 'md']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Number: "
    }, {
      "type": 1,
      "value": "orderNumber"
    }],
    id: "account_order_detail.label.order_number",
    values: {
      orderNumber: order.orderNo
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Badge, {
    colorScheme: "green"
  }, order.status))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "192px"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    layerStyle: "cardBordered"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Grid, {
    templateColumns: {
      base: '1fr',
      xl: '60% 1fr'
    },
    gap: {
      base: 6,
      xl: 2
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.SimpleGrid, {
    columns: {
      base: 1,
      sm: 2
    },
    columnGap: 4,
    rowGap: 5,
    py: {
      xl: 6
    }
  }, isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "56px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "56px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "56px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "60px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "56px"
  }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h2",
    fontSize: "sm",
    pt: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Method"
    }],
    id: "account_order_detail.heading.shipping_method"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm",
    textTransform: "titlecase"
  }, {
    not_shipped: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Not shipped"
      }],
      id: "account_order_detail.shipping_status.not_shipped"
    }),
    part_shipped: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Partially shipped"
      }],
      id: "account_order_detail.shipping_status.part_shipped"
    }),
    shipped: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Shipped"
      }],
      id: "account_order_detail.shipping_status.shipped"
    })
  }[shippingStatus]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, shippingMethod.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Tracking Number"
    }],
    id: "account_order_detail.label.tracking_number"
  }), ":", ' ', trackingNumber || formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Pending"
    }],
    id: "account_order_detail.label.pending_tracking_number"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h2",
    fontSize: "sm",
    pt: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Payment Method"
    }],
    id: "account_order_detail.heading.payment_method"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    direction: "row"
  }, CardIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(CardIcon, {
    layerStyle: "ccIcon",
    "aria-hidden": "true"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.cardType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    direction: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, "\u2022\u2022\u2022\u2022", ' ', paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.numberLastDigits), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.expirationMonth, "/", paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.expirationYear))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h2",
    fontSize: "sm",
    pt: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Address"
    }],
    id: "account_order_detail.heading.shipping_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, shippingAddress.firstName, " ", shippingAddress.lastName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, shippingAddress.address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, shippingAddress.city, ", ", shippingAddress.stateCode, ' ', shippingAddress.postalCode))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h2",
    fontSize: "sm",
    pt: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Billing Address"
    }],
    id: "account_order_detail.heading.billing_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, order.billingAddress.firstName, ' ', order.billingAddress.lastName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, order.billingAddress.address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm"
  }, order.billingAddress.city, ",", ' ', order.billingAddress.stateCode, ' ', order.billingAddress.postalCode))))), !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    py: {
      base: 6
    },
    px: {
      base: 6,
      xl: 8
    },
    background: "gray.50",
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_7__["default"], {
    basket: order,
    fontSize: "sm"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "full"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 4
  }, !isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 1,
      "value": "count"
    }, {
      "type": 0,
      "value": " items"
    }],
    values: {
      count: itemCount
    },
    id: "account_order_detail.heading.num_of_items"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 4
  }, isLoading ? [1, 2, 3].map(i => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    key: i,
    p: [4, 6],
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    width: "full",
    align: "flex-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    boxSize: ['88px', 36],
    mr: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "140px"
  }))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(OrderProducts, {
    productItems: order.productItems,
    currency: order.currency
  }))));
};
AccountOrderDetail.getTemplateName = () => 'account-order-history';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountOrderDetail);

/***/ }),

/***/ "./app/pages/account/order-history.jsx":
/*!*********************************************!*\
  !*** ./app/pages/account/order-history.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_action_placeholder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-action-placeholder */ "./app/components/page-action-placeholder/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_pagination__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/pagination */ "./app/components/pagination/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");

const _excluded = ["data"];
/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */















const OrderProductImages = ({
  productItems
}) => {
  const ids = productItems.map(item => item.productId).join(',') ?? '';
  const {
    data: {
      data: products
    } = {},
    isLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useProducts)({
    parameters: {
      ids: ids
    }
  });
  const images = products === null || products === void 0 ? void 0 : products.map(product => {
    var _product$imageGroups;
    return product === null || product === void 0 ? void 0 : (_product$imageGroups = product.imageGroups) === null || _product$imageGroups === void 0 ? void 0 : _product$imageGroups.find(group => group.viewType === 'small').images[0];
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, !isLoading && products ? images.map((image, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AspectRatio, {
      key: index,
      ratio: 1,
      width: "88px",
      w: "88px",
      borderRadius: "base",
      overflow: "hidden"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Img, {
      alt: image === null || image === void 0 ? void 0 : image.alt,
      src: (image === null || image === void 0 ? void 0 : image.disBaseLink) || (image === null || image === void 0 ? void 0 : image.link),
      fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
        background: "gray.100",
        boxSize: "full"
      })
    }));
  }) : productItems.map((item, index) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
      key: index,
      h: "88px",
      w: "88px"
    });
  }));
};
OrderProductImages.propTypes = {
  productItems: (prop_types__WEBPACK_IMPORTED_MODULE_12___default().array)
};
const onClient = typeof window !== 'undefined';
const AccountOrderHistory = () => {
  const location = (0,react_router__WEBPACK_IMPORTED_MODULE_13__.useLocation)();
  const {
    formatMessage,
    formatDate
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_14__["default"])();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_3__.useCurrentCustomer)();
  const {
    customerId
  } = customer;
  const searchParams = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_6__.useSearchParams)(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_11__.DEFAULT_ORDERS_SEARCH_PARAMS);
  const {
    limit,
    offset
  } = searchParams[0];
  const _useCustomerOrders = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useCustomerOrders)({
      parameters: {
        customerId,
        limit,
        offset
      }
    }, {
      enabled: onClient && !!customerId
    }),
    {
      data: {
        data: orders
      } = {},
      isLoading
    } = _useCustomerOrders,
    paging = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_useCustomerOrders.data, _excluded);
  const hasOrders = (orders === null || orders === void 0 ? void 0 : orders.length) > 0;
  const pageUrls = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_6__.usePageUrls)({
    total: paging.total,
    limit
  });
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _headingRef$current;
    // Focus the 'Order History' header when the component mounts for accessibility
    headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current = headingRef.current) === null || _headingRef$current === void 0 ? void 0 : _headingRef$current.focus();
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    window.scrollTo(0, 0);
  }, [customer, searchParams.offset]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 4,
    "data-testid": "account-order-history-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Heading, {
    as: "h1",
    fontSize: "2xl",
    tabIndex: "0",
    ref: headingRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order History"
    }],
    id: "account_order_history.title.order_history"
  }))), isLoading ? [1, 2, 3].map(i => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    key: i,
    spacing: 4,
    layerStyle: "cardBordered"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "200px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Grid, {
    templateColumns: {
      base: 'repeat(auto-fit, 88px)'
    },
    gap: 4
  }, Array.from(Array(4).keys()).map(i => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    key: i,
    w: "88px",
    h: "88px"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, {
    h: "20px",
    w: "200px"
  }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 4
  }, orders === null || orders === void 0 ? void 0 : orders.map(order => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
      key: order.orderNo,
      spacing: 4,
      layerStyle: "cardBordered"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
      justifyContent: "space-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
      fontWeight: "bold",
      fontSize: "lg"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Ordered: "
      }, {
        "type": 1,
        "value": "date"
      }],
      id: "account_order_history.label.ordered_date",
      values: {
        date: formatDate(new Date(order.creationDate), {
          year: 'numeric',
          day: 'numeric',
          month: 'short'
        })
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
      as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_8__["default"],
      to: `/account/orders/${order.orderNo}`,
      variant: "link",
      rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__.ChevronRightIcon, {
        boxSize: 5,
        mx: -1.5
      }),
      fontSize: {
        base: 'sm',
        lg: 'md'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "View details"
      }],
      id: "account_order_history.link.view_details"
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
      direction: "row",
      alignItems: "center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Order Number: "
      }, {
        "type": 1,
        "value": "orderNumber"
      }],
      id: "account_order_history.label.order_number",
      values: {
        orderNumber: order.orderNo
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Badge, {
      colorScheme: "green"
    }, order.status))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Grid, {
      templateColumns: {
        base: 'repeat(auto-fit, 88px)'
      },
      gap: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(OrderProductImages, {
      productItems: order.productItems
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
      direction: {
        base: 'column',
        lg: 'row'
      },
      alignItems: {
        base: 'flex-start',
        lg: 'center'
      },
      spacing: {
        base: '2px',
        lg: 3
      },
      divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Divider, {
        visibility: {
          base: 'hidden',
          lg: 'visible'
        },
        orientation: 'vertical',
        h: {
          base: 0,
          lg: 4
        }
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
      defaultMessage: [{
        "type": 1,
        "value": "count"
      }, {
        "type": 0,
        "value": " items"
      }],
      id: "account_order_history.label.num_of_items",
      values: {
        count: order.productItems.length
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__.FormattedNumber, {
      style: "currency",
      currency: order.currency,
      value: order.orderTotal
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Shipped to: "
      }, {
        "type": 1,
        "value": "name"
      }],
      id: "account_order_history.label.shipped_to",
      values: {
        name: `${order.shipments[0].shippingAddress.firstName} ${order.shipments[0].shippingAddress.lastName}`
      }
    }))));
  }), hasOrders && (orders === null || orders === void 0 ? void 0 : orders.length) < paging.total && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    pt: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_pagination__WEBPACK_IMPORTED_MODULE_10__["default"], {
    currentURL: `${location.pathname}${location.search}`,
    urls: pageUrls
  }))), !hasOrders && !isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    "data-testid": "account-order-history-place-holder"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_page_action_placeholder__WEBPACK_IMPORTED_MODULE_7__["default"], {
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__.ReceiptIcon, {
      boxSize: 8
    }),
    heading: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "You haven't placed an order yet."
      }],
      id: "account_order_history.heading.no_order_yet"
    }),
    text: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Once you place an order the details will show up here."
      }],
      id: "account_order_history.description.once_you_place_order"
    }),
    buttonText: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Continue Shopping"
      }],
      id: "account_order_history.button.continue_shopping"
    }),
    buttonProps: {
      leftIcon: undefined
    },
    onButtonClick: () => navigate('/')
  })));
};
AccountOrderHistory.getTemplateName = () => 'account-order-history';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountOrderHistory);

/***/ }),

/***/ "./app/pages/account/orders.jsx":
/*!**************************************!*\
  !*** ./app/pages/account/orders.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_order_history__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/order-history */ "./app/pages/account/order-history.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_order_detail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/order-detail */ "./app/pages/account/order-detail.jsx");
/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const AccountOrders = () => {
  const {
    path
  } = (0,react_router__WEBPACK_IMPORTED_MODULE_3__.useRouteMatch)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Route, {
    exact: true,
    path: path
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_pages_account_order_history__WEBPACK_IMPORTED_MODULE_1__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router__WEBPACK_IMPORTED_MODULE_3__.Route, {
    exact: true,
    path: `${path}/:orderNo`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_pages_account_order_detail__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
};
AccountOrders.getTemplateName = () => 'account-order-history';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountOrders);

/***/ }),

/***/ "./app/pages/account/profile.jsx":
/*!***************************************!*\
  !*** ./app/pages/account/profile.jsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/toggle-card */ "./app/components/toggle-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_profile_fields__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/profile-fields */ "./app/components/forms/profile-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_update_password_fields__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/update-password-fields */ "./app/components/forms/update-password-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/form-action-buttons */ "./app/components/forms/form-action-buttons.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");



const _excluded = ["children", "height", "width"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */














/**
 * This is a specialized Skeleton component that which uses the customers authtype as the
 * `isLoaded` state. It also will revert it's provided size (height, width) when the loaded
 * state changes. This allows you to have skeletons of a specific size, but onece loaded
 * the bounding element will affect the contents size.
 */
// eslint-disable-next-line react/prop-types
const Skeleton = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_3__.forwardRef)((_ref, ref) => {
  let {
      children,
      height,
      width
    } = _ref,
    rest = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded);
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_11__.useCurrentCustomer)();
  const {
    isRegistered
  } = customer;
  const size = !isRegistered ? {
    height,
    width
  } : {};
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Skeleton, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    ref: ref,
    isLoaded: !customer.isLoading
  }, rest, size), children);
});
Skeleton.displayName = 'Skeleton';
const ProfileCard = ({
  allowPasswordChange = false
}) => {
  var _form$formState$error;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_11__.useCurrentCustomer)();
  const {
    isRegistered,
    customerId
  } = customer;
  const updateCustomerMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10__.useShopperCustomersMutation)('updateCustomer');
  const toast = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.useToast)();
  const [isEditing, setIsEditing] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm)({
    defaultValues: {
      firstName: customer === null || customer === void 0 ? void 0 : customer.firstName,
      lastName: customer === null || customer === void 0 ? void 0 : customer.lastName,
      email: customer === null || customer === void 0 ? void 0 : customer.email,
      phone: customer === null || customer === void 0 ? void 0 : customer.phoneHome
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    form.reset({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phoneHome
    });
  }, [customer === null || customer === void 0 ? void 0 : customer.firstName, customer === null || customer === void 0 ? void 0 : customer.lastName, customer === null || customer === void 0 ? void 0 : customer.email, customer === null || customer === void 0 ? void 0 : customer.phoneHome]);
  const submit = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (values) {
      try {
        form.clearErrors();
        updateCustomerMutation.mutate({
          parameters: {
            customerId
          },
          body: {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneHome: values.phone,
            // NOTE/ISSUE
            // The sdk is allowing you to change your email to an already-existing email.
            // I would expect an error. We also want to keep the email and login the same
            // for the customer, but the sdk isn't changing the login when we submit an
            // updated email. This will lead to issues where you change your email but end
            // up not being able to login since 'login' will no longer match the email.
            email: values.email,
            login: values.email
          }
        }, {
          onSuccess: () => {
            var _headingRef$current;
            setIsEditing(false);
            toast({
              title: formatMessage({
                defaultMessage: [{
                  "type": 0,
                  "value": "Profile updated"
                }],
                id: "profile_card.info.profile_updated"
              }),
              status: 'success',
              isClosable: true
            });
            headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current = headingRef.current) === null || _headingRef$current === void 0 ? void 0 : _headingRef$current.focus();
          }
        });
      } catch (error) {
        form.setError('global', {
          type: 'manual',
          message: error.message
        });
      }
    });
    return function submit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__.ToggleCard, {
    id: "my-profile",
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
      ref: headingRef,
      tabIndex: "-1",
      height: "30px",
      width: "120px"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "My Profile"
      }],
      id: "profile_card.title.my_profile"
    })),
    editing: isEditing,
    disableEdit: !allowPasswordChange,
    isLoading: form.formState.isSubmitting,
    onEdit: isRegistered ? () => setIsEditing(true) : undefined,
    layerStyle: "cardBordered"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__.ToggleCardEdit, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("form", {
    onSubmit: form.handleSubmit(submit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 6
  }, ((_form$formState$error = form.formState.errors) === null || _form$formState$error === void 0 ? void 0 : _form$formState$error.global) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Alert, {
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__.AlertIcon, {
    color: "red.500",
    boxSize: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    ml: 3
  }, form.formState.errors.global.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_forms_profile_fields__WEBPACK_IMPORTED_MODULE_7__["default"], {
    form: form
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_9__["default"], {
    onCancel: () => {
      var _headingRef$current2;
      setIsEditing(false);
      headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current2 = headingRef.current) === null || _headingRef$current2 === void 0 ? void 0 : _headingRef$current2.focus();
      form.reset();
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__.ToggleCardSummary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.SimpleGrid, {
    columns: {
      base: 1,
      lg: 3
    },
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "84px",
    marginBottom: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Full Name"
    }],
    id: "profile_card.label.full_name"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "140px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm"
  }, customer === null || customer === void 0 ? void 0 : customer.firstName, " ", customer === null || customer === void 0 ? void 0 : customer.lastName))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "120px",
    marginBottom: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Email"
    }],
    id: "profile_card.label.email"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "64px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm"
  }, customer === null || customer === void 0 ? void 0 : customer.email))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "80px",
    marginBottom: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Phone Number"
    }],
    id: "profile_card.label.phone"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "120px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm"
  }, (customer === null || customer === void 0 ? void 0 : customer.phoneHome) || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Not provided"
    }],
    id: "profile_card.message.not_provided"
  })))))));
};
ProfileCard.propTypes = {
  allowPasswordChange: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool)
};
const PasswordCard = () => {
  var _form$formState$error2, _form$formState$error3;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_11__.useCurrentCustomer)();
  const {
    isRegistered
  } = customer;

  // Here we use AuthHelpers.UpdateCustomerPassword rather than invoking the updateCustomerPassword mutation directly
  // because the AuthHelper will re-authenticate the user's current session after the password change.
  const updateCustomerPassword = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10__.AuthHelpers.UpdateCustomerPassword);
  const toast = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.useToast)();
  const [isEditing, setIsEditing] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm)();
  const submit = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (values) {
      try {
        var _headingRef$current3;
        form.clearErrors();
        yield updateCustomerPassword.mutateAsync({
          customer,
          password: values.password,
          currentPassword: values.currentPassword,
          shouldReloginCurrentSession: true
        });
        setIsEditing(false);
        toast({
          title: formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Password updated"
            }],
            id: "password_card.info.password_updated"
          }),
          status: 'success',
          isClosable: true
        });
        headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current3 = headingRef.current) === null || _headingRef$current3 === void 0 ? void 0 : _headingRef$current3.focus();
        form.reset();
      } catch (error) {
        const resObj = yield error.response.json();
        form.setError('root.global', {
          type: 'manual',
          message: resObj.detail
        });
      }
    });
    return function submit(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__.ToggleCard, {
    id: "password",
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
      ref: headingRef,
      tabIndex: "-1",
      height: "30px",
      width: "120px"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Password"
      }],
      id: "password_card.title.password"
    })),
    editing: isEditing,
    isLoading: form.formState.isSubmitting,
    onEdit: isRegistered ? () => setIsEditing(true) : undefined,
    layerStyle: "cardBordered"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__.ToggleCardEdit, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement("form", {
    onSubmit: form.handleSubmit(submit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 6
  }, ((_form$formState$error2 = form.formState.errors) === null || _form$formState$error2 === void 0 ? void 0 : (_form$formState$error3 = _form$formState$error2.root) === null || _form$formState$error3 === void 0 ? void 0 : _form$formState$error3.global) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Alert, {
    "data-testid": "password-update-error",
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_5__.AlertIcon, {
    color: "red.500",
    boxSize: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    ml: 3
  }, form.formState.errors.root.global.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_forms_update_password_fields__WEBPACK_IMPORTED_MODULE_8__["default"], {
    form: form
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_9__["default"], {
    onCancel: () => {
      var _headingRef$current4;
      setIsEditing(false);
      headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current4 = headingRef.current) === null || _headingRef$current4 === void 0 ? void 0 : _headingRef$current4.focus();
      form.reset();
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_6__.ToggleCardSummary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.SimpleGrid, {
    columns: {
      base: 1,
      lg: 3
    },
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "84px",
    marginBottom: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Password"
    }],
    id: "password_card.label.password"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(Skeleton, {
    height: "21px",
    width: "140px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm"
  }, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"))))));
};
const AccountDetail = () => {
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    var _headingRef$current5;
    // Focus the 'Account Details' header when the component mounts for accessibility
    headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current5 = headingRef.current) === null || _headingRef$current5 === void 0 ? void 0 : _headingRef$current5.focus();
  }, []);
  const {
    isExternal
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_10__.useCustomerType)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    "data-testid": "account-detail-page",
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    as: "h1",
    fontSize: "24px",
    tabIndex: "0",
    ref: headingRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Account Details"
    }],
    id: "account_detail.title.account_details"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(ProfileCard, {
    allowPasswordChange: !isExternal
  }), !isExternal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(PasswordCard, null)));
};
AccountDetail.getTemplateName = () => 'account-detail';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountDetail);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-account.js.map