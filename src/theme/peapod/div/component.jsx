/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'styler.js';
 import Wrapper from 'wrapper.jsx';


var Div = React.createClass({
	render: function() {
		var {styler, children, ...other} = this.props,
			style = Pod_Styler.getStyle(this);

		return (
			<div {...other} style={style.main}>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Wrapper(Div);
