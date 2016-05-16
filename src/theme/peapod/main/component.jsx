/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Main extends React.Component {
	render() {
		var {styler, children, ...other} = this.props,
			style = Pod_Styler.getStyle(this);

		return (
			<main {...other} style={style.main}>
				{this.props.children}
			</main>
		);
	}

};
