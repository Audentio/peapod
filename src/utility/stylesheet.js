import { merge as _Merge, clone as _Clone } from 'lodash';
import Pod_Vars from './vars.js';
import Logger from './logger.js';

const pod_debug = false; // if true, will add a debug object to the inline style produced

// actual Styling
class Style {
    constructor(style) {
        this.style = style;
    }

    getStyle(instance) {
        if (instance !== undefined && instance.componentName === 'Grid_Cell') {
            let style = _Clone(this.style);

            if (typeof(style) === 'object') {
                const keys = Object.keys(style);
                for (let keyIndex = 0, keyLen = keys.length; keyIndex < keyLen; keyIndex++) {
                    const key = keys[keyIndex];
                    if (key.indexOf('@media') === 0) {
                        const keySize = key.split(' ').join('').replace('@media(', '')
                        .replace('px)', '')
                        .split(':');
                        if (keySize.length === 2) {
                            const paneWidth = instance.context._podPaneWidth;
                            const queryType = keySize[0];
                            const queryValue = keySize[1];
                            if (typeof(paneWidth) === 'number') {
                                if (queryType === 'minWidth') {
                                    if (paneWidth >= queryValue) {
                                        style = _Merge({}, style, style[key]);
                                    }
                                    delete style[key];
                                } else if (queryType === 'maxWidth') {
                                    if (paneWidth < queryValue) {
                                        style = _Merge({}, style, style[key]);
                                    }
                                    delete style[key];
                                } else {
                                    Logger.warn(`Unsupported value for media query: ${style[key]}`);
                                }
                            }
                        } else {
                            throw new Error(`Invalid media query: ${style[key]}`);
                        }
                    }
                }
            }

            return style;
        }
        return this.style;
    }
}

// A selector (condition and style)
class Selector {
    constructor(selector) {
        const condition = selector.condition;
        const conditionType = typeof(condition);
        const keys = Object.keys(selector);
        if (conditionType === 'undefined') {
            this.condition = null;
        } else if (conditionType === 'string') {
            this.condition = [condition];
        } else {
            this.condition = condition;
        }

        this.scenes = {};

        for (let i = 0, len = keys.length; i < len; i++) {
            const scene = keys[i];

            if (scene !== 'condition') {
                this.scenes[scene] = new Style(selector[scene]);
            }
        }
    }

    getCondition() {
        return this.condition;
    }

    // check if all conditions for selector are true for component instance
    checkConditions(instance, activeConditions) {
        if (this.condition !== null) {
            for (let i = 0, len = this.condition.length; i < len; i++) {
                const condition = this.checkCondition(this.condition[i], activeConditions);
                if (!condition) return false;
            }
        }
        return true;
    }

    checkCondition(condition, activeConditions) {
        return activeConditions.indexOf(condition) > -1;
    }

    // Gets the styling for a specified scene merged with the common scene
    getStyling(instance, scene) {
        if (typeof(this.scenes.common) !== 'undefined') {
            if (typeof(this.scenes[scene]) !== 'undefined') {
                return _Merge({}, this.scenes.common.getStyle(instance), this.scenes[scene].getStyle(instance));
            }
            return this.scenes.common.getStyle(instance);
        }
        if (typeof(this.scenes[scene]) !== 'undefined') {
            return this.scenes[scene].getStyle(instance);
        }
        return null;
    }

    getSelector(instance, scene) {
        return this.getStyling(instance, scene);
    }
}

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
        const debugApplied = [];
        const debugAll = [];

        for (let i = 0, len = this.selectors.length; i < len; i++) {
            const selector = this.selectors[i];
            const debugStyling = selector.getStyling(scene);
            const selectorConditions = selector.checkConditions(instance, conditions);
            const selectorCondition = selector.getCondition();
            const selectorValid = [];

            if (selectorCondition !== null) {
                for (let conditionIndex = 0, conditionLen = selectorCondition.length; conditionIndex < conditionLen; conditionIndex++) {
                    const conditionName = conditionIndex[conditionIndex];
                    const condition = conditions[conditionName];
                    const conditionValid = selector.checkCondition(condition);
                    selectorValid.push({
                        name: conditionName,
                        condition,
                        valid: conditionValid,
                        instance: {
                            styler: instance.styler || 'Error: Styler not Set',
                            state: instance.state || 'Error: state not set',
                            props: instance.props || 'Error: props not set',
                            context: instance.context || 'Error: context not set',
                        },
                    });
                }
            }

            const info = {
                selectorPart: this.name,
                selectorScene: scene,
                selectorIndex: i,
                selectorCondition: selector.getCondition(),
                selectorValid,
                selectorApplied: selectorConditions,
                selectorStyling: debugStyling,
            };

            if (selectorConditions) {
                debugApplied.push(info);
            }
            debugAll.push(info);
        }

        return {
            all: debugAll,
            applied: debugApplied,
        };
    }

    getPartStyling(instance, scene, activeConditions, conditions) {
        let styling = null;

        for (let i = 0, len = this.selectors.length; i < len; i++) {
            const selector = this.selectors[i];
            if (selector.checkConditions(instance, activeConditions)) {
                const selectorStyling = selector.getSelector(instance, scene);
                if (styling == null) {
                    styling = selectorStyling;
                } else if (selectorStyling !== null) {
                    styling = _Merge({}, styling, selectorStyling);
                }
            }
        }

        if (pod_debug) {
            const debug = this.getDebug(instance, scene, conditions);

            styling.debug = {
                all: debug.all,
                appliedOnly: debug.applied,
                result: styling,
            };
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

    // check if a specific type of condition is satisfied
    checkType(type, instance) {
        let instanceVal;
        let conditionVal;
        if (type === 'styler') {
            instanceVal = instance.styler;
            conditionVal = this.styler;
        } else if (type === 'state') {
            instanceVal = instance.state;
            conditionVal = this.state;
        } else if (type === 'props') {
            instanceVal = instance.props;
            conditionVal = this.props;
        } else if (type === 'context') {
            instanceVal = instance.context;
            conditionVal = this.context;
        } else {
            throw new Error(`Unable to check condition of type: ${type}`);
        }

        if (conditionVal == null) {
            return true; // no condition of type specified
        } else if (typeof(instanceVal) === 'undefined') {
            return false; // no value in instance for condition of type specified
        }
        return this.validateCondition(conditionVal, instanceVal);
    }

    // see if condition and instance are equal
    validateCondition(conditionVal, instanceVal) {
        const keys = Object.keys(conditionVal);
        for (let i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            const objVal = instanceVal[key];
            const selVal = conditionVal[key];

            if (typeof(selVal) === 'object' && selVal !== null) {
                if (selVal.length === 2) {
                    if (!this.compareValArray(selVal[0], objVal, selVal[1])) return false;
                } else {
                    return false;
                }
            } else if (objVal !== selVal) {
                return false;
            }
        }
        return true;
    }

    // check advanced comparison
    compareValArray(comparison, val, comparisonVal) {
        if (comparison === '==') {
            if (!(val === comparisonVal)) return false;
        } else if (comparison === '!=') {
            if (!(val !== comparisonVal)) return false;
        } else if (comparison === '>') {
            if (!(val > comparisonVal)) return false;
        } else if (comparison === '>=') {
            if (!(val >= comparisonVal)) return false;
        } else if (comparison === '<') {
            if (!(val < comparisonVal)) return false;
        } else if (comparison === '<=') {
            if (!(val <= comparisonVal)) return false;
        }
        return true;
    }

    // check if the condition is satisfied
    isTrue(instance) {
        const validStyler = this.checkType('styler', instance);
        const validState = this.checkType('state', instance);
        const validProps = this.checkType('props', instance);
        const validContext = this.checkType('context', instance);
        let validFunction = true;

        if (this.func !== null) {
            validFunction = this.func(instance);
        }

        return validStyler && validState & validProps && validContext && validFunction;
    }
}

// A sheet of parts with their selectors, conditions, and values for variables
class Sheet {
    constructor(name) {
        this.values = {};
        this.parts = {};
        this.conditions = {};
        this.doc = '';
        this.docDefault = null;
        this.variablesResolved = false;
        this.scenesResolved = false;
        this.stylesResolved = false;
        if (name === 'undefined') {
            Logger.error('Sheet created without a name specified.');
        }
        this.name = name;
    }

    setValues(values = {}, scene = 'common', custom = false) {
        let variables = {
            [scene]: {
                [this.name]: values,
            },
        };

        if (custom) {
            variables = values;
        }

        this.values = variables;
        Pod_Vars.register(variables);

        return this;
    }

    addMain() {
        const main = new Main();
        this.parts.main = main;
        return main;
    }
    addPart(name) {
        const part = new Part(name);
        this.parts[name] = part;
        return part;
    }

    getName() {
        return this.name;
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
        if (this.variablesResolved) {
            Logger.error(`Attempting to add condition ${name} in ${this.name} after variables have been initialized.  This will not work.`);
        }
        const condition = new Condition();
        this.conditions[name] = condition;
        return condition;
    }

    addDoc(data) {
        this.doc = data;
    }

    addDocDefault(data) {
        this.docDefault = data;
    }

    getAllStyling(instance, scene = 'normal', conditions, localVars, globalVars) {
        if (typeof(this.resolveStyles) === 'function' && !this.stylesResolved) {
            this.stylesResolved = true;
            this.resolveStyles(localVars, globalVars);
        }

        const source = {};
        const partKeys = Object.keys(this.parts);
        const activeConditions = this.getActiveConditions(instance, conditions);

        for (let i = 0, len = partKeys.length; i < len; i++) {
            const partName = partKeys[i];
            source[partName] = this.parts[partName].getPartStyling(instance, scene, activeConditions, conditions);
        }

        return { source, activeConditions };
    }

    getDoc() {
        return this.doc;
    }

    getDocDefault() {
        return this.docDefault;
    }

    // check if a single condition is true
    getActiveConditions(instance, conditions) {
        const activeConditions = [];
        const conditionNames = Object.keys(conditions);

        for (let i = 0, len = conditionNames.length; i < len; i++) {
            const conditionName = conditionNames[i];
            const condition = conditions[conditionName];
            if (condition.isTrue(instance)) {
                activeConditions.push(conditionName);
            }
        }

        return activeConditions;
    }

}

module.exports = {
    Sheet,
    Style,
    Condition,
};
