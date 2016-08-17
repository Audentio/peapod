const componentName = 'Card_Section';
import { Sheet } from 'utility/stylesheet.js';
let themesheet = new Sheet('peapod');
let stylesheet = new Sheet(componentName);

import theme_0 from '/Users/kyler/repos/peapod/src/theme/peapod/theme.js';
themesheet = theme_0(themesheet);

import sheet_0 from '/Users/kyler/repos/peapod/src/theme/peapod/Card/Section/style.js';
stylesheet = sheet_0(stylesheet);

import wrapper from 'utility/wrapper.jsx';

import sourceComponent from '/Users/kyler/repos/peapod/src/theme/peapod/Card/Section/component.jsx';

let component = null;

if (typeof(sourceComponent) === 'function') {
    component = wrapper(sourceComponent(componentName), stylesheet, themesheet);
    if (typeof(component) === 'undefined') {
        throw new Error(componentName + ' is not returning or is returning undefined');
    }
    if (component.displayName !== componentName) {
        throw new Error(componentName + ' is not setting the component name correctly');
    }
} else {
    throw new Error(componentName + ' is not a function');
}

export default component;