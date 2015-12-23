/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';

var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');
var Pod_icon = require('./icon.jsx');

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
var Pod_input = React.createClass({

	//Validate props
	propTypes: {
		type: React.PropTypes.oneOf(['text','password']),
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			value: this.props.value,
			focus: false,
			placeholder: (this.props.value && this.props.value.length > 1) ? undefined : this.props.placeholder //undefined if value prop exists
		};
	},

	onChangeHandler: function(e){

		var VALUE = e.target.value,
			PLACEHOLDER = ( VALUE.length > 0 ) ? '' : this.props.placeholder;

		this.setState({  value:VALUE , placeholder:PLACEHOLDER });

	},

	onFocus: function(e){
		this.setState({ focus: true })
	},

	onBlur: function(e){
		this.setState({ focus: false })
	},

	getValue: function() {
		return this.state.value;
	},

	render: function() {
		return (
			<div onFocus={this.onFocus} onBlur={this.onBlur} style={Pod_Styler.getStyle(this, 'wrapper')}
				 className={this.props.className}>

				<span style={Pod_Styler.getStyle(this, 'placeholder')}>{<Pod_icon styler={{style: Pod_Styler.getStyle(this, 'icon')}}>{this.props.icon}</Pod_icon>}{this.state.placeholder}</span>

				<input type={this.props.type} onFocus={this.onFocusHandler} style={Pod_Styler.getStyle(this)}
					   value={this.state.value} onChange={this.onChangeHandler} />
			</div>
		);
	}

});


module.exports = Radium(Pod_input);
