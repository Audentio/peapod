/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.node,
    }

    render() {
        const classes = Styler.getClasses(this);

        return (
            <div className={classes.main}>
                {this.props.children}
            </div>
        );
    }
};
