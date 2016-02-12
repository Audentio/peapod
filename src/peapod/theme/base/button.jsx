import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('raised').addStyler({raised: true});
sheet.addCondition('block').addStyler({block: true});
sheet.addCondition('round').addStyler({round: true});

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
					color: '#ABBAC9',
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
			height: '3.6rem',
			lineHeight: '$button.height',
			font: {
				family: 'inherit',
				size: '$font.size.normal'
			},
			transition: {
				duration: '150ms',
				scale: '0.92'
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
		fontFamily: '$button.font.family',
		fontSize: '$button.font.size',
		lineHeight: '$button.lineHeight',
		paddingTop: 0, //override UA stylesheet
		paddingBottom: 0, //override UA stylesheet
		height: '$button.height',
		textAlign: 'center',
		outline: 'none',
		color: '$button.color.text.dark',

		//base:active
		':active': {
			transform: 'scale({$button.transition.scale})',
			transitionDuration: '$button.transition.duration'
		}
	}
}).addSelector({
	when: ['raised'],
	common: {
		boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
	}
}).addSelector({
	when: ['block'],
	common: {
		display: 'block'
	}
}).addSelector({
	when: ['round'],
	common: {
		borderRadius: '10000px'
	}
}).addSelector({
	when: ['kindGeneral'],
	common: {
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
}).addSelector({
	when: ['kindBase'],
	common: {
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
}).addSelector({
	when: ['kindPrimary'],
	common: {
		backgroundColor: '$color.primary.base',
		color: '$button.color.text.light',
		':hover': {
			backgroundColor: '$color.primary.hover',
		},
		':active': {
			backgroundColor: '$color.primary.active',
		}
	}
}).addSelector({
	when: ['kindWarning'],
	common: {
		backgroundColor: '$color.warning.base',
		':hover': {
			backgroundColor: '$color.warning.hover',
		},
		':active': {
			backgroundColor: '$color.warning.active',
		}
	}
}).addSelector({
	when: ['kindInfo'],
	common: {
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
}).addSelector({
	when: ['kindDanger'],
	common: {
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
}).addSelector({
	when: ['kindSuccess'],
	common: {
		backgroundColor: '$color.success.base',
		':hover': {
			backgroundColor: '$color.success.hover',
		},
		':active': {
			backgroundColor: '$color.success.active',
			color: '$button.color.text.light'
		}
	}
});

module.exports = sheet;
