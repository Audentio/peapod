
module.exports = [
	{
		global: {
			cursor: 'default',
			fontSize: '$icon.font.size',
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
			color: 'getStyle:color',
		}
	}
]
