import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        backgroundColor: '$palette.white',
        borderRadius: '$border.radius.small',
        boxShadow: '$shadows.d1',
        margin: '8px'
    }
})

module.exports = sheet;