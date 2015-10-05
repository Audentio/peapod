/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';

module.exports = {
  validateStyleProps: function(styleProps, props) {
    if (styleProps) {
      var keys = Object.keys(styleProps);
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (props[key] == undefined || props[key] != styleProps[key]) return false;
      }
    }
    return true;
  },

  validateStyleState: function(styleState, state) {
    if (styleState) {
      var keys = Object.keys(styleState);
      for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (state[key] == undefined || state[key] != styleState[key]) return false;
      }
    }
    return true;
  },

  getStyle: function(obj) {
    var vars = obj.props.vars || 'base',
      styles = obj.getBaseStyle(),
      result = [];

    for (var i = 0, len = styles.length; i < len; i++) {
      var style = styles[i],
        validProps = this.validateStyleProps(style.props, obj.props),
        validState = this.validateStyleState(style.state, obj.state);

      if (validProps && validState) {
        if (style.global) result.push(style.global);
        if (style[vars]) result.push(style[vars]);
      }
    }

    if (obj.props.style) result.push(obj.props.style);

    return result;
  },

  processChildren: function(props) {
  	if (props.vars) {
  		var children = [];
  		for (var i = 0, len = props.children.length; i < len; i++) {
  			children.push(React.cloneElement(props.children[i], {vars: props.vars, key: i}));
  		}
  		return children;
  	}
  	return props.children;
  }
}
