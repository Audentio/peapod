import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
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
		width: '1.5rem',
		height: '$radio.width',
		color: {
			text: '$color.text.dark',
			background: '$palette.grey50',
			backgroundChecked: '$color.primary.base',
			icon: '$color.text.white'
		},
		border: {
			color: '$palette.grey200',
			colorChecked: '$radio.color.backgroundChecked',
			radius: '$border.radius.large',
			width: '1px',
			style: 'solid'
		},
		font: {
			family: 'inherit',
			size: '$font.size.normal'
		}
	}).setValues({
		color: {
			text: '$color.text.white',
			background: 'transparent'
		},
		border: {
			color: '$radio.color.text'
		}
	}, 'dark');

	main.addSelector({})

	radio_outer.addSelector({
	    common:{
	        width: '$radio.width',
	        height: '$radio.height',
	        background:'transparent',
	        border: '2px solid #ddd',
	        display: 'inline-block',
	        marginRight: '$gutter.extrasmall',
	        borderRadius: '50%',
	        position: 'relative'
	    }
	});
	radio_inner.addSelector({
	    condition: ['checked'],
	    common: {
	        width: '$radio.width',
	        height: '$radio.height',
	        display: 'inline-block',
	        borderRadius: '50%',
	        border: '2px solid #ddd',
	        background: '#ddd',
	        boxShadow: 'inset 0 0 0 2px #fff',
	        position: 'absolute',
	        top: '-2px', left: '-2px'
	    }
	});
	radio_element.addSelector({
	    common: {
	        display: 'none'
	    }
	});

	label.addSelector({
	    condition: ['checked'],
	    common: {
	        color: 'red'
	    }
	});

	return sheet;
}
