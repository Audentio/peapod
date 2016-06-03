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
        children: React.PropTypes.any,
        mediaTitle: React.PropTypes.any,
    }

    static defaultProps = {
        mediaTitle: false,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const mediaTitle = (this.props.mediaTitle) ? (
            <div style={style.mediaTitle}>
                {this.props.mediaTitle}
            </div>
        ) : '';

        return (
            <div style={style.main}>
                {this.props.children}
                {mediaTitle}
            </div>
        );
    }

};
