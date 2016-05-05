import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
//Variables
main.addSelector({
    common: {
        position: 'static',
        zIndex: '998',
        // transform: 'translate3d(0, 0, 0)'
        willChange: 'position'
    }
});

module.exports = sheet;
