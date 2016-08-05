import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Calendar_MonthBar, Calendar_Grid } from 'utility/components.js';
import moment from 'moment-timezone';

import { addDays, getMonthFromDate } from './calendarHelper.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        date: React.PropTypes.any,
        month: React.PropTypes.number,
        year: React.PropTypes.number,
        onClick: React.PropTypes.func,
        children: React.PropTypes.any,
    }

    componentWillMount() {
        const now = (this.props.date && this.props.month && this.props.year) ?
        new Date(this.props.year, this.props.month, this.props.date) :
        new Date();
        const date = (this.props.date) ? this.props.date : now.getDate();
        const month = (this.props.month) ? this.props.month : now.getMonth();
        const year = (this.props.year) ? this.props.year : now.getFullYear();

        this.state = { now, month, date, year, today: now };

        this.updateCalendar = this.updateCalendar.bind(this);
        this.updateToday = this.updateToday.bind(this);
    }

    setDay(now) {
        const date = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        this.setState({ now, month, date, year });
    }

    updateCalendar(month, year) {
        this.setState({ month, year });
    }

    updateToday(today) {
        this.setState({ today });
        if (this.props.onClick) {
            this.props.onClick(today);
        }
    }

    componentWillReceiveProps(nextProps) {
        const now = (nextProps.date && nextProps.month && nextProps.year) ?
        new Date(nextProps.year, nextProps.month, nextProps.date) :
        new Date();

        this.setState({ today: now });
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        const activeDay = new Date(this.state.year, this.state.month, this.state.date);

        const dateArray = getMonthFromDate(activeDay);

        // move these into CalendarMonthBar
        const dayBefore = addDays(dateArray[0], -1);
        const dayAfter = addDays(dateArray[dateArray.length - 1], 1);

        const prevMonth = dayBefore.getMonth();
        const nextMonth = dayAfter.getMonth();
        const prevYear = dayBefore.getFullYear();
        const nextYear = dayAfter.getFullYear();

        return (
            <div className={classes.main}>
                <div className={classes.dateBar}>
                    <div className={classes.year}>{this.state.today.getFullYear()}</div>
                    <div className={classes.date}>{moment(this.state.today).format('Do, MMMM')}</div>
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
                <Calendar_Grid dateArray={getMonthFromDate(new Date(this.state.today))} onClick={this.updateToday} />
            </div>
        );
    }

};
