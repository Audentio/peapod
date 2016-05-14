import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
		                                        main = sheet.addMain();

	// Conditions

	// Variables
	                                        sheet.setValues({});


	                                        main.addSelector({
		                                        common: {
			                                        background: '$palette.grey100',
			                                        padding: '$gutter.small',
			                                        borderLeftWidth: '5px',
			                                        borderLeftStyle: 'solid',
			                                        borderLeftColor: '$color.primary.base',
			                                        marginLeft: '$gutter.large',
		},
	});

	                                        return sheet;
};
