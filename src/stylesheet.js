import {merge as lodashMerge} from "lodash";
import Pod_Vars from './vars.js';
var React = require('react');


var pod_debug = false; // if true, will add a debug object to the inline style produced

// Parts of a component
class Part {
	constructor(name) {
		this.selectors = [];
		this.name = name;
	}

	addSelector(selector, wipeExisting = false) {
		if (wipeExisting) {
			this.selectors = [];
		}
		this.selectors.push(new Selector(selector));
		return this;
	}

	getSelectors() {
		return this.selectors;
	}

	getDebug(instance, scene, conditions) {
		let debugApplied = [],
			debugAll = [];

		for (let i = 0, len = this.selectors.length; i < len; i++) {
			let selector = this.selectors[i],
				debugStyling = selector.getStyling(scene),
				selectorConditions = selector.checkConditions(instance, conditions),
				selectorCondition = selector.getCondition(),
				selectorValid = [];

			if (selectorCondition !== null) {
				for (let conditionIndex = 0, conditionLen = selectorCondition.length; conditionIndex < conditionLen; conditionIndex++) {
					let conditionName = conditionIndex[conditionIndex],
						condition = conditions[conditionName],
						conditionValid = selector.checkCondition(condition);
					selectorValid.push({
						name: conditionName,
						condition: condition,
						valid: conditionValid,
						instance: {
							styler: instance.styler ||  'Error: Styler not Set',
							state: instance.state || 'Error: state not set',
							props: instance.props || 'Error: props not set',
							context: instance.context || 'Error: context not set'
						}
					});
				}
			}

			let info = {
				selectorPart: this.name,
				selectorScene: scene,
				selectorIndex: i,
				selectorCondition: selector.getCondition(),
				selectorValid: selectorValid,
				selectorApplied: selectorConditions,
				selectorStyling: debugStyling
			}

			if (selectorConditions) {
				debugApplied.push(info);
			}
			debugAll.push(info);
		}

		return {
			all: debugAll,
			applied: debugApplied
		}
	}

	getPartStyling(instance, scene, conditions) {
		let styling = null;

		for (let i = 0, len = this.selectors.length; i < len; i++) {
			let selector = this.selectors[i];
			if (selector.checkConditions(instance, conditions)) {
				let selectorStyling = selector.getSelector(instance, scene, conditions);
				if (styling == null) {
					styling = selectorStyling;
				} else if (selectorStyling !== null) {
					styling = lodashMerge({}, styling, selectorStyling);
				}
			}
		}

		if (pod_debug) {
			var debug = this.getDebug(instance, scene, conditions);

			styling.debug = {
				all: debug.all,
				appliedOnly: debug.applied,
				result: styling
			}
		}
		return styling;
	}
}

// Root part of a component
class Main extends Part {
	constructor() {
		super('main');
	}
}

// A condition to apply styling
class Condition {
	constructor() {
		this.styler = null;
		this.state = null;
		this.props = null;
		this.contest = null;
		this.func = null;
	}

	addStyler(obj) {
		this.styler = obj;
		return this;
	}

	addState(obj) {
		this.state = obj;
		return this;
	}

	addProp(obj) {
		this.props = obj;
		return this;
	}

	addContext(obj) {
		this.context = obj;
		return this;
	}

	addFunction(obj) {
		this.func = obj;
		return this;
	}

	//check if a specific type of condition is satisfied
	checkType(type, instance) {
		var instanceVal, conditionVal;
		if (type == 'styler') {
			instanceVal = instance.styler;
			conditionVal = this.styler;
		} else if (type == 'state') {
			instanceVal = instance.state;
			conditionVal = this.state;
		} else if (type == 'props') {
			instanceVal = instance.props;
			conditionVal = this.props;
		} else if (type == 'context') {
			instanceVal = instance.context;
			conditionVal = this.context;
		} else {
			throw "Unable to check condition of type: " + type;
		}

		if (conditionVal == null) {
			return true; // no condition of type specified
		} else if (typeof(instanceVal) == 'undefined') {
			return false; // no value in instance for condition of type specified
		} else {
			return this.validateCondition(conditionVal, instanceVal);
		}
	}

	// see if condition and instance are equal
	validateCondition(conditionVal, instanceVal) {
		var keys = Object.keys(conditionVal);
		for (var i = 0, len = keys.length; i < len; i++) {
			var key = keys[i],
				objVal = instanceVal[key],
				selVal = conditionVal[key];

			if (typeof(selVal) == 'object' && selVal !== null) {
				if (selVal.length == 2) {
					if (!this.compareValArray(selVal[0], objVal, selVal[1])) return false;
				} else {
					return false;
				}
			} else if (objVal != selVal) {
				return false;
			}
		}
		return true;
	}

	// check advanced comparison
	compareValArray(comparison, val, comparisonVal) {
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
	}

	// check if the condition is satisfied
	isTrue(instance) {
		let validStyler = this.checkType('styler', instance),
			validState = this.checkType('state', instance),
			validProps = this.checkType('props', instance),
			validContext = this.checkType('context', instance),
			validFunction = true;

		if (this.func !== null) {
			validFunction = this.func(instance);
		}

		return validStyler && validState & validProps && validContext && validFunction;
	}
}

// A selector (condition and style)
class Selector {
	constructor(selector) {
		var condition = selector.condition,
			conditionType = typeof(condition),
			keys = Object.keys(selector);
		if (conditionType == 'undefined') {
			this.condition = null;
		} else if (conditionType == 'string') {
			this.condition = [condition]
		} else {
			this.condition = condition;
		}

		this.scenes = {};

		for (var i = 0, len = keys.length; i < len; i++) {
			var scene = keys[i];

			if (scene !== 'condition') {
				this.scenes[scene] = new Style(selector[scene]);
			}
		}
	}

	getCondition() {
		return this.condition;
	}

	// check if all conditions for selector are true for component instance
	checkConditions(instance, conditions) {
		if (this.condition !== null ) {
			for (let i = 0, len = this.condition.length; i < len; i++) {
				let condition = this.checkCondition(instance, this.condition[i], conditions);
				if (!condition) return false;
			}
		}
		return true;
	}

	// check if a single condition is true
	checkCondition(instance, conditionName, conditions) {
		let condition = null,
			desired = true;
		if (conditionName.indexOf('!') > -1) {
			desired = false;
			conditon = conditions[conditionName.replace('!', '')]
		} else {
			condition = conditions[conditionName];
		}

		if (typeof(condition) == 'undefined') {
			console.warn('No definition for condition: ' + conditionName);
		}

		return condition.isTrue(instance);
	}

	// Gets the styling for a specified scene merged with the common scene
	getStyling(scene) {
		if (typeof(this.scenes.common) !== 'undefined') {
			if (typeof(this.scenes[scene]) !== 'undefined') {
				return lodashMerge({}, this.scenes.common.getStyle(), this.scenes[scene].getStyle());
			} else {
				return this.scenes.common.getStyle();
			}
		} else {
			if (typeof(this.scenes[scene]) !== 'undefined') {
				return this.scenes[scene].getStyle();
			} else {
				return null;
			}
		}
	}

	getSelector(instance, scene, conditions) {
		let applies = this.checkConditions(instance, conditions);
		if (applies) {
			return this.getStyling(scene);
		}
		return null;
	}
}

// actual Styling
class Style {
	constructor(style) {
		this.style = this.transform(style);
	}

	transform(styles, depth = 0) {
		if (typeof(styles) == 'object') {
			let keys = Object.keys(styles);
			for (var i = 0, len = keys.length; i < len; i++) {
				let key = keys[i],
					style = styles[key],
					styleType = typeof(style);

				if (styleType == 'string') {
					if (style == 0) {
						//style = "0px";
					}
				} else if (styleType == 'object') {
					styles[key] = this.transform(style, depth + 1);
				}
			}

		}

		return styles;
	}

	getStyle() {
		return this.style;
	}
}

// A sheet of parts with their selectors, conditions, and values for variables
class Sheet {
	constructor() {
		this.values = {};
		this.parts = {},
		this.conditions = {};
		this.doc = "";
		this.docDefault = null;
	}

	setValues(values = {}) {
		this.values = values;
		Pod_Vars.register(values);
	}

	addMain() {
		var main = new Main();
		this.parts.main = main;
		return main;
	}
	addPart(name) {
		var part = new Part(name);
		this.parts[name] = part;
		return part;
	}

	getValues() {
		return this.values;
	}
	getParts() {
		return this.parts;
	}
	getConditions() {
		return this.conditions;
	}

	addCondition(name) {
		var condition = new Condition();
		this.conditions[name] = condition;
		return condition;
	}

	addDoc(data) {
		this.doc = data;
	}

	addDocDefault(data) {
		this.docDefault = data;
	}

	getStyling(instance, part, scene = 'normal', conditions) {
		var partObj = this.parts[part];
		if (typeof(partObj) == 'undefined') throw "Could not find Part named " + part + '.'
		return partObj.getPartStyling(instance, scene, conditions);
	}

	getAllStyling(instance, scene = 'normal', conditions) {
		let result = {},
			partKeys = Object.keys(this.parts);

		for (var i = 0, len = partKeys.length; i < len; i++) {
			var partName = partKeys[i];
			result[partName] = this.parts[partName].getPartStyling(instance, scene, conditions);
		}

		return result;
	}

	getDoc() {
		return this.doc;
	}

	getDocDefault() {
		return this.docDefault;
	}
}

module.exports = {
	Sheet: Sheet
}
