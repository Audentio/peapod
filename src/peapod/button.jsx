/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
/*
import React from 'react';
import Radium from 'radium';
import './theme';
import Color from 'color';
<<<<<<< HEAD
import Pea_Styler from './mixins/styler.jsx';
import Pea_Vars from './mixins/vars.jsx';
*/

var React = require('react');
var Radium = require('radium');
var Color = require('color');
var Pea_Styler = require('./mixins/styler.jsx');
var Pea_Vars = require('./mixins/vars.jsx');


//generate style object for button kinds
var generateKind = function(backgroundColor = '#444', color = 'white') {

  if (typeof(backgroundColor) == "object") {
    backgroundColor = backgroundColor[backgroundColor.length - 1].val;
  }

  if (typeof(color) == "object") {
    color = color[color.length - 1].val;
  }

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
};

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

          borderRadius: Pea_Vars.get('radius', 'global'), //theme.js
          border: '0px solid transparent',

          textDecoration: 'none',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',

          outline: 'none',

          transitionDuration: Pea_Vars.get('transition-duration', 'global'), //theme.js

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
        global: generateKind(Pea_Vars.get('brand-default', 'global')),
        pastel: generateKind(Pea_Vars.get('brand-default', 'pastel'), Pea_Vars.get('text-dark', 'pastel')),
        neon: generateKind(Pea_Vars.get('brand-default', 'neon'), Pea_Vars.get('text-dark', 'neon')),
        props: {
          kind: 'default'
        }
      },
      {
        global: generateKind(Pea_Vars.get('brand-primary', 'global')),
        pastel: generateKind(Pea_Vars.get('brand-primary', 'pastel'), Pea_Vars.get('text-dark', 'pastel')),
        neon: generateKind(Pea_Vars.get('brand-primary', 'neon'), Pea_Vars.get('text-dark', 'neon')),
        props: {
          kind: 'primary'
        }
      },
      {
        global: generateKind(Pea_Vars.get('brand-success', 'global')),
        pastel: generateKind(Pea_Vars.get('brand-success', 'pastel'), Pea_Vars.get('text-dark', 'pastel')),
        neon: generateKind(Pea_Vars.get('brand-success', 'neon'), Pea_Vars.get('text-dark', 'neon')),
        props: {
          kind: 'success'
        }
      },
      {
        global: generateKind(Pea_Vars.get('brand-warning', 'global')),
        pastel: generateKind(Pea_Vars.get('brand-warning', 'pastel'), Pea_Vars.get('text-dark', 'pastel')),
        neon: generateKind(Pea_Vars.get('brand-warning', 'neon'), Pea_Vars.get('text-dark', 'neon')),
        props: {
          kind: 'warning'
        }
      },
      {
        global: generateKind(Pea_Vars.get('brand-danger', 'global')),
        pastel: generateKind(Pea_Vars.get('brand-danger', 'pastel'), Pea_Vars.get('text-dark', 'pastel')),
        neon: generateKind(Pea_Vars.get('brand-danger', 'neon'), Pea_Vars.get('text-dark', 'neon')),
        props: {
          kind: 'danger'
        }
      }
    ]
  },

  render: function() {
    //Anchor tag <a> if href specified
    if (this.props.href) {
      return (<a href={this.props.href} className={this.props.className} style={Pea_Styler.getStyle(this)} onClick={this.props.onClick}>
          {this.props.label} {this.props.children} {this.props.seconds}
        </a>);
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
