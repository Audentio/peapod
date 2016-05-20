/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


import React, { PropTypes } from 'react';
import Pod_Styler from 'styler';

module.exports = class Button extends React.Component {

    // Validate props
    static propTypes = {
        href: PropTypes.string,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        label: PropTypes.any,
        children: PropTypes.any,
        noRipple: PropTypes.bool,
    }

    // Default props
    static defaultProps = {
        label: 'Submit',
        noRipple: false,
    }

    ripple(clientX, clientY) {
        const style = Pod_Styler.getStyle(this);
        const ripples = this.state.ripples || [];
        const size = this.refs.rippleContainer.offsetWidth;
        const containerX = this.refs.rippleContainer.getBoundingClientRect().left;
        const containerY = this.refs.rippleContainer.getBoundingClientRect().top;

        if (this.rippleCount === undefined) this.rippleCount = 0;
        if (this.rippleCount === undefined) this.rippleCount = 0;

        const calculatedStyle = {
            width: size,
            height: size,
            top: clientY - containerY - (size / 2),
            left: clientX - containerX - (size / 2),
        };

        ripples.push(<span key={this.rippleCount} style={[style.ripple, calculatedStyle]}></span>);
        this.rippleCount++;

        this.setState({ ripples });

        setTimeout(() => {
            ripples.splice(0, 1);
            this.setState({ ripples });
        }, 1000);
    }

    onClickHandler = (e) => {
        if (this.props.onClick) this.props.onClick(e);

        if (this.props.noRipple === false) {
            this.ripple(e.clientX, e.clientY);
        }
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const ripple = <span ref="rippleContainer" style={style.rippleContainer}>{this.state.ripples}</span>;

        // Anchor tag <a> if href specified
        if (this.props.href) {
            return (
                <a href={this.props.href} style={style.main} onClick={this.onClickHandler}>
                    {this.props.children || this.props.label} {ripple}
                </a>
            );
        }

        // Default: <button> tag
        return (
            <button style={style.main} onClick={this.onClickHandler}>
                {this.props.children || this.props.label} {ripple}
            </button>
        );
    }

};
