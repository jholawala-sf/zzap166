"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-order-status"],{

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

/***/ "./overlays/guest-order-lookup/app/hooks/useGuestOrder.js":
/*!****************************************************************!*\
  !*** ./overlays/guest-order-lookup/app/hooks/useGuestOrder.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/lib/useQuery.esm.js");
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-multi-site */ "./app/hooks/use-multi-site.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/utils/url */ "./node_modules/@salesforce/pwa-kit-react-sdk/utils/url.js");







const useGuestOrder = ({
  orderNumber,
  orderEmailAddress,
  orderPostalCode
}) => {
  const {
    app: {
      commerceAPI
    }
  } = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_1__.getConfig)();
  const {
    parameters: {
      organizationId
    }
  } = commerceAPI;
  const appOrigin = (0,_salesforce_pwa_kit_react_sdk_utils_url__WEBPACK_IMPORTED_MODULE_5__.getAppOrigin)();
  const {
    site
  } = (0,_salesforce_retail_react_app_app_hooks_use_multi_site__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const {
    getTokenWhenReady
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useAccessToken)();
  return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_6__.useQuery)({
    queryKey: ['custom', 'guestOrder', 'lookup', orderNumber, orderEmailAddress, orderPostalCode],
    queryFn: function () {
      var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const urlParams = new URLSearchParams();
        urlParams.append('siteId', site.id);
        urlParams.append('c_email', orderEmailAddress);
        urlParams.append('c_postalCode', orderPostalCode);
        const token = yield getTokenWhenReady();
        const response = yield fetch(`${appOrigin}/${commerceAPI.proxyPath.replace(/^\/|\/$/g, '')}/custom/guest-order/v1/organizations/${organizationId}/${orderNumber}?${urlParams.toString()}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`Could not load order: ${response.status}`);
        }
        const data = yield response.json();
        return (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_4__.keysToCamel)(data.order);
      });
      return function queryFn() {
        return _ref.apply(this, arguments);
      };
    }(),
    enabled: !!(orderNumber && orderEmailAddress && orderPostalCode)
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useGuestOrder);

/***/ }),

/***/ "./overlays/guest-order-lookup/app/components/forms/order-status-fields.jsx":
/*!**********************************************************************************!*\
  !*** ./overlays/guest-order-lookup/app/components/forms/order-status-fields.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-ZHMYA64R.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useOrderStatusFields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useOrderStatusFields */ "./overlays/guest-order-lookup/app/components/forms/useOrderStatusFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const OrderStatusFields = ({
  form,
  prefix = ''
}) => {
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useOrderStatusFields__WEBPACK_IMPORTED_MODULE_1__["default"])({
    form,
    prefix
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_2__["default"], fields.orderNumber), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_2__["default"], fields.orderEmailAddress), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_2__["default"], fields.orderPostalCode));
};
OrderStatusFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderStatusFields);

/***/ }),

/***/ "./overlays/guest-order-lookup/app/components/forms/useOrderStatusFields.jsx":
/*!***********************************************************************************!*\
  !*** ./overlays/guest-order-lookup/app/components/forms/useOrderStatusFields.jsx ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useOrderStatusFields)
/* harmony export */ });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

function useOrderStatusFields({
  form: {
    control,
    formState
  },
  prefix = ''
}) {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const fields = {
    orderNumber: {
      name: `${prefix}orderNumber`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Order Number"
        }],
        id: "use_order_status_fields.label.order_number"
      }),
      placeholder: '123456789',
      defaultValue: '',
      type: 'text',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your order number."
          }],
          id: "use_order_status_fields.error.required_order_number"
        })
      },
      error: formState.errors[`${prefix}orderNumber`],
      control
    },
    orderEmailAddress: {
      name: `${prefix}orderEmailAddress`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Order Email Address"
        }],
        id: "use_order_status_fields.label.order_email_address"
      }),
      placeholder: 'you@email.com',
      defaultValue: '',
      type: 'email',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter the email address associated with your order."
          }],
          id: "use_order_status_fields.error.required_order_email_address"
        })
      },
      error: formState.errors[`${prefix}orderEmailAddress`],
      control
    },
    orderPostalCode: {
      name: `${prefix}orderPostalCode`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Order Postal Code"
        }],
        id: "use_order_status_fields.label.order_postal_code"
      }),
      placeholder: '12345',
      defaultValue: '',
      type: 'text',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter the postal code associated with your order."
          }],
          id: "use_order_status_fields.error.required_order_postal_code"
        })
      },
      error: formState.errors[`${prefix}orderPostalCode`],
      control
    }
  };
  return fields;
}

/***/ }),

/***/ "./overlays/guest-order-lookup/app/components/order-status/index.jsx":
/*!***************************************************************************!*\
  !*** ./overlays/guest-order-lookup/app/components/order-status/index.jsx ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-ZHMYA64R.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/alert/dist/chunk-3KCBMPN5.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_order_status_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/order-status-fields */ "./overlays/guest-order-lookup/app/components/forms/order-status-fields.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







const OrderStatusForm = ({
  submitForm,
  form
}) => {
  var _form$formState, _form$formState$error;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    id: "order-status-form",
    onSubmit: form.handleSubmit(submitForm),
    "data-testid": "sf-check-order-status-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 8,
    paddingLeft: 4,
    paddingRight: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {
    align: "center",
    fontSize: "xl",
    fontWeight: "semibold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Check Order Status"
    }],
    id: "order_status_form.message.check_order_status"
  })), ((_form$formState = form.formState) === null || _form$formState === void 0 ? void 0 : (_form$formState$error = _form$formState.errors) === null || _form$formState$error === void 0 ? void 0 : _form$formState$error.global) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Alert, {
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_1__.AlertIcon, {
    color: "red.500",
    boxSize: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    ml: 3
  }, form.formState.errors.global.message)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_forms_order_status_fields__WEBPACK_IMPORTED_MODULE_2__["default"], {
    form: form
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {
    type: "submit",
    onClick: () => form.clearErrors('global'),
    isLoading: form.formState.isSubmitting
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Find Your Order"
    }],
    id: "order_status_form.button.find_your_order"
  }))))));
};
OrderStatusForm.propTypes = {
  submitForm: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func),
  form: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderStatusForm);

/***/ }),

/***/ "./overlays/guest-order-lookup/app/pages/order-status/index.jsx":
/*!**********************************************************************!*\
  !*** ./overlays/guest-order-lookup/app/pages/order-status/index.jsx ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-5MKCW436.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/seo */ "./app/components/seo/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_useGuestOrder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/useGuestOrder */ "./overlays/guest-order-lookup/app/hooks/useGuestOrder.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_order_status__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/order-status */ "./overlays/guest-order-lookup/app/components/order-status/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_order_status_order_status_detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/order-status/order-status-detail */ "./overlays/guest-order-lookup/app/pages/order-status/order-status-detail.jsx");

/*
 * Copyright (c) 2024, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */










const OrderStatus = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_7__.useForm)();
  const [orderSearchData, setOrderSearchData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
  const guestOrder = (0,_salesforce_retail_react_app_app_hooks_useGuestOrder__WEBPACK_IMPORTED_MODULE_3__["default"])(orderSearchData);
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
      setOrderSearchData(data);
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (guestOrder.isError) {
      const message = formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "We could not find an order using the details you provided."
        }],
        id: "order_status_page.error.incorrect_order_details"
      });
      form.setError('global', {
        type: 'manual',
        message
      });
    } else {
      form.clearErrors('global');
    }
  }, [guestOrder.error]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Box, {
    "data-testid": "order-status-page",
    bg: guestOrder.loaded ? 'white' : 'gray.50',
    py: [8, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    title: "Check Order Status",
    description: "Check the status of your order"
  }), guestOrder.isSuccess ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Container, {
    maxWidth: "container.lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_order_status_order_status_detail__WEBPACK_IMPORTED_MODULE_5__["default"], {
    order: guestOrder.data,
    reset: () => {
      form.reset();
      setOrderSearchData({});
    }
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.Container, {
    paddingTop: 16,
    width: ['100%', '407px'],
    bg: "white",
    paddingBottom: 14,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_order_status__WEBPACK_IMPORTED_MODULE_4__["default"], {
    form: form,
    submitForm: submitForm
  })));
};
OrderStatus.getTemplateName = () => 'order-status';
OrderStatus.propTypes = {
  match: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderStatus);

/***/ }),

/***/ "./overlays/guest-order-lookup/app/pages/order-status/order-status-detail.jsx":
/*!************************************************************************************!*\
  !*** ./overlays/guest-order-lookup/app/pages/order-status/order-status-detail.jsx ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-ZHMYA64R.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-7OLJDQMT.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-W7WUSNWJ.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-Z6RXEUPO.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/skeleton/dist/chunk-GOJLRND4.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-JARCRF6W.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-NEK3OOAM.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/cc-utils */ "./app/utils/cc-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/order-summary */ "./app/components/order-summary/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-image */ "./app/components/item-variant/item-image.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-name */ "./app/components/item-variant/item-name.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-attributes */ "./app/components/item-variant/item-attributes.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-price */ "./app/components/item-variant/item-price.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2024, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */















const OrderStatusDetail = ({
  order,
  reset
}) => {
  var _order$paymentInstrum, _order$productItems;
  const {
    formatMessage,
    formatDate
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const shipment = order === null || order === void 0 ? void 0 : order.shipments[0];
  const {
    shippingAddress,
    shippingMethod,
    shippingStatus,
    trackingNumber
  } = shipment || {};
  const paymentCard = order === null || order === void 0 ? void 0 : (_order$paymentInstrum = order.paymentInstruments[0]) === null || _order$paymentInstrum === void 0 ? void 0 : _order$paymentInstrum.paymentCard;
  const CardIcon = (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_2__.getCreditCardIcon)(paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.cardType);
  const itemCount = order === null || order === void 0 ? void 0 : order.productItems.reduce((count, item) => item.quantity + count, 0);
  const ids = (order === null || order === void 0 ? void 0 : order.productItems.map(item => item.productId).join(',')) ?? '';
  const {
    data: {
      data: products
    } = {},
    isLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__.useProducts)({
    parameters: {
      ids: ids
    }
  }, {
    enabled: !!ids
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 6,
    "data-testid": "order-status-detail-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_15__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__["default"],
    to: `/order-status`,
    variant: "link",
    leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronLeftIcon, null),
    size: "sm",
    onClick: () => {
      reset();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Back"
    }],
    id: "order_status_page.link.back"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: [1, 2]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__.Heading, {
    as: "h1",
    fontSize: ['lg', '2xl']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Details"
    }],
    id: "account_order_detail.title.order_details"
  })), !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    direction: ['column', 'row'],
    alignItems: ['flex-start', 'center'],
    spacing: [0, 3],
    divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.Divider, {
      visibility: {
        base: 'hidden',
        lg: 'visible'
      },
      orientation: {
        lg: 'vertical'
      },
      h: [0, 4]
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
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
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    direction: "row",
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
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
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_20__.Badge, {
    colorScheme: "green"
  }, order.status))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "192px"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, {
    layerStyle: "cardBordered"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_22__.Grid, {
    templateColumns: {
      base: '1fr',
      xl: '60% 1fr'
    },
    gap: {
      base: 6,
      xl: 2
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_23__.SimpleGrid, {
    columns: {
      base: 1,
      sm: 2
    },
    columnGap: 4,
    rowGap: 5,
    py: {
      xl: 6
    }
  }, isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "56px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "56px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "56px"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "60px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "56px"
  }))), !isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontWeight: "bold",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Method"
    }],
    id: "account_order_detail.heading.shipping_method"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm",
    textTransform: "titlecase"
  }, shippingStatus.replace(/_/g, ' ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, shippingMethod.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
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
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontWeight: "bold",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Payment Method"
    }],
    id: "account_order_detail.heading.payment_method"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    direction: "row"
  }, CardIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(CardIcon, {
    layerStyle: "ccIcon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.cardType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    direction: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, "\u2022\u2022\u2022\u2022", ' ', paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.numberLastDigits), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.expirationMonth, "/", paymentCard === null || paymentCard === void 0 ? void 0 : paymentCard.expirationYear))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontWeight: "bold",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Address"
    }],
    id: "account_order_detail.heading.shipping_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, shippingAddress.firstName, " ", shippingAddress.lastName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, shippingAddress.address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, shippingAddress.city, ", ", shippingAddress.stateCode, ' ', shippingAddress.postalCode))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontWeight: "bold",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Billing Address"
    }],
    id: "account_order_detail.heading.billing_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, order.billingAddress.firstName, ' ', order.billingAddress.lastName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, order.billingAddress.address1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, {
    fontSize: "sm"
  }, order.billingAddress.city, ",", ' ', order.billingAddress.stateCode, ' ', order.billingAddress.postalCode))))), !isLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, {
    py: {
      base: 6
    },
    px: {
      base: 6,
      xl: 8
    },
    background: "gray.50",
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_5__["default"], {
    basket: order,
    fontSize: "sm"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "full"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 4
  }, !isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_19__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__["default"], {
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
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 4
  }, isLoading && [1, 2, 3].map(i => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, {
    key: i,
    p: [4, 6],
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_24__.Flex, {
    width: "full",
    align: "flex-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    boxSize: ['88px', 36],
    mr: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_21__.Skeleton, {
    h: "20px",
    w: "140px"
  }))))), !isLoading && ((_order$productItems = order.productItems) === null || _order$productItems === void 0 ? void 0 : _order$productItems.map((product, idx) => {
    const variant = _objectSpread(_objectSpread(_objectSpread({}, product), products.find(p => p.id === product.productId)), {}, {
      price: product.price
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.Box, {
      p: [4, 6],
      key: product.productId,
      border: "1px solid",
      borderColor: "gray.100",
      borderRadius: "base"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_6__["default"], {
      index: idx,
      variant: variant,
      currency: order.currency
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_24__.Flex, {
      width: "full",
      alignItems: "flex-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_7__["default"], {
      width: ['88px', 36],
      mr: 4
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.Stack, {
      spacing: 1,
      marginTop: "-3px",
      flex: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_24__.Flex, {
      width: "full",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_9__["default"], {
      includeQuantity: true,
      currency: order.currency
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_10__["default"], {
      currency: order.currency
    }))))));
  })))));
};
OrderStatusDetail.getTemplateName = () => 'order-status-detail';
OrderStatusDetail.propTypes = {
  order: (prop_types__WEBPACK_IMPORTED_MODULE_25___default().object),
  reset: (prop_types__WEBPACK_IMPORTED_MODULE_25___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderStatusDetail);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-order-status.js.map