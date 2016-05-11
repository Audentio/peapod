import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
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

	return sheet;
}
