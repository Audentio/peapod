/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/


import React, { PropTypes } from 'react';
import Styler from 'utility/styler.js';
import { Anchor } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.ripple = this.ripple.bind(this);
        this.rippleRemovers = [];

        this.state = {};
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
        kind: 'primary',
    }

    componentWillUnmount() {
        this.rippleRemovers.forEach(item => {
            clearTimeout(item);
        });
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
        const classes = Styler.getClasses(this);
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

        ripples.push(<span key={this.rippleCount} className={classes.ripple} style={calculatedStyle}></span>);

        this.rippleCount++;

        this.setState({ ripples });

        // Remove ripple
        this.rippleRemovers.push(
            setTimeout(() => {
                ripples.splice(0, 1);
                this.setState({ ripples });
            }, 1000)
        );
    }

    render() {
        const classes = Styler.getClasses(this);
        const ripple = <span ref="rippleContainer" className={classes.rippleContainer} >{this.state.ripples}</span>;
        const { children, label, href, external } = this.props;

        // Anchor tag <Anchor> if href specified
        if (href) {
            if (external) {
                return (
                    <a ref="button" href={href} className={classes.main} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                        {children || label} {ripple}
                    </a>
                );
            } else {
                return (
                    <Anchor ref="button" to={href} className={classes.main} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                        {children || label} {ripple}
                    </Anchor>
                );
            }
        }

        // Default: <button> tag
        return (
            <button ref="button" className={classes.main} onMouseDown={this.onMouseDownHandler} onClick={this.onClickHandler}>
                {children || label} {ripple}
            </button>
        );
    }

};
