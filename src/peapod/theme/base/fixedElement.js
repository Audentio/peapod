import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions
//Variables
main.addSelector({
    common: {
        position: 'static'
    }
});

module.exports = sheet;
