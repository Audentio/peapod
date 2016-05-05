import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({
    common: {
        wrapper: {
            maxWidth: '$site.maxWidth',
            width: '95%'
        }
    }
});


main.addSelector({
    common: {
        maxWidth: '$wrapper.maxWidth',
        width: '$wrapper.width',
        margin: '0 auto'
    }
});

module.exports = sheet;
