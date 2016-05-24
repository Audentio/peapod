import {globals, addDays, setDayOfWeek, getDates, resetTime, daysInMonth, getMonthFromDate, getLocalMonth} from '../calendarHelper.js'

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        constructor() {
            super();

            this.print = this.print.bind(this)
        }

        print() {
            if (!this.props.notActive && !this.props.onClick)
                {console.log(this.props.date)}
            else if (this.props.onClick) {
                this.props.onClick(this.props.date)
            }
        }

        render() {
            var style = Pod_Styler.getStyle(this);
            let dates = []
            // loop over days and concole.log them
            const dateArray = getMonthFromDate(new Date());

            let date = this.props.date;

            if (date) {
                date = date.getDate()
            } else {
                date = ''
            }

            return (<li onClick={this.print} style={style.main}>{date}</li>);
        }
    };
};
