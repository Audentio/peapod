/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Section extends React.Component {
	render() {
		var style = Pod_Styler.getStyle(this);

		return (
			<section varSet={this.props.varSet} style={style.main}>
				{this.props.children}
			</section>
		);
	}

};
