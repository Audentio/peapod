import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	row = sheet.addPart('row');

//Conditions
sheet.addCondition('dark').addStyler({dark: true});
sheet.addCondition('hovered').addStyler({hovered: true});
sheet.addCondition('header').addStyler({header: true});
sheet.addCondition('checked').addStyler({checked: true});

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		display: 'table',
		width: '100%',
		fontSize: '$table.font.size'
	}
});

row.addSelector({
	common: {
		display: 'table-row',
		color: '$table.color.lightRow.color',
		background: '$table.color.lightRow.background'
	}
}).addSelector({
	when: ['dark'],
	common: {
		color: '$table.color.darkRow.color',
		background: '$table.color.darkRow.background',
	}
}).addSelector({
	when: ['hovered'],
	common: {
		color: '$table.color.darkRow.color',
		background: '$table.color.darkRow.hover',
	}
}).addSelector({
	when: ['header'],
	common: {
		color: '$table.color.header.color',
		background: '$table.color.header.background',
		fontFamily: '$table.font.headerFamily',
		fontSize: '$table.font.headerSize',
		textTransform: 'uppercase'
	}
}).addSelector({
	when: ['checked'],
	common: {
		color: '$table.color.checked.color',
		background: '$table.color.checked.background',
	}
});

module.exports = sheet;