"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-cart"],{

/***/ "./app/components/product-view-modal/bundle.jsx":
/*!******************************************************!*\
  !*** ./app/components/product-view-modal/bundle.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/media-query/dist/chunk-KC77MHL3.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/modal/dist/chunk-MSA2NPQT.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/modal/dist/chunk-JQMJHPZH.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/modal/dist/chunk-EL2VKIZQ.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/modal/dist/chunk-4FCEGNGT.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/modal/dist/chunk-OFOVX77R.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-NTCQBYKE.mjs");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-view */ "./app/components/product-view/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_product_view_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-product-view-modal */ "./app/hooks/use-product-view-modal.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_components_image_gallery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/image-gallery */ "./app/components/image-gallery/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");



const _excluded = ["product", "isOpen", "onClose", "updateCart"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */











/**
 * A Modal that contains Product View for product bundle
 */
const BundleProductViewModal = _ref => {
  var _productViewModalData, _productViewModalData2, _productViewModalData3, _productViewModalData4;
  let {
      product: bundle,
      isOpen,
      onClose,
      updateCart
    } = _ref,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, _excluded);
  const productViewModalData = (0,_salesforce_retail_react_app_app_hooks_use_product_view_modal__WEBPACK_IMPORTED_MODULE_5__.useProductViewModal)(bundle);
  const {
    variationParams
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_8__.useDerivedProduct)(bundle);
  const childProductRefs = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)({});
  const [childProductOrderability, setChildProductOrderability] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({});
  const [selectedChildProducts, setSelectedChildProducts] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);
  const [selectedBundleQuantity, setSelectedBundleQuantity] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(productViewModalData === null || productViewModalData === void 0 ? void 0 : (_productViewModalData = productViewModalData.product) === null || _productViewModalData === void 0 ? void 0 : _productViewModalData.quantity);
  const trueIfMobile = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_9__.useBreakpointValue)({
    base: true,
    lg: false
  });
  let childProductIds = (_productViewModalData2 = productViewModalData.product) === null || _productViewModalData2 === void 0 ? void 0 : (_productViewModalData3 = _productViewModalData2.bundledProductItems) === null || _productViewModalData3 === void 0 ? void 0 : _productViewModalData3.map(({
    productId
  }) => productId).join(',');
  const productIds = selectedChildProducts.map(({
    variant
  }) => variant.productId).join(',');
  if ((productIds === null || productIds === void 0 ? void 0 : productIds.length) > 0 && productIds !== childProductIds) {
    childProductIds = productIds;
  }
  const {
    data: childProducts,
    isLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useProducts)({
    parameters: {
      ids: childProductIds,
      allImages: true
    }
  }, {
    enabled: Boolean(childProductIds),
    keepPreviousData: true
  });
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_10__["default"])();
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
    productName: productViewModalData === null || productViewModalData === void 0 ? void 0 : (_productViewModalData4 = productViewModalData.product) === null || _productViewModalData4 === void 0 ? void 0 : _productViewModalData4.name
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_11__.Modal, {
    size: "4xl",
    isOpen: isOpen,
    onClose: onClose
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_12__.ModalOverlay, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_13__.ModalContent, {
    containerProps: {
      'data-testid': 'product-view-modal'
    },
    "aria-label": label
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_14__.ModalCloseButton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_15__.ModalBody, {
    pb: 8,
    bg: "white",
    paddingBottom: 6,
    marginTop: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_16__.Flex, {
    direction: ['column', 'column', 'column', 'row']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__.Box, {
    flex: 1,
    mr: [0, 0, 0, 6, 6],
    display: ['none', 'none', 'none', 'block']
  }, bundle ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement((react__WEBPACK_IMPORTED_MODULE_3___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_image_gallery__WEBPACK_IMPORTED_MODULE_7__["default"], {
    size: "sm",
    imageGroups: bundle.imageGroups,
    selectedVariationAttributes: variationParams
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_image_gallery__WEBPACK_IMPORTED_MODULE_7__.Skeleton, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_18__.VStack, {
    align: "stretch",
    flex: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_17__.Box, {
    marginBottom: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_4__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    showFullLink: false,
    showImageGallery: trueIfMobile,
    product: productViewModalData.product,
    isLoading: productViewModalData.isFetching,
    updateCart: (product, quantity) => updateCart(product, quantity, selectedChildProducts),
    validateOrderability: () => {
      return Object.values(childProductRefs.current).every(({
        validateOrderability
      }) => validateOrderability());
    },
    childProductOrderability: childProductOrderability,
    setSelectedBundleQuantity: setSelectedBundleQuantity
  }, props))), childProducts && childProducts.data.map((_product, i) => {
    const product = _objectSpread(_objectSpread({}, _product), productViewModalData.product.bundledProductItems[i]);
    const quantityPerBundle = product.quantity / bundle.quantity;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_4__["default"], {
      key: i
      // Do not use an arrow function as we are manipulating the functions scope.
      ,
      ref: function (ref) {
        // Assign the "set" scope of the ref, this is how we access the internal validation.
        childProductRefs.current[product.itemId] = {
          ref,
          validateOrderability: this.validateOrderability
        };
      },
      showImageGallery: false,
      isProductPartOfBundle: true,
      showFullLink: false,
      product: product,
      isLoading: isLoading,
      setChildProductOrderability: setChildProductOrderability,
      childOfBundleQuantity: quantityPerBundle,
      selectedBundleParentQuantity: selectedBundleQuantity,
      onVariantSelected: (product, variant, quantity) => {
        setSelectedChildProducts(prev => {
          const newArray = prev.slice(0);
          newArray[i] = {
            product,
            variant,
            quantity
          };
          return newArray;
        });
      }
    });
  }))))));
};
BundleProductViewModal.propTypes = {
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_19___default().bool).isRequired,
  onOpen: (prop_types__WEBPACK_IMPORTED_MODULE_19___default().func).isRequired,
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_19___default().func).isRequired,
  product: (prop_types__WEBPACK_IMPORTED_MODULE_19___default().object),
  isLoading: (prop_types__WEBPACK_IMPORTED_MODULE_19___default().bool),
  updateCart: (prop_types__WEBPACK_IMPORTED_MODULE_19___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BundleProductViewModal);

/***/ }),

/***/ "./app/pages/cart/index.jsx":
/*!**********************************!*\
  !*** ./app/pages/cart/index.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_cart_partials_cart_cta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/cart/partials/cart-cta */ "./app/pages/cart/partials/cart-cta.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_cart_partials_cart_secondary_button_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/cart/partials/cart-secondary-button-group */ "./app/pages/cart/partials/cart-secondary-button-group.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_cart_partials_cart_skeleton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/cart/partials/cart-skeleton */ "./app/pages/cart/partials/cart-skeleton.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_cart_partials_cart_title__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/cart/partials/cart-title */ "./app/pages/cart/partials/cart-title.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_confirmation_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/confirmation-modal */ "./app/components/confirmation-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_cart_partials_empty_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/cart/partials/empty-cart */ "./app/pages/cart/partials/empty-cart.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/order-summary */ "./app/components/order-summary/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_item__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-item */ "./app/components/product-item/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_view_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-view-modal */ "./app/components/product-view-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_view_modal_bundle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-view-modal/bundle */ "./app/components/product-view-modal/bundle.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/recommended-products */ "./overlays/page-designer-theme-home/app/components/recommended-products/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-wish-list */ "./app/hooks/use-wish-list.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_unavailable_product_confirmation_modal__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/unavailable-product-confirmation-modal */ "./app/components/unavailable-product-confirmation-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/product-utils */ "./app/utils/product-utils.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



// Chakra Components


// Project Components












// Hooks




// Constants



// Utilities






const DEBOUNCE_WAIT = 750;
const Cart = () => {
  var _basket$productItems, _basket$productItems2, _basket$productItems5, _basket$productItems6;
  const {
    data: basket,
    isLoading
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_21__.useCurrentBasket)();
  const productIds = (basket === null || basket === void 0 ? void 0 : (_basket$productItems = basket.productItems) === null || _basket$productItems === void 0 ? void 0 : _basket$productItems.map(({
    productId
  }) => productId).join(',')) ?? '';
  const {
    data: products,
    isLoading: isProductsLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useProducts)({
    parameters: {
      ids: productIds,
      allImages: true,
      perPricebook: true
    }
  }, {
    enabled: Boolean(productIds),
    select: result => {
      var _result$data;
      return result === null || result === void 0 ? void 0 : (_result$data = result.data) === null || _result$data === void 0 ? void 0 : _result$data.reduce((result, item) => {
        const key = item.id;
        result[key] = item;
        return result;
      }, {});
    }
  });
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_23__.useCurrentCustomer)();
  const {
    customerId,
    isRegistered
  } = customer;

  /***************** Product Bundles ************************/
  const bundleChildVariantIds = [];
  basket === null || basket === void 0 ? void 0 : (_basket$productItems2 = basket.productItems) === null || _basket$productItems2 === void 0 ? void 0 : _basket$productItems2.forEach(productItem => {
    var _productItem$bundledP;
    productItem === null || productItem === void 0 ? void 0 : (_productItem$bundledP = productItem.bundledProductItems) === null || _productItem$bundledP === void 0 ? void 0 : _productItem$bundledP.forEach(childProduct => {
      bundleChildVariantIds.push(childProduct.productId);
    });
  });
  const {
    data: bundleChildProductData
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useProducts)({
    parameters: {
      ids: bundleChildVariantIds === null || bundleChildVariantIds === void 0 ? void 0 : bundleChildVariantIds.join(','),
      allImages: false,
      expand: ['availability', 'variations'],
      select: '(data.(id,inventory))'
    }
  }, {
    enabled: (bundleChildVariantIds === null || bundleChildVariantIds === void 0 ? void 0 : bundleChildVariantIds.length) > 0,
    keepPreviousData: true,
    select: result => {
      var _result$data2;
      return result === null || result === void 0 ? void 0 : (_result$data2 = result.data) === null || _result$data2 === void 0 ? void 0 : _result$data2.reduce((result, item) => {
        const key = item.id;
        result[key] = item;
        return result;
      }, {});
    }
  });

  // We use the `products` object to reference products by itemId instead of productId
  // Since with product bundles, even though the parent productId is the same,
  // variant selection of the bundle children can be different,
  // and require unique references to each product bundle
  const productsByItemId = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    var _basket$productItems3;
    const updateProductsByItemId = {};
    basket === null || basket === void 0 ? void 0 : (_basket$productItems3 = basket.productItems) === null || _basket$productItems3 === void 0 ? void 0 : _basket$productItems3.forEach(productItem => {
      let currentProduct = products === null || products === void 0 ? void 0 : products[productItem === null || productItem === void 0 ? void 0 : productItem.productId];

      // calculate inventory for product bundles based on availability of children
      if (productItem !== null && productItem !== void 0 && productItem.bundledProductItems && bundleChildProductData) {
        var _currentProduct, _currentProduct$inven, _currentProduct2;
        let lowestStockLevel = ((_currentProduct = currentProduct) === null || _currentProduct === void 0 ? void 0 : (_currentProduct$inven = _currentProduct.inventory) === null || _currentProduct$inven === void 0 ? void 0 : _currentProduct$inven.stockLevel) ?? Number.MAX_SAFE_INTEGER;
        let productWithLowestInventory = '';
        productItem === null || productItem === void 0 ? void 0 : productItem.bundledProductItems.forEach(bundleChild => {
          var _bundleChildProductDa, _bundleChildProductDa2;
          const bundleChildStockLevel = (bundleChildProductData === null || bundleChildProductData === void 0 ? void 0 : (_bundleChildProductDa = bundleChildProductData[bundleChild.productId]) === null || _bundleChildProductDa === void 0 ? void 0 : (_bundleChildProductDa2 = _bundleChildProductDa.inventory) === null || _bundleChildProductDa2 === void 0 ? void 0 : _bundleChildProductDa2.stockLevel) ?? Number.MAX_SAFE_INTEGER;
          lowestStockLevel = Math.min(lowestStockLevel, bundleChildStockLevel);
          if (lowestStockLevel === bundleChildStockLevel) productWithLowestInventory = bundleChild.productName;
        });
        if ((_currentProduct2 = currentProduct) !== null && _currentProduct2 !== void 0 && _currentProduct2.inventory) {
          currentProduct = _objectSpread(_objectSpread({}, currentProduct), {}, {
            inventory: _objectSpread(_objectSpread({}, currentProduct.inventory), {}, {
              stockLevel: lowestStockLevel,
              lowestStockLevelProductName: productWithLowestInventory
            })
          });
        }
      }
      updateProductsByItemId[productItem.itemId] = currentProduct;
    });
    return updateProductsByItemId;
  }, [basket, products, bundleChildProductData]);

  /*****************Basket Mutation************************/
  const updateItemInBasketMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useShopperBasketsMutation)('updateItemInBasket');
  const updateItemsInBasketMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useShopperBasketsMutation)('updateItemsInBasket');
  const removeItemFromBasketMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useShopperBasketsMutation)('removeItemFromBasket');
  const updateShippingMethodForShipmentsMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useShopperBasketsMutation)('updateShippingMethodForShipment');
  /*****************Basket Mutation************************/

  const [selectedItem, setSelectedItem] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(undefined);
  const [localQuantity, setLocalQuantity] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({});
  const [localIsGiftItems, setLocalIsGiftItems] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({});
  const [isCartItemLoading, setCartItemLoading] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const {
    isOpen,
    onOpen,
    onClose
  } = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.useDisclosure)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_26__["default"])();
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_16__.useToast)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_17__["default"])();
  const modalProps = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.useDisclosure)();

  /******************* Shipping Methods for basket shipment *******************/
  // do this action only if the basket shipping method is not defined
  // we need to fetch the shippment methods to get the default value before we can add it to the basket
  (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useShippingMethodsForShipment)({
    parameters: {
      basketId: basket === null || basket === void 0 ? void 0 : basket.basketId,
      shipmentId: 'me'
    }
  }, {
    // only fetch if basket is has no shipping method in the first shipment
    enabled: !!(basket !== null && basket !== void 0 && basket.basketId) && basket.shipments.length > 0 && !basket.shipments[0].shippingMethod,
    onSuccess: data => {
      updateShippingMethodForShipmentsMutation.mutate({
        parameters: {
          basketId: basket === null || basket === void 0 ? void 0 : basket.basketId,
          shipmentId: 'me'
        },
        body: {
          id: data.defaultShippingMethodId
        }
      });
    }
  });

  /************************* Error handling ***********************/
  const showError = () => {
    toast({
      title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.API_ERROR_MESSAGE),
      status: 'error'
    });
  };
  /************************* Error handling ***********************/

  /**************** Wishlist ****************/
  const {
    data: wishlist
  } = (0,_salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_18__.useWishList)();
  const createCustomerProductListItem = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_22__.useShopperCustomersMutation)('createCustomerProductListItem');
  const handleAddToWishlist = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (product) {
      try {
        var _wishlist$customerPro;
        if (!customerId || !wishlist) {
          return;
        }
        const isItemInWishlist = wishlist === null || wishlist === void 0 ? void 0 : (_wishlist$customerPro = wishlist.customerProductListItems) === null || _wishlist$customerPro === void 0 ? void 0 : _wishlist$customerPro.find(i => i.productId === (product === null || product === void 0 ? void 0 : product.id));
        if (!isItemInWishlist) {
          yield createCustomerProductListItem.mutateAsync({
            parameters: {
              listId: wishlist.id,
              customerId
            },
            body: {
              // NOTE: APi does not respect quantity, it always adds 1
              quantity: product.quantity,
              productId: product.productId,
              public: false,
              priority: 1,
              type: 'product'
            }
          });
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_MESSAGE_ADDED_TO_WISHLIST, {
              quantity: 1
            }),
            status: 'success',
            action:
            /*#__PURE__*/
            // it would be better if we could use <Button as={Link}>
            // but unfortunately the Link component is not compatible
            // with Chakra Toast, since the ToastManager is rendered via portal
            // and the toast doesn't have access to intl provider, which is a
            // requirement of the Link component.
            react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
              variant: "link",
              onClick: () => navigate('/account/wishlist')
            }, formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_ACTION_VIEW_WISHLIST))
          });
        } else {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_MESSAGE_ALREADY_IN_WISHLIST),
            status: 'info',
            action: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
              variant: "link",
              onClick: () => navigate('/account/wishlist')
            }, formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_ACTION_VIEW_WISHLIST))
          });
        }
      } catch {
        showError();
      }
    });
    return function handleAddToWishlist(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**************** Wishlist ****************/

  /***************************** Update Cart **************************/
  const handleUpdateCart = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (variant, quantity) {
      // close the modal before handle the change
      onClose();
      // using try-catch is better than using onError callback since we have many mutation calls logic here
      try {
        setCartItemLoading(true);
        const productIds = basket.productItems.map(({
          productId
        }) => productId);

        // The user is selecting different variant, and it has not existed in basket
        if (selectedItem.id !== variant.productId && !productIds.includes(variant.productId)) {
          const item = {
            productId: variant.productId,
            quantity,
            price: variant.price
          };
          return yield updateItemInBasketMutation.mutateAsync({
            parameters: {
              basketId: basket.basketId,
              itemId: selectedItem.itemId
            },
            body: item
          });
        }

        // The user is selecting different variant, and it has existed in basket
        // remove this item in the basket, change the quantity for the new selected variant in the basket
        if (selectedItem.id !== variant.productId && productIds.includes(variant.productId)) {
          yield removeItemFromBasketMutation.mutateAsync({
            parameters: {
              basketId: basket.basketId,
              itemId: selectedItem.itemId
            }
          });
          const basketItem = basket.productItems.find(({
            productId
          }) => productId === variant.productId);
          const newQuantity = quantity + basketItem.quantity;
          return yield changeItemQuantity(newQuantity, basketItem);
        }

        // the user only changes quantity of the same variant
        if (selectedItem.quantity !== quantity) {
          return yield changeItemQuantity(quantity, selectedItem);
        }
      } catch {
        showError();
      } finally {
        setCartItemLoading(false);
        setSelectedItem(undefined);
      }
    });
    return function handleUpdateCart(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  const handleUpdateBundle = /*#__PURE__*/function () {
    var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (bundle, bundleQuantity, childProducts) {
      // close the modal before handle the change
      onClose();
      try {
        setCartItemLoading(true);
        const itemsToBeUpdated = (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_25__.getUpdateBundleChildArray)(bundle, childProducts);

        // We only update the parent bundle when the quantity changes
        // Since top level bundles don't have variants
        if (bundle.quantity !== bundleQuantity) {
          itemsToBeUpdated.unshift({
            itemId: bundle.itemId,
            productId: bundle.productId,
            quantity: bundleQuantity
          });
        }
        if (itemsToBeUpdated.length) {
          yield updateItemsInBasketMutation.mutateAsync({
            method: 'PATCH',
            parameters: {
              basketId: basket.basketId
            },
            body: itemsToBeUpdated
          });
        }
      } catch {
        showError();
      } finally {
        setCartItemLoading(false);
        setSelectedItem(undefined);
      }
    });
    return function handleUpdateBundle(_x4, _x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
  const handleIsAGiftChange = /*#__PURE__*/function () {
    var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (product, checked) {
      try {
        const previousVal = localIsGiftItems[product.itemId];
        setLocalIsGiftItems(_objectSpread(_objectSpread({}, localIsGiftItems), {}, {
          [product.itemId]: checked
        }));
        setCartItemLoading(true);
        setSelectedItem(product);
        yield updateItemInBasketMutation.mutateAsync({
          parameters: {
            basketId: basket === null || basket === void 0 ? void 0 : basket.basketId,
            itemId: product.itemId
          },
          body: {
            productId: product.id,
            quantity: parseInt(product.quantity),
            gift: checked
          }
        }, {
          onSettled: () => {
            // reset the state
            setCartItemLoading(false);
            setSelectedItem(undefined);
          },
          onSuccess: () => {
            setLocalIsGiftItems(_objectSpread(_objectSpread({}, localIsGiftItems), {}, {
              [product.itemId]: undefined
            }));
          },
          onError: () => {
            // reset the quantity to the previous value
            setLocalIsGiftItems(_objectSpread(_objectSpread({}, localIsGiftItems), {}, {
              [product.itemId]: previousVal
            }));
            showError();
          }
        });
      } catch (e) {
        showError();
      } finally {
        setCartItemLoading(false);
        setSelectedItem(undefined);
      }
    });
    return function handleIsAGiftChange(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
  const handleUnavailableProducts = /*#__PURE__*/function () {
    var _ref5 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (unavailableProductIds) {
      var _basket$productItems4;
      const productItems = basket === null || basket === void 0 ? void 0 : (_basket$productItems4 = basket.productItems) === null || _basket$productItems4 === void 0 ? void 0 : _basket$productItems4.filter(item => unavailableProductIds === null || unavailableProductIds === void 0 ? void 0 : unavailableProductIds.includes(item.productId));
      yield Promise.all(productItems.map(/*#__PURE__*/function () {
        var _ref6 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (item) {
          yield handleRemoveItem(item);
        });
        return function (_x0) {
          return _ref6.apply(this, arguments);
        };
      }()));
    });
    return function handleUnavailableProducts(_x9) {
      return _ref5.apply(this, arguments);
    };
  }();
  /***************************** Update Cart **************************/

  /***************************** Update quantity **************************/
  const changeItemQuantity = lodash_debounce__WEBPACK_IMPORTED_MODULE_20___default()(/*#__PURE__*/function () {
    var _ref7 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (quantity, product) {
      // This local state allows the dropdown to show the desired quantity
      // while the API call to update it is happening.
      const previousQuantity = localQuantity[product.itemId];
      setLocalQuantity(_objectSpread(_objectSpread({}, localQuantity), {}, {
        [product.itemId]: quantity
      }));
      setCartItemLoading(true);
      setSelectedItem(product);
      yield updateItemInBasketMutation.mutateAsync({
        parameters: {
          basketId: basket === null || basket === void 0 ? void 0 : basket.basketId,
          itemId: product.itemId
        },
        body: {
          productId: product.id,
          quantity: parseInt(quantity)
        }
      }, {
        onSettled: () => {
          // reset the state
          setCartItemLoading(false);
          setSelectedItem(undefined);
        },
        onSuccess: () => {
          setLocalQuantity(_objectSpread(_objectSpread({}, localQuantity), {}, {
            [product.itemId]: undefined
          }));
        },
        onError: () => {
          // reset the quantity to the previous value
          setLocalQuantity(_objectSpread(_objectSpread({}, localQuantity), {}, {
            [product.itemId]: previousQuantity
          }));
          showError();
        }
      });
    });
    return function (_x1, _x10) {
      return _ref7.apply(this, arguments);
    };
  }(), DEBOUNCE_WAIT);
  const handleChangeItemQuantity = /*#__PURE__*/function () {
    var _ref8 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (product, value) {
      var _productsByItemId$pro, _productsByItemId$pro2;
      const stockLevel = (productsByItemId === null || productsByItemId === void 0 ? void 0 : (_productsByItemId$pro = productsByItemId[product.itemId]) === null || _productsByItemId$pro === void 0 ? void 0 : (_productsByItemId$pro2 = _productsByItemId$pro.inventory) === null || _productsByItemId$pro2 === void 0 ? void 0 : _productsByItemId$pro2.stockLevel) ?? 1;

      // Handle removing of the items when 0 is selected.
      if (value === 0) {
        // Flush last call to keep ui in sync with data.
        changeItemQuantity.flush();

        // Set the selected item to the current product to the modal acts on it.
        setSelectedItem(product);

        // Show the modal.
        modalProps.onOpen();

        // Return false as 0 isn't valid section.
        return false;
      }

      // Cancel any pending handlers.
      changeItemQuantity.cancel();

      // Allow use to selected values above the inventory.
      if (value > stockLevel || value === product.quantity) {
        return true;
      }

      // Take action.
      changeItemQuantity(value, product);
      return true;
    });
    return function handleChangeItemQuantity(_x11, _x12) {
      return _ref8.apply(this, arguments);
    };
  }();
  /***************************** Update quantity **************************/

  /***************************** Remove Item from basket **************************/
  const handleRemoveItem = /*#__PURE__*/function () {
    var _ref9 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* (product) {
      setSelectedItem(product);
      setCartItemLoading(true);
      yield removeItemFromBasketMutation.mutateAsync({
        parameters: {
          basketId: basket.basketId,
          itemId: product.itemId
        }
      }, {
        onSettled: () => {
          // reset the state
          setCartItemLoading(false);
          setSelectedItem(undefined);
        },
        onSuccess: () => {
          toast({
            title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_MESSAGE_REMOVED_ITEM_FROM_CART, {
              quantity: 1
            }),
            status: 'success'
          });
        },
        onError: () => {
          showError();
        }
      });
    });
    return function handleRemoveItem(_x13) {
      return _ref9.apply(this, arguments);
    };
  }();

  /********* Rendering  UI **********/
  if (isLoading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_pages_cart_partials_cart_skeleton__WEBPACK_IMPORTED_MODULE_7__["default"], null);
  }
  if (!isLoading && !(basket !== null && basket !== void 0 && (_basket$productItems5 = basket.productItems) !== null && _basket$productItems5 !== void 0 && _basket$productItems5.length)) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_pages_cart_partials_empty_cart__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isRegistered: isRegistered
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    background: "gray.50",
    flex: "1",
    "data-testid": "sf-cart-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Container, {
    maxWidth: "container.xl",
    px: [4, 6, 6, 4],
    paddingTop: {
      base: 8,
      lg: 8
    },
    paddingBottom: {
      base: 8,
      lg: 14
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 24
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_pages_cart_partials_cart_title__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Grid, {
    templateColumns: {
      base: '1fr',
      lg: '66% 1fr'
    },
    gap: {
      base: 10,
      xl: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.GridItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 4
  }, (_basket$productItems6 = basket.productItems) === null || _basket$productItems6 === void 0 ? void 0 : _basket$productItems6.map((productItem, idx) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_product_item__WEBPACK_IMPORTED_MODULE_12__["default"], {
      key: productItem.itemId,
      index: idx,
      secondaryActions: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_pages_cart_partials_cart_secondary_button_group__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isAGift: localIsGiftItems[productItem.itemId] ? localIsGiftItems[productItem.itemId] : productItem.gift,
        onIsAGiftChange: handleIsAGiftChange,
        onAddToWishlistClick: handleAddToWishlist,
        onEditClick: product => {
          setSelectedItem(product);
          onOpen();
        },
        onRemoveItemClick: handleRemoveItem
      }),
      product: _objectSpread(_objectSpread(_objectSpread({}, productItem), productsByItemId && productsByItemId[productItem.itemId]), {}, {
        isProductUnavailable: !isProductsLoading ? !(productsByItemId !== null && productsByItemId !== void 0 && productsByItemId[productItem.itemId]) : undefined,
        price: productItem.price,
        quantity: localQuantity[productItem.itemId] ? localQuantity[productItem.itemId] : productItem.quantity
      }),
      onItemQuantityChange: handleChangeItemQuantity.bind(undefined, productItem),
      showLoading: isCartItemLoading && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.itemId) === productItem.itemId,
      handleRemoveItem: handleRemoveItem
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, null, isOpen && !selectedItem.bundledProductItems && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_product_view_modal__WEBPACK_IMPORTED_MODULE_13__["default"], {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
    product: selectedItem,
    updateCart: (variant, quantity) => handleUpdateCart(variant, quantity)
  }), isOpen && selectedItem.bundledProductItems && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_product_view_modal_bundle__WEBPACK_IMPORTED_MODULE_14__["default"], {
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onClose,
    product: selectedItem,
    updateCart: (product, quantity, childProducts) => handleUpdateBundle(product, quantity, childProducts)
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.GridItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_order_summary__WEBPACK_IMPORTED_MODULE_11__["default"], {
    showPromoCodeForm: true,
    isEstimate: true,
    basket: basket
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    display: {
      base: 'none',
      lg: 'block'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_pages_cart_partials_cart_cta__WEBPACK_IMPORTED_MODULE_5__["default"], null))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Stack, {
    spacing: 16
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_15__["default"], {
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_27__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Recently Viewed"
      }],
      id: "cart.recommended_products.title.recently_viewed"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.EINSTEIN_RECOMMENDERS.CART_RECENTLY_VIEWED,
    mx: {
      base: -4,
      sm: -6,
      lg: 0
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_15__["default"], {
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_27__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "You May Also Like"
      }],
      id: "cart.recommended_products.title.may_also_like"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.EINSTEIN_RECOMMENDERS.CART_MAY_ALSO_LIKE,
    products: basket === null || basket === void 0 ? void 0 : basket.productItems,
    shouldFetch: () => {
      var _basket$productItems7;
      return (basket === null || basket === void 0 ? void 0 : basket.basketId) && ((_basket$productItems7 = basket.productItems) === null || _basket$productItems7 === void 0 ? void 0 : _basket$productItems7.length) > 0;
    },
    mx: {
      base: -4,
      sm: -6,
      lg: 0
    }
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_4__.Box, {
    h: "130px",
    position: "sticky",
    bottom: 0,
    bg: "white",
    display: {
      base: 'block',
      lg: 'none'
    },
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_pages_cart_partials_cart_cta__WEBPACK_IMPORTED_MODULE_5__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_confirmation_modal__WEBPACK_IMPORTED_MODULE_9__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _salesforce_retail_react_app_app_pages_cart_partials_cart_secondary_button_group__WEBPACK_IMPORTED_MODULE_6__.REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG, {
    onPrimaryAction: () => {
      handleRemoveItem(selectedItem);
    },
    onAlternateAction: () => {}
  }, modalProps)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default().createElement(_salesforce_retail_react_app_app_components_unavailable_product_confirmation_modal__WEBPACK_IMPORTED_MODULE_24__["default"], {
    productItems: basket === null || basket === void 0 ? void 0 : basket.productItems,
    handleUnavailableProducts: handleUnavailableProducts
  }));
};
Cart.getTemplateName = () => 'cart';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cart);

/***/ }),

/***/ "./app/pages/cart/partials/cart-cta.jsx":
/*!**********************************************!*\
  !*** ./app/pages/cart/partials/cart-cta.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const CartCta = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__["default"],
    to: "/checkout",
    width: ['95%', '95%', '95%', '100%'],
    marginTop: [6, 6, 2, 2],
    mb: 4,
    rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.LockIcon, null),
    variant: "solid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Proceed to Checkout"
    }],
    id: "cart_cta.link.checkout"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    justify: 'center'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.VisaIcon, {
    height: 8,
    width: 10,
    mr: 2
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.MastercardIcon, {
    height: 8,
    width: 10,
    mr: 2
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.AmexIcon, {
    height: 8,
    width: 10,
    mr: 2
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.DiscoverIcon, {
    height: 8,
    width: 10,
    mr: 2
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartCta);

/***/ }),

/***/ "./app/pages/cart/partials/cart-secondary-button-group.jsx":
/*!*****************************************************************!*\
  !*** ./app/pages/cart/partials/cart-secondary-button-group.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG: () => (/* binding */ REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_confirmation_modal_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/confirmation-modal/index */ "./app/components/confirmation-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");


/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */








const REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG = {
  dialogTitle: (0,react_intl__WEBPACK_IMPORTED_MODULE_8__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Confirm Remove Item"
    }],
    id: "confirmation_modal.remove_cart_item.title.confirm_remove"
  }),
  confirmationMessage: (0,react_intl__WEBPACK_IMPORTED_MODULE_8__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Are you sure you want to remove this item from your cart?"
    }],
    id: "confirmation_modal.remove_cart_item.message.sure_to_remove"
  }),
  primaryActionLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_8__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Yes, remove item"
    }],
    id: "confirmation_modal.remove_cart_item.action.yes"
  }),
  primaryActionAriaLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_8__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Yes, remove item"
    }],
    id: "confirmation_modal.remove_cart_item.assistive_msg.yes"
  }),
  alternateActionLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_8__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "No, keep item"
    }],
    id: "confirmation_modal.remove_cart_item.action.no"
  }),
  alternateActionAriaLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_8__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "No, keep item"
    }],
    id: "confirmation_modal.remove_cart_item.assistive_msg.no"
  }),
  onPrimaryAction: _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.noop
};

/**
 * Renders secondary actions on a product-item card in the form of a button group.
 * Represents other actions you want the user to perform with the product-item
 * (eg.: Remove or Edit or Add to wishlist for cart items)
 */
const CartSecondaryButtonGroup = ({
  onAddToWishlistClick = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.noop,
  onEditClick = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.noop,
  onRemoveItemClick = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.noop,
  onIsAGiftChange = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_6__.noop,
  isAGift = false
}) => {
  const variant = (0,_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_4__.useItemVariant)();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_7__.useCurrentCustomer)();
  const modalProps = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useDisclosure)();
  const showRemoveItemConfirmation = () => {
    modalProps.onOpen();
  };
  const handleRemoveItem = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
      onRemoveItemClick(variant);
    });
    return function handleRemoveItem() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    direction: {
      base: 'column',
      lg: 'row'
    },
    alignItems: {
      base: 'flex-start',
      lg: 'center'
    },
    justifyContent: {
      base: 'flex-start',
      lg: 'space-between'
    },
    divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Divider, {
      display: {
        base: 'block',
        lg: 'none'
      }
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    spacing: "6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    size: "sm",
    onClick: showRemoveItemConfirmation
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_9__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Remove"
    }],
    id: "cart_secondary_button_group.action.remove"
  })), customer.isRegistered && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    size: "sm",
    onClick: () => onAddToWishlistClick(variant)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_9__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Add to Wishlist"
    }],
    id: "cart_secondary_button_group.action.added_to_wishlist"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    size: "sm",
    onClick: () => onEditClick(variant)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_9__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Edit"
    }],
    id: "cart_secondary_button_group.action.edit"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Checkbox, {
    name: `gift-checkbox-${variant.itemId}`,
    spacing: 2,
    isChecked: isAGift,
    onChange: e => {
      const checked = e.target.checked;
      onIsAGiftChange(variant, checked);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_9__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "This is a gift."
    }],
    id: "cart_secondary_button_group.label.this_is_gift"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_confirmation_modal_index__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, REMOVE_CART_ITEM_CONFIRMATION_DIALOG_CONFIG, {
    onPrimaryAction: handleRemoveItem
  }, modalProps)));
};
CartSecondaryButtonGroup.propTypes = {
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
  onEditClick: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
  onAddToWishlistClick: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
  onRemoveItemClick: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
  onIsAGiftChange: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().func),
  isAGift: (prop_types__WEBPACK_IMPORTED_MODULE_10___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartSecondaryButtonGroup);

/***/ }),

/***/ "./app/pages/cart/partials/cart-skeleton.jsx":
/*!***************************************************!*\
  !*** ./app/pages/cart/partials/cart-skeleton.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */



const CartItemSkeleton = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 4,
    layerStyle: "card",
    boxShadow: "none"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Flex, {
    width: "full",
    bg: "white",
    marginBottom: [4, 3]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: ['88px', '136px'],
    height: ['88px', '136px']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    marginLeft: [4, 6],
    spacing: 2,
    flex: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: "80px",
    height: "20px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: {
      base: '180px',
      sm: '180px',
      md: '280px',
      lg: '280px'
    },
    height: 3
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: {
      base: '120px',
      sm: '120px',
      md: '140px',
      lg: '140px'
    },
    height: 3
  }))));
};
const CartSkeleton = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    background: "gray.50",
    flex: "1",
    paddingBottom: {
      base: 20,
      lg: 55
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Container, {
    background: "gray.50",
    "data-testid": "sf-cart-skeleton",
    maxWidth: "container.xl",
    p: [4, 6, 6, 4],
    paddingTop: [null, null, null, 6]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Grid, {
    templateColumns: {
      base: '1fr',
      lg: '66% 1fr'
    },
    gap: {
      base: 10,
      xl: 20
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.GridItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    paddingTop: 4,
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    fontWeight: "bold",
    fontSize: ['xl', 'xl', 'xl', '2xl']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Cart"
    }],
    id: "cart_skeleton.title.cart"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CartItemSkeleton, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CartItemSkeleton, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.GridItem, {
    py: 7
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    paddingTop: {
      base: 0,
      lg: 8
    },
    spacing: 3,
    px: [6, 6, 6, 0]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Heading, {
    fontSize: "lg",
    pt: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_2__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Summary"
    }],
    id: "cart_skeleton.heading.order_summary"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 3,
    align: "flex-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: {
      base: '180px',
      sm: '180px',
      md: '280px',
      lg: '280px'
    },
    height: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: "120px",
    height: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: {
      base: '180px',
      sm: '180px',
      md: '280px',
      lg: '280px'
    },
    height: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Skeleton, {
    width: "120px",
    height: 4
  })))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartSkeleton);

/***/ }),

/***/ "./app/pages/cart/partials/cart-title.jsx":
/*!************************************************!*\
  !*** ./app/pages/cart/partials/cart-title.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




const CartTitle = () => {
  const {
    derivedData: {
      totalItems
    }
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_2__.useCurrentBasket)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Heading, {
    as: "h1",
    fontSize: ['xl', 'xl', 'xl', '2xl']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_3__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Cart ("
    }, {
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
      "value": ")"
    }],
    values: {
      itemCount: totalItems
    },
    id: "cart_title.title.cart_num_of_items"
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartTitle);

/***/ }),

/***/ "./app/pages/cart/partials/empty-cart.jsx":
/*!************************************************!*\
  !*** ./app/pages/cart/partials/empty-cart.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const EmptyCart = ({
  isRegistered
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    "data-testid": "sf-cart-empty",
    flex: "1",
    minWidth: "100%",
    width: "full",
    background: "gray.50"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Center, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 6,
    width: ['343px', '444px'],
    marginTop: "20%",
    marginBottom: "20%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.BasketIcon, {
    boxSize: [8, 10]
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 8
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    lineHeight: 1,
    align: "center",
    fontSize: ['18px', '2xl'],
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Your cart is empty."
    }],
    id: "empty_cart.description.empty_cart"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Text, {
    align: "center",
    fontSize: "md",
    color: "gray.700"
  }, isRegistered ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Continue shopping to add items to your cart."
    }],
    id: "empty_cart.message.continue_shopping"
  }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sign in to retrieve your saved items or continue shopping."
    }],
    id: "empty_cart.message.sign_in_or_continue_shopping"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    justify: "center",
    direction: ['column', 'row'],
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__["default"],
    href: '/',
    width: ['343px', '220px'],
    variant: isRegistered ? 'solid' : 'outline',
    color: isRegistered ? 'white' : 'blue.600'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Continue Shopping"
    }],
    id: "empty_cart.link.continue_shopping"
  })), !isRegistered && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_3__["default"],
    href: "/account",
    width: ['343px', '220px'],
    rightIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_2__.AccountIcon, null),
    variant: "solid"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Sign In"
    }],
    id: "empty_cart.link.sign_in"
  })))))));
};
EmptyCart.propTypes = {
  isRegistered: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmptyCart);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-cart.js.map