module.exports = [
	{
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
		styler: {
			centered: true
		},
		global: {
			textAlign: 'center'
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
			header: true,
			borderlessHeader: true
		},
		global: {
			borderLeftWidth: 0,
			borderRightWidth: 0,
		}
	}, {
		styler: {
			columnHovered: true
		},
		global: {
			background: '$table.color.columnHovered.background',
			color: '$table.color.columnHovered.color'
		}
	}, {
		styler: {
			columnHovered: true,
			header: true
		},
		global: {
			background: '$table.color.columnHovered.headerBackground',
			color: '$table.color.columnHovered.headerColor'
		}
	}
]
