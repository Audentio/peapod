import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('checkbox'),
	main = sheet.addMain(),
	innerBox = sheet.addPart('innerBox'),
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
	width: '1.8rem',
	height: '$checkbox.width',
	color: {
		text: '$color.text.dark',
		background: '$palette.grey50',
		backgroundChecked: '$color.primary.base',
		icon: '$color.text.white'
	},
	border: {
		color: '$palette.black',
		colorChecked: '$checkbox.color.backgroundChecked',
		radius: '$border.radius.small',
		width: '2px',
		style: 'solid'
	},
	font: {
		family: 'inherit',
		size: '$font.size.large'
	}
}).setValues({
	color: {
		text: '$color.text.white',
		background: 'transparent'
	},
	border: {
		color: '$checkbox.color.text'
	}
}, 'dark');

//Root
innerBox.addSelector({
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
	condition: ['checked'],
	common: {
		backgroundColor: '$checkbox.color.backgroundChecked',
		borderColor: '$checkbox.border.colorChecked',
	}
});

//Outer Wrapper
main.addSelector({
	common: {
		display: 'inline-block',
	}
}).addSelector({
	condition: 'block',
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
		top: '53%',
		transform: 'translateY(-50%)',
		left: '1px',
		display: 'none',
		fontSize: '$checkbox.font.size',
	}
}).addSelector({
	condition: 'checked',
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
