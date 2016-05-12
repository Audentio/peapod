import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
		main = sheet.addMain();

	//Conditions

	//Variables
	sheet.setValues({});

	main.addSelector({
		common: {
			cursor: 'default'
		}
	})

	return sheet;
}
