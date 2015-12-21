var Pod_Vars = require('../../mixins/vars.jsx');

var style = [
	//base style
	{
		global: {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
			alignItems: 'stretch',
			alignContent: 'stretch'
		}
	},

	//flex item order
	{
		props: { order: ['!=', ''] },
		global: {
			order: 'getStyle:order'
		}
	},

	//flex item flex
	{
		childEle: 'global',
		props: { flex: ['!=', ''] },
		global: {
			flex: 'getStyle:flex'
		}
	},

]

//flex-direction
var choices = ['row', 'row-reverse', 'column', 'column-reverse'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		props: { flexDirection: choices[choiceIndex] },
		global: {
			flexDirection: choices[choiceIndex]
		}
	})
}

//flex-wrap
var choices = ['nowrap', 'wrap', 'wrap-reverse'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		props: { flexWrap: choices[choiceIndex] },
		global: {
			flexWrap: choices[choiceIndex]
		}
	})
}

//justify-content
var choices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		props: { justifyContent: choices[choiceIndex] },
		global: {
			justifyContent: choices[choiceIndex]
		}
	})
}

//align-items
var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		props: { alignItems: choices[choiceIndex] },
		global: {
			alignItems: choices[choiceIndex]
		}
	})
}

//align-content
var choices = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		props: { alignContent: choices[choiceIndex] },
		global: {
			alignContent: choices[choiceIndex]
		}
	})
}

//flex item align-self
var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		props: { alignSelf: choices[choiceIndex] },
		global: {
			alignSelf: choices[choiceIndex]
		}
	})
}

var sizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'],
	abbrevs = ['xs', 'sm', 'md', 'lg', 'xl']

for (var sizeIndex = 0; sizeIndex < sizes.length; sizeIndex++) { // loop through all choices
	for (var i = 0; i < 13; i++) { // loop through size values
		style.push({
			props: { [abbrevs[sizeIndex]]: i },
			global: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: { width: (100 * (i / 12)) + '%' }
			}
		})
		style.push({
			props: { [abbrevs[sizeIndex] + 'Push']: i },
			global: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: {
					position: 'relative',
					left: (100 * (i / 12)) + '%'
				}
			}
		})
		style.push({
			props: { [abbrevs[sizeIndex] + 'Pull']: i },
			global: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: {
					position: 'relative',
					left: (-100 * (i / 12)) + '%'
				}
			}
		})
	}
}

module.exports = style;
