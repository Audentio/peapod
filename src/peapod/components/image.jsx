/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');

var options = Pod.helper.options('Pea_image', {

	//this acts as src for lazyLoaded images until they're loaded
	defaultImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgMAYAADYANKqWpHYAAAAASUVORK5CYII=",

	//lazy loading
	lazy: false,

	//load image if distance from viewport is smaller than this
	lazyDistance: 500,

	//Multi-dimensional array defining prefixes for different device pixeDensity
	//set false to disable hiDPI loading
	hidpi: [['1.5', '@2x']],

	//show enlarged image in lightbox
	lightbox: true,

	//Animate Lightbox entry-exit
	'lightbox-animation': true
});

console.log(options);

/**
* Image component: loads HiDPI images on retina devices
*
* @element Pod_image
* @param {string} src - Image URL ()
* @param {(bool|Object)} [hidpi-data] - object map of pixel densities and prefixes. False to disable hidpi asset loading
* @param {string} [alt] - alt attribute
* @param {string} [caption] - Image caption
* @param {bool} [lazy] - Should the resource load lazily?
* @param {Number} [lazy-distance] - Lazy images will be loaded when within this distance from viewport
* @param {bool} [lightbox] - Enable lightbox on instance
* @param {bool} [lightbox-animation] - Animated lightbox (ability to turn off for specific high-res images)
*/
var Pod_image = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		'hidpi-data': React.PropTypes.oneOfType([ React.PropTypes.array, React.PropTypes.bool ]),
		alt: React.PropTypes.string,
		caption: React.PropTypes.string,
		lazy: React.PropTypes.bool,
		'lazy-distance': React.PropTypes.number,
		lightbox: React.PropTypes.bool,
		'lightbox-animation': React.PropTypes.bool
	},


	getDefaultProps: function() {
		return {
			'hidpi-data': [['1.5', '@2x']],
			lazy: false,
			'lazy-distance': 500,
			lightbox: false,
			'lightbox-animation': true
		}
	},


	getInitialState: function() {
		return {
			visible: (this.props.lazy) ? false : true,
			lightboxVisible: false
		};
	},

	keyHandler: function(e){
		if(e.keyCode == peapod.helper.keymap['esc']){
			this.hideLightbox();
		}
	},

	//show lightbox
	showLightbox: function(){
		if(!this.props.lightbox){
			return false;
		}

		this.setState({lightboxVisible: true})

		//enable scrolling
		peapod.helper.scrolling(false)

		//add keyboard listener
		window.addEventListener('keydown', this.keyHandler)
	},

	//hide lightbox
	hideLightbox: function(){
		this.setState({lightboxVisible: false});

		//enable scrolling
		//document.documentElement.style.overflow = ''
		peapod.helper.scrolling(true)

		//remove keyboard listener
		window.removeEventListener('keydown', this.keyHandler)
	},

	//Check if element is within the defined viewport range
	// -- {lazyDistance}px above and below current viewport
	checkVisibility: function() {
		
		var bounds = ReactDOM.findDOMNode(this).getBoundingClientRect(),
		scrollTop = window.pageYOffset,
		top = bounds.top + scrollTop,
		height = bounds.bottom - bounds.top;

		if(top === 0 || (top <= (scrollTop + window.innerHeight + options.lazyDistance) && (top + height + options.lazyDistance) > scrollTop)){
		this.setState({visible: true});
		this.removeListener(); //stop listening, the show is over
		}

		//Kyler, look into how to not duplicate ReactDOM here
		//this.setState({visible: true});

	},

	removeListener: function() {
		window.removeEventListener('scroll', this.checkVisibility);
		window.removeEventListener('resize', this.checkVisibility);
	},

	componentDidMount: function() {

		//initial check
		this.checkVisibility();

		//start listening for viewport events
		if(this.props.lazy) { window.addEventListener('scroll', this.checkVisibility) }

	},

	//re-check on update
	componentDidUpdate: function() {
		if(!this.state.visible) this.checkVisibility();
	},

	//stop listening if component is about to unmount
	componentWillUnmount: function() {
		this.removeListener();
	},


	componentWillMount: function(){

		var hiDpiData = this.props['hidpi-data'];
		if(hiDpiData) { //hiDPI resource is available

			//break down the url
			var
			url = this.props.src.split('.'),
			extension = url.splice(-1,1),
			filePath = url.join('.'),
			suffix = '';

			//loop through hidpi array. Overrides are sequential
			hiDpiData.forEach(function(item){

				//grab suffix from last apporpiate array
				suffix = ( window.devicePixelRatio >= Number(item[0]) ) ? item[1] : suffix;

			})

			//Suffixed URL
			this.imageURL = filePath + suffix + '.' + extension;

		}
		else { //hiDPI is disabled. Load normal resource
			this.imageURL = this.props.src;
		}

		//Caption
		this.caption = (this.props.caption) ? <span style={Pod_Styler.getStyle(this, 'caption')}>{this.props.caption}</span> : undefined;

	},

	render: function() {
		return (
			<div style={Pod_Styler.getStyle(this, 'wrapper')}>
				<img onClick={this.showLightbox} src={this.state.visible ? this.imageURL : options.blankImage} alt={this.props.alt}
					style={Pod_Styler.getStyle(this)} />
				{this.caption}

				{this.props.lightbox &&
					<div style={Pod_Styler.getStyle(this, 'lightbox')} onClick={this.hideLightbox}>
						<div style={Pod_Styler.getStyle(this, 'lightboxInner')}>
							<img style={Pod_Styler.getStyle(this, 'lightboxImage')} src={this.state.visible ? this.imageURL : options.blankImage} />
						</div>
					</div>
				}
			</div>
		);
	}
});

export default Radium(Pod_image);
