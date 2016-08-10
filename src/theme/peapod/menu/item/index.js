import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Menu_Item'));

import style from './style.js';

export { wrappedComponent as default, style as style };
