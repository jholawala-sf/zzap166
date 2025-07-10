'use strict';

const server = require('server');
const Resource = require('dw/web/Resource');
const URLUtils = require('dw/web/URLUtils');

server.extend(module.superModule);

server.append('Landing', function (req, res, next) {
    const viewData = res.getViewData();

    viewData.breadcrumbs = [
        {
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        },
        {
            htmlValue: Resource.msg('title.gift.registry.page', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Landing').relative().toString()
        }
    ];

    res.setViewData(viewData);
    next();
});

server.append('Begin', function (req, res, next) {
    const viewData = res.getViewData();

    viewData.breadcrumbs = [
        {
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        },
        {
            htmlValue: Resource.msg('title.gift.registry.page', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Landing').relative().toString()
        },
        {
            htmlValue: Resource.msg('heading.search.gr.create', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Begin').relative().toString()
        }
    ];

    res.setViewData(viewData);
    next();
});

server.append('Show', function (req, res, next) {
    const viewData = res.getViewData();

    const breadcrumbs = [
        {
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        },
        {
            htmlValue: Resource.msg('title.gift.registry.page', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Landing').relative().toString()
        }
    ];

    if (viewData.giftRegistryModel) {
        breadcrumbs.push({
            htmlValue: viewData.giftRegistryModel.name,
            url: URLUtils.url('GiftRegistry-Begin', 'id', viewData.queryString).relative().toString()
        });
    }

    viewData.breadcrumbs = breadcrumbs;

    res.setViewData(viewData);
    next();
});

server.append('Show', function (req, res, next) {
    const viewData = res.getViewData();

    const breadcrumbs = [
        {
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        },
        {
            htmlValue: Resource.msg('page.title.myaccount', 'account', null),
            url: URLUtils.url('Account-Show').relative().toString()
        },
        {
            htmlValue: Resource.msg('title.gift.registry.page', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Manage').relative().toString()
        },
        {
            htmlValue: viewData.giftRegistryModel.name,
            url: URLUtils.url('GiftRegistry-Begin', 'id', viewData.queryString).relative().toString()
        }
    ];

    viewData.breadcrumbs = breadcrumbs;

    res.setViewData(viewData);
    next();
});

server.append('ShowOthers', function (req, res, next) {
    const viewData = res.getViewData();

    const breadcrumbs = [
        {
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        }
    ];

    if (viewData.loggedIn) {
        breadcrumbs.push({
            htmlValue: Resource.msg('title.gift.registry.page', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Manage').relative().toString()
        });
    } else {
        breadcrumbs.push({
            htmlValue: Resource.msg('title.gift.registry.page', 'giftRegistry', null),
            url: URLUtils.url('GiftRegistry-Landing').relative().toString()
        });
    }

    if (viewData.giftRegistryModel) {
        breadcrumbs.push({
            htmlValue: viewData.giftRegistryModel.name,
            url: URLUtils.url('GiftRegistry-Begin', 'id', viewData.queryString).relative().toString()
        });
    }


    viewData.breadcrumbs = breadcrumbs;

    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
