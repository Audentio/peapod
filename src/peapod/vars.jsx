/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var lodash = require('lodash')

var base = require('./theme/baseVars.jsx');
var override = require('./theme/overrideVars.jsx');

var maxDepth = 20;

window.Pod_Vars = window.Pod_Vars || {
	sources: [base, override],
	cache: {},

	register: function(vars, level = 0) {
		this.sources[level] = lodash.merge(this.sources[level], vars);
	},

	processResult: function(val, varSetOverride, depth) {
		if (typeof(val) == 'string' && val.indexOf('$') == 0 && depth < 20) {
			return Pod_Vars.get(val.replace('$', ''), varSetOverride, depth + 1); // recursively try to find
		} else {
			if (depth >= maxDepth) {
				throw "Max variable depth of " + maxDepth + " reached.  Do you have a circular variable reference?";
			}
			return val;
		}
	},

	getVarFromSource: function(source, varSet, name) {
		var splitName = name.split('.'),
			currentSource = source[varSet];

		for (var i = 0, len = splitName.length; i < len; i++) {
			if (typeof(currentSource) !== 'undefined') {
				currentSource = currentSource[splitName[i]];
			} else {
				return undefined;
			}
		}
		return currentSource;
	},

	get: function(name, varSetOverride, getDepth) {
		var results = [],
			onlyBase = true,
			depth = getDepth || 0;

		for (var sourceIndex = 0, sourceLen = Pod_Vars.sources.length; sourceIndex < sourceLen; sourceIndex++) {
			var source = Pod_Vars.sources[sourceIndex];

			if (typeof(source) !== 'undefined') {
				var vars = source;
				if (typeof(vars) !== 'undefined') {
					for (var i = 0, len = Object.keys(vars).length; i < len; i++) {
						var varSet = Object.keys(vars)[i],
							varVal = Pod_Vars.getVarFromSource(vars, varSet, name);

						var setVarVal = typeof(varVal) !== 'undefined',
							notAFunction = typeof(varVal) !== 'function',
							setVarSetOverride = typeof(varSetOverride) === 'undefined';

						if (typeof(varVal) !== 'undefined' && typeof(varVal) !== 'function' && (setVarSetOverride || (typeof(varSetOverride) !== 'undefined' && (varSetOverride == varSet || varSet == 'common' || varSet == 'normal')))) {
							if (varSet !== 'common' && varSet !== 'normal') onlyBase = false;
							var val = Pod_Vars.processResult(varVal, varSet, depth);
							results.push({
								vars: varSet,
								val: val
							});
						}
					}
				}
			}
		}

		if (typeof(varSetOverride) !== 'undefined') {
			for (var i = results.length - 1; i >= 0; i--) {
				if (varSetOverride == 'common' && results[i].vars == 'normal') return results[i].val
				if (results[i].vars == varSetOverride) return results[i].val;
			}

			for (var i = results.length - 1; i >= 0; i--) {
				if (results[i].vars == 'common') return results[i].val;
			}
		}

		if (onlyBase || results.length == 1) {
			if (results.length == 0) {
				throw "Unable to find variable named: " + name;
			}
			return results[results.length - 1].val;
		}

		return results;
	}
};


module.exports = Pod_Vars;
