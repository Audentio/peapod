import {Sheet} from '../../stylesheet.js'
import Radium from 'radium'
import _ from 'lodash'

var sheet = new Sheet,
	main = sheet.addMain(),
    progress = sheet.addPart('progress');

//Conditions
sheet.addCondition('kindPrimary').addStyler({kind: 'primary'});
sheet.addCondition('kindSuccess').addStyler({kind: 'success'});
sheet.addCondition('kindInfo').addStyler({kind: 'info'})
sheet.addCondition('kindWarning').addStyler({kind: 'warning'});
sheet.addCondition('kindDanger').addStyler({kind: 'danger'});
sheet.addCondition('kindSecondary').addStyler({kind: 'secondary'});
sheet.addCondition('indeterminate').addProps({value: ['<','0']});
sheet.addCondition('strokeSet').addStyler({stroke: ['>', '0']});

//Variables
sheet.setValues({
	common: {
		progress: {
			height: 4
		}
	}
});

var indeterminateKeyframes = Radium.keyframes({
	'0%': {
		transform: 'translate3d(-100%, 0,0)'
	},
	'100%': {
		transform: 'translate3d(105%, 0,0)'
	}
}, 'indeterminate');


main.addSelector({
	common: {
		position: 'relative',
		zIndex: '1',
        width: '100%',
		height: '$progress.height',
        marginBottom: '$gutter.internal',
        overflow: 'hidden',
        borderRadius: '2px',
        backgroundColor: '$palette.grey200'
	}
}).addSelector({
	condition: ['strokeSet'],
	common: {
		height: 'getStyler:stroke'
	}
})

progress.addSelector({
    common: {
		transformOrigin: 'left',
        backgroundColor: '$color.base.base',
	    fill: '$color.base.base',
        height: '100%',
        width: '100%',
        transition: '.2s'
    }
}).addSelector({
    condition: 'kindPrimary',
    common: {
        fill: '$color.primary.base',
		backgroundColor: '$color.primary.base'
    }
}).addSelector({
    condition: 'kindSuccess',
    common: {
        fill: '$color.success.base',
		backgroundColor: '$color.success.base'
    }
}).addSelector({
    condition: 'kindInfo',
    common: {
        fill: '$color.info.base',
		backgroundColor: '$color.info.base'
    }
}).addSelector({
    condition: 'kindWarning',
    common: {
        fill: '$color.warning.active',
		backgroundColor: '$color.warning.active'
    }
}).addSelector({
    condition: 'kindDanger',
    common: {
        fill: '$color.danger.base',
		backgroundColor: '$color.danger.base'
    }
}).addSelector({
    condition: 'kindSecondary',
    common: {
        fill: '$color.secondary.base',
		backgroundColor: '$color.secondary.base'
    }
});

var generateGradient = function(color) {
	return `linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.69) 9%,rgba(0,0,0,0.82) 22%,rgba(0,0,0,1) 50%,rgba(0,0,0,0.82) 78%,rgba(0,0,0,0.69) 91%,rgba(0,0,0,0) 100%)`
}

progress.addSelector({
	condition: 'indeterminate',
	common: {
		//backgroundColor: 'transparent',
		WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.69) 9%,rgba(0,0,0,0.82) 22%,rgba(0,0,0,1) 50%,rgba(0,0,0,0.82) 78%,rgba(0,0,0,0.69) 91%,rgba(0,0,0,0) 100%)',
		backfaceVisibility: 'hidden',
		width: '100%',
		//animation: 'x 1500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s infinite',
		animation: 'x 1500ms ease 0s infinite',
		animationName: indeterminateKeyframes,
	}
});


module.exports = sheet;
