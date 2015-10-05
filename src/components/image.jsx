/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
import React from 'react';

var Pea_image = React.createClass({
  
  render: function() {
    return (
        <span>{this.props.src}</span>
      );
	}
    
});

module.exports = Pea_image;