//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

import Pod_Wrapper from './wrapper.jsx';

//Peapod
//import Pod_core from './core.jsx';
import Pod_core from './components/core.jsx';

var components = ['Alert', 'Button', 'Checkbox', 'CircularProgress', 'Div', 'Grid', 'GridCell', 'Hr', 'Icon', 'Input', 'Label', 'Notification', 'Paginator', 'Paragraph', 'Photo', 'Portal', 'Progress', 'Section', 'Table', 'TableCell', 'TableRow', 'Tabs'];

window.Pod = {options:{}};

_.merge(Pod, {
    timestamp: require('./components/timestamp.jsx'),
    animation: require('./components/animation.jsx'),
});

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
	if (typeof(window._peapodRoot) !== 'undefined'){
		init();
		window._peapodRoot.forceUpdate();
	}
}

init();

module.exports = [Pod, Pod_Vars, Pod_Styler, components];
