const CacheMgr = require('dw/system/CacheMgr');
const geoIpCache = CacheMgr.getCache('GeoIP');

/**
 * Returns geo data for an incoming IP adddress. This function pretends to be a customer-cdn,
 * so we can call a controller and this controller will resolve the geo ip data
 *
 * @param {string} ipAddress the ip address
 * @return {Object} the geo ip information object
 */
exports.api = function (ipAddress) {
    var usersIpAddress = request.httpRemoteAddress;

    if (ipAddress) {
        usersIpAddress = ipAddress;
    }

    const geoData = geoIpCache.get(usersIpAddress, () => {
        const controllerService = require('*/cartridge/scripts/services/controller.js');
        const controllerResponse = controllerService.getService().call({
            controller: 'SystemAction-GeoIP',
            headers: {
                // That is the main hack. Make sure this setting below finds its way to your BM
                // commerce-cloud-data/test-site/sites/ocapi-test/customer-cdn-settings.xml
                'ocapi-x-forwarded-for': usersIpAddress
            }
        });
        if (controllerResponse.ok && controllerResponse.object) {
            return controllerResponse.object.geoData;
        }
        return null;
    });
    return geoData;
};

exports.get = function (httpParams) {
    var ip = null;
    if (httpParams.containsKey('c_ip')) {
        ip = httpParams.c_ip.pop();
    }
    return exports.api(ip);
};
