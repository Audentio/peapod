/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Pod_animation } from './animation.jsx';
import Pod_Helper from '../helper.js'
var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* Icon component
*
* @element Pod_icon
* @param {string} animation - pre-defined animation
* @param {string} color - Icon color
* @param {string} label - Icon label (for tooltip and ARIA)
*/
var Icon = React.createClass({

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

		Pod_Helper.addStylesheet('IconFont', '//fonts.googleapis.com/icon?family=Material+Icons')

	},

	render: function() {
		var style = Pod_Styler.getStyle(this);

		return (
			<i {...this.props} className="material-icons" onClick={this.props.onClick} aria-label={this.props.label} title={this.props.label} style={style.main}>
				{this.props.children}
			</i>
		);
	}

});

module.exports = Wrapper(Icon);

//module.exports = Pod_animation(Radium(Pod_icon)); // @Tushar, this currently causes issues with things
