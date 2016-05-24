import React from 'react';
import Pod_Styler from 'utility/styler.js';
// import { Button } from 'utility/components.js';

module.exports = function (componentName) {
    return class Pod_Component extends React.Component {

        static displayName = componentName;

        static propTypes = {
            children: React.PropTypes.any,
            id: React.PropTypes.number,
            subtitle: React.PropTypes.string,
            validation: React.PropTypes.func,
            active: React.PropTypes.bool,
            title: React.PropTypes.string,
            onStepTitleClick: React.PropTypes.func,
        }

        render() {
            const style = Pod_Styler.getStyle(this);
            let styler;

            if (this.props.active) { // i not defined
                styler = Object.assign({}, style.stepelem, style.activestep);
            } else {
                styler = style.stepelem;
            }

            const optional = (!this.props.validation) ? (
                <div style={style.stepSubTitle}>Optional</div>
            ) : '';
            const subtitle = (this.props.subtitle) ? (
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
                        {parseInt(key, 10) + 1}
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
};
