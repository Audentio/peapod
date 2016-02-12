module.exports = [
	{
		global: {
			display: 'table',
			width: '100%',
			fontSize: '$table.font.size'
		}
	},


	{
		part: 'row',
		global: {
			display: 'table-row',
			color: '$table.color.lightRow.color',
			background: '$table.color.lightRow.background'
		}
	}, {
		part: 'row',
		styler: {
			dark: true
		},
		global: {
			color: '$table.color.darkRow.color',
			background: '$table.color.darkRow.background',
		}
	}, {
		part: 'row',
		styler: {
			hovered: true
		},
		global: {
			color: '$table.color.darkRow.color',
			background: '$table.color.darkRow.hover',
		}
	}, {
		part: 'row',
		styler: {
			header: true
		},
		global: {
			color: '$table.color.header.color',
			background: '$table.color.header.background',
			fontFamily: '$table.font.headerFamily',
			fontSize: '$table.font.headerSize',
			textTransform: 'uppercase'
		}
	}, {
		part: 'row',
		styler: {
			checked: true
		},
		global: {
			color: '$table.color.checked.color',
			background: '$table.color.checked.background',
		}
	}
]
