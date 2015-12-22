
module.exports = [
	{
		global: {
			cursor: 'default',
			fontSize: '$icon.font.size',
			color: '$icon.color'
		}
	}, {
		styler: {
			size: ['!=', '']
		},
		global: {
			fontSize: 'getStyle:size',
		}
	}, {
		styler: {
			color: ['!=', '']
		},
		global: {
			fontSize: 'getStyle:color',
		}
	}
]
