import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Variables
sheet.setValues({
	global: {
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
	when: ['sizeSet'],
	common: {
		fontSize: 'getStyler:size',
	}
}).addSelector({
	when: ['colorSet'],
	common: {
		color: 'getStyler:color',
	}
})


module.exports = sheet;
