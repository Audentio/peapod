import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('fixedElement'),
    main = sheet.addMain();

//Conditions
//Variables
main.addSelector({
    common: {
        position: 'static',
        zIndex: '998'
    }
});

module.exports = sheet;
