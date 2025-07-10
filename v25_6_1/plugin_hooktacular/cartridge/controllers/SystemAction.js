/**
 *  Serialized the current system action url into a JSON response
 */
function serialize() {
    var data = {
        url: request.httpParameterMap.url.stringValue
    };
    response.setContentType('application/json');
    response.writer.print(JSON.stringify(data, null, 2));
}

serialize.public = true;

/**
 *  Gets the geo IP data
 */
function geoIp() {
    const Logger = require('dw/system/Logger');
    try {
        if (request.geolocation) {
            const geoData = {
                country: request.geolocation.countryName,
                postalCode: request.geolocation.postalCode,
                region: request.geolocation.regionName,
                city: request.geolocation.city
            };

            response.setContentType('application/json');
            response.writer.print(JSON.stringify({
                geoData: geoData,
                message: 'For licencing reasons, this endpoint must be called from a middleware and not exposed to the user land directly'
            }, null, 2));
        }
    } catch (error) {
        Logger.error('Could not get geolocation data from request IP: ' + error.message);
    }
}
geoIp.public = true;

exports.Serialize = serialize;
exports.GeoIP = geoIp;
