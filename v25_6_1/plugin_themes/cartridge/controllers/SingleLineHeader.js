'use strict';

var server = require('server');

server.get('Account', server.middleware.include, function (req, res, next) {
    var template = 'components/header/accountoverlay';
    res.render(template, { name:
        req.currentCustomer.profile ? req.currentCustomer.profile.firstName : null
    });
    next();
});

module.exports = server.exports();
