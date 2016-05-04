import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({
    common: {
        section: {
            width: '$site.maxWidth'
        }
    }
});


main.addSelector({
    common: {
        maxWidth: '$section.width',
        margin: '0 auto'
    }
})

module.exports = sheet;
