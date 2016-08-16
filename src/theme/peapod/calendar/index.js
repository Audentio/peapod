import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Calendar'));

export { wrappedComponent as default };
