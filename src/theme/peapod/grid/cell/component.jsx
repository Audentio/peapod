/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';
 import Wrapper from 'wrapper.jsx';



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
