import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('firstCell').addStyler({firstCell: true});
sheet.addCondition('centered').addStyler({centered: true});
sheet.addCondition('hovered').addStyler({hovered: true});
sheet.addCondition('sortable').addStyler({sortable: true});
sheet.addCondition('noData').addStyler({noData: true})

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		display: 'table-cell',
		paddingTop: '$table.gutter.vertical',
		paddingBottom: '$table.gutter.vertical',
		paddingLeft: '$table.gutter.horizontal',
		paddingRight: '$table.gutter.horizontal',
		fontSize: 'inherit',
		fontFamily: '$table.font.family',
		borderWidth: '$table.border.width',
		borderStyle: '$table.border.style',
		borderColor: '$table.border.color',
		borderLeftWidth: 0,
		borderTopWidth: 0
	}
}).addSelector({
	when: ['firstCell'],
	common: {
		borderLeftWidth: '$table.border.width'
	}
}).addSelector({
	when: ['centered'],
	common: {
		textAlign: 'center'
	}
}).addSelector({
	when: ['hovered', 'sortable'],
	common: {
		color: '$table.color.columnHovered.color',
		background: '$table.color.columnHovered.background',
	}
}).addSelector({
	when: ['header'],
	common: {
		borderLeftWidth: 0,
		borderRightWidth: 0,
	}
}).addSelector({
	when: ['header', 'hovered', 'sortable'],
	common: {
		color: '$table.color.columnHovered.headerColor',
		background: '$table.color.columnHovered.headerBackground',
		cursor: 'pointer'
	}
}).addSelector({
	when: ['noData'],
	common: {
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderTopWidth: 0
	}
})

module.exports = sheet;
