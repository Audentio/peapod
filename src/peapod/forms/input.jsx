/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Radium from 'radium';

var Pea_Styler = require('../mixins/styler.jsx');
var Pea_Vars = require('../mixins/vars.jsx');
var Pea_icon = require('../icon.jsx');

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

	getBaseStyle: function() {
		return [
			{
				childEle: 'wrapper',
				global: {
					display: 'inline-block',
					position: 'relative',
					border: '1px solid #ddd'
				}
			}, {
				global: {
					fontSize: 'inherit',
					fontFamily: 'inherit',
					color: 'inherit',
					backgroundColor: 'transparent',
					position: 'relative',
					zIndex: 2,
					border: 0,
					outline: 0,
					paddingLeft: '10px',
					paddingRight: '10px',
					lineHeight: 'inherit',
					width: '100%',
				}
			}, {
				childEle: 'placeholder',
				global: {
					fontSize: 'inherit',
					fontFamily: 'inherit',
					color: 'inherit',
					zIndex: 1,
					paddingLeft: '10px',
					paddingRight: '10px',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				}
			}, {
				childEle: 'icon',
				global: {
					marginLeft: '4px',
					marginRight: '4px',
					lineHeight: 'inherit'
				}
			}
		]
	},

	render: function() {
		return (
			<div style={Pea_Styler.getStyle(this, 'wrapper')}
				 className={this.props.className}>

				<span style={Pea_Styler.getStyle(this, 'placeholder')}>{<Pea_icon style={Pea_Styler.getStyle(this, 'icon')}>{this.props.icon}</Pea_icon>}{this.state.placeholder}</span>

				<input ref={this.props.ref} type={this.props.type} onFocus={this.onFocusHandler} style={Pea_Styler.getStyle(this)}
					   value={this.state.value} onChange={this.onChangeHandler} />
			</div>
		);
	}

});


module.exports = Radium(Pea_input);
