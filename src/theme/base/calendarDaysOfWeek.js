import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('CalendarDaysOfWeek'),
    main = sheet.addMain();

//Variables
sheet.setValues({});

main.addSelector({
    common: {}
})


module.exports = sheet;
