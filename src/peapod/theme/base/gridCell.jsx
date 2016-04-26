var Pod_Vars = require('../../vars.jsx');

import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();



sheet.addCondition('orderSet').addStyler({order: ['!=', '']});
main.addSelector({
	condition: ['orderSet'],
	common: {
		order: 'getStyler:order'
	}
});

sheet.addCondition('flexSet').addStyler({flex: ['!=', '']});
main.addSelector({
	condition: ['flexSet'],
	common: {
		flex: 'getStyler:flex'
	}
});

//flex item align-self
var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('alignSelf_' + choices[choiceIndex]).addStyler({alignSelf: choices[choiceIndex]});
	main.addSelector({
		condition: ['alignSelf_' + choices[choiceIndex]],
		common: {
			alignSelf: choices[choiceIndex]
		}
	});
}

var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'],
	abbrevs = ['xs', 'sm', 'md', 'lg', 'xl']

for (var sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) { // loop through all choices
	for (var i = 0; i < 13; i++) { // loop through size values
		sheet.addCondition([abbrevs[sizeIndex]] + '_' + i).addStyler({[abbrevs[sizeIndex]]: i});
		main.addSelector({
			condition: [[abbrevs[sizeIndex]] + '_' + i],

			common: {
				["'" + Pod_Vars.get('grid.' + sizes[sizeIndex]) + "'"]: { width: (100 * (i / 12)) + '%' }
			}
		});

		sheet.addCondition([abbrevs[sizeIndex]] + 'Push_' + i).addStyler({[abbrevs[sizeIndex] + 'Push']: i});
		main.addSelector({
			condition: [[abbrevs[sizeIndex]] + 'Push_' + i],
			common: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: {
					position: 'relative',
					left: (100 * (i / 12)) + '%'
				}
			}
		});

		sheet.addCondition([abbrevs[sizeIndex]] + 'Pull_' + i).addStyler({[abbrevs[sizeIndex] + 'Pull']: i});
		main.addSelector({
			condition: [[abbrevs[sizeIndex]] + 'Pull_' + i],
			common: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: {
					position: 'relative',
					left: (-100 * (i / 12)) + '%'
				}
			}
		});
	}
}

module.exports = sheet;
