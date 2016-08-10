import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Parallax_Layer'));

import style from './style.js';

export { wrappedComponent as default, style as style };
