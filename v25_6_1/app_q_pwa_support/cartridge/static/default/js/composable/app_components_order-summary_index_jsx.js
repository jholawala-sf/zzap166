"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["app_components_order-summary_index_jsx"],{

/***/ "./app/components/forms/promo-code-fields.jsx":
/*!****************************************************!*\
  !*** ./app/components/forms/promo-code-fields.jsx ***!
  \****************************************************/
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
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_usePromoCodeFields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/usePromoCodeFields */ "./app/components/forms/usePromoCodeFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");


const _excluded = ["form", "prefix"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const PromoCodeFields = _ref => {
  let {
      form,
      prefix = ''
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const fields = (0,_salesforce_retail_react_app_app_components_forms_usePromoCodeFields__WEBPACK_IMPORTED_MODULE_4__["default"])({
    form,
    prefix
  });
  const code = form.watch('code');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "aria-labelledby": "code-feedback"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    inputProps: {
      flex: 1,
      mr: 2
    }
  }, fields.code), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    type: "submit",
    fontSize: "sm",
    isLoading: form.formState.isSubmitting,
    disabled: (code === null || code === void 0 ? void 0 : code.length) < 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Apply"
    }],
    id: "promo_code_fields.button.apply"
  }))));
};
PromoCodeFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PromoCodeFields);

/***/ }),

/***/ "./app/components/forms/usePromoCodeFields.jsx":
/*!*****************************************************!*\
  !*** ./app/components/forms/usePromoCodeFields.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ usePromoCodeFields)
/* harmony export */ });
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

function usePromoCodeFields({
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
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const fields = {
    code: {
      name: `${prefix}code`,
      label: formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Promo Code"
        }],
        id: "use_promo_code_fields.label.promo_code"
      }),
      type: 'text',
      defaultValue: '',
      rules: {
        required: formatMessage({
          defaultMessage: [{
            "type": 0,
            "value": "Please provide a valid promo code."
          }],
          id: "use_promo_code_fields.error.required_promo_code"
        })
      },
      error: errors[`${prefix}code`],
      control
    }
  };
  return fields;
}

/***/ }),

/***/ "./app/components/order-summary/index.jsx":
/*!************************************************!*\
  !*** ./app/components/order-summary/index.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_promo_code__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/promo-code */ "./app/components/promo-code/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-image */ "./app/components/item-variant/item-image.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-name */ "./app/components/item-variant/item-name.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-attributes */ "./app/components/item-variant/item-attributes.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-price */ "./app/components/item-variant/item-price.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_promo_popover__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/promo-popover */ "./app/components/promo-popover/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");


const _excluded = ["removePromoCode"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */














const CartItems = ({
  basket
}) => {
  var _basket$productItems, _basket$productItems2, _basket$productItems3;
  const totalItems = (basket === null || basket === void 0 ? void 0 : (_basket$productItems = basket.productItems) === null || _basket$productItems === void 0 ? void 0 : _basket$productItems.reduce((acc, item) => acc + item.quantity, 0)) || 0;
  const productIds = (basket === null || basket === void 0 ? void 0 : (_basket$productItems2 = basket.productItems) === null || _basket$productItems2 === void 0 ? void 0 : _basket$productItems2.map(({
    productId
  }) => productId).join(',')) ?? '';
  const {
    data: products
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_12__.useProducts)({
    parameters: {
      ids: productIds,
      allImages: true
    }
  }, {
    enabled: Boolean(productIds),
    select: result => {
      var _result$data;
      // Convert array into key/value object with key is the product id
      return result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.reduce((result, item) => {
        const key = item.id;
        result[key] = item;
        return result;
      }, {});
    }
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Accordion, {
    allowToggle: true,
    width: "100%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.AccordionItem, {
    style: {
      border: 0
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.AccordionButton, {
    color: "blue.700"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_13__.BasketIcon, {
    "aria-hidden": true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    px: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    id: "order_summary.cart_items.action.num_of_items_in_cart",
    defaultMessage: [{
      "type": 6,
      "value": "itemCount",
      "options": {
        "=0": {
          "value": [{
            "type": 0,
            "value": "0 items"
          }]
        },
        "one": {
          "value": [{
            "type": 7
          }, {
            "type": 0,
            "value": " item"
          }]
        },
        "other": {
          "value": [{
            "type": 7
          }, {
            "type": 0,
            "value": " items"
          }]
        }
      },
      "offset": 0,
      "pluralType": "cardinal"
    }, {
      "type": 0,
      "value": " in cart"
    }],
    values: {
      itemCount: totalItems
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.AccordionIcon, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.AccordionPanel, {
    px: 0,
    py: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 5,
    align: "flex-start",
    divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Divider, null)
  }, (_basket$productItems3 = basket.productItems) === null || _basket$productItems3 === void 0 ? void 0 : _basket$productItems3.map((product, idx) => {
    const variant = _objectSpread(_objectSpread(_objectSpread({}, product), products && products[product.productId]), {}, {
      price: product.price
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_6__["default"], {
      key: product.productId,
      index: idx,
      variant: variant
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      width: "full",
      alignItems: "flex-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_7__["default"], {
      width: "80px",
      mr: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
      width: "full",
      spacing: 1,
      marginTop: "-3px"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_9__["default"], {
      includeQuantity: true
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_10__["default"], {
      baseDirection: "row",
      currency: basket === null || basket === void 0 ? void 0 : basket.currency
    }))));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_4__["default"],
    to: "/cart",
    variant: "link",
    width: "full",
    color: "blue.700"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Edit cart"
    }],
    id: "order_summary.cart_items.link.edit_cart"
  }))))));
};
CartItems.propTypes = {
  basket: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object)
};
const OrderSummary = ({
  basket,
  showPromoCodeForm = false,
  showCartItems = false,
  isEstimate = false,
  fontSize = 'md'
}) => {
  var _basket$shippingItems, _shippingItem$priceAd, _basket$orderPriceAdj, _shippingItem$priceAd2, _shippingItem$priceAd3, _basket$couponItems;
  const _usePromoCode = (0,_salesforce_retail_react_app_app_components_promo_code__WEBPACK_IMPORTED_MODULE_5__.usePromoCode)(),
    {
      removePromoCode
    } = _usePromoCode,
    promoCodeProps = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_usePromoCode, _excluded);
  if (!(basket !== null && basket !== void 0 && basket.basketId) && !(basket !== null && basket !== void 0 && basket.orderNo)) {
    return null;
  }
  const shippingItem = (_basket$shippingItems = basket.shippingItems) === null || _basket$shippingItems === void 0 ? void 0 : _basket$shippingItems[0];
  const hasShippingPromos = (shippingItem === null || shippingItem === void 0 ? void 0 : (_shippingItem$priceAd = shippingItem.priceAdjustments) === null || _shippingItem$priceAd === void 0 ? void 0 : _shippingItem$priceAd.length) > 0;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    "data-testid": "sf-order-summary",
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: fontSize,
    pt: 1,
    id: "order-summary-heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Summary"
    }],
    id: "order_summary.heading.order_summary"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 4,
    align: "flex-start",
    role: "region",
    "aria-labelledby": "order-summary-heading"
  }, showCartItems && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(CartItems, {
    basket: basket
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    w: "full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Subtotal"
    }],
    id: "order_summary.label.subtotal"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__.FormattedNumber, {
    style: "currency",
    currency: basket === null || basket === void 0 ? void 0 : basket.currency,
    value: basket === null || basket === void 0 ? void 0 : basket.productSubTotal
  }))), (_basket$orderPriceAdj = basket.orderPriceAdjustments) === null || _basket$orderPriceAdj === void 0 ? void 0 : _basket$orderPriceAdj.map(adjustment => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between",
    key: adjustment.priceAdjustmentId,
    "aria-live": "polite",
    "aria-atomic": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: fontSize
  }, adjustment.itemText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    color: "green.600",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__.FormattedNumber, {
    style: "currency",
    currency: basket === null || basket === void 0 ? void 0 : basket.currency,
    value: adjustment.price
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    lineHeight: 1,
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping"
    }],
    id: "order_summary.label.shipping"
  }), hasShippingPromos && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    as: "span",
    ml: 1
  }, "(", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Promotion applied"
    }],
    id: "order_summary.label.promo_applied"
  }), ")")), hasShippingPromos && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_promo_popover__WEBPACK_IMPORTED_MODULE_11__["default"], {
    ml: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, null, shippingItem === null || shippingItem === void 0 ? void 0 : (_shippingItem$priceAd2 = shippingItem.priceAdjustments) === null || _shippingItem$priceAd2 === void 0 ? void 0 : _shippingItem$priceAd2.map(adjustment => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    key: adjustment.priceAdjustmentId,
    fontSize: "sm"
  }, adjustment.itemText))))), shippingItem !== null && shippingItem !== void 0 && (_shippingItem$priceAd3 = shippingItem.priceAdjustments) !== null && _shippingItem$priceAd3 !== void 0 && _shippingItem$priceAd3.some(({
    appliedDiscount
  }) => (appliedDiscount === null || appliedDiscount === void 0 ? void 0 : appliedDiscount.type) === 'free') ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    as: "span",
    color: "green.700",
    textTransform: "uppercase",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Free"
    }],
    id: "order_summary.label.free"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__.FormattedNumber, {
    value: basket.shippingTotal,
    style: "currency",
    currency: basket.currency
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Tax"
    }],
    id: "order_summary.label.tax"
  })), basket.taxTotal != null ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__.FormattedNumber, {
    value: basket.taxTotal,
    style: "currency",
    currency: basket.currency
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: fontSize,
    color: "gray.700"
  }, "TBD"))), showPromoCodeForm ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    w: "full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_promo_code__WEBPACK_IMPORTED_MODULE_5__.PromoCode, promoCodeProps)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Divider, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 4,
    w: "full"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    w: "full",
    justify: "space-between",
    "aria-live": "polite",
    "aria-atomic": "true"
  }, isEstimate ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Estimated Total"
    }],
    id: "order_summary.label.estimated_total"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Total"
    }],
    id: "order_summary.label.order_total"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_16__.FormattedNumber, {
    style: "currency",
    currency: basket === null || basket === void 0 ? void 0 : basket.currency,
    value: (basket === null || basket === void 0 ? void 0 : basket.orderTotal) || (basket === null || basket === void 0 ? void 0 : basket.productTotal)
  }))), ((_basket$couponItems = basket.couponItems) === null || _basket$couponItems === void 0 ? void 0 : _basket$couponItems.length) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    p: 4,
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "base",
    bg: "white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "medium",
    fontSize: fontSize
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Promotions applied"
    }],
    id: "order_summary.label.promotions_applied"
  }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, null, basket.couponItems.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    key: item.couponItemId,
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    flex: "1",
    fontSize: "sm",
    color: "gray.800"
  }, item.code), !basket.orderNo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    size: "sm",
    colorScheme: "red",
    onClick: () => removePromoCode(item.couponItemId)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Remove"
    }],
    id: "order_summary.action.remove_promo"
  })))))))));
};
OrderSummary.propTypes = {
  basket: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object),
  showPromoCodeForm: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),
  showCartItems: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),
  isEstimate: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().bool),
  fontSize: prop_types__WEBPACK_IMPORTED_MODULE_15___default().oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OrderSummary);

/***/ }),

/***/ "./app/components/promo-code/index.jsx":
/*!*********************************************!*\
  !*** ./app/components/promo-code/index.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PromoCode: () => (/* binding */ PromoCode),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   usePromoCode: () => (/* binding */ usePromoCode)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_promo_code_fields__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/promo-code-fields */ "./app/components/forms/promo-code-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */










const usePromoCode = () => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_8__["default"])();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_7__.useCurrentBasket)();
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_9__.useForm)();
  const toast = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useToast)();
  const applyPromoCodeMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutation)('addCouponToBasket');
  const removePromoCodeMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutation)('removeCouponFromBasket');
  const submitPromoCode = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* ({
      code
    }) {
      try {
        yield applyPromoCodeMutation.mutateAsync({
          parameters: {
            basketId: basket === null || basket === void 0 ? void 0 : basket.basketId
          },
          body: {
            code
          }
        });
        form.reset({
          code: ''
        });
        toast({
          title: formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Promotion applied"
            }],
            id: "use_promocode.info.promo_applied"
          }),
          status: 'success',
          position: 'top-right',
          isClosable: true
        });
      } catch (e) {
        form.setError('code', {
          type: 'manual',
          message: formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Check the code and try again, it may already be applied or the promo has expired."
            }],
            id: "use_promocode.error.check_the_code"
          })
        }, {
          shouldFocus: true
        });
      }
    });
    return function submitPromoCode(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  const removePromoCode = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (couponItemId) {
      removePromoCodeMutation.mutate({
        parameters: {
          basketId: basket === null || basket === void 0 ? void 0 : basket.basketId,
          couponItemId
        }
      }, {
        onSuccess: () => {
          toast({
            title: formatMessage({
              defaultMessage: [{
                "type": 0,
                "value": "Promotion removed"
              }],
              id: "use_promocode.info.promo_removed"
            }),
            status: 'success',
            position: 'top-right',
            isClosable: true
          });
        },
        onError: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_5__.API_ERROR_MESSAGE),
            status: 'error',
            position: 'top-right',
            isClosable: true
          });
        }
      });
    });
    return function removePromoCode(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  return {
    form,
    submitPromoCode,
    removePromoCode
  };
};
const PromoCode = ({
  form,
  submitPromoCode,
  itemProps
}) => {
  const [isOpen, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (form.formState.isSubmitSuccessful) {
      setOpen(false);
    }
  }, [form.formState.isSubmitSuccessful]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Accordion, {
    allowToggle: true,
    index: isOpen ? 0 : -1,
    onChange: () => setOpen(!isOpen)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AccordionItem, itemProps, ({
    isExpanded
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AccordionButton, {
    as: _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button,
    justifyContent: "flex-start",
    variant: "link",
    fontSize: "sm",
    color: "blue.700",
    rightIcon: isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.ChevronUpIcon, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.ChevronDownIcon, null),
    onClick: () => form.reset()
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_10__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Do you have a promo code?"
    }],
    id: "promocode.accordion.button.have_promocode"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AccordionPanel, {
    px: 0,
    mb: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": "promo-code-form",
    as: "form",
    p: 4,
    background: "white",
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "base",
    onSubmit: form.handleSubmit(submitPromoCode)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_forms_promo_code_fields__WEBPACK_IMPORTED_MODULE_4__["default"], {
    form: form,
    maxWidth: "350px"
  }))))));
};
PromoCode.propTypes = {
  /** The form object returned from `usePromoCode` hook */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object).isRequired,
  /** The submit callback returned from `usePromoCode` hook */
  submitPromoCode: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().func).isRequired,
  /** Props applied to inner AccordionItem. Useful for style overrides. */
  itemProps: (prop_types__WEBPACK_IMPORTED_MODULE_11___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PromoCode);

/***/ })

}]);
//# sourceMappingURL=app_components_order-summary_index_jsx.js.map