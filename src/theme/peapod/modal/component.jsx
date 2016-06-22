/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import Pod from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        overlay: React.PropTypes.bool,
    }

    static defaultProps = {
        overlay: true,
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        const modalBox = (
            <div style={style.main}>
                {this.props.children}
                hahaha
            </div>
        );

        return (this.props.overlay) ? (
            <Pod.Overlay>
                {modalBox}
            </Pod.Overlay>
        ) : modalBox;
    }
};
