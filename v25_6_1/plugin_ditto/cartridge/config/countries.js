const baseCountries = require('*/cartridge/config/countries.json');

try {
    const _localeMapping = JSON.parse(dw.system.Site.current.getCustomPreferenceValue('dittoLocaleCurrencyMapping'));
    if (Array.isArray(_localeMapping)) {
        _localeMapping.forEach(function(l) {
            var idx = baseCountries.findIndex(function(l1) { return l1.id === l.id })
            if (idx > -1) {
                baseCountries.splice(idx, 1, l)
            } else {
                baseCountries.push(l)

            }
        })
    }
} catch (e) {
    dw.system.Logger.error('Can\'t parse locale mapping: ' + e.message);
}
module.exports = baseCountries;
