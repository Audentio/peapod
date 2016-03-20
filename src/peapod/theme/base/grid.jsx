var Pod_Vars = require('../../vars.jsx');

import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet,
	main = sheet.addMain();

//Variables
sheet.setValues({
	common: {
		grid: {
			breakpoints: {
				small: '610',
				medium: '800',
				large: '1024',
				xlarge: '1500'
			},
			xsmall: '@media (min-width: 1px)',
			small: '@media (min-width: 610px)',
			medium: '@media (min-width: 800px)',
			large: '@media (min-width: 1024px)',
			xlarge: '@media (min-width: 1500px)',
			smallLt: '@media (max-width: 609px)',
			mediumLt: '@media (max-width: 799px)',
			largeLt: '@media (max-width: 1023px)',
			xlargeLt: '@media (max-width: 1499px)'
		},
	}
});

main.addSelector({
	common: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		alignContent: 'stretch'
	}
});

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

//flex-direction
var choices = ['row', 'row-reverse', 'column', 'column-reverse'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('flexDirection_' + choices[choiceIndex]).addStyler({flexDirection: choices[choiceIndex]});
	main.addSelector({
		condition: ['flexDirection_' + choices[choiceIndex]],
		common: {
			flexDirection: choices[choiceIndex]
		}
	});
}

//flex-wrap
var choices = ['nowrap', 'wrap', 'wrap-reverse'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('flexWrap_' + choices[choiceIndex]).addStyler({flexWrap: choices[choiceIndex]});
	main.addSelector({
		condition: ['flexWrap_' + choices[choiceIndex]],
		common: {
			flexWrap: choices[choiceIndex]
		}
	});
}

//justify-content
var choices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('justifyContent_' + choices[choiceIndex]).addStyler({justifyContent: choices[choiceIndex]});
	main.addSelector({
		condition: ['justifyContent_' + choices[choiceIndex]],
		common: {
			justifyContent: choices[choiceIndex]
		}
	});
}

//align-items
var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('alignItems_' + choices[choiceIndex]).addStyler({alignItems: choices[choiceIndex]});
	main.addSelector({
		condition: ['alignItems_' + choices[choiceIndex]],
		common: {
			alignItems: choices[choiceIndex]
		}
	});
}

//align-content
var choices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	sheet.addCondition('alignContent_' + choices[choiceIndex]).addStyler({alignContent: choices[choiceIndex]});
	main.addSelector({
		condition: ['alignContent_' + choices[choiceIndex]],
		common: {
			alignContent: choices[choiceIndex]
		}
	});
}

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
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: { width: (100 * (i / 12)) + '%' }
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
