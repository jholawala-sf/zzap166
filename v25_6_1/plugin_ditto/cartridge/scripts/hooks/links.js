const Velocity = require('dw/template/Velocity');
const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');
const SCRIPT_TYPES = {
    MIAW: 'miaw',
    EMBEDDED_CHAT: 'embeddedChat',
    UNKNOWN: 'unknown'
}

const getScriptType = (botScript) => {
    if (!botScript) return SCRIPT_TYPES.UNKNOWN
    if (Object.hasOwnProperty.call(botScript, 'markup')) {
        botScript = botScript.markup;
    }
    if (botScript.indexOf('initESW') !== -1) return SCRIPT_TYPES.EMBEDDED_CHAT;
    if (botScript.indexOf('initEmbeddedMessaging') !== -1) return SCRIPT_TYPES.MIAW;
    return SCRIPT_TYPES.UNKNOWN
};

const afterFooter = function () {
    const embeddedServiceSnippet = siteHelpers.getSitePreference('DittoEmbeddedServiceCodeSnippet');
    const enableEmbeddedMessaging = siteHelpers.getSitePreference('enableEmbeddedMessaging') || false;
    const embeddedMessagingCodeSnippet = siteHelpers.getSitePreference('embeddedMessagingCodeSnippet');
    let botScript = enableEmbeddedMessaging && embeddedMessagingCodeSnippet ? embeddedMessagingCodeSnippet : embeddedServiceSnippet;
    const scriptType = getScriptType(botScript);

    if (botScript) {
        if (scriptType === SCRIPT_TYPES.EMBEDDED_CHAT) {
            // replace line starting with "embedded_svc.settings.prepopulatedPrechatFields" with remote include
            // embedded_svc.settings.prepopulatedPrechatFields = {Subject: "subject line", FirstName: "first name", LastName: "last name", Email: "a@test.com"}
            botScript = botScript.replace(/(\/\/)?embedded_svc.settings.prepopulatedPrechatFields.*$/gim, 'embedded_svc.settings.prepopulatedPrechatFields = ' + Velocity.remoteInclude('ContactUs-IncludePrepopulatedPrechatFields'));
        } else if (scriptType === SCRIPT_TYPES.MIAW) {
            botScript += Velocity.remoteInclude('ContactUs-IncludeMiawPrechatFields');
        }
        Velocity.render(botScript, null);
    }
};

module.exports = {
    afterFooter: afterFooter
};
