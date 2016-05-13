import {globals, getLocalMonth} from '../calendarHelper.js'
import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Calendar_MonthBar extends React.Component {

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