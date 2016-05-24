/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import Pod_Styler from 'utility/styler.js';


/**
*
* Create formatted & self-updating timestamps from dateTime.
*
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.create();

        if (props.output === 'relative') {
            this.state = {
                timeElapsed: this.timeElapsed(),
            };
        } else {
            this.state = {};
        }
    }

    static propTypes = {

        // dateTime
        // new Date() / UNIX time / ISO 8601 / (deprecated) RFC2822
        time: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
            PropTypes.number,
        ]),

        // Timezone of given dateTime (e.g. "America/Chicago", "UTC")
        // UTC is default
        timezone: PropTypes.string,

        // Output type
        output: PropTypes.oneOf([
            'absolute', 	// May 4th 2016, 11:44 am
            'relative', 	// 3 days ago
            'calendar', 	// Last Wednesday at 11:44 AM
        ]),

        // Adjust timezone in display
        outputTimezone: PropTypes.string,

        showTime: PropTypes.bool,
        showDate: PropTypes.bool,
        showTimezone: PropTypes.bool,

        // Timestamp Format (Overrides output, showTime and showDate)
        // e.g. `dddd, MMMM Do YYYY, h:mm:ss a`
        // more information http://momentjs.com/docs/#/displaying/format/
        format: PropTypes.string,
    }

    static defaultProps = {
        // time: Math.floor( Date.now() / 1000 ), //current epoch time
        timezone: 'UTC',
        output: 'absolute',
        outputTimezone: moment.tz.guess(), // user timezone
        showTime: true,
        showDate: true,
        showTimezone: false,
    }

    // Create moment object from time prop
    // & Adjust timezone accordingly
    create() {
        let momentObject;
        let timestamp;
        const { time, timezone } = this.props;

        if (!time) {
            this.timestamp = moment();
        } else {
            // try parsing as unix timestamp
            momentObject = moment.unix(Number(time));

            if (!momentObject.isValid()) { // failed parsing as unix timestamp
                // parse datetime string with timezone
                momentObject = moment.parseZone(time);
            }

            // Timezone Adjustment
            timestamp = momentObject.clone();
            timestamp.utcOffset(
                this.getTzOffset(time, timezone) / 60 // offset returned in minutes, converted to hours
            );
            timestamp.add(momentObject.utcOffset() - timestamp.utcOffset(), 'minutes'); // adjust time difference

            this.timestamp = timestamp.tz(this.props.outputTimezone); // Adjust timezone for output
        }
    }

    // Get formatted timestamp
    format(timestamp) {
        const { format: formatProp, showDate, showTime } = this.props;

        // Use format prop if passed
        if (formatProp) return timestamp.format(formatProp);

        // create format from showTime & showDate props
        let format;

        if (showDate && showTime) {
            format = 'MMMM Do YYYY, h:mm a';
        } else if (showDate) {
            format = 'MMMM Do YYYY';
        } else if (showTime) {
            format = 'h:mm a';
        }

        // Decide Output style
        switch (this.props.output) {
            case 'relative':
            return this.state.timeElapsed;

            case 'calendar':
            return timestamp.calendar();

            default: // absolute
            return timestamp.format(format);
        }
    }

    // Get timezone offset value (in minutes)
    getTzOffset(time, timezone) {
        const _moment = moment(time).tz(timezone);
        return _moment.utcOffset();
    }

    // Get hour:minutes version of offset value
    getTzOffset_formatted(time, timezone) {
        const offset = moment(time).tz(timezone).utcOffset() / 60;
        const hours = Math.floor(offset);
        const minutes = (offset - hours) * 60;
        const _hours = (hours < 0) ? `${hours}` : `+${hours}`;
        const _minutes = ('0' + minutes).slice(-2);
        return _hours + ':' + _minutes;
    }

    // Timezone for display (UTC -06:00)
    getTZdisplay() {
        const timezone = this.props.outputTimezone || this.props.timezone;
        const timezoneString = this.getTzOffset_formatted(this.timestamp.format(), timezone);

        return (
            <span title={timezone}>
                (UTC {timezoneString})
            </span>
        );
    }

    // Get the amount of seconds elapsed since {this.props.time}
    timeElapsed = () => this.timestamp.fromNow()

    componentWillUpdate() {
        this.create();
    }

    componentDidMount() {
        if (this.props.output === 'relative') {
            const self = this;

            // start repeater
            this._timer = setInterval(() => {
                self.setState({
                    timeElapsed: self.timeElapsed(),
                });
            }, 1000 * 60); // 60 seconds
        }
    }

    componentWillUnmount() {
        // stop repeater
        clearTimeout(this._timer);
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const formattedTimestamp = this.format(this.timestamp, this.props.time);
        const timezone = (this.props.showTimezone && this.props.output === 'absolute') ? this.getTZdisplay() : null;

        return (
            <span style={style.main} title={this.timestamp.format('MMMM Do YYYY, h:mm a')}>
                {formattedTimestamp} {timezone}
            </span>
        );
    }
};
