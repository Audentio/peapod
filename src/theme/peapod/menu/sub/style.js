import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
	    main = sheet.addMain();

	//Variables
	sheet.setValues({});

	main.addSelector({
	    common: {
	        background: '#fff',
	        boxShadow: '$shadows.d1',
	        padding: '16px 0',
	        borderRadius: '$border.radius.small',
	        zIndex: 3,
	        position: 'absolute',
	        whiteSpace: 'nowrap',
	        transform: 'translate(0, -48px)',
	        left: '100%'
	    }
	});

	return sheet;
}
