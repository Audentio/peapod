import { globals, getLocalMonth } from '../calendarHelper.js';
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        var style = Pod_Styler.getStyle(this);

        return (
            <div>
                <a href="javascript:void()"
                    style={style.button}
                    onClick={function (event) { this.props.onClick(this.props.prevMonth, this.props.prevYear); }.bind(this)}
                    >
                    <Icon styler={{ style: style.icon }}>keyboard_arrow_left</Icon>
                </a>
                <div style={style.main}>{getLocalMonth(this.props.currentDate)} {this.props.currentDate.getFullYear()}</div>
                <a href="javascript:void()"
                    style={style.button}
                    onClick={function (event) { this.props.onClick(this.props.nextMonth, this.props.nextYear); }.bind(this)}
                    >
                    <Icon styler={{ style: style.icon }}>keyboard_arrow_right</Icon>
                </a>
            </div>
        );
    }

};
