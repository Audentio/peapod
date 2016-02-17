/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

var Pod_Styler = require('../styler.jsx')
var Pod_Vars = require('../vars.jsx')
var Wrapper = require('../wrapper.jsx')



/**
* Notifications component
*
* @element Pod_notification
* @param {boolean} [dismissable=true] - Allow user to dismiss notification
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
var Notification = React.createClass({


	//Validate props
	propTypes: {
		dismissable: React.PropTypes.bool,
		id: React.PropTypes.string,
		title: React.PropTypes.string
	},


	//Check if user dismissed the notification already
	isDismissed: function() {

		var persistentState = localStorage[`Pod_notification_${this.props.id}_hidden`];

		if(this.props.dismissable && persistentState && persistentState === 'true') {
			return true
		}

		return false
	},


	//@fucntion dismiss()
	//onDismiss handler
	dismiss: function() {

		//set state
		this.setState({
			dismissed: true
		})

		//set persistent state (localStorage)
		localStorage[`Pod_notification_${this.props.id}_hidden`] = true

	},


	componentWillMount: function() {
		if (this.props.dismissable && this.props.id === undefined) {
			console.warn('Pod_notification: ID not supplied for dismissable notification. State will not be persistent')
			return false;
		}
	},


	getDefaultProps: function(){
		return {
			styler: {
				kind: 'general'
			}
		}
	},


	getInitialState: function(){
		return {
			dismissed: this.isDismissed()
		}
	},


	render: function() {

		return (
			<div style={Pod_Styler.getStyle(this, 'wrapper')} id={this.props.id}>
			{
				!this.state.dismissed &&

				<div style={Pod_Styler.getStyle(this)}>

					{this.props.title && <strong style={Pod_Styler.getStyle(this, 'title')}>{this.props.title}</strong> }

					<span style={Pod_Styler.getStyle(this, 'message')}>
						{this.props.children}
					</span>
					{this.props.dismissable &&
						<Pod.icon onClick={this.dismiss} styler={{style:Pod_Styler.getStyle(this, 'dismissIcon')}} color="#07ADD4">close</Pod.icon>
					}
				</div>
			}
			</div>
		)

	}


});


module.exports = Wrapper(Notification)
