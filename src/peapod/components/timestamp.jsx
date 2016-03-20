/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import moment from 'moment';

var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');
var Wrapper = require('../wrapper.jsx')


/**
* Create live timestamp from valid date.
*
* @element Pod_liveTimestamp
* @property {(string|Object)} time - IETF-compliant RFC 2822 timestamp string or Date Object
*/
var Pod_liveTimestamp = React.createClass({

	/* returns the amount of seconds elapsed since {this.props.time} */
	timeElapsed: function(){
		return this.timestamp.fromNow();
	},

	getInitialState: function() {
		//create moment object from time property
		this.timestamp = moment(this.props.time)

		return {
			timeElapsed: this.timeElapsed()
		}
	},

	componentDidMount: function(){
		let self = this;
		//start repeater
		this._timer = setInterval(function(){
			self.setState({
				timeElapsed: self.timeElapsed()
			})
		}, 1000*60) //60 seconds
	},

	componentWillUnmount: function(){
		//stop repeater
		window.clearTimeout( this._timer )
	},

	render: function() {
		var style = Pod_Styler.getStyle(this);

		return (
			<span style={style.main} title={ moment(this.props.time).format('MMMM Do YYYY, h:mm:ss a') }>
				{this.state.timeElapsed}
			</span>
		)
	}
});

module.exports = Wrapper(Pod_liveTimestamp);
