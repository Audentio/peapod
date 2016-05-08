/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';

import {Icon} from 'components.js';

/**
* Checkbox component
*
* @element Checkbox
*
* @param {bool} [checked=false] - checkbox state
* @param {string} [label] - checkbox label text
*
*/

var Checkbox = React.createClass({
	getInitialState: function() {
		return {
			checked: this.props.checked == true,
		}
	},

	onChangeHandler: function(e){
		if (typeof(this.props.onChange) !== 'undefined') this.props.onChange(e.target.checked);

		this.setChecked(e.target.checked);
	},

	setChecked: function(state) {
		this.setState({
			checked: state
		})
	},

	getDefaultProps: function() {
		return {
			setChecked: function() {
				this.setChecked(true);
			},
			setUnchecked: function() {
				this.setChecked(false);
			}
		}
	},

	componentWillReceiveProps: function(nextProps) {
		if (typeof(nextProps.checked) !== 'undefined') {
			this.setState({
				checked: nextProps.checked == true
			})
		}
	},

	componentWillMount: function() {
		if (typeof(this.props.onChange) !== 'undefined') this.props.onChange(this.state.checked);
	},

	render: function(){
		var style = Pod_Styler.getStyle(this),
			icon = (this.props.icon) ?
			<Icon styler={{style: style.icon}}>{this.props.icon}</Icon> :
			<Icon styler={{style: style.icon}}>check</Icon>;

		return (
			<div style={style.main}>
				<label style={style.wrapper}>
					<span style={style.box}>
						<input style={style.input} onChange={this.onChangeHandler} className="Pod_checkbox__input" type="checkbox" checked={this.state.checked} />
						<span style={style.innerBox}></span>
						{icon}
					</span>
					<span style={style.label} >{this.props.label}</span>
				</label>
			</div>
		);
	}
})

module.exports = Wrapper(Checkbox);
