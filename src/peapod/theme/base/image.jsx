import {Sheet} from '../../stylesheet.jsx';

var sheet = new Sheet;

//Variables
sheet.setValues({
	global: {
		image: {
			color: {
				captionBackground: 'rgba(255, 255, 255, 0.5)',
				lightboxBackground: 'rgba(0,0,0,0.75)'
			}
		},
	}
});

module.exports = [
	{
		part: 'wrapper',
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
		part: 'caption',
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
		part: 'lightbox',
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
		part: 'lightbox',
		props: {
			'lightbox-animation': true
		},
		global: {
			display: 'table'
		}
	}, {
		part: 'lightbox',
		state: {
			lightboxVisible: true
		},
		global: {
			display: 'table',
			visibility: 'visible',
			opacity: 1
		}
	}, {
		part: 'lightboxInner',
		global: {
			display: 'table-cell',
			textAlign: 'center',
			verticalAlign: 'middle'
		}
	}, {
		part: 'lightboxImage',
		global: {
			maxWidth: '90%',
			maxHeight: '90%',
			maxWidth: '90vw',
			maxHeight: '90vh',
			transition: '400ms ease',
			transform: 'scale(.7)',
		}
	}, {
		part: 'lightboxImage',
		state: {
			lightboxVisible: true
		},
		global: {
			transform: 'none'
		}
	}
]
