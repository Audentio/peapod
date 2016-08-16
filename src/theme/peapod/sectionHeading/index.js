import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('SectionHeading'));

export { wrappedComponent as default };
