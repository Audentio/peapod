import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	trigger = sheet.addPart('trigger'),
	label = sheet.addPart('label');

sheet.addCondition('onePage').addStyler({onePage: true});

//Variables
sheet.setValues({
	common: {
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

main.addSelector({
	common: {
		fontSize: '$paginator.font.size',
		fontFamily: '$paginator.font.family',
		display: 'inline-block'
	}
});

trigger.addSelector({
	common: {
		paddingLeft: '$gutter.internal',
		paddingRight: '$gutter.internal',
		fontSize: '$paginator.font.triggerSize'
	}
});

label.addSelector({
	common: {
		paddingLeft: '$gutter.internal',
		paddingRight: '$gutter.internal',
		borderColor: '$paginator.border.color',
		borderStyle: '$paginator.border.style',
		borderTopWidth: '0',
		borderBottomWidth: '0',
		borderLeftWidth: '$paginator.border.width',
		borderRightWidth: '$paginator.border.width'
	}
}).addSelector({
	condition: ['onePage'],
	common: {
		borderRightWidth: '0'

	}
});

module.exports = sheet;
