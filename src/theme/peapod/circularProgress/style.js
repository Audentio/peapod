import {Sheet} from 'stylesheet.js'
import Radium from 'radium'
import _ from 'lodash'

module.exports = function(sheetName) {
	var sheet = new Sheet(sheetName),
		main = sheet.addMain(),
		wrapper = sheet.addPart('wrapper'),
		circle = sheet.addPart('circle'),
		mask = sheet.addPart('mask'),
		track = sheet.addPart('track'),
		content = sheet.addPart('content'),
		contentInner = sheet.addPart('contentInner');

	sheet.addDocDefault({
		value: Math.random() * 100,
		children: '%'
	})

	//Conditions
	sheet.addCondition('kindPrimary').addStyler({kind: 'primary'});
	sheet.addCondition('kindSuccess').addStyler({kind: 'success'});
	sheet.addCondition('kindInfo').addStyler({kind: 'info'})
	sheet.addCondition('kindWarning').addStyler({kind: 'warning'});
	sheet.addCondition('kindDanger').addStyler({kind: 'danger'});
	sheet.addCondition('kindSecondary').addStyler({kind: 'secondary'});
	sheet.addCondition('indeterminate').addProp({value: ['<','0']});

	sheet.addCondition('sizeSet').addStyler({size: ['>', '0']})
	sheet.addCondition('strokeSet').addStyler({stroke: ['>', '0']})

	//Variables
	sheet.setValues({
		stroke: 4,
		size: 50
	});

	main.addSelector({
		common: {
			width: '$circularProgress.size',
			height: '$circularProgress.size',
			fontSize: '$circularProgress.size',
			display: 'inline-block',
			position: 'relative',
			borderRadius: '50%',
			WebkitClipPath: 'circle(50% at 50% 50%)',
			clipPath: 'circle(50% at 50% 50%)',
			overflow: 'hidden'
		}
	}).addSelector({
		condition: 'sizeSet',
		common: {
			width: 'getStyler:size',
			height: 'getStyler:size',
			fontSize: 'getStyler:size'
		}
	})

	content.addSelector({
		common: {
			display: 'table',
			width: '100%',
			height: '100%',
			position: 'absolute',
			fontSize: '$font.size.normal'
		}
	})

	contentInner.addSelector({
		common: {
			display: 'table-cell',
			verticalAlign: 'middle',
			textAlign: 'center'
		}
	})

	track.addSelector({
		common: {
			width: '1em',
			height: '1em',
			position: 'absolute',
			borderWidth: '$circularProgress.stroke',
			borderStyle: 'solid',
			borderColor: '$palette.grey200',
			borderRadius: '50%'
		}
	}).addSelector({
		condition: 'strokeSet',
		common: {
			borderWidth: 'getStyler:stroke'
		}
	})

	var mask_circle = {
		width: '1em',
		height: '1em',
		transition: 'transform .2s linear',
		backfaceVisibility: 'hidden',
		position: 'absolute'
	}

	mask.addSelector({
		common: _.merge({}, mask_circle, {
			clip: 'rect(0 1em 1em .5em)'
		})
	})

	circle.addSelector({
		common: _.merge({}, mask_circle, {
			borderWidth: '$circularProgress.stroke',
			borderStyle: 'solid',
			borderColor: '$color.base.base',
			clip: 'rect(0 .5em 1em 0)',
			borderRadius: '50%',
		})
	}).addSelector({
		condition: 'strokeSet',
		common: {
			borderWidth: 'getStyler:stroke'
		}
	}).addSelector({
	    condition: 'kindPrimary',
	    common: {
			borderColor: '$color.primary.base'
	    }
	}).addSelector({
	    condition: 'kindSuccess',
	    common: {
			borderColor: '$color.success.base'
	    }
	}).addSelector({
	    condition: 'kindInfo',
	    common: {
			borderColor: '$color.info.base'
	    }
	}).addSelector({
	    condition: 'kindWarning',
	    common: {
			borderColor: '$color.warning.active'
	    }
	}).addSelector({
	    condition: 'kindDanger',
	    common: {
			borderColor: '$color.danger.base'
	    }
	}).addSelector({
	    condition: 'kindSecondary',
	    common: {
			borderColor: '$color.secondary.base'
	    }
	});

	return sheet;
}
