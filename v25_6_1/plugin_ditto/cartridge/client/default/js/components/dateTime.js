const jstz = require('jstz');
const moment = require('moment-timezone');

module.exports = function () {
    const tz = jstz.determine() || 'UTC';

    $('[data-parse-date]').each(function () {
        const serverTimestamp = $(this).text().replace(/[^\w-:]/gi, '');
        const localTimestamp = moment(serverTimestamp)
            .tz(tz.name())
            .format($(this).data('parse-date') || 'MMMM Do YYYY, h:mm a');
        $(this).text(localTimestamp);
    });
};
