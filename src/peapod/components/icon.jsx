/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import { Pod_animation } from './animation.jsx';
var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');

/**
* Icon component
*
* @element Pod_icon
* @param {string} animation - pre-defined animation
* @param {string} color - Icon color
* @param {string} label - Icon label (for tooltip and ARIA)
*/
var Pod_icon = React.createClass({

	propTypes: {
		children: 		React.PropTypes.string.isRequired,
		animation: 		React.PropTypes.string,
		label: 			React.PropTypes.string,
		color: 			React.PropTypes.string
	},


	getDefaultProps: function() {
		return {
			size: '1rem',
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

	},

	render: function() {
		return (
			<i className="material-icons" aria-label={this.props.label} title={this.props.label} style={Pod_Styler.getStyle(this)}>
				{this.props.children}
			</i>
		);
	}

});

module.exports = Pod_animation(Radium(Pod_icon));
