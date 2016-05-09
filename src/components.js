//Peapod

import Wrapper from 'wrapper.jsx';

module.exports = {};

var ignoreComponents = [
		'__template',
		'Animation',
		'Core',
	];

window.Pod = {
	options:{},
	wrapper: require('./wrapper.jsx'),
};

var themeReq = require.context('./theme', true, /theme.js$/),
	themeKeys = themeReq.keys(),
	themeLen = themeKeys.length;

var init = function(themeName = 'peapod', ignoreComponents = []) {
	var styleSheets = {},
		componentNames = {},
		req = require.context('./theme', true, /^\.\/.*\.jsx?$/),
		fileNames = req.keys();

	for (var fileIndex = 0, fileLen = fileNames.length; fileIndex < fileLen; fileIndex++) {
		var fileName = fileNames[fileIndex],
			splitName = fileName.replace('./', '').split('/'),
			componentName = '',
			styleName = '';

		if (splitName[0] == themeName) {
			var splitLen = splitName.length,
				fileType = splitName[splitLen - 1];

			if (fileType == 'component.jsx' || fileType == 'style.js') {
				for (var splitIndex = 1; splitIndex < (splitLen - 1); splitIndex++) {
					var splitVal = splitName[splitIndex],
						splitValUpper = '';

					if (splitVal.length == 1) {
						splitValUpper = splitVal.charAt(0).toUpperCase();
					} else {
						splitValUpper = splitVal.charAt(0).toUpperCase() + splitVal.slice(1);
					}

					if (componentName == '') {
						componentName = splitValUpper;
						styleName = splitVal;
					} else {
						componentName += '_' + splitValUpper;
						styleName += '_' + splitVal;
					}
				}

				if (ignoreComponents.indexOf(componentName) == -1) {
					if (fileType == 'component.jsx') {
						componentNames[componentName] = fileName;
					} else if (fileType == 'style.js') {
						styleSheets[styleName] = {
							fileName: fileName,
							componentName: componentName,
						};
					}
				}
			}
		}
	}

	window.Pod_Vars = window.Pod_Vars || require('vars.js');
	window.Pod_Styler = window.Pod_Styler || require('styler.js');

	for (var themeIndex = 0; themeIndex < themeLen; themeIndex++) {
		var themeFileName = themeKeys[themeIndex];

		if (themeFileName.indexOf('./' + themeName + '/') > -1) {
			var theme = themeReq(themeFileName);
			Pod_Styler.addLibrary(theme.themeParent, theme.themeName, styleSheets, req, theme.globalVars);
		}
	}

	var componentNameKeys = Object.keys(componentNames);

	for (var componentNameIndex = 0, componentNameLen = componentNameKeys.length; componentNameIndex < componentNameLen; componentNameIndex++) {
		var componentName = componentNameKeys[componentNameIndex],
			component = req(componentNames[componentName]);
		//module.exports[componentName] = component(componentName);

		module.exports[componentName] = Wrapper(component);
	}
}

if (module.hot) {
	module.hot.accept();
	if (typeof(window._peapodRoot) !== 'undefined'){
		init();
		window._peapodRoot.forceUpdate();
	}
}

init('peapod', ignoreComponents);

//module.exports = [Pod, Pod_Vars, Pod_Styler, components];
