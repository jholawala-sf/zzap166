'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PromotionMgr = require('dw/campaign/PromotionMgr');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

module.exports.render = function (context, modelIn) {
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');

    var model = modelIn || new HashMap();
    const { component, content } = context;

    var promotion = PromotionMgr.getPromotion(content.bumpOfferPromotionID);
    if (empty(promotion)) {
        throw new Error("promotion not found");
    }

    let apiProductSearch = new ProductSearchModel();
    apiProductSearch.setPromotionID(promotion.ID);
    apiProductSearch.search();

    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    model.promotion = promotion;
    model.apiProductSearch = apiProductSearch;
    model.isEditMode = PageRenderHelper.isInEditMode();
    if (model.isEditMode) {
        session.custom.bumpOffer = true;
    }
    model.isPD = true;
    return new Template('experience/components/assets/bumpOfferPromotion').render(model).text;
};
