/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react'
import moment from 'moment-timezone'

import Pod_Styler from 'styler.js'
import {merge as _merge} from 'lodash'


/**
*
* Create formatted & self-updating timestamps from dateTime.
*
*/
module.exports = class Input extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.create()

		if (props.output == 'relative') {
			this.state = {
				timeElapsed: this.timeElapsed()
			}
		} else {
			this.state = {}
		}
	}

	static propTypes = {

		//dateTime
		//new Date() / UNIX time / ISO 8601 / (deprecated) RFC2822
		time: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),

		//Timezone of given dateTime (e.g. "America/Chicago", "UTC")
		//UTC is default
		timezone: React.PropTypes.string,

		//Output type
		output: React.PropTypes.oneOf([
			'absolute', 	//May 4th 2016, 11:44 am
			'relative', 	//3 days ago
			'calendar' 		//Last Wednesday at 11:44 AM
		]),

		//Adjust timezone in display
		outputTimezone: React.PropTypes.string,

		showTime: React.PropTypes.bool,
		showDate: React.PropTypes.bool,
		showTimezone: React.PropTypes.bool,

		//Timestamp Format (Overrides output, showTime and showDate)
		//e.g. `dddd, MMMM Do YYYY, h:mm:ss a`
		//more information http://momentjs.com/docs/#/displaying/format/
		format: React.PropTypes.string
	}


	static defaultProps = {
		//time: Math.floor( Date.now() / 1000 ), //current epoch time
		timezone: "UTC",
		output: "absolute",
		outputTimezone: moment.tz.guess(), //user timezone
		showTime: true,
		showDate: true,
		showTimezone: false
	}


	//create moment object from time prop
	create(){

		var momentObject,
			timestamp,
			time = this.props.time,
			timezone = this.props.timezone;

		if(!time){

			this.timestamp = moment()

		} else {

			//try as unix timestamp
			momentObject = moment.unix(Number(time))

			if(!momentObject.isValid()) {
				momentObject = moment.parseZone(time)
			}

			//Timezone Adjustment
			timestamp = momentObject.clone();
			timestamp.utcOffset(
				this.getTzOffset( time, timezone ) / 60 //offset returned in minutes, converted to hours
			);
			timestamp.add(momentObject.utcOffset()-timestamp.utcOffset(), 'minutes'); //adjust time difference

			this.timestamp = timestamp.tz(this.props.outputTimezone); //Adjust timezone for output
		}

	}


	//get formatted timestamp
	format(timestamp){

		//Use format prop if passed
		if(this.props.format)
			return timestamp.format(this.props.format)


		//create format from showTime & showDate props
		var showDate = this.props.showDate,
			showTime = this.props.showTime,
			format;

		if(showDate && showTime)
			format = 'MMMM Do YYYY, h:mm a'

		else if(showDate)
			format = 'MMMM Do YYYY'

		else if(showTime)
			format = 'h:mm a'

		//output style
		switch(this.props.output) {
			case 'relative':
				return this.state.timeElapsed;

			case 'calendar':
				return timestamp.calendar();

			default: //absolute
				return timestamp.format(format);
		}
	}


	//Get timezone offset value (in minutes)
	getTzOffset(time, timezone){

		var _moment = moment(time).tz(timezone)
		return _moment.utcOffset()

	}

	//Get hour:minutes version of offset value
	getTzOffset_formatted(time, timezone) {

		var offset = moment(time).tz(timezone).utcOffset() / 60,
			hours = Math.floor(offset),
			minutes = ( offset - hours ) * 60,
			_hours = (hours < 0) ? `${hours}` : `+${hours}`,
			_minutes = ('0'+minutes).slice(-2);
		return _hours + ':' +_minutes

	}

	//Timezone for display (UTC -06:00)
	getTZdisplay(){
		var timezone = this.props.outputTimezone || this.props.timezone;

		return (
			<span title={timezone}>
				(UTC {this.getTzOffset_formatted( this.timestamp.format(), timezone )})
			</span>
		)
	}


	//returns the amount of seconds elapsed since {this.props.time}
	timeElapsed(){
		return this.timestamp.fromNow()
	}


	componentWillUpdate(){
		this.create();
	}


	componentDidMount(){
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


	componentWillUnmount(){
		//stop repeater
		window.clearTimeout( this._timer )
	}


	render() {

		var style = Pod_Styler.getStyle(this),
			timestamp = this.format(this.timestamp, this.props.time),
			timezone = (this.props.showTimezone && this.props.output == "absolute") ? this.getTZdisplay() : null;

		return (
			<span style={style.main} title={ this.timestamp.format('MMMM Do YYYY, h:mm a') }>
				{timestamp} {timezone}
			</span>
		)
	}
};
