import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('pane'),
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		display: 'block',
		width: '100%'
	}
})

module.exports = sheet;
