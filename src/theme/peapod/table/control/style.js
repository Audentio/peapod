import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('table_Control'),
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		color: '$table.color.controls.color',
		background: '$table.color.controls.background',
	}
})

module.exports = sheet;
