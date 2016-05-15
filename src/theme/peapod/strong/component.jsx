/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';


/**
* <Strong>
*
* @element Strong
*
*/
module.exports = class Strong extends React.Component {

	render() {
		let style = Pod_Styler.getStyle(this);

		return (
			<strong style={[style.main, {fontWeight: 'bold'}]}>
                {this.props.children}
            </strong>
		)
	}

}
