
module.exports = [
	{
		global: {
			cursor: 'default',
			fontSize: '$icon.font.size',
			color: '$icon.color'
		}
	}, {
		props: {
			size: ['!=', '']
		},
		global: {
			fontSize: 'getStyle:size',
		}
	}, {
		props: {
			color: ['!=', '']
		},
		global: {
			fontSize: 'getStyle:color',
		}
	}
]
