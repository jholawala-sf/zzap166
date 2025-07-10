'use strict';

const PageMgr = require('dw/experience/PageMgr');
const Site = require('dw/system/Site');

const server = require('server');

server.get(
    'CSS',
    function (req, res, next) {
        var page = PageMgr.getPage(`${Site.current.ID}-theme`)
        res.render('theme/css', {
            themePage: page
        });
        next()
    }
);

module.exports = server.exports();
