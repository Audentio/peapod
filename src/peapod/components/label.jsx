import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')


import Pod_icon from './icon.jsx';

var Label = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);

		var icon = (typeof(this.props.icon) !== 'undefined' && this.props.icon.length) ? <Pod_icon styler={{style: style.icon}}>{this.props.icon}</Pod_icon> : null

		return (
			<div style={style.main}>
				{icon} {this.props.children}
			</div>
		)
	}
});

module.exports = Wrapper(Label);
