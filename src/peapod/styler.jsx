/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var React = require('react');
var base = require('./theme/base.jsx');
var parent = require('./theme/parent.jsx');
var current = require('./theme/current.jsx');
var override = require('./theme/override.jsx');

window.Pod_Styler = window.Pod_Styler || {
	sources: [base, "base", parent, current, "local", override],
	stylePropName: 'styler',
	cache: {},
	varCache: {},

	validateStyleProps: function(styleProps, props) {
		if (styleProps) {
            var keys = Object.keys(styleProps);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i],
					val = props[key];
				if (typeof(val) == 'undefined') {
					return false;
				} else if (typeof(styleProps[key]) == 'object'){
					if (styleProps[key].length == 2) {
						if (!Pod_Styler.compareValArray(styleProps[key][0], val, styleProps[key][1])) return false;
					} else {
						return false;
					}
				} else {
					if (val != styleProps[key]) return false;
				}
            }
        }
        return true;
    },

    validateStyleState: function(styleState, state) {
		if (styleState && state) {
            var keys = Object.keys(styleState);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i],
					val = state[key];

				if (typeof(val) == 'undefined') {
					return false;
				} else if (typeof(styleState[key]) == 'object'){
					if (styleState[key].length == 2) {
						if (!Pod_Styler.compareValArray(styleState[key][0], val, styleState[key][1])) return false;
					} else {
						return false;
					}
				} else {
					if (val != styleState[key]) return false;
				}
            }
        }
        return true;
    },

	compareValArray: function(comparison, val, comparisonVal) {
		if (comparison == "==") {
			if (!(val == comparisonVal)) return false
		} else if (comparison == "!=") {
			if (!(val != comparisonVal)) return false
		} else if (comparison == ">") {
			if (!(val > comparisonVal)) return false
		} else if (comparison == ">=") {
			if (!(val >= comparisonVal)) return false
		} else if (comparison == "<") {
			if (!(val < comparisonVal)) return false
		} else if (comparison == "<=") {
			if (!(val <= comparisonVal)) return false
		}
		return true;
	},

	// entry to getStyle method for non-peapod components
	style: function(data, subComponent) {
		data.constructor.displayName = "global";
		return this.getStyle(data, subComponent);
	},

	getStyleFromCache: function(obj, componentName, subComponent) {
		if (typeof(this.cache[componentName]) == 'undefined') this.cache[componentName] = {};
		if (typeof(this.cache[componentName][subComponent]) == 'undefined') this.cache[componentName][subComponent] = [];
		for (var i = 0, len = this.cache[componentName][subComponent].length; i < len; i++) {
			var cacheVal = this.cache[componentName][subComponent][i];
			if (obj.props.styler == cacheVal.props && obj.state == cacheVal.state) return cacheVal.style;
		}
		return false;
	},

	addStyleToCache: function(obj, componentName, subComponent, style) {
		if (typeof(this.cache[componentName]) == 'undefined') this.cache[componentName] = {};
		if (typeof(this.cache[componentName][subComponent]) == 'undefined') this.cache[componentName][subComponent] = [];
		for (var i = 0, len = this.cache[componentName][subComponent].length; i < len; i++) {
			var cacheVal = this.cache[componentName][subComponent][i];
			if (obj.props.styler == cacheVal.props && obj.state == cacheVal.state) return false;
		}
		if (len > 20) this.cache[componentName][subComponent].shift(); // prune more than 20 elements to conserve memory
		this.cache[componentName][subComponent].push({props: obj.props.styler, state: obj.state, style: style});
	},

	getStyle: function(obj, subComponent) {
		//var timer = window.performance.now();

		var result = [],
			style = {},
			styleProps = obj.props[Pod_Styler.stylePropName] || {},
			componentName = styleProps.styleLike || obj.constructor.displayName,
			varSet = styleProps.varSet || 'base',
			subComponent = subComponent || "";

		var cacheVal = this.getStyleFromCache(obj, componentName, subComponent || "_");
		if (cacheVal !== false) {
			//console.log("~ " + (window.performance.now() - timer))
			return cacheVal;
		}


		for (var i = 0, len = Pod_Styler.sources.length; i < len; i++) {
			var source = Pod_Styler.sources[i];
			if (source == "base") {
				if (typeof(obj.getBaseStyle) == 'function') {
					source = obj.getBaseStyle();
				} else {
					source = undefined;
				}
			} else if (source == "local") {
				source = styleProps.style;
				var localStyle = styleProps.localStyle; // can fully style components
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
				source = Pod_Styler.filterStateProps(source, obj, subComponent);
				for (var j = 0, len2 = source.length; j < len2; j++) {
					result.push(source[j]);
				}
			}
		}

		for (var i = 0, len = result.length; i < len; i++) {
			for (var ruleIndex = 0, ruleLen = Object.keys(result[i]).length; ruleIndex < ruleLen; ruleIndex++) {
				var computedVar = result[i][Object.keys(result[i])[ruleIndex]];
				if (typeof(computedVar) == 'object') { // merge style objects
					for (var varIndex = 0, varLen = Object.keys(computedVar).length; varIndex < varLen; varIndex++) {
						computedVar[Object.keys(computedVar)[varIndex]] = Pod_Styler.parseVariableValue(computedVar[Object.keys(computedVar)[varIndex]], obj, varSet);
					}

					if (typeof(style[Object.keys(result[i])[ruleIndex]]) !== 'undefined') { // merge if key already exists
						style[Object.keys(result[i])[ruleIndex]] = Object.assign(style[Object.keys(result[i])[ruleIndex]], computedVar);
					} else { // otherwise add the key
						style[Object.keys(result[i])[ruleIndex]] = computedVar;
					}

				} else {
					style[Object.keys(result[i])[ruleIndex]] = Pod_Styler.parseVariableValue(computedVar, obj, varSet);
				}
			}
		}

		this.addStyleToCache(obj, componentName, subComponent || "_", style);
		//console.log(window.performance.now() - timer)
		return style;
	},

	parseVariableValue: function(computedVar, obj, varSet) {
		var styleProps = obj.props[Pod_Styler.stylePropName] || {};

		if (typeof(computedVar) == 'array') {
			for (var computedIndex = computedVar.length - 1; computedIndex >= 0; computedIndex--) { // go through in reverse order to find most specific
				if (computedVar[computedIndex].vars == varSet || computedVar[computedIndex].vars == "global") {
					computedVar = computedVar[computedIndex].val;
					break;
				}
			}
		}

		if (typeof(computedVar) == 'string') {
			if (computedVar.indexOf('$') > -1) {
				var computedKey = computedVar;
				if (typeof(this.varCache[computedVar + '_' + varSet]) == 'undefined') {
					computedVar = Pod_Vars.get(computedVar.replace('$', ''), varSet);
					this.varCache[computedKey + '_' + varSet] = computedVar;
				} else {
					computedVar = this.varCache[computedKey + '_' + varSet]; // get variable from cache rather than parse string
				}
			} else if (computedVar.indexOf('getProp:') > -1) {
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
			} else if (computedVar.indexOf('getStyle:') > -1) {
				if (computedVar.indexOf('getStyle: ') > -1) {
					computedVar = styleProps[computedVar.replace('getStyle: ', '')];
				} else {
					computedVar = styleProps[computedVar.replace('getStyle:', '')];
				}
			}
		}
		return computedVar;
	},

	mergeStyles: function(tree, leaf) {
		return Object.assign(tree, leaf);
	},

	filterStateProps: function(styles, obj, subComponent) {
		var result = [],
			styleProps = obj.props[Pod_Styler.stylePropName] || {},
			varSet = styleProps.varSet || 'base';

		for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i],
                validProps = Pod_Styler.validateStyleProps(style.styler, styleProps),
                validState = Pod_Styler.validateStyleState(style.state, obj.state),
				validChild = (typeof(style.subComponent) === 'undefined' && subComponent == '') || style.subComponent == subComponent || style.subComponent == "global";

            if (validProps && validState && validChild) {
                if (style.global) result.push(style.global);
                if (style[varSet]) result.push(style[varSet]);
            }
        }

        return result;
	}
};


module.exports = Pod_Styler;
