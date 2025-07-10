"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-account-wishlist"],{

/***/ "./app/components/page-action-placeholder/index.jsx":
/*!**********************************************************!*\
  !*** ./app/components/page-action-placeholder/index.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
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





const PageActionPlaceHolder = ({
  heading,
  text,
  icon,
  buttonText,
  buttonProps,
  onButtonClick
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 2,
    py: 12,
    px: 4,
    alignItems: "center",
    borderRadius: "base",
    background: "gray.50"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 6,
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    align: "center",
    fontSize: "lg",
    fontWeight: "bold"
  }, heading), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Text, {
    align: "center",
    fontSize: "md",
    color: "gray.700"
  }, text)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    onClick: onButtonClick,
    leftIcon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_3__.PlusIcon, null)
  }, buttonProps), buttonText)));
};
PageActionPlaceHolder.propTypes = {
  heading: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  text: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  buttonText: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  icon: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().any),
  buttonProps: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().object),
  onButtonClick: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageActionPlaceHolder);

/***/ }),

/***/ "./app/pages/account/wishlist/index.jsx":
/*!**********************************************!*\
  !*** ./app/pages/account/wishlist/index.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-wish-list */ "./app/hooks/use-wish-list.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_page_action_placeholder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/page-action-placeholder */ "./app/components/page-action-placeholder/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_item__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-item */ "./app/components/product-item/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_wishlist_partials_wishlist_primary_action__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/wishlist/partials/wishlist-primary-action */ "./app/pages/account/wishlist/partials/wishlist-primary-action.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_pages_account_wishlist_partials_wishlist_secondary_button_group__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/pages/account/wishlist/partials/wishlist-secondary-button-group */ "./app/pages/account/wishlist/partials/wishlist-secondary-button-group.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_unavailable_product_confirmation_modal__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/unavailable-product-confirmation-modal */ "./app/components/unavailable-product-confirmation-modal/index.jsx");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */















const numberOfSkeletonItems = 3;
const AccountWishlist = () => {
  var _wishListData$custome, _wishListData$custome2;
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_16__["default"])();
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_6__.useToast)();
  const headingRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    var _headingRef$current;
    // Focus the 'Wishlist' header when the component mounts for accessibility
    headingRef === null || headingRef === void 0 ? void 0 : (_headingRef$current = headingRef.current) === null || _headingRef$current === void 0 ? void 0 : _headingRef$current.focus();
  }, []);
  const [selectedItem, setSelectedItem] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(undefined);
  const [isWishlistItemLoading, setWishlistItemLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    data: wishListData,
    isLoading: isWishListLoading
  } = (0,_salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_7__.useWishList)();
  const productIds = wishListData === null || wishListData === void 0 ? void 0 : (_wishListData$custome = wishListData.customerProductListItems) === null || _wishListData$custome === void 0 ? void 0 : _wishListData$custome.map(item => item.productId);
  const {
    data: productsData,
    isLoading: isProductsLoading
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useProducts)({
    parameters: {
      ids: productIds === null || productIds === void 0 ? void 0 : productIds.join(','),
      allImages: true,
      perPricebook: true
    }
  }, {
    enabled: (productIds === null || productIds === void 0 ? void 0 : productIds.length) > 0
  });

  // If a product is added to the wishlist many times, it gets collapased into 1 line item
  const wishListItems = wishListData === null || wishListData === void 0 ? void 0 : (_wishListData$custome2 = wishListData.customerProductListItems) === null || _wishListData$custome2 === void 0 ? void 0 : _wishListData$custome2.reduce((itemsData, item) => {
    var _productsData$data;
    const productData = productsData === null || productsData === void 0 ? void 0 : (_productsData$data = productsData.data) === null || _productsData$data === void 0 ? void 0 : _productsData$data.find(product => product.id === item.productId);
    return _objectSpread(_objectSpread({}, itemsData), {}, {
      [item.productId]: _objectSpread(_objectSpread({}, item), {}, {
        product: productData
      })
    });
  }, {});
  const updateCustomerProductListItem = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useShopperCustomersMutation)('updateCustomerProductListItem');
  const deleteCustomerProductListItem = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useShopperCustomersMutation)('deleteCustomerProductListItem');
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_14__.useCurrentCustomer)();
  const handleSecondaryAction = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (itemId, promise) {
      setWishlistItemLoading(true);
      setSelectedItem(itemId);
      try {
        yield promise;
        // No need to handle error here, as the inner component will take care of it
      } finally {
        setWishlistItemLoading(false);
        setSelectedItem(undefined);
      }
    });
    return function handleSecondaryAction(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  const handleUnavailableProducts = /*#__PURE__*/function () {
    var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (unavailableProductIds) {
      if (!unavailableProductIds.length) return;
      yield Promise.all(unavailableProductIds.map(/*#__PURE__*/function () {
        var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (id) {
          const item = wishListItems === null || wishListItems === void 0 ? void 0 : wishListItems.find(item => {
            return item.productId.toString() === id.toString();
          });
          const parameters = {
            customerId: customer.customerId,
            itemId: item === null || item === void 0 ? void 0 : item.id,
            listId: wishListData === null || wishListData === void 0 ? void 0 : wishListData.id
          };
          yield deleteCustomerProductListItem.mutateAsync({
            parameters
          });
        });
        return function (_x4) {
          return _ref3.apply(this, arguments);
        };
      }()));
    });
    return function handleUnavailableProducts(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  const handleItemQuantityChanged = /*#__PURE__*/function () {
    var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (quantity, item) {
      let isValidChange = false;
      setSelectedItem(item.productId);
      const body = _objectSpread(_objectSpread({}, item), {}, {
        quantity: parseInt(quantity)
      });
      // To meet expected schema, remove the custom `product` we added
      delete body.product;
      const parameters = {
        customerId: customer.customerId,
        itemId: item.id,
        listId: wishListData === null || wishListData === void 0 ? void 0 : wishListData.id
      };
      const mutation = parseInt(quantity) > 0 ? updateCustomerProductListItem.mutateAsync({
        body,
        parameters
      }) : deleteCustomerProductListItem.mutateAsync({
        parameters
      });
      try {
        yield mutation;
        isValidChange = true;
        setSelectedItem(undefined);
      } catch (err) {
        toast({
          title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_13__.API_ERROR_MESSAGE),
          status: 'error'
        });
      }

      // If true, the quantity picker would immediately update its number
      // without waiting for the invalidated lists data to finish refetching
      return isValidChange;
    });
    return function handleItemQuantityChanged(_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }();
  const hasWishlistItems = Object.keys(wishListItems ?? {}).length > 0;
  const isPageLoading = hasWishlistItems ? isProductsLoading : isWishListLoading;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 4,
    "data-testid": "account-wishlist-page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h1",
    fontSize: "2xl",
    tabIndex: "0",
    ref: headingRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_17__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Wishlist"
    }],
    id: "account_wishlist.title.wishlist"
  })), isPageLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    "data-testid": "sf-wishlist-skeleton"
  }, new Array(numberOfSkeletonItems).fill(0).map((i, idx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    key: idx,
    p: [4, 6],
    my: 4,
    border: "1px solid",
    borderColor: "gray.100",
    borderRadius: "base"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    width: "full",
    align: "flex-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    boxSize: ['88px', 36],
    mr: 4
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    h: "20px",
    w: "112px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    h: "20px",
    w: "84px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    h: "20px",
    w: "140px"
  })))))), !isPageLoading && !hasWishlistItems && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_page_action_placeholder__WEBPACK_IMPORTED_MODULE_8__["default"], {
    "data-testid": "empty-wishlist",
    icon: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_9__.HeartIcon, {
      boxSize: 8
    }),
    heading: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "No Wishlist Items"
      }],
      id: "account_wishlist.heading.no_wishlist"
    }),
    text: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Continue shopping and add items to your wishlist."
      }],
      id: "account_wishlist.description.continue_shopping"
    }),
    buttonText: formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Continue Shopping"
      }],
      id: "account_wishlist.button.continue_shopping"
    }),
    buttonProps: {
      leftIcon: undefined
    },
    onButtonClick: () => navigate('/')
  }), !isPageLoading && wishListItems && Object.keys(wishListItems).map(key => {
    const item = wishListItems[key];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_product_item__WEBPACK_IMPORTED_MODULE_10__["default"], {
      key: item.id,
      product: _objectSpread(_objectSpread({}, item.product), {}, {
        quantity: item.quantity
      }),
      showLoading: (updateCustomerProductListItem.isLoading || deleteCustomerProductListItem.isLoading || isWishlistItemLoading) && selectedItem === item.productId,
      primaryAction: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_pages_account_wishlist_partials_wishlist_primary_action__WEBPACK_IMPORTED_MODULE_11__["default"], null),
      onItemQuantityChange: quantity => handleItemQuantityChanged(quantity, item),
      secondaryActions: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_pages_account_wishlist_partials_wishlist_secondary_button_group__WEBPACK_IMPORTED_MODULE_12__["default"], {
        productListItemId: item.id,
        productName: item.product.name
        // Focus to 'Wishlist' header after remove for accessibility
        ,
        focusElementOnRemove: headingRef,
        onClick: handleSecondaryAction
      })
    });
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_unavailable_product_confirmation_modal__WEBPACK_IMPORTED_MODULE_15__["default"], {
    productItems: wishListData === null || wishListData === void 0 ? void 0 : wishListData.customerProductListItems,
    handleUnavailableProducts: handleUnavailableProducts
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AccountWishlist);

/***/ }),

/***/ "./app/pages/account/wishlist/partials/wishlist-primary-action.jsx":
/*!*************************************************************************!*\
  !*** ./app/pages/account/wishlist/partials/wishlist-primary-action.jsx ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_view_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-view-modal */ "./app/components/product-view-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_8__);

/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */










/**
 * Renders primary action on a product-item card in the form of a button.
 * Represents the most prominent action you want the user to perform with the product-item
 * eg.: Add to cart option for wishlist items
 */
const WishlistPrimaryAction = () => {
  var _variant$type, _variant$type2, _variant$type3;
  const variant = (0,_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_3__.useItemVariant)();
  const {
    addItemToNewOrExistingBasket
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_8__.useShopperBasketsMutationHelper)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_9__["default"])();
  const isMasterProduct = (variant === null || variant === void 0 ? void 0 : (_variant$type = variant.type) === null || _variant$type === void 0 ? void 0 : _variant$type.master) || false;
  const isProductASet = variant === null || variant === void 0 ? void 0 : (_variant$type2 = variant.type) === null || _variant$type2 === void 0 ? void 0 : _variant$type2.set;
  const isProductABundle = variant === null || variant === void 0 ? void 0 : (_variant$type3 = variant.type) === null || _variant$type3 === void 0 ? void 0 : _variant$type3.bundle;
  const showToast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_5__.useToast)();
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    isOpen,
    onOpen,
    onClose
  } = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useDisclosure)();
  const handleAddToCart = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (item, quantity) {
      setIsLoading(true);
      const isAddingASet = Boolean(item.setProducts);
      const productItems = isAddingASet ? item.setProducts.map(child => ({
        productId: child.id || child.productId,
        price: child.price,
        quantity
      })) : [{
        productId: item.id || item.productId,
        price: item.price,
        quantity
      }];
      try {
        yield addItemToNewOrExistingBasket(productItems);
        showToast({
          title: formatMessage({
            defaultMessage: [{
              "type": 1,
              "value": "quantity"
            }, {
              "type": 0,
              "value": " "
            }, {
              "type": 6,
              "value": "quantity",
              "options": {
                "one": {
                  "value": [{
                    "type": 0,
                    "value": "item"
                  }]
                },
                "other": {
                  "value": [{
                    "type": 0,
                    "value": "items"
                  }]
                }
              },
              "offset": 0,
              "pluralType": "cardinal"
            }, {
              "type": 0,
              "value": " added to cart"
            }],
            id: "wishlist_primary_action.info.added_to_cart"
          }, {
            quantity: isAddingASet ? quantity * item.setProducts.length : quantity
          }),
          status: 'success'
        });
        onClose();
      } catch (e) {
        showToast({
          title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_6__.API_ERROR_MESSAGE),
          status: 'error'
        });
      } finally {
        setIsLoading(false);
      }
    });
    return function handleAddToCart(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  const buttonText = {
    viewOptions: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_10__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "View Options"
      }],
      id: "wishlist_primary_action.button.view_options"
    }),
    viewFullDetails: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_10__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "View Full Details"
      }],
      id: "wishlist_primary_action.button.view_full_details"
    }),
    addToCart: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_10__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Add to Cart"
      }],
      id: "wishlist_primary_action.button.add_to_cart"
    }),
    addSetToCart: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_10__["default"], {
      defaultMessage: [{
        "type": 0,
        "value": "Add Set to Cart"
      }],
      id: "wishlist_primary_action.button.add_set_to_cart"
    })
  };
  if (isProductASet) {
    var _variant$setProducts;
    if ((_variant$setProducts = variant.setProducts) !== null && _variant$setProducts !== void 0 && _variant$setProducts.every(child => !hasVariants(child))) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: 'solid',
        onClick: () => handleAddToCart(variant, variant.quantity),
        w: 'full',
        isLoading: isLoading,
        "aria-label": formatMessage({
          id: "wishlist_primary_action.button.addSetToCart.label",
          defaultMessage: [{
            "type": 0,
            "value": "Add "
          }, {
            "type": 1,
            "value": "productName"
          }, {
            "type": 0,
            "value": " set to cart"
          }]
        }, {
          productName: variant.name
        })
      }, buttonText.addSetToCart);
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
        as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_7__["default"],
        href: `/product/${variant.id}`,
        w: 'full',
        variant: 'solid',
        _hover: {
          textDecoration: 'none'
        },
        "aria-label": formatMessage({
          id: "wishlist_primary_action.button.viewFullDetails.label",
          defaultMessage: [{
            "type": 0,
            "value": "View full details for "
          }, {
            "type": 1,
            "value": "productName"
          }]
        }, {
          productName: variant.name
        })
      }, buttonText.viewFullDetails);
    }
  } else if (isProductABundle) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
      as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_7__["default"],
      href: `/product/${variant.id}`,
      w: 'full',
      variant: 'solid',
      _hover: {
        textDecoration: 'none'
      },
      "aria-label": formatMessage({
        id: "wishlist_primary_action.button.viewFullDetails.label",
        defaultMessage: [{
          "type": 0,
          "value": "View full details for "
        }, {
          "type": 1,
          "value": "productName"
        }]
      }, {
        productName: variant.name
      })
    }, buttonText.viewFullDetails);
  } else {
    if (isMasterProduct) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
        "aria-label": formatMessage({
          id: "wishlist_primary_action.button.view_options.label",
          defaultMessage: [{
            "type": 0,
            "value": "View Options for "
          }, {
            "type": 1,
            "value": "productName"
          }]
        }, {
          productName: variant.name
        }),
        w: 'full',
        variant: 'solid',
        onClick: onOpen
      }, buttonText.viewOptions), isOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_product_view_modal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isOpen: isOpen,
        onOpen: onOpen,
        onClose: onClose,
        product: variant,
        addToCart: (variant, quantity) => handleAddToCart(variant, quantity)
      }));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Button, {
        variant: 'solid',
        onClick: () => handleAddToCart(variant, variant.quantity),
        w: 'full',
        isLoading: isLoading,
        "aria-label": formatMessage({
          id: "wishlist_primary_action.button.addToCart.label",
          defaultMessage: [{
            "type": 0,
            "value": "Add "
          }, {
            "type": 1,
            "value": "productName"
          }, {
            "type": 0,
            "value": " to cart"
          }]
        }, {
          productName: variant.name
        })
      }, buttonText.addToCart);
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WishlistPrimaryAction);
const hasVariants = product => Boolean(product === null || product === void 0 ? void 0 : product.variants);

/***/ }),

/***/ "./app/pages/account/wishlist/partials/wishlist-secondary-button-group.jsx":
/*!*********************************************************************************!*\
  !*** ./app/pages/account/wishlist/partials/wishlist-secondary-button-group.jsx ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   REMOVE_WISHLIST_ITEM_CONFIRMATION_DIALOG_CONFIG: () => (/* binding */ REMOVE_WISHLIST_ITEM_CONFIRMATION_DIALOG_CONFIG),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-wish-list */ "./app/hooks/use-wish-list.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_confirmation_modal_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/confirmation-modal/index */ "./app/components/confirmation-modal/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/utils */ "./app/utils/utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");


/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */












const REMOVE_WISHLIST_ITEM_CONFIRMATION_DIALOG_CONFIG = {
  dialogTitle: (0,react_intl__WEBPACK_IMPORTED_MODULE_12__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Confirm Remove Item"
    }],
    id: "confirmation_modal.remove_wishlist_item.title.confirm_remove"
  }),
  confirmationMessage: (0,react_intl__WEBPACK_IMPORTED_MODULE_12__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Are you sure you want to remove this item from your wishlist?"
    }],
    id: "confirmation_modal.remove_wishlist_item.message.sure_to_remove"
  }),
  primaryActionLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_12__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Yes, remove item"
    }],
    id: "confirmation_modal.remove_wishlist_item.action.yes"
  }),
  primaryActionAriaLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_12__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "Yes, remove item"
    }],
    id: "confirmation_modal.remove_cart_item.assistive_msg.yes"
  }),
  alternateActionLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_12__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "No, keep item"
    }],
    id: "confirmation_modal.remove_wishlist_item.action.no"
  }),
  alternateActionAriaLabel: (0,react_intl__WEBPACK_IMPORTED_MODULE_12__.defineMessage)({
    defaultMessage: [{
      "type": 0,
      "value": "No, keep item"
    }],
    id: "confirmation_modal.remove_cart_item.assistive_msg.no"
  }),
  onPrimaryAction: _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__.noop
};

/**
 * Renders secondary actions on a product-item card in the form of a button group.
 * Represents other actions you want the user to perform with the product-item (eg.: Remove or Edit)
 */
const WishlistSecondaryButtonGroup = ({
  productListItemId,
  productName = '',
  focusElementOnRemove,
  onClick = _salesforce_retail_react_app_app_utils_utils__WEBPACK_IMPORTED_MODULE_10__.noop
}) => {
  const variant = (0,_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_9__.useItemVariant)();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_6__.useCurrentCustomer)();
  const {
    data: wishList
  } = (0,_salesforce_retail_react_app_app_hooks_use_wish_list__WEBPACK_IMPORTED_MODULE_7__.useWishList)();
  const modalProps = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useDisclosure)();
  const toast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_5__.useToast)();
  const {
    formatMessage
  } = (0,react_intl__WEBPACK_IMPORTED_MODULE_13__["default"])();
  const showRemoveItemConfirmation = () => {
    modalProps.onOpen();
  };
  const deleteCustomerProductListItem = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useShopperCustomersMutation)('deleteCustomerProductListItem');
  const handleItemRemove = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
      try {
        var _focusElementOnRemove;
        const promise = deleteCustomerProductListItem.mutateAsync({
          parameters: {
            customerId: customer.customerId,
            listId: wishList === null || wishList === void 0 ? void 0 : wishList.id,
            itemId: productListItemId
          }
        });
        onClick(variant.id, promise);
        yield promise;
        toast({
          title: formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Item removed from wishlist"
            }],
            id: "wishlist_secondary_button_group.info.item_removed"
          }),
          status: 'success'
        });

        // After we remove an item from the wishlist
        // we need to place focus to the next logical place for accessibility
        focusElementOnRemove === null || focusElementOnRemove === void 0 ? void 0 : (_focusElementOnRemove = focusElementOnRemove.current) === null || _focusElementOnRemove === void 0 ? void 0 : _focusElementOnRemove.focus();
      } catch {
        toast({
          title: formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_11__.API_ERROR_MESSAGE),
          status: 'error'
        });
      }
    });
    return function handleItemRemove() {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.ButtonGroup, {
    spacing: "6"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    size: "sm",
    onClick: showRemoveItemConfirmation,
    "data-testid": `sf-wishlist-remove-${productListItemId}`,
    "aria-label": formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Remove "
      }, {
        "type": 1,
        "value": "productName"
      }],
      id: "wishlist_secondary_button_group.info.item.remove.label"
    }, {
      productName
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_14__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Remove"
    }],
    id: "wishlist_secondary_button_group.action.remove"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_confirmation_modal_index__WEBPACK_IMPORTED_MODULE_8__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, REMOVE_WISHLIST_ITEM_CONFIRMATION_DIALOG_CONFIG, {
    onPrimaryAction: handleItemRemove
  }, modalProps)));
};
WishlistSecondaryButtonGroup.propTypes = {
  productListItemId: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string),
  productName: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().string),
  focusElementOnRemove: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().object),
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_15___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WishlistSecondaryButtonGroup);

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-account-wishlist.js.map