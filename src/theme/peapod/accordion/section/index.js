import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Accordion_Section'));

import style from './style.js';

export { wrappedComponent as default, style as style };
