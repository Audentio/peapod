/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from '../styler.js';
var Wrapper = require('../wrapper.jsx')


var Section = React.createClass({
	render: function() {
		var style = Pod_Styler.getStyle(this);

		return (
			<section varSet={this.props.varSet} style={style.main} >
				{this.props.children}
			</section>
		);
	}

});

module.exports = Wrapper(Section);
