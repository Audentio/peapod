/*! Peapod v<%= package.version %>
 *    Copyright Audentio <%= package.year %>
 *    LICENSE: <%= package.licence %>
 */

import React from 'react';
import base from 'components/theme/base';
import parent from 'components/theme/parent';
import current from 'components/theme/current';
import override from 'components/theme/override';

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

    mergeVars: function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;

            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !(typeof target === "function") ) {
            target = {};
        }

        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }

        for ( ; i < length; i++ ) {

            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {

                // Extend the base object
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // Prevent never-ending loop
                    if ( target === copy ) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( Object.prototype.toString.call( copy ) === "[object Object]" ||
                        ( copyIsArray = (copy.constructor === Array) ) ) ) {

                        if ( copyIsArray ) {
                            copyIsArray = false;
                            clone = src && (src.constructor === Array) ? src : [];

                        } else {
                            clone = src && Object.prototype.toString.call( src ) === "[object Object]" ? src : {};
                        }

                        // Never move original objects, clone them
                        target[ name ] = this.mergeVars( deep, clone, copy );

                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    },

    combineStyles: function(styles, vars) {
        var ret = [];
        for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i];
            if (typeof(style) !== 'undefined') {
                for (var j = 0, len2 = style.length; j < len2; j++) {
                    ret.push(style[j]);
                }
            }
        }
        return ret;
    },

    getStyle: function(obj) {
        var varSet = obj.props.varSet || 'base',
            styles = obj.getBaseStyle(),
            result = [],
            componentName = obj.props.styleLike || obj.constructor.displayName;

        var baseVars = base.getVars(),
            parentVars = parent.getVars(componentName),
            currentVars = current.getVars(componentName),
            localVars = obj.props.getVars,
            overrideVars = override.getVars(componentName),
            vars = this.mergeVars(true, baseVars, parentVars, currentVars, localVars, overrideVars);

        var baseStyle = obj.getBaseStyle(),
            parentStyle = parent.getStyle(componentName),
            currentStyle = current.getStyle(componentName),
            localStyle = obj.props.getStyle,
            overrideStyle = override.getStyle(componentName),
            styles = this.combineStyles([baseStyle, parentStyle, currentStyle, localStyle, overrideStyle], vars);


        for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i],
                validProps = this.validateStyleProps(style.props, obj.props),
                validState = this.validateStyleState(style.state, obj.state);

            if (validProps && validState) {
                if (style.global) result.push(style.global);
                if (style[varSet]) result.push(style[varSet]);
            }
        }

        if (obj.props.style) result.push(obj.props.style);

        return result;
    },

    getVar: function() {
        console.log(arguments);
    },

    processChildren: function(props) {
    	if (props.varSet) {
    		var children = [];
    		for (var i = 0, len = props.children.length; i < len; i++) {
    			children.push(React.cloneElement(props.children[i], {varSet: props.varSet, key: i}));
    		}
    		return children;
    	}
    	return props.children;
    }
}
