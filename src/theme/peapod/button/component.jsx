/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';
import { Anchor } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.ripple = this.ripple.bind(this);
    }

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

    onClickHandler(e) {
        const { onClick } = this.props;
        if (onClick) onClick(e);
    }

    onMouseDownHandler = e => {
        const { noRipple } = this.props;

        if (noRipple === false) {
            this.ripple(e.clientX, e.clientY);
        }
    }

    ripple(clientX, clientY) {
        const style = Pod_Styler.getStyle(this);
        const ripples = this.state.ripples || [];
        const containerRect = this.refs.rippleContainer.getBoundingClientRect();
        const rippleSize = containerRect.width;

        const calculatedStyle = {
            width: rippleSize,
            height: rippleSize,
            top: clientY - containerRect.top - (rippleSize / 2),
            left: clientX - containerRect.left - (rippleSize / 2),
        };

        if (this.rippleCount === undefined) this.rippleCount = 0;

        ripples.push(<span key={this.rippleCount} style={[style.ripple, calculatedStyle]}></span>);

        this.rippleCount++;

        this.setState({ ripples });

        // Remove ripple
        setTimeout(() => {
            ripples.splice(0, 1);
            this.setState({ ripples });
        }, 1000);
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const ripple = <span ref="rippleContainer" style={style.rippleContainer}>{this.state.ripples}</span>;
        const { children, label, href } = this.props;

        // Anchor tag <Anchor> if href specified
        if (href) {
            return (
                <Anchor ref="button" to={href} styler={{ style: style.main }} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                    {children || label} {ripple}
                </Anchor>
            );
        }

        // Default: <button> tag
        return (
            <button ref="button" style={style.main} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                {children || label} {ripple}
            </button>
        );
    }

};
