import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class StepperExample extends React.Component {

    shouldComponentUpdate = PureRender;

    constructor() {
        super();
        this.state = { validOne: false };

        this.validateInput = this.validateInput.bind(this);
    }

    validateInput(e) {
        this.setState({ validOne: e.isValid });
    }

    render() {
        return (
            <Pod.Card styler={{ style: { width: '700px', display: 'block' } }}>
                <Pod.Stepper skippable singleForm titleBelow actionBar={(<div></div>)}>
                    <Pod.Stepper_Step title="Apples" validation={() => true}>
                        <Pod.Input
                            type="email"
                            validate
                            label="Hey"
                            placeholder="email"
                            required
                            // onChange={this.validateInput}
                        />
                    </Pod.Stepper_Step>

                    <Pod.Stepper_Step title="Pears">
                        <Pod.Paragraph>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                            non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Pod.Paragraph>
                    </Pod.Stepper_Step>

                    <Pod.Stepper_Step title="Bananas">
                        <Pod.Paragraph>Card Number</Pod.Paragraph>
                        <Pod.Input label="Hey" placeholder="***************"></Pod.Input>
                    </Pod.Stepper_Step>
                </Pod.Stepper>
            </Pod.Card>
        );
    }

};
