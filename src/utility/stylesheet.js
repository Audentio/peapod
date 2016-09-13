
import _Merge from 'lodash/merge';
import _Clone from 'lodash/clone';
import Pod_Vars from './vars.js';
import Logger from './logger.js';

const pod_debug = false; // if true, will add a debug object to the inline style produced

// actual Styling
class Style {
    constructor(style) {
        this.style = this.processRules(style);
    }

    processRules(obj, depth = 0) {
        const rules = Object.keys(obj);
        for (let i = 0, len = rules.length; i < len; i++) {
            const rule = rules[i];
            const val = obj[rule];
            if (typeof(val) === 'object') {
                if (depth < 10) {
                    obj[rule] = this.processRules(val, depth + 1);
                } else {
                    Logger.error('Depth of style too large');
                }
            } else {
                const hyphenatedRule = rule.replace(/^([A-Z])/g, '-$1').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                if (rule !== hyphenatedRule) {
                    obj[hyphenatedRule] = val;
                    delete obj[rule]; // Comment this to keep js rules
                }
            }
        }

        return obj;
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
                                    //Logger.warn(`Unsupported value for media query: ${style[key]}`);
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

    getRawStyle() {
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

        this.prefix = [];
        if (typeof(selector.prefix) !== 'undefined') {
            this.prefix = selector.prefix;
        }

        this.scenes = {};

        for (let i = 0, len = keys.length; i < len; i++) {
            const scene = keys[i];

            if (scene !== 'condition' && scene !== 'prefix') {
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

    // Gets styling for the specified scene, but in a raw form
    getRawStyling(instance, scene) {
        if (typeof(this.scenes.common) !== 'undefined') {
            if (typeof(this.scenes[scene]) !== 'undefined') {
                return _Merge({}, this.scenes.common.getRawStyle(instance), this.scenes[scene].getRawStyle(instance));
            }
            return this.scenes.common.getRawStyle(instance);
        }
        if (typeof(this.scenes[scene]) !== 'undefined') {
            return this.scenes[scene].getRawStyle(instance);
        }
        return null;
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

    // will get an array of all selectors
    getRawStyling(instance, scene) {
        const styling = [];

        for (let i = 0, len = this.selectors.length; i < len; i++) {
            const selector = this.selectors[i].getRawStyling(instance, scene);
            styling.push(selector);
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

    reset() {
        this.parts = {};
        this.variablesResolved = false;
        this.scenesResolved = false;
        this.stylesResolved = false;
    }

    setValues(values = {}, scene = 'common', custom = false) {
        if (custom) {
            this.values = values;
        } else {
            this.values = {
                [scene]: {
                    [this.name]: values,
                },
            };
        }

        Pod_Vars.register(this.values);

        return this;
    }

    addMain() {
        let main = null;

        if (typeof(this.parts.main) === 'undefined') {
            main = new Main();
            this.parts.main = main;
        } else {
            main = this.parts.main;
        }

        return main;
    }
    addPart(name) {
        let part = null;

        if (typeof(this.parts[name]) === 'undefined') {
            part = new Part(name);
            this.parts[name] = part;
        } else {
            part = this.parts[name];
        }

        return part;
    }

    getName() {
        return this.name;
    }
    getValues(scene) {
        if (typeof(scene) === 'undefined') {
            return this.values;
        } else if (scene === 'common') {
            return this.values.common;
        }
        return Object.assign({}, this.values.common, this.values[scene]);
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
        this.resolve(localVars, globalVars);

        const source = {};
        const partKeys = Object.keys(this.parts);
        const activeConditions = this.getActiveConditions(instance, conditions);


        for (let i = 0, len = partKeys.length; i < len; i++) {
            const partName = partKeys[i];
            const partRules = this.parts[partName].getPartStyling(instance, scene, activeConditions, conditions);

            if (partRules !== null) {
                const partRuleKeys = Object.keys(partRules);

                for (let ruleIndex = 0, ruleLen = partRuleKeys.length; ruleIndex < ruleLen; ruleIndex++) {
                    const ruleKey = partRuleKeys[ruleIndex];
                    const ruleVal = partRules[ruleKey];

                    if (typeof(ruleVal) === 'function') {
                        partRules[ruleKey] = ruleVal(instance);
                        activeConditions.push(`computed_${partName}_${ruleIndex}_${partRules[ruleKey]}`);
                    }
                }
            }

            source[partName] = partRules;
        }

        return { source, activeConditions };
    }

    expandSelectors(selectors) {
        const newSelectors = [];
        for (let selectorIndex = 0, selectorLen = selectors.length; selectorIndex < selectorLen; selectorIndex++) {
            const selector = selectors[selectorIndex];
            const selectorKeys = Object.keys(selector);
            for (let i = 0, len = selectorKeys.length; i < len; i++) {
                const key = selectorKeys[i];
                const style = selector[key];
                const result = this.expandSelectorObjects(style, '', key, '', 0);
                for (let resultIndex = 0, resultLen = result.length; resultIndex < resultLen; resultIndex++) {
                    newSelectors.push(result[resultIndex]);
                }
            }
        }
        return newSelectors;
    }

    expandSelectorObjects(styleObj, prefix, name, suffix, depth = 0) {
        const combinedName = `${prefix}${name}${suffix}`;
        const result = [];
        const newStyleObj = {};
        if (depth < 20) {
            const styleKeys = Object.keys(styleObj);
            for (let styleIndex = 0, styleLen = styleKeys.length; styleIndex < styleLen; styleIndex++) {
                const styleKey = styleKeys[styleIndex];
                const style = styleObj[styleKey];

                if (typeof(style) === 'object') {
                    let newPrefix = '';
                    let newSuffix = '';
                    if (styleKey.indexOf('@media') >= 0) {
                        newPrefix = styleKey + '|||'; // sentinal character to divide media query
                    } else {
                        newSuffix = styleKey;
                    }

                    const expandedStyle = this.expandSelectorObjects(style, newPrefix, combinedName, newSuffix, depth + 1);
                    for (let expandedIndex = 0, expandedLen = expandedStyle.length; expandedIndex < expandedLen; expandedIndex++) {
                        result.push(expandedStyle[expandedIndex]); // add as a separate selector
                    }
                } else {
                    newStyleObj[styleKey] = style;
                }
            }

            result.unshift({ [combinedName]: newStyleObj }); // add default styling first

            return result;
        }

        throw new Error('Expanding selector depth exceeded 20');
    }

    getAllSelectors(instance, scene = 'normal', conditions, localVars, globalVars) {
        this.resolve(localVars, globalVars);

        const source = {};
        const partKeys = Object.keys(this.parts);
        const activeConditions = this.getActiveConditions(instance, conditions);
        const dynamicConditions = [];

        for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
            const partName = partKeys[partIndex];
            const partRawSelectors = this.parts[partName].getRawStyling(instance, scene);

            const partSelectors = this.expandSelectors(partRawSelectors);

            for (let selectorIndex = 0, selectorLen = partSelectors.length; selectorIndex < selectorLen; selectorIndex++) {
                const selector = partSelectors[selectorIndex];
                const selectorKeys = Object.keys(selector);
                for (let ruleIndex = 0, ruleLen = selectorKeys.length; ruleIndex < ruleLen; ruleIndex++) {
                    const selectorKey = selectorKeys[ruleIndex];
                    const selectorVal = selector[selectorKey];
                    const ruleKeys = Object.keys(selectorVal);

                    for (let keyIndex = 0, keyLen = ruleKeys.length; keyIndex < keyLen; keyIndex++) {
                        const ruleKey = ruleKeys[keyIndex];
                        const ruleVal = selectorVal[ruleKey];

                        if (typeof(ruleVal) === 'function' && ruleKey.indexOf('__') === -1) { // evaluate any getProp functions, ignore __Radium things
                            partSelectors[selectorIndex][selectorKey][ruleKey] = ruleVal(instance);
                            dynamicConditions.push(`computed_${instance.componentName}_${partName}_${selectorIndex}_${ruleIndex}_${keyIndex}_${partSelectors[selectorIndex][selectorKey][ruleKey]}`);
                        }
                    }
                }
            }

            source[partName] = partSelectors;
        }

        return { source, dynamicConditions, activeConditions };
    }

    resolve(localVars, globalVars) { // resolveStyles, will only be run once
        if (typeof(this.resolveStyles) === 'function' && !this.stylesResolved) {
            this.stylesResolved = true;
            this.resolveStyles(localVars, globalVars);
        }
    }

    getDoc() {
        return this.doc;
    }

    getDocDefault() {
        return this.docDefault;
    }

    selector(selectors, styling) {
        const globalPattern = /:global\(.*\)/;

        const splitSelectors = selectors.split(','); // allows chaining slectors with commas
        for (let selectorsIndex = 0, selectorsLen = splitSelectors.length; selectorsIndex < selectorsLen; selectorsIndex++) {
            const selector = splitSelectors[selectorsIndex];
            const globals = selector.match(globalPattern);
            const splitGlobals = selector.split(globalPattern);
            let result = [];
            let conditions = [];
            let partName = 'ERROR';
            for (let globalIndex = 0, globalLen = splitGlobals.length; globalIndex < globalLen; globalIndex++) {
                const globalStr = splitGlobals[globalIndex];

                if (globalIndex > 0) {
                    const globalVal = globals[globalIndex - 1].substring(8, globals[globalIndex - 1].length - 1); // remove the surrounding ":global()"
                    result.push(globalVal);
                }

                const splitWords = globalStr.split(' '); // allows multiple words for descendent selectors
                const splitWordsLen = splitWords.length;
                for (let wordIndex = 0; wordIndex < splitWordsLen; wordIndex++) {
                    result.push(' ');

                    const word = splitWords[wordIndex];
                    const splitPseudos = word.split(':'); // split on pseudos to be able to later append them to the hashed selector
                    for (let pseudoIndex = 0, pseudoLen = splitPseudos.length; pseudoIndex < pseudoLen; pseudoIndex++) {
                        const pseudo = splitPseudos[pseudoIndex];
                        if (pseudoIndex === 0) {
                            const tagSplit = pseudo.split('.');
                            for (let tagIndex = 0, tagLen = tagSplit.length; tagIndex < tagLen; tagIndex++) {
                                const tag = tagSplit[tagIndex];
                                if (tagIndex > 0) {
                                    const splitConditions = tag.split('--');
                                    for (let conditionIndex = 0, conditionLen = splitConditions.length; conditionIndex < conditionLen; conditionIndex++) {
                                        const condition = splitConditions[conditionIndex];
                                        const tempPartName = condition.replace('.', '');
                                        if (conditionIndex === 0) {
                                            conditions = [];
                                            if (tempPartName !== '') {
                                                partName = tempPartName;
                                            }
                                        }
                                        if (conditionLen === 1) {
                                            result.push(`.${this.name}__${partName}__`);
                                            result.push('&'); // sentinal value for putting the instance's hash in
                                        } else if (conditionIndex > 0) {
                                            conditions.push(condition);
                                            if (tempPartName === '') {
                                                result.push(`.${this.name}__`);
                                                result.push('&'); // sentinal value for putting the instance's hash in
                                                result.push(`--${condition}`);
                                            } else {
                                                result.push(`.${this.name}__${partName}__`);
                                                result.push('&'); // sentinal value for putting the instance's hash in
                                                result.push(`--${condition}`);
                                            }
                                        }
                                    }
                                } else if (tag !== '') {
                                    result.push(tag);
                                }
                            }
                        } else {
                            result.push(`:${pseudo}`);
                        }
                    }
                }
            }

            result = result.join('');

            styling._theme = 'peapod';

            this.addPart(partName).addSelector({
                condition: conditions,
                common: {
                    [result]: styling,
                },
                selector: result,
            });
        }

        return this;
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
