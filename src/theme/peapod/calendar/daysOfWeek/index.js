import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from './component.jsx';
const wrappedComponent = wrapper(unwrappedComponent('Calendar_DaysOfWeek'));

export { wrappedComponent as default };
