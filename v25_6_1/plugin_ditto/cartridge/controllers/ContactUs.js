const server = require('server');
const Resource = require('dw/web/Resource');

server.extend(module.superModule);

server.get('PrivacyRequest', server.middleware.https, function (req, res, next) {
    const privacyRequestForm = server.forms.getForm('privacyRequest');

    res.render('contactUs/privacy-request', { privacyRequestForm: privacyRequestForm });
    next();
});

server.post('SubmitPrivacyRequest', server.middleware.https, function (req, res, next) {
    res.json({
        success: true,
        msg: Resource.msg('submit.privacy.request.success', 'cookies', null)
    });
    next();
});

/**
 * Note: This includes customer specific data into the LiveAgent template
 * and should NOT be cached.
 */
server.get('IncludePrepopulatedPrechatFields', server.middleware.include, function (req, res) {
    const object = {
        Subject: Resource.msgf('chat.subject', 'common', null, Resource.msg('global.site.name', 'version', null))
    };
    if (req.currentCustomer.profile) {
        object.FirstName = req.currentCustomer.profile.firstName || '';
        object.LastName = req.currentCustomer.profile.lastName || '';
        object.Email = req.currentCustomer.profile.email || '';
    }
    res.base.writer.print(JSON.stringify(object));
});

/**
 * Note: This includes customer specific data into the LiveAgent template
 * and should NOT be cached.
 */
server.get('IncludeMiawPrechatFields', server.middleware.include, function (req, res) {
    const miawHelpers = require('*/cartridge/scripts/helpers/miawHelpers');

    var visiblePrechatFieldsHtml = '';
    var hiddenPrechatFieldsHtml = '';
    var visiblePrechatFields = miawHelpers.getVisiblePrechatFields(req.currentCustomer.raw);
    var hiddenPrechatFields = miawHelpers.getHiddenPrechatFields();

    if (Object.keys(visiblePrechatFields).length) {
        visiblePrechatFieldsHtml = `embeddedservice_bootstrap.prechatAPI.setVisiblePrechatFields(${JSON.stringify(visiblePrechatFields)})`
    }
    if (Object.keys(hiddenPrechatFields).length) {
        hiddenPrechatFieldsHtml = `embeddedservice_bootstrap.prechatAPI.setHiddenPrechatFields(${JSON.stringify(hiddenPrechatFields)})`
    }

    const prechatScript = `
        <script type='text/javascript'>
        try {
            window.addEventListener("onEmbeddedMessagingReady", () => {
                console.log('onEmbeddedMessagingReady event');
                embeddedservice_bootstrap.settings.devMode = true;
                embeddedservice_bootstrap.prechatAPI.unsetVisiblePrechatFields(['_firstName','_lastName','_email']);
                ${visiblePrechatFieldsHtml}
                ${hiddenPrechatFieldsHtml}
            });
        } catch (err) {
            console.error('Error setting embedded messaging prechat fields: ', err);
        }
        </script>`;

    res.base.writer.print(prechatScript);
});

module.exports = server.exports();
