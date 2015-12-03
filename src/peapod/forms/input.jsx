/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Radium from 'radium';

import 'peapod/theme';


var defaultStyle = {
	inputWrapper: {
		display: 'inline-block',
		position: 'relative',
		border: '1px solid #ddd'
	},

	inputElement: {
		fontSize: 'inherit',
		fontFamily: 'inherit',
		backgroundColor: 'transparent',
		position: 'relative',
		zIndex: 2,
		border: 0,
		outline: 0,
		padding: '10px',
		lineHeight: 'inherit'
	},

	inputPlaceholder: {
		fontSize: 'inherit',
		fontFamily: 'inherit',
		color: 'inherit',
		opacity: '.5',
		zIndex: 1,
		padding: '10px',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%'
	}
},

themeStyle = peapod_style.input = peapod_style.input || {};


/**
* Multipurpose Input component
*
* @element Pea_input
*
* @param {string} [type=text] - Input type
* @param {string} [value] - Input value
* @param {string} [placeholder] - Placeholder text
*
*/
var Pea_input = React.createClass({

	//Validate props
	propTypes: {
		type: React.PropTypes.oneOf(['text','password']),
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string
	},

	getInitialState: function() {
		return {
			value: this.props.value,
			placeholder: (this.props.value && this.props.value.length > 1) ? undefined : this.props.placeholder //undefined if value prop exists
		};
	},

	onChangeHandler: function(e){

		var VALUE = e.target.value,
			PLACEHOLDER = ( VALUE.length > 0 ) ? '' : this.props.placeholder;

		this.setState({  value:VALUE , placeholder:PLACEHOLDER });

	},

	onFocusHandler: function(e){
		this.setState({ focus: true })
	},

	render: function() {
		var self = this;
		return (
			<div style={[ defaultStyle.inputWrapper, themeStyle.inputWrapper, this.props.style]}
				 className={this.props.className}>

				<span style={[ defaultStyle.inputPlaceholder, themeStyle.inputPlaceholder ]}>{this.state.placeholder}</span>

				<input onFocus={this.onFocusHandler} style={[ defaultStyle.inputElement, themeStyle.inputElement ]}
					   type="text" value={this.state.value} onChange={this.onChangeHandler} />
			</div>
		);
	}

});


module.exports = Radium(Pea_input);
