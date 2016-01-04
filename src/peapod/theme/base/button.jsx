var Pod_Vars = require('../../vars.jsx');

module.exports = [
	{
		global: {
			display: 'inline-block',
			borderRadius: '$button.border.radius',
			borderWidth: '$button.border.width',
			borderStyle: '$button.border.style',
			borderColor: '$button.border.color',

			textDecoration: 'none',
			fontFamily: '$button.font.family',
			fontSize: '$button.font.size',
			lineHeight: '$button.lineHeight',
			paddingTop: 0, //override UA stylesheet
			paddingBottom: 0, //override UA stylesheet
			height: '$button.height',
			textAlign: 'center',
			outline: 'none',
			color: '$button.color.text.dark',

			':hover': {},

			//base:active
			':active': {
				transform: 'scale(' + Pod_Vars.get('button.transition.scale') + ')',
				transitionDuration: '$button.transition.duration'
			}
		}
	},
	{
		styler: {
			raised: true
		},
		global: {
			boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
		}
	},
	{
		styler: {
			block: true
		},
		global: {
			display: 'block'
		}
	},
	{
		styler: {
			round: true
		},
		global: {
			borderRadius: '10000px'
		}
	},
	{
		styler: {
			kind: 'general'
		},
		global: {
			backgroundColor: '$color.general.base',
			borderColor: '$palette.grey200',
			borderWidth: '1px',
			':hover': {
				backgroundColor: '$color.general.hover',
				borderColor: '$palette.grey300',
				color: '$button.color.text.dark',
			},
			':active': {
				backgroundColor: '$color.general.active',
				borderColor: '$palette.grey400',
				color: '$button.color.text.dark',
			}
		}
	},
	{
		styler: {
			kind: 'base'
		},
		global: {
			backgroundColor: '$button.color.base.background',
			color: '$button.color.base.color',
			':hover': {
				backgroundColor: '$button.color.base.hover',
				color: '$button.color.text.light',
			},
			':active': {
				backgroundColor: '$button.color.base.active',
				color: '$button.color.text.light',
			}
		}
	},
	{
		styler: {
			kind: 'primary'
		},
		global: {
			backgroundColor: '$color.primary.base',
			color: '$button.color.text.light',
			':hover': {
				backgroundColor: '$color.primary.hover',
			},
			':active': {
				backgroundColor: '$color.primary.active',
			}
		}
	},
	{
		styler: {
			kind: 'warning'
		},
		global: {
			backgroundColor: '$color.warning.base',
			':hover': {
				backgroundColor: '$color.warning.hover',
			},
			':active': {
				backgroundColor: '$color.warning.active',
			}
		}
	},
	{
		styler: {
			kind: 'info'
		},
		global: {
			backgroundColor: '$color.info.base',
			color: '$button.color.text.light',
			':hover': {
				backgroundColor: '$color.info.hover',
				color: '$button.color.text.dark',
			},
			':active': {
				backgroundColor: '$color.info.active',
				color: '$button.color.text.light',
			}
		}
	},
	{
		styler: {
			kind: 'danger'
		},
		global: {
			backgroundColor: '$color.danger.base',
			color: '$button.color.text.light',
			':hover': {
				backgroundColor: '$color.danger.hover',
				color: '$button.color.text.dark',
			},
			':active': {
				backgroundColor: '$color.danger.active',
				color: '$button.color.text.light',
			}
		}
	},
	{
		styler: {
			kind: 'success'
		},
		global: {
			backgroundColor: '$color.success.base',
			':hover': {
				backgroundColor: '$color.success.hover',
			},
			':active': {
				backgroundColor: '$color.success.active',
				color: '$button.color.text.light'
			}
		}
	},
]
