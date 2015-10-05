/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import moment from 'moment';

/**
* Create live timestamp from valid date.
*
* @element Pea_liveTimestamp
* @property {(string|Object)} time - IETF-compliant RFC 2822 timestamp string or Date Object 
*/
var Pea_liveTimestamp = React.createClass({
	
	/**
	* return the amount of seconds elapsed since {this.props.time}
	* @function
	* @returns {Number} seconds elapsed
	*/
	timeElapsed: function(){
		//return Math.ceil( ( new Date().getTime() - this.timestamp.getTime() ) / 1000 )
		return this.timestamp.fromNow();
	},
	
	
	getInitialState: function() {
	
		//create moment object from time property
		this.timestamp = moment(this.props.time)
		
		return {
			timeElapsed: this.timeElapsed()
		};
		
	},
	
	componentDidMount: function(){
	
		var self = this;
		
		//start repeater
		this._timer = setInterval(function(){
			self.setState({ timeElapsed: self.timeElapsed() })
		}, 1000*60)
		
	},
	
	
	componentWillUnmount: function(){
	
		//stop repeater
		window.clearTimeout( this._timer ) ;
		
	},
	
	
	render: function() {
		
		return (
			<span title={moment(this.props.time).format('MMMM Do YYYY, h:mm:ss a')}>{this.state.timeElapsed}</span>
		);
		
	}
    
});


module.exports = Pea_liveTimestamp;