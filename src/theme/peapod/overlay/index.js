import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Overlay'));

import example from './example.jsx';

import style from './style.js';

export { wrappedComponent as default, example as example, style as style };
