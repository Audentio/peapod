import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Calendar_DaysOfWeek extends React.Component {
    static propTypes = {
        date: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const date = new Date(this.props.date);

        return (
            <li style={style.main}>
                {date.toLocaleDateString(window.navigator.language, { weekday: 'narrow' })}
            </li>
        );
    }

};
