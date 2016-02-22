import {Sheet} from '../../stylesheet.jsx'
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
sheet.addCondition('indeterminate').addProps({indeterminate: true});

//Variables
sheet.setValues({
	common: {
		progress: {
            height: '4px'
        }
	}
});

/*
var indeterminateKeyframes = Radium.keyframes({
	'0%': { transform: 'scaleX(.25) translateX(-100%)' },
	'100%': { transform: 'scaleX(.25) translateX(400%)', animationTimingFunction: 'steps(1, end)' },
}, 'indeterminate');*/

var indeterminateKeyframes = Radium.keyframes({
	'0%': {
		transform: 'scaleX(.5) translate3d(-100%, 0,0)'
	},
	'100%': {
		transform: 'scaleX(.5) translate3d(200%, 0,0)',
		animationTimingFunction: 'steps(1, end)'
	}
}, 'indeterminate');


main.addSelector({
	common: {
		position: 'relative',
		zIndex: '1',
        width: '100%',
        marginBottom: '$gutter.internal',
        overflow: 'hidden',
        borderRadius: '2px',
        backgroundColor: '$palette.grey200'
	}
}).addSelector({
	when: 'indeterminate',
	common: {
		height: '4px'
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
    when: 'kindPrimary',
    common: {
        fill: '$color.primary.base',
		backgroundColor: '$color.primary.base'
    }
}).addSelector({
    when: 'kindSuccess',
    common: {
        fill: '$color.success.base',
		backgroundColor: '$color.success.base'
    }
}).addSelector({
    when: 'kindInfo',
    common: {
        fill: '$color.info.base',
		backgroundColor: '$color.info.base'
    }
}).addSelector({
    when: 'kindWarning',
    common: {
        fill: '$color.warning.active',
		backgroundColor: '$color.warning.active'
    }
}).addSelector({
    when: 'kindDanger',
    common: {
        fill: '$color.danger.base',
		backgroundColor: '$color.danger.base'
    }
}).addSelector({
    when: 'kindSecondary',
    common: {
        fill: '$color.secondary.base',
		backgroundColor: '$color.secondary.base'
    }
});

progress.addSelector({
	when: 'indeterminate',
	common: {
		animation: 'x 1500ms cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s infinite',
		animationName: indeterminateKeyframes,
	}
});


module.exports = sheet;
