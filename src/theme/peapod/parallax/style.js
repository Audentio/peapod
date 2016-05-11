import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain(),
	    front = sheet.addPart('front'),
	    back = sheet.addPart('back');

	//Conditions
	//Variables
	sheet.setValues({
	    height: '100vh',
	    width: '100vw'
	});

	main.addSelector({
	    common: {
	        height: '$parallax.height',
	        width: '$parallax.width',
	        perspective: '1px',
	        overflow: 'hidden',
	        position: 'relative'
	    }
	});
	front.addSelector({
	    common: {
	        height: 'calc( ' + Pod_Vars.get('parallax.height') + ' * 2)',
	        width: '$parallax.width',
	        position: 'absolute',
	        top: 0, left: 0,
	        transform: 'translateZ(0)',
	    }
	});
	back.addSelector({
	    common: {
	        height: 'calc( ' + Pod_Vars.get('parallax.height') + ' * 2)',
	        width: '$parallax.width',
	        position: 'absolute',
	        top: 0, left: 0,
	        transform: 'translateZ(-2px) scale(3)'
	    }
	});
}
