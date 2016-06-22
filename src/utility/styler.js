/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import { merge as _merge, isEqual as _isEqual } from 'lodash';
import { Style, Sheet } from './stylesheet.js';
import Logger from './logger.js';

window.Pod_Styler = window.Pod_Styler || {
    libraries: [],
    currentLibrary: 'peapod',
    enableCache: true,
    enableVarCache: true,
    cache: {},
    varCache: {},
    maxCacheLength: 50,
    stack: null,

    removeLibrary(libraryName) {
        window.Pod_Styler.stack = null; // force recalculation of library stack;
        for (let i = 0, len = window.Pod_Styler.libraries.length; i < len; i++) {
            const library = window.Pod_Styler.libraries[i];
            if (library.name === libraryName) {
                Logger.log(`Removing Library: ${libraryName}`);
                window.Pod_Styler.libraries.splice(i, 1);
                len = len - 1;
                i = i - 1;
            }
        }
    },

    // registers a library
    addLibrary(parentName, libraryName, componentFiles, requireFunc, globalSheet) {
        window.Pod_Styler.stack = null; // force recalculation of library stack;
        window.Pod_Styler.varCache = {}; // clear variable cache
        window.Pod_Styler.removeLibrary(libraryName); // remove and previous styling from library
        Logger.log(`Adding Library ${libraryName}`);

        const globalVars = globalSheet.getValues();
        const globalConditions = globalSheet.getConditions();

        window.Pod_Vars.register(globalVars); // add global variables to variable resolution

        const components = {};
        const componentKeys = Object.keys(componentFiles);
        for (let i = 0, len = componentKeys.length; i < len; i++) {
            const componentName = componentKeys[i];
            const stylesheet = requireFunc(componentFiles[componentName].fileName);
            if (typeof(stylesheet) === 'function') {
                const sheetStyle = stylesheet(new Sheet(componentName));

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
            globalConditions,
        };

        window.Pod_Styler.libraries.push(library);
    },

    // changes the library in use, must be done after adding a child theme.
    setLibrary(name) {
        window.Pod_Styler.stack = null; // force recalculation of library stack;
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
        if (window.Pod_Styler.stack !== null) {
            return window.Pod_Styler.stack; // don't need to recalculate the stack;
        }

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

        window.Pod_Styler.stack = stack;

        return stack;
    },

    // collapses each active library into an array of parts and conditions specific to the component
    buildSources(obj) {
        const sources = [];
        const libraries = window.Pod_Styler.getLibraryStack(); // currently applying libraries
        let conditions = {}; // all conditions available to component
        const activeConditions = [];
        const parts = {}; // all parts available to component
        const componentName = obj.componentName;
        const scene = obj.scene; // scene applying to object

        // get information from libraries about current component
        for (let libraryIndex = 0, libraryLen = libraries.length; libraryIndex < libraryLen; libraryIndex++) {
            const library = libraries[libraryIndex];
            const globalConditions = library.globalConditions;
            const component = library.components[componentName];

            if (typeof(globalConditions) !== 'undefined') {
                if (conditions === {}) {
                    conditions = globalConditions;
                } else {
                    conditions = Object.assign({}, conditions, globalConditions); // merge in global conditions
                }
            }

            if (typeof(component) !== 'undefined') {
                const componentConditions = component.getConditions();
                const part = component.getParts();
                const partKeys = Object.keys(part);

                // get all conditions for the component overwriting any defined in parents with those defined in children
                if (conditions === {}) {
                    conditions = componentConditions;
                } else {
                    conditions = Object.assign({}, conditions, componentConditions);
                }

                // get all parts for the component overwriting any defined in parents with those defined in children
                for (let partIndex = 0, partLen = partKeys.length; partIndex < partLen; partIndex++) {
                    const key = partKeys[partIndex];
                    parts[key] = key;
                }
            }
        }

        // resolve global variables from each library
        let globalVars = window.Pod_Vars.sources[0].common;
        if (typeof(window.Pod_Vars.sources[0][scene]) !== 'undefined') {
            globalVars = Object.assign({}, globalVars, window.Pod_Vars.sources[0][scene]);
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

                if (Object.keys(localStyle).length > 0) {
                    source = localStyle; // if a localStyle was applied, then make it the source
                    activeConditions.push(JSON.stringify(localStyle)); // TODO more efficient way of creating unique condition
                }
            } else { // styling from style.js
                const sourceSheet = library.components[componentName];
                if (sourceSheet !== null && typeof(sourceSheet) !== 'undefined') {
                    let sheetVals = {};
                    if (typeof(sourceSheet.resolveValues) === 'function' && !sourceSheet.variablesResolved) {
                        sheetVals = sourceSheet.resolveValues(globalVars);
                        sourceSheet.variablesResolved = true;
                    }

                    if (typeof(sourceSheet.resolveSceneValues) === 'function' && !sourceSheet.scenesResolved) {
                        const sceneVals = sourceSheet.resolveSceneValues(sheetVals, globalVars);
                        if (typeof(sceneVals[scene]) !== 'undefined') {
                            if (sheetVals === {}) {
                                sheetVals = sceneVals;
                            } else {
                                sheetVals = Object.assign({}, sheetVals, sceneVals);
                            }
                        }
                        sourceSheet.scenesResolved = true;
                    }

                    sourceSheet.setValues(sheetVals, 'common'); // TODO fix this Kyler

                    const localVars = window.Pod_Vars.sources[0].common[sourceSheet.name]; // TODO multiple scenes

                    const sheetData = sourceSheet.getAllStyling(obj, scene, conditions, localVars, globalVars); // pass in collapsed conditions, allows conditions to be overwritten in child themes.  All styling returned will have it's conditions true
                    source = sheetData.source;

                    for (let conditionIndex = 0, conditionLen = sheetData.activeConditions.length; conditionIndex < conditionLen; conditionIndex++) {
                        activeConditions.push(sheetData.activeConditions[conditionIndex]);
                    }
                }
            }

            if (typeof(source) !== 'undefined' && source !== null) {
                sources.push(source); // add styling from source if any was found in the library
            }
        }

        return { sources, activeConditions };
    },

    // make inline css from sources array
    processSources(obj, sources) {
        const style = {};
        const scene = obj.scene;
        const componentName = obj.displayName;

        // go through each source's styling
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
                        const computedRuleKey = window.Pod_Styler.parseVariableValue(ruleKey, obj, scene, ''); // resolve variables in the property key
                        let computedVar = part[ruleKey];

                        if (typeof(computedVar) === 'object') { // merge style objects
                            const computedKeys = Object.keys(computedVar);

                            for (let varIndex = 0, varLen = computedKeys.length; varIndex < varLen; varIndex++) { // then through each property in the rule
                                const computedKey = computedKeys[varIndex];
                                const resultVar = window.Pod_Styler.parseVariableValue(computedVar[computedKey], obj, scene, computedRuleKey); // resolve variables in the property

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
                            const resultVar = window.Pod_Styler.parseVariableValue(computedVar, obj, scene, computedRuleKey);
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

                if (typeof(style[partKey]) === 'undefined') {
                    style[partKey] = partStyle;
                } else {
                    style[partKey] = Object.assign(style[partKey], partStyle);
                }

                style[partKey] = this.transform(style[partKey]);
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
            styler = _merge(propsStyler, localStyler);
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
        };

        return obj;
    },

    getStyleFromCache(obj, sources) {
        const componentName = obj.componentName;

        if (typeof(this.cache[componentName]) === 'undefined') this.cache[componentName] = [];
        for (let i = 0, len = this.cache[componentName].length; i < len; i++) {
            const cacheVal = this.cache[componentName][i];
            if (this.checkCacheEquality(sources, cacheVal)) {
                return cacheVal.style;
            }
        }

        return false;
    },

    addStyleToCache(obj, sources, style) {
        const componentName = obj.componentName;

        if (typeof(window.Pod_Styler.cache[componentName]) === 'undefined') window.Pod_Styler.cache[componentName] = [];

        const len = window.Pod_Styler.cache[componentName].length;

        if (len > window.Pod_Styler.maxCacheLength) window.Pod_Styler.cache[componentName].shift(); // prune more than 20 elements to conserve memory
        window.Pod_Styler.cache[componentName].push({ obj, sources, style });

        return true;
    },

    checkCacheEquality(sources, cacheVal) {
        return _isEqual(sources, cacheVal.sources);
    },

    // gets object of styling for parts of a component
    getStyle(instance, localStyler = {}) {
        const obj = window.Pod_Styler.makeInstanceObj(instance, localStyler);

        const sourcesAndConditions = window.Pod_Styler.buildSources(obj); // build sources from libraries for component

        if (window.Pod_Styler.enableCache) { // use value from cache
            const cacheVal = this.getStyleFromCache(obj, sourcesAndConditions.activeConditions);
            if (cacheVal !== false) {
                return cacheVal;
            }
        }

        const style = window.Pod_Styler.processSources(obj, sourcesAndConditions.sources); // built style from sources

        style.classes = {};
        style.classes.main = "test1"; // TODO not hardcode this
        style.classes.rippleContainer = "test2";

        if (window.Pod_Styler.enableCache) { // save to cache
            this.addStyleToCache(obj, sourcesAndConditions.activeConditions, style);
        }

        return style;
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

    // transforms 0 to be 0px
    addUnit(val) {
        if (val === 0 || val === '0') {
            return '0px';
        }
        return val;
    },

    transformKeys(styles, key, splitStyle, keyAppend) {
        for (let i = 0, len = keyAppend.length; i < len; i++) {
            let appendKey = keyAppend[i];
            if (typeof(appendKey) === 'object') {
                appendKey = appendKey[0];
            } else {
                appendKey = key + appendKey;
            }
            styles[appendKey] = splitStyle[i];
        }
        delete styles[key];
        return styles;
    },

    // spreads an array of attributes out to be 4 (used for Top, Right, Bottom, Left)
    spreadToFour(splitStyle) {
        const splitStyleLen = splitStyle.length;

        if (splitStyleLen === 1) {
            splitStyle.push(splitStyle[0]);
            splitStyle.push(splitStyle[0]);
            splitStyle.push(splitStyle[0]);
        } else if (splitStyleLen === 2) {
            splitStyle.push(splitStyle[0]);
            splitStyle.push(splitStyle[1]);
        } else if (splitStyleLen === 3) {
            splitStyle.push(splitStyle[1]);
        }
        return splitStyle;
    },

    // splits style based on regular expression passed in
    splitStyle(style, expression = / +/) {
        const splitStyle = style.trim().split(expression);
        const splitStyleLen = splitStyle.length;

        for (let splitIndex = 0; splitIndex < splitStyleLen; splitIndex++) {
            splitStyle[splitIndex] = this.addUnit(splitStyle[splitIndex]);
        }

        return splitStyle;
    },

    // transforms shorthand to longhand
    transform(styles, depth = 0) {
        let newStyles = styles;

        if (typeof(styles) === 'object' && styles !== undefined && styles !== null) {
            const keys = Object.keys(styles);
            for (let keyIndex = 0, keyLen = keys.length; keyIndex < keyLen; keyIndex++) {
                const key = keys[keyIndex];
                const style = newStyles[key];
                const styleType = typeof(style);

                if (styleType === 'string') {
                    if (['padding', 'margin'].indexOf(key) > -1) {
                        let splitStyle = this.splitStyle(newStyles[key]);
                        splitStyle = this.spreadToFour(splitStyle);

                        newStyles = this.transformKeys(newStyles, key, splitStyle, ['Top', 'Right', 'Bottom', 'Left']);
                    } else if (['borderWidth', 'borderColor', 'borderStyle'].indexOf(key) > -1) {
                        let splitStyle = this.splitStyle(newStyles[key]);
                        splitStyle = this.spreadToFour(splitStyle);
                        if (key === 'borderWidth') {
                            newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopWidth'], ['borderRightWidth'], ['borderBottomWidth'], ['borderLeftWidth']]);
                        } else if (key === 'borderColor') {
                            newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopColor'], ['borderRightColor'], ['borderBottomColor'], ['borderLeftColor']]);
                        } else if (key === 'borderStyle') {
                            newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopStyle'], ['borderRightStyle'], ['borderBottomStyle'], ['borderLeftStyle']]);
                        }
                    } else if (['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'].indexOf(key) > -1) {
                        const splitStyle = this.splitStyle(newStyles[key]);
                        const splitStyleLen = splitStyle.length;

                        if (splitStyleLen === 1) {
                            splitStyle.unshift(window.Pod_Vars.get('border.width'));
                            splitStyle.push(window.Pod_Vars.get('border.color'));
                        } else if (splitStyleLen === 2) {
                            splitStyle.push(window.Pod_Vars.get('border.color'));
                        }

                        newStyles = this.transformKeys(newStyles, key, splitStyle, ['Width', 'Style', 'Color']);
                    } else if (key === 'borderRadius') {
                        let splitStyle = this.splitStyle(newStyles[key]);
                        splitStyle = this.spreadToFour(splitStyle);

                        newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopLeftRadius'], ['borderTopRightRadius'], ['borderBottomRightRadius'], ['borderBottomLeftRadius']]);
                    } else if (key === 'font') {
                        const splitStyle = this.splitStyle(newStyles[key]);

                        newStyles = this.transformKeys(newStyles, key, splitStyle, ['Style', 'Weight', 'Size', ['lineHeight'], 'Family']);
                    } else if (key === 'background') {
                        const splitStyle = this.splitStyle(newStyles[key]);
                        const splitStyleLen = splitStyle.length;

                        if (splitStyleLen === 1) {
                            newStyles.backgroundColor = splitStyle[0];
                            delete newStyles.background;
                        } else {
                            newStyles = this.transformKeys(newStyles, key, splitStyle, ['Color', 'Image', 'Repeat', 'Attachment', 'Position']);
                        }
                    } else if (key === 'flex') {
                        const splitStyle = this.splitStyle(newStyles[key]);

                        newStyles = this.transformKeys(newStyles, key, splitStyle, ['Grow', 'Shrink', 'Basis']);
                    } else if (key === 'transition') {
                        const commaSplit = this.splitStyle(newStyles[key], /,/);
                        const commaSplitLen = commaSplit.length;
                        const transitionProperty = [];
                        const transitionDuration = [];
                        const transitionTiming = [];
                        const transitionDelay = [];

                        for (let commaIndex = 0; commaIndex < commaSplitLen; commaIndex++) {
                            const transitionSplit = this.splitStyle(commaSplit[commaIndex]);
                            const transitionSplitLen = transitionSplit.length;

                            if (transitionSplitLen === 1) {
                                transitionProperty.push('all');
                                transitionDuration.push(transitionSplit[0]);
                                transitionTiming.push('linear');
                                transitionDelay.push('0s');
                            } else if (transitionSplitLen === 2) {
                                transitionProperty.push(transitionSplit[0]);
                                transitionDuration.push(transitionSplit[1]);
                                transitionTiming.push('linear');
                                transitionDelay.push('0s');
                            } else if (transitionSplitLen === 3) {
                                transitionProperty.push(transitionSplit[0]);
                                transitionDuration.push(transitionSplit[1]);
                                transitionTiming.push(transitionSplit[2]);
                                transitionDelay.push('0s');
                            } else if (transitionSplitLen === 4) {
                                transitionProperty.push(transitionSplit[0]);
                                transitionDuration.push(transitionSplit[1]);
                                transitionTiming.push(transitionSplit[2]);
                                transitionDelay.push(transitionSplit[3]);
                            }
                        }

                        const splitStyle = [];

                        for (let commaIndex = 0; commaIndex < commaSplitLen; commaIndex++) {
                            if (splitStyle.length === 0) {
                                splitStyle.push(transitionProperty[commaIndex]);
                                splitStyle.push(transitionDuration[commaIndex]);
                                splitStyle.push(transitionTiming[commaIndex]);
                                splitStyle.push(transitionDelay[commaIndex]);
                            } else {
                                splitStyle[0] = `${splitStyle[0]}, ${transitionProperty[commaIndex]}`;
                                splitStyle[1] = `${splitStyle[1]}, ${transitionDuration[commaIndex]}`;
                                splitStyle[2] = `${splitStyle[2]}, ${transitionTiming[commaIndex]}`;
                                splitStyle[3] = `${splitStyle[3]}, ${transitionDelay[commaIndex]}`;
                            }
                        }

                        newStyles = this.transformKeys(newStyles, key, splitStyle, ['Property', 'Duration', 'TimingFunction', 'Delay']);
                    } else if (key === 'listStyle') {
                        const splitStyle = this.splitStyle(newStyles[key]);

                        newStyles = this.transformKeys(newStyles, key, splitStyle, ['Type', 'Position', 'Image']);
                    } else {
                        newStyles[key] = this.addUnit(style);
                    }
                } else if (styleType === 'object') {
                    newStyles[key] = this.transform(style, depth + 1);
                }
            }
        }

        return newStyles;
    },

};

module.exports = window.Pod_Styler;
