"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-checkout"],{

/***/ "./app/components/confirmation-modal/index.jsx":
/*!*****************************************************!*\
  !*** ./app/components/confirmation-modal/index.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/constant */ "./app/pages/account/constant.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");


const _excluded = ["dialogTitle", "confirmationMessage", "primaryActionLabel", "primaryActionAriaLabel", "alternateActionLabel", "alternateActionAriaLabel", "hideAlternateAction", "onPrimaryAction", "onAlternateAction"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const ConfirmationModal = _ref => {
  let {
      dialogTitle = _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__.CONFIRMATION_DIALOG_DEFAULT_CONFIG.dialogTitle,
      confirmationMessage = _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__.CONFIRMATION_DIALOG_DEFAULT_CONFIG.confirmationMessage,
      primaryActionLabel = _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__.CONFIRMATION_DIALOG_DEFAULT_CONFIG.primaryActionLabel,
      primaryActionAriaLabel = _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__.CONFIRMATION_DIALOG_DEFAULT_CONFIG.primaryActionAriaLabel,
      alternateActionLabel = _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__.CONFIRMATION_DIALOG_DEFAULT_CONFIG.alternateActionLabel,
      alternateActionAriaLabel = _salesforce_retail_react_app_app_pages_account_constant__WEBPACK_IMPORTED_MODULE_5__.CONFIRMATION_DIALOG_DEFAULT_CONFIG.alternateActionAriaLabel,
      hideAlternateAction = false,
      onPrimaryAction = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_3__.noop,
      onAlternateAction = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_3__.noop
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const handleConfirmClick = () => {
    onPrimaryAction();
    props.onClose();
  };
  const handleAlternateActionClick = () => {
    onAlternateAction();
    props.onClose();
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertDialog, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    isOpen: props.isOpen,
    isCentered: true,
    onClose: handleAlternateActionClick
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertDialogOverlay, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertDialogContent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertDialogHeader, null, formatMessage(dialogTitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertDialogBody, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, null, formatMessage(confirmationMessage))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.AlertDialogFooter, null, !hideAlternateAction ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "ghost",
    mr: 3,
    "aria-label": formatMessage(alternateActionAriaLabel),
    onClick: handleAlternateActionClick
  }, formatMessage(alternateActionLabel)) : null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "solid",
    onClick: handleConfirmClick,
    "aria-label": formatMessage(primaryActionAriaLabel)
  }, formatMessage(primaryActionLabel)))));
};
ConfirmationModal.propTypes = {
  /**
   * Prop to check if modal is open
   */
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool).isRequired,
  /**
   * Callback invoked to open the modal
   */
  onOpen: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func).isRequired,
  /**
   * Callback invoked to close the modal
   */
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func).isRequired,
  /**
   * Text to be displayed as modal header
   */
  dialogTitle: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /**
   * Text to display in confirmation modal prompting user to pick an action
   */
  confirmationMessage: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /**
   * Button Label for primary action in confirmation modal
   */
  primaryActionLabel: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /**
   * Button aria Label for primary action
   */
  primaryActionAriaLabel: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /**
   * Button Label for alternate or secondary action in confirmation modal
   */
  alternateActionLabel: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /**
   * Button aria Label for alternate or secondary action in confirmation modal
   */
  alternateActionAriaLabel: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  /**
   * Action to execute if user selects primary action
   */
  onPrimaryAction: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
  /**
   * Action to execute if user selects alternate or secondary action
   */
  onAlternateAction: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func),
  /**
   * Flag to hide of show alternative button
   */
  hideAlternateAction: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ConfirmationModal);

/***/ }),

/***/ "./app/components/forms/credit-card-fields.jsx":
/*!*****************************************************!*\
  !*** ./app/components/forms/credit-card-fields.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var card_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! card-validator */ "./node_modules/card-validator/dist/index.js");
/* harmony import */ var card_validator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(card_validator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/cc-utils */ "./app/utils/cc-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useCreditCardFields__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useCreditCardFields */ "./app/components/forms/useCreditCardFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */









const CreditCardFields = ({
  form,
  prefix = ''
}) => {
  var _form$getValues$numbe;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const [isTooltipOpen, setIsTooltipOpen] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useCreditCardFields__WEBPACK_IMPORTED_MODULE_6__["default"])({
    form,
    prefix
  });

  // Rerender the fields when we `cardType` changes so the detected
  // card icon appears while typing the card number.
  // https://react-hook-form.com/api#watch
  const cardType = form.watch('cardType');
  const CardIcon = (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_5__.getCreditCardIcon)(form.getValues().cardType);

  // Note: The ternary should NOT be placed inside a call to `formatMessage`. The message
  // extraction script (`npm run extract-default-translations`) only works when `formatMessage` is
  // used with object literals.
  const securityCodeTooltipLabel = cardType === 'american-express' ? formatMessage({
    id: "credit_card_fields.tool_tip.security_code.american_express",
    defaultMessage: [{
      "type": 0,
      "value": "This 4-digit code can be found on the front of your card."
    }]
  }) : formatMessage({
    id: "credit_card_fields.tool_tip.security_code",
    defaultMessage: [{
      "type": 0,
      "value": "This 3-digit code can be found on the back of your card."
    }]
  });
  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
    if (document) {
      document.removeEventListener('click', handleTooltipClose);
      document.removeEventListener('keydown', handleTooltipClose);
    }
  };
  const handleTooltipOpen = () => {
    setIsTooltipOpen(true);
    if (document) {
      document.addEventListener('click', handleTooltipClose);
      document.addEventListener('keydown', handleTooltipClose);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_7__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, fields.number, {
    formLabel: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, {
      justify: "space-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.FormLabel, null, fields.number.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
      direction: "row",
      spacing: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.VisaIcon, {
      layerStyle: "ccIcon"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.MastercardIcon, {
      layerStyle: "ccIcon"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.AmexIcon, {
      layerStyle: "ccIcon"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.DiscoverIcon, {
      layerStyle: "ccIcon"
    }))),
    inputProps: ({
      onChange
    }) => _objectSpread(_objectSpread({}, fields.number.inputProps), {}, {
      onChange(evt) {
        const number = evt.target.value.replace(/[^0-9 ]+/, '');
        const {
          card
        } = card_validator__WEBPACK_IMPORTED_MODULE_3___default().number(number);
        const formattedNumber = card ? (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_5__.formatCreditCardNumber)(number, card) : number;
        form.setValue('cardType', (card === null || card === void 0 ? void 0 : card.type) || '');
        return onChange(formattedNumber);
      }
    })
  }), CardIcon && ((_form$getValues$numbe = form.getValues().number) === null || _form$getValues$numbe === void 0 ? void 0 : _form$getValues$numbe.length) > 2 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.InputRightElement, {
    width: "60px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(CardIcon, {
    layerStyle: "ccIcon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_7__["default"], fields.holder), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.SimpleGrid, {
    columns: [2, 2, 3],
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_7__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, fields.expiry, {
    inputProps: ({
      onChange
    }) => _objectSpread(_objectSpread({}, fields.expiry.inputProps), {}, {
      onChange(evt) {
        let value = evt.target.value.replace('/', '');

        // We ignore input values other than digits and `/`.
        if (value.match(/[^\d|/]/g)) {
          return;
        }

        // Ignore input when we already have MM/YY
        if (value.length > 4) {
          return;
        }
        if (value.length >= 2) {
          value = `${value.substr(0, 2)}/${value.substr(2)}`;
        }
        return onChange(value);
      },
      onKeyDown(evt) {
        if (evt.keyCode === 8 || evt.keyCode === 46) {
          evt.preventDefault();
          return onChange(evt.target.value.slice(0, -1));
        }
      }
    })
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_7__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, fields.securityCode, {
    formLabel: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.FormLabel, {
      display: "inline",
      mr: 1
    }, fields.securityCode.label), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
      onMouseEnter: handleTooltipOpen,
      onFocus: handleTooltipOpen,
      as: "span"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
      hasArrow: true,
      placement: "top",
      label: securityCodeTooltipLabel,
      shouldWrapChildren: true,
      isOpen: isTooltipOpen
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_8__.InfoIcon, {
      boxSize: 5,
      color: "gray.700",
      "aria-label": formatMessage({
        id: "credit_card_fields.tool_tip.security_code_aria_label",
        defaultMessage: [{
          "type": 0,
          "value": "Security code info"
        }]
      })
    }))))
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_7__["default"], fields.cardType));
};
CreditCardFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CreditCardFields);

/***/ }),

/***/ "./app/components/forms/useCreditCardFields.jsx":
/*!******************************************************!*\
  !*** ./app/components/forms/useCreditCardFields.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useCreditCardFields)
/* harmony export */ });
/* harmony import */ var card_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! card-validator */ "./node_modules/card-validator/dist/index.js");
/* harmony import */ var card_validator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(card_validator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


const messages = (0,react_intl__WEBPACK_IMPORTED_MODULE_1__.defineMessages)({
  required: {
    defaultMessage: [{
      "type": 0,
      "value": "Required"
    }],
    id: "use_credit_card_fields.error.required"
  },
  cardNumberInvalid: {
    defaultMessage: [{
      "type": 0,
      "value": "Please enter a valid card number."
    }],
    id: "use_credit_card_fields.error.valid_card_number"
  },
  nameInvalid: {
    defaultMessage: [{
      "type": 0,
      "value": "Please enter a valid name."
    }],
    id: "use_credit_card_fields.error.valid_name"
  },
  dateInvalid: {
    defaultMessage: [{
      "type": 0,
      "value": "Please enter a valid date."
    }],
    id: "use_credit_card_fields.error.valid_date"
  },
  codeInvalid: {
    defaultMessage: [{
      "type": 0,
      "value": "Please enter a valid security code."
    }],
    id: "use_credit_card_fields.error.valid_security_code"
  },
  cardNumber: {
    defaultMessage: [{
      "type": 0,
      "value": "Card Number"
    }],
    id: "use_credit_card_fields.label.card_number"
  },
  cardType: {
    defaultMessage: [{
      "type": 0,
      "value": "Card Type"
    }],
    id: "use_credit_card_fields.label.card_type"
  },
  cardName: {
    defaultMessage: [{
      "type": 0,
      "value": "Name on Card"
    }],
    id: "use_credit_card_fields.label.name"
  },
  expiryDate: {
    defaultMessage: [{
      "type": 0,
      "value": "Expiration Date"
    }],
    id: "use_credit_card_fields.label.expiry"
  },
  securityCode: {
    defaultMessage: [{
      "type": 0,
      "value": "Security Code"
    }],
    id: "use_credit_card_fields.label.security_code"
  }
});

/**
 * A React hook that provides the field definitions for a credit card form.
 * @param {Object} form - The object returned from `useForm`
 * @param {Object} form.control - The form control object
 * @param {Object} form.errors - An object containing field errors
 * @returns {Object} Field definitions for use in a form
 */
function useCreditCardFields({
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
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const fields = {
    number: {
      name: `${prefix}number`,
      label: formatMessage(messages.cardNumber),
      defaultValue: '',
      type: 'text',
      autoComplete: 'cc-number',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your card number."
          }],
          id: "use_credit_card_fields.error.required_card_number"
        }),
        validate: value => card_validator__WEBPACK_IMPORTED_MODULE_0___default().number(value).isValid || formatMessage(messages.cardNumberInvalid)
      },
      error: errors[`${prefix}number`],
      inputProps: {
        inputMode: 'numeric'
      },
      control
    },
    cardType: {
      name: `${prefix}cardType`,
      label: formatMessage(messages.cardType),
      defaultValue: '',
      type: 'hidden',
      error: errors[`${prefix}cardType`],
      control
    },
    holder: {
      name: `${prefix}holder`,
      label: formatMessage(messages.cardName),
      defaultValue: '',
      type: 'text',
      autoComplete: 'cc-name',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your name as shown on your card."
          }],
          id: "use_credit_card_fields.error.required_name"
        }),
        validate: value => card_validator__WEBPACK_IMPORTED_MODULE_0___default().cardholderName(value).isValid || formatMessage(messages.nameInvalid)
      },
      error: errors[`${prefix}holder`],
      control
    },
    expiry: {
      name: `${prefix}expiry`,
      label: formatMessage(messages.expiryDate),
      defaultValue: '',
      type: 'text',
      autoComplete: 'cc-exp',
      placeholder: 'MM/YY',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your expiration date."
          }],
          id: "use_credit_card_fields.error.required_expiry"
        }),
        validate: value => card_validator__WEBPACK_IMPORTED_MODULE_0___default().expirationDate(value).isValid || formatMessage(messages.dateInvalid)
      },
      error: errors[`${prefix}expiry`],
      inputProps: {
        inputMode: 'numeric'
      },
      control
    },
    securityCode: {
      name: `${prefix}securityCode`,
      label: formatMessage(messages.securityCode),
      defaultValue: '',
      type: 'password',
      // turn it off for security
      autoComplete: 'off',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please enter your security code."
          }],
          id: "use_credit_card_fields.error.required_security_code"
        }),
        validate: value => card_validator__WEBPACK_IMPORTED_MODULE_0___default().cvv(value).isValid || formatMessage(messages.codeInvalid)
      },
      error: errors[`${prefix}securityCode`],
      inputProps: ({
        onChange
      }) => ({
        inputMode: 'numeric',
        maxLength: 4,
        onChange(evt) {
          onChange(evt.target.value.replace(/[^0-9 ]+/, ''));
        }
      }),
      control
    }
  };
  return fields;
}

/***/ }),

/***/ "./app/components/radio-card/index.jsx":
/*!*********************************************!*\
  !*** ./app/components/radio-card/index.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RadioCard: () => (/* binding */ RadioCard),
/* harmony export */   RadioCardGroup: () => (/* binding */ RadioCardGroup)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




const RadioCardGroupContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext();
const RadioCard = props => {
  const getRadioGroupProps = react__WEBPACK_IMPORTED_MODULE_1___default().useContext(RadioCardGroupContext);
  const {
    getInputProps,
    getRadioProps
  } = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useRadio)(getRadioGroupProps(props));
  const input = getInputProps();
  const checkbox = getRadioProps();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    as: "label"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", input), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, checkbox, {
    "aria-hidden": false,
    position: "relative",
    cursor: "pointer",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "base",
    height: "full",
    _checked: {
      borderColor: 'blue.600'
    },
    _focus: {
      boxShadow: 'outline'
    },
    px: 4,
    py: 4
  }), input.checked && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    position: "absolute",
    top: 0,
    right: 0,
    w: 0,
    h: 0,
    borderStyle: "solid",
    borderWidth: "0 38px 38px 0",
    borderColor: "transparent",
    borderRightColor: "blue.600"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.CheckIcon, {
    color: "white",
    position: "absolute",
    right: "-40px",
    top: "1px"
  })), props.children));
};
const RadioCardGroup = props => {
  const {
    getRootProps,
    getRadioProps
  } = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useRadioGroup)(props);
  const group = getRootProps();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(RadioCardGroupContext.Provider, {
    value: getRadioProps
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, group, props.children));
};
RadioCard.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().any)
};
RadioCardGroup.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().any)
};

/***/ }),

/***/ "./app/components/unavailable-product-confirmation-modal/index.jsx":
/*!*************************************************************************!*\
  !*** ./app/components/unavailable-product-confirmation-modal/index.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_confirmation_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/confirmation-modal */ "./app/components/confirmation-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");


/*
 * Copyright (c) 2024, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */









/**
 * This Component determines if the provided products have become unavailable or out of stock or low stock that
 * can't be fulfilled and will prompt the users to remove them before proceeding any further
 *
 * @param productIds -  list of product ids to check for availability. This prop will be deprecated in the upcoming release.
 * Please use productItems prop
 * @param productItems -  basket product items. This will be ignored if productIds is passed
 * @param handleUnavailableProducts - callback function to handle what to do with unavailable products
 * @returns {JSX.Element} -  Conformation Modal Component
 *
 */
const UnavailableProductConfirmationModal = ({
  productIds = [],
  productItems = [],
  handleUnavailableProducts = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_7__.noop
}) => {
  const unavailableProductIdsRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const ids = productIds.length ? productIds : productItems.map(i => i.productId);
  (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_3__.useProducts)({
    parameters: {
      ids: ids === null || ids === void 0 ? void 0 : ids.join(','),
      allImages: true
    }
  }, {
    enabled: (ids === null || ids === void 0 ? void 0 : ids.length) > 0,
    onSuccess: result => {
      var _result$data;
      const resProductIds = [];
      const unOrderableIds = [];
      (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.forEach(({
        id,
        inventory
      }) => {
        // when a product is unavailable, the getProducts will not return its product detail.
        // we compare the response ids with the ones in basket to figure which product has become unavailable
        resProductIds.push(id);

        // when a product is orderable, but the quantity in the basket is more than the remaining stock
        // we want to make sure it is removed before go to checkout page to avoid error when placing order
        // we don't need to remove low stock/ out of stock from wishlist
        if (productItems.length) {
          const productItem = productItems.find(item => item.productId === id);
          // wishlist item will have the property type
          const isWishlist = !!(productItem !== null && productItem !== void 0 && productItem.type);
          if (!isWishlist && (!(inventory !== null && inventory !== void 0 && inventory.orderable) || inventory !== null && inventory !== void 0 && inventory.orderable && (productItem === null || productItem === void 0 ? void 0 : productItem.quantity) > inventory.stockLevel)) {
            unOrderableIds.push(id);
          }
        }
      });
      const unavailableProductIds = ids.filter(id => !resProductIds.includes(id) || unOrderableIds.includes(id));
      unavailableProductIdsRef.current = unavailableProductIds;
    }
  });
  const unavailableProductsModalProps = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_6__.useDisclosure)();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    var _unavailableProductId;
    if (((_unavailableProductId = unavailableProductIdsRef.current) === null || _unavailableProductId === void 0 ? void 0 : _unavailableProductId.length) > 0) {
      unavailableProductsModalProps.onOpen();
    }
  }, [unavailableProductIdsRef.current]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_confirmation_modal__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "data-testid": "unavailable-product-modal",
    closeOnEsc: false,
    closeOnOverlayClick: false
  }, _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_4__.REMOVE_UNAVAILABLE_CART_ITEM_DIALOG_CONFIG, {
    hideAlternateAction: true,
    onPrimaryAction: /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
      yield handleUnavailableProducts(unavailableProductIdsRef.current);
      unavailableProductIdsRef.current = null;
      unavailableProductsModalProps.onClose();
    }),
    onAlternateAction: () => {}
  }, unavailableProductsModalProps));
};
UnavailableProductConfirmationModal.propTypes = {
  productItems: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().array),
  productIds: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().array),
  handleUnavailableProducts: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UnavailableProductConfirmationModal);

/***/ }),

/***/ "./app/pages/checkout/index.jsx":
/*!**************************************!*\
  !*** ./app/pages/checkout/index.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/util/checkout-context */ "./app/pages/checkout/util/checkout-context.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_contact_info__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/contact-info */ "./overlays/passwordless-login/app/pages/checkout/partials/contact-info.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_shipping_address__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/shipping-address */ "./app/pages/checkout/partials/shipping-address.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_shipping_options__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/shipping-options */ "./app/pages/checkout/partials/shipping-options.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_payment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/payment */ "./app/pages/checkout/partials/payment.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/order-summary */ "./app/components/order-summary/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_checkout_skeleton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/checkout-skeleton */ "./app/pages/checkout/partials/checkout-skeleton.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _salesforce_retail_react_app_app_components_unavailable_product_confirmation_modal__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/unavailable-product-confirmation-modal */ "./app/components/unavailable-product-confirmation-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



















const Checkout = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_19__["default"])();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const {
    step
  } = (0,_salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_4__.useCheckout)();
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_11__.useCurrentBasket)();
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    mutateAsync: createOrder
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_13__.useShopperOrdersMutation)('createOrder');
  const {
    passwordless = {},
    social = {}
  } = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_18__.getConfig)().app.login || {};
  const idps = social === null || social === void 0 ? void 0 : social.idps;
  const isSocialEnabled = !!(social !== null && social !== void 0 && social.enabled);
  const isPasswordlessEnabled = !!(passwordless !== null && passwordless !== void 0 && passwordless.enabled);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (error || step === 4) {
      window.scrollTo({
        top: 0
      });
    }
  }, [error, step]);
  const submitOrder = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      setIsLoading(true);
      try {
        const order = yield createOrder({
          body: {
            basketId: basket.basketId
          }
        });
        navigate(`/checkout/confirmation/${order.orderNo}`);
      } catch (error) {
        const message = formatMessage({
          id: "checkout.message.generic_error",
          defaultMessage: [{
            "type": 0,
            "value": "An unexpected error occurred during checkout."
          }]
        });
        setError(message);
      } finally {
        setIsLoading(false);
      }
    });
    return function submitOrder() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    background: "gray.50",
    flex: "1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    "data-testid": "sf-checkout-container",
    maxWidth: "container.xl",
    py: {
      base: 7,
      lg: 16
    },
    px: {
      base: 0,
      lg: 8
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Grid, {
    templateColumns: {
      base: '1fr',
      lg: '66% 1fr'
    },
    gap: {
      base: 10,
      xl: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.GridItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 4
  }, error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Alert, {
    status: "error",
    variant: "left-accent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertIcon, null), error), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_contact_info__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isSocialEnabled: isSocialEnabled,
    isPasswordlessEnabled: isPasswordlessEnabled,
    idps: idps
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_shipping_address__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_shipping_options__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_payment__WEBPACK_IMPORTED_MODULE_8__["default"], null), step === 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    pt: 3,
    display: {
      base: 'none',
      lg: 'block'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    w: "full",
    onClick: submitOrder,
    isLoading: isLoading,
    "data-testid": "sf-checkout-place-order-btn"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Place Order"
    }],
    id: "checkout.button.place_order"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.GridItem, {
    py: 6,
    px: [4, 4, 4, 0]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_9__["default"], {
    basket: basket,
    showTaxEstimationForm: false,
    showCartItems: true
  }), step === 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    display: {
      base: 'none',
      lg: 'block'
    },
    pt: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    w: "full",
    onClick: submitOrder,
    isLoading: isLoading
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Place Order"
    }],
    id: "checkout.button.place_order"
  })))))), step === 4 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    display: {
      lg: 'none'
    },
    position: "sticky",
    bottom: "0",
    px: 4,
    pt: 6,
    pb: 11,
    background: "white",
    borderTop: "1px solid",
    borderColor: "gray.100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    w: "full",
    onClick: submitOrder,
    isLoading: isLoading
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Place Order"
    }],
    id: "checkout.button.place_order"
  })))));
};
const CheckoutContainer = () => {
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_10__.useCurrentCustomer)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_11__.useCurrentBasket)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_19__["default"])();
  const removeItemFromBasketMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_13__.useShopperBasketsMutation)('removeItemFromBasket');
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_16__.useToast)();
  const [isDeletingUnavailableItem, setIsDeletingUnavailableItem] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const handleRemoveItem = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (product) {
      yield removeItemFromBasketMutation.mutateAsync({
        parameters: {
          basketId: basket.basketId,
          itemId: product.itemId
        }
      }, {
        onSuccess: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_15__.TOAST_MESSAGE_REMOVED_ITEM_FROM_CART, {
              quantity: 1
            }),
            status: 'success'
          });
        },
        onError: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_15__.API_ERROR_MESSAGE),
            status: 'error'
          });
        }
      });
    });
    return function handleRemoveItem(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  const handleUnavailableProducts = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unavailableProductIds) {
      var _basket$productItems;
      setIsDeletingUnavailableItem(true);
      const productItems = basket === null || basket === void 0 ? void 0 : (_basket$productItems = basket.productItems) === null || _basket$productItems === void 0 ? void 0 : _basket$productItems.filter(item => unavailableProductIds === null || unavailableProductIds === void 0 ? void 0 : unavailableProductIds.includes(item.productId));
      for (let item of productItems) {
        yield handleRemoveItem(item);
      }
      setIsDeletingUnavailableItem(false);
    });
    return function handleUnavailableProducts(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  if (!customer || !customer.customerId || !basket || !basket.basketId) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_checkout_skeleton__WEBPACK_IMPORTED_MODULE_12__["default"], null);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_4__.CheckoutProvider, null, isDeletingUnavailableItem && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_17__["default"], {
    wrapperStyles: {
      height: '100vh'
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Checkout, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_unavailable_product_confirmation_modal__WEBPACK_IMPORTED_MODULE_14__["default"], {
    productItems: basket === null || basket === void 0 ? void 0 : basket.productItems,
    handleUnavailableProducts: handleUnavailableProducts
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckoutContainer);

/***/ }),

/***/ "./app/pages/checkout/partials/checkout-skeleton.jsx":
/*!***********************************************************!*\
  !*** ./app/pages/checkout/partials/checkout-skeleton.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */


const CheckoutSkeleton = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    background: "gray.50",
    flex: "1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Container, {
    "data-testid": "sf-checkout-skeleton",
    maxWidth: "container.xl",
    py: {
      base: 7,
      lg: 16
    },
    px: {
      base: 0,
      lg: 4
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Grid, {
    templateColumns: {
      base: '1fr',
      lg: '66% 1fr'
    },
    gap: {
      base: 10,
      lg: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.GridItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: "78px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: "78px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: "78px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: "78px"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.GridItem, {
    py: 6,
    px: [4, 4, 0]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: "30px",
    width: "50%"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: "30px",
    width: "65%"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    w: "full",
    py: 4,
    borderY: "1px",
    borderColor: "gray.200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: 6
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: 6
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: 6
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    height: 6
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckoutSkeleton);

/***/ }),

/***/ "./app/pages/checkout/partials/payment-form.jsx":
/*!******************************************************!*\
  !*** ./app/pages/checkout/partials/payment-form.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_credit_card_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/credit-card-fields */ "./app/components/forms/credit-card-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */








const PaymentForm = ({
  form,
  onSubmit
}) => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_2__.useCurrentBasket)();
  const {
    currency
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_5__.useCurrency)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    onSubmit: form.handleSubmit(onSubmit)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 8
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    border: "1px solid",
    borderColor: "gray.100",
    rounded: "base",
    overflow: "hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.RadioGroup, {
    value: "cc",
    "aria-label": formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Payment"
      }],
      id: "payment_selection.radio_group.assistive_msg"
    }),
    name: "payment-selection"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    py: 3,
    px: [4, 4, 6],
    bg: "gray.50",
    borderBottom: "1px solid",
    borderColor: "gray.100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Radio, {
    value: "cc"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    direction: "row",
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_7__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Credit Card"
    }],
    id: "payment_selection.heading.credit_card"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    hasArrow: true,
    placement: "top",
    label: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "This is a secure SSL encrypted payment."
      }],
      id: "payment_selection.tooltip.secure_payment"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.LockIcon, {
    color: "gray.700",
    boxSize: 5
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_8__.FormattedNumber, {
    value: basket === null || basket === void 0 ? void 0 : basket.orderTotal,
    style: "currency",
    currency: currency
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    p: [4, 4, 6],
    borderBottom: "1px solid",
    borderColor: "gray.100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_forms_credit_card_fields__WEBPACK_IMPORTED_MODULE_4__["default"], {
    form: form
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    py: 3,
    px: [4, 4, 6],
    bg: "gray.50",
    borderColor: "gray.100"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Radio, {
    value: "paypal"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    py: "2px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.PaypalIcon, {
    width: "auto",
    height: "20px"
  })))))))));
};
PaymentForm.propTypes = {
  /** The form object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object),
  /** Callback for form submit */
  onSubmit: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PaymentForm);

/***/ }),

/***/ "./app/pages/checkout/partials/payment.jsx":
/*!*************************************************!*\
  !*** ./app/pages/checkout/partials/payment.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/util/checkout-context */ "./app/pages/checkout/util/checkout-context.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/cc-utils */ "./app/utils/cc-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/toggle-card */ "./app/components/toggle-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_payment_form__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/payment-form */ "./app/pages/checkout/partials/payment-form.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_shipping_address_selection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/shipping-address-selection */ "./app/pages/checkout/partials/shipping-address-selection.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/address-display */ "./app/components/address-display/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_promo_code__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/promo-code */ "./app/components/promo-code/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");




const _excluded = ["removePromoCode"],
  _excluded2 = ["addressId", "creationDate", "lastModified", "preferred"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
















const Payment = () => {
  var _basket$shipments$;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_17__["default"])();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_8__.useCurrentBasket)();
  const selectedShippingAddress = (basket === null || basket === void 0 ? void 0 : basket.shipments) && (basket === null || basket === void 0 ? void 0 : (_basket$shipments$ = basket.shipments[0]) === null || _basket$shipments$ === void 0 ? void 0 : _basket$shipments$.shippingAddress);
  const selectedBillingAddress = basket === null || basket === void 0 ? void 0 : basket.billingAddress;
  const appliedPayment = (basket === null || basket === void 0 ? void 0 : basket.paymentInstruments) && (basket === null || basket === void 0 ? void 0 : basket.paymentInstruments[0]);
  const [billingSameAsShipping, setBillingSameAsShipping] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(true); // By default, have billing addr to be the same as shipping
  const {
    mutateAsync: addPaymentInstrumentToBasket
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_7__.useShopperBasketsMutation)('addPaymentInstrumentToBasket');
  const {
    mutateAsync: updateBillingAddressForBasket
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_7__.useShopperBasketsMutation)('updateBillingAddressForBasket');
  const {
    mutateAsync: removePaymentInstrumentFromBasket
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_7__.useShopperBasketsMutation)('removePaymentInstrumentFromBasket');
  const showToast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_6__.useToast)();
  const showError = () => {
    showToast({
      title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_16__.API_ERROR_MESSAGE),
      status: 'error'
    });
  };
  const {
    step,
    STEPS,
    goToStep,
    goToNextStep
  } = (0,_salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_9__.useCheckout)();
  const billingAddressForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_18__.useForm)({
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: _objectSpread({}, selectedBillingAddress)
  });

  // Using destructuring to remove properties from the object...
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _usePromoCode = (0,_salesforce_retail_react_app_app_components_promo_code__WEBPACK_IMPORTED_MODULE_15__.usePromoCode)(),
    {
      removePromoCode
    } = _usePromoCode,
    promoCodeProps = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_usePromoCode, _excluded);
  const paymentMethodForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_18__.useForm)();
  const onPaymentSubmit = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (formValue) {
      // The form gives us the expiration date as `MM/YY` - so we need to split it into
      // month and year to submit them as individual fields.
      const [expirationMonth, expirationYear] = formValue.expiry.split('/');
      const paymentInstrument = {
        paymentMethodId: 'CREDIT_CARD',
        paymentCard: {
          holder: formValue.holder,
          maskedNumber: (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_10__.getMaskCreditCardNumber)(formValue.number),
          cardType: (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_10__.getPaymentInstrumentCardType)(formValue.cardType),
          expirationMonth: parseInt(expirationMonth),
          expirationYear: parseInt(`20${expirationYear}`)
        }
      };
      return addPaymentInstrumentToBasket({
        parameters: {
          basketId: basket === null || basket === void 0 ? void 0 : basket.basketId
        },
        body: paymentInstrument
      });
    });
    return function onPaymentSubmit(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const onBillingSubmit = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
      const isFormValid = yield billingAddressForm.trigger();
      if (!isFormValid) {
        return;
      }
      const billingAddress = billingSameAsShipping ? selectedShippingAddress : billingAddressForm.getValues();
      // Using destructuring to remove properties from the object...
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {
          addressId,
          creationDate,
          lastModified,
          preferred
        } = billingAddress,
        address = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(billingAddress, _excluded2);
      return yield updateBillingAddressForBasket({
        body: address,
        parameters: {
          basketId: basket.basketId
        }
      });
    });
    return function onBillingSubmit() {
      return _ref2.apply(this, arguments);
    };
  }();
  const onPaymentRemoval = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
      try {
        yield removePaymentInstrumentFromBasket({
          parameters: {
            basketId: basket.basketId,
            paymentInstrumentId: appliedPayment.paymentInstrumentId
          }
        });
      } catch (e) {
        showError();
      }
    });
    return function onPaymentRemoval() {
      return _ref3.apply(this, arguments);
    };
  }();
  const onSubmit = paymentMethodForm.handleSubmit(/*#__PURE__*/function () {
    var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (paymentFormValues) {
      if (!appliedPayment) {
        yield onPaymentSubmit(paymentFormValues);
      }

      // If successful `onBillingSubmit` returns the updated basket. If the form was invalid on
      // submit, `undefined` is returned.
      const updatedBasket = yield onBillingSubmit();
      if (updatedBasket) {
        goToNextStep();
      }
    });
    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }());
  const billingAddressAriaLabel = (0,react_intl__WEBPACK_IMPORTED_MODULE_19__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Billing Address Form"
    }],
    id: "checkout_payment.label.billing_address_form"
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_11__.ToggleCard, {
    id: "step-3",
    title: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Payment"
      }],
      id: "checkout_payment.title.payment"
    }),
    editing: step === STEPS.PAYMENT,
    isLoading: paymentMethodForm.formState.isSubmitting || billingAddressForm.formState.isSubmitting,
    disabled: appliedPayment == null,
    onEdit: () => goToStep(STEPS.PAYMENT),
    editLabel: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Edit Payment Info"
      }],
      id: "toggle_card.action.editPaymentInfo"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_11__.ToggleCardEdit, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    mt: -2,
    mb: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_promo_code__WEBPACK_IMPORTED_MODULE_15__.PromoCode, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, promoCodeProps, {
    itemProps: {
      border: 'none'
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 6
  }, !(appliedPayment !== null && appliedPayment !== void 0 && appliedPayment.paymentCard) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_payment_form__WEBPACK_IMPORTED_MODULE_12__["default"], {
    form: paymentMethodForm,
    onSubmit: onPaymentSubmit
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    as: "h3",
    fontSize: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Credit Card"
    }],
    id: "checkout_payment.heading.credit_card"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    direction: "row",
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(PaymentCardSummary, {
    payment: appliedPayment
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
    variant: "link",
    size: "sm",
    colorScheme: "red",
    onClick: onPaymentRemoval
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Remove"
    }],
    id: "checkout_payment.action.remove"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Divider, {
    borderColor: "gray.100"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    as: "h3",
    fontSize: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Billing Address"
    }],
    id: "checkout_payment.heading.billing_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Checkbox, {
    name: "billingSameAsShipping",
    isChecked: billingSameAsShipping,
    onChange: e => setBillingSameAsShipping(e.target.checked)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Text, {
    fontSize: "sm",
    color: "gray.700"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Same as shipping address"
    }],
    id: "checkout_payment.label.same_as_shipping"
  }))), billingSameAsShipping && selectedShippingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    pl: 7
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_14__["default"], {
    address: selectedShippingAddress
  }))), !billingSameAsShipping && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_shipping_address_selection__WEBPACK_IMPORTED_MODULE_13__["default"], {
    form: billingAddressForm,
    selectedAddress: selectedBillingAddress,
    formTitleAriaLabel: billingAddressAriaLabel,
    hideSubmitButton: true,
    isBillingAddress: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    pt: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
    w: "full",
    onClick: onSubmit
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Review Order"
    }],
    id: "checkout_payment.button.review_order"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_11__.ToggleCardSummary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 6
  }, appliedPayment && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    as: "h3",
    fontSize: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Credit Card"
    }],
    id: "checkout_payment.heading.credit_card"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(PaymentCardSummary, {
    payment: appliedPayment
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Divider, {
    borderColor: "gray.100"
  }), selectedBillingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    as: "h3",
    fontSize: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Billing Address"
    }],
    id: "checkout_payment.heading.billing_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_14__["default"], {
    address: selectedBillingAddress
  })))));
};
const PaymentCardSummary = ({
  payment
}) => {
  var _payment$paymentCard;
  const CardIcon = (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_10__.getCreditCardIcon)(payment === null || payment === void 0 ? void 0 : (_payment$paymentCard = payment.paymentCard) === null || _payment$paymentCard === void 0 ? void 0 : _payment$paymentCard.cardType);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    direction: "row",
    alignItems: "center",
    spacing: 3
  }, CardIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(CardIcon, {
    layerStyle: "ccIcon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    direction: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Text, null, payment.paymentCard.cardType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Text, null, "\u2022\u2022\u2022\u2022 ", payment.paymentCard.numberLastDigits), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Text, null, payment.paymentCard.expirationMonth, "/", payment.paymentCard.expirationYear)));
};
PaymentCardSummary.propTypes = {
  payment: (prop_types__WEBPACK_IMPORTED_MODULE_21___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Payment);

/***/ }),

/***/ "./app/pages/checkout/partials/shipping-address-selection.jsx":
/*!********************************************************************!*\
  !*** ./app/pages/checkout/partials/shipping-address-selection.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_radio_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/radio-card */ "./app/components/radio-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_action_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/action-card */ "./app/components/action-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/address-display */ "./app/components/address-display/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_address_fields__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/address-fields */ "./app/components/forms/address-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/form-action-buttons */ "./app/components/forms/form-action-buttons.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/locale */ "./app/utils/locale.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_15__);




const _excluded = ["addressId", "creationDate", "lastModified", "preferred"],
  _excluded2 = ["id", "_type"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */















const saveButtonMessage = (0,react_intl__WEBPACK_IMPORTED_MODULE_16__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Save & Continue to Shipping Method"
  }],
  id: "shipping_address_edit_form.button.save_and_continue"
});
const ShippingAddressEditForm = ({
  title,
  hasSavedAddresses,
  toggleAddressEdit,
  hideSubmitButton,
  form,
  submitButtonLabel,
  formTitleAriaLabel,
  isBillingAddress = false
}) => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_17__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_3__["default"])({}, hasSavedAddresses && !isBillingAddress && {
    gridColumn: [1, 1, 'span 2'],
    paddingX: [4, 4, 6],
    paddingY: 6,
    rounded: 'base',
    border: '1px solid',
    borderColor: 'blue.600'
  }, {
    "data-testid": "sf-shipping-address-edit-form"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 6
  }, hasSavedAddresses && !isBillingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Heading, {
    as: "h3",
    size: "sm"
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_forms_address_fields__WEBPACK_IMPORTED_MODULE_11__["default"], {
    form: form,
    formTitleAriaLabel: formTitleAriaLabel,
    isBillingAddress: isBillingAddress
  }), hasSavedAddresses && !hideSubmitButton ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_forms_form_action_buttons__WEBPACK_IMPORTED_MODULE_12__["default"], {
    saveButtonLabel: saveButtonMessage,
    onCancel: toggleAddressEdit
  }) : !hideSubmitButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
    type: "submit",
    width: "full",
    disabled: form.formState.isSubmitting
  }, formatMessage(submitButtonLabel)))))));
};
ShippingAddressEditForm.propTypes = {
  title: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().string),
  hasSavedAddresses: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().bool),
  toggleAddressEdit: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
  hideSubmitButton: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().bool),
  form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
  submitButtonLabel: _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_13__.MESSAGE_PROPTYPE,
  formTitleAriaLabel: _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_13__.MESSAGE_PROPTYPE,
  isBillingAddress: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().bool)
};
const submitButtonMessage = (0,react_intl__WEBPACK_IMPORTED_MODULE_16__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Submit"
  }],
  id: "shipping_address_selection.button.submit"
});
const ShippingAddressSelection = ({
  form,
  selectedAddress,
  submitButtonLabel = submitButtonMessage,
  formTitleAriaLabel,
  hideSubmitButton = false,
  onSubmit = /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(function* () {
    return null;
  }),
  isBillingAddress = false
}) => {
  var _customer$addresses;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_17__["default"])();
  const {
    data: customer,
    isLoading,
    isFetching
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_14__.useCurrentCustomer)();
  const isLoadingRegisteredCustomer = isLoading && isFetching;
  const hasSavedAddresses = ((_customer$addresses = customer.addresses) === null || _customer$addresses === void 0 ? void 0 : _customer$addresses.length) > 0;
  const [isEditingAddress, setIsEditingAddress] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);
  const [selectedAddressId, setSelectedAddressId] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(undefined);

  // keep track of the edit buttons so we can focus on them later for accessibility
  const [editBtnRefs, setEditBtnRefs] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    var _customer$addresses2;
    const currentRefs = {};
    (_customer$addresses2 = customer.addresses) === null || _customer$addresses2 === void 0 ? void 0 : _customer$addresses2.forEach(({
      addressId
    }) => {
      currentRefs[addressId] = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createRef();
    });
    setEditBtnRefs(currentRefs);
  }, [customer.addresses]);
  const defaultForm = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_19__.useForm)({
    mode: 'onChange',
    shouldUnregister: false,
    defaultValues: _objectSpread({}, selectedAddress)
  });
  if (!form) form = defaultForm;
  const matchedAddress = hasSavedAddresses && selectedAddress && customer.addresses.find(savedAddress => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
        addressId,
        creationDate,
        lastModified,
        preferred
      } = savedAddress,
      address = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(savedAddress, _excluded);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {
        id,
        _type
      } = selectedAddress,
      selectedAddr = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(selectedAddress, _excluded2);
    return (0,_salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.shallowEquals)(address, selectedAddr);
  });
  const removeCustomerAddress = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_15__.useShopperCustomersMutation)('removeCustomerAddress');
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (isBillingAddress) {
      form.reset(_objectSpread({}, selectedAddress));
      return;
    }
    // Automatically select the customer's default/preferred shipping address
    if (customer.addresses) {
      const address = customer.addresses.find(addr => addr.preferred === true);
      if (address) {
        form.reset(_objectSpread({}, address));
      }
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    // If the customer deletes all their saved addresses during checkout,
    // we need to make sure to display the address form.
    if (!isLoading && !(customer !== null && customer !== void 0 && customer.addresses) && !isEditingAddress) {
      setIsEditingAddress(true);
    }
  }, [customer]);
  (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    if (matchedAddress) {
      form.reset(_objectSpread({
        addressId: matchedAddress.addressId
      }, matchedAddress));
    }
    if (!matchedAddress && selectedAddressId) {
      setIsEditingAddress(true);
    }
  }, [matchedAddress]);

  // Updates the selected customer address if we've an address selected
  // else saves a new customer address
  const submitForm = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(function* (address) {
      if (selectedAddressId) {
        address = _objectSpread(_objectSpread({}, address), {}, {
          addressId: selectedAddressId
        });
      }
      setIsEditingAddress(false);
      form.reset({
        addressId: ''
      });
      yield onSubmit(address);
    });
    return function submitForm(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Acts as our `onChange` handler for addressId radio group. We do this
  // manually here so we can toggle off the 'add address' form as needed.
  const handleAddressIdSelection = addressId => {
    if (addressId && isEditingAddress) {
      setIsEditingAddress(false);
    }
    const address = customer.addresses.find(addr => addr.addressId === addressId);
    form.reset(_objectSpread({}, address));
  };
  const headingText = formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Address"
    }],
    id: "shipping_address.title.shipping_address"
  });
  const shippingAddressHeading = Array.from(document.querySelectorAll('h2')).find(element => element.textContent === headingText);
  const removeSavedAddress = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(function* (addressId) {
      if (addressId === selectedAddressId) {
        setSelectedAddressId(undefined);
        setIsEditingAddress(false);
        form.reset({
          addressId: ''
        });
      }
      yield removeCustomerAddress.mutateAsync({
        parameters: {
          customerId: customer.customerId,
          addressName: addressId
        }
      }, {
        onSuccess: () => {
          // Focus on header after successful remove for accessibility
          shippingAddressHeading === null || shippingAddressHeading === void 0 ? void 0 : shippingAddressHeading.focus();
        }
      });
    });
    return function removeSavedAddress(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();

  // Opens/closes the 'add address' form. Notice that when toggling either state,
  // we reset the form so as to remove any address selection.
  const toggleAddressEdit = (address = undefined) => {
    if (address !== null && address !== void 0 && address.addressId) {
      setSelectedAddressId(address.addressId);
      form.reset(_objectSpread({}, address));
      setIsEditingAddress(true);
    } else {
      var _editBtnRefs$selected;
      // Focus on the edit button that opened the form when the form closes
      // otherwise focus on the heading if we can't find the button
      const focusAfterClose = ((_editBtnRefs$selected = editBtnRefs[selectedAddressId]) === null || _editBtnRefs$selected === void 0 ? void 0 : _editBtnRefs$selected.current) ?? shippingAddressHeading;
      focusAfterClose === null || focusAfterClose === void 0 ? void 0 : focusAfterClose.focus();
      setSelectedAddressId(undefined);
      form.reset({
        addressId: ''
      });
      setIsEditingAddress(!isEditingAddress);
    }
    form.trigger();
  };
  if (isLoadingRegisteredCustomer) {
    // Don't render anything yet, to make sure values like hasSavedAddresses are correct
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement("form", {
    onSubmit: form.handleSubmit(submitForm)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 4
  }, hasSavedAddresses && !isBillingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_19__.Controller, {
    name: "addressId",
    defaultValue: "",
    control: form.control,
    rules: {
      required: !isEditingAddress
    },
    render: ({
      field: {
        value
      }
    }) => {
      var _customer$addresses3;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_radio_card__WEBPACK_IMPORTED_MODULE_7__.RadioCardGroup, {
        value: value,
        onChange: handleAddressIdSelection
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.SimpleGrid, {
        columns: [1, 1, 2],
        spacing: 4,
        gridAutoFlow: "row dense"
      }, (_customer$addresses3 = customer.addresses) === null || _customer$addresses3 === void 0 ? void 0 : _customer$addresses3.map((address, index) => {
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
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement((react__WEBPACK_IMPORTED_MODULE_4___default().Fragment), {
          key: address.addressId
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_radio_card__WEBPACK_IMPORTED_MODULE_7__.RadioCard, {
          value: address.addressId
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_action_card__WEBPACK_IMPORTED_MODULE_8__["default"], {
          padding: 0,
          border: "none",
          onRemove: () => removeSavedAddress(address.addressId),
          onEdit: () => toggleAddressEdit(address),
          editBtnRef: editBtnRefs[address.addressId],
          "data-testid": `sf-checkout-shipping-address-${index}`,
          editBtnLabel: editLabel,
          removeBtnLabel: removeLabel
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_10__["default"], {
          address: address
        })), isEditingAddress && address.addressId === selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
          width: 3,
          height: 3,
          borderLeft: "1px solid",
          borderTop: "1px solid",
          borderColor: "blue.600",
          position: "absolute",
          left: "50%",
          bottom: "-23px",
          background: "white",
          transform: "rotate(45deg)"
        })), isEditingAddress && address.addressId === selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(ShippingAddressEditForm, {
          title: formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Edit Shipping Address"
            }],
            id: "shipping_address_selection.title.edit_shipping"
          }),
          hasSavedAddresses: hasSavedAddresses,
          toggleAddressEdit: toggleAddressEdit,
          hideSubmitButton: hideSubmitButton,
          form: form,
          submitButtonLabel: submitButtonLabel,
          formTitleAriaLabel: formTitleAriaLabel
        }));
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
        variant: "outline",
        border: "1px dashed",
        borderColor: "gray.200",
        color: "blue.600",
        height: ['44px', '44px', '167px'],
        rounded: "base",
        fontWeight: "medium",
        leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__.PlusIcon, {
          boxSize: '15px'
        }),
        onClick: toggleAddressEdit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_20__["default"], {
        defaultMessage: [{
          "type": 0,
          "value": "Add New Address"
        }],
        id: "shipping_address_selection.button.add_address"
      }), isEditingAddress && !selectedAddressId && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
        width: 3,
        height: 3,
        borderLeft: "1px solid",
        borderTop: "1px solid",
        borderColor: "blue.600",
        position: "absolute",
        left: "50%",
        bottom: "-23px",
        background: "white",
        transform: "rotate(45deg)"
      }))));
    }
  }), ((customer === null || customer === void 0 ? void 0 : customer.isGuest) || isEditingAddress && !selectedAddressId || isBillingAddress) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(ShippingAddressEditForm, {
    title: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Add New Address"
      }],
      id: "shipping_address_selection.title.add_address"
    }),
    hasSavedAddresses: hasSavedAddresses,
    toggleAddressEdit: toggleAddressEdit,
    hideSubmitButton: hideSubmitButton,
    form: form,
    isBillingAddress: isBillingAddress,
    submitButtonLabel: submitButtonLabel,
    formTitleAriaLabel: formTitleAriaLabel
  }), customer.isRegistered && !isEditingAddress && !hideSubmitButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    pt: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
    type: "submit",
    width: "full",
    disabled: !form.formState.isValid || form.formState.isSubmitting
  }, formatMessage(submitButtonLabel))))));
};
ShippingAddressSelection.propTypes = {
  /** The form object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
  /** Optional address to use as default selection */
  selectedAddress: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().object),
  /** Override the submit button label */
  submitButtonLabel: _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_13__.MESSAGE_PROPTYPE,
  /** aria label to use for the address group */
  formTitleAriaLabel: _salesforce_retail_react_app_app_utils_locale__WEBPACK_IMPORTED_MODULE_13__.MESSAGE_PROPTYPE,
  /** Show or hide the submit button (for controlling the form from outside component) */
  hideSubmitButton: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().bool),
  /** Callback for form submit */
  onSubmit: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().func),
  /** Optional flag to indication if an address is a billing address */
  isBillingAddress: (prop_types__WEBPACK_IMPORTED_MODULE_18___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShippingAddressSelection);

/***/ }),

/***/ "./app/pages/checkout/partials/shipping-address.jsx":
/*!**********************************************************!*\
  !*** ./app/pages/checkout/partials/shipping-address.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingAddress)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/util/checkout-context */ "./app/pages/checkout/util/checkout-context.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/toggle-card */ "./app/components/toggle-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_partials_shipping_address_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/partials/shipping-address-selection */ "./app/pages/checkout/partials/shipping-address-selection.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/address-display */ "./app/components/address-display/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */










const submitButtonMessage = (0,react_intl__WEBPACK_IMPORTED_MODULE_9__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Continue to Shipping Method"
  }],
  id: "shipping_address.button.continue_to_shipping"
});
const shippingAddressAriaLabel = (0,react_intl__WEBPACK_IMPORTED_MODULE_9__.defineMessage)({
  defaultMessage: [{
    "type": 0,
    "value": "Shipping Address Form"
  }],
  id: "shipping_address.label.shipping_address_form"
});
function ShippingAddress() {
  var _basket$shipments$;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_10__["default"])();
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_7__.useCurrentCustomer)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_8__.useCurrentBasket)();
  const selectedShippingAddress = (basket === null || basket === void 0 ? void 0 : basket.shipments) && (basket === null || basket === void 0 ? void 0 : (_basket$shipments$ = basket.shipments[0]) === null || _basket$shipments$ === void 0 ? void 0 : _basket$shipments$.shippingAddress);
  const {
    step,
    STEPS,
    goToStep,
    goToNextStep
  } = (0,_salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_2__.useCheckout)();
  const createCustomerAddress = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperCustomersMutation)('createCustomerAddress');
  const updateCustomerAddress = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperCustomersMutation)('updateCustomerAddress');
  const updateShippingAddressForShipment = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutation)('updateShippingAddressForShipment');
  const submitAndContinue = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (address) {
      setIsLoading(true);
      const {
        addressId,
        address1,
        city,
        countryCode,
        firstName,
        lastName,
        phone,
        postalCode,
        stateCode
      } = address;
      yield updateShippingAddressForShipment.mutateAsync({
        parameters: {
          basketId: basket.basketId,
          shipmentId: 'me',
          useAsBilling: false
        },
        body: {
          address1,
          city,
          countryCode,
          firstName,
          lastName,
          phone,
          postalCode,
          stateCode
        }
      });
      if (customer.isRegistered && !addressId) {
        const body = {
          address1,
          city,
          countryCode,
          firstName,
          lastName,
          phone,
          postalCode,
          stateCode,
          addressId: (0,nanoid__WEBPACK_IMPORTED_MODULE_11__.nanoid)()
        };
        yield createCustomerAddress.mutateAsync({
          body,
          parameters: {
            customerId: customer.customerId
          }
        });
      }
      if (customer.isRegistered && addressId) {
        yield updateCustomerAddress.mutateAsync({
          body: address,
          parameters: {
            customerId: customer.customerId,
            addressName: addressId
          }
        });
      }
      goToNextStep();
      setIsLoading(false);
    });
    return function submitAndContinue(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_3__.ToggleCard, {
    id: "step-1",
    title: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Shipping Address"
      }],
      id: "shipping_address.title.shipping_address"
    }),
    editing: step === STEPS.SHIPPING_ADDRESS,
    isLoading: isLoading,
    disabled: step === STEPS.CONTACT_INFO && !selectedShippingAddress,
    onEdit: () => goToStep(STEPS.SHIPPING_ADDRESS),
    editLabel: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Edit Shipping Address"
      }],
      id: "toggle_card.action.editShippingAddress"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_3__.ToggleCardEdit, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_pages_checkout_partials_shipping_address_selection__WEBPACK_IMPORTED_MODULE_4__["default"], {
    selectedAddress: selectedShippingAddress,
    submitButtonLabel: submitButtonMessage,
    onSubmit: submitAndContinue,
    formTitleAriaLabel: shippingAddressAriaLabel
  })), selectedShippingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_3__.ToggleCardSummary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_5__["default"], {
    address: selectedShippingAddress
  })));
}

/***/ }),

/***/ "./app/pages/checkout/partials/shipping-options.jsx":
/*!**********************************************************!*\
  !*** ./app/pages/checkout/partials/shipping-options.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingOptions)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/util/checkout-context */ "./app/pages/checkout/util/checkout-context.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/toggle-card */ "./app/components/toggle-card/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */










function ShippingOptions() {
  var _basket$shipments, _basket$shipments$, _basket$shipments2, _basket$shipments2$, _basket$shippingItems, _shippingItem$priceAd;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const {
    step,
    STEPS,
    goToStep,
    goToNextStep
  } = (0,_salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_3__.useCheckout)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_7__.useCurrentBasket)();
  const {
    currency
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_8__.useCurrency)();
  const updateShippingMethod = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutation)('updateShippingMethodForShipment');
  const {
    data: shippingMethods
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShippingMethodsForShipment)({
    parameters: {
      basketId: basket === null || basket === void 0 ? void 0 : basket.basketId,
      shipmentId: 'me'
    }
  }, {
    enabled: Boolean(basket === null || basket === void 0 ? void 0 : basket.basketId) && step === STEPS.SHIPPING_OPTIONS
  });
  const selectedShippingMethod = basket === null || basket === void 0 ? void 0 : (_basket$shipments = basket.shipments) === null || _basket$shipments === void 0 ? void 0 : (_basket$shipments$ = _basket$shipments[0]) === null || _basket$shipments$ === void 0 ? void 0 : _basket$shipments$.shippingMethod;
  const selectedShippingAddress = basket === null || basket === void 0 ? void 0 : (_basket$shipments2 = basket.shipments) === null || _basket$shipments2 === void 0 ? void 0 : (_basket$shipments2$ = _basket$shipments2[0]) === null || _basket$shipments2$ === void 0 ? void 0 : _basket$shipments2$.shippingAddress;
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_10__.useForm)({
    shouldUnregister: false,
    defaultValues: {
      shippingMethodId: (selectedShippingMethod === null || selectedShippingMethod === void 0 ? void 0 : selectedShippingMethod.id) || (shippingMethods === null || shippingMethods === void 0 ? void 0 : shippingMethods.defaultShippingMethodId)
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const defaultMethodId = shippingMethods === null || shippingMethods === void 0 ? void 0 : shippingMethods.defaultShippingMethodId;
    const methodId = form.getValues().shippingMethodId;
    if (!selectedShippingMethod && !methodId && defaultMethodId) {
      form.reset({
        shippingMethodId: defaultMethodId
      });
    }
    if (selectedShippingMethod && methodId !== selectedShippingMethod.id) {
      form.reset({
        shippingMethodId: selectedShippingMethod.id
      });
    }
  }, [selectedShippingMethod, shippingMethods]);
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
      shippingMethodId
    }) {
      yield updateShippingMethod.mutateAsync({
        parameters: {
          basketId: basket.basketId,
          shipmentId: 'me'
        },
        body: {
          id: shippingMethodId
        }
      });
      goToNextStep();
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const shippingItem = basket === null || basket === void 0 ? void 0 : (_basket$shippingItems = basket.shippingItems) === null || _basket$shippingItems === void 0 ? void 0 : _basket$shippingItems[0];
  const selectedMethodDisplayPrice = Math.min((shippingItem === null || shippingItem === void 0 ? void 0 : shippingItem.price) || 0, (shippingItem === null || shippingItem === void 0 ? void 0 : shippingItem.priceAfterItemDiscount) || 0);
  const freeLabel = formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Free"
    }],
    id: "checkout_confirmation.label.free"
  });
  let shippingPriceLabel = selectedMethodDisplayPrice;
  if (selectedMethodDisplayPrice !== shippingItem.price) {
    const currentPrice = selectedMethodDisplayPrice === 0 ? freeLabel : selectedMethodDisplayPrice;
    shippingPriceLabel = formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Originally "
      }, {
        "type": 1,
        "value": "originalPrice"
      }, {
        "type": 0,
        "value": ", now "
      }, {
        "type": 1,
        "value": "newPrice"
      }],
      id: "checkout_confirmation.label.shipping.strikethrough.price"
    }, {
      originalPrice: shippingItem.price,
      newPrice: currentPrice
    });
  }

  // Note that this card is disabled when there is no shipping address as well as no shipping method.
  // We do this because we apply the default shipping method to the basket before checkout - so when
  // landing on checkout the first time will put you at the first step (contact info), but the shipping
  // method step would appear filled out already. This fix attempts to avoid any confusion in the UI.
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__.ToggleCard, {
    id: "step-2",
    title: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Shipping & Gift Options"
      }],
      id: "shipping_options.title.shipping_gift_options"
    }),
    editing: step === STEPS.SHIPPING_OPTIONS,
    isLoading: form.formState.isSubmitting,
    disabled: selectedShippingMethod == null || !selectedShippingAddress,
    onEdit: () => goToStep(STEPS.SHIPPING_OPTIONS),
    editLabel: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Edit Shipping Options"
      }],
      id: "toggle_card.action.editShippingOptions"
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__.ToggleCardEdit, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(submitForm),
    "data-testid": "sf-checkout-shipping-options-form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 6
  }, (shippingMethods === null || shippingMethods === void 0 ? void 0 : shippingMethods.applicableShippingMethods) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_hook_form__WEBPACK_IMPORTED_MODULE_10__.Controller, {
    name: "shippingMethodId",
    control: form.control,
    defaultValue: "",
    render: ({
      field: {
        value,
        onChange
      }
    }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.RadioGroup, {
      name: "shipping-options-radiogroup",
      value: value,
      onChange: onChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
      spacing: 5
    }, shippingMethods.applicableShippingMethods.map(opt => {
      var _opt$shippingPromotio;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Radio, {
        value: opt.id,
        key: opt.id
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
        justify: "space-between",
        w: "full"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, opt.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
        fontSize: "sm",
        color: "gray.600"
      }, opt.description)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
        fontWeight: "bold"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_11__.FormattedNumber, {
        value: opt.price,
        style: "currency",
        currency: currency
      }))), (_opt$shippingPromotio = opt.shippingPromotions) === null || _opt$shippingPromotio === void 0 ? void 0 : _opt$shippingPromotio.map(promo => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
          key: promo.promotionId,
          fontSize: "sm",
          color: "green.600"
        }, promo.calloutMsg);
      }));
    })))
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    size: "sm",
    rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronDownIcon, null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_12__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Do you want to send this as a gift?"
    }],
    id: "shipping_options.action.send_as_a_gift"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    w: "full",
    type: "submit"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_12__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Continue to Payment"
    }],
    id: "shipping_options.button.continue_to_payment"
  }))))))), selectedShippingMethod && selectedShippingAddress && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__.ToggleCardSummary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    justify: "space-between",
    w: "full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, selectedShippingMethod.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    alignItems: "center",
    "aria-label": shippingPriceLabel,
    role: "group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontWeight: "bold",
    "aria-hidden": "true",
    role: "presentation"
  }, selectedMethodDisplayPrice === 0 ? freeLabel : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_11__.FormattedNumber, {
    value: selectedMethodDisplayPrice,
    style: "currency",
    currency: currency
  })), selectedMethodDisplayPrice !== shippingItem.price && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontWeight: "normal",
    textDecoration: "line-through",
    color: "gray.600",
    marginLeft: 1,
    "aria-hidden": "true",
    role: "presentation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_11__.FormattedNumber, {
    style: "currency",
    currency: currency,
    value: shippingItem.price
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    fontSize: "sm",
    color: "gray.700"
  }, selectedShippingMethod.description), shippingItem === null || shippingItem === void 0 ? void 0 : (_shippingItem$priceAd = shippingItem.priceAdjustments) === null || _shippingItem$priceAd === void 0 ? void 0 : _shippingItem$priceAd.map(adjustment => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
      key: adjustment.priceAdjustmentId,
      fontSize: "sm",
      color: "green.600"
    }, adjustment.itemText);
  })));
}

/***/ }),

/***/ "./app/pages/checkout/util/checkout-context.js":
/*!*****************************************************!*\
  !*** ./app/pages/checkout/util/checkout-context.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckoutProvider: () => (/* binding */ CheckoutProvider),
/* harmony export */   useCheckout: () => (/* binding */ useCheckout)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const CheckoutContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext();
const CheckoutProvider = ({
  children
}) => {
  var _basket$customerInfo2, _basket$shipments$3, _basket$shipments$4;
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_3__.useCurrentCustomer)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_4__.useCurrentBasket)();
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const [step, setStep] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const CHECKOUT_STEPS_LIST = ['CONTACT_INFO', 'SHIPPING_ADDRESS', 'SHIPPING_OPTIONS', 'PAYMENT', 'REVIEW_ORDER'];
  const STEPS = CHECKOUT_STEPS_LIST.reduce((acc, step, idx) => _objectSpread(_objectSpread({}, acc), {}, {
    [step]: idx
  }), {});
  const getCheckoutStepName = step => CHECKOUT_STEPS_LIST[step];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _basket$customerInfo, _basket$shipments$, _basket$shipments$2;
    if (!customer || !basket) {
      return;
    }
    let step = STEPS.REVIEW_ORDER;
    if (customer.isGuest && !((_basket$customerInfo = basket.customerInfo) !== null && _basket$customerInfo !== void 0 && _basket$customerInfo.email)) {
      step = STEPS.CONTACT_INFO;
    } else if (!((_basket$shipments$ = basket.shipments[0]) !== null && _basket$shipments$ !== void 0 && _basket$shipments$.shippingAddress)) {
      step = STEPS.SHIPPING_ADDRESS;
    } else if (!((_basket$shipments$2 = basket.shipments[0]) !== null && _basket$shipments$2 !== void 0 && _basket$shipments$2.shippingMethod)) {
      step = STEPS.SHIPPING_OPTIONS;
    } else if (!basket.paymentInstruments || !basket.billingAddress) {
      step = STEPS.PAYMENT;
    }
    setStep(step);
  }, [customer === null || customer === void 0 ? void 0 : customer.isGuest, basket === null || basket === void 0 ? void 0 : (_basket$customerInfo2 = basket.customerInfo) === null || _basket$customerInfo2 === void 0 ? void 0 : _basket$customerInfo2.email, basket === null || basket === void 0 ? void 0 : (_basket$shipments$3 = basket.shipments[0]) === null || _basket$shipments$3 === void 0 ? void 0 : _basket$shipments$3.shippingAddress, basket === null || basket === void 0 ? void 0 : (_basket$shipments$4 = basket.shipments[0]) === null || _basket$shipments$4 === void 0 ? void 0 : _basket$shipments$4.shippingMethod, basket === null || basket === void 0 ? void 0 : basket.paymentInstruments, basket === null || basket === void 0 ? void 0 : basket.billingAddress]);

  /**************** Einstein ****************/
  // Run this once when checkout begins
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (basket !== null && basket !== void 0 && basket.productItems) {
      einstein.sendBeginCheckout(basket);
    }
  }, []);

  // Run this every time checkout steps change
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (step != undefined) {
      einstein.sendCheckoutStep(getCheckoutStepName(step), step, basket);
    }
  }, [step]);
  const value = {
    step,
    STEPS,
    goToNextStep: () => setStep(step + 1),
    goToStep: step => setStep(step)
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(CheckoutContext.Provider, {
    value: value
  }, children);
};
CheckoutProvider.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().any)
};

/**
 * A hook for managing checkout state and actions
 * @returns {Object} Checkout data and actions
 */
const useCheckout = () => {
  return react__WEBPACK_IMPORTED_MODULE_1___default().useContext(CheckoutContext);
};

/***/ }),

/***/ "./overlays/passwordless-login/app/pages/checkout/partials/contact-info.jsx":
/*!**********************************************************************************!*\
  !*** ./overlays/passwordless-login/app/pages/checkout/partials/contact-info.jsx ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/checkout/util/checkout-context */ "./app/pages/checkout/util/checkout-context.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useLoginFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useLoginFields */ "./app/components/forms/useLoginFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/toggle-card */ "./app/components/toggle-card/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_auth_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-auth-modal */ "./overlays/passwordless-login/app/hooks/use-auth-modal.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/pwa-kit-runtime/utils/ssr-config */ "./node_modules/@salesforce/pwa-kit-runtime/utils/ssr-config.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */















const ContactInfo = () => {
  var _basket$customerInfo, _basket$customerInfo2;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_13__["default"])();
  const {
    app
  } = (0,_salesforce_pwa_kit_runtime_utils_ssr_config__WEBPACK_IMPORTED_MODULE_12__.getConfig)();
  const authModal = (0,_salesforce_retail_react_app_app_hooks_use_auth_modal__WEBPACK_IMPORTED_MODULE_7__.useAuthModal)('password');
  const pwdlessAuthModal = (0,_salesforce_retail_react_app_app_hooks_use_auth_modal__WEBPACK_IMPORTED_MODULE_7__.useAuthModal)('passwordlesslogin_auth');
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_9__.useCurrentCustomer)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_10__.useCurrentBasket)();
  const login = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__.AuthHelpers.LoginRegisteredUserB2C);
  const logout = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__.AuthHelpers.Logout);
  const updateCustomerForBasket = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_11__.useShopperBasketsMutation)('updateCustomerForBasket');
  const {
    step,
    STEPS,
    goToStep,
    goToNextStep
  } = (0,_salesforce_retail_react_app_app_pages_checkout_util_checkout_context__WEBPACK_IMPORTED_MODULE_3__.useCheckout)();
  const enablePasswordlessLogin = (app === null || app === void 0 ? void 0 : app.enablePWAKitPrivateClient) || false;
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_14__.useForm)({
    defaultValues: {
      email: (customer === null || customer === void 0 ? void 0 : customer.email) || (basket === null || basket === void 0 ? void 0 : (_basket$customerInfo = basket.customerInfo) === null || _basket$customerInfo === void 0 ? void 0 : _basket$customerInfo.email) || '',
      password: ''
    }
  });
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useLoginFields__WEBPACK_IMPORTED_MODULE_4__["default"])({
    form
  });
  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  const [showPasswordField, setShowPasswordField] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [signOutConfirmDialogIsOpen, setSignOutConfirmDialogIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
      setError(null);
      try {
        if (!data.password) {
          yield updateCustomerForBasket.mutateAsync({
            parameters: {
              basketId: basket.basketId
            },
            body: {
              email: data.email
            }
          });
        } else {
          yield login.mutateAsync({
            username: data.email,
            password: data.password
          });
        }
        goToNextStep();
      } catch (error) {
        if (/Unauthorized/i.test(error.message)) {
          setError(formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Incorrect username or password, please try again."
            }],
            id: "contact_info.error.incorrect_username_or_password"
          }));
        } else {
          setError(error.message);
        }
      }
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const togglePasswordField = () => {
    if (error) {
      setError(null);
    }
    setShowPasswordField(!showPasswordField);
  };
  const onForgotPasswordClick = () => {
    authModal.onOpen();
  };
  const onPasswordlessLoginClick = () => {
    pwdlessAuthModal.onOpen();
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!showPasswordField) {
      form.unregister('password');
    }
  }, [showPasswordField]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__.ToggleCard, {
    id: "step-0",
    title: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Contact Info"
      }],
      id: "contact_info.title.contact_info"
    }),
    editing: step === STEPS.CONTACT_INFO,
    isLoading: form.formState.isSubmitting,
    onEdit: () => {
      if (customer.isRegistered) {
        setSignOutConfirmDialogIsOpen(true);
      } else {
        goToStep(STEPS.CONTACT_INFO);
      }
    },
    editLabel: customer.isRegistered ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Sign Out"
      }],
      id: "contact_info.action.sign_out"
    }) : undefined
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__.ToggleCardEdit, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
    onSubmit: form.handleSubmit(submitForm)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 6
  }, error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Alert, {
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertIcon, null), error), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 5,
    position: "relative"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_6__["default"], fields.email), showPasswordField && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_6__["default"], fields.password), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    size: "sm",
    onClick: onForgotPasswordClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Forgot password?"
    }],
    id: "contact_info.link.forgot_password"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    type: "submit"
  }, !showPasswordField ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Checkout as Guest"
    }],
    id: "contact_info.button.checkout_as_guest"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Log In"
    }],
    id: "contact_info.button.login"
  })), showPasswordField && enablePasswordlessLogin && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "outline",
    onClick: onPasswordlessLoginClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sign in with Single-Use Code"
    }],
    id: "login_form.button.passwordless_login"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "outline",
    onClick: togglePasswordField
  }, !showPasswordField ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Already have an account? Log in"
    }],
    id: "contact_info.button.already_have_account"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Checkout as Guest"
    }],
    id: "contact_info.button.checkout_as_guest"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_hooks_use_auth_modal__WEBPACK_IMPORTED_MODULE_7__.AuthModal, authModal), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_hooks_use_auth_modal__WEBPACK_IMPORTED_MODULE_7__.AuthModal, pwdlessAuthModal)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_toggle_card__WEBPACK_IMPORTED_MODULE_5__.ToggleCardSummary, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, null, (basket === null || basket === void 0 ? void 0 : (_basket$customerInfo2 = basket.customerInfo) === null || _basket$customerInfo2 === void 0 ? void 0 : _basket$customerInfo2.email) || (customer === null || customer === void 0 ? void 0 : customer.email)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(SignOutConfirmationDialog, {
    isOpen: signOutConfirmDialogIsOpen,
    onClose: () => setSignOutConfirmDialogIsOpen(false),
    onConfirm: /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield logout.mutateAsync();
      navigate('/login');
      setSignOutConfirmDialogIsOpen(false);
    })
  })));
};
const SignOutConfirmationDialog = ({
  isOpen,
  onConfirm,
  onClose
}) => {
  const cancelRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertDialog, {
    isOpen: isOpen,
    leastDestructiveRef: cancelRef,
    onClose: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertDialogOverlay, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertDialogContent, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sign Out"
    }],
    id: "signout_confirmation_dialog.heading.sign_out"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertDialogBody, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Are you sure you want to sign out? You will need to sign back in to proceed with your current order."
    }],
    id: "signout_confirmation_dialog.message.sure_to_sign_out"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AlertDialogFooter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    ref: cancelRef,
    variant: "outline",
    onClick: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Cancel"
    }],
    id: "signout_confirmation_dialog.button.cancel"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
    colorScheme: "red",
    onClick: onConfirm,
    ml: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_15__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sign Out"
    }],
    id: "signout_confirmation_dialog.button.sign_out"
  }))))));
};
SignOutConfirmationDialog.propTypes = {
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().bool),
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().func),
  onConfirm: (prop_types__WEBPACK_IMPORTED_MODULE_16___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContactInfo);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-checkout.js.map