import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
	                                            main = sheet.addMain();

	// Conditions

	// Variables

	                                        main.addSelector({
	                                            common: {
	                                                backgroundColor: 'rgba(0,0,0,.4)',
	                                                position: 'fixed',
	                                                top: 0, right: 0,
	                                                bottom: 0, left:0,
	    },
	});

	                                        return sheet;
};
