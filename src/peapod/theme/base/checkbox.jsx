import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	outerWrapper = sheet.addPart('outerWrapper'),
	wrapper = sheet.addPart('wrapper'),
	box = sheet.addPart('box'),
	input = sheet.addPart('input'),
	icon = sheet.addPart('icon'),
	label = sheet.addPart('label');

//Conditions
sheet.addCondition('checked').addState({checked: true});
sheet.addCondition('block').addStyler({block: true});
sheet.addCondition('hovered').addStyler({hovered: true});

//Variables
sheet.setValues({
	common: {
		checkbox: {
			width: '1.5rem',
			height: '$checkbox.width',
			color: {
				text: '$color.text.dark',
				background: '$palette.grey50',
				backgroundChecked: '$color.primary.base',
				icon: '$color.text.white'
			},
			border: {
				color: '$palette.grey200',
				colorChecked: '$checkbox.color.backgroundChecked',
				radius: '$border.radius.large',
				width: '1px',
				style: 'solid'
			},
			font: {
				family: 'inherit',
				size: '$font.size.normal'
			}
		}
	},
	dark: {
		checkbox: {
			color: {
				text: '$color.text.white',
				background: 'transparent'
			},
			border: {
				color: '$checkbox.color.text'
			}
		},
	}
});

//Root
main.addSelector({
	common: {
		width: '$checkbox.width',
		height: '$checkbox.height',
		display: 'inline-block',
		backgroundColor: '$checkbox.color.background',
		borderRadius: '$checkbox.border.radius',
		borderWidth: '$checkbox.border.width',
		borderStyle: '$checkbox.border.style',
		borderColor: '$checkbox.border.color',
		marginRight: '10px',
		verticalAlign: 'middle',
	}
}).addSelector({
	when: ['checked'],
	common: {
		backgroundColor: '$checkbox.color.backgroundChecked',
		borderColor: '$checkbox.border.colorChecked',
	}
});

//Outer Wrapper
outerWrapper.addSelector({
	common: {
		display: 'inline-block',
	}
}).addSelector({
	when: 'block',
	common: {
		display: 'block',
	}
});

//Wrapper
wrapper.addSelector({
	common: {
		display: 'flex',
		alignItems: 'center'
	}
});

//Box
box.addSelector({
	common: {
		position: 'relative',
		cursor: 'pointer',
	}
});

//Input
input.addSelector({
	common: {
		display: 'none'
	}
});

//Icon
icon.addSelector({
	common: {
		color: '$checkbox.color.icon',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		left: '2px',
		display: 'none',
		fontSize: '$checkbox.font.size',
	}
}).addSelector({
	when: 'checked',
	common: {
		display: 'inline-block'
	}
});

//Label
label.addSelector({
	common: {
		fontFamily: '$checkbox.font.family',
		fontSize: '$checkbox.font.size',
		color: '$checkbox.color.text'
	}
});

module.exports = sheet;
