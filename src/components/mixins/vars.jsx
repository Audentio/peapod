/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

import base from 'components/theme/baseVars';
import parent from 'components/theme/parentVars';
import current from 'components/theme/currentVars';
import override from 'components/theme/overrideVars';

window.peapod_vars = {
	sources: [base, parent, current, override],

	get: function(name, varSetOverride) {
		var results = [],
			onlyBase = true;

		for (var sourceIndex = 0, sourceLen = peapod_vars.sources.length; sourceIndex < sourceLen; sourceIndex++) {
			var source = peapod_vars.sources[sourceIndex];
			
			if (typeof(source) !== 'undefined') {
				var vars = source;
				if (typeof(vars) !== 'undefined') {
					for (var i = 0, len = Object.keys(vars).length; i < len; i++) {
						var varSet = Object.keys(vars)[i];
						if (typeof(vars[varSet][name]) !== 'undefined' && (typeof(varSetOverride) === 'undefined' || (typeof(varSetOverride) !== 'undefined' && (varSetOverride == varSet || varSet == 'global' || varSet == 'base')))) {
							if (varSet !== 'global' && varSet !== 'base') onlyBase = false;
							results.push({
								vars: varSet,
								val: vars[varSet][name]
							});
						}
					}
				}
			}
		}

		if (typeof(varSetOverride) !== 'undefined') {
			for (var i = results.length - 1; i >= 0; i--) {
				if (varSetOverride == 'global' && results[i].vars == 'base') return results[i].val
				if (results[i].vars == varSetOverride) return results[i].val;
			}

			for (var i = results.length - 1; i >= 0; i--) {
				if (results[i].vars == 'global') return results[i].val;
			}
		}

		if (onlyBase || results.length == 1) return results[results.length - 1].val;

		return results;
	}
};


module.exports = peapod_vars;