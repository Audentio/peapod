import { globals, addDays, setDayOfWeek, getDates, resetTime, daysInMonth, getMonthFromDate, getLocalMonth } from '../calendarHelper.js';

import React from 'react';
import Pod_Styler from 'utility/styler.js';

import { Calendar_DaysOfWeek, Calendar_Day } from 'utility/components.js'

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    componentWillMount() {
        const now = new Date();
        const date = (this.props.date) ? this.props.date: now.getDate();
        const month = (this.props.month) ? this.props.month: now.getMonth();
        const year = (this.props.year) ? this.props.year: now.getFullYear();

        this.state = { now, month, date, year }

        // this.updateCalendar = this.updateCalendar.bind(this)
        this.setDay = this.setDay.bind(this)
    }
    setDay(now) {
        this.props.onClick(now)
    }

    render() {
        var style = Pod_Styler.getStyle(this);
        let dates = []

        let dateArray = this.props.dateArray

        for (let i = 0; i < globals.daysPerWeek; i++) {
            let weekday = new Date(dateArray[0]);
            dates.push(<Calendar_DaysOfWeek date={setDayOfWeek(weekday, i+globals.startingDay)} notActive={true} key={'dayOfWeek'+i} />);
        }

        let push = 0;
        if (dateArray[0].getDay() == 0) {
            push = globals.daysPerWeek - globals.startingDay
        } else {
            push = dateArray[0].getDay() - globals.startingDay
        }
        if (push < globals.daysPerWeek) {
            for (let i = push - 1; i >= 0; i--) {
                dates.push(<Calendar_Day date={addDays(dateArray[0], -(i+1))} notActive={true} key={'push'+i} />);
            }
        } else {
            push = 0
        }

        for (let i = 0; i < dateArray.length; i++ ) {
            dates.push(<Calendar_Day date={dateArray[i]} onClick={this.setDay} key={'date'+i} />);
        }

        const totalCount = dateArray.length + push
        let pull = globals.daysPerWeek - (totalCount % globals.daysPerWeek);

        // force 6 rows
        if (globals.forceSix && (totalCount + pull) < (globals.daysPerWeek * 6)) {
            pull = pull + globals.daysPerWeek;
        }
        for (let i = 0; i < pull; i++) {
            dates.push(<Calendar_Day date={addDays(dateArray[dateArray.length-1], i+1)} notActive={true} key={'pull'+i} />);
        }

        return (<ul style={style.main}>{dates}</ul>)
    }

};
