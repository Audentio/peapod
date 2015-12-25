module.exports = [
	{
		global: {
			display: 'table',
			width: '100%',
		}
	},


	{
		subComponent: 'row',
		global: {
			display: 'table-row',
			color: '$table.color.lightRow.color',
			background: '$table.color.lightRow.background',
		}
	}, {
		subComponent: 'row',
		styler: {
			dark: true
		},
		global: {
			color: '$table.color.darkRow.color',
			background: '$table.color.darkRow.background',
		}
	}, {
		subComponent: 'row',
		styler: {
			hovered: true
		},
		global: {
			color: '$table.color.darkRow.color',
			background: '$table.color.darkRow.hover',
		}
	}, {
		subComponent: 'row',
		styler: {
			header: true
		},
		global: {
			color: '$table.color.header.color',
			background: '$table.color.header.background'
		}
	}, {
		subComponent: 'row',
		styler: {
			checked: true
		},
		global: {
			color: '$table.color.checked.color',
			background: '$table.color.checked.background',
		}
	},


	{
		subComponent: 'cell',
		global: {
			display: 'table-cell',
			paddingTop: '$table.gutter.vertical',
			paddingBottom: '$table.gutter.vertical',
			paddingLeft: '$table.gutter.horizontal',
			paddingRight: '$table.gutter.horizontal',
			fontSize: '$table.font.size',
			fontFamily: '$table.font.family',
			borderWidth: '$table.border.width',
			borderStyle: '$table.border.style',
			borderColor: '$table.border.color',
			borderLeftWidth: 0,
			borderTopWidth: 0
		}
	}, {
		subComponent: 'cell',
		styler: {
			firstCell: true
		},
		global: {
			borderLeftWidth: '$table.border.width'
		}
	}, {
		subComponent: 'cell',
		styler: {
			centered: true
		},
		global: {
			textAlign: 'center'
		}
	}, {
		subComponent: 'cell',
		styler: {
			header: true,
		},
		global: {
			borderLeftWidth: 0,
			borderRightWidth: 0,
		}
	}
]
