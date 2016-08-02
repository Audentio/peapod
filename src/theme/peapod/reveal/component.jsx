/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { Component, PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: props.visible,
        };
    }

    static displayName = componentName;
    static propTypes = {
        children: PropTypes.any,
        visible: PropTypes.bool,
        trigger: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.array,
            PropTypes.string,
        ]),
    }

    toggle = () => {
        this.setState({
            visible: !this.state.visible,
        });
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const { trigger, children } = this.props;
        const { visible } = this.state;

        let toggler = trigger;

        if (typeof trigger === 'object') { // array - different open and close triggers
            toggler = visible ? trigger[1] : trigger[0];
        }

        return (
            <div style={style.main}>
                <div style={style.trigger} onClick={this.toggle}>{toggler}</div>
                {visible && children}
            </div>
        );
    }
};
