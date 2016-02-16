import {Sheet} from '../../stylesheet.jsx';
import Radium from 'radium';

var sheet = new Sheet,
	main = sheet.addMain(),
    wrapper = sheet.addPart('wrapper'),
    title = sheet.addPart('title'),
    message = sheet.addPart('message'),
    dismissIcon = sheet.addPart('dismissIcon');

sheet.addCondition('kindGeneral').addStyler({kind: 'general'});
sheet.addCondition('kindInfo').addStyler({kind: 'info'});
sheet.addCondition('kindSuccess').addStyler({kind: 'success'});
sheet.addCondition('kindWarning').addStyler({kind: 'warning'});
sheet.addCondition('kindDanger').addStyler({kind: 'danger'});

//Variables
sheet.setValues({
	common: {
		notification: {
			background: {
				general: '$color.base.base',
                success: '$color.success.base',
                warning: '$color.warning.active',
                info: '$color.info.base',
                danger: '$color.danger.base'
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
		position: 'fixed',
		width: '300px',
		bottom: '$gutter.internal',
		right: '$gutter.internal',
		zIndex: '999',
		color: 'rgba(255,255,255,.8)'
    }
}).addSelector({
    when: 'kindGeneral',
    common: {
        backgroundColor: '$notification.background.general'
    }
}).addSelector({
    when: 'kindSuccess',
    common: {
        backgroundColor: '$notification.background.success'
    }
}).addSelector({
    when: 'kindInfo',
    common: {
        backgroundColor: '$notification.background.info'
    }
}).addSelector({
    when: 'kindWarning',
    common: {
        backgroundColor: '$notification.background.warning'
    }
}).addSelector({
    when: 'kindDanger',
    common: {
        backgroundColor: '$notification.background.danger'
    }
})

title.addSelector({
    common: {
        display: 'block',
        marginBottom: '4px',
        color: 'white'
    }
})

dismissIcon.addSelector({
    common: {
		position: 'absolute',
		top: '12px',
		right: '11px',
		padding: '4px',
		fontWeight: 'bold',
		borderRadius: '50%',
		fontSize: '1.4rem',
		color: 'white',
		backgroundColor: 'rgba(255, 255, 255, 0.35)',
		cursor: 'pointer',

		':hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.2)'
		}
    }
})

module.exports = sheet
