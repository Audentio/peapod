import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Variables
sheet.setValues({
	common: {
		portal: {
			font: {
				family: '$font.family.primary'
			},
			dropdown: {
				width: '20rem'
			}
		},
	}
});

main.addSelector({
	common: {
		fontFamily: '$portal.font.family',
		width: '$portal.dropdown.width'
	}
})

module.exports = sheet;
