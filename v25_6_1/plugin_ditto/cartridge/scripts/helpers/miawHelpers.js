'use strict';

const Resource = require('dw/web/Resource');
const Site = require('dw/system/Site');
const System = require('dw/system/System');
const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');

/**
 * get visible prechat fields for MIAW
 * @param {dw.customer.Customer} currentCustomer - current customer
 * @returns {Object} - prechat fields object
 */
const getVisiblePrechatFields = (currentCustomer) => {
    const fields = {
        _subject: {
            value: Resource.msgf('chat.subject', 'common', null, Resource.msg('global.site.name', 'version', null)),
            isEditableByEndUser: true
        }
    };

    if (currentCustomer && currentCustomer.profile) {
        if (currentCustomer.profile.firstName) {
            fields._firstName = {
                value: currentCustomer.profile.firstName,
                isEditableByEndUser: false
            };
        }
        if (currentCustomer.profile.lastName) {
            fields._lastName = {
                value: currentCustomer.profile.lastName,
                isEditableByEndUser: false
            };
        }
        if (currentCustomer.profile.email) {
            fields._email = {
                value: currentCustomer.profile.email,
                isEditableByEndUser: false
            };
        }
    }

    return fields;
};

/**
 * get hidden prechat fields for MIAW
 @returns {Object} - hidden prechat fields object
 */
const getHiddenPrechatFields = () => {
    var fields = siteHelpers.getSitePreference('miawHiddenPrechatFields');
    if (fields) {
        try {
            fields = JSON.parse(fields);
        } catch(ex) {
            fields = null;
        }
    }
    if (!fields) {
        fields = {};
    }
    fields.siteId = Site.getCurrent().ID;
    fields.scapiOrgId = System.getPreferences().getCustom().scapiShortCode;
    fields.scapiShortCode = System.getPreferences().getCustom().scapiShortCode;

    return fields;
};

module.exports = {
    getVisiblePrechatFields,
    getHiddenPrechatFields
};
