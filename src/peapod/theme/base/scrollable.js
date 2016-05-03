import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('horizontal').addStyler({horizontal: true});
sheet.addCondition('height').addProps({height: ['!=', undefined]});

//Variables
sheet.setValues({
	common: {}
});


main.addSelector({
	common: {
		overflowX: 'hidden',
		overflowY: 'auto'
	}
}).addSelector({
	condition: ['horizontal'],
	common: {
		overflowX: 'auto',
		overflowY: 'hidden'
	}
}).addSelector({
	condition: ['height'],
	common: {
		maxHeight: 'getProp:height'
	}
});

module.exports = sheet;
