/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
var Pod_Styler = require('../styler.jsx');

var Pod_tableCell = React.createClass({
	render: function() {
		var mouseEnter = (this.props.onMouseEnter) ? this.props.onMouseEnter : '',
			mouseLeave = (this.props.onMouseLeave) ? this.props.onMouseLeave : '',
			column = '' + this.props.styler.column;

		return (
			<div data-table-column={column} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={Pod_Styler.getStyle(this)}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Radium(Pod_tableCell);
