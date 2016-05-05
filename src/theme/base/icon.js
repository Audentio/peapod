import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('icon'),
	main = sheet.addMain();

//Variables
sheet.setValues({
	font: {
		size: 'inherit'
	},
	color: 'inherit'
});

sheet.addCondition('sizeSet').addStyler({size: ['!=', undefined]});
sheet.addCondition('colorSet').addStyler({color: ['!=', undefined]});

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
