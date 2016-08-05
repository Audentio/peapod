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

    constructor() {
        super();

        this.prevButton = this.prevButton.bind(this);
        this.nextButton = this.nextButton.bind(this);
    }

    prevButton() {
        this.props.onClick(this.props.prevMonth, this.props.prevYear);
        return false;
    }
    nextButton() {
        this.props.onClick(this.props.nextMonth, this.props.nextYear);
        return false;
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        return (
            <div>
                <a
                    className={classes.button}
                    onClick={this.prevButton}
                >
                    <Icon styler={{ style: classes.style.icon }}>keyboard_arrow_left</Icon>
                </a>
                <div className={classes.main}>
                    {getLocalMonth(this.props.currentDate)} {this.props.currentDate.getFullYear()}
                </div>
                <a
                    className={classes.button}
                    onClick={this.nextButton}
                >
                    <Icon styler={{ style: classes.style.icon }}>keyboard_arrow_right</Icon>
                </a>
            </div>
        );
    }

};
