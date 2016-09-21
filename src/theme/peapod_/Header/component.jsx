/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        styler: React.PropTypes.object,
        preset: React.PropTypes.string,
    }

    render() {
        const { styler, children, ...other } = this.props;
        const classes = Styler.getClasses(this);

        return (
            <header {...other} className={classes.main}>
                {children}
            </header>
        );
    }
};
