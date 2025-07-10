const server = require('server');

server.extend(module.superModule);

server.get('Manifest', function (req, res, next) {
    const manifest = require('*/cartridge/scripts/manifest');

    res.json(manifest);

    next();
});

module.exports = server.exports();
