/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Pod_animation } from './animation.jsx'
import _ from 'lodash'
import Pod_Styler from '../styler.jsx'
import Wrapper from '../wrapper.jsx'

/**
* Icon component
*
* @element Pod_icon
* @param {number} [vaulue=-1] - Progress value. Negative values render indeterminate progress
* @param {string} [max=100] - Max value. Default is 100 so `value` is basically a percentage unless max is changed
* @param {string} [stroke] - height/stroke width in px
*/
var Progress = React.createClass({

	propTypes: {
		value: 			React.PropTypes.number,
		max: 			React.PropTypes.number,
		stroke:			React.PropTypes.number,
		size:			React.PropTypes.number,
		type:			React.PropTypes.string
	},

	getDefaultProps() {
		return {
			value: -1,
			max: 100,
			stroke: 4
        }
	},

	getScale() {
		let progress = (this.props.value < 0) ? 0 : this.props.value;
		return progress/this.props.max
	},

	render() {
		var style_main = 		Pod_Styler.getStyle(this),
			style_progress = 	[ Pod_Styler.getStyle(this, 'progress'), { transform: 'scaleX('+this.getScale()+')', height: this.props.stroke } ], //Radium array
			style_hidden = 		{display: 'none'};


		return (
			<div style={style_main}>
			    <div style={style_progress}></div>
			</div>
		)
	}

});

module.exports = Wrapper(Progress);
