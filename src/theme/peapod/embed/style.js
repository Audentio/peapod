import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('embed'),
    main = sheet.addMain();

//Conditions
sheet.addCondition('height').addProp({height: ['!=', undefined]});
sheet.addCondition('width').addProp({width: ['!=', undefined]});

//Variables
sheet.setValues({});


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
