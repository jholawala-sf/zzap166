"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["app_components_product-item_index_jsx-app_components_product-view-modal_index_jsx-app_compone-b981ad"],{

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

/***/ "./app/components/product-item/index.jsx":
/*!***********************************************!*\
  !*** ./app/components/product-item/index.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/responsive */ "./app/components/responsive/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-image */ "./app/components/item-variant/item-image.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-name */ "./app/components/item-variant/item-name.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-attributes */ "./app/components/item-variant/item-attributes.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-price */ "./app/components/item-variant/item-price.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/loading-spinner */ "./app/components/loading-spinner/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_quantity_picker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/quantity-picker */ "./app/components/quantity-picker/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




// Chakra Components


// Project Components









// Utilities


// Hooks


/**
 * Component representing a product item usually in a list with details about the product - name, variant, pricing, etc.
 * @param {Object} product Product to be represented in the list item.
 * @param {node} primaryAction Child component representing the most prominent action to be performed by the user.
 * @param {node} secondaryActions Child component representing the other actions relevant to the product to be performed by the user.
 * @param {func} onItemQuantityChange callback function to be invoked whenever item quantity changes.
 * @param {boolean} showLoading Renders a loading spinner with overlay if set to true.
 * @returns A JSX element representing product item in a list (eg: wishlist, cart, etc).
 */
const ProductItem = ({
  product,
  primaryAction,
  secondaryActions,
  onItemQuantityChange = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__.noop,
  showLoading = false
}) => {
  const {
    stepQuantity,
    showInventoryMessage,
    inventoryMessage,
    quantity,
    setQuantity
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_11__.useDerivedProduct)(product);
  const {
    currency: activeCurrency
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_11__.useCurrency)();
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_12__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    position: "relative",
    "data-testid": `sf-cart-item-${product.productId ? product.productId : product.id}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: product
  }, showLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_loading_spinner__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    layerStyle: "cardBordered",
    align: "flex-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    width: "full",
    alignItems: "flex-start",
    backgroundColor: "white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
    width: ['88px', '136px'],
    mr: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 3,
    flex: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_2__.HideOnDesktop, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    marginTop: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_7__["default"], {
    align: "left",
    currency: activeCurrency
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    align: "flex-end",
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 1
  }, !product.bonusProductLineItem && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontSize: "sm",
    color: "gray.700",
    "aria-label": intl.formatMessage({
      id: "item_variant.quantity.label",
      defaultMessage: [{
        "type": 0,
        "value": "Quantity selector for "
      }, {
        "type": 1,
        "value": "productName"
      }, {
        "type": 0,
        "value": ". Selected quantity is "
      }, {
        "type": 1,
        "value": "quantity"
      }]
    }, {
      quantity: product === null || product === void 0 ? void 0 : product.quantity,
      productName: product === null || product === void 0 ? void 0 : product.name
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_13__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Quantity:"
    }],
    id: "product_item.label.quantity"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_quantity_picker__WEBPACK_IMPORTED_MODULE_9__["default"], {
    step: stepQuantity,
    value: quantity,
    min: 0,
    clampValueOnBlur: false,
    onBlur: e => {
      // Default to last known quantity if a user leaves the box with an invalid value
      const {
        value
      } = e.target;
      if (!value) {
        setQuantity(product.quantity);
      }
    },
    onChange: (stringValue, numberValue) => {
      // Set the Quantity of product to value of input if value number
      if (numberValue >= 0) {
        // Call handler
        onItemQuantityChange(numberValue).then(isValidChange => isValidChange && setQuantity(numberValue));
      } else if (stringValue === '') {
        // We want to allow the use to clear the input to start a new input so here we set the quantity to '' so NAN is not displayed
        // User will not be able to add '' quantity to the cart due to the add to cart button enablement rules
        setQuantity(stringValue);
      }
    },
    productName: product === null || product === void 0 ? void 0 : product.name
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.VisuallyHidden, {
    role: "status"
  }, product === null || product === void 0 ? void 0 : product.name, intl.formatMessage({
    id: "item_variant.assistive_msg.quantity",
    defaultMessage: [{
      "type": 0,
      "value": "Quantity "
    }, {
      "type": 1,
      "value": "quantity"
    }]
  }, {
    quantity: product === null || product === void 0 ? void 0 : product.quantity
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_2__.HideOnMobile, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_7__["default"], {
    currency: activeCurrency
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    display: ['none', 'block', 'block', 'block']
  }, primaryAction))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, null, product && showInventoryMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Fade, {
    in: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    color: "orange.600",
    fontWeight: 600
  }, inventoryMessage))), secondaryActions)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    display: ['block', 'none', 'none', 'none'],
    w: 'full'
  }, primaryAction))));
};
ProductItem.propTypes = {
  product: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().object),
  onItemQuantityChange: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
  onAddItemToCart: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().func),
  showLoading: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
  isWishlistItem: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
  primaryAction: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().node),
  secondaryActions: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().node)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductItem);

/***/ }),

/***/ "./app/components/product-view-modal/index.jsx":
/*!*****************************************************!*\
  !*** ./app/components/product-view-modal/index.jsx ***!
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-view */ "./app/components/product-view/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_product_view_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-product-view-modal */ "./app/hooks/use-product-view-modal.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");


const _excluded = ["product", "isOpen", "onClose"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */








/**
 * A Modal that contains Product View
 */
const ProductViewModal = _ref => {
  var _productViewModalData;
  let {
      product,
      isOpen,
      onClose
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const productViewModalData = (0,_salesforce_retail_react_app_app_hooks_use_product_view_modal__WEBPACK_IMPORTED_MODULE_5__.useProductViewModal)(product);
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const label = intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Edit modal for "
    }, {
      "type": 1,
      "value": "productName"
    }],
    id: "cart.product_edit_modal.modal_label"
  }, {
    productName: productViewModalData === null || productViewModalData === void 0 ? void 0 : (_productViewModalData = productViewModalData.product) === null || _productViewModalData === void 0 ? void 0 : _productViewModalData.name
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    size: "4xl",
    isOpen: isOpen,
    onClose: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.ModalOverlay, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.ModalContent, {
    containerProps: {
      'data-testid': 'product-view-modal'
    },
    "aria-label": label
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.ModalCloseButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.ModalBody, {
    pb: 8,
    bg: "white",
    paddingBottom: 6,
    marginTop: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    showFullLink: true,
    imageSize: "sm",
    product: productViewModalData.product,
    isLoading: productViewModalData.isFetching
  }, props)))));
};
ProductViewModal.propTypes = {
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool).isRequired,
  onOpen: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func).isRequired,
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().func).isRequired,
  product: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductViewModal);

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

/***/ "./app/hooks/use-product-view-modal.js":
/*!*********************************************!*\
  !*** ./app/hooks/use-product-view-modal.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useProductViewModal: () => (/* binding */ useProductViewModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/url */ "./overlays/utils/app/utils/url.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_variant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-variant */ "./app/hooks/use-variant.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */










/**
 * This hook is responsible for fetching a product detail based on the variation selection
 * and managing the variation params on the url when the modal is open/close
 * @param initialProduct - the initial product when the modal is first open
 * @returns object
 */
const useProductViewModal = initialProduct => {
  var _ref;
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useLocation)();
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_7__.useHistory)();
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_4__.useToast)();
  const [product, setProduct] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialProduct);
  const variant = (0,_salesforce_retail_react_app_app_hooks_use_variant__WEBPACK_IMPORTED_MODULE_3__.useVariant)(product);
  const {
    data: currentProduct,
    isFetching
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useProduct)({
    parameters: {
      id: (_ref = variant || product) === null || _ref === void 0 ? void 0 : _ref.productId
    }
  }, {
    placeholderData: initialProduct,
    select: data => {
      // if the product id is the same as the initial product id,
      // then merge the data with the initial product to be able to show correct quantity in the modal
      if (data.id === initialProduct.productId) {
        return _objectSpread(_objectSpread({}, initialProduct), data);
      }
      return data;
    },
    onError: () => {
      toast({
        title: intl.formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_5__.API_ERROR_MESSAGE),
        status: 'error'
      });
    }
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (currentProduct) setProduct(currentProduct);
  }, [currentProduct]);
  const cleanUpVariantParams = () => {
    var _product$variationAtt;
    const paramToRemove = [...((product === null || product === void 0 ? void 0 : (_product$variationAtt = product.variationAttributes) === null || _product$variationAtt === void 0 ? void 0 : _product$variationAtt.map(({
      id
    }) => id)) ?? []), 'pid'];
    const updatedParams = (0,_salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_2__.removeQueryParamsFromPath)(`${location.search}`, paramToRemove);
    history.replace({
      search: updatedParams
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // when the modal is first mounted,
    // clean up the params in case there are variant params not related to current product
    cleanUpVariantParams();
    return () => {
      cleanUpVariantParams();
    };
  }, []);
  return {
    product,
    variant,
    isFetching
  };
};

/***/ })

}]);
//# sourceMappingURL=app_components_product-item_index_jsx-app_components_product-view-modal_index_jsx-app_compone-b981ad.js.map