"use strict";
(self["harnessChunkLoading"] = self["harnessChunkLoading"] || []).push([["app_components_product-view_index_jsx"],{

/***/ "./app/components/breadcrumb/index.jsx":
/*!*********************************************!*\
  !*** ./app/components/breadcrumb/index.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/icons */ "./overlays/page-designer-theme-home/app/components/icons/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/url */ "./overlays/utils/app/utils/url.js");


const _excluded = ["categories"];
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






// Components


// Icons


// Others


/**
 * A simplification of the Chakra `Breadcrumb` component for our project needs. Given
 * a list of categories, display a breadcrumb and it's items.
 */
const Breadcrumb = _ref => {
  let {
      categories
    } = _ref,
    rest = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_6__["default"])();
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useStyleConfig)('Breadcrumb');
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Breadcrumb, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: "sf-breadcrumb",
    sx: styles.container,
    separator: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_icons__WEBPACK_IMPORTED_MODULE_4__.ChevronRightIcon, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.icon, {
      "aria-hidden": "true"
    }))
  }, rest), categories.map(category => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.BreadcrumbItem, {
    key: category.id,
    "data-testid": "sf-crumb-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.BreadcrumbLink, {
    as: react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Link,
    to: (0,_salesforce_retail_react_app_app_utils_url__WEBPACK_IMPORTED_MODULE_5__.categoryUrlBuilder)(category, intl.locale),
    sx: styles.link
  }, category.name))));
};
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.propTypes = {
  /**
   * The categories to be displayed in this breadcrumb.
   */
  categories: (prop_types__WEBPACK_IMPORTED_MODULE_8___default().array)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Breadcrumb);

/***/ }),

/***/ "./app/components/image-gallery/index.jsx":
/*!************************************************!*\
  !*** ./app/components/image-gallery/index.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Skeleton: () => (/* binding */ Skeleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_image_groups_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/image-groups-utils */ "./app/utils/image-groups-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_dynamic_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/dynamic-image */ "./app/components/dynamic-image/index.jsx");

/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */





// Chakra Components



const EnterKeyNumber = 13;
const LARGE = 'large';
const SMALL = 'small';

/**
 * The skeleton representation of the image gallery component. Use this component while
 * you are waiting for product data to be returnd from the server.
 */
const Skeleton = ({
  size
}) => {
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useMultiStyleConfig)('ImageGallery', {
    size
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
    "data-testid": "sf-image-gallery-skeleton"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    flexDirection: "column"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AspectRatio, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ratio: 1
  }, styles.heroImageSkeleton), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, null, new Array(4).fill(0).map((_, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AspectRatio, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    ratio: 1
  }, styles.thumbnailImageSkeleton, {
    key: index
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Skeleton, null))))));
};
Skeleton.propTypes = {
  size: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};

/**
 * The image gallery displays a hero image and thumbnails below it. You can control which
 * image groups that are use by passing in the current selected variation values.
 */
const ImageGallery = ({
  imageGroups = [],
  selectedVariationAttributes = {},
  size,
  lazy = false
}) => {
  var _heroImageGroup$image;
  const [selectedIndex, setSelectedIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const styles = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.useMultiStyleConfig)('ImageGallery', {
    size
  });
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__.useLocation)();

  // Get the 'hero' image for the current variation.
  const heroImageGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_salesforce_retail_react_app_app_utils_image_groups_utils__WEBPACK_IMPORTED_MODULE_3__.findImageGroupBy)(imageGroups, {
    viewType: LARGE,
    selectedVariationAttributes
  }), [selectedVariationAttributes]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // reset the selected index when location search changes
    setSelectedIndex(0);
  }, [location.search]);

  // Get a memoized image group used for the thumbnails. We use the `useMemo` hook
  // so we don't have to waste time filtering the image groups each render if the
  // selected variation attributes haven't changed.
  const thumbnailImageGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_salesforce_retail_react_app_app_utils_image_groups_utils__WEBPACK_IMPORTED_MODULE_3__.findImageGroupBy)(imageGroups, {
    viewType: SMALL,
    selectedVariationAttributes
  }), [selectedVariationAttributes]);
  const heroImage = heroImageGroup === null || heroImageGroup === void 0 ? void 0 : (_heroImageGroup$image = heroImageGroup.images) === null || _heroImageGroup$image === void 0 ? void 0 : _heroImageGroup$image[selectedIndex];
  const thumbnailImages = (thumbnailImageGroup === null || thumbnailImageGroup === void 0 ? void 0 : thumbnailImageGroup.images) || [];
  const loadingStrategy = lazy ? 'lazy' : 'eager';
  const heroImageMaxWidth = styles.heroImage.maxWidth[3]; // in px

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Flex, {
    direction: "column"
  }, heroImage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, styles.heroImageGroup, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AspectRatio, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.heroImage, {
    ratio: 1
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_dynamic_image__WEBPACK_IMPORTED_MODULE_4__["default"], {
    src: `${heroImage.disBaseLink || heroImage.link}[?sw={width}&q=60]`,
    widths: {
      base: '100vw',
      lg: heroImageMaxWidth
    },
    imageProps: {
      alt: heroImage.alt,
      loading: loadingStrategy
    }
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.List, {
    display: 'flex',
    flexWrap: 'wrap'
  }, thumbnailImages.map((image, index) => {
    const selected = index === selectedIndex;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.ListItem, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, styles.thumbnailImageItem, {
      key: index,
      borderColor: `${selected ? 'black' : ''}`,
      borderWidth: `${selected ? '1px' : 0}`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.AspectRatio, {
      ratio: 1
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Box, {
      as: "button",
      "aria-pressed": selected ? 'true' : 'false',
      onKeyDown: e => {
        if (e.keyCode === EnterKeyNumber) {
          return setSelectedIndex(index);
        }
      },
      onClick: () => setSelectedIndex(index),
      "data-testid": "image-gallery-thumbnails"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_2__.Img, {
      alt: image.alt,
      src: image.disBaseLink || image.link,
      loading: loadingStrategy
    }))));
  })));
};
ImageGallery.propTypes = {
  /**
   * The images array to be rendered
   */
  imageGroups: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().array),
  /**
   * The current selected variation values
   */
  selectedVariationAttributes: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  /**
   * Size of the Image gallery, this will be used to determined the max width from styles
   */
  size: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string),
  /**
   * Determines whether the image will be lazy loaded or not
   */
  lazy: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ImageGallery);

/***/ }),

/***/ "./app/components/product-option-wizard/index.jsx":
/*!********************************************************!*\
  !*** ./app/components/product-option-wizard/index.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/progress/dist/chunk-BZDCPGYF.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-2OOHT3W5.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-JARCRF6W.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs");
/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @chakra-ui/react */ "./node_modules/@chakra-ui/layout/dist/chunk-KRPLQIP4.mjs");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");






/**
 * @typedef {object} ProductOptionValue
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {boolean} default
 */

/**
 * @typedef {object} ProductOption
 * @property {string} id
 * @property {string} name
 * @property {Array<ProductOptionValue>} values
 * @property {string} description?
 */

/**
 * shopper-products product object
 *
 * @typedef {object} Product
 * @property {Array<ProductOption>} options
 */

/**
 * @typedef {object} ProductOptionWizardOptionConfig
 * @property {Object<string, string|Array<string>>} dependencies list of option ids to value ids that are dependencies
 */

/**
 * @typedef {Object} ProductOptionWizardConfig
 * @property {boolean} hideZeroPriceOptions - Indicates whether to hide options with zero price
 * @property {Object<string, ProductOptionWizardOptionConfig>} optionConfig
 */

/**
 * @param {object} props
 * @param {Product} props.product
 * @return {Element}
 */
const ProductOptionWizard = ({
  product
}) => {
  const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const history = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useHistory)();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_1__.useLocation)();

  /** @type {ProductOptionWizardConfig} */
  const productOptionWizardConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const optionConfig = JSON.parse(product.c_optionWizardConfig ?? '{}');
    return optionConfig;
  }, [product === null || product === void 0 ? void 0 : product.c_optionWizardConfig]);
  const hideZeroPriceOptions = (productOptionWizardConfig === null || productOptionWizardConfig === void 0 ? void 0 : productOptionWizardConfig.hideZeroPriceOptions) ?? false;

  // Get current selections from URL
  const getSelectionsFromUrl = () => {
    const params = new URLSearchParams(location.search);
    const selections = new Map();
    product.options.forEach(option => {
      const valueId = params.get(`option-${option.id}`);
      if (valueId) {
        const selectedValue = option.values.find(v => v.id === valueId);
        if (selectedValue) {
          selections.set(option.id, {
            id: option.id,
            value: valueId,
            name: option.name,
            displayValue: selectedValue.name,
            price: selectedValue.price
          });
        }
      }
    });
    return selections;
  };

  // Calculate visible pages based on current URL selections
  const getVisibleOptions = () => {
    if (!(product !== null && product !== void 0 && product.options)) return [];

    // filter out options that don't satisfy their dependency config
    return product.options.filter(option => {
      var _productOptionWizardC, _productOptionWizardC2;
      const optionDependencies = productOptionWizardConfig === null || productOptionWizardConfig === void 0 ? void 0 : (_productOptionWizardC = productOptionWizardConfig.optionConfig) === null || _productOptionWizardC === void 0 ? void 0 : (_productOptionWizardC2 = _productOptionWizardC[option.id]) === null || _productOptionWizardC2 === void 0 ? void 0 : _productOptionWizardC2.dependencies;
      if (!optionDependencies || Object.keys(optionDependencies).length === 0) return true;
      const params = new URLSearchParams(location.search);
      return Object.entries(optionDependencies).some(([depOptionId, depValueId]) => {
        const selectedValue = params.get(`option-${depOptionId}`);
        if (typeof depValueId === 'string') {
          return selectedValue === depValueId;
        } else {
          return depValueId.includes(selectedValue);
        }
      });
    });
  };

  // Initialize default selections in URL
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!(product !== null && product !== void 0 && product.options)) return;
    const params = new URLSearchParams(location.search);
    let paramsUpdated = false;
    product.options.forEach(option => {
      const paramKey = `option-${option.id}`;
      if (!params.has(paramKey)) {
        const defaultValue = option.values.find(v => v.default);
        if (defaultValue) {
          params.set(paramKey, defaultValue.id);
          paramsUpdated = true;
        }
      }
    });
    if (paramsUpdated) {
      history.replace(`${location.pathname}?${params.toString()}`);
    }
  }, [product === null || product === void 0 ? void 0 : product.options]);
  const handleOptionSelect = (optionId, valueId) => {
    const params = new URLSearchParams(location.search);
    params.set(`option-${optionId}`, valueId);
    history.replace(`${location.pathname}?${params.toString()}`);
    location.search = params.toString();
    const visiblePages = getVisibleOptions();
    if (currentPage < visiblePages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };
  const visibleOptions = getVisibleOptions();
  const selections = getSelectionsFromUrl();
  const handleReset = () => {
    const params = new URLSearchParams();
    const currentParams = new URLSearchParams(location.search);
    for (const [key, value] of currentParams.entries()) {
      if (!key.startsWith('option-')) {
        params.set(key, value);
      }
    }
    history.replace(`${location.pathname}?${params.toString()}`);
    setCurrentPage(0); // Reset to first page
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    borderWidth: "1px",
    borderRadius: "lg",
    p: 4,
    mb: 4
  }, visibleOptions.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.Progress, {
    value: (currentPage + 1) * (100 / visibleOptions.length),
    size: "sm",
    colorScheme: "blue",
    hasStripe: true,
    isAnimated: true
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    height: "16px"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {
    height: "270px",
    overflowY: "auto",
    maxHeight: "450px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(framer_motion__WEBPACK_IMPORTED_MODULE_4__.motion.div, {
    key: currentPage,
    initial: {
      opacity: 0,
      x: 100
    },
    animate: {
      opacity: 1,
      x: 0
    },
    exit: {
      opacity: 0,
      x: -100
    },
    transition: {
      duration: 0.5
    }
  }, visibleOptions[currentPage] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.Text, {
    fontWeight: "bold",
    mb: 2
  }, visibleOptions[currentPage].name), visibleOptions[currentPage].description && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_5__.Text, {
    mb: 4
  }, visibleOptions[currentPage].description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Grid, {
    templateColumns: `repeat(${Math.min(visibleOptions[currentPage].values.length, 3)}, 1fr)`,
    gap: 4
  }, visibleOptions[currentPage].values.map(value => {
    var _selections$get;
    const isSelected = ((_selections$get = selections.get(visibleOptions[currentPage].id)) === null || _selections$get === void 0 ? void 0 : _selections$get.value) === value.id;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {
      key: value.id,
      onClick: () => handleOptionSelect(visibleOptions[currentPage].id, value.id),
      variant: isSelected ? 'solid' : 'outline',
      w: "full",
      bg: isSelected ? 'blue.200' : 'white'
    }, value.name, hideZeroPriceOptions && value.price === 0 ? '' : ` - $${value.price}`);
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_8__.Flex, {
    justifyContent: "space-between",
    mt: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {
    onClick: () => setCurrentPage(prev => Math.max(0, prev - 1)),
    disabled: currentPage === 0,
    variant: "outline"
  }, "\u2190"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {
    onClick: handleReset,
    variant: "outline",
    colorScheme: "red",
    size: "sm",
    isDisabled: selections.size === 0
  }, "Reset Options"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_7__.Button, {
    onClick: () => setCurrentPage(prev => Math.min(visibleOptions.length - 1, prev + 1)),
    disabled: currentPage === visibleOptions.length - 1,
    variant: "outline"
  }, "\u2192"))));
};
ProductOptionWizard.propTypes = {
  product: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().object).isRequired,
  onSelectionChange: (prop_types__WEBPACK_IMPORTED_MODULE_9___default().func)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductOptionWizard);

/***/ }),

/***/ "./app/components/product-view/index.jsx":
/*!***********************************************!*\
  !*** ./app/components/product-view/index.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks */ "./app/hooks/index.js");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_add_to_cart_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-add-to-cart-modal */ "./app/hooks/use-add-to-cart-modal.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_image_gallery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/image-gallery */ "./app/components/image-gallery/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_breadcrumb__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/breadcrumb */ "./app/components/breadcrumb/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/link */ "./app/components/link/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_with_registration__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/with-registration */ "./app/components/with-registration/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/responsive */ "./app/components/responsive/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_quantity_picker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/quantity-picker */ "./app/components/quantity-picker/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @salesforce/retail-react-app/app/hooks/use-toast */ "./app/hooks/use-toast.js");
/* harmony import */ var _salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @salesforce/retail-react-app/app/constants */ "./overlays/einstein-chatbot/app/constants.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_display_price__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/display-price */ "./app/components/display-price/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_swatch_group_swatch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/swatch-group/swatch */ "./app/components/swatch-group/swatch.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_components_swatch_group__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/swatch-group */ "./app/components/swatch-group/index.jsx");
/* harmony import */ var _salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @salesforce/retail-react-app/app/utils/product-utils */ "./app/utils/product-utils.js");
/* harmony import */ var _salesforce_retail_react_app_app_components_product_tile_promo_callout__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/product-tile/promo-callout */ "./app/components/product-tile/promo-callout.jsx");
/* harmony import */ var _product_option_wizard__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../product-option-wizard */ "./app/components/product-option-wizard/index.jsx");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */









// project components














/** TOOLKIT CUSTOMIZATION **/

/** END TOOLKIT CUSTOMIZATION **/

const ProductViewHeader = ({
  name,
  currency,
  priceData,
  category,
  product,
  isProductPartOfBundle
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    mr: 4,
    spacing: 2,
    align: "flex-start",
    marginBottom: [4, 4, 4, 0, 0]
  }, category && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    isLoaded: category,
    minWidth: 64
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_breadcrumb__WEBPACK_IMPORTED_MODULE_7__["default"], {
    categories: category
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    isLoaded: name
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Heading, {
    fontSize: "2xl"
  }, `${name}`)), !isProductPartOfBundle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    isLoaded: priceData === null || priceData === void 0 ? void 0 : priceData.currentPrice
  }, (priceData === null || priceData === void 0 ? void 0 : priceData.currentPrice) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_display_price__WEBPACK_IMPORTED_MODULE_14__["default"], {
    priceData: priceData,
    currency: currency
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    isLoaded: product
  }, (product === null || product === void 0 ? void 0 : product.productPromotions) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_product_tile_promo_callout__WEBPACK_IMPORTED_MODULE_18__["default"], {
    product: product
  }))));
};
ProductViewHeader.propTypes = {
  name: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().string),
  currency: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().string),
  category: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().array),
  priceData: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().object),
  product: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().object),
  isProductPartOfBundle: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool)
};
const ButtonWithRegistration = (0,_salesforce_retail_react_app_app_components_with_registration__WEBPACK_IMPORTED_MODULE_9__["default"])(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button);

/**
 * Render a product detail view that includes name, image gallery, price,
 * variant selections, action buttons
 */

const ProductView = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(({
  product,
  category,
  showFullLink = false,
  imageSize = 'md',
  isWishlistLoading = false,
  addToCart,
  updateCart,
  addToWishlist,
  updateWishlist,
  isProductLoading,
  isProductPartOfSet = false,
  isProductPartOfBundle = false,
  childOfBundleQuantity = 0,
  childProductOrderability,
  setChildProductOrderability,
  isBasketLoading = false,
  onVariantSelected = () => {},
  validateOrderability = (variant, quantity, stockLevel) => !isProductLoading && (variant === null || variant === void 0 ? void 0 : variant.orderable) && quantity > 0 && quantity <= stockLevel,
  showImageGallery = true,
  setSelectedBundleQuantity = () => {},
  selectedBundleParentQuantity = 1
}, ref) => {
  const {
    currency: activeCurrency
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_4__.useCurrency)();
  const showToast = (0,_salesforce_retail_react_app_app_hooks_use_toast__WEBPACK_IMPORTED_MODULE_12__.useToast)();
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_21__["default"])();
  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_22__.useLocation)();
  const {
    isOpen: isAddToCartModalOpen,
    onOpen: onAddToCartModalOpen,
    onClose: onAddToCartModalClose
  } = (0,_salesforce_retail_react_app_app_hooks_use_add_to_cart_modal__WEBPACK_IMPORTED_MODULE_5__.useAddToCartModalContext)();
  const theme = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useTheme)();
  const [showOptionsMessage, toggleShowOptionsMessage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const {
    showLoading,
    showInventoryMessage,
    inventoryMessage,
    quantity,
    minOrderQuantity,
    setQuantity,
    variant,
    variationParams,
    variationAttributes,
    stockLevel,
    stepQuantity,
    isOutOfStock,
    unfulfillable
  } = (0,_salesforce_retail_react_app_app_hooks__WEBPACK_IMPORTED_MODULE_4__.useDerivedProduct)(product, isProductPartOfSet, isProductPartOfBundle);
  /** TOOLKIT CUSTOMIZATION **/
  // Add state to track total options price
  const priceData = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return (0,_salesforce_retail_react_app_app_utils_product_utils__WEBPACK_IMPORTED_MODULE_17__.getPriceData)(product, {
      quantity,
      // used to parse options
      query: location.search
    });
  }, [product, quantity, location.search]);
  /** END TOOLKIT CUSTOMIZATION **/

  const canAddToWishlist = !isProductLoading;
  const isProductASet = product === null || product === void 0 ? void 0 : product.type.set;
  const isProductABundle = product === null || product === void 0 ? void 0 : product.type.bundle;
  const errorContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  const {
    disableButton,
    customInventoryMessage
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    let shouldDisableButton = showInventoryMessage;
    let currentInventoryMsg = '';
    if (!shouldDisableButton && (isProductASet || isProductABundle) && childProductOrderability) {
      // if any of the children are not orderable, it will disable the add to cart button
      const unavailableChildProductKey = Object.keys(childProductOrderability).find(key => {
        return childProductOrderability[key].showInventoryMessage;
      });
      shouldDisableButton = !!unavailableChildProductKey;
      if (unavailableChildProductKey) {
        const unavailableChildProduct = childProductOrderability[unavailableChildProductKey];
        if (unavailableChildProduct.unfulfillable) {
          currentInventoryMsg = intl.formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Only "
            }, {
              "type": 1,
              "value": "stockLevel"
            }, {
              "type": 0,
              "value": " left for "
            }, {
              "type": 1,
              "value": "productName"
            }, {
              "type": 0,
              "value": "!"
            }],
            id: "use_product.message.inventory_remaining_for_product"
          }, {
            stockLevel: unavailableChildProduct.stockLevel,
            productName: unavailableChildProduct.productName
          });
        }
        if (unavailableChildProduct.isOutOfStock) {
          currentInventoryMsg = intl.formatMessage({
            defaultMessage: [{
              "type": 0,
              "value": "Out of stock for "
            }, {
              "type": 1,
              "value": "productName"
            }],
            id: "use_product.message.out_of_stock_for_product"
          }, {
            productName: unavailableChildProduct.productName
          });
        }
      }
    }
    return {
      disableButton: shouldDisableButton,
      customInventoryMessage: currentInventoryMsg
    };
  }, [showInventoryMessage, childProductOrderability]);
  const validateAndShowError = (opts = {}) => {
    const {
      scrollErrorIntoView = true
    } = opts;
    // Validate that all attributes are selected before proceeding.
    const hasValidSelection = validateOrderability(variant, quantity, stockLevel);
    const showError = !isProductASet && !isProductABundle && !hasValidSelection;
    const scrollToError = showError && scrollErrorIntoView;
    toggleShowOptionsMessage(showError);
    if (scrollToError) {
      errorContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
    return hasValidSelection;
  };
  const renderActionButtons = () => {
    const buttons = [];
    const buttonText = {
      update: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Update"
        }],
        id: "product_view.button.update"
      }),
      addToCart: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Add to Cart"
        }],
        id: "product_view.button.add_to_cart"
      }),
      addSetToCart: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Add Set to Cart"
        }],
        id: "product_view.button.add_set_to_cart"
      }),
      addBundleToCart: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Add Bundle to Cart"
        }],
        id: "product_view.button.add_bundle_to_cart"
      }),
      addToWishlist: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Add to Wishlist"
        }],
        id: "product_view.button.add_to_wishlist"
      }),
      addSetToWishlist: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Add Set to Wishlist"
        }],
        id: "product_view.button.add_set_to_wishlist"
      }),
      addBundleToWishlist: intl.formatMessage({
        defaultMessage: [{
          "type": 0,
          "value": "Add Bundle to Wishlist"
        }],
        id: "product_view.button.add_bundle_to_wishlist"
      })
    };
    const showError = () => {
      showToast({
        title: intl.formatMessage(_salesforce_retail_react_app_app_constants__WEBPACK_IMPORTED_MODULE_13__.API_ERROR_MESSAGE),
        status: 'error'
      });
    };
    const handleCartItem = /*#__PURE__*/function () {
      var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
        const hasValidSelection = validateAndShowError();
        if (!hasValidSelection) {
          return null;
        }
        if (!addToCart && !updateCart) return null;
        if (updateCart) {
          yield updateCart(variant || product, quantity);
          return;
        }
        try {
          const itemsAdded = yield addToCart(variant, quantity);
          // Open modal only when `addToCart` returns some data
          // It's possible that the item has been added to cart, but we don't want to open the modal.
          // See wishlist_primary_action for example.
          if (itemsAdded) {
            onAddToCartModalOpen({
              product,
              itemsAdded,
              selectedQuantity: quantity
            });
          }
        } catch (e) {
          showError();
        }
      });
      return function handleCartItem() {
        return _ref.apply(this, arguments);
      };
    }();
    const handleWishlistItem = /*#__PURE__*/function () {
      var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(function* () {
        if (!updateWishlist && !addToWishlist) return null;
        if (updateWishlist) {
          updateWishlist(product, variant, quantity);
          return;
        }
        addToWishlist(product, variant, quantity);
      });
      return function handleWishlistItem() {
        return _ref2.apply(this, arguments);
      };
    }();

    // child product of bundles do not have add to cart button
    if ((addToCart || updateCart) && !isProductPartOfBundle) {
      buttons.push(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
        key: "cart-button",
        onClick: handleCartItem,
        isDisabled: disableButton,
        isLoading: isBasketLoading,
        width: "100%",
        variant: "solid",
        marginBottom: 4
      }, updateCart ? buttonText.update : isProductASet ? buttonText.addSetToCart : isProductABundle ? buttonText.addBundleToCart : buttonText.addToCart));
    }

    // child product of bundles do not have add to wishlist button
    if ((addToWishlist || updateWishlist) && !isProductPartOfBundle) {
      buttons.push(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ButtonWithRegistration, {
        key: "wishlist-button",
        onClick: handleWishlistItem,
        disabled: isWishlistLoading || !canAddToWishlist,
        isLoading: isWishlistLoading,
        width: "100%",
        variant: "outline",
        marginBottom: 4
      }, updateWishlist ? buttonText.update : isProductASet ? buttonText.addSetToWishlist : isProductABundle ? buttonText.addBundleToWishlist : buttonText.addToWishlist));
    }
    return buttons;
  };

  // Bind the reference with our `scope` that includes the internal validate function for this component.
  // Other values can be added to this scope as required.
  if (typeof ref === 'function') {
    ref = ref.bind({
      validateOrderability: validateAndShowError
    });
  }

  // Set the quantity of bundle child in a product bundle to ensure availability messages appear
  if (isProductPartOfBundle && quantity != selectedBundleParentQuantity * childOfBundleQuantity) {
    setQuantity(selectedBundleParentQuantity * childOfBundleQuantity);
  }
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (isAddToCartModalOpen) {
      onAddToCartModalClose();
    }
  }, [location.pathname]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!isProductASet && !isProductABundle && validateOrderability(variant, quantity, stockLevel)) {
      toggleShowOptionsMessage(false);
    }
  }, [variationParams]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (variant) {
      onVariantSelected(product, variant, quantity);
    }
  }, [variant === null || variant === void 0 ? void 0 : variant.productId, quantity]);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (isProductPartOfBundle || isProductPartOfSet) {
      const key = product.itemId ?? product.id;
      // when showInventoryMessage is true, it means child product is not orderable
      setChildProductOrderability(previousState => _objectSpread(_objectSpread({}, previousState), {}, {
        [key]: {
          showInventoryMessage,
          isOutOfStock,
          unfulfillable,
          stockLevel,
          productName: product === null || product === void 0 ? void 0 : product.name
        }
      }));
    }
  }, [showInventoryMessage, inventoryMessage]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    direction: 'column',
    "data-testid": "product-view",
    ref: ref
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    display: ['block', 'block', 'block', 'none']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ProductViewHeader, {
    name: product === null || product === void 0 ? void 0 : product.name,
    product: product,
    priceData: priceData,
    currency: (product === null || product === void 0 ? void 0 : product.currency) || activeCurrency,
    category: category,
    isProductPartOfBundle: isProductPartOfBundle
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Flex, {
    direction: ['column', 'column', 'column', 'row']
  }, showImageGallery && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    flex: 1,
    mr: [0, 0, 0, 6, 6]
  }, product ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_image_gallery__WEBPACK_IMPORTED_MODULE_6__["default"], {
    size: imageSize,
    imageGroups: product.imageGroups,
    selectedVariationAttributes: variationParams,
    lazy: isProductPartOfSet || isProductPartOfBundle
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_10__.HideOnMobile, null, showFullLink && product && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_8__["default"], {
    to: `/product/${product.master.masterId}`,
    color: "blue.600"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_23__["default"], {
    id: "product_view.link.full_details",
    defaultMessage: [{
      "type": 0,
      "value": "See full details"
    }]
  })))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_image_gallery__WEBPACK_IMPORTED_MODULE_6__.Skeleton, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    align: "stretch",
    spacing: 8,
    flex: 1
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    display: ['none', 'none', 'none', 'block']
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(ProductViewHeader, {
    name: product === null || product === void 0 ? void 0 : product.name,
    product: product,
    priceData: priceData,
    currency: (product === null || product === void 0 ? void 0 : product.currency) || activeCurrency,
    category: category,
    isProductPartOfBundle: isProductPartOfBundle
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    align: "stretch",
    spacing: 4
  }, isProductPartOfBundle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    fontWeight: "medium",
    fontSize: "md",
    "aria-label": "price"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("label", null, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Quantity"
    }],
    id: "product_view.label.quantity"
  }), ": ", childOfBundleQuantity))), showLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement((react__WEBPACK_IMPORTED_MODULE_2___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    height: 6,
    width: 32
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    height: 20,
    width: 64
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    height: 6,
    width: 32
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
    height: 20,
    width: 64
  })) : variationAttributes.map(({
    id,
    name,
    selectedValue,
    values
  }) => {
    const swatches = values.map(({
      href,
      name,
      image,
      value,
      orderable
    }, index) => {
      const content = image ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
        height: "100%",
        width: "100%",
        minWidth: "32px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: name.toLowerCase(),
        backgroundImage: `url(${image.disBaseLink || image.link})`
      }) : name;
      const hasSelection = Boolean(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.value);
      const isSelected = (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.value) === value;
      const isFirst = index === 0;
      // To mimic the behavior of a native radio input, only
      // one swatch should receive tab focus; the rest can be
      // selected using arrow keys when the swatch group has
      // focus. The focused element is the selected option or
      // the first in the group, if no option is selected.
      // This is a slight difference, for simplicity, from the
      // native element, where the first element is focused on
      // `Tab` and the _last_ element is focused on `Shift+Tab`
      const isFocusable = isSelected || !hasSelection && isFirst;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_swatch_group_swatch__WEBPACK_IMPORTED_MODULE_15__["default"], {
        key: value,
        href: href,
        disabled: !orderable,
        value: value,
        name: name,
        variant: id === 'color' ? 'circle' : 'square',
        selected: isSelected,
        isFocusable: isFocusable
      }, content);
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_swatch_group__WEBPACK_IMPORTED_MODULE_16__["default"], {
      key: id,
      value: selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.value,
      displayName: (selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.name) || '',
      label: intl.formatMessage({
        defaultMessage: [{
          "type": 1,
          "value": "variantType"
        }],
        id: "product_view.label.variant_type"
      }, {
        variantType: name
      })
    }, swatches);
  }), !isProductASet && !isProductPartOfBundle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.VStack, {
    align: "stretch",
    maxWidth: '200px'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    fontWeight: "bold"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("label", {
    htmlFor: "quantity"
  }, intl.formatMessage({
    defaultMessage: [{
      "type": 0,
      "value": "Quantity:"
    }],
    id: "product_view.label.quantity"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_quantity_picker__WEBPACK_IMPORTED_MODULE_11__["default"], {
    id: "quantity",
    step: stepQuantity,
    value: quantity,
    min: minOrderQuantity,
    onChange: (stringValue, numberValue) => {
      // Set the Quantity of product to value of input if value number
      if (numberValue >= 0) {
        setQuantity(numberValue);
        if (isProductABundle) setSelectedBundleQuantity(numberValue);
      } else if (stringValue === '') {
        // We want to allow the use to clear the input to start a new input so here we set the quantity to '' so NAN is not displayed
        // User will not be able to add '' qauntity to the cart due to the add to cart button enablement rules
        setQuantity(stringValue);
      }
    },
    onBlur: e => {
      // Default to 1the `minOrderQuantity` if a user leaves the box with an invalid value
      const value = e.target.value;
      if (parseInt(value) < 0 || value === '') {
        setQuantity(minOrderQuantity);
        if (isProductABundle) setSelectedBundleQuantity(minOrderQuantity);
      }
    },
    onFocus: e => {
      // This is useful for mobile devices, this allows the user to pop open the keyboard and set the
      // new quantity with one click. NOTE: This is something that can be refactored into the parent
      // component, potentially as a prop called `selectInputOnFocus`.
      e.target.select();
    },
    productName: product === null || product === void 0 ? void 0 : product.name
  })), !showLoading && product.options && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_product_option_wizard__WEBPACK_IMPORTED_MODULE_19__["default"], {
    product: product
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    ref: errorContainerRef
  }, !showLoading && showOptionsMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Fade, {
    in: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    color: "orange.600",
    fontWeight: 600,
    marginBottom: 8
  }, intl.formatMessage({
    id: "lCPCxk",
    defaultMessage: [{
      "type": 0,
      "value": "Please select all your options above"
    }]
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_responsive__WEBPACK_IMPORTED_MODULE_10__.HideOnDesktop, null, showFullLink && product && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_link__WEBPACK_IMPORTED_MODULE_8__["default"], {
    to: `/product/${product.master.masterId}`,
    color: "blue.600"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_23__["default"], {
    id: "product_view.link.full_details",
    defaultMessage: [{
      "type": 0,
      "value": "See full details"
    }]
  }))), isProductASet && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement("p", null, product === null || product === void 0 ? void 0 : product.shortDescription)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, null, !showLoading && showInventoryMessage && !customInventoryMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Fade, {
    in: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    color: "orange.600",
    fontWeight: 600,
    marginBottom: 8
  }, inventoryMessage)), !showLoading && customInventoryMessage && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Fade, {
    in: true
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Text, {
    color: "orange.600",
    fontWeight: 600,
    marginBottom: 8
  }, customInventoryMessage)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    display: isProductPartOfSet ? 'block' : ['none', 'none', 'none', 'block']
  }, renderActionButtons())))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Box, {
    position: "fixed",
    bg: "white",
    width: "100%",
    display: isProductPartOfSet || isProductPartOfBundle ? 'none' : ['block', 'block', 'block', 'none'],
    p: [4, 4, 6],
    left: 0,
    bottom: 0,
    zIndex: 2,
    boxShadow: theme.shadows.top
  }, renderActionButtons()));
});
ProductView.displayName = 'ProductView';
ProductView.propTypes = {
  product: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().object),
  isProductPartOfSet: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  isProductPartOfBundle: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  childOfBundleQuantity: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().number),
  category: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().array),
  isProductLoading: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  isBasketLoading: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  isWishlistLoading: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  addToCart: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  addToWishlist: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  updateCart: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  updateWishlist: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  showFullLink: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  imageSize: prop_types__WEBPACK_IMPORTED_MODULE_20___default().oneOf(['sm', 'md']),
  childProductOrderability: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().object),
  setChildProductOrderability: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  onVariantSelected: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  validateOrderability: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  showImageGallery: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().bool),
  setSelectedBundleQuantity: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().func),
  selectedBundleParentQuantity: (prop_types__WEBPACK_IMPORTED_MODULE_20___default().number)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductView);

/***/ }),

/***/ "./app/components/quantity-picker/index.jsx":
/*!**************************************************!*\
  !*** ./app/components/quantity-picker/index.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @salesforce/retail-react-app/app/components/shared/ui */ "./overlays/passwordless-login/app/components/shared/ui/index.jsx");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/useIntl.js");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-intl */ "./node_modules/react-intl/lib/src/components/message.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */






/**
 * This is the mobile implementation of the Chakra NumberInput. This simple component essentially
 * is a helper so we don't have to reuse the hooks every time we need a number input since design dictates
 * we use the moobile variation on all screens.
 *
 * NOTE: We can optionally put global logic we see if in here, and various styling decisions in this single
 * component.
 *
 * @param {*} props
 * @returns
 */
const QuantityPicker = props => {
  const intl = (0,react_intl__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const productName = props.productName;
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  } = (0,_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.useNumberInput)(_objectSpread(_objectSpread({}, props), {}, {
    // Defaults
    focusInputOnChange: false,
    onFocus: e => {
      // eslint-disable-next-line react/prop-types
      const {
        onFocus
      } = props;

      // This is useful for mobile devices, this allows the user to pop open the keyboard and set the
      // new quantity with one click.
      e.target.select();

      // If there is a `onFocus` property define, call it with the event captured.
      // eslint-disable-next-line react/prop-types
      onFocus === null || onFocus === void 0 ? void 0 : onFocus.call(undefined, e);
    }
  }));
  const inc = getIncrementButtonProps({
    variant: 'outline',
    'aria-label': intl.formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Increment Quantity for "
      }, {
        "type": 1,
        "value": "productName"
      }],
      id: "product_view.label.assistive_msg.quantity_increment"
    }, {
      productName
    })
  });
  const dec = getDecrementButtonProps({
    variant: 'outline',
    'aria-label': intl.formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Decrement Quantity for "
      }, {
        "type": 1,
        "value": "productName"
      }],
      id: "product_view.label.assistive_msg.quantity_decrement"
    }, {
      productName
    })
  });
  const input = getInputProps({
    maxWidth: '44px',
    textAlign: 'center',
    'aria-label': intl.formatMessage({
      defaultMessage: [{
        "type": 0,
        "value": "Quantity"
      }],
      id: "product_view.label.quantity"
    })
  });

  // Accessibility improvements:
  // 1. Allow keyboard focus on the buttons - Chakra overrides values passed to get*ButtonProps()
  inc.tabIndex = '';
  dec.tabIndex = '';
  // 2. Allow Space or Enter key to trigger buttons
  // Hitting space/enter triggers a "click" event, but the component listens for "mousedown".
  // We can't reuse the buttons' onMouseDown handler, so instead we hijack the input's onKeyDown.
  // @ref https://github.com/chakra-ui/chakra-ui/blob/%40chakra-ui/react%402.7.0/packages/components/number-input/src/use-number-input.ts#L333-L334
  inc.onKeyDown = evt => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.key = 'ArrowUp';
      input.onKeyDown(evt);
    }
  };
  dec.onKeyDown = evt => {
    if (evt.key === ' ' || evt.key === 'Enter') {
      evt.key = 'ArrowDown';
      input.onKeyDown(evt);
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.HStack, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "data-testid": "quantity-decrement"
  }, dec), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: "product_view.label.quantity_decrement",
    defaultMessage: [{
      "type": 0,
      "value": "−"
    }] // HTML &minus;
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Input, input), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(_salesforce_retail_react_app_app_components_shared_ui__WEBPACK_IMPORTED_MODULE_3__.Button, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    "data-testid": "quantity-increment"
  }, inc), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default().createElement(react_intl__WEBPACK_IMPORTED_MODULE_5__["default"], {
    id: "product_view.label.quantity_increment",
    defaultMessage: [{
      "type": 0,
      "value": "+"
    }]
  })));
};
QuantityPicker.propTypes = {
  productName: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().string)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuantityPicker);

/***/ }),

/***/ "./node_modules/@chakra-ui/progress/dist/chunk-BZDCPGYF.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/progress/dist/chunk-BZDCPGYF.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Progress: () => (/* binding */ Progress),
/* harmony export */   useProgressStyles: () => (/* binding */ useProgressStyles)
/* harmony export */ });
/* harmony import */ var _chunk_TXZFUZNG_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunk-TXZFUZNG.mjs */ "./node_modules/@chakra-ui/progress/dist/chunk-TXZFUZNG.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/system/dist/chunk-ZJJGQIVY.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/system/dist/chunk-ZHQNHOQS.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/styled-system/dist/index.mjs");
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@chakra-ui/system/dist/chunk-DMO4EI7P.mjs");
/* harmony import */ var _chakra_ui_react_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react-context */ "./node_modules/@chakra-ui/react-context/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
'use client'
;

// src/progress.tsx



var [ProgressStylesProvider, useProgressStyles] = (0,_chakra_ui_react_context__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  name: `ProgressStylesContext`,
  errorMessage: `useProgressStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Progress />" `
});
var ProgressFilledTrack = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(
  (props, ref) => {
    const { min, max, value, isIndeterminate, role, ...rest } = props;
    const progress2 = (0,_chunk_TXZFUZNG_mjs__WEBPACK_IMPORTED_MODULE_3__.getProgressProps)({
      value,
      min,
      max,
      isIndeterminate,
      role
    });
    const styles = useProgressStyles();
    const trackStyles = {
      height: "100%",
      ...styles.filledTrack
    };
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      _chakra_ui_system__WEBPACK_IMPORTED_MODULE_4__.chakra.div,
      {
        ref,
        style: { width: `${progress2.percent}%`, ...rest.style },
        ...progress2.bind,
        ...rest,
        __css: trackStyles
      }
    );
  }
);
var Progress = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_2__.forwardRef)((props, ref) => {
  var _a;
  const {
    value,
    min = 0,
    max = 100,
    hasStripe,
    isAnimated,
    children,
    borderRadius: propBorderRadius,
    isIndeterminate,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-valuetext": ariaValueText,
    title,
    role,
    ...rest
  } = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_5__.omitThemingProps)(props);
  const styles = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_6__.useMultiStyleConfig)("Progress", props);
  const borderRadius = propBorderRadius != null ? propBorderRadius : (_a = styles.track) == null ? void 0 : _a.borderRadius;
  const stripeAnimation = { animation: `${_chunk_TXZFUZNG_mjs__WEBPACK_IMPORTED_MODULE_3__.stripe} 1s linear infinite` };
  const shouldAddStripe = !isIndeterminate && hasStripe;
  const shouldAnimateStripe = shouldAddStripe && isAnimated;
  const css = {
    ...shouldAnimateStripe && stripeAnimation,
    ...isIndeterminate && {
      position: "absolute",
      willChange: "left",
      minWidth: "50%",
      animation: `${_chunk_TXZFUZNG_mjs__WEBPACK_IMPORTED_MODULE_3__.progress} 1s ease infinite normal none running`
    }
  };
  const trackStyles = {
    overflow: "hidden",
    position: "relative",
    ...styles.track
  };
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _chakra_ui_system__WEBPACK_IMPORTED_MODULE_4__.chakra.div,
    {
      ref,
      borderRadius,
      __css: trackStyles,
      ...rest,
      children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ProgressStylesProvider, { value: styles, children: [
        /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          ProgressFilledTrack,
          {
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledBy,
            "aria-valuetext": ariaValueText,
            min,
            max,
            value,
            isIndeterminate,
            css,
            borderRadius,
            title,
            role
          }
        ),
        children
      ] })
    }
  );
});
Progress.displayName = "Progress";


//# sourceMappingURL=chunk-BZDCPGYF.mjs.map

/***/ }),

/***/ "./node_modules/@chakra-ui/progress/dist/chunk-TXZFUZNG.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/@chakra-ui/progress/dist/chunk-TXZFUZNG.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProgressProps: () => (/* binding */ getProgressProps),
/* harmony export */   progress: () => (/* binding */ progress),
/* harmony export */   rotate: () => (/* binding */ rotate),
/* harmony export */   spin: () => (/* binding */ spin),
/* harmony export */   stripe: () => (/* binding */ stripe)
/* harmony export */ });
/* harmony import */ var _chakra_ui_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @chakra-ui/system */ "./node_modules/@emotion/react/dist/emotion-react.browser.esm.js");
'use client'

// src/progress.utils.tsx
;
function valueToPercent(value, min, max) {
  return (value - min) * 100 / (max - min);
}
var spin = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
  "0%": {
    strokeDasharray: "1, 400",
    strokeDashoffset: "0"
  },
  "50%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-100"
  },
  "100%": {
    strokeDasharray: "400, 400",
    strokeDashoffset: "-260"
  }
});
var rotate = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
  "0%": {
    transform: "rotate(0deg)"
  },
  "100%": {
    transform: "rotate(360deg)"
  }
});
var progress = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
  "0%": { left: "-40%" },
  "100%": { left: "100%" }
});
var stripe = (0,_chakra_ui_system__WEBPACK_IMPORTED_MODULE_0__.keyframes)({
  from: { backgroundPosition: "1rem 0" },
  to: { backgroundPosition: "0 0" }
});
function getProgressProps(options) {
  const {
    value = 0,
    min,
    max,
    valueText,
    getValueText,
    isIndeterminate,
    role = "progressbar"
  } = options;
  const percent = valueToPercent(value, min, max);
  const getAriaValueText = () => {
    if (value == null)
      return void 0;
    return typeof getValueText === "function" ? getValueText(value, percent) : valueText;
  };
  return {
    bind: {
      "data-indeterminate": isIndeterminate ? "" : void 0,
      "aria-valuemax": max,
      "aria-valuemin": min,
      "aria-valuenow": isIndeterminate ? void 0 : value,
      "aria-valuetext": getAriaValueText(),
      role
    },
    percent,
    value
  };
}


//# sourceMappingURL=chunk-TXZFUZNG.mjs.map

/***/ })

}]);
//# sourceMappingURL=app_components_product-view_index_jsx.js.map