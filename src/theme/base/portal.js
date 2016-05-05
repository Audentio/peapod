import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('portal'),
	main = sheet.addMain();

//Variables
sheet.setValues({
	font: {
		family: '$font.family.primary'
	},
	dropdown: {
		width: '20rem'
	}
});

main.addSelector({
	common: {
		fontFamily: '$portal.font.family',
		width: '$portal.dropdown.width'
	}
})

module.exports = sheet;
