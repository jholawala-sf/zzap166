'use strict';

const server = require('server');
const URLUtils = require('dw/web/URLUtils');
const PageMgr = require('dw/experience/PageMgr');
const ProductMgr = require('dw/catalog/ProductMgr');
const HashMap = require('dw/util/HashMap');
const cache = require('*/cartridge/scripts/middleware/cache');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
const pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
const overlayHelper = require('*/cartridge/scripts/overlayHelper');
const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

var configurationHelper = require('*/cartridge/scripts/configurationHelper');

const page = module.superModule;
server.extend(page);

/**
 * @typedef ProductDetailPageResourceMap
 * @type Object
 * @property {String} global_availability - Localized string for "Availability"
 * @property {String} label_instock - Localized string for "In Stock"
 * @property {String} global_availability - Localized string for "This item is currently not
 *     available"
 * @property {String} info_selectforstock - Localized string for "Select Styles for Availability"
 */

server.replace('Show',
    userLoggedIn.validateGatedCommerce,
    cache.applyPromotionSensitiveCache,
    consentTracking.consent,
    function (req, res, next) {
        const ABTestMgr = require('dw/campaign/ABTestMgr');
        const productHelper = require('*/cartridge/scripts/helpers/productHelpers');
        const CONSTANTS = require('*/cartridge/scripts/config/dittoConstants');
        const showProductPageHelperResult = productHelper.showProductPage(req.querystring, req.pageMetaData);
        const productType = showProductPageHelperResult.product.productType;

        overlayHelper.appendPluginPreferences(res);

        const product = ProductMgr.getProduct(showProductPageHelperResult.product.id);
        let category = product.variant
            ? product.masterProduct.primaryCategory
            : product.primaryCategory;
        if (!category) {
            category = product.variant
                ? product.masterProduct.classificationCategory
                : product.classificationCategory;
        }

        var SalesforcePaymentRequest = require('dw/extensions/payments/SalesforcePaymentRequest');
        var paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');

        if (showProductPageHelperResult.product && showProductPageHelperResult.product.productType !== 'set') {
            var buyNowData = paymentHelpers.getBuyNowData(showProductPageHelperResult.product);

            var buyNowPaymentRequest = new SalesforcePaymentRequest('buynow', '.salesforce-buynow-element');
            buyNowPaymentRequest.setBasketData(buyNowData.basketData);
            buyNowPaymentRequest.setOptions(buyNowData.options);
            buyNowPaymentRequest.setPayPalShippingPreference(SalesforcePaymentRequest.PAYPAL_SHIPPING_PREFERENCE_GET_FROM_FILE);
            buyNowPaymentRequest.setPayPalUserAction(SalesforcePaymentRequest.PAYPAL_USER_ACTION_CONTINUE);
            buyNowPaymentRequest.setPayPalButtonsOptions({
                style: {
                    height: 40
                }
            });

            var messagesPaymentRequest = new SalesforcePaymentRequest('buynowMessages', '.salesforce-buynow-messages-element');
            messagesPaymentRequest.setOptions(buyNowData.options);

            showProductPageHelperResult.product.paymentRequest = buyNowPaymentRequest;
            showProductPageHelperResult.product.paymentMessagesRequest = messagesPaymentRequest;
        }

        configurationHelper.appendConfiguration(res);

        var isBulkOrderMaster = product.custom.isBulkOrderMaster;
        var viewPage = "";
        if (isBulkOrderMaster) {
            viewPage = "product/productDetailsB2B";
        } else {
            viewPage = showProductPageHelperResult.template;
        }

        var lookupProduct = product.variant || product.variationGroup ? product.masterProduct : product;
        var pdPage = PageMgr.getPageByProduct(lookupProduct, true, 'pdp');

        // if no page could be determined on product level try to find it on category level
        if (!pdPage && category) {
            pdPage = PageMgr.getPageByCategory(category, true, 'pdp');
        }

        if (!showProductPageHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
            res.setStatusCode(404);
            res.render('error/notFound');
        } else if (!showProductPageHelperResult.product.template && pdPage && pdPage.isVisible()) {
            const aspectAttributes = new HashMap();
            aspectAttributes.category = category;
            aspectAttributes.product = product;
            res.print(PageMgr.renderPage(pdPage.ID, aspectAttributes, ''));
        } else {
            res.render(viewPage, {
                product: showProductPageHelperResult.product,
                addToCartUrl: showProductPageHelperResult.addToCartUrl,
                resources: showProductPageHelperResult.resources,
                breadcrumbs: showProductPageHelperResult.breadcrumbs,
                canonicalUrl: showProductPageHelperResult.canonicalUrl,
                schemaData: showProductPageHelperResult.schemaData,
                pickUpInStore: {
                    actionUrl: URLUtils.url('Stores-InventorySearch', 'showMap', false, 'horizontalView', true, 'isForm', true).toString(),
                    atsActionUrl: URLUtils.url('Stores-getAtsValue').toString()
                },
                isMatrixOrder: isBulkOrderMaster,
                isPdpTestSegment: ABTestMgr.isParticipant(CONSTANTS.AB_TESTS.PDP_ATC.TEST_ID, CONSTANTS.AB_TESTS.PDP_ATC.SEGMENTS.TEST_SEGMENT)
            });
        }

        next();
    }, pageMetaData.computedPageMetaData);

server.replace('Variation', function (req, res, next) {
    const productHelper = require('*/cartridge/scripts/helpers/productHelpers');
    const priceHelper = require('*/cartridge/scripts/helpers/pricing');
    const ProductFactory = require('*/cartridge/scripts/factories/product');
    const renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');

    const params = req.querystring;
    const product = ProductFactory.get(params);
    const layoutTemplate = params.pdpLayout ? parseInt(params.pdpLayout, 10) : 1;

    const context = {
        price: product.price
    };

    var SalesforcePaymentRequest = require('dw/extensions/payments/SalesforcePaymentRequest');
    var paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');

    try {
        var buynow = paymentHelpers.getBuyNowData(product);
        buynow.options = SalesforcePaymentRequest.format(buynow.options);
        product.buynow = buynow;
    } catch(e) {
        /* payments not enabled */
    }
    configurationHelper.appendConfiguration(res);
    product.price.html = priceHelper.renderHtml(priceHelper.getHtmlContext(context));

    const attributeContext = { product: { attributes: product.attributes } };
    const attributeTemplate = 'product/components/attributesPre';
    product.attributesHtml = renderTemplateHelper.getRenderedHtml(attributeContext, attributeTemplate);
    product.carouselHtml = renderTemplateHelper.getRenderedHtml({ product, layoutTemplate }, 'product/components/imageCarousel');

    const promotionsContext = { product: { promotions: product.promotions } };
    const promotionsTemplate = 'product/components/promotions';

    product.promotionsHtml = renderTemplateHelper.getRenderedHtml(
        promotionsContext,
        promotionsTemplate
    );

    var optionsContext = { product: { options: product.options } };
    var optionsTemplate = 'product/components/options';

    product.optionsHtml = renderTemplateHelper.getRenderedHtml(
        optionsContext,
        optionsTemplate
    );

    res.json({
        product: product,
        resources: productHelper.getResources()
    });

    next();
});

server.append('ShowQuickView', function (req, res, next) {
    overlayHelper.appendPluginPreferences(res);
    next();
});

module.exports = server.exports();
