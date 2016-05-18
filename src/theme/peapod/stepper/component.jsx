/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';
// import { Stepper_Step } from 'components.js';

module.exports = class Stepper extends React.Component {

    constructor() {
        super();

        this.state = {
            active: 0,
            steps: {},
            complete: 25,
        };

        this.onStepTitleClick = this.onStepTitleClick.bind(this);
    }

    static propTypes = {
        children: React.PropTypes.any,
        skippable: React.PropTypes.bool,
    }
    static defaultProps = {
        skippable: false,
    }

    onStepTitleClick(active) {
        // if (!this.props.skippable) {
        //     return false;
        // }
        console.log(active);

        this.setState({ active });
    }

    goToNextStep() {
        const current = this.state.active;
        this.setState({ active: current + 1 });
    }

    componentWillMount() {
        const stepValues = {};

        for (let i = 0; i < this.props.children.length; i++) {
            stepValues['step-'.concat(i)] = 0;
        }

        this.setState(stepValues);
    }

    // componentWillReceiveProps() {
    //     return false;
    // }

    render() {
        const style = Pod_Styler.getStyle(this);

        const stepCount = this.props.children.length;

        const steps = [];

        for (let i = 0; i < stepCount; i++) {
            let styler;
            let parentStyler;

            if (i === this.state.active) {
                styler = Object.assign({}, style.stepelem, style.activestep);
            } else {
                styler = style.stepelem;
            }

            if (i === 0) {
                parentStyler = Object.assign({}, style.step, style.stepFirst);
            } else if ((i + 1) === stepCount) {
                parentStyler = Object.assign({}, style.step, style.stepLast);
            } else {
                parentStyler = style.step;
            }

            steps.push(
                <div style={parentStyler} key={`steps-${i}`}>
                    <div style={{ textAlign: 'center', display: 'inline-block' }}>
                        <div
                            key={`step-${i}`}
                            style={styler}
                            onClick={() => this.onStepTitleClick(i)}
                        >
                            {i + 1}
                        </div>

                        <div style={style.stepTitle}>{this.props.children[i].props.title}</div>
                    </div>
                </div>
            );
        }



        return (
            <div style={style.main}>
                <div style={{ position: 'relative', background: '#fff' }}>
                    <div style={style.progress}></div>
                    <div style={style.stepLine}></div>
                    <div style={style.steps}>
                        {steps}
                    </div>
                </div>

                {this.props.children[this.state.active]}
            </div>
        );
    }

};
