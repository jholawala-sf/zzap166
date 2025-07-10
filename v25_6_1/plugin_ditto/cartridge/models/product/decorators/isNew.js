const Site = require('dw/system/Site');
const DAY_IN_MILLISECONDS = 86400000;

module.exports = function (product, apiProduct) {
    const timePreference = Site.current.getCustomPreferenceValue('DittoNewProductTimeframe') || 14;


    if (apiProduct.onlineFrom) {
        const futureDate = apiProduct.onlineFrom.valueOf() + timePreference * DAY_IN_MILLISECONDS;
        const currentDate = new Date().valueOf();
        Object.defineProperty(product, 'isNew', {
            enumerable: true,
            value: futureDate > currentDate
        });
    }
};
