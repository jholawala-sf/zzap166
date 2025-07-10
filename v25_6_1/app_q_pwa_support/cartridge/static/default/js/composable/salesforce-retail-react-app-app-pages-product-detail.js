"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-product-detail"],{

/***/ "./app/pages/product-detail/index.jsx":
/*!********************************************!*\
  !*** ./app/pages/product-detail/index.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/product-utils */ "./app/utils/product-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-basket */ "./app/hooks/use-current-basket.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-einstein */ "./app/hooks/use-einstein.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-datacloud */ "./app/hooks/use-datacloud.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_active_data__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-active-data */ "./app/hooks/use-active-data.js");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_hooks__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/hooks */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/recommended-products */ "./overlays/page-designer-theme-home/app/components/recommended-products/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-view */ "./app/components/product-view/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_product_detail_partials_information_accordion__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/product-detail/partials/information-accordion */ "./app/pages/product-detail/partials/information-accordion.jsx");
/* harmony import */ var _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/pwa-kit-react-sdk/ssr/universal/errors */ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_logger_instance__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/logger-instance */ "./app/utils/logger-instance.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/url */ "./overlays/utils/app/utils/url.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-wish-list */ "./app/hooks/use-wish-list.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */







// Components



// Hooks







// Project Components






// constant





const ProductDetail = () => {
  var _Object$keys, _bundleChildVariantId, _product$pageMetaTags, _product$pageMetaTags2;
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_23__["default"])();
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_24__.useHistory)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_24__.useLocation)();
  const einstein = (0,_salesforce_retail_react_app_app_hooks_use_einstein__WEBPACK_IMPORTED_MODULE_10__["default"])();
  const dataCloud = (0,_salesforce_retail_react_app_app_hooks_use_datacloud__WEBPACK_IMPORTED_MODULE_11__["default"])();
  const activeData = (0,_salesforce_retail_react_app_app_hooks_use_active_data__WEBPACK_IMPORTED_MODULE_12__["default"])();
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_21__.useToast)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const customerId = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useCustomerId)();

  /****************************** Basket *********************************/
  const {
    isLoading: isBasketLoading
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_basket__WEBPACK_IMPORTED_MODULE_7__.useCurrentBasket)();
  const {
    addItemToNewOrExistingBasket
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutationHelper)();
  const updateItemsInBasketMutation = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperBasketsMutation)('updateItemsInBasket');
  const {
    res
  } = (0,_salesforce_pwa_kit_react_sdk_ssr_universal_hooks__WEBPACK_IMPORTED_MODULE_13__.useServerContext)();
  if (res) {
    res.set('Cache-Control', `s-maxage=${_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.MAX_CACHE_AGE}, stale-while-revalidate=${_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.STALE_WHILE_REVALIDATE}`);
  }

  /*************************** Product Detail and Category ********************/
  const {
    productId
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_24__.useParams)();
  const urlParams = new URLSearchParams(location.search);
  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useProduct)({
    parameters: {
      id: urlParams.get('pid') || productId,
      perPricebook: true,
      expand: ['availability', 'promotions', 'options', 'images', 'prices', 'variations', 'set_products', 'bundled_products', 'page_meta_tags'],
      allImages: true
    }
  }, {
    // When shoppers select a different variant (and the app fetches the new data),
    // the old data is still rendered (and not the skeletons).
    keepPreviousData: true
  });

  /** TOOLKIT CUSTOMIZATION (options) **/
  const selectedOptions = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const params = new URLSearchParams(location.search);
    const options = new Map();
    params.forEach((value, key) => {
      if (key.includes('option-')) {
        options.set(key.substring(7), value);
      }
    });
    return options;
  }, [location.search]);
  /** END TOOLKIT CUSTOMIZATION **/

  // Note: Since category needs id from product detail, it can't be server side rendered atm
  // until we can do dependent query on server
  const {
    data: category,
    isError: isCategoryError,
    error: categoryError
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useCategory)({
    parameters: {
      id: product === null || product === void 0 ? void 0 : product.primaryCategoryId,
      levels: 1
    }
  });

  /****************************** Sets and Bundles *********************************/
  const [childProductSelection, setChildProductSelection] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({});
  const [childProductOrderability, setChildProductOrderability] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({});
  const [selectedBundleQuantity, setSelectedBundleQuantity] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(1);
  const childProductRefs = react__WEBPACK_IMPORTED_MODULE_2___default().useRef({});
  const isProductASet = product === null || product === void 0 ? void 0 : product.type.set;
  const isProductABundle = product === null || product === void 0 ? void 0 : product.type.bundle;
  let bundleChildVariantIds = '';
  if (isProductABundle) bundleChildVariantIds = (_Object$keys = Object.keys(childProductSelection)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.map(key => childProductSelection[key].variant.productId).join(',');
  const {
    data: bundleChildrenData
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useProducts)({
    parameters: {
      ids: bundleChildVariantIds,
      allImages: false,
      expand: ['availability', 'variations'],
      select: '(data.(id,inventory,master))'
    }
  }, {
    enabled: ((_bundleChildVariantId = bundleChildVariantIds) === null || _bundleChildVariantId === void 0 ? void 0 : _bundleChildVariantId.length) > 0,
    keepPreviousData: true
  });
  if (isProductABundle && bundleChildrenData) {
    // Loop through the bundle children and update the inventory for variant selection
    product.bundledProducts.forEach(({
      product: childProduct
    }, index) => {
      const matchingChildProduct = bundleChildrenData.data.find(bundleChild => bundleChild.master.masterId === childProduct.id);
      if (matchingChildProduct) {
        product.bundledProducts[index].product = _objectSpread(_objectSpread({}, childProduct), {}, {
          inventory: matchingChildProduct.inventory
        });
      }
    });
  }
  const comboProduct = isProductASet || isProductABundle ? (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_4__.normalizeSetBundleProduct)(product) : {};

  /**************** Error Handling ****************/

  if (isProductError) {
    var _productError$respons;
    const errorStatus = productError === null || productError === void 0 ? void 0 : (_productError$respons = productError.response) === null || _productError$respons === void 0 ? void 0 : _productError$respons.status;
    switch (errorStatus) {
      case 404:
        throw new _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_17__.HTTPNotFound('Product Not Found.');
      default:
        throw new _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_17__.HTTPError(errorStatus, `HTTP Error ${errorStatus} occurred.`);
    }
  }
  if (isCategoryError) {
    var _categoryError$respon;
    const errorStatus = categoryError === null || categoryError === void 0 ? void 0 : (_categoryError$respon = categoryError.response) === null || _categoryError$respon === void 0 ? void 0 : _categoryError$respon.status;
    switch (errorStatus) {
      case 404:
        throw new _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_17__.HTTPNotFound('Category Not Found.');
      default:
        throw new _salesforce_pwa_kit_react_sdk_ssr_universal_errors__WEBPACK_IMPORTED_MODULE_17__.HTTPError(errorStatus, `HTTP Error ${errorStatus} occurred.`);
    }
  }
  const [primaryCategory, setPrimaryCategory] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(category);
  const variant = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_8__.useVariant)(product);
  // This page uses the `primaryCategoryId` to retrieve the category data. This attribute
  // is only available on `master` products. Since a variation will be loaded once all the
  // attributes are selected (to get the correct inventory values), the category information
  // is overridden. This will allow us to keep the initial category around until a different
  // master product is loaded.
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (category) {
      setPrimaryCategory(category);
    }
  }, [category]);

  /**************** Product Variant ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    var _product$type;
    /** TOOLKIT CUSTOMIZATION **/
    if (!variant || product !== null && product !== void 0 && (_product$type = product.type) !== null && _product$type !== void 0 && _product$type.item) {
      return;
    }
    /** END TOOLKIT CUSTOMIZATION **/
    // update the variation attributes parameter on
    // the url accordingly as the variant changes
    const updatedUrl = (0,_salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_20__.rebuildPathWithParams)(`${location.pathname}${location.search}`, {
      pid: variant === null || variant === void 0 ? void 0 : variant.productId
    });
    history.replace(updatedUrl);
  }, [variant]);

  /**************** Wishlist ****************/
  const {
    data: wishlist,
    isLoading: isWishlistLoading
  } = (0,_salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_22__.useWishList)();
  const createCustomerProductListItem = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_6__.useShopperCustomersMutation)('createCustomerProductListItem');
  const handleAddToWishlist = (product, variant, quantity) => {
    var _wishlist$customerPro;
    const isItemInWishlist = wishlist === null || wishlist === void 0 ? void 0 : (_wishlist$customerPro = wishlist.customerProductListItems) === null || _wishlist$customerPro === void 0 ? void 0 : _wishlist$customerPro.find(i => i.productId === (variant === null || variant === void 0 ? void 0 : variant.productId) || i.productId === (product === null || product === void 0 ? void 0 : product.id));
    if (!isItemInWishlist) {
      createCustomerProductListItem.mutate({
        parameters: {
          listId: wishlist.id,
          customerId
        },
        body: {
          // NOTE: API does not respect quantity, it always adds 1
          quantity,
          productId: (variant === null || variant === void 0 ? void 0 : variant.productId) || (product === null || product === void 0 ? void 0 : product.id),
          public: false,
          priority: 1,
          type: 'product'
        }
      }, {
        onSuccess: () => {
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
            react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
              variant: "link",
              onClick: () => navigate('/account/wishlist')
            }, formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_ACTION_VIEW_WISHLIST))
          });
        },
        onError: () => {
          showError();
        }
      });
    } else {
      toast({
        title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_MESSAGE_ALREADY_IN_WISHLIST),
        status: 'info',
        action: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Button, {
          variant: "link",
          onClick: () => navigate('/account/wishlist')
        }, formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.TOAST_ACTION_VIEW_WISHLIST))
      });
    }
  };

  /**************** Add To Cart ****************/
  const showToast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_21__.useToast)();
  const showError = () => {
    showToast({
      title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.API_ERROR_MESSAGE),
      status: 'error'
    });
  };
  const handleAddToCart = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (productSelectionValues) {
      try {
        /** TOOLKIT CUSTOMIZATION (options) **/
        var options;
        if ((selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.size) > 0) {
          options = Array.from(selectedOptions, ([key, value]) => ({
            optionId: key,
            optionValueId: value
          }));
        }
        const productItems = productSelectionValues.map(({
          variant,
          quantity
        }) => ({
          productId: variant.productId,
          price: variant.price,
          quantity,
          optionItems: options
        }));
        /** END TOOLKIT CUSTOMIZATION **/

        yield addItemToNewOrExistingBasket(productItems);
        einstein.sendAddToCart(productItems);

        // If the items were successfully added, set the return value to be used
        // by the add to cart modal.
        return productSelectionValues;
      } catch (error) {
        console.log('error', error);
        showError(error);
      }
    });
    return function handleAddToCart(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  /**************** Product Set/Bundles Handlers ****************/
  const handleChildProductValidation = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(() => {
    var _comboProduct$childPr;
    // Run validation for all child products. This will ensure the error
    // messages are shown.
    Object.values(childProductRefs.current).forEach(({
      validateOrderability
    }) => {
      validateOrderability({
        scrollErrorIntoView: false
      });
    });

    // Using ot state for which child products are selected, scroll to the first
    // one that isn't selected.
    const selectedProductIds = Object.keys(childProductSelection);
    const firstUnselectedProduct = (_comboProduct$childPr = comboProduct.childProducts.find(({
      product: childProduct
    }) => !selectedProductIds.includes(childProduct.id))) === null || _comboProduct$childPr === void 0 ? void 0 : _comboProduct$childPr.product;
    if (firstUnselectedProduct) {
      // Get the reference to the product view and scroll to it.
      const {
        ref
      } = childProductRefs.current[firstUnselectedProduct.id];
      if (ref.scrollIntoView) {
        ref.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }
      return false;
    }
    return true;
  }, [product, childProductSelection]);

  /**************** Product Set Handlers ****************/
  const handleProductSetAddToCart = () => {
    // Get all the selected products, and pass them to the addToCart handler which
    // accepts an array.
    const productSelectionValues = Object.values(childProductSelection);
    return handleAddToCart(productSelectionValues);
  };

  /**************** Product Bundle Handlers ****************/
  // Top level bundle does not have variants
  const handleProductBundleAddToCart = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (variant, selectedQuantity) {
      try {
        const childProductSelections = Object.values(childProductSelection);
        const productItems = [{
          productId: product.id,
          price: product.price,
          quantity: selectedQuantity,
          // The add item endpoint in the shopper baskets API does not respect variant selections
          // for bundle children, so we have to make a follow up call to update the basket
          // with the chosen variant selections
          bundledProductItems: childProductSelections.map(child => {
            return {
              productId: child.variant.productId,
              quantity: child.quantity
            };
          })
        }];
        const res = yield addItemToNewOrExistingBasket(productItems);
        const bundleChildMasterIds = childProductSelections.map(child => {
          return child.product.id;
        });

        // since the returned data includes all products in basket
        // here we compare list of productIds in bundleProductItems of each productItem to filter out the
        // current bundle that was last added into cart
        const currentBundle = res.productItems.find(productItem => {
          var _productItem$bundledP, _productItem$bundledP2;
          if (!((_productItem$bundledP = productItem.bundledProductItems) !== null && _productItem$bundledP !== void 0 && _productItem$bundledP.length)) return;
          const bundleChildIds = (_productItem$bundledP2 = productItem.bundledProductItems) === null || _productItem$bundledP2 === void 0 ? void 0 : _productItem$bundledP2.map(item => {
            // seek out the bundle child that still uses masterId as product id
            return item.productId;
          });
          return bundleChildIds.every(id => bundleChildMasterIds.includes(id));
        });
        const itemsToBeUpdated = (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_4__.getUpdateBundleChildArray)(currentBundle, childProductSelections);
        if (itemsToBeUpdated.length) {
          // make a follow up call to update child variant selection for product bundle
          // since add item endpoint doesn't currently consider product bundle child variants
          yield updateItemsInBasketMutation.mutateAsync({
            method: 'PATCH',
            parameters: {
              basketId: res.basketId
            },
            body: itemsToBeUpdated
          });
        }
        einstein.sendAddToCart(productItems);
        return childProductSelections;
      } catch (error) {
        showError(error);
      }
    });
    return function handleProductBundleAddToCart(_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  /**************** Einstein ****************/
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (product && product.type.set) {
      einstein.sendViewProduct(product);
      dataCloud.sendViewProduct(product);
      const childrenProducts = product.setProducts;
      childrenProducts.map(child => {
        try {
          einstein.sendViewProduct(child);
        } catch (err) {
          _salesforce_retail_react_app_app_utils_logger_instance__WEBPACK_IMPORTED_MODULE_18__["default"].error('Einstein sendViewProduct error', {
            namespace: 'ProductDetail.useEffect',
            additionalProperties: {
              error: err,
              child
            }
          });
        }
        activeData.sendViewProduct(category, child, 'detail');
        dataCloud.sendViewProduct(child);
      });
    } else if (product) {
      try {
        einstein.sendViewProduct(product);
      } catch (err) {
        _salesforce_retail_react_app_app_utils_logger_instance__WEBPACK_IMPORTED_MODULE_18__["default"].error('Einstein sendViewProduct error', {
          namespace: 'ProductDetail.useEffect',
          additionalProperties: {
            error: err,
            product
          }
        });
      }
      activeData.sendViewProduct(category, product, 'detail');
      dataCloud.sendViewProduct(product);
    }
  }, [product]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    className: "sf-product-detail-page",
    layerStyle: "page",
    "data-testid": "product-details-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_3__.Helmet, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("title", null, product === null || product === void 0 ? void 0 : product.pageTitle), (product === null || product === void 0 ? void 0 : (_product$pageMetaTags = product.pageMetaTags) === null || _product$pageMetaTags === void 0 ? void 0 : _product$pageMetaTags.length) > 0 && product.pageMetaTags.map(({
    id,
    value
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("meta", {
    name: id,
    content: value,
    key: id
  })), !(product !== null && product !== void 0 && (_product$pageMetaTags2 = product.pageMetaTags) !== null && _product$pageMetaTags2 !== void 0 && _product$pageMetaTags2.some(tag => tag.id === 'description')) && (product === null || product === void 0 ? void 0 : product.pageDescription) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("meta", {
    name: "description",
    content: product.pageDescription
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 16
  }, isProductASet || isProductABundle ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_15__["default"], {
    product: product,
    category: (primaryCategory === null || primaryCategory === void 0 ? void 0 : primaryCategory.parentCategoryTree) || [],
    addToCart: isProductASet ? handleProductSetAddToCart : handleProductBundleAddToCart,
    addToWishlist: handleAddToWishlist,
    isProductLoading: isProductLoading,
    isBasketLoading: isBasketLoading,
    isWishlistLoading: isWishlistLoading,
    validateOrderability: handleChildProductValidation,
    childProductOrderability: childProductOrderability,
    setSelectedBundleQuantity: setSelectedBundleQuantity
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("hr", null),
  // Render the child products
  comboProduct.childProducts.map(({
    product: childProduct,
    quantity: childQuantity
  }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    key: childProduct.id,
    "data-testid": "child-product"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_15__["default"]
  // Do not use an arrow function as we are manipulating the functions scope.
  , {
    ref: function (ref) {
      // Assign the "set" scope of the ref, this is how we access the internal
      // validation.
      childProductRefs.current[childProduct.id] = {
        ref,
        validateOrderability: this.validateOrderability
      };
    },
    product: childProduct,
    isProductPartOfSet: isProductASet,
    isProductPartOfBundle: isProductABundle,
    childOfBundleQuantity: childQuantity,
    selectedBundleParentQuantity: selectedBundleQuantity,
    addToCart: isProductASet ? (variant, quantity) => handleAddToCart([{
      product: childProduct,
      variant,
      quantity
    }]) : null,
    addToWishlist: isProductASet ? handleAddToWishlist : null,
    onVariantSelected: (product, variant, quantity) => {
      if (quantity) {
        setChildProductSelection(previousState => _objectSpread(_objectSpread({}, previousState), {}, {
          [product.id]: {
            product,
            variant,
            quantity: isProductABundle ? childQuantity : quantity
          }
        }));
      } else {
        const selections = _objectSpread({}, childProductSelection);
        delete selections[product.id];
        setChildProductSelection(selections);
      }
    },
    isProductLoading: isProductLoading,
    isBasketLoading: isBasketLoading,
    isWishlistLoading: isWishlistLoading,
    setChildProductOrderability: setChildProductOrderability
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_pages_product_detail_partials_information_accordion__WEBPACK_IMPORTED_MODULE_16__["default"], {
    product: childProduct
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Box, {
    display: ['none', 'none', 'none', 'block']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("hr", null))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_product_view__WEBPACK_IMPORTED_MODULE_15__["default"], {
    product: product,
    category: (primaryCategory === null || primaryCategory === void 0 ? void 0 : primaryCategory.parentCategoryTree) || [],
    addToCart: (variant, quantity) => handleAddToCart([{
      product,
      variant,
      quantity
    }]),
    addToWishlist: handleAddToWishlist,
    isProductLoading: isProductLoading,
    isBasketLoading: isBasketLoading,
    isWishlistLoading: isWishlistLoading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_pages_product_detail_partials_information_accordion__WEBPACK_IMPORTED_MODULE_16__["default"], {
    product: product
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_5__.Stack, {
    spacing: 16
  }, !isProductASet && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_14__["default"], {
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_25__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Complete the Set"
      }],
      id: "product_detail.recommended_products.title.complete_set"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.EINSTEIN_RECOMMENDERS.PDP_COMPLETE_SET,
    products: [product],
    mx: {
      base: -4,
      md: -8,
      lg: 0
    },
    shouldFetch: () => product === null || product === void 0 ? void 0 : product.id
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_14__["default"], {
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_25__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "You might also like"
      }],
      id: "product_detail.recommended_products.title.might_also_like"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.EINSTEIN_RECOMMENDERS.PDP_MIGHT_ALSO_LIKE,
    products: [product],
    mx: {
      base: -4,
      md: -8,
      lg: 0
    },
    shouldFetch: () => product === null || product === void 0 ? void 0 : product.id
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_recommended_products__WEBPACK_IMPORTED_MODULE_14__["default"]
  // The Recently Viewed recommender doesn't use `products`, so instead we
  // provide a key to update the recommendations on navigation.
  , {
    key: location.key,
    title: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_25__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Recently Viewed"
      }],
      id: "product_detail.recommended_products.title.recently_viewed"
    }),
    recommender: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_19__.EINSTEIN_RECOMMENDERS.PDP_RECENTLY_VIEWED,
    mx: {
      base: -4,
      md: -8,
      lg: 0
    }
  }))));
};
ProductDetail.getTemplateName = () => 'product-detail';
ProductDetail.propTypes = {
  /**
   * The current react router match object. (Provided internally)
   */
  match: (prop_types__WEBPACK_IMPORTED_MODULE_26___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductDetail);

/***/ }),

/***/ "./app/pages/product-detail/partials/information-accordion.jsx":
/*!*********************************************************************!*\
  !*** ./app/pages/product-detail/partials/information-accordion.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





const InformationAccordion = ({
  product
}) => {
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_2__["default"])();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Stack, {
    direction: "row",
    spacing: [0, 0, 0, 16]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Accordion, {
    allowMultiple: true,
    maxWidth: '896px',
    flex: [1, 1, 1, 5]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionButton, {
    height: "64px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    flex: "1",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "lg"
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Product Detail"
    }],
    id: "product_detail.accordion.button.product_detail"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionIcon, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionPanel, {
    mb: 6,
    mt: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    dangerouslySetInnerHTML: {
      __html: product === null || product === void 0 ? void 0 : product.longDescription
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionButton, {
    height: "64px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    flex: "1",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "lg"
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Size & Fit"
    }],
    id: "product_detail.accordion.button.size_fit"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionIcon, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionPanel, {
    mb: 6,
    mt: 4
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Coming Soon"
    }],
    id: "product_detail.accordion.message.coming_soon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionButton, {
    height: "64px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    flex: "1",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "lg"
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Reviews"
    }],
    id: "product_detail.accordion.button.reviews"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionIcon, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionPanel, {
    mb: 6,
    mt: 4
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Coming Soon"
    }],
    id: "product_detail.accordion.message.coming_soon"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionItem, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionButton, {
    height: "64px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    flex: "1",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "lg"
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Questions"
    }],
    id: "product_detail.accordion.button.questions"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionIcon, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.AccordionPanel, {
    mb: 6,
    mt: 4
  }, formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Coming Soon"
    }],
    id: "product_detail.accordion.message.coming_soon"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_1__.Box, {
    display: ['none', 'none', 'none', 'block'],
    flex: 4
  }));
};
InformationAccordion.propTypes = {
  product: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InformationAccordion);

/***/ }),

/***/ "./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@salesforce/pwa-kit-react-sdk/ssr/universal/errors.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.HTTPNotFound = exports.HTTPError = void 0;
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.constructor = HTTPError;
    this.__proto__ = HTTPError.prototype;
    this.message = message;
    this.status = status;
  }
  toString() {
    return `HTTPError ${this.status}: ${this.message}`;
  }
}
exports.HTTPError = HTTPError;
class HTTPNotFound extends HTTPError {
  constructor(message) {
    super(404, message);
    this.constructor = HTTPNotFound;
    this.__proto__ = HTTPNotFound.prototype;
  }
}
exports.HTTPNotFound = HTTPNotFound;

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-product-detail.js.map