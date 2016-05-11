import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('timestamp'),
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		cursor: 'default'
	}
})

module.exports = sheet;
