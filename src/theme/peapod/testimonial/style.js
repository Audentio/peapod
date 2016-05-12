import {Sheet} from 'stylesheet.js';

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName);
	var main = sheet.addMain();
	var photo = sheet.addPart('photo');
	var blockQuote = sheet.addPart('blockQuote');

	sheet.addCondition('kindGeneral').addStyler({kind: 'general'});
	sheet.addCondition('kindInfo').addStyler({kind: 'info'});
	sheet.addCondition('kindSuccess').addStyler({kind: 'success'});
	sheet.addCondition('kindWarning').addStyler({kind: 'warning'});
	sheet.addCondition('kindDanger').addStyler({kind: 'danger'});

	//Variables
	sheet.setValues({})

	main.addSelector({
	    common: {
	        textAlign: 'center'
	    }
	})
	photo.addSelector({
	    common: {
	        maxHeight: '100px',
	        maxWidth: '100px',
	        borderRadius: '1000px'
	    }
	})
	blockQuote.addSelector({
	    common: {
	        background: 'transparent',
	        border: 'none'
	    }
	});

	return sheet;
}
