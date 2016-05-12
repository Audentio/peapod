import React from 'react';
import Pod_Styler from 'styler.js';

module.exports = class Calendar_DaysOfWeek extends React.Component {

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