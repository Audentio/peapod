/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        src: React.PropTypes.string,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        return (
            <iframe
                style={style.main}
                src={this.props.src}
                frameBorder="0"
                allowFullScreen
            >
            </iframe>
        );
    }
};
