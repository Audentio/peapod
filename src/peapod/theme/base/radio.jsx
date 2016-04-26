import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
    wrapper_outer = sheet.addPart('wrapper_outer'),
    wrapper_inner = sheet.addPart('wrapper_inner'),
    radio_outer = sheet.addPart('radio_outer'),
    radio_inner = sheet.addPart('radio_inner'),
    radio_element = sheet.addPart('radio_element'),
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

label.addSelector({
    condition: ['checked'],
    common: {
        color: 'red'
    }
})

module.exports = sheet;
