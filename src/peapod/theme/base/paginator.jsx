module.exports = [
	{
		global: {
			fontSize: '$paginator.font.size',
			fontFamily: '$paginator.font.family',
			display: 'inline-block'
		}
	}, {
		subComponent: 'trigger',
		global: {
			paddingLeft: '$gutter.internal',
			paddingRight: '$gutter.internal',
			fontSize: '$paginator.font.triggerSize'
		}
	}, {
		subComponent: 'label',
		global: {
			paddingLeft: '$gutter.internal',
			paddingRight: '$gutter.internal',
			borderColor: '$paginator.border.color',
			borderStyle: '$paginator.border.style',
			borderTopWidth: '0',
			borderBottomWidth: '0',
			borderLeftWidth: '$paginator.border.width',
			borderRightWidth: '$paginator.border.width'
		}
	}
]
