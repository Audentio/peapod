import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
	                                            main = sheet.addMain(),
	                                            listitem = sheet.addPart('listitem');

	// Conditions

	// Variables
	                                        sheet.setValues({});


	                                        main.addSelector({
	                                            common: {},
	});

	                                        listitem.addSelector({
	                                            common: {
	                                                display: 'inline-block',
	                                                padding: '8px',
	    },
	});

	                                        return sheet;
};
