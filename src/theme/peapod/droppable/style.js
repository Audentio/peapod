import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain();

	//Conditions

	//Variables
	sheet.setValues({});

	main.addSelector({
	    common: {
	        width:'100%',
	        height: '300px',
	        background: '#efefef',
	        padding:'30px',
	        fontSize: '3em'
	    }
	});
}
