import React from 'react';
import Pod_Styler from 'styler.js';
import {Card, Calendar_MonthBar, Calendar_Grid} from 'components.js'

import {globals, addDays, setDayOfWeek, getDates, resetTime, daysInMonth, getMonthFromDate, getLocalMonth} from './calendarHelper.js'

module.exports = class Calendar extends React.Component {

    componentWillMount() {
        const now = (this.props.date && this.props.month && this.props.year) ?
            new Date(this.props.year, this.props.month, this.props.date) :
            new Date();
        const date = (this.props.date) ? this.props.date: now.getDate();
        const month = (this.props.month) ? this.props.month: now.getMonth();
        const year = (this.props.year) ? this.props.year: now.getFullYear();

        this.state = { now, month, date, year, today: now }

        this.updateCalendar = this.updateCalendar.bind(this)
        this.updateToday = this.updateToday.bind(this)
    }

    setDay(now) {
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        this.setState({ now, month, date, year })
    }

    updateCalendar(month, year) {
        this.setState({ month, year })
    }

    updateToday(today) {
        this.setState({ today })
        if (this.props.onClick) {
            this.props.onClick(today)
        }
    }

    componentWillReceiveProps(nextProps) {
        const now = (nextProps.date && nextProps.month && nextProps.year) ?
            new Date(nextProps.year, nextProps.month, nextProps.date) :
            new Date();

        this.setState({ today: now })
    }

    render() {
        var style = Pod_Styler.getStyle(this);

        const activeDay = new Date(this.state.year, this.state.month, this.state.date);

        const dateArray = getMonthFromDate(activeDay);

        // move these into CalendarMonthBar
        const dayBefore = addDays(dateArray[0],-1);
        const dayAfter = addDays(dateArray[dateArray.length-1], 1);

        const prevMonth = dayBefore.getMonth();
        const nextMonth = dayAfter.getMonth();
        const prevYear = dayBefore.getFullYear();
        const nextYear = dayAfter.getFullYear();

        var dayoptions = { weekday: 'short', month: 'short', day: 'numeric' };

        return (
            <div style={style.main}>
                <div style={style.dateBar}>
                    <div style={style.year}>{this.state.today.getFullYear()}</div>
                    <div style={style.date}>{this.state.today.toLocaleDateString(globals.locale, dayoptions)}</div>
                </div>
                <Calendar_MonthBar
                    // get these down
                    onClick={this.updateCalendar}
                    currentDate={activeDay}
                    nextMonth={nextMonth}
                    prevMonth={prevMonth}
                    nextYear={nextYear}
                    prevYear={prevYear}
                />
                <Calendar_Grid dateArray={dateArray} onClick={this.updateToday} />
            </div>
        );

    }

};
