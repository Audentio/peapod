/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

import Pod_Styler from '../styler.jsx'
import Pod_Vars from '../vars.jsx'
var Wrapper = require('../wrapper.jsx')



/**
* Alerts component
*
* @element Pod_alert
* @param {boolean} [dismissable=true] - Allow user to dismiss alert
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
var Alert = React.createClass({


	//Validate props
	propTypes: {
		dismissable: React.PropTypes.bool,
		id: React.PropTypes.string
	},


	//Check if user dismissed the alert already
	isDismissed: function() {

		var persistentState = localStorage[`Pod_alert_${this.props.id}_hidden`];

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

		if(this.props.dismissable) {

			if (this.props.id === undefined) {
				console.warn('Pod_Alert: ID not supplied for dismissable alert. State will not be persistent')
				return false;
			}

			//set persistent state (localStorage)
			localStorage[`Pod_alert_${this.props.id}_hidden`] = true
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


module.exports = Wrapper(Alert);
