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
*/
var Progress = React.createClass({

	propTypes: {
		value: 			React.PropTypes.number,
		max: 			React.PropTypes.number
	},

	getDefaultProps() {
		return {
			value: -1,
			max: 100
		}
	},

	getScale() {
		var progress = (this.props.value < 0) ? 0 : this.props.value;
		return progress/this.props.max
	},

	render() {
		var style = Pod_Styler.getStyle(this);
		
		return (
			<div style={style.main}>
			    <div style={style.progress}></div>
			</div>
		)
	}

});

module.exports = Wrapper(Progress);
