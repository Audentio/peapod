/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

 import React from 'react';
 import Pod_Styler from 'utility/styler.js';



module.exports = class Grid extends React.Component {
	render() {
		var style = Pod_Styler.getStyle(this);
		return (
			<div style={style.main}>
				{this.props.children}
			</div>
		);
	}

};
