import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet;

//Variables
sheet.setValues({
	global: {
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


module.exports = [
	{
		global: {
			fontFamily: '$portal.font.family',
			width: '$portal.dropdown.width'
		}
	}
]
