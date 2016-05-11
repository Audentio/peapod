/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';

import {Icon} from 'components.js'


/**
* Notifications component
*
* @element Pod_notification
* @param {boolean} [dismissable=true] - Allow user to dismiss the notification
* @param {string} [ID] - Unique identifier for persistent state storage
*
*/
module.exports = class Notification extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			dismissed: this.isDismissed()
		}
	}

	//Validate props
	static propTypes = {
		dismissable: React.PropTypes.bool,
		id: React.PropTypes.string,
		title: React.PropTypes.string
	}


	//Check if user dismissed the notification already
	isDismissed() {

		var persistentState = localStorage[`Pod_notification_${this.props.id}_hidden`];

		if(this.props.dismissable && persistentState && persistentState === 'true') {
			return true
		}

		return false
	}


	//@fucntion dismiss()
	//onDismiss handler
	dismiss() {

		//set state
		this.setState({
			dismissed: true
		})

		//set persistent state (localStorage)
		localStorage[`Pod_notification_${this.props.id}_hidden`] = true

	}


	componentWillMount() {
		if (this.props.dismissable && this.props.id === undefined) {
			console.warn('Pod_notification: ID not supplied for dismissable notification. State will not be persistent')
			return false;
		}
	}


	static defaultProps = {
		styler: {
			kind: 'general'
		}
	}

	render() {
		var style = Pod_Styler.getStyle(this);

		return (
			<div style={style.main} id={this.props.id}>
			{
				!this.state.dismissed &&

				<div style={style.wrapper}>

					{this.props.title && <strong style={style.title}>{this.props.title}</strong> }

					<span style={style.message}>
						{this.props.children}
					</span>
					{this.props.dismissable &&
						<Icon onClick={this.dismiss} styler={{style: style.dismissIcon}} color="#07ADD4">close</Icon>
					}
				</div>
			}
			</div>
		)

	}
};
