/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import ReactDOM from 'react-dom';
var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')



var GridCell = React.createClass({
	render: function() {
		var style = Pod_Styler.getStyle(this);
		return (
			<div style={style.main}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Wrapper(GridCell);
