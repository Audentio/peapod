var Pod_Vars = require('../../vars.jsx');

var style = [
	//flex item order
	{
		styler: { order: ['!=', ''] },
		global: {
			order: 'getStyler:order'
		}
	},

	//flex item flex
	{
		styler: { flex: ['!=', ''] },
		global: {
			flex: 'getStyler:flex'
		}
	},

]


//flex item align-self
var choices = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
for (var choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) { // loop through all choices
	style.push({
		styler: { alignSelf: choices[choiceIndex] },
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
			styler: { [abbrevs[sizeIndex]]: i },
			global: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: { width: (100 * (i / 12)) + '%' }
			}
		})
		style.push({
			styler: { [abbrevs[sizeIndex] + 'Push']: i },
			global: {
				[Pod_Vars.get('grid.' + sizes[sizeIndex])]: {
					position: 'relative',
					left: (100 * (i / 12)) + '%'
				}
			}
		})
		style.push({
			styler: { [abbrevs[sizeIndex] + 'Pull']: i },
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
