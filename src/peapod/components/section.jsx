/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Pod_Styler from '../styler.jsx';

var Pod_section = React.createClass({
  render: function() {
    return (
        <section varSet={this.props.varSet} style={Pod_Styler.getStyle(this)} >
			{this.props.children}
		</section>
      );
	}

});

module.exports = Pod_section;
