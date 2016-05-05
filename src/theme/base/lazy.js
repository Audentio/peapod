import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('lazy'),
    main = sheet.addMain();

//Conditions
sheet.addCondition('height').addProp({height: ['!=', undefined]});

//Variables
sheet.setValues({});

main.addSelector({
    condition: ['height'],
    common: {
        height: 'getProp:height'
    }
})

module.exports = sheet;
