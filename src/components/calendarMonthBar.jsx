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

import {globals, getLocalMonth} from './calendarHelper.js'

/**
* CalendarMonthBar component
* @element Code
*/
class CalendarMonthBar extends React.Component {

    constructor() {
        super();
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div>
                <a href="#"
                    style={style.button}
                    onClick={function() {this.props.onClick(this.props.prevMonth, this.props.prevYear)}.bind(this)}
                >&lt;</a>
                <div style={style.main}>{getLocalMonth(this.props.currentDate)} {this.props.currentDate.getFullYear()}</div>
                <a href="#"
                    style={style.button}
                    onClick={function() {this.props.onClick(this.props.nextMonth, this.props.nextYear)}.bind(this)}
                >&gt;</a>
            </div>
        );

    }

};

module.exports = Wrapper(CalendarMonthBar);
