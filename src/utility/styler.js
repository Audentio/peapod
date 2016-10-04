/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import _isEqual from 'lodash/isEqual';
import { Style } from './stylesheet.js';
import Logger from './logger.js';
import emoji from './emoji.js';

window.Styler = window.Styler || {
    enableCache: true,
    enableVarCache: true,
    cache: {},
    varCache: {},
    maxCacheLength: 5000,
    classCount: 0,
    styleRootEle: null,
    rootEle: '#mainContainer', // container ID for higher specificity selectors

    buildSources(obj, allSelectors) {
        const sources = [];
        const activeConditions = [];
        const dynamicConditions = [];
        const combinedConditions = [];
        const parts = (typeof(obj.stylesheet) !== 'undefined') ? obj.stylesheet.getParts() : {}; // all parts available to component
        const componentName = obj.componentName;
        const scene = obj.scene; // scene applying to object
        const libraries = ['preLocal', 'sheet', 'local'];

        for (let i = 0, len = libraries.length; i < len; i++) {
            const library = libraries[i];
            let source = null;
            if (library !== 'sheet') { // special libraries to add local inline styling
                const localStyle = {};
                const partKeys = Object.keys(parts);
                const suffix = (library === 'preLocal') ? 'Pre' : '';

                // get local styling for any parts
                for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
                    const part = partKeys[partIndex];

                    if (part === 'main' && typeof(obj.styler.mainStyle) === 'undefined' && suffix === '') {
                        if (typeof(obj.styler.style) !== 'undefined') { // special case for `styler.style` applying to main
                            localStyle[part] = new Style(obj.styler.style).getStyle(); // process styling for media queries, shorthand, etc.
                            //localStyle[part] = obj.styler.style;
                        }
                    } else {
                        if (typeof(obj.styler[`${part}Style${suffix}`]) !== 'undefined') { // any other inline styling that isn't `styler.style`
                            localStyle[part] = new Style(obj.styler[`${part}Style${suffix}`]).getStyle(); // process styling for media queries, shorthand, etc.
                            //localStyle[part] = obj.styler[`${part}Style${suffix}`];
                        }
                    }
                }

                if (Object.keys(localStyle).length > 0) {
                    source = localStyle; // if a localStyle was applied, then make it the source
                    const conditionContent = JSON.stringify(localStyle);
                    if (allSelectors) { // new styling
                        dynamicConditions.push(conditionContent);
                        combinedConditions.push(conditionContent);
                    } else {
                        activeConditions.push(conditionContent); // TODO more efficient way of creating unique condition
                    }
                }
            } else { // styling from style.js
                if (typeof(obj.stylesheet) !== 'undefined') {
                    const themesheet = window.Styler.initializeSheet(obj.themesheet, scene, true);
                    const globalVars = themesheet.getValues(scene);
                    const globalConditions = themesheet.getConditions();
                    const localsheet = window.Styler.initializeSheet(obj.stylesheet, scene, false, globalVars);
                    const localVars = localsheet.getValues(scene)[componentName];
                    const localConditions = localsheet.getConditions();
                    let allConditions = {};

                    if (typeof(globalConditions) === 'undefined') {
                        allConditions = localConditions;
                    } else {
                        if (typeof(localConditions) === 'undefined') {
                            allConditions = globalConditions;
                        } else {
                            allConditions = Object.assign({}, globalConditions, localConditions);
                        }
                    }

                    if (allSelectors) { // new styling
                        const sheetData = localsheet.getAllSelectors(obj, scene, allConditions, localVars, globalVars); // pass in collapsed conditions, allows conditions to be overwritten in child themes.  All styling returned will have it's conditions true

                        source = sheetData.source;

                        for (let conditionIndex = 0, conditionLen = sheetData.activeConditions.length; conditionIndex < conditionLen; conditionIndex++) {
                            activeConditions.push(sheetData.activeConditions[conditionIndex]);
                            combinedConditions.push(sheetData.activeConditions[conditionIndex]);
                        }

                        for (let conditionIndex = 0, conditionLen = sheetData.dynamicConditions.length; conditionIndex < conditionLen; conditionIndex++) {
                            dynamicConditions.push(sheetData.dynamicConditions[conditionIndex]);
                            combinedConditions.push(sheetData.dynamicConditions[conditionIndex]);
                        }

                        let style = obj.props.style;
                        if (typeof(style) === 'object') {
                            let partKeys = Object.keys(style);

                            if (partKeys.indexOf('main') === -1) { // allow for not specifying main part
                                style = { main: style };
                                partKeys = Object.keys(style);
                            }

                            for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
                                const partKey = partKeys[partIndex];
                                const styling = {};

                                const styleSource = style[partKey];
                                if (typeof(styleSource) !== 'undefined') {
                                    const rules = Object.keys(styleSource);
                                    for (let ruleIndex = 0, ruleLen = rules.length; ruleIndex < ruleLen; ruleIndex++) {
                                        const ruleKey = rules[ruleIndex];
                                        const ruleKeyProcessed = ruleKey.replace(/^([A-Z])/g, '-$1').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                                        const ruleVal = styleSource[ruleKey];
                                        styling[ruleKeyProcessed] = ruleVal;
                                    }

                                    dynamicConditions.push(`inline_${obj.componentName}_${partKey}_${JSON.stringify(styling)}`); // add a dynamic condition for the styling passed
                                }

                                const newKey = `${this.rootEle} .${obj.componentName}__${partKey}__&`;

                                source[partKey].push({ [newKey]: styling });
                            }
                        }
                    }
                }
            }

            if (typeof(source) !== 'undefined' && source !== null) {
                sources.push(source); // add styling from source if any was found in the library
            }
        }

        return { sources, activeConditions, dynamicConditions, combinedConditions };
    },

    initializeSheet(sheet, scene, isTheme, globalVars) {
        if (sheet !== null && typeof(sheet) !== 'undefined') {
            let sheetVals = {};
            if (typeof(sheet.resolveValues) === 'function' && true) {
                sheetVals = sheet.resolveValues(globalVars);
                sheet.variablesResolved = true;
            }

            if (typeof(sheet.resolveSceneValues) === 'function' && !sheet.scenesResolved) {
                const sceneVals = sheet.resolveSceneValues(sheetVals, globalVars);
                if (typeof(sceneVals[scene]) !== 'undefined') {
                    if (sheetVals === {}) {
                        sheetVals = sceneVals;
                    } else {
                        sheetVals = Object.assign({}, sheetVals, sceneVals);
                    }
                }
                sheet.scenesResolved = true;
            }

            sheet.setValues(sheetVals, 'common', isTheme); // TODO fix this Kyler
        }
        return sheet;
    },

    getUniqueClassName() {
        let ret = 'ERROR_GENERATING_CLASSNAME';

        if (process.env.podHash) {
            window.Styler.classCount++;
            return window.Styler.classCount;
        }

        if (window.Styler.classCount > emoji.length) {
            ret = emoji[Math.floor(window.Styler.classCount / emoji.length)] + emoji[window.Styler.classCount % emoji.length];
        } else {
            ret = emoji[window.Styler.classCount];
        }
        window.Styler.classCount++;

        return ret;
    },

    makeClassString(obj, partKey, activeConditions, unique) {
        let partClassString = `${obj.componentName}__${partKey}__${unique}`;
        if (typeof(activeConditions) !== 'undefined') {
            for (let activeConditionIndex = 0, activeConditionLen = activeConditions.length; activeConditionIndex < activeConditionLen; activeConditionIndex++) {
                const activeCondition = activeConditions[activeConditionIndex];
                partClassString += ` ${obj.componentName}__${partKey}__${unique}--${activeCondition}`;
            }
        }

        let source = null;
        if (typeof(obj.props.className) === 'string') {
            if (partKey === 'main') {
                source = obj.props.className;
            }
        } else if (typeof(obj.props.className) === 'object') {
            if (typeof(obj.props.className[partKey]) !== 'undefined') {
                source = obj.props.className[partKey];
            }
        }
        if (source !== null) {
            const sourceBlocks = source.split('__');
            const lastBlock = sourceBlocks[sourceBlocks.length - 1];
            const blockModifiers = lastBlock.split('--');
            const firstModifier = blockModifiers[0];
            const modifierPseudos = firstModifier.split(':');
            const inlineUnique = modifierPseudos[0];

            partClassString += ` ${this.makeInlineClass(source, inlineUnique)}`;
        }

        return partClassString;
    },

    // make inline css from sources array
    processSources(obj, sourcesAndConditions, classRet = 0) {
        const style = {};

        if (classRet == 1) {
            style.style = {};
        }

        const scene = obj.scene;
        const componentName = obj.componentName;
        const sources = sourcesAndConditions.sources;

        // go through each source's styling

        const styleKeyBase = window.Styler.getUniqueClassName();

        if (classRet === 2) {
            const rules = [];
            const activeConditions = sourcesAndConditions.activeConditions;
            const parts = {};

            for (let sourceIndex = 0, sourceLen = sources.length; sourceIndex < sourceLen; sourceIndex++) {
                const source = sources[sourceIndex]; // source from buildSrouces
                const partKeys = Object.keys(source);
                for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) { // then through each part in the source
                    const partKey = partKeys[partIndex];
                    const part = source[partKey];

                    style[partKey] = {
                        selectors: part,
                        activeConditions: sourcesAndConditions.activeConditions,
                        dynamicConditions: sourcesAndConditions.dynamicConditions,
                        componentName: obj.componentName,
                        partKey,
                    };

                    for (let selectorsIndex = 0, selectorsLen = part.length; selectorsIndex < selectorsLen; selectorsIndex++) {
                        const selectors = part[selectorsIndex];
                        const selectorKeys = Object.keys(selectors);
                        for (let selectorIndex = 0, selectorLen = selectorKeys.length; selectorIndex < selectorLen; selectorIndex++) {
                            const selectorKey = selectorKeys[selectorIndex];
                            const selectorStyle = selectors[selectorKey];
                            rules.push({ key: selectorKey, style: selectorStyle });
                        }
                    }

                    const partClassString = this.makeClassString(obj, partKey, activeConditions, styleKeyBase);

                    parts[partKey] = partClassString;
                }
            }

            return { selectors: rules, parts, style, unique: styleKeyBase };
        }

        // Old method of processing sources
        for (let sourceIndex = 0, sourceLen = sources.length; sourceIndex < sourceLen; sourceIndex++) {
            const source = sources[sourceIndex]; // source from buildSrouces
            const partKeys = Object.keys(source);
            for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) { // then through each part in the source
                const partKey = partKeys[partIndex];
                const part = source[partKey];
                let partStyle = {};

                if (part !== null && typeof(part) !== 'undefined') {
                    const ruleKeys = Object.keys(part);
                    for (let ruleIndex = 0, ruleLen = ruleKeys.length; ruleIndex < ruleLen; ruleIndex++) { // then through each property in the part
                        const ruleKey = ruleKeys[ruleIndex];
                        const computedRuleKey = window.Styler.parseVariableValue(ruleKey, obj, scene, ''); // resolve variables in the property key
                        let computedVar = part[ruleKey];

                        if (typeof(computedVar) === 'object') { // merge style objects
                            const computedKeys = Object.keys(computedVar);

                            for (let varIndex = 0, varLen = computedKeys.length; varIndex < varLen; varIndex++) { // then through each property in the rule
                                const computedKey = computedKeys[varIndex];
                                const resultVar = window.Styler.parseVariableValue(computedVar[computedKey], obj, scene, computedRuleKey); // resolve variables in the property

                                if (typeof(resultVar) === 'string') {
                                    if (resultVar.indexOf('!unset') === -1) {
                                        computedVar[computedKey] = resultVar; // styling applies
                                    } else {
                                        if (computedKey === 'all') {
                                            computedVar = {}; // unset all styling
                                        } else {
                                            delete computedVar[computedKey]; // able to unset styling for a specific key
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
                        } else { // merge normal styliing
                            const resultVar = window.Styler.parseVariableValue(computedVar, obj, scene, computedRuleKey);
                            if (typeof(resultVar) === 'string') {
                                if (typeof(partStyle[ruleKey]) === 'string' && partStyle[ruleKey].indexOf('!important') > -1) {
                                    if (resultVar.indexOf('!important') === -1) {
                                        Logger.warn(`You have overridden the styling '${ruleKey}: ${partStyle[ruleKey]}' with '${ruleKey}: ${resultVar}' in ${componentName}-${partKey} which could cause significant styling errors.  This must be changed to '${ruleKey}: ${resultVar}!' to indicate you are sure you want to override this value.`);
                                    }
                                }
                            }

                            if (typeof(resultVar) === 'string') {
                                if (resultVar.indexOf('!unset') === -1) {
                                    partStyle[computedRuleKey] = resultVar; // add styling
                                } else {
                                    if (computedRuleKey === 'all') {
                                        partStyle = {}; // unset all styling
                                    } else {
                                        delete computedVar[computedRuleKey]; // unset specific key
                                    }
                                }
                            } else {
                                partStyle[computedRuleKey] = resultVar;
                            }
                        }
                    }
                }

                if (classRet > 0) {
                    style[partKey] = `${componentName}__${partKey}__${styleKeyBase}`;

                    if (typeof(style.style[partKey]) === 'undefined') {
                        style.style[partKey] = partStyle;
                    } else {
                        style.style[partKey] = Object.assign(style.style[partKey], partStyle);
                    }
                } else {
                    if (typeof(style[partKey]) === 'undefined') {
                        style[partKey] = partStyle;
                    } else {
                        style[partKey] = Object.assign(style[partKey], partStyle);
                    }
                }
            }
        }

        // remove any ! for important styling
        const keys = (classRet > 0) ? Object.keys(style.style) : Object.keys(style);
        for (let i = 0, len = keys.length; i < len; i++) {
            const key = keys[i];
            if (classRet > 0) {
                if (typeof(style.style[key]) === 'string') {
                    style.style[key] = style.style[key].replace('!', '');
                }
            } else {
                if (typeof(style[key]) === 'string') {
                    style[key] = style[key].replace('!', '');
                }
            }
        }

        return style;
    },

    // make an object with information about component being styled
    makeInstanceObj(instance, localStyler = null) {
        const propsStyler = (typeof(instance) !== 'undefined' && typeof(instance.props) !== 'undefined' && typeof(instance.props.styler) !== 'undefined') ? instance.props.styler : null;
        const emptyPropsStyler = propsStyler === null;
        const emptyLocalStyler = localStyler === null;
        let styler = {};
        if (emptyPropsStyler && emptyLocalStyler) {
            styler = {};
        } else if (emptyPropsStyler) {
            styler = localStyler;
        } else if (emptyLocalStyler) {
            styler = propsStyler;
        } else {
            styler = Object.assign({}, propsStyler, localStyler);
        }
        const componentName = styler.styleLike || instance.constructor.displayName; // name of the component
        const scene = styler.scene || 'normal';
        const obj = {
            context: instance.context || {},
            state: instance.state || {},
            props: instance.props || {},
            styler,
            componentName,
            scene,
            themesheet: instance.themesheet,
            stylesheet: instance.stylesheet,
        };

        return obj;
    },

    getStyleFromCache(obj, sources, dynamicOnly) {
        const componentName = obj.componentName;

        if (typeof(this.cache[componentName]) === 'undefined') this.cache[componentName] = [];
        for (let i = 0, len = this.cache[componentName].length; i < len; i++) {
            const cacheVal = this.cache[componentName][i];
            if (dynamicOnly) {
                if (this.checkCacheEquality(sources.dynamicConditions, cacheVal.sources.dynamicConditions)) {
                    const partKeys = Object.keys(cacheVal.style.parts);
                    const result = {};
                    for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
                        const partKey = partKeys[partIndex];
                        result[partKey] = this.makeClassString(obj, partKey, sources.activeConditions, cacheVal.style.unique);
                    }

                    return result; // return new class string with the active conditions
                }
            } else {
                if (this.checkCacheEquality(sources, cacheVal.sources)) {
                    return cacheVal.style;
                }
            }
        }

        return false;
    },

    // will create Peapod's stylesheet if it doesn't exist
    checkCreateStylesheet() {
        if (window.Styler.styleRootEle === null) {
            const sheet = document.createElement('style');
            const sheetInline = document.createElement('style');

            sheet.id = 'Peapod_Style';
            sheetInline.id = 'Peapod_Style_Inline';

            window.Styler.styleRootEle = sheet;
            window.Styler.styleInlineEle = sheetInline;

            document.head.appendChild(sheet);
            document.head.appendChild(sheetInline);
        }
    },

    createCachedStyle(obj, sources, style) {
        const componentName = obj.componentName;

        if (typeof(window.Styler.cache[componentName]) === 'undefined') window.Styler.cache[componentName] = [];

        const cacheLen = window.Styler.cache[componentName].length;

        if (cacheLen > window.Styler.maxCacheLength) window.Styler.cache[componentName].shift(); // prune more than 20 elements to conserve memory
        window.Styler.cache[componentName].push({ obj, sources, style });

        const selectors = style.selectors;

        this.checkCreateStylesheet();

        for (let selectorIndex = 0, selectorLen = selectors.length; selectorIndex < selectorLen; selectorIndex++) {
            const selector = selectors[selectorIndex];

            this.addToStylesheetRaw(selector.key, selector.style, window.Styler.styleRootEle, style.unique);
        }

        return true;
    },

    stringifySelector(selector) {
        const selectorKeys = Object.keys(selector);
        let ret = '';
        for (let selectorIndex = 0, selectorLen = selectorKeys.length; selectorIndex < selectorLen; selectorIndex++) {
            const key = selectorKeys[selectorIndex];
            const value = selector[key];

            if (typeof(value) === 'number' && key !== 'opacity' && key !== 'z-index' && key !== 'font-weight') {
                ret += `${key}: ${value}px; `;
            } else {
                ret += `${key}: ${value}; `;
            }
        }

        return ret;
    },

    makeInlineClass(selector, unique = '&') {
        return selector.split(unique).join(`${unique}--inline`);
    },

    makeInlineSelector(selector) {
        return this.rootEle + ' ' + this.makeInlineClass(selector);
    },

    makeUniqueSelector(selector, unique) {
        return selector.split('&').join(unique);
    },

    addToStylesheetRaw(selector, style, sheetEle, unique) {
        const styleString = (typeof(style) === 'string') ? style : this.stringifySelector(style, unique);
        const processedSelector = this.makeUniqueSelector(selector, unique);

        let sheetString = '';
        if (selector.indexOf('@media') === -1) {
            const processedInlineSelector = this.makeUniqueSelector(this.makeInlineSelector(selector), unique);
            sheetString = `${processedSelector}, ${processedInlineSelector} {${styleString}}\n`;
        } else {
            const splitMedia = processedSelector.split('|||');
            const splitMediaInline = selector.split('|||');
            const processedSelectorMedia = this.makeUniqueSelector(this.makeInlineSelector(splitMedia[1]), unique);
            const processedSelectorMediaInline = this.makeUniqueSelector(this.makeInlineSelector(splitMediaInline[1]), unique);

            sheetString = `${splitMedia[0]} {${splitMedia[1]}, ${processedSelectorMedia}, ${processedSelectorMediaInline} {${styleString}}}\n`;
        }

        const debugEnabled = (process.env.podDebug) ? process.env.podDebug : false;

        if (debugEnabled) { // DEBUG OUTPUT
            sheetEle.innerHTML += sheetString;
        } else {
            sheetEle.sheet.insertRule(sheetString, sheetEle.sheet.cssRules.length);
        }
    },

    checkCacheEquality(sources, cacheVal) {
        return _isEqual(sources, cacheVal);
    },

    // gets object of styling for parts of a component
    getStyle(instance, localStyler = {}) {
        const obj = window.Styler.makeInstanceObj(instance, localStyler);

        console.warn(`Using legacy styling in ${obj.componentName}.  This will be removed in the future.`);

        const sourcesAndConditions = window.Styler.buildSources(obj); // build sources from libraries for component

        if (window.Styler.enableCache) { // use value from cache
            const cacheVal = this.getStyleFromCache(obj, sourcesAndConditions.combinedConditions);
            if (cacheVal !== false) {
                return cacheVal;
            }
        }

        const style = window.Styler.processSources(obj, sourcesAndConditions); // built style from sources

        return style;
    },

    // gets object of styling for parts of a component
    getClasses(instance, localStyler = {}) {
        const obj = window.Styler.makeInstanceObj(instance, localStyler);

        const sourcesAndConditions = window.Styler.buildSources(obj, true); // build sources from libraries for component

        if (window.Styler.enableCache) { // use value from cache
            const cacheVal = this.getStyleFromCache(obj, sourcesAndConditions, true);
            if (cacheVal !== false) {
                return cacheVal;
            }
        }

        const style = window.Styler.processSources(obj, sourcesAndConditions, 2); // built style from sources

        if (window.Styler.enableCache) { // save to cache
            this.createCachedStyle(obj, sourcesAndConditions, style);
        }

        return style.parts;
    },

    // will resolve a string to it's actual computed value
    parseVariableValue(computedVar, obj, scene, rule) {
        if (typeof(computedVar) === 'function') {
            computedVar = computedVar(obj, scene);
        }

        if (typeof(computedVar) === 'object') {
            for (let computedIndex = computedVar.length - 1; computedIndex >= 0; computedIndex--) { // go through in reverse order to find most specific
                if (computedVar[computedIndex].vars === scene || computedVar[computedIndex].vars === 'common') {
                    computedVar = computedVar[computedIndex].val;
                    break;
                }
            }
        }

        if (typeof(computedVar) === 'string') {
            computedVar = window.Styler.processVariableString(computedVar, obj, scene);
        }
        return computedVar;
    },

    // will resolve $variable syntax into actual values
    processVariableString(computedVar, obj, scene) {
        if (computedVar.indexOf('$') > -1) { // variable present
            const computedKey = computedVar;
            if (!this.enableVarCache || typeof(this.varCache[`${computedVar}_${scene}`]) === 'undefined') {
                if (computedVar.indexOf('{') > -1 && computedVar.indexOf('}') > -1) { // RegEx based Pod_Vars.get
                    const regEx = /\{\$\S*\}/g;
                    const matches = computedVar.match(regEx);

                    for (let i = 0, len = matches.length; i < len; i++) {
                        const match = matches[i];
                        computedVar = computedVar.replace(match, window.Pod_Vars.get(match.replace('{$', '').replace('}', ''), scene)); // resolve multiple variables
                    }
                } else { // simple Pod_Vars.get on whole value
                    computedVar = window.Pod_Vars.get(computedVar.replace('$', ''), scene); // resolve single variable
                }
                if (this.enableVarCache) {
                    this.varCache[`${computedKey}_${scene}`] = computedVar;
                }
            } else {
                computedVar = this.varCache[`${computedKey}_${scene}`]; // get variable from cache rather than parse string
            }
        }

        return computedVar;
    },

};

module.exports = window.Styler;
