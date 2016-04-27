import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('raised').addStyler({raised: true});
sheet.addCondition('block').addStyler({block: true});
sheet.addCondition('round').addStyler({round: true});
sheet.addCondition('disabled').addStyler({disabled: true});
sheet.addCondition('notDisabled').addStyler({disabled: undefined});

sheet.addCondition('kindGeneral').addStyler({kind: 'general'});
sheet.addCondition('kindBase').addStyler({kind: 'base'});
sheet.addCondition('kindPrimary').addStyler({kind: 'primary'});
sheet.addCondition('kindWarning').addStyler({kind: 'warning'});
sheet.addCondition('kindInfo').addStyler({kind: 'info'});
sheet.addCondition('kindDanger').addStyler({kind: 'danger'});
sheet.addCondition('kindSuccess').addStyler({kind: 'success'});

//Variables
sheet.setValues({
	common: {
		button: {
			color: {
				text: {
					light: '$color.text.white',
					dark: '$color.text.dark'
				},
				base: {
					background: '#778A9D',
					color: 'white',
					hover: '$color.primary.hover',
					active: '$color.primary.active'
				}
			},
			border: {
				color: '$border.color',
				radius: '$border.radius.small',
				width: '$border.width',
				style: '$border.style'
			},
			height: '3.2rem',
			lineHeight: '$button.height',
			font: {
				family: 'Roboto',
				size: '$font.size.normal',
				weight: 500
			},
			transition: {
				duration: '150ms',
				scale: '0.92',

			}
		}
	}
});


main.addSelector({
	common: {
		display: 'inline-block',
		borderRadius: '$button.border.radius',
		borderWidth: '$button.border.width',
		borderStyle: '$button.border.style',
		borderColor: '$button.border.color',

		textDecoration: 'none',
		textTransform: 'uppercase',
		fontFamily: '$button.font.family',
		fontSize: '$button.font.size',
		fontWeight: '$button.font.weight',
		lineHeight: '$button.lineHeight',
		padding: '0 16px',
		height: '$button.height',
		textAlign: 'center',
		outline: 'none',
		color: '$button.color.text.dark',
	}
}).addSelector({
	condition: ['notDisabled'],
	common: {
		cursor: 'pointer',

		':active': {
			transform: 'scale({$button.transition.scale})',
			transitionDuration: '$button.transition.duration'
		}
	}
}).addSelector({
	condition: 'disabled',
	common: {
		cursor: 'not-allowed',
		opacity: '.7'
	}
}).addSelector({
	condition: ['raised'],
	common: {
		boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
	}
}).addSelector({
	condition: ['block'],
	common: {
		display: 'block'
	}
}).addSelector({
	condition: ['round'],
	common: {
		borderRadius: '10000px'
	}
})

.addSelector({
	condition: ['kindGeneral'],
	common: {
		backgroundColor: '$color.general.base',
		borderColor: '$palette.grey200',
		borderWidth: '1px'
	}
}).addSelector({
	condition: ['kindGeneral', 'notDisabled'],
	common: {
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
})

.addSelector({
	condition: ['kindBase'],
	common: {
		backgroundColor: '$button.color.base.background',
		color: '$button.color.base.color'
	}
}).addSelector({
	condition: ['kindBase', 'notDisabled'],
	common: {
		':hover': {
			backgroundColor: '$button.color.base.hover',
			color: '$button.color.text.light',
		},
		':active': {
			backgroundColor: '$button.color.base.active',
			color: '$button.color.text.light',
		}
	}
})

.addSelector({
	condition: ['kindPrimary'],
	common: {
		backgroundColor: '$color.primary.base',
		color: '$button.color.text.light'
	}
}).addSelector({
	condition: ['kindPrimary', 'notDisabled'],
	common: {
		':hover': {
			backgroundColor: '$color.primary.hover',
		},
		':active': {
			backgroundColor: '$color.primary.active',
		}
	}
})

.addSelector({
	condition: ['kindWarning'],
	common: {
		backgroundColor: '$color.warning.base'
	}
}).addSelector({
	condition: ['kindWarning', 'notDisabled'],
	common: {
		':hover': {
			backgroundColor: '$color.warning.hover',
		},
		':active': {
			backgroundColor: '$color.warning.active',
		}
	}
})

.addSelector({
	condition: ['kindInfo'],
	common: {
		backgroundColor: '$color.info.base',
		color: '$button.color.text.light'
	}
}).addSelector({
	condition: ['kindInfo', 'notDisabled'],
	common: {
		':hover': {
			backgroundColor: '$color.info.hover',
			color: '$button.color.text.dark',
		},
		':active': {
			backgroundColor: '$color.info.active',
			color: '$button.color.text.light',
		}
	}
})

.addSelector({
	condition: ['kindDanger'],
	common: {
		backgroundColor: '$color.danger.base',
		color: '$button.color.text.light'
	}
}).addSelector({
	condition: ['kindDanger', 'notDisabled'],
	common: {
		':hover': {
			backgroundColor: '$color.danger.hover',
			color: '$button.color.text.dark',
		},
		':active': {
			backgroundColor: '$color.danger.active',
			color: '$button.color.text.light',
		}
	}
})

.addSelector({
	condition: ['kindSuccess'],
	common: {
		backgroundColor: '$color.success.base',
	}
}).addSelector({
	condition: ['kindSuccess', 'notDisabled'],
	common: {
		':hover': {
			backgroundColor: '$color.success.hover',
		},
		':active': {
			backgroundColor: '$color.success.active',
			color: '$button.color.text.light'
		}
	}
})

module.exports = sheet;
