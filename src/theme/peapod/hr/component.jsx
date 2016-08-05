/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        return (
            <hr className={classes.main} />
        );
    }
};
