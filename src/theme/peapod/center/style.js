import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain(),
	    outer = sheet.addPart('outer'),
	    inner = sheet.addPart('inner');

	//Conditions

	//Variables

	main.addSelector({
	    common: {
	        display: 'table',
	        width: '100%',
	        height: '100%'
	    }
	})

	inner.addSelector({
	    common: {
	        display: 'table-cell',
	        verticalAlign: 'middle',
	        textAlign: 'center'
	    }
	})

	return sheet;
}
