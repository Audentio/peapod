import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('CalendarMonthBar'),
    main = sheet.addMain(),
    button = sheet.addPart('button');

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        width: '250px',
        height: `50px`,
        lineHeight: `50px`,
        background:'#fff',
        textAlign: 'center',
        overflow: 'hidden',
        color: '#c78626',
        display: 'block',
        float:'left'
    }
});

button.addSelector({
    common: {
        width: '50px',
        height: `50px`,
        lineHeight: `50px`,
        background:'#fff',
        textAlign: 'center',
        overflow: 'hidden',
        color: '#c78626',
        display: 'block',
        float:'left',
        textDecoration: 'none'
    }
});


module.exports = sheet;
