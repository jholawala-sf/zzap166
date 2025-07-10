module.exports = function () {
    $('.country-selector a').click(function (e) {
        e.preventDefault();
        const action = $('.page').data('action');
        const localeCode = $(this).data('locale');
        const localeCurrencyCode = $(this).data('currencycode');
        const queryString = $('.page').data('querystring');
        const url = $('.country-selector').data('url');

        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            data: {
                code: localeCode,
                queryString: queryString,
                CurrencyCode: localeCurrencyCode,
                action: action
            },
            success: function (response) {
                $.spinner().stop();
                if (response && response.redirectUrl) {
                    window.location.href = response.redirectUrl;
                }
            },
            error: function () {
                $.spinner().stop();
            }
        });
    });
};
