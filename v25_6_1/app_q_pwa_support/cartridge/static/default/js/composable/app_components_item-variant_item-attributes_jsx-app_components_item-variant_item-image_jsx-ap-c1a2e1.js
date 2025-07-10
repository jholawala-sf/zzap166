"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["app_components_item-variant_item-attributes_jsx-app_components_item-variant_item-image_jsx-ap-c1a2e1"],{

/***/ "./app/components/item-variant/index.jsx":
/*!***********************************************!*\
  !*** ./app/components/item-variant/index.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   useItemVariant: () => (/* binding */ useItemVariant)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



/**
 * This component and associated context/hook provide a convenient wrapper
 * around a group of components used for rendering product variant details.
 */

const ItemVariantContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
const useItemVariant = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ItemVariantContext);
};

/**
 * The Provider component for rendering product item and variant detail.
 */
const ItemVariantProvider = ({
  variant,
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ItemVariantContext.Provider, {
    value: variant
  }, children);
};
ItemVariantProvider.propTypes = {
  variant: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().any)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemVariantProvider);

/***/ }),

/***/ "./app/components/item-variant/item-attributes.jsx":
/*!*********************************************************!*\
  !*** ./app/components/item-variant/item-attributes.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_promo_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/promo-popover */ "./app/components/promo-popover/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/product-utils */ "./app/utils/product-utils.js");



const _excluded = ["includeQuantity", "currency"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */












/**
 * In the context of a cart product item variant, this component renders a styled
 * list of the selected variation values as well as any promos (w/ info popover).
 */
const ItemAttributes = _ref => {
  var _variant$priceAdjustm, _variant$bundledProdu, _variant$type, _variant$type2, _variant$priceAdjustm2;
  let {
      includeQuantity,
      currency
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded);
  const variant = (0,_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_5__.useItemVariant)();
  const {
    data: basket
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_8__.useCurrentBasket)();
  const {
    currency: activeCurrency
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_7__.useCurrency)();
  const promotionIds = ((_variant$priceAdjustm = variant.priceAdjustments) === null || _variant$priceAdjustm === void 0 ? void 0 : _variant$priceAdjustm.map(adj => adj.promotionId)) ?? [];
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_11__["default"])();

  // Fetch all the promotions given by price adjustments. We display this info in
  // the promotion info popover when applicable.
  const {
    data: res
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_9__.usePromotions)({
    parameters: {
      ids: promotionIds.join(',')
    }
  }, {
    enabled: promotionIds.length > 0
  });
  const promos = (res === null || res === void 0 ? void 0 : res.data) || [];
  const variationValues = (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_10__.getDisplayVariationValues)(variant === null || variant === void 0 ? void 0 : variant.variationAttributes, variant === null || variant === void 0 ? void 0 : variant.variationValues);

  // get variant info for bundled products in cart page and order history page
  const productBundleIds = (variant === null || variant === void 0 ? void 0 : (_variant$bundledProdu = variant.bundledProductItems) === null || _variant$bundledProdu === void 0 ? void 0 : _variant$bundledProdu.map(({
    productId
  }) => productId).join(',')) ?? '';
  const {
    data: productBundleVariantData,
    isLoading: bundleVariantIsLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_9__.useProducts)({
    parameters: {
      ids: productBundleIds,
      allImages: false
    }
  }, {
    enabled: Boolean((variant === null || variant === void 0 ? void 0 : (_variant$type = variant.type) === null || _variant$type === void 0 ? void 0 : _variant$type.bundle) && productBundleIds),
    select: result => {
      var _result$data;
      // formats response so we can easily display child quantity/variant selection
      return result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.map(item => {
        var _variant$bundledProdu2;
        const quantity = variant === null || variant === void 0 ? void 0 : (_variant$bundledProdu2 = variant.bundledProductItems.find(childProduct => childProduct.productId === item.id)) === null || _variant$bundledProdu2 === void 0 ? void 0 : _variant$bundledProdu2.quantity;
        return _objectSpread(_objectSpread({}, item), {}, {
          quantity,
          variationValues: (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_10__.getDisplayVariationValues)(item === null || item === void 0 ? void 0 : item.variationAttributes, item === null || item === void 0 ? void 0 : item.variationValues)
        });
      });
    }
  });

  // get bundle product data for wishlist page
  const {
    data: productBundleData,
    isLoading: productBundleIsLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_9__.useProduct)({
    parameters: {
      id: variant === null || variant === void 0 ? void 0 : variant.id,
      allImages: false
    }
  }, {
    enabled: Boolean((variant === null || variant === void 0 ? void 0 : (_variant$type2 = variant.type) === null || _variant$type2 === void 0 ? void 0 : _variant$type2.bundle) && !productBundleIds)
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    spacing: 1.5,
    flex: 1
  }, props), variationValues && Object.keys(variationValues).map(key => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    lineHeight: 1,
    color: "gray.700",
    fontSize: "sm",
    key: `${key}: ${variationValues[key]}`
  }, key, ": ", variationValues[key])), (variant === null || variant === void 0 ? void 0 : variant.optionItems) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 1.5
  }, variant === null || variant === void 0 ? void 0 : variant.optionItems.map(option => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    lineHeight: 1,
    color: "gray.700",
    fontSize: "sm",
    key: option.optionId
  }, option.itemText || option.optionValueId))), includeQuantity && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    lineHeight: 1,
    color: "gray.700",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_12__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Quantity: "
    }, {
      "type": 1,
      "value": "quantity"
    }],
    values: {
      quantity: variant.quantity
    },
    id: "item_attributes.label.quantity"
  })), !productBundleIsLoading && productBundleData && !productBundleVariantData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, productBundleData === null || productBundleData === void 0 ? void 0 : productBundleData.bundledProducts.map(({
    product,
    quantity
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    marginTop: 2,
    key: product.id
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    color: "gray.700",
    as: "b"
  }, product === null || product === void 0 ? void 0 : product.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: "sm",
    color: "gray.700"
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Qty"
    }],
    id: "add_to_cart_modal.label.quantity"
  }), ": ", quantity)))), !bundleVariantIsLoading && productBundleVariantData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    fontSize: 15,
    marginTop: 3,
    fontWeight: 500
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Selected Options"
    }],
    id: "item_attributes.label.selected_options"
  }), ":"), productBundleVariantData === null || productBundleVariantData === void 0 ? void 0 : productBundleVariantData.map(({
    variationValues,
    name: productName,
    quantity,
    id
  }) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
      key: id,
      marginTop: 2
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
      fontSize: "sm",
      color: "gray.700",
      as: "b"
    }, productName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
      fontSize: "sm",
      color: "gray.700"
    }, intl.formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Qty"
      }],
      id: "add_to_cart_modal.label.quantity"
    }), ": ", quantity), Object.keys(variationValues).map(key => {
      const selectedVariant = `${key}: ${variationValues[key]}`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
        fontSize: "sm",
        color: "gray.700",
        key: selectedVariant
      }, selectedVariant);
    }));
  })), ((_variant$priceAdjustm2 = variant.priceAdjustments) === null || _variant$priceAdjustm2 === void 0 ? void 0 : _variant$priceAdjustm2.length) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Flex, {
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    lineHeight: 1,
    color: "gray.700",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_12__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Promotions"
    }],
    id: "item_attributes.label.promotions"
  }), ': ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    as: "span",
    color: "green.700"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_13__.FormattedNumber, {
    style: "currency",
    currency: currency || (basket === null || basket === void 0 ? void 0 : basket.currency) || activeCurrency,
    value: variant.priceAdjustments.reduce((acc, adj) => acc + (adj.price ?? 0), 0)
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_promo_popover__WEBPACK_IMPORTED_MODULE_6__["default"], {
    ml: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, null, promos === null || promos === void 0 ? void 0 : promos.map(promo => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Text, {
    key: promo === null || promo === void 0 ? void 0 : promo.id,
    fontSize: "sm"
  }, promo === null || promo === void 0 ? void 0 : promo.calloutMsg))))));
};
ItemAttributes.propTypes = {
  includeQuantity: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().bool),
  currency: (prop_types__WEBPACK_IMPORTED_MODULE_14___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemAttributes);

/***/ }),

/***/ "./app/components/item-variant/item-image.jsx":
/*!****************************************************!*\
  !*** ./app/components/item-variant/item-image.jsx ***!
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
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! . */ "./app/components/item-variant/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_image_groups_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/image-groups-utils */ "./app/utils/image-groups-utils.js");


const _excluded = ["imageProps", "ratio"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







/**
 * In the context of a cart product item variant, this component renders the item's
 * main image.
 *
 * @todo = This component will render a `SALE` badge when the qualifier is available
 * on the custom property `c_isSale`. This will need to be expanded upon to handle
 * different badge/qualifiers and property names.
 */
const ItemImage = _ref => {
  var _findImageGroupBy, _findImageGroupBy$ima;
  let {
      imageProps,
      ratio = 1
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const variant = (0,___WEBPACK_IMPORTED_MODULE_4__.useItemVariant)();

  // We find the 'small' images in the variant's image groups based on variationValues and pick the first one
  const image = (_findImageGroupBy = (0,_salesforce_retail_react_app_app_utils_image_groups_utils__WEBPACK_IMPORTED_MODULE_5__.findImageGroupBy)(variant === null || variant === void 0 ? void 0 : variant.imageGroups, {
    viewType: 'small',
    selectedVariationAttributes: variant === null || variant === void 0 ? void 0 : variant.variationValues
  })) === null || _findImageGroupBy === void 0 ? void 0 : (_findImageGroupBy$ima = _findImageGroupBy.images) === null || _findImageGroupBy$ima === void 0 ? void 0 : _findImageGroupBy$ima[0];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    width: "84px",
    backgroundColor: "gray.100"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.AspectRatio, {
    ratio: ratio
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    position: "relative"
  }, variant.c_isSale && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Badge, {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 2,
    marginTop: 2,
    fontSize: "10px",
    variant: "solid",
    colorScheme: "blue"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sale"
    }],
    id: "item_image.label.sale"
  })), variant.isProductUnavailable && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Badge, {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 2,
    marginTop: 2,
    fontSize: "10px",
    variant: "solid",
    colorScheme: "red"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Unavailable"
    }],
    id: "item_image.label.unavailable"
  })), image && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Image, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    alt: image.alt,
    src: `${image.disBaseLink || image.link}`,
    ignoreFallback: true
  }, imageProps)))));
};
ItemImage.propTypes = {
  imageProps: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().object),
  ratio: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().number)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemImage);

/***/ }),

/***/ "./app/components/item-variant/item-name.jsx":
/*!***************************************************!*\
  !*** ./app/components/item-variant/item-name.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! . */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





/**
 * In the context of a cart product item variant, this components simply renders
 * the item's name using the cart item field `productName`. We use this field
 * rather than variant `name` field as the variant detail may not yet be
 * available upon rendering.
 */
const ItemName = props => {
  var _variant$master;
  const variant = (0,___WEBPACK_IMPORTED_MODULE_2__.useItemVariant)();
  const productId = (variant === null || variant === void 0 ? void 0 : (_variant$master = variant.master) === null || _variant$master === void 0 ? void 0 : _variant$master.masterId) || variant.id;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Heading, {
    as: "h2",
    fontSize: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, props, {
    color: "black.600",
    to: `/product/${productId}`
  }), variant.productName || variant.name));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemName);

/***/ }),

/***/ "./app/components/item-variant/item-price.jsx":
/*!****************************************************!*\
  !*** ./app/components/item-variant/item-price.jsx ***!
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
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! . */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/product-utils */ "./app/utils/product-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_display_price__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/display-price */ "./app/components/display-price/index.jsx");


const _excluded = ["currency", "align", "baseDirection"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







const PricePerItem = ({
  currency,
  basePrice
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontSize: {
      base: '12px',
      lg: '14px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_7__.FormattedNumber, {
    style: "currency",
    currency: currency,
    value: basePrice
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_8__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "ea"
    }],
    id: "price_per_item.label.each"
  }));
};
PricePerItem.propTypes = {
  currency: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string).isRequired,
  basePrice: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().number)
};

/**
 * In the context of a cart product item variant, this component renders the item's
 * pricing, taking into account applied discounts as well as base item prices.
 */
const ItemPrice = _ref => {
  var _variant$type, _variant$type2, _priceData, _priceData2, _priceData3;
  let {
      currency,
      align = 'right',
      baseDirection = 'column'
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const variant = (0,___WEBPACK_IMPORTED_MODULE_4__.useItemVariant)();
  const {
    price,
    priceAfterItemDiscount
  } = variant;
  const isASet = variant === null || variant === void 0 ? void 0 : (_variant$type = variant.type) === null || _variant$type === void 0 ? void 0 : _variant$type.set;
  const isMaster = variant === null || variant === void 0 ? void 0 : (_variant$type2 = variant.type) === null || _variant$type2 === void 0 ? void 0 : _variant$type2.master;
  let priceData;
  // When variant has basket pricing, we should prioritize these prices for displaying
  // since they may have take promotion/discount into account
  // NOTE: try NOT to re-calculate these values since basket-level discount is complicated
  if (variant !== null && variant !== void 0 && variant.itemId) {
    var _variant$optionItems;
    /** TOOLKIT CUSTOMIZATION **/
    var optionTotal = 0;
    if (variant !== null && variant !== void 0 && (_variant$optionItems = variant.optionItems) !== null && _variant$optionItems !== void 0 && _variant$optionItems.length) {
      optionTotal = variant.optionItems.reduce((acc, option) => acc + option.price, 0);
    }
    priceData = {
      currentPrice: priceAfterItemDiscount + optionTotal,
      // we don't want to show strikethrough price for cart since listPrice is not available via basket pricing
      listPrice: null,
      pricePerUnit: (variant === null || variant === void 0 ? void 0 : variant.pricePerUnit) + optionTotal,
      isASet,
      isMaster,
      isRange: isASet || isMaster || false,
      isOnSale: price > priceAfterItemDiscount
    };
    /** END TOOLKIT CUSTOMIZATION **/
  } else {
    // for wishlist page we extract price info from variant/product obj
    priceData = (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_5__.getPriceData)(variant);
  }
  const isDesktop = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useBreakpointValue)({
    base: false,
    lg: true
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    textAlign: align,
    direction: baseDirection,
    justifyContent: align === 'left' ? 'flex-start' : 'flex-end',
    alignItems: "baseline",
    spacing: (_priceData = priceData) !== null && _priceData !== void 0 && _priceData.isOnSale ? 0 : 1,
    wrap: "nowrap"
  }, props), !isDesktop && (variant === null || variant === void 0 ? void 0 : variant.quantity) > 1 && !isASet && ((_priceData2 = priceData) === null || _priceData2 === void 0 ? void 0 : _priceData2.pricePerUnit) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(PricePerItem, {
    currency: currency,
    basePrice: priceData.pricePerUnit
  }), variant !== null && variant !== void 0 && variant.itemId ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_display_price__WEBPACK_IMPORTED_MODULE_6__["default"], {
    labelForA11y: variant === null || variant === void 0 ? void 0 : variant.name,
    currency: currency,
    priceData: priceData,
    listPriceProps: {
      fontSize: 'sm'
    }
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_display_price__WEBPACK_IMPORTED_MODULE_6__["default"], {
    labelForA11y: variant === null || variant === void 0 ? void 0 : variant.name,
    currency: currency,
    priceData: priceData,
    quantity: variant === null || variant === void 0 ? void 0 : variant.quantity,
    listPriceProps: {
      fontSize: 'sm'
    }
  }), isDesktop && (variant === null || variant === void 0 ? void 0 : variant.quantity) > 1 && !isASet && ((_priceData3 = priceData) === null || _priceData3 === void 0 ? void 0 : _priceData3.pricePerUnit) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(PricePerItem, {
    currency: currency,
    basePrice: priceData.pricePerUnit
  }));
};
ItemPrice.propTypes = {
  currency: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string).isRequired,
  align: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string),
  baseDirection: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ItemPrice);

/***/ }),

/***/ "./app/components/promo-popover/index.jsx":
/*!************************************************!*\
  !*** ./app/components/promo-popover/index.jsx ***!
  \************************************************/
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
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");


const _excluded = ["header", "children"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






/**
 * This component renders a small info icon and displays a popover when hovered. It could be adapted
 * to handle any kind of popover if needed, but for now its been set up to be used/shared for displaying
 * promotions applied to products and/or orders on cart, checkout, order confirmation and order history.
 */
const PromoPopover = _ref => {
  let {
      header,
      children
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_5__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    position: "relative"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Popover, {
    isLazy: true,
    placement: "top",
    boundary: "scrollParent",
    trigger: "hover",
    variant: "small"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.PopoverTrigger, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.IconButton, {
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.InfoIcon, {
      display: "block",
      boxSize: "18px",
      mt: "-2px",
      ml: "-1px",
      color: "gray.600"
    }),
    display: "block",
    size: "xs",
    height: "14px",
    width: "14px",
    minWidth: "auto",
    position: "relative",
    variant: "unstyled",
    "aria-label": intl.formatMessage({
      id: "promo_popover.assistive_msg.info",
      defaultMessage: [{
        "type": 0,
        "value": "Info"
      }]
    })
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.PopoverContent, {
    border: "none",
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    boxShadow: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.PopoverArrow, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.PopoverCloseButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.PopoverHeader, {
    borderBottom: "none"
  }, header || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold",
    fontSize: "md"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_6__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Promotions Applied"
    }],
    id: "promo_popover.heading.promo_applied"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.PopoverBody, {
    pt: 0
  }, children)))));
};
PromoPopover.propTypes = {
  header: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_7___default().any)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PromoPopover);

/***/ })

}]);
//# sourceMappingURL=app_components_item-variant_item-attributes_jsx-app_components_item-variant_item-image_jsx-ap-c1a2e1.js.map