import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet;

//Variables
sheet.setValues({
	global: {
		paginator: {
			border: {
				color: '#778A9D',
				width: '1px',
				style: 'solid'
			},
			font: {
				family: 'inherit',
				size: '$font.size.normal',
				triggerSize: '$font.size.xlarge'
			}
		},
	}
});

module.exports = [
	{
		global: {
			fontSize: '$paginator.font.size',
			fontFamily: '$paginator.font.family',
			display: 'inline-block'
		}
	}, {
		part: 'trigger',
		global: {
			paddingLeft: '$gutter.internal',
			paddingRight: '$gutter.internal',
			fontSize: '$paginator.font.triggerSize'
		}
	}, {
		part: 'label',
		global: {
			paddingLeft: '$gutter.internal',
			paddingRight: '$gutter.internal',
			borderColor: '$paginator.border.color',
			borderStyle: '$paginator.border.style',
			borderTopWidth: '0',
			borderBottomWidth: '0',
			borderLeftWidth: '$paginator.border.width',
			borderRightWidth: '$paginator.border.width'
		}
	}, {
		part: 'label',
		styler: {
			onePage: true
		},
		global: {
			borderRightWidth: '0'
		}
	}
]
