import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet,
	main = sheet.addMain();

//Variables
sheet.setValues({
	common: {
		icon: {
			font: {
				size: 'inherit'
			},
			color: 'inherit'
		},
	}
});

sheet.addCondition('sizeSet').addStyler({size: ['!=', '']});
sheet.addCondition('colorSet').addStyler({color: ['!=', '']});

main.addSelector({
	common: {
		cursor: 'default',
		fontSize: '$icon.font.size',
	}
}).addSelector({
	condition: ['sizeSet'],
	common: {
		fontSize: 'getStyler:size',
	}
}).addSelector({
	condition: ['colorSet'],
	common: {
		color: 'getStyler:color',
	}
})


module.exports = sheet;
