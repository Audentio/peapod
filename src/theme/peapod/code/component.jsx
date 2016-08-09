/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: PropTypes.any,
    }

    render() {
        const classes = Styler.getClassStyle(this);
        const { children: code } = this.props;

        return (
            <code className={classes.main}>
                {code}
            </code>
        );
    }

};
