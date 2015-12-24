module.exports = [
	{
		global: {
			display: 'table-row',
			color: '$table.color.lightRow.color',
			background: '$table.color.lightRow.background',
		}
	},
	{
		styler: {
			dark: true
		},
		global: {
			color: '$table.color.darkRow.color',
			background: '$table.color.darkRow.background',
		}
	}, {
		styler: {
			header: false
		},
		global: {
			':hover': {
				background: '$table.color.lightRow.hover'
			}
		}
	}, {
		styler: {
			dark: true,
			header: false
		},
		global: {
			':hover': {
				background: '$table.color.darkRow.hover'
			}
		}
	}, {
		styler: {
			checked: true
		},
		global: {
			color: '$table.color.checked.color',
			background: '$table.color.checked.background',
			':hover': {
				background: '$table.color.checked.hover'
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
