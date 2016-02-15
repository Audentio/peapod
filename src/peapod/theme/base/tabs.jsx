import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	trigger = sheet.addPart('trigger'),
	panel = sheet.addPart('panel'),
	wrapper = sheet.addPart('wrapper'),
	triggers = sheet.addPart('triggers'),
	panels = sheet.addPart('panels');

//Conditions
sheet.addCondition('active').addStyler({active: true});
sheet.addCondition('inactive').addStyler({active: false});

//Variables
sheet.setValues({});

//Selectors
trigger.addSelector({
	common: {
		display: 'inline-block'
	}
}).addSelector({
	when: ['active'],
	common: {
		color: 'red'
	}
});

panel.addSelector({
	when: ['inactive'],
	common: {
		display: 'none'
	}
})

module.exports = sheet;
