import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	wrapper = sheet.addPart('wrapper'),
	placeholder = sheet.addPart('placeholder'),
	icon = sheet.addPart('icon');

sheet.addCondition('focused').addStyler({focus: true});

//Variables
sheet.setValues({
	common: {
		input: {
			color: {
				text: '$palette.grey400',
				placeholder: '$palette.grey500',
				background: '$palette.grey50',
				backgroundFocus: '$palette.grey100',
				icon: '$input.color.text'
			},
			height: '4.5rem',
			lineHeight: '$input.height',
			padding: {
				left: '$gutter.internal',
				right: '$gutter.internal'
			},
			border: {
				color: '$palette.grey200',
				radius: '$border.radius.large',
				width: '1px',
				style: 'solid'
			},
			font: {
				family: 'inherit',
				size: '$font.size.normal'
			}
		},
	},
	dark: {
		input: {
			color: {
				text: '$color.text.white',
				placeholder: '$input.color.text',
				background: 'transparent',
				backgroundFocus: 'rgba(255, 255, 255, 0.1)',
				icon: '$input.color.text'
			},
			border: {
				color: '$palette.grey200',
			}
		}
	}
});


main.addSelector({
	common: {
		fontSize: '$input.font.size',
		fontFamily: '$input.font.family',
		color: '$input.color.text',
		position: 'relative',
		background: 'transparent',
		zIndex: 2,
		border: 0,
		outline: 0,
		paddingLeft: '$input.padding.left',
		paddingRight: '$input.padding.right',
		lineHeight: 'inherit',
		width: 'calc(100% - {$input.padding.left} - {$input.padding.right})',
	}
});

wrapper.addSelector({
	common: {
		display: 'inline-block',
		position: 'relative',
		borderRadius: '$input.border.radius',
		borderWidth: '$input.border.width',
		borderStyle: '$input.border.style',
		borderColor: '$input.border.color',
		height: '$input.height',
		lineHeight: '$input.lineHeight',
		background: '$input.color.background',
	}
}).addSelector({
	when: ['focused'],
	common: {
		background: '$input.color.backgroundFocus'
	}
});

placeholder.addSelector({
	common: {
		fontSize: '$input.font.size',
		fontFamily: '$input.font.family',
		color: '$input.color.placeholder',
		zIndex: 1,
		paddingLeft: '$input.padding.left',
		paddingRight: '$input.padding.right',
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'calc(100% - {$input.padding.left} - {$input.padding.right})',
		height: '100%'
	}
});

icon.addSelector({
	common: {
		marginLeft: '4px',
		marginRight: '4px',
		color: '$input.color.icon',
		lineHeight: 'inherit'
	}
})

module.exports = sheet;
