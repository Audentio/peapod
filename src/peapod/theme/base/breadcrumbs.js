import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
    main = sheet.addMain(),
    listitem = sheet.addPart('listitem');

//Conditions

//Variables
sheet.setValues({
    common: {
        breadcrumbs: {}
    }
});


main.addSelector({
    common: {}
});

listitem.addSelector({
    common: {
        display: 'inline-block',
        padding: '8px'
    }
});

module.exports = sheet;
