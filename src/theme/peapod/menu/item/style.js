import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName);
	                                        var main = sheet.addMain();
	                                        var anchor = sheet.addPart('anchor');
	                                        var subtext = sheet.addPart('subtext');

	// Variables
	                                        sheet.setValues({});

	                                        main.addSelector({
	                                            common: {
	                                                height: '$gutter.large',
	                                                lineHeight: '$gutter.large',
	                                                paddingLeft: '$gutter.small',
	                                                paddingRight: '$gutter.small',
	                                                background: '$palette.white',
	                                                width: '100%',
	                                                position: 'relative',

	                                                ':hover': {
	                                                    background: '$palette.grey100',
	        },
	    },
	});

	                                        subtext.addSelector({
	                                            common: {
	                                                position: 'absolute',
	                                                top: 0, right: '$gutter.small',
	    },
	});

	                                        anchor.addSelector({
	                                            common: {
	                                                textDecoration: 'none',
	                                                color: 'inherit',
	                                                display: 'inline-block',
	                                                width: '100%',
	                                                height: '100%',
	    },
	});

	                                        return sheet;
};
