import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('Datepicker'),
    main = sheet.addMain(),
    calendar = sheet.addPart('calendar');

//Conditions
//Variables
sheet.setValues({
});

main.addSelector({
    common: {
        display: 'inline-block'
    }
});
calendar.addSelector({
    common: {}
});


module.exports = sheet;
