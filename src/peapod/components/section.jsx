/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Styler from '../styler.jsx';
var Wrapper = require('../wrapper.jsx')


var Section = React.createClass({
  render: function() {
    return (
        <section varSet={this.props.varSet} style={Pod_Styler.getStyle(this)} >
			{this.props.children}
		</section>
      );
	}

});

module.exports = Wrapper(Section);
