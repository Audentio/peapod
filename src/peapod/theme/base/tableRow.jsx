import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Conditions
sheet.addCondition('dark').addStyler({darl: true});
sheet.addCondition('notHeader').addStyler({header: false});
sheet.addCondition('header').addStyler({header: true});
sheet.addCondition('checked').addStyler({checked: true});

//Variables
sheet.setValues({});

main.addSelector({
	common: {
		display: 'table-row',
		color: '$table.color.lightRow.color',
		background: '$table.color.lightRow.background',
	}
}).addSelector({
	when: ['dark'],
	common: {
		color: '$table.color.darkRow.color',
		background: '$table.color.darkRow.background',
	}
}).addSelector({
	when: ['notHeader'],
	common: {
		':hover': {
			background: '$table.color.lightRow.hover'
		}
	}
}).addSelector({
	when: ['dark', 'notHeader'],
	common: {
		':hover': {
			background: '$table.color.darkRow.hover'
		}
	}
}).addSelector({
	when: ['checked'],
	common: {
		color: '$table.color.checked.color',
		background: '$table.color.checked.background',
		':hover': {
			background: '$table.color.checked.hover'
		}
	}
}).addSelector({
	when: ['header'],
	common: {
		color: '$table.color.header.color',
		background: '$table.color.header.background',
		':hover': {
			background: '$table.color.header.hover'
		}
	}
})

module.exports = sheet;
