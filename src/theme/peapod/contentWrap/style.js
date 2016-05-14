import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
	                                            main = sheet.addMain();

	// Conditions

	// Variables
	                                        sheet.setValues({
	                                            maxWidth: '$site.maxWidth',
	                                            width: '95%',
	});


	                                        main.addSelector({
	                                            common: {
	                                                maxWidth: '$contentWrap.maxWidth',
	                                                width: '$contentWrap.width',
	                                                margin: '0 auto',
	    },
	});

	                                        return sheet;
};
