/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Pod_Styler from 'utility/styler.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        value: PropTypes.number,
        max: PropTypes.number,
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.node,
            PropTypes.string,
        ]),
    }

    static defaultProps = {
        value: 25,
        max: 100,
        indeterminate: false,
    }

    render() {
        const classes = Pod_Styler.getClassStyle(this);
        const { children: innerContent, value } = this.props;

        const maskTransformed = Object.assign({}, classes.style.mask, this.getTransform(value));
        const circleTransformed = Object.assign({}, classes.style.circle, this.getTransform(value));

        return (
            <div className={classes.main}>

                <div className={classes.track}></div>

                <div className={classes.maskTransformed}>
                    <div style={circleTransformed}></div>
                </div>
                <div className={classes.mask}>
                    <div style={circleTransformed}></div>
                </div>

                <div className={classes.content}>
                    <div className={classes.contentInner}>
                        {innerContent}
                    </div>
                </div>

            </div>
        );
    }

    getTransform = (value) => ({ transform: `rotate(${value * 1.8}deg)` })

};
