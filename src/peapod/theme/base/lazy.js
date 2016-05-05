import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
sheet.addCondition('height').addProps({height: ['!=', undefined]});

//Variables
sheet.setValues({});

main.addSelector({
    condition: ['height'],
    common: {
        height: 'getProp:height'
    }
})

module.exports = sheet;