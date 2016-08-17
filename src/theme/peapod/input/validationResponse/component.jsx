/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


// Dependencies
import React, { Component, PropTypes } from 'react';
import Styler from 'utility/styler.js';
import { Icon } from 'utility/components.js';

/**
* Validation Response - validation messages for input fields
*
* @element Input_ValidationResponse
*
*/
module.exports = componentName => class Pod_Component extends Component {

    static displayName = componentName;

    static propTypes = {
        icon: PropTypes.string,
        children: PropTypes.any,
    }

    render() {
        const classes = Styler.getClasses(this);
        const { icon, children, ...props } = this.props;

        return (
            <span className={classes.main} {...props}>
                {icon && <Icon className={classes.icon}>{icon}</Icon>}
                {children}
            </span>
        );
    }

};
