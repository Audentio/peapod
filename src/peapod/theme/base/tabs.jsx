import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	trigger = sheet.addPart('trigger'),
	panel = sheet.addPart('panel'),
	wrapper = sheet.addPart('wrapper'),
	triggers = sheet.addPart('triggers'),
	panels = sheet.addPart('panels'),
	wrapper = sheet.addPart('wrapper');

//Conditions
sheet.addCondition('active').addStyler({active: true});
sheet.addCondition('inactive').addStyler({active: false});

//Variables
sheet.setValues({});

//Selectors
trigger.addSelector({
	common: {
		display: 'inline-block',
		padding: '$gutter.internal',
		backgroundColor: '$color.base.hover',
		color: '#FFF',
		marginRight: '1px'
	}
}).addSelector({
	when: ['active'],
	common: {
		color: '#FFF',
		backgroundColor: '$color.base.base'
	}
});

panel.addSelector({
	when: ['inactive'],
	common: {
		display: 'none'
	}
})

triggers.addSelector({
	common: {
		backgroundColor: '$color.base.table',
		marginTop: '{$gutter.internal}',
		padding: '0 {$gutter.internal}',
	}
})

panels.addSelector({
	common: {
		padding: '{$gutter.internal}',
	}
});

wrapper.addSelector({
	common: {
		borderLeft: '10px solid {$color.primary.base}'
	}
})

module.exports = sheet;
