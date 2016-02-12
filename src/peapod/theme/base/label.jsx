import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain(),
	icon = sheet.addPart('icon');

//Variables
sheet.setValues({
	common: {
		label: {
			color: {
				text: '$color.text.white'
			}
		}
	}
});

sheet.addCondition('round').addStyler({round: true});

main.addSelector({
	common: {
		color: '$label.color.text',
		backgroundColor: '$color.general.base',
		display: 'inline-block',
		padding: '$gutter.internal'
	}
}).addSelector({
	when: ['round'],
	common: {
		borderRadius: '1000px'
	}
});

var choices = ['success', 'danger', 'info', 'warning', 'secondary', 'base'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('kind_' + choices[choiceIndex]).addStyler({kind: choices[choiceIndex]});
	main.addSelector({
		when: ['kind_' + choices[choiceIndex]],
		common: {
			backgroundColor: '$color.' + choices[choiceIndex] + '.base'
		}
	});
}

module.exports = sheet;
