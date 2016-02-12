/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');

/**
* Template component
*
* @element Pod_template
*
*/
var Paragraph = React.createClass({

	render: function() {
		return (
			<p style={Pod_Styler.getStyle(this)}>
				{this.props.children}
			</p>
		);

	}

});

module.exports = Paragraph;
