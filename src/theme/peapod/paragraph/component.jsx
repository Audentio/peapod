/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'utility/styler.js';

/**
* Template component
*
* @element Pod_template
*
*/
module.exports = class Paragraph extends React.Component {

	render() {
		var style = Pod_Styler.getStyle(this);

		return (
			<p style={style.main}>
				{this.props.children}
			</p>
		);

	}

};
