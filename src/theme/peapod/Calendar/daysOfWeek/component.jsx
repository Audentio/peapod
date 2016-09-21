import React from 'react';
import Styler from 'utility/styler.js';
// import moment from 'moment-timezone';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        date: React.PropTypes.any,
    }

    render() {
        const classes = Styler.getClasses(this);
        const date = new Date(this.props.date);

        return (
            <li className={classes.main}>
                {/* {date.toLocaleDateString(window.navigator.language, { weekday: 'narrow' })}*/}
                {date}
            </li>
        );
    }

};
