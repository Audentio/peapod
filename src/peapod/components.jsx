//import React from 'react'
//import ReactDOM from 'react-dom'
//import _ from 'lodash'

//Peapod
//import Pod_core from './core.jsx';
import Pod_timestamp from './timestamp.jsx';
import Pod_button from './button.jsx';
import Pod_image from './image.jsx';
import Pod_icon from './icon.jsx';
import Pod_input from './forms/input.jsx';
import Pod_checkbox from './forms/checkbox.jsx';
import Pod_grid from './grid.jsx';
import Pod_gridCell from './gridCell.jsx';
import Pod_section from './section.jsx';
import Pod_external from './external.jsx';
import { Pod_animation } from './animation.jsx'

var sections = [];

window.Pod = window.Pod || {
    timestamp: Pod_timestamp,
    button: Pod_button,
    image: Pod_image,
    icon: Pod_icon,
	grid: Pod_grid,
	gridCell: Pod_gridCell,
    input: Pod_input,
    checkbox: Pod_checkbox,
    section: Pod_section,
    external: Pod_external,
    animation: Pod_animation
}

window.Pod_Vars = window.Pod_Vars || require('./mixins/vars.jsx');
window.Pod_Styler = window.Pod_Styler || require('./mixins/styler.jsx');

module.exports = [Pod, Pod_Vars, Pod_Styler];
