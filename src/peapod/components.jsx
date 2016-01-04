//import React from 'react'
//import ReactDOM from 'react-dom'
import _ from 'lodash'

//Peapod
//import Pod_core from './core.jsx';
import Pod_core from './components/core.jsx';
import Pod_timestamp from './components/timestamp.jsx';
import Pod_button from './components/button.jsx';
import Pod_image from './components/image.jsx';
import Pod_icon from './components/icon.jsx';
import Pod_input from './components/input.jsx';
import Pod_checkbox from './components/checkbox.jsx';
import Pod_grid from './components/grid.jsx';
import Pod_div from './components/div.jsx';
import Pod_gridCell from './components/gridCell.jsx';
import Pod_table from './components/table.jsx';
import Pod_tableRow from './components/tableRow.jsx';
import Pod_tableCell from './components/tableCell.jsx';
import Pod_section from './components/section.jsx';
import Pod_external from './components/external.jsx';
import Pod_paginator from './components/paginator.jsx';
import Pod_portal from './components/portal.jsx';
import { Pod_animation } from './components/animation.jsx';

var sections = [];

_.merge(Pod, {
    timestamp: Pod_timestamp,
    button: Pod_button,
    image: Pod_image,
    icon: Pod_icon,
    grid: Pod_grid,
    gridCell: Pod_gridCell,
    div: Pod_div,
    table: Pod_table,
    tableRow: Pod_tableRow,
    tableCell: Pod_tableCell,
    input: Pod_input,
    checkbox: Pod_checkbox,
    section: Pod_section,
    external: Pod_external,
    animation: Pod_animation,
    paginator: Pod_paginator,
	portal: Pod_portal
});

window.Pod_Vars = window.Pod_Vars || require('./vars.jsx');
window.Pod_Styler = window.Pod_Styler || require('./styler.jsx');

module.exports = [Pod, Pod_Vars, Pod_Styler];
