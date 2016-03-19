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
* @element Pod_hr
*
*/
var Hr = React.createClass({

	render: function() {
		var style = Pod_Styler.getStyle(this);
		return (
			<hr style={style.main} />
		);

	}

});

module.exports = Wrapper(Hr);
