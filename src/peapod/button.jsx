/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react'
import Radium from 'radium'
import 'peapod/theme'
import Color from 'color'
import Pea_Styler from 'peapod/mixins/styler'


//generate style object for button kinds
var generateKind = function(
  backgroundColor = '#444',
  color = 'white'){

  if (color == 'white') {
    var hoverColor = Color(backgroundColor).lighten(0.2).rgbString();
  } else {
    var hoverColor = Color(backgroundColor).darken(0.2).rgbString();
  }

  return {
    backgroundColor: backgroundColor,
    color: color,

    ':hover': {
      backgroundColor: hoverColor
    }
  }
},


themeStyle = peapod_style.button = peapod_style.button || {};

/**
* Buttons component
*
* @element Pea_button
*
* @param {string} [label=Submit] - Button label text
* @param {string} [kind=default] - Generic button style/state (danger/warning/success)
*
*/
var Pea_button = React.createClass({

  mixins: [Pea_Styler],

  //Validate props
  propTypes: {
    kind: React.PropTypes.oneOf(['default','primary', 'warning', 'danger', 'success']),
    label: React.PropTypes.string,
    href: React.PropTypes.string,
    disabled: React.PropTypes.bool
  },

  //Default props
  getDefaultProps: function() {
    return {
      label: 'Submit',
			kind: 'default'
    }
  },

  getBaseStyle: function() {
    return [
      {
        global: {
          display: 'inline-block',

          borderRadius: peapod_style.config['radius'], //theme.js
          border: '0px solid transparent',

          padding: peapod.elSize(), //theme.js

          textDecoration: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',

          outline: 'none',

          transitionDuration: peapod_style.config['transition-duration'], //theme.js

          //base:hover
          ':hover': {
            cursor: 'pointer'
          },

          //base:active
          ':active': {
            transform: 'scale(.92)',
            transitionDuration: '.03s'
          }
        }
      },
      {
        global: {
          boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
        },
        props: {
          raised: true
        }
      },
      {
        global: {
          borderRadius: '1000px'
        },
        props: {
          round: true
        }
      },
      {
        global: generateKind('#444'),
        pastel: generateKind('#DDD', 'black'),
        neon: generateKind('#FFF', 'black'),
        props: {
          kind: 'default'
        }
      },
      {
        global: generateKind(peapod_style.config['brand-primary']),
        pastel: generateKind('#9FF', 'black'),
        neon: generateKind('#0FF', 'black'),
        props: {
          kind: 'primary'
        }
      },
      {
        global: generateKind(peapod_style.config['brand-success']),
        pastel: generateKind('#9F9', 'black'),
        neon: generateKind('#0F0', 'black'),
        props: {
          kind: 'success'
        }
      },
      {
        global: generateKind(peapod_style.config['brand-warning']),
        pastel: generateKind('#FF9', 'black'),
        neon: generateKind('#FF0', 'black'),
        props: {
          kind: 'warning'
        }
      },
      {
        global: generateKind(peapod_style.config['brand-danger']),
        pastel: generateKind('#F99', 'black'),
        neon: generateKind('#F00', 'black'),
        props: {
          kind: 'danger'
        }
      }
    ]
  },

  render: function() {

    //Anchor tag <a> if href specified
    if (this.props.href) {
      return (
        <a
          href={this.props.href}
          className={this.props.className}
					style={Pea_Styler.getStyle(this)}
          onClick={this.props.onClick}>
          {this.props.label} {this.props.children} {this.props.seconds}
        </a>
      );
    }

    //Default: <button> tag
    else {
      return (
        <button
          className={this.props.className}
					style={Pea_Styler.getStyle(this)}
          onClick={this.props.onClick}>
          {this.props.label} {this.props.seconds}
        </button>
      );
    }
  }

});

module.exports = Radium(Pea_button);
