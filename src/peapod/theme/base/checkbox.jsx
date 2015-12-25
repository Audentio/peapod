var Pod_Vars = require('../../vars.jsx');

module.exports = [
	{
		subComponent: 'outerWrapper',
		global: {
			display: 'inline-block',
		}
	}, {
		subComponent: 'outerWrapper',
		styler: {
			block: true
		},
		global: {
			display: 'block',
		}
	}, {
		subComponent: 'wrapper',
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
		subComponent: 'box',
		global: {
			position: 'relative',
			cursor: 'pointer',
		}
	}, {
		subComponent: 'input',
		global: {
			display: 'none'
		}
	}, {
		subComponent: 'icon',
		global: {
			color: '$checkbox.color.icon',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			left: '2px',
			display: 'none'
		}
	}, {
		subComponent: 'icon',
		state: {
			checked: true
		},
		global: {
			display: 'inline-block'
		}
	}, {
		subComponent: 'label',
		global: {
			fontFamily: '$checkbox.font.family',
			fontSize: '$checkbox.font.size',
			color: '$checkbox.color.text'
		}
	}
]
