//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

import Pod_Wrapper from './wrapper.jsx';

//Peapod
//import Pod_core from './core.jsx';
import Pod_core from './components/core.jsx';

var components = ['Alert','Button', 'Checkbox', 'Div', 'Grid', 'GridCell', 'Hr', 'Icon', 'Input', 'Label', 'Notification', 'Paginator', 'Paragraph', 'Photo', 'Portal', 'Progress', 'Section', 'Table', 'TableCell', 'TableRow', 'Tabs'];

window.Pod = {options:{}};


// below here can be removed after all components are refactored
import Pod_timestamp from './components/timestamp.jsx';
//import Pod_image from './components/image.jsx';
import Paragraph from './components/paragraph.jsx';
import { Pod_animation } from './components/animation.jsx';

_.merge(Pod, {
    timestamp: Pod_timestamp,
    //image: Pod_image,
    animation: Pod_animation,
    p: Paragraph,
});

var keys = Object.keys(Pod);
for (var i = 0, len = keys.length; i < len; i++) {
	var key = keys[i];
	Pod[key] = Pod_Wrapper(Pod[key]);
}
// don't remove below here


var init = function() {
	var req = require.context('./components', false, /^\.\/.*\.jsx$/);
	for (var i = 0, len = components.length; i < len; i++) {
		var component = components[i],
			componentName = component.charAt(0).toLowerCase() + component.slice(1);
		window.Pod[componentName] = req('./' + componentName + '.jsx');
	}

	window.Pod_Vars = window.Pod_Vars || require('./vars.jsx');
	window.Pod_Styler = window.Pod_Styler || require('./styler.jsx');

	var base = require('./theme/base.jsx');
	base(components);
}


if (module.hot) {
	module.hot.accept();

	init();
	if (typeof(window._peapodRoot) !== 'undefined'){
		window._peapodRoot.forceUpdate();
	}
}

module.exports = [Pod, Pod_Vars, Pod_Styler, components];
