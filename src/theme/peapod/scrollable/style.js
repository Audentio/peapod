import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
		                                        main = sheet.addMain();

	// Conditions
	                                        sheet.addCondition('horizontal').addProp({ horizontal: true });
	                                        sheet.addCondition('height').addProp({ height: ['!=', undefined] });
	                                        sheet.addCondition('center').addStyler({ center: true });

	// Variables
	                                        sheet.setValues({});


	                                        main.addSelector({
		                                        common: {
			                                        overflowX: 'hidden',
			                                        overflowY: 'auto',
		},
	}).addSelector({
		                                        condition: ['horizontal'],
		                                        common: {
			                                        overflowX: 'auto',
			                                        overflowY: 'hidden',
	    	                                        whiteSpace: 'nowrap',
	    	                                        height: '600px',
		},
	}).addSelector({
		                                        condition: ['center'],
		                                        common: {
			                                        textAlign: 'center',
		},
	}).addSelector({
		                                        condition: ['height'],
		                                        common: {
			                                        maxHeight: 'getProp:height',
		},
	});

	                                        return sheet;
};
