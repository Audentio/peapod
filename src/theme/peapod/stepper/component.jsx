/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'styler.js';
import { Stepper_Step, Stepper_StepTitle } from 'components.js';

module.exports = class Stepper extends React.Component {

    constructor() {
        super();

        this.state = {
            active: 0,
            steps: {},
            complete: 0,
        };

        this.onStepTitleClick = this.onStepTitleClick.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.goToBackStep = this.goToBackStep.bind(this);
    }

    static propTypes = {
        children: React.PropTypes.any,
        skippable: React.PropTypes.bool,
        singleForm: React.PropTypes.bool,
    }
    static defaultProps = {
        skippable: false,
        singleForm: false,
    }

    onStepTitleClick(active) {
        if (!this.props.skippable) {
            return false;
        }
        // console.log(active);

        // const thisstep = this.refs[`stepperStep${active}`];
        // if (thisstep) {
        //     console.log(thisstep.state);
        // }

        this.setState({ active });

        return true;
    }

    goToNextStep() {
        const active = this.state.active + 1;

        const persent = (100 / this.props.children.length) * (active);

        const complete = (persent > this.state.complete) ? persent : this.state.complete;

        if (active < this.props.children.length) {
            this.setState({ active, complete });
        }
    }
    goToBackStep() {
        const active = this.state.active - 1;
        if (active >= 0) {
            this.setState({ active });
        }
    }

    componentWillMount() {
        const stepValues = {};

        for (let i = 0; i < this.props.children.length; i++) {
            stepValues[`step-${i}`] = 0;
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
            const thisChild = this.props.children[i];
            const title = thisChild.props.title;
            const subtitle = thisChild.props.subtitle;
            const option = thisChild.props.option;
            const validation = thisChild.props.validation;

            steps.push(
                <Stepper_StepTitle
                    key={i}
                    id={i}
                    onClick={this.onStepTitleClick}
                    option={option}
                    subtitle={subtitle}
                    title={title}
                    active={i === this.state.active}
                    validation={validation}
                />
            );
            if ((i + 1) !== stepCount) {
                steps.push(<div key={`line-${i}`} style={style.stepLine}></div>);
            }
        }

        let i = 0;
        const children = this.props.children.map((result) => {
            const hidden = (this.props.singleForm && i !== this.state.active);
            const childstep = (
                <Stepper_Step
                    {...result.props}
                    key={i}
                    onContinue={this.goToNextStep}
                    onBack={this.goToBackStep}
                    hidden={hidden}
                />
            );
            i++;
            return childstep;
        });

        const child = (this.props.singleForm) ? children : children[this.state.active];

        return (
            <div style={style.main}>
                <div style={{ position: 'relative', background: '#fff', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <div style={style.progress}></div>

                    <div style={style.steps}>
                        {steps}
                    </div>
                </div>

                {child}
            </div>
        );
    }

};
