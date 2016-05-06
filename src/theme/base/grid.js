var Pod_Vars = require('../../vars.js');

import {Sheet} from '../../stylesheet.js';

var sheet = new Sheet('grid'),
	main = sheet.addMain();

//Variables
sheet.setValues({
	breakpoints: {
		small: '610',
		medium: '800',
		large: '1024',
		xlarge: '1500'
	},
	xsmall: '@media (minWidth: 1px)',
	small: '@media (minWidth: 610px)',
	medium: '@media (minWidth: 800px)',
	large: '@media (minWidth: 1024px)',
	xlarge: '@media (minWidth: 1500px)',
	smallLt: '@media (maxWidth: 609px)',
	mediumLt: '@media (maxWidth: 799px)',
	largeLt: '@media (maxWidth: 1023px)',
	xlargeLt: '@media (maxWidth: 1499px)'
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

sheet.addCondition('flexSet').addStyler({flex: ['!=', undefined]});
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

module.exports = sheet;
