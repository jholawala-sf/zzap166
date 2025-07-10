"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["app_components_action-card_index_jsx-app_components_address-display_index_jsx-app_components_-8b77ee"],{

/***/ "./app/components/action-card/index.jsx":
/*!**********************************************!*\
  !*** ./app/components/action-card/index.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");



const _excluded = ["children", "onEdit", "onRemove", "editBtnRef", "editBtnLabel", "removeBtnLabel"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






/**
 * Renders a card-style box with optional edit and remove buttons. Used for
 * lists of addresses, payment methods, or any other list-type content.
 * The provided `onRemove` callback triggers a loading spinner internally
 * if given a promise.
 */
const ActionCard = _ref => {
  let {
      children,
      onEdit,
      onRemove,
      editBtnRef,
      editBtnLabel,
      removeBtnLabel
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded);
  const [showLoading, setShowLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const handleRemove = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
      setShowLoading(true);
      try {
        return yield Promise.resolve(onRemove());
      } finally {
        setShowLoading(false);
      }
    });
    return function handleRemove() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    spacing: 4,
    p: 4,
    position: "relative",
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "base"
  }, props), showLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    direction: "row",
    spacing: 4
  }, onEdit && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    onClick: onEdit,
    variant: "link",
    size: "sm",
    ref: editBtnRef,
    "aria-label": editBtnLabel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Edit"
    }],
    id: "action_card.action.edit"
  })), onRemove && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "link",
    size: "sm",
    colorScheme: "red",
    onClick: handleRemove,
    color: "red.600",
    "aria-label": removeBtnLabel
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Remove"
    }],
    id: "action_card.action.remove"
  })))));
};
ActionCard.propTypes = {
  /** Callback fired on edit */
  onEdit: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
  /** Callback fired on remove click (if promise, will toggle loading spinner) */
  onRemove: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
  /** Content rendered in card */
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().node),
  /** Ref for the edit button so that it can be focused on for accessibility */
  editBtnRef: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /** Accessibility label for edit button */
  editBtnLabel: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string),
  /** Accessibility label for remove button */
  removeBtnLabel: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ActionCard);

/***/ }),

/***/ "./app/components/address-display/index.jsx":
/*!**************************************************!*\
  !*** ./app/components/address-display/index.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



const AddressDisplay = ({
  address
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, address.firstName, " ", address.lastName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, address.address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, address.city, ", ", address.stateCode, " ", address.postalCode), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, null, address.countryCode));
};
AddressDisplay.propTypes = {
  address: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressDisplay);

/***/ }),

/***/ "./app/components/forms/address-fields.jsx":
/*!*************************************************!*\
  !*** ./app/components/forms/address-fields.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useAddressFields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useAddressFields */ "./app/components/forms/useAddressFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/locale */ "./app/utils/locale.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */








const defaultFormTitleAriaLabel = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Address Form"
  }],
  id: "use_address_fields.label.address_form"
});
const AddressFields = ({
  form,
  prefix = '',
  formTitleAriaLabel = defaultFormTitleAriaLabel,
  isBillingAddress = false
}) => {
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_4__.useCurrentCustomer)();
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useAddressFields__WEBPACK_IMPORTED_MODULE_2__["default"])({
    form,
    prefix
  });
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_7__["default"])();
  const addressFormRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    var _addressFormRef$curre;
    // Focus on the form when the component mounts for accessibility
    addressFormRef === null || addressFormRef === void 0 ? void 0 : (_addressFormRef$curre = addressFormRef.current) === null || _addressFormRef$curre === void 0 ? void 0 : _addressFormRef$curre.focus();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 5,
    "aria-label": intl.formatMessage(formTitleAriaLabel),
    tabIndex: "0",
    ref: addressFormRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.SimpleGrid, {
    columns: [1, 1, 2],
    gap: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.firstName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.lastName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.phone), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.countryCode), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.city), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Grid, {
    templateColumns: "repeat(8, 1fr)",
    gap: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.GridItem, {
    colSpan: [4, 4, 4]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.stateCode)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.GridItem, {
    colSpan: [4, 4, 4]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.postalCode))), customer.isRegistered && !isBillingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_3__["default"], fields.preferred));
};
AddressFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().string),
  /** Optional aria label to use for the address form */
  formTitleAriaLabel: _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_5__.MESSAGE_PROPTYPE,
  /** Optional flag to indication if an address is a billing address */
  isBillingAddress: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddressFields);

/***/ }),

/***/ "./app/components/forms/form-action-buttons.jsx":
/*!******************************************************!*\
  !*** ./app/components/forms/form-action-buttons.jsx ***!
  \******************************************************/
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
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_locale_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/locale.js */ "./app/utils/locale.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






/**
 * Renders a form submit button and a cancel button with configurable labels and callbacks
 * in a responsive layout. Used primarily in forms that can be toggled opened/closed.
 */
const FormActionButtons = ({
  saveButtonProps = {},
  cancelButtonProps = {},
  saveButtonLabel,
  cancelButtonLabel,
  onCancel = () => {}
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    direction: {
      base: 'column',
      lg: 'row-reverse'
    },
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    type: "submit",
    minWidth: 28
  }, saveButtonProps), saveButtonLabel ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], saveButtonLabel) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Save"
    }],
    id: "form_action_buttons.button.save"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    variant: "outline",
    minWidth: 28,
    onClick: onCancel
  }, cancelButtonProps), cancelButtonLabel ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], cancelButtonLabel) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    id: "form_action_buttons.button.cancel",
    defaultMessage: [{
      "type": 0,
      "value": "Cancel"
    }]
  })));
};
FormActionButtons.propTypes = {
  saveButtonProps: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  cancelButtonProps: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  saveButtonLabel: _salesforce_retail_react_app_app_utils_locale_js__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_PROPTYPE,
  cancelButtonLabel: _salesforce_retail_react_app_app_utils_locale_js__WEBPACK_IMPORTED_MODULE_3__.MESSAGE_PROPTYPE,
  onCancel: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormActionButtons);

/***/ }),

/***/ "./app/components/forms/state-province-options.jsx":
/*!*********************************************************!*\
  !*** ./app/components/forms/state-province-options.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   provinceOptions: () => (/* binding */ provinceOptions),
/* harmony export */   stateOptions: () => (/* binding */ stateOptions)
/* harmony export */ });
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const stateOptions = [{
  value: 'AL',
  label: 'Alabama'
}, {
  value: 'AK',
  label: 'Alaska'
}, {
  value: 'AZ',
  label: 'Arizona'
}, {
  value: 'AR',
  label: 'Arkansas'
}, {
  value: 'CA',
  label: 'California'
}, {
  value: 'CO',
  label: 'Colorado'
}, {
  value: 'CT',
  label: 'Connecticut'
}, {
  value: 'DE',
  label: 'Delaware'
}, {
  value: 'DC',
  label: 'District Of Columbia'
}, {
  value: 'FL',
  label: 'Florida'
}, {
  value: 'GA',
  label: 'Georgia'
}, {
  value: 'HI',
  label: 'Hawaii'
}, {
  value: 'ID',
  label: 'Idaho'
}, {
  value: 'IL',
  label: 'Illinois'
}, {
  value: 'IN',
  label: 'Indiana'
}, {
  value: 'IA',
  label: 'Iowa'
}, {
  value: 'KS',
  label: 'Kansas'
}, {
  value: 'KY',
  label: 'Kentucky'
}, {
  value: 'LA',
  label: 'Louisiana'
}, {
  value: 'ME',
  label: 'Maine'
}, {
  value: 'MD',
  label: 'Maryland'
}, {
  value: 'MA',
  label: 'Massachusetts'
}, {
  value: 'MI',
  label: 'Michigan'
}, {
  value: 'MN',
  label: 'Minnesota'
}, {
  value: 'MS',
  label: 'Mississippi'
}, {
  value: 'MO',
  label: 'Missouri'
}, {
  value: 'MT',
  label: 'Montana'
}, {
  value: 'NE',
  label: 'Nebraska'
}, {
  value: 'NV',
  label: 'Nevada'
}, {
  value: 'NH',
  label: 'New Hampshire'
}, {
  value: 'NJ',
  label: 'New Jersey'
}, {
  value: 'NM',
  label: 'New Mexico'
}, {
  value: 'NY',
  label: 'New York'
}, {
  value: 'NC',
  label: 'North Carolina'
}, {
  value: 'ND',
  label: 'North Dakota'
}, {
  value: 'OH',
  label: 'Ohio'
}, {
  value: 'OK',
  label: 'Oklahoma'
}, {
  value: 'OR',
  label: 'Oregon'
}, {
  value: 'PA',
  label: 'Pennsylvania'
}, {
  value: 'RI',
  label: 'Rhode Island'
}, {
  value: 'SC',
  label: 'South Carolina'
}, {
  value: 'SD',
  label: 'South Dakota'
}, {
  value: 'TN',
  label: 'Tennessee'
}, {
  value: 'TX',
  label: 'Texas'
}, {
  value: 'UT',
  label: 'Utah'
}, {
  value: 'VT',
  label: 'Vermont'
}, {
  value: 'VA',
  label: 'Virginia'
}, {
  value: 'WA',
  label: 'Washington'
}, {
  value: 'WV',
  label: 'West Virginia'
}, {
  value: 'WI',
  label: 'Wisconsin'
}, {
  value: 'WY',
  label: 'Wyoming'
}];
const provinceOptions = [{
  value: 'AB',
  label: 'Alberta'
}, {
  value: 'BC',
  label: 'British Columbia'
}, {
  value: 'MB',
  label: 'Manitoba'
}, {
  value: 'NB',
  label: 'New Brunswick'
}, {
  value: 'NL',
  label: 'Newfoundland and Labrador'
}, {
  value: 'NS',
  label: 'Nova Scotia'
}, {
  value: 'ON',
  label: 'Ontario'
}, {
  value: 'PE',
  label: 'Prince Edward Island'
}, {
  value: 'QC',
  label: 'Quebec'
}, {
  value: 'SK',
  label: 'Saskatchewan'
}, {
  value: 'NT',
  label: 'Northwest Territories'
}, {
  value: 'NU',
  label: 'Nunavut'
}, {
  value: 'YT',
  label: 'Yukon'
}];

/***/ }),

/***/ "./app/components/forms/useAddressFields.jsx":
/*!***************************************************!*\
  !*** ./app/components/forms/useAddressFields.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useAddressFields)
/* harmony export */ });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_phone_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/phone-utils */ "./app/utils/phone-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_state_province_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/state-province-options */ "./app/components/forms/state-province-options.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




const messages = (0,react_intl__WEBPACK_IMPORTED_MODULE_3__.defineMessages)({
  required: {
    defaultMessage: [{
      "type": 0,
      "value": "Required"
    }],
    id: "use_address_fields.error.required"
  },
  firstName: {
    defaultMessage: [{
      "type": 0,
      "value": "First Name"
    }],
    id: "use_address_fields.label.first_name"
  },
  lastName: {
    defaultMessage: [{
      "type": 0,
      "value": "Last Name"
    }],
    id: "use_address_fields.label.last_name"
  },
  phone: {
    defaultMessage: [{
      "type": 0,
      "value": "Phone"
    }],
    id: "use_address_fields.label.phone"
  },
  country: {
    defaultMessage: [{
      "type": 0,
      "value": "Country"
    }],
    id: "use_address_fields.label.country"
  },
  address: {
    defaultMessage: [{
      "type": 0,
      "value": "Address"
    }],
    id: "use_address_fields.label.address"
  },
  city: {
    defaultMessage: [{
      "type": 0,
      "value": "City"
    }],
    id: "use_address_fields.label.city"
  },
  state: {
    defaultMessage: [{
      "type": 0,
      "value": "State"
    }],
    id: "use_address_fields.label.state"
  },
  province: {
    defaultMessage: [{
      "type": 0,
      "value": "Province"
    }],
    id: "use_address_fields.label.province"
  },
  zipCode: {
    defaultMessage: [{
      "type": 0,
      "value": "Zip Code"
    }],
    id: "use_address_fields.label.zipCode"
  },
  postalCode: {
    defaultMessage: [{
      "type": 0,
      "value": "Postal Code"
    }],
    id: "use_address_fields.label.postal_code"
  },
  stateCodeInvalid: {
    defaultMessage: [{
      "type": 0,
      "value": "Please enter 2-letter state/province."
    }],
    id: "use_address_fields.error.state_code_invalid"
  },
  preferred: {
    defaultMessage: [{
      "type": 0,
      "value": "Set as default"
    }],
    id: "use_address_fields.label.preferred"
  }
});

/**
 * A React hook that provides the field definitions for an address form.
 * @param {Object} form - The object returned from `useForm`
 * @param {Object} form.control - The form control object
 * @param {Object} form.formState.errors - An object containing field errors
 * @returns {Object} Field definitions for use in a form
 */
function useAddressFields({
  form: {
    watch,
    control,
    formState: {
      errors
    }
  },
  prefix = ''
}) {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const countryCode = watch('countryCode');
  const fields = {
    firstName: {
      name: `${prefix}firstName`,
      label: formatMessage(messages.firstName),
      defaultValue: '',
      type: 'text',
      autoComplete: 'given-name',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your first name."
          }],
          id: "use_address_fields.error.please_enter_first_name"
        })
      },
      error: errors[`${prefix}firstName`],
      control
    },
    lastName: {
      name: `${prefix}lastName`,
      label: formatMessage(messages.lastName),
      defaultValue: '',
      type: 'text',
      autoComplete: 'family-name',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your last name."
          }],
          id: "use_address_fields.error.please_enter_last_name"
        })
      },
      error: errors[`${prefix}lastName`],
      control
    },
    phone: {
      name: `${prefix}phone`,
      label: formatMessage(messages.phone),
      defaultValue: '',
      type: 'tel',
      autoComplete: 'tel',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your phone number."
          }],
          id: "use_address_fields.error.please_enter_phone_number"
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
    },
    countryCode: {
      name: `${prefix}countryCode`,
      label: formatMessage(messages.country),
      defaultValue: 'US',
      type: 'select',
      options: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_2__.SHIPPING_COUNTRY_CODES,
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please select your country."
          }],
          id: "use_address_fields.error.please_select_your_country"
        })
      },
      error: errors[`${prefix}countryCode`],
      control
    },
    address1: {
      name: `${prefix}address1`,
      label: formatMessage(messages.address),
      defaultValue: '',
      type: 'text',
      autoComplete: 'address-line1',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your address."
          }],
          id: "use_address_fields.error.please_select_your_address"
        })
      },
      error: errors[`${prefix}address1`],
      control
    },
    city: {
      name: `${prefix}city`,
      label: formatMessage(messages.city),
      defaultValue: '',
      type: 'text',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your city."
          }],
          id: "use_address_fields.error.please_select_your_city"
        })
      },
      error: errors[`${prefix}city`],
      control
    },
    stateCode: {
      name: `${prefix}stateCode`,
      label: formatMessage(countryCode === 'CA' ? messages.province : messages.state),
      defaultValue: '',
      type: 'select',
      options: [{
        value: '',
        label: ''
      }, ...(countryCode === 'CA' ? _salesforce_retail_react_app_app_components_forms_state_province_options__WEBPACK_IMPORTED_MODULE_1__.provinceOptions : _salesforce_retail_react_app_app_components_forms_state_province_options__WEBPACK_IMPORTED_MODULE_1__.stateOptions)],
      rules: {
        required: countryCode === 'CA' ? 'Please select your province.' // FYI we won't translate this
        : formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please select your state."
          }],
          id: "use_address_fields.error.please_select_your_state_or_province"
        })
      },
      error: errors[`${prefix}stateCode`],
      control
    },
    postalCode: {
      name: `${prefix}postalCode`,
      label: formatMessage(countryCode === 'CA' ? messages.postalCode : messages.zipCode),
      defaultValue: '',
      type: 'text',
      autoComplete: 'postal-code',
      rules: {
        required: countryCode === 'CA' ? 'Please enter your postal code.' // FYI we won't translate this
        : formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your zip code."
          }],
          id: "use_address_fields.error.please_enter_your_postal_or_zip"
        })
      },
      error: errors[`${prefix}postalCode`],
      control
    },
    preferred: {
      name: `${prefix}preferred`,
      label: formatMessage(messages.preferred),
      defaultValue: false,
      type: 'checkbox',
      autoComplete: 'honorific-prefix',
      rules: {},
      control
    }
  };
  return fields;
}

/***/ }),

/***/ "./app/components/toggle-card/index.jsx":
/*!**********************************************!*\
  !*** ./app/components/toggle-card/index.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ToggleCard: () => (/* binding */ ToggleCard),
/* harmony export */   ToggleCardEdit: () => (/* binding */ ToggleCardEdit),
/* harmony export */   ToggleCardSummary: () => (/* binding */ ToggleCardSummary)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");


const _excluded = ["id", "title", "editing", "disabled", "disableEdit", "onEdit", "editLabel", "isLoading", "children"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const ToggleCardContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.createContext)();

/**
 * A card-like box that renders one of two states: 'edit' and 'summary'. It takes a single
 * `ToggleCardSummary` and `ToggleCardEdit` component as children and renders one or the
 * other depending on the `editing` prop. See `app/pages/checkout` for example.
 */
const ToggleCard = _ref => {
  let {
      id,
      title,
      editing,
      disabled,
      disableEdit,
      onEdit,
      editLabel,
      isLoading,
      children
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const titleRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (editing && titleRef.current) {
      titleRef.current.focus();
    }
  }, [editing]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ToggleCardContext.Provider, {
    value: {
      editing,
      disabled
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    layerStyle: "card",
    rounded: [0, 0, 'base'],
    px: [4, 4, 6],
    "data-testid": `sf-toggle-card-${id}`,
    position: "relative"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: editing || !editing && !disabled ? 4 : 0
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: "lg",
    lineHeight: "30px",
    color: disabled && !editing && 'gray.600',
    tabIndex: "0",
    ref: titleRef
  }, title), !editing && !disabled && onEdit && !disableEdit && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    size: "sm",
    onClick: onEdit,
    "aria-label": editLabel
  }, editLabel || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Edit"
    }],
    id: "toggle_card.action.edit"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    "data-testid": `sf-toggle-card-${id}-content`
  }, children)), isLoading && editing && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
};
const ToggleCardEdit = ({
  children
}) => {
  const {
    editing
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(ToggleCardContext);
  return editing ? children : null;
};
const ToggleCardSummary = ({
  children
}) => {
  const {
    editing,
    disabled
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(ToggleCardContext);
  return !editing && !disabled ? children : null;
};
ToggleCard.propTypes = {
  id: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any),
  editLabel: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any),
  editing: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  disabled: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  disableEdit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().bool),
  onEdit: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().func),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any)
};
ToggleCardEdit.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any)
};
ToggleCardSummary.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().any)
};

/***/ }),

/***/ "./app/utils/cc-utils.js":
/*!*******************************!*\
  !*** ./app/utils/cc-utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCreditCardPaymentBodyFromForm: () => (/* binding */ createCreditCardPaymentBodyFromForm),
/* harmony export */   formatCreditCardNumber: () => (/* binding */ formatCreditCardNumber),
/* harmony export */   getCreditCardIcon: () => (/* binding */ getCreditCardIcon),
/* harmony export */   getMaskCreditCardNumber: () => (/* binding */ getMaskCreditCardNumber),
/* harmony export */   getPaymentInstrumentCardType: () => (/* binding */ getPaymentInstrumentCardType)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");


const _excluded = ["expiry", "paymentInstrumentId"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


/**
 * Formats a credit card number against given criteria
 * @param {string} cardNumber - The number to be formatted
 * @param {Object} opts
 * @param {number[]} opts.gaps - Indices for space insertion
 * @param {number[]} opts.length - Max number lengths for output
 * @returns {string} Formatted card number for display
 */
const formatCreditCardNumber = (cardNumber = '', opts = {
  gaps: [],
  lengths: []
}) => {
  let trimmedNumber = cardNumber.replace(/[^0-9]/g, '');
  let numberLength = trimmedNumber.length;
  if (numberLength === opts.lengths[0] + 1) {
    trimmedNumber = trimmedNumber.substr(0, opts.lengths[0]);
    numberLength = trimmedNumber.length;
  }
  let numbers = trimmedNumber.split('');
  opts.gaps.forEach((gapIndex, idx) => {
    if (numberLength > gapIndex) {
      numbers.splice(gapIndex + idx, 0, ' ');
    }
  });
  return numbers.join('');
};

/**
 * Returns the icon component for a given card type
 * @param {string} type - The card type
 * @returns {Function|undefined} React component
 */
const getCreditCardIcon = type => {
  if (!type) {
    return undefined;
  }
  return {
    // Visa
    visa: _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.VisaIcon,
    // MasterCard
    mastercard: _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.MastercardIcon,
    'master card': _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.MastercardIcon,
    // American Express
    'american express': _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.AmexIcon,
    'american-express': _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.AmexIcon,
    amex: _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.AmexIcon,
    // Discover
    discover: _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.DiscoverIcon
  }[type.toLowerCase()];
};

/**
 * Returns the card type string in the format the SDK expects.
 * @param {string} - The card type as given by our cc validator
 * @returns {string|undefined} - The card type in a format expected by the SDK
 */
const getPaymentInstrumentCardType = type => {
  if (!type) {
    return undefined;
  }
  return {
    visa: 'Visa',
    mastercard: 'Master Card',
    'american-express': 'Amex',
    discover: 'Discover'
  }[type];
};

/**
 * Returns the masked credit card number by removing white spaces,
 * replacing all digits except the last 4 using the '*' character.
 * @param cardNumber - The card number unmasked
 * @returns {string} - The masked card number
 */
const getMaskCreditCardNumber = cardNumber => {
  const trimmedCardNumber = cardNumber.replace(/\s/g, '');
  const maskedDigits = trimmedCardNumber.slice(0, -4).replace(/\d/g, '*');
  const lastFourDigits = trimmedCardNumber.slice(-4);
  return maskedDigits + lastFourDigits;
};
const createCreditCardPaymentBodyFromForm = paymentFormData => {
  // Using destructuring to omit properties
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
      expiry,
      paymentInstrumentId
    } = paymentFormData,
    selectedPayment = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(paymentFormData, _excluded);

  // The form gives us the expiration date as `MM/YY` - so we need to split it into
  // month and year to submit them as individual fields.
  const [expirationMonth, expirationYear] = expiry.split('/');
  return {
    paymentMethodId: 'CREDIT_CARD',
    paymentCard: _objectSpread(_objectSpread({}, selectedPayment), {}, {
      number: selectedPayment.number.replace(/ /g, ''),
      cardType: getPaymentInstrumentCardType(selectedPayment.cardType),
      expirationMonth: parseInt(expirationMonth),
      expirationYear: parseInt(`20${expirationYear}`),
      // TODO: These fields are required for saving the card to the customer's
      // account. Im not sure what they are for or how to get them, so for now
      // we're just passing some values to make it work. Need to investigate.
      issueNumber: '',
      validFromMonth: 1,
      validFromYear: 2020
    })
  };
};

/***/ }),

/***/ "./app/utils/phone-utils.js":
/*!**********************************!*\
  !*** ./app/utils/phone-utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatPhoneNumber: () => (/* binding */ formatPhoneNumber)
/* harmony export */ });
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Formats the given phone number to add spaces and symbols
 * @param {string} - Phone number to be formatted
 * @returns {string}  - Formatted phone number
 */
const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

/***/ })

}]);
//# sourceMappingURL=app_components_action-card_index_jsx-app_components_address-display_index_jsx-app_components_-8b77ee.js.map