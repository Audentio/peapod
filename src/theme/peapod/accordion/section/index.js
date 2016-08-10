const componentName = 'Accordion_Section';

import wrapper from 'utility/wrapper.jsx';

import component from './component.jsx';
const wrappedComponent = wrapper(component(componentName));

import style from './style.js';

export {
    wrappedComponent as default,
    style as style,
};
