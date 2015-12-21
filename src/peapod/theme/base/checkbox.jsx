var Pod_Vars = require('../../mixins/vars.jsx');

module.exports = [
	{
		childEle: 'wrapper',
		global: {
			display: 'flex',
			alignItems: 'center'
		}
	}, {
		global: {
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
	}, {
		state: {
			checked: true
		},
		global: {
			backgroundColor: '$checkbox.color.backgroundChecked',
			borderColor: '$checkbox.border.colorChecked',
		}
	}, {
		childEle: 'box',
		global: {
			position: 'relative',
			cursor: 'pointer',
		}
	}, {
		childEle: 'input',
		global: {
			display: 'none'
		}
	}, {
		childEle: 'icon',
		global: {
			color: '$checkbox.color.icon',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			left: '2px',
			display: 'none'
		}
	}, {
		childEle: 'icon',
		state: {
			checked: true
		},
		global: {
			display: 'inline-block'
		}
	}, {
		childEle: 'label',
		global: {
			fontFamily: '$checkbox.font.family',
			fontSize: '$checkbox.font.size',
		}
	}
]
