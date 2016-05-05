import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('blockQuote'),
	main = sheet.addMain();

//Conditions


//Variables
sheet.setValues({});


main.addSelector({
	common: {
		background: '$palette.grey100',
		padding: '$gutter.small',
		borderLeftWidth: '5px',
		borderLeftStyle: 'solid',
		borderLeftColor: '$color.primary.base',
		marginLeft: '$gutter.large'
	}
})

module.exports = sheet;
