/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import React from 'react';
import base from 'components/theme/base';
import parent from 'components/theme/parent';
import current from 'components/theme/current';
import override from 'components/theme/override';

window.peapod_styler = {
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

	getStyle: function(obj) {
		var result = [],
			style = {},
			componentName = obj.props.styleLike || obj.constructor.displayName,
			varSet = obj.props.varSet || 'base';

		for (var i = 0, len = peapod_styler.sources.length; i < len; i++) {
			var source = peapod_styler.sources[i];
			if (source == "base") {
				source = obj.getBaseStyle();
			} else if (source == "local") {
				source = obj.props.getStyle;
				if (typeof(source) !== 'undefined') source = [{global: source}]
			} else {
				source = source[componentName];
			}

			if (typeof(source) !== 'undefined') {
				source = peapod_styler.filterStateProps(source, obj);
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
				}

				style[Object.keys(result[i])[ruleIndex]] = computedVar;
			}
		}

		return style;
	},

	mergeStyles: function(tree, leaf) {
		return Object.assign(tree, leaf);
	},

	filterStateProps: function(styles, obj) {
		var result = [],
			varSet = obj.props.varSet || 'base';

		for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i],
                validProps = peapod_styler.validateStyleProps(style.props, obj.props),
                validState = peapod_styler.validateStyleState(style.state, obj.state);

            if (validProps && validState) {
                if (style.global) result.push(style.global);
                if (style[varSet]) result.push(style[varSet]);
            }
        }

        return result;
	}
};


module.exports = peapod_styler;