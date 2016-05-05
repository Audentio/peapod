/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react'
import ReactDOM from 'react-dom'

import Pod_Styler from '../styler.js'
import Icon from './icon.jsx'
import Wrapper from '../wrapper.jsx'

/**
* Multipurpose Input component
*
* @element Pod_input
*
* @param {string} [type=text] - Input type
* @param {string} [value] - Input value
* @param {string} [placeholder] - Placeholder text
*
*/
var Input = React.createClass({

	//Validate props
	propTypes: {
		type: React.PropTypes.oneOf(['text','password', 'email', 'url', 'number']),
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		required: React.PropTypes.bool,
		validate: React.PropTypes.oneOfType([
			React.PropTypes.func,
			React.PropTypes.bool
		]),
		validationResponse: React.PropTypes.object
	},

	getDefaultProps: function(){
		return {
			type: 'text',

			//validation is disabled by default
			validate: false,
			validationResponse: {
				invalid: 'Invalid input',
				valid: 'Valid',
				empty: 'This field is required'
			}
		}
	},

	getInitialState: function() {
		return {
			value: this.props.value,
			focus: false,

			///8
			placeholder: (this.props.value && this.props.value.length > 1) ? '' : this.props.placeholder,
			evaluation: null //validation state
		}
	},

	evaluate: function(value){

		//If value is empty
		// -- return 'empty' if required
		// -- else return null (makes sure there's no notice or style change)
		if(value === undefined || value === '')
			return (this.props.required) ? 'empty' : null

		switch (this.props.type) {

			//Field type: E-mail
			//uses a rather simple regex for validation
			case 'email':
				return ( value.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/) ) ? 'valid' : 'invalid'

			//Field type: URL
			//verify a URL
			case 'url':
				var expr = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
				return ( value.match(expr) ) ? 'valid' : 'invalid'

			//Regular text type field
			default:
				return 'valid'

		}
	},

	validate: function(value = this.state.value) {

		//no validation required. halt
		if(!this.props.validate)
			return false

		//Use custom validation function if passed
		//else use predefined evaluation function
		var evaluation = (typeof this.props.validate == 'function') ? this.props.validate(value) : this.evaluate(value)

		this.setState({evaluation:evaluation})

	},

	onChangeHandler: function(e){
		var value = e.target.value,
			placeholder = ( value.length > 0 ) ? '' : this.props.placeholder,
			callback = this.props.callback || function() {};

		//evaluate if evaluated before
		if(this.state.evaluation !== null) {
			this.validate(value)
		}

		callback(value)

		this.setState({ value: value , placeholder: placeholder });
	},

	onFocus: function(e){
		this.setState({ focus: true })
	},

	onBlur: function(e){
		this.setState({ focus: false })

		//autofix missing protocol
		//http is assumed
		if(	this.props.type == 'url' && //URL type input
			this.props.validate != false && //validation enabled
			this.state.value && this.state.value.length > 0 &&  //Value is non-empty & has a dot
			this.state.value.match(/(?:[a-z][a-z0-9_]*)(\.)(?:[a-z][a-z0-9_]*)/) && //There's a dot in between
			this.state.value.indexOf('://') == -1 //protocol not defined
		){
			var value = 'http://'+this.state.value.trim()
			this.setState({ value: value })
			this.validate(value)
		} else {
			this.validate()
		}
	},

	render: function() {
		var style = Pod_Styler.getStyle(this);

		//Message to show in response box
		var validationResponse = this.props.validationResponse[this.state.evaluation]

		return (
			<div style={style.main}>

				{
					this.props.icon &&
					<Icon style={style.icon}>{this.props.icon}</Icon>
				}

				{
					this.state.placeholder &&
					<span style={style.placeholder}>{this.props.placeholder}</span>
				}

				<input
					name={this.props.name}
					type={this.props.type}
					style={style.input}
					value={this.state.value}
					required={this.props.required}

					onChange={this.onChangeHandler}
					onFocus={this.onFocus}
					onBlur={this.onBlur} />
				{
					(this.state.evaluation !== null) &&
					<div style={style.evaluation}>{validationResponse}</div>
				}
			</div>
		);
	}

});


module.exports = Wrapper(Input);
