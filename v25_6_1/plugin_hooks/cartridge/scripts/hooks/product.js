/**
 * Hook to add additional data to product request
 * @param {dw.catalog.Product} scriptProduct an instance of dw.catalog.Product
 * @param {Object} doc the response document
 */
exports.modifyGETResponse = function (scriptProduct, doc) {
    const priceFactory = require('*/cartridge/scripts/factories/price');
    const productHelper = require('*/cartridge/scripts/helpers/productHelpers');

    const params = { pid: scriptProduct.ID };


    const options = productHelper.getConfig(scriptProduct, params);

    const prices = priceFactory.getPrice(
        scriptProduct,
        null,
        false,
        options.promotions,
        options.optionModel
    );
    doc.c_prices = prices;
};
