/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Radium from 'radium';
import Color from 'color';
import Pod_Styler from 'peapod/mixins/styler';
import Pod_Vars from 'peapod/mixins/vars';

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
    var componentStyle = Pod_Styler.getStyle(this);

    return (
      <div
        className={this.props.className}
				style={componentStyle}
        {this.props.children}>
      </div>
    );

  }

});

module.exports = Radium(Pod_template);
