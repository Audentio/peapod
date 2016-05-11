import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('CalendarDay'),
    main = sheet.addMain();

// Conditions
sheet.addCondition('notActive').addProp({notActive: ['!=', undefined]});

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        float: 'left',
        width: '50px',
        height: `50px`,
        lineHeight: `50px`,
        background:'#fff',
        textAlign: 'center',
        overflow: 'hidden',
        color: '#c78626',
        display: 'block'
    }
}).addSelector({
    condition: ['notActive'],
    common: {
        color: '#fff'
    }
})


module.exports = sheet;
