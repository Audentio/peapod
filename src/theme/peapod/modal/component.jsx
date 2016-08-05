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
        closePortal: React.PropTypes.func,
    }

    static defaultProps = {
        overlay: true,
    }

    overlayClick = (e) => {
        const { closePortal } = this.props;
        if (!closePortal) return;

        const outsideClick = e.target !== this.refs.content && !this.refs.content.contains(e.target);
        if (outsideClick) {
            closePortal();
        }
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);

        const modalBox = (
            <div className={classes.main} ref="content">
                {this.props.children}
            </div>
        );

        return (this.props.overlay) ? (
            <Pod.Overlay onClick={this.overlayClick}>
                {modalBox}
            </Pod.Overlay>
        ) : modalBox;
    }
};
