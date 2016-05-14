import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
		                                        main = sheet.addMain();

	                                        main.addSelector({
		                                        common: {
			                                        height: '1px',
			                                        borderWidth: 0,
			                                        backgroundColor: '$palette.grey200',
			                                        margin: '{$gutter.internal} auto', // in case someone puts a width it will center
		},
	});

	                                        return sheet;
};
