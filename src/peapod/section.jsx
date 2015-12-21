/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import Radium from 'radium';
import Pod_Styler from './mixins/styler.jsx';

var Pod_section = React.createClass({
  render: function() {
    return (
        <div className="section" key={'buttons2'} vars={this.props.vars} style={Pod_Styler.getStyle(this)} >
			<h1>{this.props.title}</h1>
			{newChildren}
		</div>
      );
	}

});

module.exports = Radium(Pod_section);
