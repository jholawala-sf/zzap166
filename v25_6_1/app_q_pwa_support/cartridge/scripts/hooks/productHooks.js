const createExtendedProduct =
    require('*/cartridge/scripts/apis/productExtend.js').createExtendedProduct
const getProductBadge = require('*/cartridge/scripts/product/badge').getProductBadge
const ProductInfoService = require('*/cartridge/scripts/services/productInfo')

function getSpecifications(product) {
    const productAttributeModel = product.attributeModel
    const productAttributeGroups = productAttributeModel.attributeGroups
    const specificationsGroup = productAttributeGroups.toArray().find(function (group) {
        return group.ID === 'specifications'
    })

    if (!specificationsGroup) {
        return []
    }

    const specificationsAttrs =
        productAttributeModel.getVisibleAttributeDefinitions(specificationsGroup)

    const specifications = specificationsAttrs.toArray().map(function (attr) {
        return {
            id: attr.ID,
            label: attr.displayName,
            value: productAttributeModel.getDisplayValue(attr)
        }
    })

    if (dw.system.Site.current.getCustomPreferenceValue("composableUseMockProductService")) {
        // call mock product info service to get current information
        const productInfoService = ProductInfoService.getProductInfoService()
        const productInfo = productInfoService.call()
        if (productInfo.ok) {
            specifications.forEach(function (spec) {
                const productInfoAttr = productInfo.object.attrs[spec.id]
                if (productInfoAttr) {
                    spec.value = productInfo.object.attrs[spec.id]
                }
            })
        } else {
            // ignore and use fallback value from catalog
        }
    }

    return {
        title: specificationsGroup.displayName,
        attributes: specifications
    }
}

/**
 *
 * @param {dw.catalog.Product} product
 * @param {object} productDoc
 */
exports.modifyGETResponse = function extendProduct(product, productDoc) {
    var productCurrency = productDoc.currency
    if (productCurrency && session.currency.currencyCode !== productCurrency) {
        session.setCurrency(dw.util.Currency.getCurrency(productCurrency))
    }

    productDoc.c_extend = createExtendedProduct(
        product.master ? product.variationModel.defaultVariant.ID : product.ID
    )

    productDoc.c_badge = getProductBadge(product)

    const specifications = getSpecifications(product)
    productDoc.c_specificationAttributes = specifications
}
