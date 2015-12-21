var Pod_Vars = require('../../mixins/vars.jsx');

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
		props: {
			raised: true
		},
		global: {
			boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
		}
	},
	{
		props: {
			block: true
		},
		global: {
			display: 'block'
		}
	},
	{
		props: {
			round: true
		},
		global: {
			borderRadius: '10000px'
		}
	},
	{
		props: {
			kind: 'general'
		},
		global: {
			backgroundColor: '$color.general.base',
			borderColor: '$palette.grey200',
			':hover': {
				backgroundColor: '$color.general.hover',
				borderColor: '$palette.grey300'
			},
			':active': {
				backgroundColor: '$color.general.active',
				borderColor: '$palette.grey400'
			}
		}
	},
	{
		props: {
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
		props: {
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
		props: {
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
		props: {
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
		props: {
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
