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
        src: React.PropTypes.string,
    }

    render() {
        const classes = Styler.getClasses(this);

        return (
            <iframe
                className={classes.main}
                src={this.props.src}
                frameBorder="0"
                allowFullScreen
            >
            </iframe>
        );
    }
};
