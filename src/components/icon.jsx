/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
import React from 'react';	
import ReactDOM from 'react-dom';	
import Radium from 'radium';
import _ from 'lodash';

//Animations
//defined with ES6 string syntax
var anim = {
	rotate: 
		`
		${Radium.keyframes({
			'from': {transform: 'rotate(0deg)'},
			'to': {transform: 'rotate(360deg)'},
		})} 1s linear 0s infinite
		`,

	rotate_acw: 
		`
		${Radium.keyframes({
			'from': {transform: 'rotate(0deg)'},
			'to': {transform: 'rotate(-360deg)'},
		})} 1s linear 0s infinite
		`,

	pulse:
		`
		${Radium.keyframes({
			'0%': {transform: 'scale(1)'},
			'50%': {transform: 'scale(.8)'},
			'100%': {transform: 'scale(1)'}
		})} 1s ease 0s infinite
		`
}

var styles = {
	base: {
		cursor: 'default'
	}
}

//Component configuration
var options = peapod.helper.options('Pea_icon', {

	//Default size
	size: '1em'

})

/**
* Icon component
*
* @element Pea_icon
* @param {string} animation - pre-defined animation
* @param {string} color - Icon color
* @param {string} label - Icon label (for tooltip and ARIA)
*/
var Pea_icon = React.createClass({

	propTypes: {
		children: 		React.PropTypes.string.isRequired,
		animation: 		React.PropTypes.string,
		label: 			React.PropTypes.string,
		color: 			React.PropTypes.string
	},


	getDefaultProps: function() {
		return {
			size: options.size,
			color: 'inherit'
		}
	},
	
	componentWillMount: function(){

		//load icon font
		var stylesheet = document.getElementById('Peapod_IconFont_stylesheet');

		if(!stylesheet){ //check if <link> already exists

			//Create
			stylesheet = document.createElement('link');
			stylesheet.id = "Peapod_IconFont_stylesheet";
			stylesheet.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
			stylesheet.rel = "stylesheet";

			//append
			document.head.appendChild(stylesheet);
		}

		//create anim string
		if(this.props.animation){
			var animation = this.props.animation.split(','); //in case speed is also passed
			var animation_name = animation[0];
			var animation_speed = animation[1];

			this.animationName = animation_name;

			if(typeof anim[animation_name] == 'undefined')
				//to-do: reactDOM reference
				console.warn('Animation undefined:' + animation_name);

			//set animation speed if defined
			if(typeof animation_speed != 'undefined')
				this.animationSpeed = animation_speed
		}

	},
	
	render: function() {
		return (
			<i className="material-icons" aria-label={this.props.label} title={this.props.label} style={[
				{'animation': anim[this.animationName]},
				this.animationSpeed && {'animationDuration': this.animationSpeed},
				styles.base,
				{'fontSize': this.props.size},
				{'color': this.props.color},
				this.props.style
			]}>{this.props.children}</i>
		);
	}
    
});

module.exports = Radium(Pea_icon);