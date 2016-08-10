import wrapper from 'utility/wrapper.jsx';
import unwrappedComponent from '';
const wrappedComponent = wrapper(unwrappedComponent(componentName));

import unwrappedExample from '';
const wrappedExample = wrapper(unwrappedExample(componentName));

import style from '';

export { wrappedComponent as default, style as style, wrappedExample as example };
