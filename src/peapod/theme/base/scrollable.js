import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('horizontal').addProps({horizontal: true});
sheet.addCondition('height').addProps({height: ['!=', undefined]});
sheet.addCondition('center').addStyler({center: true});

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
		overflowY: 'hidden',
    	whiteSpace: 'nowrap',
    	height: '600px'
	}
}).addSelector({
	condition: ['center'],
	common: {
		textAlign: 'center'
	}
}).addSelector({
	condition: ['height'],
	common: {
		maxHeight: 'getProp:height'
	}
});

module.exports = sheet;
