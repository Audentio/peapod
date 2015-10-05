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
}

/**
* Image component: loads HiDPI images on retina devices
*
* @element Pea_image
* @param {string} src - Image URL ()
* @param {bool} [has-hidpi=true] - Does the image have HiDPI version?
* @param {string} [hidpi-suffix=@2x] - HiDPI version suffix
* @param {string} [alt] - alt attribute
* @param {string} [caption] - Image caption
*/
var Pea_image = React.createClass({
  
	propTypes: {
		src: React.PropTypes.string.isRequired,
		'has-hidpi': React.PropTypes.bool,
		'hidpi-suffix': React.PropTypes.string,
		alt: React.PropTypes.string,
		caption: React.PropTypes.string
	},

	//Default props
	getDefaultProps: function() {
		return {
			'has-hidpi': true,
			'hidpi-suffix': '@2x',
			block: false
		}
	},
	
	componentWillMount: function(){
		
		//HiDPI check
		var 
		url = this.props.src.split('.'),
		extension = url.splice(-1,1),
		filePath = url.join('.'),
		
		hidpiRequired = (this.props['has-hidpi'] && window.devicePixelRatio && window.devicePixelRatio > 1.5);
		
		this.imageURL =  (hidpiRequired) ? filePath + this.props['hidpi-suffix'] + '.' + extension : this.props.src;
		
		
		//Caption
		this.caption = (this.props.caption) ? <span style={captionStyle.base}>{this.props.caption}</span> : undefined;
		
	},
	
	render: function() {
		
		return (
			<div style={imageContainerStyle.base}>
				<img src={this.imageURL} alt={this.props.alt} style={[imageStyle.base, this.props.style]} />
				{this.caption}
			</div>
		);
	}
    
});

module.exports = Radium(Pea_image);