/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
import React from 'react';	
import ReactDOM from 'react-dom';	
import Radium from 'radium';
import _ from 'lodash';


var imageContainerStyle = {
	base: {
		display: 'inline-block',
		position: 'relative'
	}
},

imageStyle = {
	base: {
		display: 'block'
	}
},

captionStyle = {
	base: {
		display: 'block',
		padding: '6px 10px',
		position: 'absolute',
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		width: '100%'
	}
};

//Component options
var options = {

	//this acts as src for lazyLoaded images until they're loaded
	defaultImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgMAYAADYANKqWpHYAAAAASUVORK5CYII=",
	
	//lazy loading
	lazy: false,
	
	//load image if distance from viewport is smaller than this
	lazyDistance: 500,
	
	//Multi-dimensional array defining prefixes for different device pixeDensity
	//set false to disable hiDPI loading
	hidpi: [['1.5', '@2x']]
}

//Merge with global options object
//global object overrides default settings defined above
if(peapod.options.Pea_image) {
	_.merge(options, peapod.options.Pea_image);
}

/**
* Image component: loads HiDPI images on retina devices
*
* @element Pea_image
* @param {string} src - Image URL ()
* @param {(bool|Object)} [hidpi-data] - object map of pixel densities and prefixes. False to disable hidpi asset loading
* @param {string} [alt] - alt attribute
* @param {string} [caption] - Image caption
* @param {bool} [lazy] - Should the resource load lazily?
* @param {Number} [lazy-distance] - Lazy images will be loaded when within this distance from viewport
*/
var Pea_image = React.createClass({

	propTypes: {
		src: React.PropTypes.string.isRequired,
		'hidpi-data': React.PropTypes.oneOfType([ React.PropTypes.array, React.PropTypes.bool ]),
		alt: React.PropTypes.string,
		caption: React.PropTypes.string,
		lazy: React.PropTypes.bool,
		'lazy-distance': React.PropTypes.number
	},


	getDefaultProps: function() {
		return {
			'hidpi-data': options.hidpi,
			lazy: options.lazy,
			'lazy-distance': options.lazyDistance
		}
	},
	
	
	getInitialState: function() {
		return {
			visible: (this.props.lazy) ? false : true
		};
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
		this.caption = (this.props.caption) ? <span style={captionStyle.base}>{this.props.caption}</span> : undefined;
		
	},
	
	render: function() {
		
		return (
			<div style={imageContainerStyle.base}>
				<img src={this.state.visible ? this.imageURL : options.blankImage} alt={this.props.alt} style={[imageStyle.base, this.props.style]} />
				{this.caption}
			</div>
		);
	}
    
});

module.exports = Radium(Pea_image);