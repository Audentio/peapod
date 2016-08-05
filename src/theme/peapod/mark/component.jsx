/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        styler: React.PropTypes.object,
    }

    render() {
        const { styler, children, ...other } = this.props;
        const classes = Pod_Styler.getClassStyle(this);

        return (
            <mark {...other} className={classes.main}>
                {children}
            </mark>
        );
    }
};
