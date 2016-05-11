import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain();

	//Conditions
	sheet.addCondition('inline').addStyler({inline: true});
	sheet.addCondition('indent').addStyler({indent: ['!=', '']});
	sheet.addCondition('outdent').addStyler({outdent: ['!=', '']});


	//Variables
	sheet.setValues({});

	main.addSelector({
	    common: {
	        marginTop: '8px',
	        marginBottom: '8px',
	        height: '1px',
	        background: '$palette.grey200' // 12% black
	    }
	}).addSelector({
	    condition: ['inline'],
	    common: {
	        marginTop: '0px',
	        marginBottom: '0px'
	    }
	}).addSelector({
	    condition: ['indent'],
	    common: {
	        marginLeft: 'getStyler:indent'
	    }
	}).addSelector({
	    condition: ['outdent'],
	    common: {
	        marginRight: 'getStyler:outdent'
	    }
	});

	return sheet;
}
