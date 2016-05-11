import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('CalendarGrid'),
    main = sheet.addMain();

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        listStyle: 'none',
        width: '350px',
        background: '#fff',
        overflow: 'hidden',
        padding: 0,
        margin: 0
    }
})


module.exports = sheet;
