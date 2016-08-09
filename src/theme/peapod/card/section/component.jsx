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
        children: React.PropTypes.any,
        mediaTitle: React.PropTypes.any,
    }

    static defaultProps = {
        mediaTitle: false,
    }

    render() {
        const classes = Styler.getClassStyle(this);

        const mediaTitle = (this.props.mediaTitle) ? (
            <div className={classes.mediaTitle}>
                {this.props.mediaTitle}
            </div>
        ) : '';

        return (
            <div className={classes.main}>
                {this.props.children}
                {mediaTitle}
            </div>
        );
    }

};
