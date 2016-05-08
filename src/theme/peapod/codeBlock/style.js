import {Sheet} from 'stylesheet.js';

var sheet = new Sheet('codeBlock'),
	main = sheet.addMain();

//Conditions

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		display: 'block',
		marginBottom: '$gutter.internal',
		backgroundColor: '$palette.grey100',
		padding: '$gutter.internal',
		fontFamily: '$font.family.code',
		fontSize: '$font.size.small',
		border: 0
	}
})

module.exports = sheet;
