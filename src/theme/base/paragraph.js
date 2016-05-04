import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('secondary').addStyler({secondary: true});

//Variables
sheet.setValues({});

main.addSelector({
    common:{
	   marginBottom: '$font.margins.body1',
       fontSize: '$font.size.body1'
    }
}).addSelector({
    condition: ['secondary'],
    common:{
       marginBottom: '0px',
    }
})

module.exports = sheet;
