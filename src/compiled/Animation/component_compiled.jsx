const componentName = 'Animation';
import { Sheet } from 'utility/stylesheet.js';
let stylesheet = new Sheet(componentName);

import theme_0 from '/Users/kyler/repos/peapod/src/theme/peapod/theme.js';

import Styler from 'utility/styler.js';

//stylesheet.resolveValues();

//stylesheet.resolve

//Styler.registerComponent(componentName, stylesheet);

import wrapper from 'utility/wrapper.jsx';

import sourceComponent from '/Users/kyler/repos/peapod/src/theme/peapod/Animation/component.jsx';

let component = null;

if (typeof(sourceComponent) === 'function') {
    component = wrapper(sourceComponent(componentName));
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