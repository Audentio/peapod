const componentName = '';

import { Sheet } from 'utility/stylesheet.js';

let stylesheet = new Sheet(componentName);

import sheet1 from '';
stylesheet = sheet1(stylesheet);

import sheet2 from '';
stylesheet = sheet2(stylesheet);

import theme1 from '';

import theme2 from '';

import Styler from 'utility/styler.js';

stylesheet.resolveValues();

stylesheet.resolve

Styler.registerComponent(componentName, stylesheet);

import wrapper from 'utility/wrapper.jsx';

import sourceComponent from '';

let component = null;

if (typeof(sourceComponent) === 'function') {
    component = sourceComponent(componentName);
    if (typeof(component) === 'undefined') {
        throw new Error(`${componentName} is not returning or is returning undefined`);
    }
    if (component.displayName !== componentName) {
        throw new Error(`${componentName} is not setting the component name correctly`);
    }
} else {
    throw new Error(`${componentName} is not a function`);
}

export default wrapper(component);
