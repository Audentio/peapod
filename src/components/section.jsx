/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
import React from 'react';
import Radium from 'radium';
import Pea_Styler from 'components/mixins/styler';

var Pea_section = React.createClass({
  mixins: [Pea_Styler],

  getBaseStyle: function() {
    return [
      {
        global: {
          color: 'black',
          backgroundColor: 'white'
        },
        pastel: {
        	color: 'white',
        	backgroundColor: '#333'
        },
        neon: {
        	color: '#F0F',
        	backgroundColor: '#000'
        }
      },
      {

      }
    ]
  },

  render: function() {

  	var newChildren = Pea_Styler.processChildren(this.props);

    return (
        <div className="section" key={'buttons2'} vars={this.props.vars} style={Pea_Styler.getStyle(this)} >
			<h1>{this.props.title}</h1>
			{newChildren}
		</div>
      );
	}
    
});

module.exports = Radium(Pea_section);