import {Sheet} from '../../stylesheet.jsx';
import Radium from 'radium'
import color from 'color'

var sheet = new Sheet,
	main = sheet.addMain(),
	input = sheet.addPart('input'),
	placeholder = sheet.addPart('placeholder'),
	icon = sheet.addPart('icon'),
	evaluation = sheet.addPart('evaluation');

var bouncy = {
	'0%': { transform: 'matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '3.4%': { transform: 'matrix3d(0.658, 0, 0, 0, 0, 0.703, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '4.7%': { transform: 'matrix3d(0.725, 0, 0, 0, 0, 0.8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '6.81%': { transform: 'matrix3d(0.83, 0, 0, 0, 0, 0.946, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '9.41%': { transform: 'matrix3d(0.942, 0, 0, 0, 0, 1.084, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '10.21%': { transform: 'matrix3d(0.971, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '13.61%': { transform: 'matrix3d(1.062, 0, 0, 0, 0, 1.166, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '14.11%': { transform: 'matrix3d(1.07, 0, 0, 0, 0, 1.165, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '17.52%': { transform: 'matrix3d(1.104, 0, 0, 0, 0, 1.12, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '18.72%': { transform: 'matrix3d(1.106, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '21.32%': { transform: 'matrix3d(1.098, 0, 0, 0, 0, 1.035, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '24.32%': { transform: 'matrix3d(1.075, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '25.23%': { transform: 'matrix3d(1.067, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '29.03%': { transform: 'matrix3d(1.031, 0, 0, 0, 0, 0.948, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '29.93%': { transform: 'matrix3d(1.024, 0, 0, 0, 0, 0.949, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '35.54%': { transform: 'matrix3d(0.99, 0, 0, 0, 0, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '36.74%': { transform: 'matrix3d(0.986, 0, 0, 0, 0, 0.989, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '41.04%': { transform: 'matrix3d(0.98, 0, 0, 0, 0, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '44.44%': { transform: 'matrix3d(0.983, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '52.15%': { transform: 'matrix3d(0.996, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '59.86%': { transform: 'matrix3d(1.003, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '63.26%': { transform: 'matrix3d(1.004, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '75.28%': { transform: 'matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '85.49%': { transform: 'matrix3d(0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '90.69%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
    '100%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' }
}

var bounceKeyframes1 = Radium.keyframes(bouncy, 'bounce1')
var bounceKeyframes2 = Radium.keyframes(bouncy, 'bounce2')
var bounceKeyframes3 = Radium.keyframes(bouncy, 'bounce3')

sheet.addCondition('focused').addState({focus: true});
sheet.addCondition('evaluation-valid').addState({evaluation: 'valid'});
sheet.addCondition('evaluation-invalid').addState({evaluation: 'invalid'});
sheet.addCondition('evaluation-empty').addState({evaluation: 'empty'}); //only when "required" is true

//Variables
sheet.setValues({
	common: {
		input: {
			color: {
				text: '$color.text.base',
				placeholder: 'rgba(0,0,0,0.3)',
				background: '$palette.grey200',
				backgroundFocus: '$palette.grey100',
				icon: '$input.color.text'
			},
			textIndent: 0,
			height: '3.2rem',
			padding: {
				top: 7,
				right: 10,
				bottom: 7,
				left: 10
			},
			border: {
				color: '$palette.grey200',
				radius: '0px',
				width: '0px',
				style: 'solid'
			},
			font: {
				family: 'inherit',
				size: '$font.size.normal'
			}
		},
	},
	material: {
		input: {
			color: {
				background: 'transparent'
			},
			border: {
				width: '0 0 2px 0'
			}
		}
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
		height: '$input.height',
		display: 'inline-block',
		marginBottom: '$gutter.internal',
		position: 'relative',
		color: '$input.color.text',
		backgroundColor: '$input.color.background',
		borderWidth: '$input.border.width',
		borderStyle: '$input.border.style',
		borderColor: '$input.border.color',
		borderRadius: '$input.border.radius'
	},
	material: {
		transition: 'border-color 100ms'
	}
}).addSelector({
	condition: 'focused',
	material: {
		borderColor: '$color.primary.base'
	}
}).addSelector({
	condition: 'evaluation-valid',
	common: {
		backgroundColor: '$palette.green100'
	},
	material: {
		backgroundColor: 'transparent',
		borderColor: '$color.success.base'
	}
}).addSelector({
	condition: ['evaluation-invalid'],
	common: {
		backgroundColor: '$palette.red100'
	},
	material: {
		backgroundColor: 'transparent',
		borderColor: '$color.danger.base'
	}
})

.addSelector({
	condition: ['evaluation-empty'],
	common: {
		backgroundColor: '$palette.red100'
	},
	material: {
		backgroundColor: 'transparent',
		borderColor: '$color.danger.base'
	}
})

input.addSelector({
	common: {
		height: '100%',
		margin: 0,
		width: '100%',
		paddingTop: '$input.padding.top',
		paddingRight: '$input.padding.right',
		paddingBottom: '$input.padding.bottom',
		paddingLeft: '$input.padding.left',
		verticalAlign: 'middle',
		textIndent: '$input.textIndent',
		background: 'transparent',
		fontSize: 'inherit',
		color: 'inherit',
		appearance: 'none',
		border: 'none',
		outline: 'none',
		lineHeight: 'normal',
		position: 'relative',
		zIndex: 2
	},
	material: {
		transition: 'padding 100ms'
	}
}).addSelector({
	condition: 'focused',
	material: {
		paddingLeft: 0
	}
})

placeholder.addSelector({
	common: {
		height: '$input.height',
		lineHeight: '$input.height',
		position: 'absolute',
		width: '100%',
		height: '100%',
		paddingRight: '$input.padding.right',
		paddingLeft: '$input.padding.left',
		textIndent: '$input.textIndent',
		zIndex: 1,
		color: '$input.color.placeholder',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis'
	},
	material: {
		transition: 'padding 100ms'
	}
}).addSelector({
	condition: 'focused',
	material: {
		paddingLeft: 0
	}
})

evaluation.addSelector({
	common: {
		display: 'inline-block',
		padding: '1px 6px 2px',
		borderRadius: '$border.radius.small',
		fontSize: '$font.size.xsmall',
		backgroundColor: '$palette.grey100',
		position: 'absolute',
		marginLeft: '$gutter.internal',
		marginTop: 7,
		left: '100%',
		top: 0,
		color: 'white',
		fontWeight: 'bold',
		whiteSpace: 'nowrap'
	}
}).addSelector({
	condition: 'evaluation-invalid',
	common: {
		animation: 'x 500ms 0s 1',
		animationName: bounceKeyframes1,
		backgroundColor: '$color.danger.base'
	}
}).addSelector({
	condition: 'evaluation-empty',
	common: {
		animation: 'x 500ms 0s 1',
		animationName: bounceKeyframes2,
		backgroundColor: '$color.danger.base'
	}
}).addSelector({
	condition: 'evaluation-valid',
	common: {
		animation: 'x 500ms 0s 1',
		animationName: bounceKeyframes3,
		backgroundColor: '$color.success.base'
	}
})

module.exports = sheet;
