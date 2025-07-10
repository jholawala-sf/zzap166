var OrderMgr = require('dw/order/OrderMgr');
var HashMap = require('dw/util/HashMap');
var Template = require('dw/util/Template');
var Mail = require('dw/net/Mail');
var Site = require('dw/system/Site');
var Resource = require('dw/web/Resource');

var mails = {};

Object.defineProperty(mails, 'ACCOUNT_UPDATED', {
    get: () => ({
        template: 'mails/accountupdated.isml',
        subject: Resource.msg('accountupdated.subject', 'mails', null),
        validate: () => customer.registered,
        to: customer.profile.email,
        args: {
            CurrentCustomer: customer
        }
    }),
    enumerable: true,
    configurable: true
});

Object.defineProperty(mails, 'ACCOUNT_REGISTERED', {
    get: () => ({
        template: 'mails/accountwelcome.isml',
        subject: Resource.msg('accountregistered.subject', 'mails', null),
        validate: () => customer.registered,
        to: customer.profile.email,
        args: {
            CurrentCustomer: customer
        }
    }),
    enumerable: true,
    configurable: true
});

// @todo discuss with PWA team if we can include the order token
Object.defineProperty(mails, 'ORDER_CONFIRM', {
    get: () => ({
        template: 'mails/orderconfirmation.isml',
        subject: Resource.msg('orderconfirm.subject', 'mails', null),
        validate: () => !!request.httpParameters.c_orderno,
        to: OrderMgr.getOrder(request.httpParameters.c_orderno.pop()).customerEmail,
        args: {
            Order: OrderMgr.getOrder(request.httpParameters.c_orderno.pop())
        }
    }),
    enumerable: true,
    configurable: true
});

Object.defineProperty(mails, 'GENERIC', {
    get: () => ({
        template: 'mails/generic.isml',
        subject: request.httpParameters.subject ? request.httpParameters.subject.pop() : '',
        validate: () => customer.registered,
        to: customer.profile.email,
        args: {
            CurrentCustomer: customer,
            BannerUrl: request.httpParameters.bannerurl ? request.httpParameters.bannerurl.pop() : '',
            Headline: request.httpParameters.headline ? request.httpParameters.headline.pop() : '',
            MainContent: request.httpParameters.maintext ? request.httpParameters.maintext.pop() : '',
            CalloutUrl: request.httpParameters.callouturl ? request.httpParameters.callouturl.pop() : '',
            CalloutText: request.httpParameters.callouttext ? request.httpParameters.callouttext.pop() : ''
        }
    }),
    enumerable: true,
    configurable: true
});

/**
 *  Allows to trigger transactional emails, which do not require further interaction (fire and forget)
 *  @param {string} action an action that follows a specific email template
 *  @returns {Object} success status
 */
exports.api = function (action) {
    var result = { success: false };
    if (mails[action] && mails[action].validate()) {
        var args = new HashMap();
        Object.keys(mails[action].args).forEach(arg => args.put(arg, mails[action].args[arg]));

        var template = new Template(mails[action].template);
        var content = template.render(args);

        var mail = new Mail().setSubject(mails[action].subject).setContent(content).setFrom(Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com')
            .addTo(mails[action].to);

        mail.send();
        result = { success: true };
    }

    return result;
};

exports.get = function (httpParams) {
    var action = httpParams.action ? httpParams.action.pop() : '';
    return exports.api(action);
};
