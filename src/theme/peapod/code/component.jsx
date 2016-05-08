/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import Pod_Styler from 'styler.js';
import Wrapper from 'wrapper.jsx';

/**
* Code component
* @element Code
*/
var Code = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);
		return (
			<code style={style.main}>
				{this.props.children}
			</code>
		);

	}

});

module.exports = Wrapper(Code);
