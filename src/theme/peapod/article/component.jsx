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
    }

    render() {
        const { children, ...other } = this.props;
        const classes = Styler.getClasses(this);

        return (
            <article {...other} className={classes.main}>
                {children}
            </article>
        );
    }
};
