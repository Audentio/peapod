import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('media'),
    main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
    common: {
        float: 'right',
        marginLeft: '$gutter.small'
    }
});
module.exports = sheet;
