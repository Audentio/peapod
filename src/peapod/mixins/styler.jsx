/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var React = require('react');
var base = require('../theme/base.jsx');
var parent = require('../theme/parent.jsx');
var current = require('../theme/current.jsx');
var override = require('../theme/override.jsx');

window.peapod_styler = window.peapod_styler || {
	sources: [base, "base", parent, current, "local", override],

	processChildren: function(props) {
    	if (props.varSet) {
    		var children = [];
    		for (var i = 0, len = props.children.length; i < len; i++) {
    			children.push(React.cloneElement(props.children[i], {varSet: props.varSet, key: i}));
    		}
    		return children;
    	}
    	return props.children;
    },

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

	getStyle: function(obj, childEle) {
		var result = [],
			style = {},
			componentName = obj.props.styleLike || obj.constructor.displayName,
			varSet = obj.props.varSet || 'base',
			childEle = childEle || "";

		for (var i = 0, len = peapod_styler.sources.length; i < len; i++) {
			var source = peapod_styler.sources[i];
			if (source == "base") {
				source = obj.getBaseStyle();
			} else if (source == "local") {
				source = obj.props.style;
				var localStyle = obj.props.localStyle; // can fully style components
				if (typeof(source) !== 'undefined' && typeof(localStyle) !== 'undefined') {
					localStyle.push({global: source});
					source = localStyle;
				} else if (typeof(source) !== 'undefined') {
					source = [{global: source}]
				} else if (typeof(localStyle) !== 'undefined') {
					source = localStyle
				}
			} else {
				source = source[componentName];
			}

			if (typeof(source) !== 'undefined') {
				source = peapod_styler.filterStateProps(source, obj, childEle);
				for (var j = 0, len2 = source.length; j < len2; j++) {
					result.push(source[j]);
				}
			}
		}

		for (var i = 0, len = result.length; i < len; i++) {
			for (var ruleIndex = 0, ruleLen = Object.keys(result[i]).length; ruleIndex < ruleLen; ruleIndex++) {
				var computedVar = result[i][Object.keys(result[i])[ruleIndex]];
				if (typeof(computedVar) == 'array') {
					for (var computedIndex = computedVar.length - 1; computedIndex >= 0; computedIndex--) {
						if (computedVar[computedIndex].vars == varSet || computedVar[computedIndex].vars == "global") {
							computedVar = computedVar[computedIndex].val;
							break;
						}
					}
				} else if (typeof(computedVar) == 'string'){
					if (computedVar.indexOf('getProp:') > -1) {
						if (computedVar.indexOf('getProp: ') > -1) {
							computedVar = obj.props[computedVar.replace('getProp: ', '')];
						} else {
							computedVar = obj.props[computedVar.replace('getProp:', '')];
						}
					} else if (computedVar.indexOf('getState:') > -1) {
						if (computedVar.indexOf('getState: ') > -1) {
							computedVar = obj.state[computedVar.replace('getState: ', '')];
						} else {
							computedVar = obj.state[computedVar.replace('getState:', '')];
						}
					}
				}


				style[Object.keys(result[i])[ruleIndex]] = computedVar;
			}
		}

		return style;
	},

	mergeStyles: function(tree, leaf) {
		return Object.assign(tree, leaf);
	},

	filterStateProps: function(styles, obj, childEle) {
		var result = [],
			varSet = obj.props.varSet || 'base';

		for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i],
                validProps = peapod_styler.validateStyleProps(style.props, obj.props),
                validState = peapod_styler.validateStyleState(style.state, obj.state),
				validChild = (typeof(style.childEle) === 'undefined' && childEle == '') || style.childEle == childEle || style.childEle == "global";

            if (validProps && validState && validChild) {
                if (style.global) result.push(style.global);
                if (style[varSet]) result.push(style[varSet]);
            }
        }

        return result;
	}
};


module.exports = peapod_styler;
