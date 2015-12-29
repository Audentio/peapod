/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');


var Pod_div = React.createClass({
	render: function() {
		var {styler, children, ...other} = this.props;

		return (
			<div {...other} style={Pod_Styler.getStyle(this)}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Radium(Pod_div);
