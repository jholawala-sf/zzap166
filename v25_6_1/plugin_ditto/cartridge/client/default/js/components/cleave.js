'use strict';

const base = require('base/components/cleave');
const Cleave = require('cleave.js').default;

base.handleCreditCardNumber = function (cardFieldSelector, cardTypeSelector) {
    var cleave = new Cleave(cardFieldSelector, {
        creditCard: true,
        onCreditCardTypeChanged: function (type) {
            var creditCardTypes = {
                visa: 'Visa',
                mastercard: 'Master Card',
                amex: 'Amex',
                discover: 'Discover',
                diners: 'DinersClub',
                unknown: 'Unknown'
            };

            var cardType = creditCardTypes[Object.keys(creditCardTypes).indexOf(type) > -1
                ? type
                : 'unknown'];
            $(cardTypeSelector).val(cardType);
            $('.card-number-wrapper').attr('data-type', type);
            if (type === 'amex') {
                $('#securityCode').attr('maxlength', 4);
            } else {
                $('#securityCode').attr('maxlength', 3);
            }
        }
    });

    $(cardFieldSelector).data('cleave', cleave);
};

module.exports = base;
