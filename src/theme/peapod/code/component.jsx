/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';

/**
* Code component
* @element Code
*/
module.exports = class Code extends React.Component {

	render() {
		var style = Pod_Styler.getStyle(this);
		return (
			<code style={style.main}>
				{this.props.children}
			</code>
		);

	}

};
