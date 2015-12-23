/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Radium from 'radium';
import Color from 'color';
import Pod_Styler from '../styler';
import Pod_Vars from '../vars';

/**
* Template component
*
* @element Pod_template
*
*/
var Pod_template = React.createClass({

  //Validate props
  propTypes: {

  },

  //Default props
  getDefaultProps: function() {
    return {

    }
  },

  render: function() {
    return (
      <div style={Pod_Styler.getStyle(this)}
        {this.props.children}>
      </div>
    );

  }

});

module.exports = Radium(Pod_template);
