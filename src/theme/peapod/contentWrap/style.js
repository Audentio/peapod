import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('contentWrap'),
    main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({
    maxWidth: '$site.maxWidth',
    width: '95%'
});


main.addSelector({
    common: {
        maxWidth: '$contentWrap.maxWidth',
        width: '$contentWrap.width',
        margin: '0 auto'
    }
});

module.exports = sheet;
