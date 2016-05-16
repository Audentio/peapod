/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


import React from 'react';
import Pod_Styler from 'styler.js';


/**
* Buttons component
*
* @element Pod_button
*
* @param {string} [label=Submit] - Button label text
* @param {string} [kind=default] - Generic button style/state (danger/warning/success)
*
*/
module.exports = class Button extends React.Component {

    // Validate props
    static propTypes = {
        href: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        label: React.PropTypes.any,
        children: React.PropTypes.any,
    }

    // Default props
    static defaultProps = {
        label: 'Submit',
    }

    render() {
        const style = Pod_Styler.getStyle(this);

        // Anchor tag <a> if href specified
        if (this.props.href) {
            return (
                <a href={this.props.href} style={style.main} onClick={this.props.onClick}>
                    {this.props.children || this.props.label}
                </a>
            );
        }

        // Default: <button> tag
        return (
            <button
                style={style.main}
                onClick={this.props.onClick}
            >
                {this.props.children || this.props.label}
            </button>
        );
    }

};
