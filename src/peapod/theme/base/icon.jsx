import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet;

//Variables
sheet.setValues({
	global: {
		icon: {
			font: {
				size: 'inherit'
			},
			color: 'inherit'
		},
	}
});


module.exports = [
	{
		global: {
			cursor: 'default',
			fontSize: '$icon.font.size',
		}
	}, {
		styler: {
			size: ['!=', '']
		},
		global: {
			fontSize: 'getStyler:size',
		}
	}, {
		styler: {
			color: ['!=', '']
		},
		global: {
			color: 'getStyler:color',
		}
	}
]
