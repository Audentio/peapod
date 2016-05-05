import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('section'),
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({
    width: '$site.maxWidth'
});


main.addSelector({
    common: {
        maxWidth: '$section.width',
        margin: '0 auto'
    }
})

module.exports = sheet;
