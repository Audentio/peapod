
import _Merge from 'lodash/merge';
import _Clone from 'lodash/clone';
import Pod_Vars from './vars.js';
import Logger from './logger.js';
import processStyle from './processStyle.js'
//import css from 'css';

const pod_debug = false; // if true, will add a debug object to the inline style produced

// actual Styling
class Style {
    constructor(style, styleString = false, themeName = 'peapod') {
        if (styleString) {
            this.style = style; // for css strings don't need to hyphenate
        } else {
            this.style = processStyle(style, themeName);
        }
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

            if (scene !== 'condition' && scene !== 'prefix' && scene !== 'styleString' && scene !== 'themeName') {
                this.scenes[scene] = new Style(selector[scene], selector.styleString, selector.themeName);
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
    constructor(func = null) {
        this.styler = null;
        this.state = null;
        this.props = null;
        this.contest = null;
        this.func = func;
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
        this.themeName = 'peapod';
        if (name === 'undefined') {
            Logger.error('Sheet created without a name specified.');
        }
        this.name = name;
    }

    css(fileText) {
        console.log(fileText);
        //const rawCss = fileText.toString();
        //const parsedCss = css.parse(rawCss);
        //console.log(parsedCss);
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

    addCondition(name, func) {
        if (this.variablesResolved) {
            Logger.error(`Attempting to add condition ${name} in ${this.name} after variables have been initialized.  This will not work.`);
        }
        const condition = new Condition(func);
        this.conditions[name] = condition;
        return condition;
    }

    addDoc(data) {
        this.doc = data;
    }

    addDocDefault(data) {
        this.docDefault = data;
    }

    expandSelectors(selectors) {
        const newSelectors = [];
        for (let selectorIndex = 0, selectorLen = selectors.length; selectorIndex < selectorLen; selectorIndex++) {
            const selector = selectors[selectorIndex];
            const selectorKeys = Object.keys(selector);
            for (let i = 0, len = selectorKeys.length; i < len; i++) {
                const key = selectorKeys[i];
                const style = selector[key];
                if (style.length) {
                    newSelectors.push({ [key]: style }); // add string selector, TODO extend to expand selectors too
                } else {
                    const result = this.expandSelectorObjects(style, '', key, '', 0);
                    for (let resultIndex = 0, resultLen = result.length; resultIndex < resultLen; resultIndex++) {
                        newSelectors.push(result[resultIndex]);
                    }
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
                    const selectorValLen = selectorVal.length;
                    if (selectorValLen > 0) {
                        for (let arrIndex = 0; arrIndex < selectorValLen; arrIndex++) {
                            const arrVal = selectorVal[arrIndex];
                            if (typeof(arrVal) === 'function') { // evaluate any getProp functions
                                partSelectors[selectorIndex][selectorKey][arrIndex] = arrVal(instance);
                                dynamicConditions.push(`computed_${instance.componentName}_${partName}_${selectorIndex}_${ruleIndex}_${arrIndex}_${partSelectors[selectorIndex][selectorKey][arrIndex]}`);
                            }
                        }

                        partSelectors[selectorIndex][selectorKey] = partSelectors[selectorIndex][selectorKey].join('');
                    } else {
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

    selector(selectors, styling, ...stylingArray) {
        let styleString = false;

        if (stylingArray.length > 0 || typeof(styling) === 'string' || typeof(styling) === 'function') {
            stylingArray.unshift(styling);
            styleString = true;
        }


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

            const processedStyling = (styleString) ? stylingArray : styling;

            this.addPart(partName).addSelector({
                condition: conditions,
                common: {
                    [result]: processedStyling,
                },
                styleString,
                themeName: this.themeName, // will attribute styling to the theme that added it if debug mode enabled
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
