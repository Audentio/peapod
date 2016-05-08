//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

//Peapod

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

var init = function() {
	var req = require.context('./theme', true, /^\.\/.*\.jsx$/),
		fileNames = req.keys();

	console.log(fileNames);

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

//module.exports = [Pod, Pod_Vars, Pod_Styler, components];

import Button from './theme/peapod/button/component.jsx';
import Icon from './theme/peapod/icon/component.jsx';
import Grid from './theme/peapod/grid/component.jsx';
import Div from './theme/peapod/div/component.jsx';
import Checkbox from './theme/peapod/checkbox/component.jsx';
import Paginator from './theme/peapod/paginator/component.jsx';
import Portal from './theme/peapod/portal/component.jsx';
import Table_Query from './theme/peapod/table/query/component.jsx';
import Table_Inner from './theme/peapod/table/inner/component.jsx';
import Table_Preset from './theme/peapod/table/preset/component.jsx';
import Table_Control from './theme/peapod/table/control/component.jsx';
import Table_Header from './theme/peapod/table/header/component.jsx';




module.exports = {
	Button: Button,
	Icon: Icon,
	Grid: Grid,
	Div: Div,
	Checkbox: Checkbox,
	Paginator: Paginator,
	Portal: Portal,
	Table_Query: Table_Query,
	Table_Inner: Table_Inner,
	Table_Preset: Table_Preset,
	Table_Control: Table_Control,
	Table_Header: Table_Header,

}
