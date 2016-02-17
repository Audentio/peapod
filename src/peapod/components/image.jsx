/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');
var Wrapper = require('../wrapper.jsx')

import Pod_helper from '../helper.jsx'
var Icon = require('./icon.jsx');

var options = Pod_helper.options('Pea_image', {

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
	lightboxAnimation: true
});

/**
* Image component: loads HiDPI images on retina devices
*
* @element Pod_image
* @param {string} src - Image URL ()
* @param {(bool|Object)} [hidpi-data] - object map of pixel densities and prefixes. False to disable hidpi asset loading
* @param {string} [alt] - alt attribute
* @param {string} [caption] - Image caption
* @param {bool} [lazy] - Should the resource load lazily?
* @param {Number} [lazyDistance] - Lazy images will be loaded when within this distance from viewport
* @param {bool} [lightbox] - Enable lightbox on instance
* @param {bool} [lightboxAnimation] - Animated lightbox (ability to turn off for specific high-res images)
*/
var Image = React.createClass({
	propTypes: {
		src: React.PropTypes.string.isRequired,
		hidpiData: React.PropTypes.oneOfType([ React.PropTypes.array, React.PropTypes.bool ]),
		alt: React.PropTypes.string,
		caption: React.PropTypes.string,
		lazy: React.PropTypes.bool,
		lazyDistance: React.PropTypes.number,
		lightbox: React.PropTypes.bool,
		lightboxAnimation: React.PropTypes.bool
	},


	getDefaultProps: function() {
		return {
			hidpiData: options.hidpi,
			lazy: options.lazy,
			lazyDistance: options.lazyDistance,
			lightbox: options.lightbox,
			styler: options.styler,
			lightboxAnimation: options.lightboxAnimation
		}
	},


	getInitialState: function() {
		return {
			visible: (this.props.lazy) ? false : true,
			lightboxVisible: false
		};
	},

	keyHandler: function(e){
		if(e.keyCode == Pod_helper.keymap['esc']){
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
		Pod_helper.scrolling(false)

		//add keyboard listener
		window.addEventListener('keydown', this.keyHandler)
	},

	//hide lightbox
	hideLightbox: function(){

		this.setState({lightboxVisible: false});

		//enable scrolling
		//document.documentElement.style.overflow = ''
		Pod_helper.scrolling(true)

		//remove keyboard listener
		window.removeEventListener('keydown', this.keyHandler)
	},

	//Onclick handler
	//decides whether to hide or not
	lightboxOnClick: function(e){

		//overlay is clicked
		//hide
		if(e.target.tagName != 'IMG'){
			this.hideLightbox();
		}

		//If image is clicked
		//Open image in browser tab
		else {
			var newWindow = window.open(e.target.src, '_blank')
			newWindow.focus();
		}

	},

	//Check if element is within the defined viewport range
	// -- {lazyDistance}px above and below current viewport
	lazyCheck: function() {

		var bounds = ReactDOM.findDOMNode(this).getBoundingClientRect(),
		scrollTop = window.pageYOffset,
		top = bounds.top + scrollTop,
		height = bounds.bottom - bounds.top;

		if(top === 0 || (top <= (scrollTop + window.innerHeight + options.lazyDistance) && (top + height + options.lazyDistance) > scrollTop)){
			this.setState({visible: true});
			this.removeListener(); //stop listening, the show is over
		}

	},

	doNothing: function(){
		return false
	},

	removeListener: function() {
		window.removeEventListener('scroll', this.lazyCheck);
		window.removeEventListener('resize', this.lazyCheck);
	},

	componentDidMount: function() {

		//initial check
		this.lazyCheck();

		//start listening for viewport events
		if(this.props.lazy) { window.addEventListener('scroll', this.lazyCheck) }

	},

	//re-check on update
	componentDidUpdate: function() {
		if(!this.state.visible) this.lazyCheck();
	},

	//stop listening if component is about to unmount
	componentWillUnmount: function() {
		this.removeListener();
	},


	componentWillMount: function(){

		var hiDpiData = this.props.hidpiData;

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

	},

	render: function() {
		return (
			<div style={Pod_Styler.getStyle(this, 'wrapper')}>
				<img onClick={this.showLightbox} src={this.state.visible ? this.imageURL : options.blankImage} alt={this.props.alt}
					style={Pod_Styler.getStyle(this)} />

				{this.props.caption &&
					<span style={Pod_Styler.getStyle(this, 'caption')}>{this.props.caption}</span>
				}

				{this.props.lightbox &&
					<div style={Pod_Styler.getStyle(this, 'lightbox')} onClick={this.lightboxOnClick}>
						<div style={Pod_Styler.getStyle(this, 'lightboxInner')}>
							<img style={Pod_Styler.getStyle(this, 'lightboxImage')} src={this.state.visible ? this.imageURL : options.blankImage} />
						</div>
						<div style={Pod_Styler.getStyle(this, 'lightboxActions')}>
							<Icon style={Pod_Styler.getStyle(this, 'lightboxAction')}>close</Icon>
							<Icon onClick={this.doNothing} style={Pod_Styler.getStyle(this, 'lightboxAction')}>file_download</Icon>
							<Icon style={Pod_Styler.getStyle(this, 'lightboxAction')}>open_in_new</Icon>
						</div>
					</div>
				}
			</div>
		);
	}
});

module.exports = Wrapper(Image);
