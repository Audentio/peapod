/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';

/**
* Checkbox component
*
* @element Pea_checkbox
*
* @param {bool} [checked=false] - checkbox state
* @param {string} [label] - checkbox label text
*
*/

var Pea_checkbox = React.createClass({
	getInitialState: function() {
		return {
			checked: this.props.checked,
			className: (this.props.checked) ? "Pea_checkbox Pea_checkbox--checked" : "Pea_checkbox"
		}
	},

	onChangeHandler: function(e){

		this.setState({
			className: (e.target.checked) ? "Pea_checkbox Pea_checkbox--checked" : "Pea_checkbox",
			checked: e.target.checked
		})

	},

	render: function(){
		var className = (this.props.kind) ? ' Pea_checkbox--'+this.props.kind : '';
		var labelStyle = (this.props.label) ? {}:{display:'none'};

		return (
			<label className={this.state.className + className}>
				<span className="Pea_checkbox__box">
					<input onChange={this.onChangeHandler} className="Pea_checkbox__input" type="checkbox" checked={this.state.checked} />
					<span className="Pea_checkbox__icon"></span>
					<span className="Pea_checkbox__base"></span>
				</span>

				<span style={labelStyle} className="Pea_checkbox__label">{this.props.label}</span>
			</label>
		);
	}
})

module.exports = Pea_checkbox;
