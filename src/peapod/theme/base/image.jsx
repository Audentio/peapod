var Pod_Vars = require('../../vars.jsx');

module.exports = [
	{
		subComponent: 'wrapper',
		global: {
			display: 'inline-block',
			position: 'relative'
		}
	}, {
		global: {
			display: 'block',
			maxWidth: '100%'
		}
	}, {
		props: {
			lightbox: true
		},
		global: {
			cursor: 'pointer'
		}
	}, {
		subComponent: 'caption',
		global: {
			display: 'block',
			padding: '6px 10px',
			position: 'absolute',
			bottom: 0,
			left: 0,
			backgroundColor: '$image.color.captionBackground',
			width: '100%'
		}
	}, {
		subComponent: 'lightbox',
		global: {
			display: 'table',
			cursor: 'pointer',
			position: 'fixed',
			zIndex: 999,
			backgroundColor: '$image.color.captionBackground',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			transition: '300ms',
			visibility: 'hidden',
			opacity: 0,
			display: 'none'
		}
	}, {
		subComponent: 'lightbox',
		props: {
			'lightbox-animation': true
		},
		global: {
			display: 'table'
		}
	}, {
		subComponent: 'lightbox',
		state: {
			lightboxVisible: true
		},
		global: {
			display: 'table',
			visibility: 'visible',
			opacity: 1
		}
	}, {
		subComponent: 'lightboxInner',
		global: {
			display: 'table-cell',
			textAlign: 'center',
			verticalAlign: 'middle'
		}
	}, {
		subComponent: 'lightboxImage',
		global: {
			maxWidth: '90%',
			maxHeight: '90%',
			maxWidth: '90vw',
			maxHeight: '90vh',
			transition: '400ms ease',
			transform: 'scale(.7)',
		}
	}, {
		subComponent: 'lightboxImage',
		state: {
			lightboxVisible: true
		},
		global: {
			transform: 'none'
		}
	}
]
