/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import { merge as _merge, isEqual as _isEqual } from 'lodash';
import { Style } from './stylesheet.js';

window.Pod_Styler = window.Pod_Styler || {
    libraries: [],
    currentLibrary: 'peapod',
    enableCache: false,
    enableVarCache: false,
    cache: {},
    varCache: {},
    maxCacheLength: 20,

    removeLibrary(libraryName) {
        for (let i = 0, len = window.Pod_Styler.libraries.length; i < len; i++) {
            const library = window.Pod_Styler.libraries[i];
            if (library.name === libraryName) {
                console.log(`Removing Library: ${libraryName}`); // eslint-disable-line no-console
                window.Pod_Styler.libraries.splice(i, 1);
                len = len - 1;
                i = i - 1;
            }
        }
    },

    // registers a library
    addLibrary(parentName, libraryName, componentFiles, requireFunc, globalVars) {
        window.Pod_Styler.varCache = {}; // clear variable cache
        window.Pod_Styler.removeLibrary(libraryName); // remove and previous styling from library
        console.log(`Adding Library ${libraryName}`); // eslint-disable-line no-console

        window.Pod_Vars.register(globalVars); // add global variables to variable resolution

        const components = {};
        const componentKeys = Object.keys(componentFiles);
        for (let i = 0, len = componentKeys.length; i < len; i++) {
            const componentName = componentKeys[i];
            const stylesheet = requireFunc(componentFiles[componentName].fileName);
            if (typeof(stylesheet) === 'function') {
                const sheetStyle = stylesheet(componentName);
                if (typeof(sheetStyle) === 'undefined') {
                    throw new Error(`No Styling found for ${componentName}.  Does ${componentFiles[componentName].fileName} return 'sheet'?`);
                } else {
                    components[componentFiles[componentName].componentName] = sheetStyle; // get the stylesheet for any components in the current library
                }
            }
        }

        const library = {
            parentName,
            componentFiles,
            components,
            name: libraryName,
            type: 'normal',
            globalVars,
        };

        window.Pod_Styler.libraries.push(library);
    },

    // changes the library in use, must be done after adding a child theme.
    setLibrary(name) {
        window.Pod_Styler.currentLibrary = name;
    },

    // gets the stack of libraries
    getLibrary(name) {
        for (let i = 0, len = window.Pod_Styler.libraries.length; i < len; i++) {
            const library = window.Pod_Styler.libraries[i];
            if (library.name === name) return library;
        }

        throw new Error(`Could not find library named: ${name}`);
    },

    // creates an ordered array of libraries currently applied
    getLibraryStack() {
        let currentName = window.Pod_Styler.currentLibrary;
        const stack = [];
        let depth = 0;

        while (currentName !== 'root' && depth <= 30) {
            const library = window.Pod_Styler.getLibrary(currentName);
            stack.unshift(library); // prepend
            currentName = library.parentName;
            depth = depth + 1;
        }

        // apply local styling at the bottom of the stack
        stack.push({
            type: 'local',
            components: {},
            name: '_local',
        });
        // apply pre local styling to very beginning of stack
        stack.unshift({
            type: 'local',
            components: {},
            name: '_preLocal',
        });

        if (depth >= 30) throw new Error('Maximum Library stack size reached.');

        return stack;
    },

    // collapses each active library into an array of parts and conditions specific to the component
    buildSources(obj) {
        const sources = [];
        const libraries = window.Pod_Styler.getLibraryStack(); // currently applying libraries
        const conditions = {}; // all conditions available to component
        const parts = {}; // all parts available to component
        const componentName = obj.componentName;
        const scene = obj.scene; // scene applying to object

        // get information from libraries about current component
        for (let i = 0, len = libraries.length; i < len; i++) {
            const library = libraries[i];
            const component = library.components[componentName];

            if (typeof(component) !== 'undefined') {
                const condition = component.getConditions();
                const conditionKeys = Object.keys(condition);
                const part = component.getParts();
                const partKeys = Object.keys(part);

                // get all conditions for the component overwriting any defined in parents with those defined in children
                for (let conditionIndex = 0, conditionLen = conditionKeys.length; conditionIndex < conditionLen; conditionIndex++) {
                    const key = conditionKeys[conditionIndex];
                    conditions[key] = condition[key];
                }

                // get all parts for the component overwriting any defined in parents with those defined in children
                for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
                    const key = partKeys[partIndex];
                    parts[key] = key;
                }
            }
        }

        // collapse styling from each active library
        for (let i = 0, len = libraries.length; i < len; i++) {
            const library = libraries[i];
            let source = null;
            if (library.type === 'local') { // special libraries to add local inline styling
                const localStyle = {};
                const partKeys = Object.keys(parts);
                const suffix = (library.name === '_preLocal') ? 'Pre' : '';

                // get local styling for any parts
                for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
                    const part = partKeys[partIndex];

                    if (part === 'main' && typeof(obj.styler.mainStyle) === 'undefined' && suffix === '') {
                        if (typeof(obj.styler.style) !== 'undefined') { // special case for `styler.style` applying to main
                            localStyle[part] = new Style(obj.styler.style).getStyle(); // process styling for media queries, shorthand, etc.
                        }
                    } else {
                        if (typeof(obj.styler[`${part}Style${suffix}`]) !== 'undefined') { // any other inline styling that isn't `styler.style`
                            localStyle[part] = new Style(obj.styler[`${part}Style${suffix}`]).getStyle(); // process styling for media queries, shorthand, etc.
                        }
                    }
                }

                if (Object.keys(localStyle).length > 0) source = localStyle; // if a localStyle was applied, then make it the source
            } else { // styling from style.js
                const sourceSheet = library.components[componentName];
                if (sourceSheet !== null && typeof(sourceSheet) !== 'undefined') {
                    source = sourceSheet.getAllStyling(obj, scene, conditions); // pass in collapsed conditions, allows conditions to be overwritten in child themes.  All styling returned will have it's conditions true
                }
            }

            if (typeof(source) !== 'undefined' && source !== null) {
                sources.push(source); // add styling from source if any was found in the library
            }
        }

        return sources;
    },

    // make inline css from sources array
    processSources(obj, sources) {
        const style = {};
        const scene = obj.scene;
        const componentName = obj.displayName;

        // go through each source's styling
        for (let sourceIndex = 0, sourceLen = sources.length; sourceIndex < sourceLen; sourceIndex++) {
            const source = sources[sourceIndex];
            const partKeys = Object.keys(source);
            for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) { // then through each part in the source
                const partKey = partKeys[partIndex];
                const part = source[partKey];
                let partStyle = {};

                if (part !== null && typeof(part) !== 'undefined') {
                    const ruleKeys = Object.keys(part);
                    for (let ruleIndex = 0, ruleLen = ruleKeys.length; ruleIndex < ruleLen; ruleIndex++) { // then through each property in the part
                        const ruleKey = ruleKeys[ruleIndex];
                        const computedRuleKey = window.Pod_Styler.parseVariableValue(ruleKey, obj, scene); // resolve variables in the property key
                        let computedVar = part[ruleKey];

                        if (typeof(computedVar) === 'object') { // merge style objects
                            const computedKeys = Object.keys(computedVar);

                            for (let varIndex = 0, varLen = computedKeys.length; varIndex < varLen; varIndex++) { // then through each property in the rule
                                const computedKey = computedKeys[varIndex];
                                const resultVar = window.Pod_Styler.parseVariableValue(computedVar[computedKey], obj, scene); // resolve variables in the property

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
                            const resultVar = window.Pod_Styler.parseVariableValue(computedVar, obj, scene);
                            if (typeof(resultVar) === 'string') {
                                if (typeof(partStyle[ruleKey]) === 'string' && partStyle[ruleKey].indexOf('!important') > -1) {
                                    if (resultVar.indexOf('!important') === -1) {
                                        console.warn(`You have overridden the styling '${ruleKey}: ${partStyle[ruleKey]}' with '${ruleKey}: ${resultVar}' in ${componentName}-${partKey} which could cause significant styling errors.  This must be changed to '${ruleKey}: ${resultVar}!' to indicate you are sure you want to override this value.`); // eslint-disable-line no-console
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

                if (typeof(style[partKey]) === 'undefined') {
                    style[partKey] = partStyle;
                } else {
                    style[partKey] = Object.assign(style[partKey], partStyle);
                }
            }
        }

        // remove any ! for important styling
        const keys = Object.keys(style);
        for (let i = 0, len = Object.keys(style).length; i < len; i++) {
            const key = keys[i];
            if (typeof(style[key]) === 'string') {
                style[key] = style[key].replace('!', '');
            }
        }

        return style;
    },

    // make an object with information about component being styled
    makeInstanceObj(instance, localStyler) {
        const propsStyler = (typeof(instance) !== 'undefined' && typeof(instance.props) !== 'undefined' && typeof(instance.props.styler) !== 'undefined') ? instance.props.styler : {};
        const styler = _merge(propsStyler, localStyler) || {};
        const componentName = styler.styleLike || instance.constructor.displayName; // name of the component
        const scene = styler.scene || 'normal';
        const obj = {
            context: instance.context || {},
            state: instance.state || {},
            props: instance.props || {},
            styler,
            componentName,
            scene,
        };

        return obj;
    },

    getStyleFromCache(obj, componentName) {
        if (typeof(this.cache[componentName]) === 'undefined') this.cache[componentName] = [];
        for (let i = 0, len = this.cache[componentName].length; i < len; i++) {
            const cacheVal = this.cache[componentName][i];
            if (this.checkCacheEquality(obj, cacheVal)) {
                return cacheVal.style;
            }
        }
        return false;
    },

    addStyleToCache(obj, style) {
        const componentName = obj.componentName;

        if (typeof(window.Pod_Styler.cache[componentName]) === 'undefined') window.Pod_Styler.cache[componentName] = [];

        const len = window.Pod_Styler.cache[componentName].length;
        for (let i = 0; i < len; i++) {
            const cacheVal = window.Pod_Styler.cache[componentName][i];
            if (window.Pod_Styler.checkCacheEquality(obj, cacheVal)) return false;
        }
        if (len > window.Pod_Styler.maxCacheLength) window.Pod_Styler.cache[componentName].shift(); // prune more than 20 elements to conserve memory
        window.Pod_Styler.cache[componentName].push({ obj, style });

        return true;
    },

    checkCacheEquality(obj, cacheVal) {
        const stylerEqual = _isEqual(obj.styler, cacheVal.styler);
        const stateEqual = _isEqual(obj.state, cacheVal.state);
        const propsEqual = _isEqual(obj.props, cacheVal.props);
        const contextEqual = _isEqual(obj.context, cacheVal.context);
        let radiumEqual = false;

        if ((typeof(obj.state) === 'undefined') && (typeof(cacheVal.state) === 'undefined')) {
            radiumEqual = true;
        } else if ((obj.state == null) && (cacheVal.state == null)) {
            radiumEqual = true;
        } else if ((typeof(obj.state) === 'undefined' || obj.state == null) || (typeof(cacheVal.state) === 'undefined' || cacheVal.state == null)) {
            radiumEqual = false;
        } else {
            radiumEqual = (obj.state._radiumStyleState === cacheVal.state._radiumStyleState);
        }

        return stylerEqual && stateEqual && propsEqual && contextEqual && radiumEqual;
    },

    // gets object of styling for parts of a component
    getStyle(instance, localStyler = {}) {
        const obj = window.Pod_Styler.makeInstanceObj(instance, localStyler);

        if (window.Pod_Styler.enableCache) { // use value from cache
            const cacheVal = this.getStyleFromCache(obj, obj.componentName || '_');
            if (cacheVal !== false) {
                return cacheVal;
            }
        }

        const sources = window.Pod_Styler.buildSources(obj); // build sources from libraries for component
        const style = window.Pod_Styler.processSources(obj, sources); // built style from sources

        if (window.Pod_Styler.enableCache) { // save to cache
            this.addStyleToCache(obj, style);
        }

        return style;
    },

    // will resolve a string to it's actual computed value
    parseVariableValue(computedVar, obj, scene) {
        if (typeof(computedVar) === 'object') {
            for (let computedIndex = computedVar.length - 1; computedIndex >= 0; computedIndex--) { // go through in reverse order to find most specific
                if (computedVar[computedIndex].vars === scene || computedVar[computedIndex].vars === 'common') {
                    computedVar = computedVar[computedIndex].val;
                    break;
                }
            }
        }

        if (typeof(computedVar) === 'string') {
            computedVar = window.Pod_Styler.processVariableString(computedVar, obj, scene);
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
        } else if (computedVar.indexOf('getProp:') > -1) {
            computedVar = obj.props[computedVar.replace('getProp:', '')]; // get property from instance
        } else if (computedVar.indexOf('getState:') > -1) {
            computedVar = obj.state[computedVar.replace('getState:', '')]; // get state from instance
        } else if (computedVar.indexOf('getStyler:') > -1) {
            computedVar = obj.styler[computedVar.replace('getStyler:', '')]; // get styler from instance
        } else if (computedVar.indexOf('getContext:') > -1) {
            computedVar = obj.context[computedVar.replace('getContext:', '')]; // get context from instance
        }
        return computedVar;
    },

};

module.exports = window.Pod_Styler;
