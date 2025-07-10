module.exports = function () {
    const $consentTracker = $('.tracking-consent');
    if ($consentTracker.length) {
    // Initialize toggle depending on whether or not the user has consented
        $('#functional-cookies-toggle').attr('checked', $consentTracker.hasClass('consented'));


        $('.consent-tracking_close').on('click', function () {
            $.ajax({
                url: $(this).data('url'),
                type: 'get',
                dataType: 'json',
                success: function () {
                    $('.consent-tracking').remove();
                },
                error: function () {
                    $('.consent-tracking').remove();
                }
            });
        });

        $('#functional-cookies-toggle').on('change', function () {
            $('.modal').spinner().start();

            $.ajax({
                url: this.checked ? $consentTracker.data('accept') : $consentTracker.data('reject'),
                type: 'get',
                dataType: 'json',
                success: function () {
                    $('.consent-tracking').remove();
                    $.spinner().stop();
                },
                error: function () {
                    $.spinner().stop();
                }
            });
        });
    }
};
