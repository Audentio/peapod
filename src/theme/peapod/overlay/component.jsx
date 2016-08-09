/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Styler from 'utility/styler.js';
import Pod from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const classes = Styler.getClassStyle(this);
        return (
            <div className={classes.main} {...this.props}>
                <Pod.Center>
                    {this.props.children}
                </Pod.Center>
            </div>
        );
    }
};
