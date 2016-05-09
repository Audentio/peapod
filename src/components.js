//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

//Peapod

module.exports = {};

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

var init = function(themeName = 'peapod') {
	var req = require.context('./theme', true, /^\.\/.*\.jsx$/),
		fileNames = req.keys();

	for (var fileIndex = 0, fileLen = fileNames.length; fileIndex < fileLen; fileIndex++) {
		var fileName = fileNames[fileIndex],
			splitName = fileName.replace('./', '').split('/'),
			componentName = "",
			styleName = "";

		if (splitName[0] == themeName) {
			for (var splitIndex = 1, splitLen = splitName.length; splitIndex < (splitLen - 1); splitIndex++) {
				var splitVal = splitName[splitIndex],
					splitValUpper = "";
				if (splitVal.length == 1) {
					splitValUpper = splitVal.charAt(0).toUpperCase()
				} else {
					splitValUpper = splitVal.charAt(0).toUpperCase() + splitVal.slice(1)
				}
				if (componentName == "") {
					componentName = splitValUpper;
					styleName = splitVal;
				} else {
					componentName += '_' + splitValUpper;
					styleName += '_' + splitVal;
				}
			}

			module.exports[componentName] = req(fileName);
	 		console.log(splitName);
			console.log(componentName);
			console.log(styleName);
			console.log('================')
		}
	}

	window.Pod_Vars = window.Pod_Vars || require('./vars.js');
	window.Pod_Styler = window.Pod_Styler || require('./styler.js');

	/*
	for (var i = 0, len = fileNames.length; i < len; i++) {
		var fileName = fileNames[i].replace('./', '').replace('.jsx', ''),
			componentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

		if (ignoreComponents.indexOf(componentName) == -1) {
			components.push(componentName);
			window.Pod[fileName] = req('./' + fileName + '.jsx');
		}
	}

	var base = require('./theme/base.js');
	base(components);
	*/
}

if (module.hot) {
	module.hot.accept();
	if (typeof(window._peapodRoot) !== 'undefined'){
		init();
		window._peapodRoot.forceUpdate();
	}
}

init();

console.log(module.exports);
//module.exports = [Pod, Pod_Vars, Pod_Styler, components];
