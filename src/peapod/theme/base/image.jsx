var Pod_Vars = require('../../mixins/vars.jsx');

module.exports = [
	{
		childEle: 'wrapper',
		global: {
			display: 'inline-block',
			position: 'relative'
		}
	}, {
		global: {
			display: 'block'
		}
	}, {
		props: {
			lightbox: 'true'
		},
		global: {
			cursor: 'pointer'
		}
	}, {
		childEle: 'caption',
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
		childEle: 'lightbox',
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
		childEle: 'lightbox',
		props: {
			'lightbox-animation': 'true'
		},
		global: {
			display: 'table'
		}
	}, {
		childEle: 'lightbox',
		state: {
			visible: 'true'
		},
		global: {
			display: 'table',
			visibility: 'visible',
			opacity: 1
		}
	}, {
		childEle: 'lightboxInner',
		global: {
			display: 'table-cell',
			textAlign: 'center',
			verticalAlign: 'middle'
		}
	}, {
		childEle: 'lightboxImage',
		global: {
			maxWidth: '90%',
			maxHeight: '90%',
			maxWidth: '90vw',
			maxHeight: '90vh',
			transition: '400ms ease',
			transform: 'scale(.7)',
		}
	}, {
		childEle: 'lightboxImage',
		state: {
			lightboxVisible: 'true'
		},
		global: {
			transform: 'none'
		}
	}
]
