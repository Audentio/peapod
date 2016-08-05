import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        date: React.PropTypes.any,
        onClick: React.PropTypes.func,
        children: React.PropTypes.any,
    }

    constructor() {
        super();

        this.print = this.print.bind(this);
    }

    print() {
        if (this.props.onClick) {
            this.props.onClick(this.props.date);
        }
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        let date = this.props.date;

        if (date) {
            date = date.getDate();
        } else {
            date = '';
        }

        return (<li onClick={this.print} className={classes.main}>{date}</li>);
    }
};
