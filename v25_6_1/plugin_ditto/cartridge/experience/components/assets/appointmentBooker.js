'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'appt-booker-' + context.component.getID();

    model.app = {
        bgColour: !empty(content.bg_colour) ? content.bg_colour.color : '#fff', 
        textColour: !empty(content.text_colour) ? content.text_colour.color : '#000', 
        datePassedColour: !empty(content.date_passed_colour) ? content.date_passed_colour.color : '#c9c9c9', 
        headColour: !empty(content.head_colour) ? content.head_colour.color : 'rgba(0,0,0,.03)', 
        daysTextColour: !empty(content.days_text_colour) ? content.days_text_colour.color : '#777777',
        dateColour: !empty(content.date_colour) ? content.date_colour.color : 'rgba(0,0,0,.03)', 
        selectedDateColour: !empty(content.selected_date_colour) ? content.selected_date_colour.color : '#b9b7b7', 
        selectedDateTextColour: !empty(content.selected_date_text_colour) ? content.selected_date_text_colour.color : '#fff', 
        btnColour: !empty(content.button_colour) ? content.button_colour.color : 'rgba(0,0,0,.03)', 
        btnText: !empty(content.button_text) ? content.button_text.color : 'rgba(255,255,255)', 
        pages: [
            
        ]
    };

    model.openCalButtonText = (content.open_cal_button_text == null||content.open_cal_button_text == '')? 'Book Appointment': content.open_cal_button_text;
    model.confirmText1 = (content.confirm_text_1 == null||content.confirm_text_1 == '')? 'Thank you, your appointment has been booked for ': content.confirm_text_1;
    model.confirmText2 = (content.confirm_text_2 == null||content.confirm_text_2 == '')? 'We will send you a confirmation email shortly. We look forward to seeing you.': content.confirm_text_2;

    return new Template('experience/components/assets/appointmentBooker').render(model).text;
};