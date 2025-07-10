var PageMgr = require('dw/experience/PageMgr');
var Site = require('dw/system/Site');

var pageId = dw.system.Site.current.ID + "-theme";
if (!empty(Site.current.getCustomPreferenceValue('dittoThemePage'))) {
    pageId = Site.current.getCustomPreferenceValue('dittoThemePage');
}

exports.available = function available() {
    var page = PageMgr.getPage(pageId);
    return page && page.visible;
}

exports.renderCSS = function renderCSS() {
    var page = PageMgr.getPage(pageId);
    if (page && page.visible) {
        return PageMgr.renderPage(pageId, JSON.stringify({ css: true }));
    } else {
        return '';
    }
};

exports.renderLogo = function renderLogo() {
    var page = PageMgr.getPage(pageId);
    if (page && page.visible) {
        return PageMgr.renderPage(pageId, JSON.stringify({ logo: true }));
    } else {
        return '';
    }
};

exports.renderMobileLogo = function renderLogo() {
    var page = PageMgr.getPage(pageId);
    if (page && page.visible) {
        return PageMgr.renderPage(pageId, JSON.stringify({ mobileLogo: true }));
    } else {
        return '';
    }
};

exports.renderFooterLogo = function renderLogo() {
    var page = PageMgr.getPage(pageId);
    if (page && page.visible) {
        return PageMgr.renderPage(pageId, JSON.stringify({ footerLogo: true }));
    } else {
        return '';
    }
};
