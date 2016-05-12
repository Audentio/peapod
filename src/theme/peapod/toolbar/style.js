import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain();

	//Conditions

	//Variables

	main.addSelector({
	    common: {
	        padding: '16px',
	        borderBottom: '1px solid #ddd',
	        background: '#fff'
	    }
	});

	return sheet;
}
