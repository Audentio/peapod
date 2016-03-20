/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.jsx');
var Wrapper = require('../wrapper.jsx')


/**
* Template component
*
* @element Pod_template
*
*/
var Paragraph = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);

		return (
			<p style={style.main}>
				{this.props.children}
			</p>
		);

	}

});

module.exports = Wrapper(Paragraph);
