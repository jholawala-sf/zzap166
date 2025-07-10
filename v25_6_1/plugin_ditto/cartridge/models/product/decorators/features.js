module.exports = function (product, apiProduct) {
    const features = [];

    if (apiProduct.custom.apparelFeatures) {
        for (var i = 0, apparelTotal = apiProduct.custom.apparelFeatures.length; i < apparelTotal; i += 1) {
            features.push({
                value: apiProduct.custom.apparelFeatures[i],
                slug: apiProduct.custom.apparelFeatures[i].value.replace(/[\s/]/g, '-').toLowerCase()
            });
        }
    }

    if (apiProduct.custom.gearFeatures) {
        for (var j = 0, gearTotal = apiProduct.custom.gearFeatures.length; j < gearTotal; j += 1) {
            features.push({
                value: apiProduct.custom.gearFeatures[j],
                slug: apiProduct.custom.gearFeatures[j].value.replace(/[\s/]/g, '-').toLowerCase()
            });
        }
    }

    Object.defineProperty(product, 'features', {
        enumerable: true,
        writable: true,
        value: features
    });
};
