/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static defaultProps = {
        align: 'center',
        valign: 'middle',
    }

    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        return (
            <div className={classes.main}>
                <div className={classes.outer}>
                    <div className={classes.inner}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

};
