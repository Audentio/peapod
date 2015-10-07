/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
import React from 'react';	
import Radium from 'radium';


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
},

blankImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgMAYAADYANKqWpHYAAAAASUVORK5CYII=";

/**
* Image component: loads HiDPI images on retina devices
*
* @element Pea_image
* @param {string} src - Image URL ()
* @param {(bool|Object)} [hidpi-data={"1.5":"@2x"}] - object map of pixel densities and prefixes. False to disable hidpi asset loading
* @param {string} [alt] - alt attribute
* @param {string} [caption] - Image caption
*/
var Pea_image = React.createClass({
  
	propTypes: {
		src: React.PropTypes.string.isRequired,
		'hidpi-data': React.PropTypes.oneOfType([ React.PropTypes.array, React.PropTypes.bool ]),
		alt: React.PropTypes.string,
		caption: React.PropTypes.string,
		lazy: React.PropTypes.bool
	},

	//Default props
	getDefaultProps: function() {
		return {
			'hidpi-data': [['1.5', '@2x']],
			block: false,
			lazy: false
		}
	},
	
	getInitialState: function() {
		return {
			visible: (this.props.lazy) ? false : true
		};
	},
	
	checkVisibility: function() {
		var bounds = this.getDOMNode().getBoundingClientRect(),
			scrollTop = window.pageYOffset,
			top = bounds.top + scrollTop,
			height = bounds.bottom - bounds.top;

		if(top === 0 || (top <= (scrollTop + window.innerHeight) && (top + height) > scrollTop)){
			this.setState({visible: true});
			this.removeListener();
		}
	},
	
	removeListener: function() {
		window.removeEventListener('scroll', this.checkVisibility);
	},
	
	componentDidMount: function() {
		this.checkVisibility();
		if(this.props.lazy) { window.addEventListener('scroll', this.checkVisibility) }
	},
	
	componentDidUpdate: function() {
		if(!this.state.visible) this.checkVisibility();
	},
	
	componentWillUnmount: function() {
		this.removeListener();
	},
	
	componentWillMount: function(){
		
		//HiDPI check
		var hiDpiData = this.props['hidpi-data'];
		if(hiDpiData) {
			var 
			url = this.props.src.split('.'),
			extension = url.splice(-1,1),
			filePath = url.join('.'),
			suffix = '';
			
			hiDpiData.forEach(function(item){
				suffix = ( window.devicePixelRatio >= Number(item[0]) ) ? item[1] : suffix;
			})
			
			this.imageURL = filePath + suffix + '.' + extension;
			
		} 
		else {
			this.imageURL = this.props.src;
		}
		
		
		//Caption
		this.caption = (this.props.caption) ? <span style={captionStyle.base}>{this.props.caption}</span> : undefined;
		
	},
	
	render: function() {
		
		return (
			<div style={imageContainerStyle.base}>
				<img src={this.state.visible ? this.imageURL : blankImage} alt={this.props.alt} style={[imageStyle.base, this.props.style]} />
				{this.caption}
			</div>
		);
	}
    
});

module.exports = Radium(Pea_image);