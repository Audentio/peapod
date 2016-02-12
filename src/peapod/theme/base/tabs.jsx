module.exports = [
	{
		global: {

		}
	}, {
		part: 'trigger',
		global: {
			display: 'inline-block'
		}
	}, {
		part: 'trigger',
		styler: {
			active: true
		},
		global: {
			color: 'red'
		}
	}, {
		part: 'panel',
		styler: {
			active: false
		},
		global: {
			display: 'none'
		}
	}
]
