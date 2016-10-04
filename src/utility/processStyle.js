import Logger from './logger.js';

const makeBrowserObject = () => {
    const ua = navigator.userAgent.toLowerCase();
    const match = /opera/.exec(ua) || /msie/.exec(ua) || /firefox/.exec(ua) || /(chrome|safari)/.exec(ua);
    const vendors = {
        opera: 'O',
        chrome: 'webkit',
        safari: 'webkit',
        firefox: 'Moz',
        msie: 'ms',
    };

    const prefix = vendors[match[0]].toLowerCase();

    const rulesRaw = window.getComputedStyle(document.documentElement, '');
    const rules = [];
    const ruleKeys = Object.keys(rulesRaw);
    for (let i = 0, len = ruleKeys.length; i < len; i++) {
        if (typeof (rulesRaw[i] !== 'undefined') && rulesRaw[i] !== '') {
            rules.push(rulesRaw[i]);
        }
    }

    return {
        prefix,
        rules,
        skipRules: [
            'margin',
            'overflow',
            'padding',
            'border-radius',
            'background',
            'border',
            'border-width',
            'border-style',
            'border-color',
            '_theme',
        ],
        vendors: [
            '-O-',
            '-o-',
            '-webkit-',
            '-Webkit-',
            '-Moz-',
            '-moz-',
            '-ms-',
            '-Ms-',
        ],
    };
};

const browserSniff = () => {
    if (typeof (window.peapod_browser) === 'undefined') {
        return makeBrowserObject();
    }

    return window.peapod_browser;
};

const ensureQuoted = (str) => {
    if (str.indexOf('"') === -1 && str.indexOf('\'') === -1) {
        return `\"${str}\"`;
    }
    return str;
};

const prefixRule = (str, browser) => {
    const ruleIndex = browser.rules.indexOf(str);
    const skipIndex = browser.skipRules.indexOf(str);
    const vendorIndex = browser.vendors.indexOf(str);
    if (ruleIndex === -1 && skipIndex === -1 && vendorIndex === -1) {
        console.log(`-${browser.prefix}-${str}`)
        return `-${browser.prefix}-${str}`;
    }

    return null;
};

const processVal = (val, rule, browser) => {
    let processedVal = val;

    //if ()

    return processedVal;
};

const hyphenateRule = (str, browser) => {
    if (str === str.toLowerCase) return false;

    return str.replace(/^([A-Z])/g, '-$1').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

const process = (selector, themeName, browser, depth = 0) => {
    const rules = Object.keys(selector);
    for (let i = 0, len = rules.length; i < len; i++) {
        const rule = rules[i];
        const val = selector[rule];
        if (typeof(val) === 'object') {
            if (depth < 10) {
                selector[rule] = process(val, themeName, browser, depth + 1);
            } else {
                Logger.error('Depth of style too large');
            }
        } else {
            selector._theme = `"${themeName}"`;
            const hyphenatedRuleVal = hyphenateRule(rule, browser);
            const hyphenatedRule = (hyphenatedRuleVal === false) ? rule : hyphenatedRuleVal;
            const processedVal = processVal(val, hyphenatedRule, browser);
            const prefixedRule = prefixRule(hyphenatedRule, browser);
            if (prefixedRule !== false) {
                selector[prefixedRule] = processedVal;
            }
            if (hyphenatedRuleVal !== false) {
                delete selector[rule]; // Comment this to keep js rules
                selector[hyphenatedRule] = processedVal;
            }


            if (hyphenatedRule === 'content') {
                selector[hyphenatedRule] = ensureQuoted(selector[hyphenatedRule]);
            }
        }
    }

    return selector;
};

module.exports = (selector, themeName) => {
    const browser = browserSniff();

    return process(selector, themeName, browser);
};
