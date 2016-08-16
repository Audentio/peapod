import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Table_Cell'));

export { wrappedComponent as default };
