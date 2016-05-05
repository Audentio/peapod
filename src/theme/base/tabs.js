import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('tabs'),
	main = sheet.addMain(),
	trigger = sheet.addPart('trigger'),
	panel = sheet.addPart('panel'),
	triggers = sheet.addPart('triggers'),
	panels = sheet.addPart('panels');

//Conditions
sheet.addCondition('active').addStyler({active: true});
sheet.addCondition('inactive').addStyler({active: false});

//Variables
sheet.setValues({});

//Selectors
main.addSelector({
	common: {
		borderLeft: '10px solid {$color.primary.base}'
	}
});

trigger.addSelector({
	common: {
		display: 'inline-block',
		padding: '$gutter.internal',
		backgroundColor: '$color.base.hover',
		color: '#FFF',
		marginRight: '1px',
		cursor: 'pointer',
	}
}).addSelector({
	condition: ['active'],
	common: {
		color: '#FFF',
		backgroundColor: '$color.base.base',
	}
});

panel.addSelector({
	condition: ['inactive'],
	common: {
		display: 'none'
	}
});

triggers.addSelector({
	common: {
		backgroundColor: '$color.base.table',
		marginTop: '{$gutter.internal}',
		padding: '0 {$gutter.internal}',
	}
});

panels.addSelector({
	common: {
		padding: '{$gutter.internal}',
	}
});

module.exports = sheet;
