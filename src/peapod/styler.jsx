/*! Peapod v<%= package.version %>
 *  Copyright Audentio <%= package.year %>
 *  LICENSE: <%= package.licence %>
 */

var React = require('react');

var lodash = require('lodash')

var debugInfo = false; // requires patched Radium
var enableMissingStyleWarning = false;

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

window.Pod_Styler = window.Pod_Styler || {
	libraries: [],
	currentLibrary: 'base',
	enableCache: false,
	cache: {},
	varCache: {},
	maxCacheLength: 20,

	doc: function() {
		var libraries = Pod_Styler.getLibraryStack(),
			libraryResult = [];
		for (var i = 0, len = libraries.length; i < len; i++) {
			var library = libraries[i];
			if (library.type !== 'local') {
				var components = library.components,
					componentNames = library.componentNames,
					componentResults = [];

				for (var componentIndex = 0, componentLen = componentNames.length; componentIndex < componentLen; componentIndex++) {
					var componentName = componentNames[componentIndex],
						component = components[componentName];
					componentResults.push(
						<div key={componentIndex} style={{paddingLeft: '20px'}}>
							<h3>Component: {componentName}</h3>
							{component.doc(componentName)}
						</div>
					);
				}
				libraryResult.push(
					<div key={i}>
						<h2>Library: {library.name}</h2>
						{componentResults}
					</div>
				);
			}

		}
		return (
			<div>
				<h1>Peapod Self-Documentation (Work in Progress)</h1>
				{libraryResult}
			</div>
		)
	},

	// registers a library
	addLibrary: function(parentName, libraryName, componentNames, requireFunc) {
		let components = {};
		for (let i = 0, len = componentNames.length; i < len; i++) {
			let componentName = componentNames[i],
				stylesheet = null;

			try {
				stylesheet = requireFunc('./' + componentName.charAt(0).toLowerCase() + componentName.slice(1) + '.jsx');
			} catch(err) {
				if (err.code !== 'MODULE_NOT_FOUND') {
					throw err; // Re-throw not "Module not found" errors
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
			type: 'normal'
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

		if (depth >= 30) throw "Maximum Library stack size reached."

		return stack;
	},

	// combines each library into an array
	buildSources: function(obj, part, componentName, scene) {
		var sources = [],
			libraries = Pod_Styler.getLibraryStack(),
			conditions = {};

		for (var i = 0, len = libraries.length; i < len; i++) {
			var library = libraries[i],
				component = library.components[componentName];

			if (typeof(component) !== 'undefined') {
				var condition = component.getConditions(),
					keys = Object.keys(condition);

				for (var i = 0, len = keys.length; i < len; i++) {
					var key = keys[i];
					conditions[key] = condition[key];
				}
			}
		}

		for (var i = 0, len = libraries.length; i < len; i++) {
			var library = libraries[i],
				source = null;
			if (library.type == "local") {
				if (part == 'main' && typeof(obj.styler.mainStyle) == 'undefined') {
					source = obj.styler.style;
				} else {
					source = obj.styler[part + 'Style'];
				}
			} else {
				source = libraries[i].components[componentName];
				if (source !== null) {
					if (typeof(source) == 'undefined') {
						if (enableMissingStyleWarning) console.warn('Could not find styling for ' + componentName + ' in ' + library.name + '.')
					} else {
						source = source.getStyling(obj, part, scene, conditions); // pass in collapsed conditions
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
	processSources: function(obj, scene, sources) {
		var style = {};

		if (typeof(obj.props.style) !== 'undefined') {
			style = obj.props.style;
		}

		for (var i = 0, len = sources.length; i < len; i++) {
			for (var ruleIndex = 0, ruleLen = Object.keys(sources[i]).length; ruleIndex < ruleLen; ruleIndex++) {
				var ruleKey = Object.keys(sources[i])[ruleIndex],
					computedVar = sources[i][ruleKey];
				if (typeof(computedVar) == 'object') { // merge style objects
					for (var varIndex = 0, varLen = Object.keys(computedVar).length; varIndex < varLen; varIndex++) {
						computedVar[Object.keys(computedVar)[varIndex]] = Pod_Styler.parseVariableValue(computedVar[Object.keys(computedVar)[varIndex]], obj, scene);
					}

					if (typeof(style[ruleKey]) !== 'undefined') { // merge if key already exists
						style[ruleKey] = Object.assign(style[ruleKey], computedVar);
					} else { // otherwise add the key
						style[ruleKey] = computedVar;
					}

				} else {
					var resultVar = Pod_Styler.parseVariableValue(computedVar, obj, scene);
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

		return style;
	},

	getStyle: function(instance, part = "main", localStyler = {}) {
		var propsStyler = (typeof(instance) !== 'undefined' && typeof(instance.props) !== 'undefined' && typeof(instance.props.styler) !== 'undefined') ? instance.props.styler : {},
			styler = lodash.merge(propsStyler, localStyler) || {},
			componentName = styler.styleLike || instance.constructor.displayName,
			scene = styler.scene || 'normal',
			obj = {
				context: instance.context || {},
				state: instance.state || {},
				props: instance.props || {},
				styler: styler
			};

		if (Pod_Styler.enableCache) {
			var cacheVal = this.getStyleFromCache(obj, componentName, part || "_");
			if (cacheVal !== false) {
				return cacheVal;
			}
		}

		var sources = Pod_Styler.buildSources(obj, part, componentName, scene);
		var style = Pod_Styler.processSources(obj, scene, sources);

		if (Pod_Styler.enableCache) {
			this.addStyleToCache(obj, componentName, part || "_", style);
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
					    computedVar = computedVar.replace(match, Pod_Vars.get(match.replace('{$', '').replace('}', '')));
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
			computedVar = obj.styler[computedVar.replace('getStyler:', '')];
		} else if (computedVar.indexOf('getContext:') > -1) {
			computedVar = obj.context[computedVar.replace('getContext:', '')];
		}
		return computedVar;
	},

}

module.exports = Pod_Styler;
