import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
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
