/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import { merge as _merge } from 'lodash';
import Logger from './logger.js';

const maxDepth = 30; // will attempt to resolve variables throug this many levels

window.Pod_Vars = window.Pod_Vars || {
    sources: [],
    cache: {},

    register(vars, level = (this.sources.length - 1)) {
        let sourceLevel = level;
        if (level < 0) {
            sourceLevel = 0;
        }
        this.sources[sourceLevel] = _merge(this.sources[sourceLevel], vars);
    },

    processResult(val, varSetOverride, depth) {
        if (typeof(val) === 'string' && val.indexOf('$') === 0 && depth < 20) {
            return window.Pod_Vars.get(val.replace('$', ''), varSetOverride, depth + 1); // recursively try to find
        }

        if (depth >= maxDepth) {
            throw new Error(`Max variable depth of ${maxDepth} reached when resolving ${val}.  Do you have a circular variable reference?`);
        }
        return val;
    },

    getVarFromSource(source, varSet, name) {
        const splitName = name.split('.');
        let currentSource = source[varSet];

        for (let i = 0, len = splitName.length; i < len; i++) {
            if (typeof(currentSource) !== 'undefined') {
                const nextSource = currentSource[splitName[i]];
                if (typeof(nextSource) !== 'function') {
                    currentSource = nextSource;
                } else {
                    return nextSource(varSet);
                }
            } else {
                return undefined;
            }
        }
        return currentSource;
    },

    get(name, varSetOverride, getDepth) {
        const results = [];
        let onlyBase = true;
        const depth = getDepth || 0;

        for (let sourceIndex = 0, sourceLen = window.Pod_Vars.sources.length; sourceIndex < sourceLen; sourceIndex++) {
            const source = window.Pod_Vars.sources[sourceIndex];
            if (typeof(source) !== 'undefined') {
                const vars = source;
                if (typeof(vars) !== 'undefined') {
                    for (let i = 0, len = Object.keys(vars).length; i < len; i++) {
                        const varSet = Object.keys(vars)[i];
                        const varVal = window.Pod_Vars.getVarFromSource(vars, varSet, name);
                        const setVarSetOverride = typeof(varSetOverride) === 'undefined';

                        if (typeof(varVal) !== 'undefined' && typeof(varVal) !== 'function' && (setVarSetOverride || (typeof(varSetOverride) !== 'undefined' && (varSetOverride === varSet || varSet === 'common' || varSet === 'normal')))) {
                            if (varSet !== 'common' && varSet !== 'normal') onlyBase = false;
                            const val = window.Pod_Vars.processResult(varVal, varSet, depth);
                            results.push({
                                vars: varSet,
                                val,
                            });
                        }
                    }
                }
            }
        }

        if (typeof(varSetOverride) !== 'undefined') {
            for (let i = results.length - 1; i >= 0; i--) {
                if (varSetOverride === 'common' && results[i].vars === 'normal') return results[i].val;
                if (results[i].vars === varSetOverride) return results[i].val;
            }

            for (let i = results.length - 1; i >= 0; i--) {
                if (results[i].vars === 'common') return results[i].val;
            }
        }

        if (onlyBase || results.length === 1) {
            if (results.length === 0) {
                Logger.warn(`Unable to find variable named: ${name}`);
            }
            return results[results.length - 1].val;
        }

        return results;
    },
};


module.exports = window.Pod_Vars;
