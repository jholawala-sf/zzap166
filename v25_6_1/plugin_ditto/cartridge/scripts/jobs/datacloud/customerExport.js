var CustomerMgr = require('dw/customer/CustomerMgr');
var Logger = require('dw/system/Logger');
var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');

var log = Logger.getLogger('dc-customer-export', 'customers');

var profiles;
var fileWriter;
var csvWriter;

var COLUMNS = [
    'SiteId',
    'CustomerId',
    'CustomerNo',
    'CreationDate',
    'Email',
    'FirstName',
    'LastName',
];

var creationDate = new Date(1970, 0, 1);
var lastProfile;

exports.beforeStep = function () {
    var fileName = `customers-${dw.system.Site.current.ID}.csv`;
    var directory = new File(File.IMPEX + File.SEPARATOR + 'customers');
    directory.mkdirs();
    var file = new File(directory, fileName);
    fileWriter = new FileWriter(file);
    csvWriter = new CSVStreamWriter(fileWriter);
    profiles = CustomerMgr.searchProfiles('creationDate > {0}', 'creationDate asc', creationDate);

    csvWriter.writeNext(COLUMNS);

    if (profiles.count > 0) {
        log.debug('Processing {0} profiles', profiles.count);
    }
};

exports.getTotalCount = function () {
    return profiles.count;
};

exports.beforeChunk = function () {
    if (lastProfile) {
        creationDate = lastProfile.creationDate;
        profiles = CustomerMgr.searchProfiles('creationDate > {0}', 'creationDate asc', creationDate);
    }
};

exports.read = function () {
    if (profiles.hasNext()) {
        lastProfile = profiles.next();
        return lastProfile;
    }
};

/**
 *
 * @param {dw.customer.Profile} profile
 * @return {string}
 */
exports.process = function (profile) {
    const siteId = `Sites-${dw.system.Site.current.ID}-Site`
    return [
        siteId,
        profile.customer.ID,
        profile.customerNo,
        profile.creationDate.toISOString(),
        profile.email,
        profile.firstName,
        profile.lastName,
    ]
};

exports.write = function (chunk) {
    for (var i = 0; i < chunk.length; i++) {
        csvWriter.writeNext(chunk[i].toArray());
    }
};

exports.afterChunk = function () {
    fileWriter.flush();
};

exports.afterStep = function () {
    fileWriter.close();
    profiles.close();
};
