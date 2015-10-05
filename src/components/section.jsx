/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */
 
import React from 'react';
import Radium from 'radium';
import 'components/mixins/styler';

var Pea_section = React.createClass({
  mixins: [Pea_Styler],

  processChildren: function(props) {
  	if (props.vars) {
  		var children = [];
  		for (var i = 0, len = props.children.length; i < len; i++) {
  			children.push(React.cloneElement(props.children[i], {vars: props.vars, key: i}));
  		}
  		return children;
  	}
  	return props.children;
  },

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

  	var newChildren = this.processChildren(this.props);

    return (
        <div className="section" key={'buttons2'} vars={this.props.vars} style={Pea_Styler.getStyle(this)} >
			<h1>{this.props.title}</h1>
			{newChildren}
		</div>
      );
	}
    
});

module.exports = Radium(Pea_section);