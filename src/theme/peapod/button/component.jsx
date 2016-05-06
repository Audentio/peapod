/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


var React = require('react');

var Color = require('color');
var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')


/**
* Buttons component
*
* @element Pod_button
*
* @param {string} [label=Submit] - Button label text
* @param {string} [kind=default] - Generic button style/state (danger/warning/success)
*
*/
var Button = React.createClass({

	//Validate props
	propTypes: {
		label: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.object ]),
		href: React.PropTypes.string,
		disabled: React.PropTypes.bool
	},

	//Default props
	getDefaultProps: function() {
		return {
			label: 'Submit',
			styler: {}
		}
	},

	render: function() {
		var style = Pod_Styler.getStyle(this);

		//Anchor tag <a> if href specified
		if (this.props.href) {
			return (
				<a href={this.props.href} style={style.main} onClick={this.props.onClick}>
					{this.props.children || this.props.label}
				</a>
			);
		}

		//Default: <button> tag
		else {
			return (
				<button
					style={style.main}
					onClick={this.props.onClick}>
					{this.props.children || this.props.label}
				</button>
			);
		}
	}

});

module.exports = Wrapper(Button);
