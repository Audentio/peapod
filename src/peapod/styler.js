/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var React = require('react');

var lodash = require('lodash')

var debugInfo = false; // requires patched Radium
var enableMissingStyleWarning = false;

window.Pod_Styler = window.Pod_Styler || {
	libraries: [],
	currentLibrary: 'base',
	enableCache: false,
	cache: {},
	varCache: {},
	maxCacheLength: 20,

	removeLibrary: function(libraryName) {
		for (var i = 0, len = Pod_Styler.libraries.length; i < len; i++) {
			var library = Pod_Styler.libraries[i];
			if (library.name == libraryName) {
				console.log('Removing Library: ' + libraryName);
				Pod_Styler.libraries.splice(i, 1);
				len = len - 1;
				i = i - 1;
			}
		}
	},

	// registers a library
	addLibrary: function(parentName, libraryName, componentNames, requireFunc, globalVars) {
		console.log('Adding Library ' + libraryName);
		Pod_Styler.varCache = {};
		Pod_Styler.removeLibrary(libraryName);

		Pod_Vars.register(globalVars);

		let components = {};
		for (let i = 0, len = componentNames.length; i < len; i++) {
			let componentName = componentNames[i],
				stylesheet = null;

			try {
				stylesheet = requireFunc('./' + componentName.charAt(0).toLowerCase() + componentName.slice(1) + '.js');
			} catch(err) {
				if (err.code !== 'MODULE_NOT_FOUND') {
					throw err; // Re-throw non-"Module not found" errors
				} else {
					console.warn(err);
				}
			}

			components[componentName] = stylesheet;
		}

		let library = {
			parentName: parentName,
			componentNames: componentNames,
			components: components,
			name: libraryName,
			type: 'normal',
			globalVars: globalVars,
		}

		Pod_Styler.libraries.push(library);
	},

	// changes the library in use
	setLibrary: function(name) {
		Pod_Styler.currentLibrary = name;
	},

	// gets the stack of libraries
	getLibrary: function(name) {
		for (var i = 0, len = Pod_Styler.libraries.length; i < len; i++) {
			var library = Pod_Styler.libraries[i];
			if (library.name == name) return library;
		}

		throw "Could not find library named: " + name;
	},

	getLibraryStack: function() {
		var currentName = Pod_Styler.currentLibrary,
			stack = [],
			depth = 0;

		while (currentName !== 'root' && depth <= 30) {
			var library = Pod_Styler.getLibrary(currentName);
			stack.unshift(library); // prepend
			currentName = library.parentName;
			depth = depth + 1;
		}

		// apply local styling at the bottom of the stack
		stack.push({
			type: 'local',
			components: {},
			name: '_local'
		});
		//apply pre local styling to very beginning of stack
		stack.unshift({
			type: 'local',
			components: {},
			name: '_preLocal'
		});

		if (depth >= 30) throw "Maximum Library stack size reached."

		return stack;
	},

	// combines each library into an array
	buildSources: function(obj) {
		var sources = [],
			libraries = Pod_Styler.getLibraryStack(),
			conditions = {}, // all conditions available to component
			parts = {}, // all parts available to component
			componentName = obj.componentName,
			scene = obj.scene;

		for (var i = 0, len = libraries.length; i < len; i++) {
			var library = libraries[i],
				component = library.components[componentName];

			if (typeof(component) !== 'undefined') {
				var condition = component.getConditions(),
					conditionKeys = Object.keys(condition),
					part = component.getParts(),
					partKeys = Object.keys(part);

				for (var i = 0, len = conditionKeys.length; i < len; i++) {
					var key = conditionKeys[i];
					conditions[key] = condition[key];
				}

				for (var i = 0, len = partKeys.length; i < len; i++) {
					var key = partKeys[i];
					parts[key] = key;
				}
			}
		}

		for (var i = 0, len = libraries.length; i < len; i++) {
			var library = libraries[i],
				source = null;
			if (library.type == "local") {
				var localStyle = {},
					partKeys = Object.keys(parts),
					suffix = (library.name == '_preLocal') ? 'Pre' : '';

				for (var partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
					var part = partKeys[partIndex];

					if (part == 'main' && typeof(obj.styler.mainStyle) == 'undefined' && suffix == '') {
						if (typeof(obj.styler.style) !== 'undefined') localStyle[part] = obj.styler.style;
					} else {
						if (typeof(obj.styler[part + 'Style' + suffix]) !== 'undefined') localStyle[part] = obj.styler[part + 'Style' + suffix];
					}
				}

				if (Object.keys(localStyle).length > 0) source = localStyle; // if a localStyle was applied, then make it the source
			} else {
				var sourceSheet = library.components[componentName];
				if (sourceSheet !== null) {
					if (typeof(sourceSheet) == 'undefined') {
						if (enableMissingStyleWarning) console.warn('Could not find styling for ' + componentName + ' in ' + library.name + '.')
					} else {
						source = sourceSheet.getAllStyling(obj, scene, conditions); // pass in collapsed conditions
					}
				}
			}

			if (typeof(source) !== 'undefined' && source !== null) {
				sources.push(source);
			}
		}

		return sources;
	},

	// make inline css from sources array
	processSources: function(obj, sources) {
		var style = {},
			scene = obj.scene;

		for (var sourceIndex = 0, sourceLen = sources.length; sourceIndex < sourceLen; sourceIndex++) {
			var source = sources[sourceIndex],
				partKeys = Object.keys(source);
			for (var partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
				var partKey = partKeys[partIndex],
					part = source[partKey],
					partStyle = {};

				if (part !== null && typeof(part) !== 'undefined') {
					var ruleKeys = Object.keys(part);
					for (var ruleIndex = 0, ruleLen = ruleKeys.length; ruleIndex < ruleLen; ruleIndex++) {
						var ruleKey = ruleKeys[ruleIndex],
							computedRuleKey = Pod_Styler.parseVariableValue(ruleKey, obj, scene),
							computedVar = part[ruleKey];

						if (typeof(computedVar) == 'object') { // merge style objects
							for (var varIndex = 0, varLen = Object.keys(computedVar).length; varIndex < varLen; varIndex++) {
								computedVar[Object.keys(computedVar)[varIndex]] = Pod_Styler.parseVariableValue(computedVar[Object.keys(computedVar)[varIndex]], obj, scene);
							}

							if (typeof(partStyle[ruleKey]) !== 'undefined') { // merge if key already exists
								partStyle[computedRuleKey] = Object.assign(partStyle[computedRuleKey], computedVar);
							} else { // otherwise add the key
								partStyle[computedRuleKey] = computedVar;
							}

						} else {
							var resultVar = Pod_Styler.parseVariableValue(computedVar, obj, scene);
							if (typeof(resultVar) == 'string'){
								if (typeof(partStyle[ruleKey]) == 'string' && partStyle[ruleKey].indexOf('!important') > -1) {
									if (resultVar.indexOf('!important') == -1) {
										console.warn("You have overridden the styling '" + ruleKey + ": " + partStyle[ruleKey] + "' with '" + ruleKey + ": " + resultVar + "' in " + componentName + "-" + partKey + " which could cause significant styling errors.  This must be changed to '" + ruleKey + ": " + resultVar + "!' to indicate you are sure you want to override this value.");
									}
								}
							}
						}

						if (typeof(resultVar) == 'string') {
							if (resultVar.indexOf('!unset') == -1) {
								partStyle[computedRuleKey] = resultVar;
							} else {
								if (computedRuleKey == 'all') {
									partStyle = {};
								}
							}
						} else {
							partStyle[computedRuleKey] = resultVar;
						}
					}
				}

				if (typeof(style[partKey]) == 'undefined') {
					style[partKey] = partStyle;
				} else {
					style[partKey] = Object.assign(style[partKey], partStyle);
				}
			}
		}


		var keys = Object.keys(style)
		for (var i = 0, len = Object.keys(style).length; i < len; i++) {
			var key = keys[i];
			if (typeof(style[key]) == 'string') {
				style[key] = style[key].replace('!', '');
			}
		}

		return style;
	},

	makeInstanceObj: function(instance, localStyler) {
		var propsStyler = (typeof(instance) !== 'undefined' && typeof(instance.props) !== 'undefined' && typeof(instance.props.styler) !== 'undefined') ? instance.props.styler : {},
			styler = lodash.merge(propsStyler, localStyler) || {},
			componentName = styler.styleLike || instance.constructor.displayName,
			scene = styler.scene || 'normal',
			obj = {
				context: instance.context || {},
				state: instance.state || {},
				props: instance.props || {},
				styler: styler,
				componentName: componentName,
				scene: scene
			};

		return obj;
	},

	getStyleFromCache: function(obj, componentName) {
		if (typeof(this.cache[componentName]) == 'undefined') this.cache[componentName] = [];
		for (var i = 0, len = this.cache[componentName].length; i < len; i++) {
			var cacheVal = this.cache[componentName][i];
			if (this.checkCacheEquality(obj, cacheVal)) {
				return cacheVal.style;
			}
		}
		return false;
	},

	addStyleToCache: function(obj, style) {
		var componentName = obj.componentName;

		if (typeof(Pod_Styler.cache[componentName]) == 'undefined') Pod_Styler.cache[componentName] = [];
		for (var i = 0, len = Pod_Styler.cache[componentName].length; i < len; i++) {
			var cacheVal = Pod_Styler.cache[componentName][i];
			if (Pod_Styler.checkCacheEquality(obj, cacheVal)) return false;
		}
		if (len > Pod_Styler.maxCacheLength) Pod_Styler.cache[componentName].shift(); // prune more than 20 elements to conserve memory
		Pod_Styler.cache[componentName].push({obj: obj, style: style});
	},

	checkCacheEquality: function(obj, cacheVal) {
		var stylerEqual = lodash.isEqual(obj.styler, cacheVal.styler),
			stateEqual = lodash.isEqual(obj.state, cacheVal.state),
			propsEqual = lodash.isEqual(obj.props, cacheVal.props),
			contextEqual = lodash.isEqual(obj.context, cacheVal.context),
			radiumEqual = false;

		if ((typeof(obj.state) === 'undefined') && (typeof(cacheVal.state) === 'undefined')) {
			radiumEqual = true;
		} else if ((obj.state == null) && (cacheVal.state == null)) {
			radiumEqual = true;
		} else if ((typeof(obj.state) === 'undefined' || obj.state == null) || (typeof(cacheVal.state) === 'undefined' || cacheVal.state == null)) {
			radiumEqual = false;
		} else {
			radiumEqual = obj.state._radiumStyleState == cacheVal.state._radiumStyleState;
		}

		return stylerEqual && stateEqual && propsEqual && contextEqual && radiumEqual;
	},

	getStyle: function(instance, localStyler = {}) {
		var obj = Pod_Styler.makeInstanceObj(instance, localStyler);

		if (typeof(localStyler) == 'string') {
			console.error("Using old `Pod_Styler.getStyle` syntax in " + obj.componentName);
		}

		if (Pod_Styler.enableCache) {
			var cacheVal = this.getStyleFromCache(obj, obj.componentName || "_");
			if (cacheVal !== false) {
				return cacheVal;
			}
		}

		var sources = Pod_Styler.buildSources(obj);
		var style = Pod_Styler.processSources(obj, sources);

		if (Pod_Styler.enableCache) {
			this.addStyleToCache(obj, style);
		}

		return style;
	},

	parseVariableValue: function(computedVar, obj, scene) {
		var styler = obj.styler || {};

		if (typeof(computedVar) == 'array') {
			for (var computedIndex = computedVar.length - 1; computedIndex >= 0; computedIndex--) { // go through in reverse order to find most specific
				if (computedVar[computedIndex].vars == scene || computedVar[computedIndex].vars == "common") {
					computedVar = computedVar[computedIndex].val;
					break;
				}
			}
		}

		if (typeof(computedVar) == 'string') {
			computedVar = Pod_Styler.processVariableString(computedVar, obj, scene);
		}
		return computedVar;
	},

	processVariableString: function(computedVar, obj, scene) {

		if (computedVar.indexOf('$') > -1) {
			var computedKey = computedVar;
			if (typeof(this.varCache[computedVar + '_' + scene]) == 'undefined') {
				if (computedVar.indexOf('{') > -1 && computedVar.indexOf('}') > -1) { // RegEx based Pod_Vars.get
					var regEx = /\{\$\S*\}/g,
						matches = computedVar.match(regEx);

					for (var i = 0, len = matches.length; i < len; i++) {
						var match = matches[i];
					    computedVar = computedVar.replace(match, Pod_Vars.get(match.replace('{$', '').replace('}', ''), scene));
					}
				} else { // simple Pod_Vars.get on whole value
					computedVar = Pod_Vars.get(computedVar.replace('$', ''), scene);
				}
				this.varCache[computedKey + '_' + scene] = computedVar;
			} else {
				computedVar = this.varCache[computedKey + '_' + scene]; // get variable from cache rather than parse string
			}
		} else if (computedVar.indexOf('getProp:') > -1) {
			computedVar = obj.props[computedVar.replace('getProp:', '')];
		} else if (computedVar.indexOf('getState:') > -1) {
			computedVar = obj.state[computedVar.replace('getState:', '')];
		} else if (computedVar.indexOf('getStyler:') > -1) {
			computedVar = obj.styler[computedVar.replace('getStyler:', '')];
		} else if (computedVar.indexOf('getContext:') > -1) {
			computedVar = obj.context[computedVar.replace('getContext:', '')];
		}
		return computedVar;
	},

}

module.exports = Pod_Styler;


/*

var base = require('./theme/base.jsx');
var current = require('./theme/current.jsx');
var override = require('./theme/override.jsx');

window.Pod_Styler = window.Pod_Styler || {
	sources: [base, "base", parent, current, "local", override],
	enableCache: true,
	cache: {},
	varCache: {},
	maxCacheLength: 20,

	validateCondition: function(selectorNeeds, objIs) {
		if (selectorNeeds) {
			var keys = Object.keys(selectorNeeds);
			for (var i = 0, len = keys.length; i < len; i++) {
				var key = keys[i],
					objVal = objIs[key],
					selVal = selectorNeeds[key];

				if (typeof(objVal) == 'undefined') {
					return false;
				} else if (typeof(selVal[key]) == 'object') {
					if (selVal[key].length == 2) {
						if (!Pod_Styler.compareValArray(selVal[key][0], val, selVal[key][1])) return false;
					} else {
						return false;
					}
				} else if (objVal != selVal) {
					return false;
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
	style: function(data, part) {
		data.constructor.displayName = "global";
		return this.getStyle(data, part);
	},

	checkCacheEquality: function(obj, cacheVal) {
		var stylerEqual = lodash.isEqual(obj.styler, cacheVal.styler),
			stateEqual = lodash.isEqual(obj.state, cacheVal.state),
			radiumEqual = obj.state;

		if ((typeof(obj.state) === 'undefined') && (typeof(cacheVal.state) === 'undefined')) {
			radiumEqual = true;
		} else if ((obj.state == null) && (cacheVal.state == null)) {
			radiumEqual = true;
		} else if ((typeof(obj.state) === 'undefined' || obj.state == null) || (typeof(cacheVal.state) === 'undefined' || cacheVal.state == null)) {
			radiumEqual = false;
		} else {
			radiumEqual = obj.state._radiumStyleState == cacheVal.state._radiumStyleState;
		}

		return stylerEqual && stateEqual && radiumEqual;
	},

	getStyleFromCache: function(obj, componentName, part) {
		if (typeof(this.cache[componentName]) == 'undefined') this.cache[componentName] = {};
		if (typeof(this.cache[componentName][part]) == 'undefined') this.cache[componentName][part] = [];
		for (var i = 0, len = this.cache[componentName][part].length; i < len; i++) {
			var cacheVal = this.cache[componentName][part][i];
			if (this.checkCacheEquality(obj, cacheVal)) {
				return cacheVal.style;
			}
		}
		return false;
	},

	addStyleToCache: function(obj, componentName, part, style) {
		if (typeof(this.cache[componentName]) == 'undefined') this.cache[componentName] = {};
		if (typeof(this.cache[componentName][part]) == 'undefined') this.cache[componentName][part] = [];
		for (var i = 0, len = this.cache[componentName][part].length; i < len; i++) {
			var cacheVal = this.cache[componentName][part][i];
			if (this.checkCacheEquality(obj, cacheVal)) return false;
		}
		if (len > Pod_Styler.maxCacheLength) this.cache[componentName][part].shift(); // prune more than 20 elements to conserve memory
		this.cache[componentName][part].push({styler: obj.styler, state: obj.state, style: style});
	},

	getStyle: function(sourceObj, part = "main", localStyler = {}) {
		//var timer = window.performance.now();

		var result = [],
			style = {},
			propsStyler = (typeof(sourceObj) !== 'undefined' && typeof(sourceObj.props) !== 'undefined' && typeof(sourceObj.props.styler) !== 'undefined') ? sourceObj.props.styler : {},
			styler = lodash.merge(propsStyler, localStyler) || {},
			componentName = styler.styleLike || sourceObj.constructor.displayName,
			varSet = styler.varSet || 'normal',
			obj = {
				context: sourceObj.context || {},
				state: sourceObj.state || {},
				props: sourceObj.props || {},
				styler: styler
			};

		if (Pod_Styler.enableCache) {
			var cacheVal = this.getStyleFromCache(obj, componentName, part || "_");
			if (cacheVal !== false) {
				//console.log('~~~Used Cache for ' + componentName + ' ' + part + ' ' + (window.performance.now() - timer))
				return cacheVal;
			}
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
				if (part == 'main' && typeof(styler.mainStyle) == 'undefined') {
					source = styler.style;
				} else {
					source = styler[part + 'Style'];
				}

				var localStyle = styler.localStyle; // can fully style components
				if (typeof(source) !== 'undefined' && typeof(localStyle) !== 'undefined') {
					localStyle.push({
						global: source,
						part: part
					});
					source = localStyle;
				} else if (typeof(source) !== 'undefined') {
					source = [{
						global: source,
						part: part
					}];
				} else if (typeof(localStyle) !== 'undefined') {
					source = localStyle
				}
			} else {
				source = source[componentName];
			}

			if (typeof(source) !== 'undefined') {
				source = Pod_Styler.filterSelectors(source, obj, part);
				for (var j = 0, len2 = source.length; j < len2; j++) {
					result.push(source[j]);
				}
			}
		}

		for (var i = 0, len = result.length; i < len; i++) {
			for (var ruleIndex = 0, ruleLen = Object.keys(result[i]).length; ruleIndex < ruleLen; ruleIndex++) {
				var ruleKey = Object.keys(result[i])[ruleIndex],
					computedVar = result[i][ruleKey];
				if (typeof(computedVar) == 'object') { // merge style objects
					for (var varIndex = 0, varLen = Object.keys(computedVar).length; varIndex < varLen; varIndex++) {
						computedVar[Object.keys(computedVar)[varIndex]] = Pod_Styler.parseVariableValue(computedVar[Object.keys(computedVar)[varIndex]], obj, varSet);
					}

					if (typeof(style[ruleKey]) !== 'undefined') { // merge if key already exists
						style[ruleKey] = Object.assign(style[ruleKey], computedVar);
					} else { // otherwise add the key
						style[ruleKey] = computedVar;
					}

				} else {
					var resultVar = Pod_Styler.parseVariableValue(computedVar, obj, varSet);
					if (typeof(resultVar) == 'string'){
						if (typeof(style[ruleKey]) == 'string' && style[ruleKey].indexOf('!') > -1) {
							if (resultVar.indexOf('!') == -1) {
								console.warn("You have overridden the styling '" + ruleKey + ": " + style[ruleKey] + "' with '" + ruleKey + ": " + resultVar + "' in " + componentName + "-" + part + " which could cause significant styling errors.  This must be changed to '" + ruleKey + ": " + resultVar + "!' to indicate you are sure you want to override this value.");
							}
						}
					}

					style[ruleKey] = resultVar;
				}
			}
		}


		var keys = Object.keys(style)
		for (var i = 0, len = Object.keys(style).length; i < len; i++) {
			var key = keys[i];
			if (typeof(style[key]) == 'string') {
				style[key] = style[key].replace('!', '');
			}
		}

		if (Pod_Styler.enableCache) {
			this.addStyleToCache(obj, componentName, part || "_", style);
		}
		//console.log(componentName + ' ' + part + ' ' + (window.performance.now() - timer))
		if (debugInfo) {
			style.debug = {test: 'ing'};
		}

		return style;
	},

	parseVariableValue: function(computedVar, obj, varSet) {
		var styler = obj.styler || {};

		if (typeof(computedVar) == 'array') {
			for (var computedIndex = computedVar.length - 1; computedIndex >= 0; computedIndex--) { // go through in reverse order to find most specific
				if (computedVar[computedIndex].vars == varSet || computedVar[computedIndex].vars == "global") {
					computedVar = computedVar[computedIndex].val;
					break;
				}
			}
		}

		if (typeof(computedVar) == 'string') {
			computedVar = Pod_Styler.processVariableString(computedVar, obj, varSet);
		}
		return computedVar;
	},

	processVariableString: function(computedVar, obj, varSet) {
		if (computedVar.indexOf('$') > -1) {
			var computedKey = computedVar;
			if (typeof(this.varCache[computedVar + '_' + varSet]) == 'undefined') {
				if (computedVar.indexOf('{') > -1 && computedVar.indexOf('}') > -1) { // RegEx based Pod_Vars.get
					var regEx = /\{\$\S*\}/g,
						matches = computedVar.match(regEx);

					for (var i = 0, len = matches.length; i < len; i++) {
						var match = matches[i];
					    computedVar = computedVar.replace(match, Pod_Vars.get(match.replace('{$', '').replace('}', '')), varSet);
					}
				} else { // simple Pod_Vars.get on whole value
					computedVar = Pod_Vars.get(computedVar.replace('$', ''), varSet);
				}
				this.varCache[computedKey + '_' + varSet] = computedVar;
			} else {
				computedVar = this.varCache[computedKey + '_' + varSet]; // get variable from cache rather than parse string
			}
		} else if (computedVar.indexOf('getProp:') > -1) {
			computedVar = obj.props[computedVar.replace('getProp:', '')];
		} else if (computedVar.indexOf('getState:') > -1) {
			computedVar = obj.state[computedVar.replace('getState:', '')];
		} else if (computedVar.indexOf('getStyler:') > -1) {
			computedVar = styler[computedVar.replace('getStyler:', '')];
		} else if (computedVar.indexOf('getContext:') > -1) {
			computedVar = obj.context[computedVar.replace('getContext:', '')];
		}
		return computedVar;
	},

	mergeStyles: function(tree, leaf) {
		return Object.assign(tree, leaf);
	},

	filterSelectors: function(styles, obj, part) {
		var result = [],
			styler = obj.styler,
			varSet = styler.varSet || 'normal';

		for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i],
				validStyler = Pod_Styler.validateCondition(style.styler, styler),
                validProps = Pod_Styler.validateCondition(style.props, obj.props),
                validState = Pod_Styler.validateCondition(style.state, obj.state),
				validContext = true,// Pod_Styler.validateCondition(style.context, obj.context), // Kyler TODO
				validPart = (typeof(style.part) === 'undefined' && part == 'main') || style.part == part || style.part == "global";

            if (validStyler && validProps && validState && validContext && validPart) {
                if (style.global) result.push(style.global);
                if (style[varSet]) result.push(style[varSet]);
            }
        }

        return result;
	}
};
*/
