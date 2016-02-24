import {Sheet} from '../../stylesheet.jsx';
import Radium from 'radium';

var sheet = new Sheet,
	main = sheet.addMain(),
    wrapper = sheet.addPart('wrapper'),
    message = sheet.addPart('message'),
    dismissIcon = sheet.addPart('dismissIcon');

sheet.addDoc(`# Purpose
	A component to make alerts.`)

sheet.addCondition('kindGeneral').addStyler({kind: 'general'});
sheet.addCondition('kindInfo').addStyler({kind: 'info'});
sheet.addCondition('kindSuccess').addStyler({kind: 'success'});
sheet.addCondition('kindWarning').addStyler({kind: 'warning'});
sheet.addCondition('kindDanger').addStyler({kind: 'danger'});

//Variables
sheet.setValues({
	common: {
		alert: {
			background: {
				general: '$palette.grey300',
                success: '$palette.lightGreen100',
                warning: '$palette.yellow100',
                info: '$palette.blue100',
                danger: '$palette.red100'
			}
		},
	}
});

main.addSelector({
    common: {
        fontSize: '13px',
        position: 'relative',
        padding: '1.3rem 4rem 1.3rem 1.5rem',
        borderRadius: '$border.radius.large',
        marginBottom: '$gutter.internal'
    }
}).addSelector({
    when: 'kindGeneral',
    common: {
        backgroundColor: '$alert.background.general'
    }
}).addSelector({
    when: 'kindSuccess',
    common: {
        backgroundColor: '$alert.background.success'
    }
}).addSelector({
    when: 'kindInfo',
    common: {
        backgroundColor: '$alert.background.info'
    }
}).addSelector({
    when: 'kindWarning',
    common: {
        backgroundColor: '$alert.background.warning'
    }
}).addSelector({
    when: 'kindDanger',
    common: {
        backgroundColor: '$alert.background.danger'
    }
})

dismissIcon.addSelector({
    common: {
        position: 'absolute',
        top: '0',
        right: '0',
        padding: '1.5rem',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: 'rgba(0,0,0,.4)',
        cursor: 'pointer',

        ':hover': {
            color: 'rgba(0,0,0,0.7)'
        }
    }
})

module.exports = sheet
