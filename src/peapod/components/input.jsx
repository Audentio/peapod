/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Pod_icon = require('./icon.jsx');
var Wrapper = require('../wrapper.jsx')


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
		var value = e.target.value,
			placeholder = ( value.length > 0 ) ? '' : this.props.placeholder,
			callback = this.props.callback || function() {};

		callback(value)

		this.setState({ value: value , placeholder: placeholder });
	},

	onFocus: function(e){
		this.setState({ focus: true })
	},

	onBlur: function(e){
		this.setState({ focus: false })
	},

	render: function() {
		return (
			<div onFocus={this.onFocus} onBlur={this.onBlur} style={Pod_Styler.getStyle(this, 'wrapper')}
				 className={this.props.className}>

				<span style={Pod_Styler.getStyle(this, 'placeholder')}>{this.props.icon && <Pod_icon styler={{style: Pod_Styler.getStyle(this, 'icon')}}>{this.props.icon}</Pod_icon>}{this.state.placeholder}</span>

				<input name={this.props.name} type={this.props.type} onFocus={this.onFocusHandler} style={Pod_Styler.getStyle(this)}
					   value={this.state.value} onChange={this.onChangeHandler} />
			</div>
		);
	}

});


module.exports = Wrapper(Input);
