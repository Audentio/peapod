/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import Pod_Styler from 'utility/styler.js';
import { Stepper_StepTitle, Button } from 'utility/components.js';

module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

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
        actionBar: React.PropTypes.any,
        skippable: React.PropTypes.bool,
        titleBelow: React.PropTypes.bool,
        singleForm: React.PropTypes.bool,
        hideSteps: React.PropTypes.bool,
    }
    static defaultProps = {
        skippable: false,
        singleForm: false,
        hideSteps: false,
    }

    onStepTitleClick(active) {
        if (!this.props.skippable) {
            return false;
        }

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
                    below={this.props.titleBelow}
                    active={i === this.state.active}
                    validation={validation}
                />
            );
            if ((i + 1) !== stepCount) {
                steps.push(<div key={`line-${i}`} style={style.stepLine}></div>);
            }
        }

        let i = 0;
        const children = React.Children.map(this.props.children, child => {
            const hidden = (this.props.singleForm && i !== this.state.active);
            const index = i;
            const newChild = React.cloneElement(child, {
                hidden,
                index,
            });
            i++;
            return newChild;
        });

        /* should not be inline styles */
        const stepHeader = (!this.props.hideSteps) ? (
            <div style={{ position: 'relative', background: '#fff', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={style.progress}></div>

                <div style={style.steps}>
                    {steps}
                </div>
            </div>
        ) : '';

        const child = (this.props.singleForm) ? children : children[this.state.active];

        return (
            <div style={style.main}>
                {stepHeader}

                <div style={style.animate}>{child}</div>

                {this.props.actionBar || (<div style={style.actionBar}>
                    <Button label="Back" styler={{ dialog: true, disabled: this.state.active === 0 }} onClick={this.goToBackStep} />

                    <div style={{ float: 'right' }}>
                        <Button label="Cancel" styler={{ dialog: true }} />
                        <Button label="Continue" styler={{ dialog: true }} onClick={this.goToNextStep} />
                    </div>
                </div>)}
            </div>
        );
    }
};
