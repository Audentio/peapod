import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
		main = sheet.addMain();

	//Conditions

	//Variables
	sheet.setValues({
	    borderWidth: '1px',
	    borderStyle: 'solid',
	    borderColor: '$palette.grey200',
	    padding: '$gutter.large'
	});


	main.addSelector({
	    common: {
	        borderBottomWidth: '$section.borderWidth',
	        borderBottomStyle: '$section.borderStyle',
	        borderBottomColor: '$section.borderColor',
	        paddingTop: '$section.padding',
	        paddingBottom: '$section.padding'
	    }
	})

	return sheet;
}
