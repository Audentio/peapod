import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain();

	//Conditions
	sheet.addCondition('positionRight').addStyler({position: 'right'});
	sheet.addCondition('positionLeft').addStyler({position: 'left'});

	main.addSelector({
	    common: {
	        display: 'block',
	        width: '100vw',
	        height: '100vh',
	        background: 'rgba(255,255,255,0.5)'
	    }
	}).addSelector({
	    condition: ['positionLeft'],
	    common: {
	        width: '50vw',
	        float: 'left'
	    }
	}).addSelector({
	    condition: ['positionRight'],
	    common: {
	        width: '50vw',
	        float: 'right'
	    }
	});

	return sheet;
}
