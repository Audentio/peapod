import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain();

	//Conditions

	//Variables

	main.addSelector({
	    common: {
	        borderWidth: '1px',
	        backgroundColor: '$palette.white',
	        padding: '$font.size.xxxlarge',
	        boxShadow: '0 1px 2px rgba(0,0,0,.2)',
	        display: 'inline-block',
	        textAlign: 'left',
	        maxWidth: '400px'
	    }
	});

	return sheet;
}
