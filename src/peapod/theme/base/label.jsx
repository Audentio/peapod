module.exports = [
	{
		global: {
			color: '$label.color.text',
			backgroundColor: '$color.general.base',
			display: 'inline-block',
			padding: '$gutter.internal'
		}
	}, {
		styler: {
			round: true
		},
		global: {
			borderRadius: '1000px'
		}
	}, {
		styler: {
			kind: 'success'
		},
		global: {
			backgroundColor: '$color.success.base'
		}
	}, {
		styler: {
			kind: 'danger'
		},
		global: {
			backgroundColor: '$color.danger.base'
		}
	}, {
		styler: {
			kind: 'info'
		},
		global: {
			backgroundColor: '$color.info.base'
		}
	}, {
		styler: {
			kind: 'warning'
		},
		global: {
			backgroundColor: '$color.warning.base'
		}
	}, {
		styler: {
			kind: 'secondary'
		},
		global: {
			backgroundColor: '$color.secondary.base'
		}
	}, {
		styler: {
			kind: 'base'
		},
		global: {
			backgroundColor: '$color.base.base'
		}
	}, {
		subComponent: 'icon',
		global: {
			
		}
	}
]
