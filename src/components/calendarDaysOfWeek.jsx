/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


//Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

var Pod_Styler = require('../styler.js');
var Wrapper = require('../wrapper.jsx')

/**
* CalendarDaysOfWeek component
* @element Code
*/
class CalendarDaysOfWeek extends React.Component {

    constructor() {
        super();
    }

    render() {
        var style = Pod_Styler.getStyle(this);
        const styles = {
            width: '50px',
            height: `25px`,
            lineHeight: `25px`,
            float: 'left',
            background:'#fff',
            textAlign: 'center',
            overflow: 'hidden',
            color: '#1e5c7a',
            display: 'block',
            borderRadius: '1000px'
        }
        const date = new Date(this.props.date)

        return (
            <li style={styles}>
                {date.toLocaleDateString(window.navigator.language, {weekday: 'narrow'})}
            </li>
        );

    }

};

module.exports = Wrapper(CalendarDaysOfWeek);
