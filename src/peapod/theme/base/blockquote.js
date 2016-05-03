import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions


//Variables
sheet.setValues({
	common: {}
});


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
