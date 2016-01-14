var Pod_Vars = require('../../vars.jsx');

module.exports = [
	{
		global: {
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
			width: 'calc(100% - ' + Pod_Vars.get('input.padding.left') + ' - ' + Pod_Vars.get('input.padding.right') + ')',
		}
	}, {
		subComponent: 'wrapper',
		global: {
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
	}, {
		subComponent: 'wrapper',
		state: {
			focus: true
		},
		global: {
			background: '$input.color.backgroundFocus'
		}
	}, {
		subComponent: 'placeholder',
		global: {
			fontSize: '$input.font.size',
			fontFamily: '$input.font.family',
			color: '$input.color.placeholder',
			zIndex: 1,
			paddingLeft: '$input.padding.left',
			paddingRight: '$input.padding.right',
			position: 'absolute',
			top: 0,
			left: 0,
			width: 'calc(100% - ' + Pod_Vars.get('input.padding.left') + ' - ' + Pod_Vars.get('input.padding.right') + ')',
			height: '100%'
		}
	}, {
		subComponent: 'icon',
		global: {
			marginLeft: '4px',
			marginRight: '4px',
			color: '$input.color.icon',
			lineHeight: 'inherit'
		}
	}
]
