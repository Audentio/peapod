//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

//Peapod
//import Pod_core from './core.jsx';
import Pod_core from './components/core.jsx';

var components = [],
	ignoreComponents = [
		'__template',
		'Animation',
		'Core',
	];

window.Pod = {
	options:{},
	wrapper: require('./wrapper.jsx'),
};

_.merge(Pod, {
    timestamp: require('./components/timestamp.jsx'),
    animation: require('./components/animation.jsx'),
});

var init = function() {
	var req = require.context('./components', false, /^\.\/.*\.jsx$/),
		fileNames = req.keys();

	for (var i = 0, len = fileNames.length; i < len; i++) {
		var fileName = fileNames[i].replace('./', '').replace('.jsx', ''),
			componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

		if (ignoreComponents.indexOf(componentName) == -1) {
			components.push(componentName);
			window.Pod[fileName] = req('./' + fileName + '.jsx');
		}
	}

	window.Pod_Vars = window.Pod_Vars || require('./vars.js');
	window.Pod_Styler = window.Pod_Styler || require('./styler.js');

	var base = require('./theme/base.js');
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
