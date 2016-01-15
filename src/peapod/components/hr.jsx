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
* @element Pod_hr
*
*/
var Pod_hr = React.createClass({

	render: function() {
		return (
			<hr style={Pod_Styler.getStyle(this)} />
		);

	}

});

module.exports = Pod_hr;
