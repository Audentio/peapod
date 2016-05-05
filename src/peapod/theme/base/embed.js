import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
sheet.addCondition('height').addProps({height: ['!=', undefined]});
sheet.addCondition('width').addProps({width: ['!=', undefined]});

//Variables
sheet.setValues({
    common: {
        breadcrumbs: {}
    }
});


main.addSelector({
    common: {
        display: 'block',
        width: '100%',
        height: '400px'
    }
}).addSelector({
    condition: ['height'],
    common: {
        height: 'getProp:height'
    }
}).addSelector({
    condition: ['width'],
    common: {
        width: 'getProp:width'
    }
});

module.exports = sheet;
