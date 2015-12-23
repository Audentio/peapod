module.exports = [
	{
		global: {
			display: 'table-row',
			color: '$table.color.lightRow.color',
			background: '$table.color.lightRow.background',
			':hover': {
				background: '$table.color.lightRow.hover'
			}
		}
	},
	{
		styler: {
			dark: true
		},
		global: {
			color: '$table.color.darkRow.color',
			background: '$table.color.darkRow.background',
			':hover': {
				background: '$table.color.darkRow.hover'
			}
		}
	}, {
		styler: {
			header: true
		},
		global: {
			color: '$table.color.header.color',
			background: '$table.color.header.background',
			':hover': {
				background: '$table.color.header.hover'
			}
		}
	}
]
