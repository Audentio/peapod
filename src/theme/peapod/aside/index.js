import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Aside'));

export { wrappedComponent as default };
