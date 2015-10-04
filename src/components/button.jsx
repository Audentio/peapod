/* Copyright <%= package.year %>, Audentio, LLC.
 * All rights reserved.
 *
 * LICENSE: <%= package.licence %>
 */


//Dependencies
import React from 'react';
import Radium from 'radium';
import 'components/theme';
import Color from 'color';
 

//generate style object for button kinds
var generateKind = function(
  backgroundColor = '#444', 
  color = 'white'){
  
  return {
    backgroundColor: backgroundColor,
    color: color,
    
    ':hover': {
      backgroundColor: Color(backgroundColor).lighten(0.2).rgbString()
    }
  }
}, 

defaultStyle = {
  
  //BASE style
  base: {
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
    
  },
    
  raised: {
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
  },
  
  //PILL
  round: {
    borderRadius: '1000px'
  },
  
  //KIND: default
  'default': generateKind('#444'),
  
  //KIND: primary
  primary: generateKind(peapod_style.config['brand-primary']),
  
  //KIND: success
  success: generateKind(peapod_style.config['brand-success']),
  
  //KIND: warning
  warning: generateKind(peapod_style.config['brand-warning']),
  
  //KIND: danger
  danger: generateKind(peapod_style.config['brand-danger'])
  
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
  
  
  render: function() {
  
    var style = [
      defaultStyle.base,
      this.props.kind && defaultStyle[this.props.kind],
      this.props.raised && defaultStyle.raised,
      this.props.round && defaultStyle.round,
      
      //Import from theme
      themeStyle.base,
      this.props.kind && themeStyle[this.props.kind],
      this.props.raised && themeStyle.raised,
      this.props.round && themeStyle.round,
      
      //style prop. Override everything
      this.props.style
    ];
    
    //Anchor tag <a> if href specified
    if (this.props.href) {
      return (
        <a
          href={this.props.href}
          className={this.props.className}
					style={style}
          onClick={this.props.onClick}>
          {this.props.label} {this.props.children}
        </a>
      );
    }
    
    //Default: <button> tag
    else {
      return (
        <button
          className={this.props.className}
					style={style}
          onClick={this.props.onClick}>
          {this.props.label}
        </button>
      );
    }
  }
    
});

module.exports = Radium(Pea_button);