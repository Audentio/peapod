import React from 'react';
import Pod_Styler from 'styler.js';
// import { Button } from 'components.js';

module.exports = class Stepper_StepTitle extends React.Component {

    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        let styler;
        let parentStyler;

        if (this.props.active) { // i not defined
            styler = Object.assign({}, style.stepelem, style.activestep);
        } else {
            styler = style.stepelem;
        }

        const optional = (!this.props.validation) ? (
            <div style={style.stepSubTitle}>Optional</div>
        ) : '';
        const subtitle = (!this.props.subtitle) ? (
            <div style={style.stepSubTitle}>{this.props.subtitle}</div>
        ) : '';

        const key = this.props.id;

        return (
            <div style={style.step} key={`steps-${key}`}>
                <div
                    key={`step-${key}`}
                    style={styler}
                    onClick={() => this.props.onStepTitleClick(key)}
                >
                    {parseInt(key) + 1}
                </div>
                <div style={style.stepTitle}>
                    {this.props.title}
                    {optional}
                    {subtitle}
                </div>
            </div>
        );
    }

};
