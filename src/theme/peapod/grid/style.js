var Pod_Vars = require('vars.js');

import { Sheet } from 'stylesheet.js';

module.exports = function (sheetName) {
	                                        var sheet = new Sheet(sheetName),
		                                        main = sheet.addMain();

	                                        main.addSelector({
		                                        common: {
			                                        display: 'flex',
			                                        flexDirection: 'row',
			                                        flexWrap: 'wrap',
			                                        justifyContent: 'flex-start',
			                                        alignItems: 'stretch',
			                                        alignContent: 'stretch',
		},
	});

	                                        sheet.addCondition('orderSet').addStyler({ order: ['!=', undefined] });
	                                        main.addSelector({
		                                        condition: ['orderSet'],
		                                        common: {
			                                        order: 'getStyler:order',
		},
	});

	                                        sheet.addCondition('flexSet').addStyler({ flex: ['!=', undefined] });
	                                        main.addSelector({
		                                        condition: ['flexSet'],
		                                        common: {
			                                        flex: 'getStyler:flex',
		},
	});

	// flex-direction
	                                        var choices = ['row', 'row-reverse', 'column', 'column-reverse'];
	                                        for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
		                                        sheet.addCondition('flexDirection_' + choices[choiceIndex]).addStyler({ flexDirection: choices[choiceIndex] });
		                                        main.addSelector({
			                                        condition: ['flexDirection_' + choices[choiceIndex]],
			                                        common: {
				                                        flexDirection: choices[choiceIndex],
			},
		});
	}

	// flex-wrap
	                                        var choices = ['nowrap', 'wrap', 'wrap-reverse'];
	                                        for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
		                                        sheet.addCondition('flexWrap_' + choices[choiceIndex]).addStyler({ flexWrap: choices[choiceIndex] });
		                                        main.addSelector({
			                                        condition: ['flexWrap_' + choices[choiceIndex]],
			                                        common: {
				                                        flexWrap: choices[choiceIndex],
			},
		});
	}

	// justify-content
	                                        var choices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
	                                        for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
		                                        sheet.addCondition('justifyContent_' + choices[choiceIndex]).addStyler({ justifyContent: choices[choiceIndex] });
		                                        main.addSelector({
			                                        condition: ['justifyContent_' + choices[choiceIndex]],
			                                        common: {
				                                        justifyContent: choices[choiceIndex],
			},
		});
	}

	// align-items
	                                        var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
	                                        for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
		                                        sheet.addCondition('alignItems_' + choices[choiceIndex]).addStyler({ alignItems: choices[choiceIndex] });
		                                        main.addSelector({
			                                        condition: ['alignItems_' + choices[choiceIndex]],
			                                        common: {
				                                        alignItems: choices[choiceIndex],
			},
		});
	}

	// align-content
	                                        var choices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
	                                        for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
		                                        sheet.addCondition('alignContent_' + choices[choiceIndex]).addStyler({ alignContent: choices[choiceIndex] });
		                                        main.addSelector({
			                                        condition: ['alignContent_' + choices[choiceIndex]],
			                                        common: {
				                                        alignContent: choices[choiceIndex],
			},
		});
	}

	// flex item align-self
	                                        var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
	                                        for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
		                                        sheet.addCondition('alignSelf_' + choices[choiceIndex]).addStyler({ alignSelf: choices[choiceIndex] });
		                                        main.addSelector({
			                                        condition: ['alignSelf_' + choices[choiceIndex]],
			                                        common: {
				                                        alignSelf: choices[choiceIndex],
			},
		});
	}

	                                        return sheet;
};
