import {Sheet} from 'stylesheet.js'

module.exports = function(sheetName) {

	var sheet = new Sheet(sheetName),
		main = sheet.addMain(),
		submit = sheet.addPart('submit'),
		form = sheet.addPart('form'),
		overlay = sheet.addPart('overlay');

	sheet.addCondition('disabled').addState({disabled: true});

	form.addSelector({
		common: {
			position: 'relative',
			paddingTop: 15
		}
	})

	overlay.addSelector({
		common: {
			backgroundColor: 'rgba(255,255,255, 0.5)',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 10,
			visibility: 'hidden',
			transition: '.2s',
			opacity: 0
		}
	})

	overlay.addSelector({
		condition: 'disabled',
		common: {
			visibility: 'visible',
			opacity: 1
		}
	})

	submit.addSelector({
		common: {
			display: 'none'
		}
	})

	return sheet;
}