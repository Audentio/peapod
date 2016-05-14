import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
		                                        main = sheet.addMain();

	// Conditions

	// Variables
	                                        sheet.setValues({});

	                                        main.addSelector({
		                                        common: {
			                                        display: 'block',
			                                        marginBottom: '$gutter.internal',
			                                        backgroundColor: '$palette.grey100',
			                                        padding: '$gutter.internal',
			                                        fontFamily: '$font.family.code',
			                                        fontSize: '$font.size.small',
			                                        border: 0,
		},
	});

	                                        return sheet;
};
