// Peapod

import wrapper from './wrapper.jsx';
import Vars from './vars.js';
import Styler from './styler.js';
import Logger from './logger.js';

module.exports = {
    Examples: {},
    Wrapper: wrapper,
};

window.Pod = {
    options: {},
};

const init = function *init(themeName = 'peapod', ignore = [], themeReq, req) {
    const themeKeys = themeReq.keys();
    const themeLen = themeKeys.length;
    const styleSheets = {};
    const componentNames = {};
    const examplePages = {};
    const fileNames = req.keys();
    const exports = {
        Examples: {},
        Wrapper: wrapper,
    };

    for (let fileIndex = 0, fileLen = fileNames.length; fileIndex < fileLen; fileIndex++) {
        const fileName = fileNames[fileIndex];
        const splitName = fileName.replace('./', '').split('/');
        let componentName = '';
        let styleName = '';

        if (splitName[0] === themeName) {
            const splitLen = splitName.length;
            const fileType = splitName[splitLen - 1];

            for (let splitIndex = 1; splitIndex < (splitLen - 1); splitIndex++) {
                const splitVal = splitName[splitIndex];
                let splitValUpper = '';

                if (splitVal.length === 1) {
                    splitValUpper = splitVal.charAt(0).toUpperCase();
                } else {
                    splitValUpper = splitVal.charAt(0).toUpperCase() + splitVal.slice(1);
                }

                if (componentName === '') {
                    componentName = splitValUpper;
                    styleName = splitVal;
                } else {
                    componentName = `${componentName}_${splitValUpper}`;
                    styleName = `${styleName}_${splitVal}`;
                }
            }

            if (ignore.indexOf(componentName) === -1) {
                if (fileType === 'component.jsx') {
                    componentNames[componentName] = fileName;
                } else if (fileType === 'style.js') {
                    styleSheets[styleName] = {
                        fileName,
                        componentName,
                    };
                } else if (fileType === 'example.jsx') {
                    examplePages[componentName] = fileName;
                }
            }
        }
    }

    window.Pod_Vars = window.Pod_Vars || Vars;
    window.Styler = window.Styler || Styler;
    let warnMissingExample = false;

    for (let themeIndex = 0; themeIndex < themeLen; themeIndex++) {
        const themeFileName = themeKeys[themeIndex];
        if (themeFileName.indexOf(`./${themeName}/`) > -1) {
            const theme = themeReq(themeFileName);
            window.Styler.addLibrary(theme.themeParent, theme.themeName, styleSheets, req, theme.sheet);
            warnMissingExample = theme.warnMissingExample;
        }
    }

    const componentNameKeys = Object.keys(componentNames);

    for (let componentNameIndex = 0, componentNameLen = componentNameKeys.length; componentNameIndex < componentNameLen; componentNameIndex++) {
        const componentName = componentNameKeys[componentNameIndex];
        let component = req(componentNames[componentName]);
        if (typeof(component) === 'function') {
            component = component(componentName);
            if (typeof(component) === 'undefined') {
                throw new Error(`${componentName} is not returning or is returning undefined`);
            }
            if (component.displayName !== componentName) {
                Logger.warn(`${componentName} is not setting the component name correctly`);
            }
        } else {
            Logger.warn(`${componentName} is not a function`);
        }

        exports[componentName] = wrapper(component);
        yield(exports);
        // module.exports[`NoWrap_${componentName}`] = component;

        if (typeof(examplePages[componentName]) === 'undefined') {
            if (componentName.indexOf('_') === -1 && warnMissingExample) { // only for base components
                Logger.warn(`Missing example page for ${componentName}`);
            }
        } else {
            const example = req(examplePages[componentName]);
            exports.Examples[componentName] = wrapper(example);
        }
    }

    return exports;
};

const ignoreComponents = [
    '__template',
    'Animation',
    'Core',
];
const themeReq = require.context('../theme', true, /theme\.js$/);

const req = require.context('../theme', true, /(style\.js|example\.jsx|component\.jsx)$/);

const iterator = init('peapod', ignoreComponents, themeReq, req);

let currentVal = { done: false };
do {
    currentVal = iterator.next();
    if (typeof(currentVal.value) !== 'undefined') {
        module.exports = currentVal.value;
    }
} while (!currentVal.done);


module.exports.init = init;
