import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
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
