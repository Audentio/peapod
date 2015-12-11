/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Radium from 'radium';
import 'peapod/theme';
import Color from 'color';
import Pea_Styler from 'peapod/mixins/styler';
import Pea_Vars from 'peapod/mixins/vars';
 
/**
* Template component
*
* @element Pea_template
*
*/
var Pea_template = React.createClass({

  mixins: [Pea_Styler],

  //Validate props
  propTypes: {
    
  },

  //Default props
  getDefaultProps: function() {
    return {
      
    }
  },

  getBaseStyle: function() {
    return [
      {
        global: {
          
        }
      }
    ]
  },

  render: function() {
    var componentStyle = Pea_Styler.getStyle(this);
    
    return (
      <div
        className={this.props.className}
				style={componentStyle}
        {this.props.children}>
      </div>
    );

  }

});

module.exports = Radium(Pea_template);
