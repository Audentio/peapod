import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
	                                            main = sheet.addMain();

	// Conditions

	// Variables
	                                        sheet.setValues({});

	                                        main.addSelector({
	                                            common: {
	                                                maxHeight: 200,
	                                                overflowX: 'hidden',
	                                                overflowY: 'auto',
	        // marginLeft: '-16px',
	        // marginRight: '-16px',
	        // marginTop: '-16px',
	        // marginBottom: '-16px',
	                                                borderTopWidth: '1px',
	                                                borderBottomWidth: '1px',
	                                                borderStyle: 'solid',
	                                                borderColor: '$palette.grey200',
	    },
	});

	                                        return sheet;
};
