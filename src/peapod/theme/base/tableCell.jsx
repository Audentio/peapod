module.exports = [
	{
		global: {
			display: 'table-cell',
			paddingTop: '$table.gutter.vertical',
			paddingBottom: '$table.gutter.vertical',
			paddingLeft: '$table.gutter.horizontal',
			paddingRight: '$table.gutter.horizontal',
			fontSize: 'inherit',
			fontFamily: '$table.font.family',
			borderWidth: '$table.border.width',
			borderStyle: '$table.border.style',
			borderColor: '$table.border.color',
			borderLeftWidth: 0,
			borderTopWidth: 0
		}
	}, {
		styler: {
			firstCell: true
		},
		global: {
			borderLeftWidth: '$table.border.width'
		}
	}, {
		styler: {
			centered: true
		},
		global: {
			textAlign: 'center'
		}
	}, {
		styler: {
			hovered: true,
			sortable: true
		},
		global: {
			color: '$table.color.columnHovered.color',
			background: '$table.color.columnHovered.background',
		}
	}, {
		styler: {
			header: true,
		},
		global: {
			borderLeftWidth: 0,
			borderRightWidth: 0,
		}
	}, {
		styler: {
			header: true,
			hovered: true,
			sortable: true
		},
		global: {
			color: '$table.color.columnHovered.headerColor',
			background: '$table.color.columnHovered.headerBackground',
			cursor: 'pointer'
		}
	}
]
