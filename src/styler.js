/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var lodash = require('lodash');
import {Style} from 'stylesheet.js'

var debugInfo = false; // requires patched Radium
var enableMissingStyleWarning = false;

window.Pod_Styler = window.Pod_Styler || {
	libraries: [],
	currentLibrary: 'base',
	enableCache: false,
	enableVarCache: false,
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
						if (typeof(obj.styler.style) !== 'undefined') localStyle[part] = new Style(obj.styler.style).getStyle();
					} else {
						if (typeof(obj.styler[part + 'Style' + suffix]) !== 'undefined') localStyle[part] = new Style(obj.styler[part + 'Style' + suffix]).getStyle();
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
							var computedKeys = Object.keys(computedVar);

							for (var varIndex = 0, varLen = computedKeys.length; varIndex < varLen; varIndex++) {
								var computedKey = computedKeys[varIndex],
									resultVar = Pod_Styler.parseVariableValue(computedVar[computedKey], obj, scene);

								if (typeof(resultVar) == 'string') {
									if (resultVar.indexOf('!unset') == -1) {
										computedVar[computedKey] = resultVar;
									} else {
										if (computedKey == 'all') {
											computedVar = {};
										} else {
											delete computedVar[computedKey]
										}
									}
								} else {
									computedVar[computedKey] = resultVar;
								}
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

							if (typeof(resultVar) == 'string') {
								if (resultVar.indexOf('!unset') == -1) {
									partStyle[computedRuleKey] = resultVar;
								} else {
									if (computedRuleKey == 'all') {
										partStyle = {};
									} else {
										delete computedVar[computedKey]
									}
								}
							} else {
								partStyle[computedRuleKey] = resultVar;
							}
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
			if (!this.enableVarCache || typeof(this.varCache[computedVar + '_' + scene]) == 'undefined') {
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
				if (this.enableVarCache) {
					this.varCache[computedKey + '_' + scene] = computedVar;
				}
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
