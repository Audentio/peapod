//import React from 'react'
//import ReactDOM from 'react-dom'
//import _ from 'lodash'

//Peapod
//import Pea_core from './core.jsx';
import Pea_timestamp from './timestamp.jsx';
import Pea_button from './button.jsx';
import Pea_image from './image.jsx';
import Pea_icon from './icon.jsx';
import Pea_input from './forms/input.jsx';
import Pea_checkbox from './forms/checkbox.jsx';
import Pea_section from './section.jsx';
import Pea_external from './external.jsx';
import { Pea_animation } from './animation.jsx'

var sections = [];

window.peapod_components = window.peapod_components || {
    timestamp: Pea_timestamp,
    button: Pea_button,
    image: Pea_image,
    icon: Pea_icon,
    input: Pea_input,
    checkbox: Pea_checkbox,
    section: Pea_section,
    external: Pea_external,
    animation: Pea_animation
}

module.exports = peapod_components;
