//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

import Pod_Wrapper from './wrapper.jsx';

//Peapod
//import Pod_core from './core.jsx';
import Pod_core from './components/core.jsx';

var components = ['Button', 'Checkbox', 'Div', 'Grid', 'GridCell', 'Hr', 'Icon'],
	req = require.context('./components', false, /^\.\/.*\.jsx$/);
	//Pod = {};

for (var i = 0, len = components.length; i < len; i++) {
	var component = components[i];
	//Pod[component] = Pod_Wrapper(req('./' + component.toLowerCase() + '.jsx'))
}




// below here can be removed after all components are refactored
import Pod_timestamp from './components/timestamp.jsx';
import Button from './components/button.jsx';
import Pod_image from './components/image.jsx';
import Pod_icon from './components/icon.jsx';
import Pod_input from './components/input.jsx';
import Checkbox from './components/checkbox.jsx';
import Grid from './components/grid.jsx';
import Pod_div from './components/div.jsx';
import GridCell from './components/gridcell.jsx';
import Pod_table from './components/table.jsx';
import Pod_tableRow from './components/tableRow.jsx';
import Pod_tableCell from './components/tableCell.jsx';
import Pod_section from './components/section.jsx';
import Pod_external from './components/external.jsx';
import Pod_paginator from './components/paginator.jsx';
import Pod_portal from './components/portal.jsx';
import Pod_label from './components/label.jsx';
import Pod_hr from './components/hr.jsx';
import Pod_paragraph from './components/paragraph.jsx';
import Pod_tabs from './components/tabs.jsx';
import { Pod_animation } from './components/animation.jsx';

_.merge(Pod, {
    timestamp: Pod_timestamp,
    button: Button,
    image: Pod_image,
    icon: Pod_icon,
    grid: Grid,
    gridCell: GridCell,
    div: Pod_div,
    table: Pod_table,
    tableRow: Pod_tableRow,
    tableCell: Pod_tableCell,
    input: Pod_input,
    checkbox: Checkbox,
    section: Pod_section,
    external: Pod_external,
    animation: Pod_animation,
    paginator: Pod_paginator,
    portal: Pod_portal,
    label: Pod_label,
    hr: Pod_hr,
    p: Pod_paragraph,
	tabs: Pod_tabs
});

var keys = Object.keys(Pod);
for (var i = 0, len = keys.length; i < len; i++) {
	var key = keys[i];
	Pod[key] = Pod_Wrapper(Pod[key]);
}
// don't remove below here






window.Pod_Vars = window.Pod_Vars || require('./vars.jsx');
window.Pod_Styler = window.Pod_Styler || require('./styler.jsx');



var base = require('./theme/base.jsx');
base(components);

module.exports = [Pod, Pod_Vars, Pod_Styler];
