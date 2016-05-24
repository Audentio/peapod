import { getLocalMonth } from '../calendarHelper.js';
import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        href: React.PropTypes.string,
        prevMonth: React.PropTypes.number,
        nextMonth: React.PropTypes.number,
        prevYear: React.PropTypes.number,
        nextYear: React.PropTypes.number,
        currentDate: React.PropTypes.any,
        onClick: React.PropTypes.func,
        children: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <div>
                <a
                    href="javascript:void(false)"
                    style={style.button}
                    onClick={function () { this.props.onClick(this.props.prevMonth, this.props.prevYear); }}
                >
                    <Icon styler={{ style: style.icon }}>keyboard_arrow_left</Icon>
                </a>
                <div style={style.main}>{getLocalMonth(this.props.currentDate)} {this.props.currentDate.getFullYear()}</div>
                <a
                    href="javascript:void(false)"
                    style={style.button}
                    onClick={function () { this.props.onClick(this.props.nextMonth, this.props.nextYear); }}
                >
                    <Icon styler={{ style: style.icon }}>keyboard_arrow_right</Icon>
                </a>
            </div>
        );
    }

};
