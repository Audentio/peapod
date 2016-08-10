import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Animation'));

import example from './example.jsx';

export { wrappedComponent as default, example as example };
