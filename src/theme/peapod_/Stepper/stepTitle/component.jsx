import React from 'react';
import Styler from 'utility/styler.js';
// import { Button } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    static propTypes = {
        children: React.PropTypes.any,
        id: React.PropTypes.number,
        subtitle: React.PropTypes.string,
        validation: React.PropTypes.func,
        onClick: React.PropTypes.func,
        active: React.PropTypes.bool,
        clickable: React.PropTypes.bool,
        title: React.PropTypes.string,
    }

    render() {
        const classes = Styler.getClasses(this);

        const optional = (!this.props.validation) ? (
            <div className={classes.stepSubTitle}>Optional</div>
        ) : '';
        const subtitle = (this.props.subtitle) ? (
            <div className={classes.stepSubTitle}>{this.props.subtitle}</div>
        ) : '';

        const key = this.props.id;

        return (
            <div className={classes.step} key={`steps-${key}`}>
                <div
                    key={`step-${key}`}
                    className={classes.stepelem}
                    onClick={() => !this.props.clickable || this.props.onClick(key)}
                >
                    {parseInt(key, 10) + 1}
                </div>
                <div className={classes.stepTitle}>
                    {this.props.title}
                    {subtitle}
                    {optional}
                </div>
            </div>
        );
    }
};
