"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["salesforce-retail-react-app-app-pages-checkout-confirmation"],{

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

/***/ "./app/components/forms/post-checkout-registration-fields.jsx":
/*!********************************************************************!*\
  !*** ./app/components/forms/post-checkout-registration-fields.jsx ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_useRegistrationFields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/useRegistrationFields */ "./app/components/forms/useRegistrationFields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_password_requirements__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/password-requirements */ "./app/components/forms/password-requirements.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/field */ "./app/components/field/index.jsx");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






const PostCheckoutRegistrationFields = ({
  form,
  prefix = ''
}) => {
  const fields = (0,_salesforce_retail_react_app_app_components_forms_useRegistrationFields__WEBPACK_IMPORTED_MODULE_3__["default"])({
    form,
    prefix
  });
  const password = form.watch(`${prefix}password`);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 5
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__["default"], fields.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Stack, {
    spacing: 3,
    paddingBottom: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__["default"], fields.password), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_forms_password_requirements__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: password
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, fields.firstName, {
    type: "hidden"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_field__WEBPACK_IMPORTED_MODULE_5__["default"], (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, fields.lastName, {
    type: "hidden"
  })));
};
PostCheckoutRegistrationFields.propTypes = {
  /** Object returned from `useForm` */
  form: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().object).isRequired,
  /** Optional prefix for field names */
  prefix: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostCheckoutRegistrationFields);

/***/ }),

/***/ "./app/pages/checkout/confirmation.jsx":
/*!*********************************************!*\
  !*** ./app/pages/checkout/confirmation.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.mjs");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/commerce-sdk-react */ "./node_modules/@salesforce/commerce-sdk-react/index.js");
/* harmony import */ var _salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/cc-utils */ "./app/utils/cc-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-navigation */ "./app/hooks/use-navigation.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/address-display */ "./app/components/address-display/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_forms_post_checkout_registration_fields__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/forms/post-checkout-registration-fields */ "./app/components/forms/post-checkout-registration-fields.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_promo_popover__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/promo-popover */ "./app/components/promo-popover/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant */ "./app/components/item-variant/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-image */ "./app/components/item-variant/item-image.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-name */ "./app/components/item-variant/item-name.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-attributes */ "./app/components/item-variant/item-attributes.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/item-variant/item-price */ "./app/components/item-variant/item-price.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-current-customer */ "./app/hooks/use-current-customer.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */




















const onClient = typeof window !== 'undefined';
const CheckoutConfirmation = () => {
  var _order$paymentInstrum, _form$formState$error, _order$productItems, _order$orderPriceAdju, _order$shippingItems$, _order$shippingItems, _order$shippingItems$2, _order$shippingItems$3, _order$shippingItems$4, _order$shippingItems$5, _order$paymentInstrum2, _order$paymentInstrum3, _order$paymentInstrum4, _order$paymentInstrum5;
  const {
    orderNo
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_19__.useParams)();
  const navigate = (0,_salesforce_retail_react_app_app_hooks_use_navigation__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const {
    data: customer
  } = (0,_salesforce_retail_react_app_app_hooks_use_current_customer__WEBPACK_IMPORTED_MODULE_16__.useCurrentCustomer)();
  const register = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useAuthHelper)(_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.AuthHelpers.Register);
  const {
    data: order
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useOrder)({
    parameters: {
      orderNo
    }
  }, {
    enabled: !!orderNo && onClient
  });
  const {
    currency
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_18__.useCurrency)();
  const itemIds = order === null || order === void 0 ? void 0 : order.productItems.map(item => item.productId);
  const {
    data: products
  } = (0,_salesforce_commerce_sdk_react__WEBPACK_IMPORTED_MODULE_4__.useProducts)({
    parameters: {
      ids: itemIds === null || itemIds === void 0 ? void 0 : itemIds.join(',')
    }
  });
  const productItemsMap = products === null || products === void 0 ? void 0 : products.data.reduce((map, item) => _objectSpread(_objectSpread({}, map), {}, {
    [item.id]: item
  }), {});
  const form = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_20__.useForm)();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    var _order$customerInfo, _order$billingAddress, _order$billingAddress2;
    form.reset({
      email: (order === null || order === void 0 ? void 0 : (_order$customerInfo = order.customerInfo) === null || _order$customerInfo === void 0 ? void 0 : _order$customerInfo.email) || '',
      password: '',
      firstName: order === null || order === void 0 ? void 0 : (_order$billingAddress = order.billingAddress) === null || _order$billingAddress === void 0 ? void 0 : _order$billingAddress.firstName,
      lastName: order === null || order === void 0 ? void 0 : (_order$billingAddress2 = order.billingAddress) === null || _order$billingAddress2 === void 0 ? void 0 : _order$billingAddress2.lastName
    });
  }, [order]);
  if (!order || !order.orderNo) {
    return null;
  }
  const CardIcon = (0,_salesforce_retail_react_app_app_utils_cc_utils__WEBPACK_IMPORTED_MODULE_5__.getCreditCardIcon)((_order$paymentInstrum = order.paymentInstruments[0].paymentCard) === null || _order$paymentInstrum === void 0 ? void 0 : _order$paymentInstrum.cardType);
  const submitForm = /*#__PURE__*/function () {
    var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
      try {
        const body = {
          customer: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            login: data.email
          },
          password: data.password
        };
        yield register.mutateAsync(body);
        navigate(`/account`);
      } catch (error) {
        if (!error.response) {
          form.setError('global', {
            type: 'manual',
            message: _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_17__.API_ERROR_MESSAGE
          });
          return;
        }
        const json = yield error.response.json();
        const existingAccountMessage = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
          defaultMessage: [{
            "type": 0,
            "value": "This email already has an account."
          }],
          id: "checkout_confirmation.message.already_has_account"
        }), "\xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_7__["default"], {
          to: "/login",
          color: "blue.600"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
          defaultMessage: [{
            "type": 0,
            "value": "Log in here"
          }],
          id: "checkout_confirmation.link.login"
        })));
        const message = /the login is already in use/i.test(json.detail) ? existingAccountMessage : _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_17__.API_ERROR_MESSAGE;
        form.setError('global', {
          type: 'manual',
          message
        });
      }
    });
    return function submitForm(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    background: "gray.50"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    maxWidth: "container.md",
    py: {
      base: 7,
      md: 16
    },
    px: {
      base: 0,
      md: 4
    },
    "data-testid": "sf-checkout-confirmation-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    layerStyle: "card",
    rounded: [0, 0, 'base'],
    px: [4, 4, 6],
    py: [6, 6, 8]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    align: "center",
    fontSize: ['2xl']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Thank you for your order!"
    }],
    id: "checkout_confirmation.heading.thank_you_for_order"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 3
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Number"
    }],
    id: "checkout_confirmation.label.order_number"
  }), ":", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    as: "span",
    fontWeight: "bold"
  }, order.orderNo)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    align: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "We will send an email to "
    }, {
      "type": 8,
      "value": "b",
      "children": [{
        "type": 1,
        "value": "email"
      }]
    }, {
      "type": 0,
      "value": " with your confirmation number and receipt shortly."
    }],
    id: "checkout_confirmation.message.will_email_shortly",
    values: {
      b: chunks => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("b", null, chunks),
      email: order.customerInfo.email
    }
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Spacer, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    as: _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_7__["default"],
    href: "/",
    variant: "outline"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Continue Shopping"
    }],
    id: "checkout_confirmation.link.continue_shopping"
  }))))))), customer.isGuest && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    layerStyle: "card",
    rounded: [0, 0, 'base'],
    px: [4, 4, 6],
    py: [6, 6, 8]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: "lg",
    marginBottom: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Create an account for faster checkout"
    }],
    id: "checkout_confirmation.heading.create_account"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("form", {
    onSubmit: form.handleSubmit(submitForm)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 4
  }, ((_form$formState$error = form.formState.errors) === null || _form$formState$error === void 0 ? void 0 : _form$formState$error.global) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Alert, {
    status: "error"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.AlertIcon, null), form.formState.errors.global.message), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_forms_post_checkout_registration_fields__WEBPACK_IMPORTED_MODULE_9__["default"], {
    form: form
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
    type: "submit",
    width: "full",
    onClick: () => form.clearErrors('global'),
    isLoading: form.formState.isSubmitting
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Create Account"
    }],
    id: "checkout_confirmation.button.create_account"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    layerStyle: "card",
    rounded: [0, 0, 'base'],
    px: [4, 4, 6],
    py: [6, 6, 8]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Delivery Details"
    }],
    id: "checkout_confirmation.heading.delivery_details"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.SimpleGrid, {
    columns: [1, 1, 2],
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h3",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Address"
    }],
    id: "checkout_confirmation.heading.shipping_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_8__["default"], {
    address: order.shipments[0].shippingAddress
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h3",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping Method"
    }],
    id: "checkout_confirmation.heading.shipping_method"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, order.shipments[0].shippingMethod.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, order.shipments[0].shippingMethod.description))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    layerStyle: "card",
    rounded: [0, 0, 'base'],
    px: [4, 4, 6],
    py: [6, 6, 8]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Summary"
    }],
    id: "checkout_confirmation.heading.order_summary"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
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
    }],
    values: {
      itemCount: order.productItems.reduce((a, b) => a + b.quantity, 0)
    },
    id: "checkout_confirmation.message.num_of_items_in_order"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 5,
    align: "flex-start"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 5,
    align: "flex-start",
    width: "full",
    divider: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Divider, null)
  }, (_order$productItems = order.productItems) === null || _order$productItems === void 0 ? void 0 : _order$productItems.map((product, idx) => {
    const productDetail = (productItemsMap === null || productItemsMap === void 0 ? void 0 : productItemsMap[product.productId]) || {};
    const variant = _objectSpread(_objectSpread(_objectSpread({}, product), productDetail), {}, {
      price: product.price
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant__WEBPACK_IMPORTED_MODULE_11__["default"], {
      key: product.productId,
      index: idx,
      variant: variant
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      width: "full",
      alignItems: "flex-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_image__WEBPACK_IMPORTED_MODULE_12__["default"], {
      width: "80px",
      mr: 2
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
      spacing: 1,
      marginTop: "-3px",
      flex: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_name__WEBPACK_IMPORTED_MODULE_13__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
      width: "full",
      justifyContent: "space-between",
      alignItems: "flex-end"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_attributes__WEBPACK_IMPORTED_MODULE_14__["default"], {
      includeQuantity: true
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_item_variant_item_price__WEBPACK_IMPORTED_MODULE_15__["default"], {
      currency: currency
    })))));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    w: "full",
    py: 4,
    borderY: "1px",
    borderColor: "gray.200"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Subtotal"
    }],
    id: "checkout_confirmation.label.subtotal"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__.FormattedNumber, {
    style: "currency",
    currency: order === null || order === void 0 ? void 0 : order.currency,
    value: order === null || order === void 0 ? void 0 : order.productSubTotal
  }))), (_order$orderPriceAdju = order.orderPriceAdjustments) === null || _order$orderPriceAdju === void 0 ? void 0 : _order$orderPriceAdju.map(adjustment => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between",
    key: adjustment.priceAdjustmentId
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, adjustment.itemText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    color: "green.500"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__.FormattedNumber, {
    style: "currency",
    currency: order === null || order === void 0 ? void 0 : order.currency,
    value: adjustment.price
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    alignItems: "center"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    lineHeight: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Shipping"
    }],
    id: "checkout_confirmation.label.shipping"
  }), ((_order$shippingItems$ = order.shippingItems[0].priceAdjustments) === null || _order$shippingItems$ === void 0 ? void 0 : _order$shippingItems$.length) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    as: "span",
    ml: 1
  }, "(", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Promotion applied"
    }],
    id: "checkout_confirmation.label.promo_applied"
  }), ")")), ((_order$shippingItems = order.shippingItems) === null || _order$shippingItems === void 0 ? void 0 : (_order$shippingItems$2 = _order$shippingItems[0]) === null || _order$shippingItems$2 === void 0 ? void 0 : (_order$shippingItems$3 = _order$shippingItems$2.priceAdjustments) === null || _order$shippingItems$3 === void 0 ? void 0 : _order$shippingItems$3.length) > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_promo_popover__WEBPACK_IMPORTED_MODULE_10__["default"], {
    ml: 2
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, null, (_order$shippingItems$4 = order.shippingItems[0].priceAdjustments) === null || _order$shippingItems$4 === void 0 ? void 0 : _order$shippingItems$4.map(adjustment => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    key: adjustment.priceAdjustmentId,
    fontSize: "sm"
  }, adjustment.itemText))))), (_order$shippingItems$5 = order.shippingItems[0].priceAdjustments) !== null && _order$shippingItems$5 !== void 0 && _order$shippingItems$5.some(({
    appliedDiscount
  }) => (appliedDiscount === null || appliedDiscount === void 0 ? void 0 : appliedDiscount.type) === 'free') ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    as: "span",
    color: "green.500",
    textTransform: "uppercase"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Free"
    }],
    id: "checkout_confirmation.label.free"
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__.FormattedNumber, {
    value: order.shippingTotal,
    style: "currency",
    currency: order.currency
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Tax"
    }],
    id: "checkout_confirmation.label.tax"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__.FormattedNumber, {
    value: order.taxTotal,
    style: "currency",
    currency: order.currency
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    w: "full",
    justify: "space-between"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Order Total"
    }],
    id: "checkout_confirmation.label.order_total"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_22__.FormattedNumber, {
    style: "currency",
    currency: order === null || order === void 0 ? void 0 : order.currency,
    value: order === null || order === void 0 ? void 0 : order.orderTotal
  })))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    layerStyle: "card",
    rounded: [0, 0, 'base'],
    px: [4, 4, 6],
    py: [6, 6, 8]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Container, {
    variant: "form"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Payment Details"
    }],
    id: "checkout_confirmation.heading.payment_details"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.SimpleGrid, {
    columns: [1, 1, 2],
    spacing: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h3",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Billing Address"
    }],
    id: "checkout_confirmation.heading.billing_address"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_address_display__WEBPACK_IMPORTED_MODULE_8__["default"], {
    address: order.billingAddress
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    spacing: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    as: "h3",
    fontSize: "sm"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_21__["default"], {
    defaultMessage: [{
      "type": 0,
      "value": "Credit Card"
    }],
    id: "checkout_confirmation.heading.credit_card"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    direction: "row"
  }, CardIcon && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(CardIcon, {
    layerStyle: "ccIcon"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, (_order$paymentInstrum2 = order.paymentInstruments[0].paymentCard) === null || _order$paymentInstrum2 === void 0 ? void 0 : _order$paymentInstrum2.cardType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Stack, {
    direction: "row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, "\u2022\u2022\u2022\u2022", ' ', (_order$paymentInstrum3 = order.paymentInstruments[0].paymentCard) === null || _order$paymentInstrum3 === void 0 ? void 0 : _order$paymentInstrum3.numberLastDigits), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, null, (_order$paymentInstrum4 = order.paymentInstruments[0].paymentCard) === null || _order$paymentInstrum4 === void 0 ? void 0 : _order$paymentInstrum4.expirationMonth, "/", (_order$paymentInstrum5 = order.paymentInstruments[0].paymentCard) === null || _order$paymentInstrum5 === void 0 ? void 0 : _order$paymentInstrum5.expirationYear))))))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CheckoutConfirmation);

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

/***/ })

}]);
//# sourceMappingURL=salesforce-retail-react-app-app-pages-checkout-confirmation.js.map