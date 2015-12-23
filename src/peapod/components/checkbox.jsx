/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';

var Pod_Styler = require('../styler.jsx');
var Pod_Vars = require('../vars.jsx');
var Pod_icon = require('./icon.jsx');
/**
* Checkbox component
*
* @element Pod_checkbox
*
* @param {bool} [checked=false] - checkbox state
* @param {string} [label] - checkbox label text
*
*/

var Pod_checkbox = React.createClass({
	getInitialState: function() {
		return {
			checked: this.props.checked,
			className: (this.props.checked) ? "Pod_checkbox Pod_checkbox--checked" : "Pod_checkbox"
		}
	},

	onChangeHandler: function(e){

		this.setState({
			className: (e.target.checked) ? "Pod_checkbox Pod_checkbox--checked" : "Pod_checkbox",
			checked: e.target.checked
		})

	},

	render: function(){
		var labelStyle = (this.props.label) ? {}:{display:'none'};
		var icon = (this.props.icon) ?
			<Pod_icon styler={{style: Pod_Styler.getStyle(this, 'icon')}}>{this.props.icon}</Pod_icon> :
			<Pod_icon styler={{style: Pod_Styler.getStyle(this, 'icon')}}>check</Pod_icon>;

		return (
			<label style={Pod_Styler.getStyle(this, 'wrapper')}>
				<span style={Pod_Styler.getStyle(this, 'box')}>
					<input style={Pod_Styler.getStyle(this, 'input')} onChange={this.onChangeHandler} className="Pod_checkbox__input" type="checkbox" checked={this.state.checked} />
					<span style={Pod_Styler.getStyle(this)}></span>
					{icon}
				</span>
				<span style={Pod_Styler.getStyle(this, 'label')} >{this.props.label}</span>
			</label>
		);
	}
})

module.exports = Pod_checkbox;
