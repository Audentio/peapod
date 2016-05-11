/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import moment from 'moment';

import Pod_Styler from 'styler.js';
import {merge as _merge} from 'lodash'


/**
* Create live timestamp from valid date.
*
* @element Pod_liveTimestamp
* @property {(string|integer|Object)} time - Date() / UNIX time / ISO 8601
*/
module.exports = class Timestamp extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.createMomentObject();

		if (props.output == "relative") {
			this.state = {
				timeElapsed: this.timeElapsed()
			}
		} else {
			this.state = {}
		}

	}

	static defaultProps = {
		time: Math.floor( Date.now() / 1000 ),
		timezone: "UTC",
		output: "absolute",
		outputTimezone: null, //inherit input timezone
		showTime: true,
		showDate: true,
		format: null //timezone overrides output, showTime and showDate 'MMMM Do YYYY, h:mm a'
	}

	//create moment object from time prop
	createMomentObject(){

		//try as unix timestamp
		var momentObject = moment.unix(Number(this.props.time))

		if(!momentObject.isValid()) {
			var momentObject = moment(this.props.time)
		}

		this.timestamp = momentObject;
	}

	/* returns the amount of seconds elapsed since {this.props.time} */
	timeElapsed() {
		return this.timestamp.fromNow();
	}

	componentWillUpdate() {
		this.createMomentObject();
	}

	componentDidMount() {

		if (this.props.output == "relative") {
			let self = this;
			//start repeater
			this._timer = setInterval(function(){
				self.setState({
					timeElapsed: self.timeElapsed()
				})
			}, 1000*60) //60 seconds
		}
	}

	componentWillUnmount() {
		//stop repeater
		window.clearTimeout( this._timer )
	}

	render() {
		var style = Pod_Styler.getStyle(this),
			display,
			format = this.props.format;

		if(format) {
			display = this.timestamp.format(format)
		}
		else {
			//create format setting from booleans
			var showDate = this.props.showDate,
				showTime = this.props.showTime;

			if(showDate && showTime)
				format = 'MMMM Do YYYY, h:mm a'

			else if(showDate)
				format = 'MMMM Do YYYY'

			else if(showTime)
				format = 'h:mm a'

			//output style
			switch(this.props.output){
				case 'relative':
					display = this.state.timeElapsed;
					break;
				case 'calendar':
					display = this.timestamp.calendar();
					break;
				default:
					display = this.timestamp.format(format);
			}
		}

		return (
			<span style={style.main} title={ this.timestamp.format('MMMM Do YYYY, h:mm a') }>
				{display}
			</span>
		)
	}
};
